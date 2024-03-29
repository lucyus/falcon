import { WebSocketEndError, WebSocketFrameTypeError, WebSocketPayloadOverflowError } from "../../errors";

export class WebSocketMessenger {

    public static decode(
        buffer: Buffer,
        maxPayloadLength: number = 65535
    ): { payload: string, isPayloadComplete: boolean } {
        const firstByte = buffer.readUInt8(0);
        const opCode = firstByte & 0xf;
        const isFinalFrame = opCode === 0x8;
        if (isFinalFrame) {
            throw new WebSocketEndError("WebSocketMessenger::decode: received final frame.");
        }
        const isTextFrame = opCode === 0x1;
        if (!isTextFrame) {
            throw new WebSocketFrameTypeError("WebSocketMessenger::decode: invalid frame type (expected text frame).");
        }
        const secondByte = buffer.readUInt8(1);
        let currentOffset = 2;
        let payloadLength = secondByte & 0x7f;
        if (payloadLength === 126) {
            payloadLength = buffer.readUInt16BE(currentOffset);
            currentOffset += 2;
        }
        else if (payloadLength === 127) {
            throw new WebSocketPayloadOverflowError("WebSocketMessenger::decode: cannot decode payload length because it is defined on 8 bytes (maximum integer is on 6 bytes).");
        }
        if (payloadLength > maxPayloadLength) {
            throw new WebSocketPayloadOverflowError(`WebSocketMessenger::decode: payload length expected is too long (${payloadLength}). It exceeds the maximum payload length (${maxPayloadLength}).`);
        }
        const isMasked = Boolean((secondByte >>> 7) & 0x1);
        let maskingKey: number | null = null;
        if (isMasked) {
            maskingKey = buffer.readUInt32BE(currentOffset);
            currentOffset += 4;
        }
        const payloadLengthReceived = buffer.length - currentOffset;
        if (payloadLengthReceived > payloadLength) {
            throw new WebSocketPayloadOverflowError(`WebSocketMessenger::decode: payload received is too large (${payloadLengthReceived}). It exceeds the expected payload length (${payloadLength}).`);
        }
        if (payloadLengthReceived > maxPayloadLength) {
            throw new WebSocketPayloadOverflowError(`WebSocketMessenger::decode: payload received is too large (${payloadLengthReceived}). It exceeds the maximum payload length (${maxPayloadLength}).`);
        }
        const message = Buffer.alloc(payloadLengthReceived);
        if (maskingKey !== null) {
            for (
                let i = 0, j = 0;
                i < message.length;
                ++i, j = i % 4
            ) {
                const shift = j === 3 ? 0 : (3 - j) << 3;
                const mask = (shift === 0 ? maskingKey : maskingKey >>> shift) & 0xff;
                const source = buffer.readUInt8(currentOffset++);
                message.writeUInt8(mask ^ source, i);
            }
        }
        else {
            buffer.copy(message, 0, currentOffset);
        }
        return {
            payload: message.toString("utf-8"),
            isPayloadComplete: message.length === payloadLength
        };
    }

    public static encode(message: string): Buffer {
        const messageLength = Buffer.byteLength(message);
        if (messageLength > 65535) {
            throw new WebSocketPayloadOverflowError("WebSocketMessenger::encode: message is too long.");
        }
        const byteLengthCount = messageLength < 126 ? 0 : 2;
        const payloadLength = byteLengthCount === 0 ? messageLength : 126;
        const buffer = Buffer.alloc(2 + byteLengthCount + messageLength);
        buffer.writeUInt8(0b10000001, 0);
        buffer.writeUInt8(payloadLength, 1);
        let payloadOffset = 2;
        if (byteLengthCount === 2) {
            buffer.writeUInt16BE(messageLength, 2);
            payloadOffset += byteLengthCount;
        }
        buffer.write(message, payloadOffset);
        return buffer;
    }

    public static encodeClose(): Buffer {
        return Buffer.from([0b10001000, 0b00000010, 0x03, 0xe8]);
    }

}
