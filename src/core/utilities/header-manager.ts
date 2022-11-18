import { HTTP_HEADER_BEAUTIFIER } from "../../data";
import {
    HTTPHeaderMap,
    HTTPHeaderValueAccept,
    HTTPHeaderValueAcceptCH,
    HTTPHeaderValueAcceptCharset,
    HTTPHeaderValueAcceptEncoding,
    HTTPHeaderValueAcceptLanguage,
    HTTPHeaderValueAcceptRanges,
    HTTPHeaderValueAccessControlAllowCredentials,
    HTTPHeaderValueAccessControlAllowHeaders,
    HTTPHeaderValueAccessControlAllowMethods,
    HTTPHeaderValueAccessControlAllowOrigin,
    HTTPHeaderValueAccessControlExposeHeaders,
    HTTPHeaderValueAccessControlMaxAge,
    HTTPHeaderValueAccessControlRequestHeaders,
    HTTPHeaderValueAccessControlRequestMethod,
    HTTPHeaderValueAge,
    HTTPHeaderValueAllow,
    HTTPHeaderValueAltSvc,
    HTTPHeaderValueAuthorization,
    HTTPHeaderValueCacheControl,
    HTTPHeaderValueClearSiteData,
    HTTPHeaderValueConnection,
    HTTPHeaderValueContentDisposition,
    HTTPHeaderValueContentEncoding,
    HTTPHeaderValueContentLanguage,
    HTTPHeaderValueContentLength,
    HTTPHeaderValueContentLocation,
    HTTPHeaderValueContentRange,
    HTTPHeaderValueContentSecurityPolicy,
    HTTPHeaderValueContentSecurityPolicyReportOnly,
    HTTPHeaderValueContentType,
    HTTPHeaderValueCookie,
    HTTPHeaderValueCrossOriginEmbedderPolicy,
    HTTPHeaderValueCrossOriginOpenerPolicy,
    HTTPHeaderValueCrossOriginResourcePolicy,
    HTTPHeaderValueDate,
    HTTPHeaderValueDownlink,
    HTTPHeaderValueEarlyData,
    HTTPHeaderValueECT,
    HTTPHeaderValueETag,
    HTTPHeaderValueExpect,
    HTTPHeaderValueExpectCT,
    HTTPHeaderValueExpires,
    HTTPHeaderValueForwarded,
    HTTPHeaderValueFrom,
    HTTPHeaderValueHost,
    HTTPHeaderValueIfMatch,
    HTTPHeaderValueIfModifiedSince,
    HTTPHeaderValueIfNoneMatch,
    HTTPHeaderValueIfRange,
    HTTPHeaderValueIfUnmodifiedSince,
    HTTPHeaderValueKeepAlive,
    HTTPHeaderValueLastEventID,
    HTTPHeaderValueLastModified,
    HTTPHeaderValueLink,
    HTTPHeaderValueLocation,
    HTTPHeaderValueMaxForwards,
    HTTPHeaderValueNEL,
    HTTPHeaderValueOrigin,
    HTTPHeaderValuePermissionsPolicy,
    HTTPHeaderValuePragma,
    HTTPHeaderValueProxyAuthenticate,
    HTTPHeaderValueProxyAuthorization,
    HTTPHeaderValueRange,
    HTTPHeaderValueReferer,
    HTTPHeaderValueReferrerPolicy,
    HTTPHeaderValueReportTo,
    HTTPHeaderValueRetryAfter,
    HTTPHeaderValueRTT,
    HTTPHeaderValueSaveData,
    HTTPHeaderValueSecCHUA,
    HTTPHeaderValueSecCHUAArch,
    HTTPHeaderValueSecCHUABitness,
    HTTPHeaderValueSecCHUAMobile,
    HTTPHeaderValueSecCHUAModel,
    HTTPHeaderValueSecCHUAPlatform,
    HTTPHeaderValueSecCHUAPlatformVersion,
    HTTPHeaderValueSecFetchDest,
    HTTPHeaderValueSecFetchMode,
    HTTPHeaderValueSecFetchSite,
    HTTPHeaderValueSecFetchUser,
    HTTPHeaderValueServer,
    HTTPHeaderValueServerTiming,
    HTTPHeaderValueServiceWorkerNavigationPreload,
    HTTPHeaderValueSetCookie,
    HTTPHeaderValueSourceMap,
    HTTPHeaderValueStrictTransportSecurity,
    HTTPHeaderValueTE,
    HTTPHeaderValueTimingAllowOrigin,
    HTTPHeaderValueTrailer,
    HTTPHeaderValueTransferEncoding,
    HTTPHeaderValueUpgrade,
    HTTPHeaderValueUpgradeInsecureRequests,
    HTTPHeaderValueUserAgent,
    HTTPHeaderValueVary,
    HTTPHeaderValueVia,
    HTTPHeaderValueWWWAuthenticate,
    HTTPHeaderValueXContentTypeOptions,
    HTTPHeaderValueXDNSPrefetchControl
} from "../../types";
import { HeaderValueFormatter } from "./header-value-formatter";

export class HeaderManager {

    protected _values: HTTPHeaderMap;

    public constructor(headers?: { name: string, value: string }[]) {
        this._values = {};
        if (headers) {
            this._initialize(headers);
        }
    }

    public get(headerName: 'WWW-Authenticate'): HTTPHeaderValueWWWAuthenticate | undefined;
    public get(headerName: 'Authorization'): HTTPHeaderValueAuthorization | undefined;
    public get(headerName: 'Proxy-Authenticate'): HTTPHeaderValueProxyAuthenticate | undefined;
    public get(headerName: 'Proxy-Authorization'): HTTPHeaderValueProxyAuthorization | undefined;
    public get(headerName: 'Age'): HTTPHeaderValueAge | undefined;
    public get(headerName: 'Cache-Control'): HTTPHeaderValueCacheControl | undefined;
    public get(headerName: 'Clear-Site-Data'): HTTPHeaderValueClearSiteData | undefined;
    public get(headerName: 'Expires'): HTTPHeaderValueExpires | undefined;
    public get(headerName: 'Pragma'): HTTPHeaderValuePragma | undefined;
    public get(headerName: 'Accept-CH'): HTTPHeaderValueAcceptCH | undefined;
    public get(headerName: 'Sec-CH-UA'): HTTPHeaderValueSecCHUA | undefined;
    public get(headerName: 'Sec-CH-UA-Arch'): HTTPHeaderValueSecCHUAArch | undefined;
    public get(headerName: 'Sec-CH-UA-Bitness'): HTTPHeaderValueSecCHUABitness | undefined;
    public get(headerName: 'Sec-CH-UA-Mobile'): HTTPHeaderValueSecCHUAMobile | undefined;
    public get(headerName: 'Sec-CH-UA-Model'): HTTPHeaderValueSecCHUAModel | undefined;
    public get(headerName: 'Sec-CH-UA-Platform'): HTTPHeaderValueSecCHUAPlatform | undefined;
    public get(headerName: 'Sec-CH-UA-Platform-Version'): HTTPHeaderValueSecCHUAPlatformVersion | undefined;
    public get(headerName: 'Downlink'): HTTPHeaderValueDownlink | undefined;
    public get(headerName: 'ECT'): HTTPHeaderValueECT | undefined;
    public get(headerName: 'RTT'): HTTPHeaderValueRTT | undefined;
    public get(headerName: 'Early-Data'): HTTPHeaderValueEarlyData | undefined;
    public get(headerName: 'Save-Data'): HTTPHeaderValueSaveData | undefined;
    public get(headerName: 'Last-Modified'): HTTPHeaderValueLastModified | undefined;
    public get(headerName: 'ETag'): HTTPHeaderValueETag | undefined;
    public get(headerName: 'If-Match'): HTTPHeaderValueIfMatch | undefined;
    public get(headerName: 'If-None-Match'): HTTPHeaderValueIfNoneMatch | undefined;
    public get(headerName: 'If-Modified-Since'): HTTPHeaderValueIfModifiedSince | undefined;
    public get(headerName: 'If-Unmodified-Since'): HTTPHeaderValueIfUnmodifiedSince | undefined;
    public get(headerName: 'Vary'): HTTPHeaderValueVary | undefined;
    public get(headerName: 'Connection'): HTTPHeaderValueConnection | undefined;
    public get(headerName: 'Keep-Alive'): HTTPHeaderValueKeepAlive | undefined;
    public get(headerName: 'Accept'): HTTPHeaderValueAccept | undefined;
    public get(headerName: 'Accept-Charset'): HTTPHeaderValueAcceptCharset | undefined;
    public get(headerName: 'Accept-Encoding'): HTTPHeaderValueAcceptEncoding | undefined;
    public get(headerName: 'Accept-Language'): HTTPHeaderValueAcceptLanguage | undefined;
    public get(headerName: 'Expect'): HTTPHeaderValueExpect | undefined;
    public get(headerName: 'Max-Forwards'): HTTPHeaderValueMaxForwards | undefined;
    public get(headerName: 'Cookie'): HTTPHeaderValueCookie | undefined;
    public get(headerName: 'Set-Cookie'): HTTPHeaderValueSetCookie | undefined;
    public get(headerName: 'Access-Control-Allow-Origin'): HTTPHeaderValueAccessControlAllowOrigin | undefined;
    public get(headerName: 'Access-Control-Allow-Credentials'): HTTPHeaderValueAccessControlAllowCredentials | undefined;
    public get(headerName: 'Access-Control-Allow-Headers'): HTTPHeaderValueAccessControlAllowHeaders | undefined;
    public get(headerName: 'Access-Control-Allow-Methods'): HTTPHeaderValueAccessControlAllowMethods | undefined;
    public get(headerName: 'Access-Control-Expose-Headers'): HTTPHeaderValueAccessControlExposeHeaders | undefined;
    public get(headerName: 'Access-Control-Max-Age'): HTTPHeaderValueAccessControlMaxAge | undefined;
    public get(headerName: 'Access-Control-Request-Headers'): HTTPHeaderValueAccessControlRequestHeaders | undefined;
    public get(headerName: 'Access-Control-Request-Method'): HTTPHeaderValueAccessControlRequestMethod | undefined;
    public get(headerName: 'Origin'): HTTPHeaderValueOrigin | undefined;
    public get(headerName: 'Timing-Allow-Origin'): HTTPHeaderValueTimingAllowOrigin | undefined;
    public get(headerName: 'Content-Disposition'): HTTPHeaderValueContentDisposition | undefined;
    public get(headerName: 'Content-Length'): HTTPHeaderValueContentLength | undefined;
    public get(headerName: 'Content-Type'): HTTPHeaderValueContentType | undefined;
    public get(headerName: 'Content-Encoding'): HTTPHeaderValueContentEncoding | undefined;
    public get(headerName: 'Content-Language'): HTTPHeaderValueContentLanguage | undefined;
    public get(headerName: 'Content-Location'): HTTPHeaderValueContentLocation | undefined;
    public get(headerName: 'Forwarded'): HTTPHeaderValueForwarded | undefined;
    public get(headerName: 'Via'): HTTPHeaderValueVia | undefined;
    public get(headerName: 'Location'): HTTPHeaderValueLocation | undefined;
    public get(headerName: 'From'): HTTPHeaderValueFrom | undefined;
    public get(headerName: 'Host'): HTTPHeaderValueHost | undefined;
    public get(headerName: 'Referer'): HTTPHeaderValueReferer | undefined;
    public get(headerName: 'Referrer-Policy'): HTTPHeaderValueReferrerPolicy | undefined;
    public get(headerName: 'User-Agent'): HTTPHeaderValueUserAgent | undefined;
    public get(headerName: 'Allow'): HTTPHeaderValueAllow | undefined;
    public get(headerName: 'Server'): HTTPHeaderValueServer | undefined;
    public get(headerName: 'Accept-Ranges'): HTTPHeaderValueAcceptRanges | undefined;
    public get(headerName: 'Range'): HTTPHeaderValueRange | undefined;
    public get(headerName: 'If-Range'): HTTPHeaderValueIfRange | undefined;
    public get(headerName: 'Content-Range'): HTTPHeaderValueContentRange | undefined;
    public get(headerName: 'Cross-Origin-Embedder-Policy'): HTTPHeaderValueCrossOriginEmbedderPolicy | undefined;
    public get(headerName: 'Cross-Origin-Opener-Policy'): HTTPHeaderValueCrossOriginOpenerPolicy | undefined;
    public get(headerName: 'Cross-Origin-Resource-Policy'): HTTPHeaderValueCrossOriginResourcePolicy | undefined;
    public get(headerName: 'Content-Security-Policy'): HTTPHeaderValueContentSecurityPolicy | undefined;
    public get(headerName: 'Content-Security-Policy-Report-Only'): HTTPHeaderValueContentSecurityPolicyReportOnly | undefined;
    public get(headerName: 'Expect-CT'): HTTPHeaderValueExpectCT | undefined;
    public get(headerName: 'Permissions-Policy'): HTTPHeaderValuePermissionsPolicy | undefined;
    public get(headerName: 'Strict-Transport-Security'): HTTPHeaderValueStrictTransportSecurity | undefined;
    public get(headerName: 'Upgrade-Insecure-Requests'): HTTPHeaderValueUpgradeInsecureRequests | undefined;
    public get(headerName: 'X-Content-Type-Options'): HTTPHeaderValueXContentTypeOptions | undefined;
    public get(headerName: 'Sec-Fetch-Site'): HTTPHeaderValueSecFetchSite | undefined;
    public get(headerName: 'Sec-Fetch-Mode'): HTTPHeaderValueSecFetchMode | undefined;
    public get(headerName: 'Sec-Fetch-User'): HTTPHeaderValueSecFetchUser | undefined;
    public get(headerName: 'Sec-Fetch-Dest'): HTTPHeaderValueSecFetchDest | undefined;
    public get(headerName: 'Service-Worker-Navigation-Preload'): HTTPHeaderValueServiceWorkerNavigationPreload | undefined;
    public get(headerName: 'Last-EventID'): HTTPHeaderValueLastEventID | undefined;
    public get(headerName: 'NEL'): HTTPHeaderValueNEL | undefined;
    public get(headerName: 'Report-To'): HTTPHeaderValueReportTo | undefined;
    public get(headerName: 'Transfer-Encoding'): HTTPHeaderValueTransferEncoding | undefined;
    public get(headerName: 'TE'): HTTPHeaderValueTE | undefined;
    public get(headerName: 'Trailer'): HTTPHeaderValueTrailer | undefined;
    public get(headerName: 'Alt-Svc'): HTTPHeaderValueAltSvc | undefined;
    public get(headerName: 'Date'): HTTPHeaderValueDate | undefined;
    public get(headerName: 'Link'): HTTPHeaderValueLink | undefined;
    public get(headerName: 'Retry-After'): HTTPHeaderValueRetryAfter | undefined;
    public get(headerName: 'Server-Timing'): HTTPHeaderValueServerTiming | undefined;
    public get(headerName: 'SourceMap'): HTTPHeaderValueSourceMap | undefined;
    public get(headerName: 'Upgrade'): HTTPHeaderValueUpgrade | undefined;
    public get(headerName: 'X-DNS-Prefetch-Control'): HTTPHeaderValueXDNSPrefetchControl | undefined;
    public get(headerName: string): any | undefined;
    public get(headerName: string): any | undefined {
        const headerNameBeautified = HTTP_HEADER_BEAUTIFIER[headerName.toLowerCase()] ||
            headerName
        ;
        return this._values[headerNameBeautified];
    }

    public getAll(): HTTPHeaderMap {
        return { ...this._values };
    }

    public getAllStringified(): Record<string, string> {
        const headersStringified: Record<string, string> = {};
        for (const headerName in this._values) {
            headersStringified[headerName] = HeaderValueFormatter.stringify(
                headerName,
                this._values[headerName]
            );
        }
        return headersStringified;
    }

    public set(headerName: 'WWW-Authenticate', headerValue?: HTTPHeaderValueWWWAuthenticate): void;
    public set(headerName: 'Authorization', headerValue?: HTTPHeaderValueAuthorization): void;
    public set(headerName: 'Proxy-Authenticate', headerValue?: HTTPHeaderValueProxyAuthenticate): void;
    public set(headerName: 'Proxy-Authorization', headerValue?: HTTPHeaderValueProxyAuthorization): void;
    public set(headerName: 'Age', headerValue?: HTTPHeaderValueAge): void;
    public set(headerName: 'Cache-Control', headerValue?: HTTPHeaderValueCacheControl): void;
    public set(headerName: 'Clear-Site-Data', headerValue?: HTTPHeaderValueClearSiteData): void;
    public set(headerName: 'Expires', headerValue?: HTTPHeaderValueExpires): void;
    public set(headerName: 'Pragma', headerValue?: HTTPHeaderValuePragma): void;
    public set(headerName: 'Accept-CH', headerValue?: HTTPHeaderValueAcceptCH): void;
    public set(headerName: 'Sec-CH-UA', headerValue?: HTTPHeaderValueSecCHUA): void;
    public set(headerName: 'Sec-CH-UA-Arch', headerValue?: HTTPHeaderValueSecCHUAArch): void;
    public set(headerName: 'Sec-CH-UA-Bitness', headerValue?: HTTPHeaderValueSecCHUABitness): void;
    public set(headerName: 'Sec-CH-UA-Mobile', headerValue?: HTTPHeaderValueSecCHUAMobile): void;
    public set(headerName: 'Sec-CH-UA-Model', headerValue?: HTTPHeaderValueSecCHUAModel): void;
    public set(headerName: 'Sec-CH-UA-Platform', headerValue?: HTTPHeaderValueSecCHUAPlatform): void;
    public set(headerName: 'Sec-CH-UA-Platform-Version', headerValue?: HTTPHeaderValueSecCHUAPlatformVersion): void;
    public set(headerName: 'Downlink', headerValue?: HTTPHeaderValueDownlink): void;
    public set(headerName: 'ECT', headerValue?: HTTPHeaderValueECT): void;
    public set(headerName: 'RTT', headerValue?: HTTPHeaderValueRTT): void;
    public set(headerName: 'Early-Data', headerValue?: HTTPHeaderValueEarlyData): void;
    public set(headerName: 'Save-Data', headerValue?: HTTPHeaderValueSaveData): void;
    public set(headerName: 'Last-Modified', headerValue?: HTTPHeaderValueLastModified): void;
    public set(headerName: 'ETag', headerValue?: HTTPHeaderValueETag): void;
    public set(headerName: 'If-Match', headerValue?: HTTPHeaderValueIfMatch): void;
    public set(headerName: 'If-None-Match', headerValue?: HTTPHeaderValueIfNoneMatch): void;
    public set(headerName: 'If-Modified-Since', headerValue?: HTTPHeaderValueIfModifiedSince): void;
    public set(headerName: 'If-Unmodified-Since', headerValue?: HTTPHeaderValueIfUnmodifiedSince): void;
    public set(headerName: 'Vary', headerValue?: HTTPHeaderValueVary): void;
    public set(headerName: 'Connection', headerValue?: HTTPHeaderValueConnection): void;
    public set(headerName: 'Keep-Alive', headerValue?: HTTPHeaderValueKeepAlive): void;
    public set(headerName: 'Accept', headerValue?: HTTPHeaderValueAccept): void;
    public set(headerName: 'Accept-Charset', headerValue?: HTTPHeaderValueAcceptCharset): void;
    public set(headerName: 'Accept-Encoding', headerValue?: HTTPHeaderValueAcceptEncoding): void;
    public set(headerName: 'Accept-Language', headerValue?: HTTPHeaderValueAcceptLanguage): void;
    public set(headerName: 'Expect', headerValue?: HTTPHeaderValueExpect): void;
    public set(headerName: 'Max-Forwards', headerValue?: HTTPHeaderValueMaxForwards): void;
    public set(headerName: 'Cookie', headerValue?: HTTPHeaderValueCookie): void;
    public set(headerName: 'Set-Cookie', headerValue?: HTTPHeaderValueSetCookie): void;
    public set(headerName: 'Access-Control-Allow-Origin', headerValue?: HTTPHeaderValueAccessControlAllowOrigin): void;
    public set(headerName: 'Access-Control-Allow-Credentials', headerValue?: HTTPHeaderValueAccessControlAllowCredentials): void;
    public set(headerName: 'Access-Control-Allow-Headers', headerValue?: HTTPHeaderValueAccessControlAllowHeaders): void;
    public set(headerName: 'Access-Control-Allow-Methods', headerValue?: HTTPHeaderValueAccessControlAllowMethods): void;
    public set(headerName: 'Access-Control-Expose-Headers', headerValue?: HTTPHeaderValueAccessControlExposeHeaders): void;
    public set(headerName: 'Access-Control-Max-Age', headerValue?: HTTPHeaderValueAccessControlMaxAge): void;
    public set(headerName: 'Access-Control-Request-Headers', headerValue?: HTTPHeaderValueAccessControlRequestHeaders): void;
    public set(headerName: 'Access-Control-Request-Method', headerValue?: HTTPHeaderValueAccessControlRequestMethod): void;
    public set(headerName: 'Origin', headerValue?: HTTPHeaderValueOrigin): void;
    public set(headerName: 'Timing-Allow-Origin', headerValue?: HTTPHeaderValueTimingAllowOrigin): void;
    public set(headerName: 'Content-Disposition', headerValue?: HTTPHeaderValueContentDisposition): void;
    public set(headerName: 'Content-Length', headerValue?: HTTPHeaderValueContentLength): void;
    public set(headerName: 'Content-Type', headerValue?: HTTPHeaderValueContentType): void;
    public set(headerName: 'Content-Encoding', headerValue?: HTTPHeaderValueContentEncoding): void;
    public set(headerName: 'Content-Language', headerValue?: HTTPHeaderValueContentLanguage): void;
    public set(headerName: 'Content-Location', headerValue?: HTTPHeaderValueContentLocation): void;
    public set(headerName: 'Forwarded', headerValue?: HTTPHeaderValueForwarded): void;
    public set(headerName: 'Via', headerValue?: HTTPHeaderValueVia): void;
    public set(headerName: 'Location', headerValue?: HTTPHeaderValueLocation): void;
    public set(headerName: 'From', headerValue?: HTTPHeaderValueFrom): void;
    public set(headerName: 'Host', headerValue?: HTTPHeaderValueHost): void;
    public set(headerName: 'Referer', headerValue?: HTTPHeaderValueReferer): void;
    public set(headerName: 'Referrer-Policy', headerValue?: HTTPHeaderValueReferrerPolicy): void;
    public set(headerName: 'User-Agent', headerValue?: HTTPHeaderValueUserAgent): void;
    public set(headerName: 'Allow', headerValue?: HTTPHeaderValueAllow): void;
    public set(headerName: 'Server', headerValue?: HTTPHeaderValueServer): void;
    public set(headerName: 'Accept-Ranges', headerValue?: HTTPHeaderValueAcceptRanges): void;
    public set(headerName: 'Range', headerValue?: HTTPHeaderValueRange): void;
    public set(headerName: 'If-Range', headerValue?: HTTPHeaderValueIfRange): void;
    public set(headerName: 'Content-Range', headerValue?: HTTPHeaderValueContentRange): void;
    public set(headerName: 'Cross-Origin-Embedder-Policy', headerValue?: HTTPHeaderValueCrossOriginEmbedderPolicy): void;
    public set(headerName: 'Cross-Origin-Opener-Policy', headerValue?: HTTPHeaderValueCrossOriginOpenerPolicy): void;
    public set(headerName: 'Cross-Origin-Resource-Policy', headerValue?: HTTPHeaderValueCrossOriginResourcePolicy): void;
    public set(headerName: 'Content-Security-Policy', headerValue?: HTTPHeaderValueContentSecurityPolicy): void;
    public set(headerName: 'Content-Security-Policy-Report-Only', headerValue?: HTTPHeaderValueContentSecurityPolicyReportOnly): void;
    public set(headerName: 'Expect-CT', headerValue?: HTTPHeaderValueExpectCT): void;
    public set(headerName: 'Permissions-Policy', headerValue?: HTTPHeaderValuePermissionsPolicy): void;
    public set(headerName: 'Strict-Transport-Security', headerValue?: HTTPHeaderValueStrictTransportSecurity): void;
    public set(headerName: 'Upgrade-Insecure-Requests', headerValue?: HTTPHeaderValueUpgradeInsecureRequests): void;
    public set(headerName: 'X-Content-Type-Options', headerValue?: HTTPHeaderValueXContentTypeOptions): void;
    public set(headerName: 'Sec-Fetch-Site', headerValue?: HTTPHeaderValueSecFetchSite): void;
    public set(headerName: 'Sec-Fetch-Mode', headerValue?: HTTPHeaderValueSecFetchMode): void;
    public set(headerName: 'Sec-Fetch-User', headerValue?: HTTPHeaderValueSecFetchUser): void;
    public set(headerName: 'Sec-Fetch-Dest', headerValue?: HTTPHeaderValueSecFetchDest): void;
    public set(headerName: 'Service-Worker-Navigation-Preload', headerValue?: HTTPHeaderValueServiceWorkerNavigationPreload): void;
    public set(headerName: 'Last-EventID', headerValue?: HTTPHeaderValueLastEventID): void;
    public set(headerName: 'NEL', headerValue?: HTTPHeaderValueNEL): void;
    public set(headerName: 'Report-To', headerValue?: HTTPHeaderValueReportTo): void;
    public set(headerName: 'Transfer-Encoding', headerValue?: HTTPHeaderValueTransferEncoding): void;
    public set(headerName: 'TE', headerValue?: HTTPHeaderValueTE): void;
    public set(headerName: 'Trailer', headerValue?: HTTPHeaderValueTrailer): void;
    public set(headerName: 'Alt-Svc', headerValue?: HTTPHeaderValueAltSvc): void;
    public set(headerName: 'Date', headerValue?: HTTPHeaderValueDate): void;
    public set(headerName: 'Link', headerValue?: HTTPHeaderValueLink): void;
    public set(headerName: 'Retry-After', headerValue?: HTTPHeaderValueRetryAfter): void;
    public set(headerName: 'Server-Timing', headerValue?: HTTPHeaderValueServerTiming): void;
    public set(headerName: 'SourceMap', headerValue?: HTTPHeaderValueSourceMap): void;
    public set(headerName: 'Upgrade', headerValue?: HTTPHeaderValueUpgrade): void;
    public set(headerName: 'X-DNS-Prefetch-Control', headerValue?: HTTPHeaderValueXDNSPrefetchControl): void;
    public set(headerName: string, headerValue?: any): void;
    public set(headerName: string, headerValue?: any) {
        if (headerValue === undefined) {
            return this.delete(headerName);
        }
        const headerNameBeautified = HTTP_HEADER_BEAUTIFIER[headerName.toLowerCase()] ||
            headerName
        ;
        this._values[headerNameBeautified] = headerValue;
    }

    public setAll(headers: HTTPHeaderMap): void {
        for (const headerName in headers) {
            this.set(headerName, headers[headerName]);
        }
    }

    public delete(headerName: 'WWW-Authenticate'): void;
    public delete(headerName: 'Authorization'): void;
    public delete(headerName: 'Proxy-Authenticate'): void;
    public delete(headerName: 'Proxy-Authorization'): void;
    public delete(headerName: 'Age'): void;
    public delete(headerName: 'Cache-Control'): void;
    public delete(headerName: 'Clear-Site-Data'): void;
    public delete(headerName: 'Expires'): void;
    public delete(headerName: 'Pragma'): void;
    public delete(headerName: 'Accept-CH'): void;
    public delete(headerName: 'Sec-CH-UA'): void;
    public delete(headerName: 'Sec-CH-UA-Arch'): void;
    public delete(headerName: 'Sec-CH-UA-Bitness'): void;
    public delete(headerName: 'Sec-CH-UA-Mobile'): void;
    public delete(headerName: 'Sec-CH-UA-Model'): void;
    public delete(headerName: 'Sec-CH-UA-Platform'): void;
    public delete(headerName: 'Sec-CH-UA-Platform-Version'): void;
    public delete(headerName: 'Downlink'): void;
    public delete(headerName: 'ECT'): void;
    public delete(headerName: 'RTT'): void;
    public delete(headerName: 'Early-Data'): void;
    public delete(headerName: 'Save-Data'): void;
    public delete(headerName: 'Last-Modified'): void;
    public delete(headerName: 'ETag'): void;
    public delete(headerName: 'If-Match'): void;
    public delete(headerName: 'If-None-Match'): void;
    public delete(headerName: 'If-Modified-Since'): void;
    public delete(headerName: 'If-Unmodified-Since'): void;
    public delete(headerName: 'Vary'): void;
    public delete(headerName: 'Connection'): void;
    public delete(headerName: 'Keep-Alive'): void;
    public delete(headerName: 'Accept'): void;
    public delete(headerName: 'Accept-Charset'): void;
    public delete(headerName: 'Accept-Encoding'): void;
    public delete(headerName: 'Accept-Language'): void;
    public delete(headerName: 'Expect'): void;
    public delete(headerName: 'Max-Forwards'): void;
    public delete(headerName: 'Cookie'): void;
    public delete(headerName: 'Set-Cookie'): void;
    public delete(headerName: 'Access-Control-Allow-Origin'): void;
    public delete(headerName: 'Access-Control-Allow-Credentials'): void;
    public delete(headerName: 'Access-Control-Allow-Headers'): void;
    public delete(headerName: 'Access-Control-Allow-Methods'): void;
    public delete(headerName: 'Access-Control-Expose-Headers'): void;
    public delete(headerName: 'Access-Control-Max-Age'): void;
    public delete(headerName: 'Access-Control-Request-Headers'): void;
    public delete(headerName: 'Access-Control-Request-Method'): void;
    public delete(headerName: 'Origin'): void;
    public delete(headerName: 'Timing-Allow-Origin'): void;
    public delete(headerName: 'Content-Disposition'): void;
    public delete(headerName: 'Content-Length'): void;
    public delete(headerName: 'Content-Type'): void;
    public delete(headerName: 'Content-Encoding'): void;
    public delete(headerName: 'Content-Language'): void;
    public delete(headerName: 'Content-Location'): void;
    public delete(headerName: 'Forwarded'): void;
    public delete(headerName: 'Via'): void;
    public delete(headerName: 'Location'): void;
    public delete(headerName: 'From'): void;
    public delete(headerName: 'Host'): void;
    public delete(headerName: 'Referer'): void;
    public delete(headerName: 'Referrer-Policy'): void;
    public delete(headerName: 'User-Agent'): void;
    public delete(headerName: 'Allow'): void;
    public delete(headerName: 'Server'): void;
    public delete(headerName: 'Accept-Ranges'): void;
    public delete(headerName: 'Range'): void;
    public delete(headerName: 'If-Range'): void;
    public delete(headerName: 'Content-Range'): void;
    public delete(headerName: 'Cross-Origin-Embedder-Policy'): void;
    public delete(headerName: 'Cross-Origin-Opener-Policy'): void;
    public delete(headerName: 'Cross-Origin-Resource-Policy'): void;
    public delete(headerName: 'Content-Security-Policy'): void;
    public delete(headerName: 'Content-Security-Policy-Report-Only'): void;
    public delete(headerName: 'Expect-CT'): void;
    public delete(headerName: 'Permissions-Policy'): void;
    public delete(headerName: 'Strict-Transport-Security'): void;
    public delete(headerName: 'Upgrade-Insecure-Requests'): void;
    public delete(headerName: 'X-Content-Type-Options'): void;
    public delete(headerName: 'Sec-Fetch-Site'): void;
    public delete(headerName: 'Sec-Fetch-Mode'): void;
    public delete(headerName: 'Sec-Fetch-User'): void;
    public delete(headerName: 'Sec-Fetch-Dest'): void;
    public delete(headerName: 'Service-Worker-Navigation-Preload'): void;
    public delete(headerName: 'Last-EventID'): void;
    public delete(headerName: 'NEL'): void;
    public delete(headerName: 'Report-To'): void;
    public delete(headerName: 'Transfer-Encoding'): void;
    public delete(headerName: 'TE'): void;
    public delete(headerName: 'Trailer'): void;
    public delete(headerName: 'Alt-Svc'): void;
    public delete(headerName: 'Date'): void;
    public delete(headerName: 'Link'): void;
    public delete(headerName: 'Retry-After'): void;
    public delete(headerName: 'Server-Timing'): void;
    public delete(headerName: 'SourceMap'): void;
    public delete(headerName: 'Upgrade'): void;
    public delete(headerName: 'X-DNS-Prefetch-Control'): void;
    public delete(headerName: string): void;
    public delete(headerName: string): void {
        const headerNameBeautified = HTTP_HEADER_BEAUTIFIER[headerName.toLowerCase()] ||
            headerName
        ;
        delete this._values[headerNameBeautified];
    }

    public deleteAll(): void {
        this._values = {};
    }

    protected _initialize(headers: { name: string, value: string }[]): void {
        for (const header of headers) {
            this._values[header.name] = HeaderValueFormatter.parse(
                header.name,
                header.value
            );
        }
    }

}
