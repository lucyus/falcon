import { AUTHENTICATION_SCHEME_BEAUTIFIER, CHARSET_BEAUTIFIER, HTTP_HEADER_BEAUTIFIER, HTTP_METHOD_BEAUTIFIER, MIME_TYPE_BEAUTIFIER, PLATFORM_BEAUTIFIER } from ".";
import { HeaderKeyValueParametersFormatter } from "../core/utilities";
import { AuthenticationScheme } from "../enums";
import {
    CacheExpirationPolicyName,
    Charset,
    ClientHintHeader,
    ContentEncoder,
    Country,
    HTTPHeader,
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
    HTTPHeaderValueSecWebSocketAccept,
    HTTPHeaderValueSecWebSocketKey,
    HTTPHeaderValueSecWebSocketVersion,
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
    HTTPHeaderValueXDNSPrefetchControl,
    Language,
    MIMEType
} from "../types";

export const HEADER_VALUE_STRINGIFIER_DATA: Record<
    HTTPHeader,
    (headerValue: any) => string
> = {
    "WWW-Authenticate": (headerValue: HTTPHeaderValueWWWAuthenticate) => {
        let stringifiedWwwAuthenticate = "";
        const scheme = headerValue.authenticationScheme;
        stringifiedWwwAuthenticate += scheme;
        let shouldPreprendWithComma: boolean = false;
        if (headerValue.authData !== undefined) {
            stringifiedWwwAuthenticate += ` ${headerValue.authData}`;
            shouldPreprendWithComma = true;
        }
        for (const parameterName in headerValue.parameters) {
            if (shouldPreprendWithComma) {
                stringifiedWwwAuthenticate += ",";
            }
            const parameterValue = headerValue.parameters[parameterName];
            stringifiedWwwAuthenticate += ` ${parameterName}="${parameterValue}"`;
            shouldPreprendWithComma = true;
        }
        return stringifiedWwwAuthenticate;
    },
    "Authorization": (headerValue: HTTPHeaderValueAuthorization) => {
        let stringifiedWwwAuthenticate = "";
        const scheme = headerValue.authenticationScheme;
        stringifiedWwwAuthenticate += scheme;
        let shouldPreprendWithComma: boolean = false;
        if (headerValue.credentials !== undefined) {
            stringifiedWwwAuthenticate += ` ${headerValue.credentials}`;
            shouldPreprendWithComma = true;
        }
        for (const parameterName in headerValue.parameters) {
            if (shouldPreprendWithComma) {
                stringifiedWwwAuthenticate += ",";
            }
            const parameterValue = headerValue.parameters[parameterName];
            stringifiedWwwAuthenticate += ` ${parameterName}="${parameterValue}"`;
            shouldPreprendWithComma = true;
        }
        return stringifiedWwwAuthenticate;
    },
    "Proxy-Authenticate": (headerValue: HTTPHeaderValueProxyAuthenticate) => {
        let stringifiedWwwAuthenticate = "";
        const scheme = headerValue.authenticationScheme;
        stringifiedWwwAuthenticate += scheme;
        let shouldPreprendWithComma: boolean = false;
        if (headerValue.authData !== undefined) {
            stringifiedWwwAuthenticate += ` ${headerValue.authData}`;
            shouldPreprendWithComma = true;
        }
        for (const parameterName in headerValue.parameters) {
            if (shouldPreprendWithComma) {
                stringifiedWwwAuthenticate += ",";
            }
            const parameterValue = headerValue.parameters[parameterName];
            stringifiedWwwAuthenticate += ` ${parameterName}="${parameterValue}"`;
            shouldPreprendWithComma = true;
        }
        return stringifiedWwwAuthenticate;
    },
    "Proxy-Authorization": (headerValue: HTTPHeaderValueProxyAuthorization) => {
        let stringifiedWwwAuthenticate = "";
        const scheme = headerValue.authenticationScheme;
        stringifiedWwwAuthenticate += scheme;
        let shouldPreprendWithComma: boolean = false;
        if (headerValue.credentials !== undefined) {
            stringifiedWwwAuthenticate += ` ${headerValue.credentials}`;
            shouldPreprendWithComma = true;
        }
        for (const parameterName in headerValue.parameters) {
            if (shouldPreprendWithComma) {
                stringifiedWwwAuthenticate += ",";
            }
            const parameterValue = headerValue.parameters[parameterName];
            stringifiedWwwAuthenticate += ` ${parameterName}="${parameterValue}"`;
            shouldPreprendWithComma = true;
        }
        return stringifiedWwwAuthenticate;
    },
    "Age": (headerValue: HTTPHeaderValueAge) => {
        return `${headerValue}`;
    },
    "Cache-Control": (headerValue: HTTPHeaderValueCacheControl) => {
        let stringifiedCacheControl = "";
        let shouldPreprendWithComma: boolean = false;
        if (headerValue.location !== undefined) {
            stringifiedCacheControl += headerValue.location;
            shouldPreprendWithComma = true;
        }
        if (headerValue.cacheManagement !== undefined) {
            if (shouldPreprendWithComma) {
                stringifiedCacheControl += ",";
            }
            stringifiedCacheControl += ` ${headerValue.cacheManagement}`;
            shouldPreprendWithComma = true;
        }
        if (headerValue.cacheRevalidation !== undefined) {
            if (shouldPreprendWithComma) {
                stringifiedCacheControl += ",";
            }
            stringifiedCacheControl += ` ${headerValue.cacheRevalidation}`;
            shouldPreprendWithComma = true;
        }
        if (headerValue.transformHttpMessage !== undefined) {
            if (shouldPreprendWithComma) {
                stringifiedCacheControl += ",";
            }
            stringifiedCacheControl += ` ${headerValue.transformHttpMessage}`;
            shouldPreprendWithComma = true;
        }
        if (headerValue.acceptResponse !== undefined) {
            if (shouldPreprendWithComma) {
                stringifiedCacheControl += ",";
            }
            stringifiedCacheControl += ` ${headerValue.acceptResponse}`;
            shouldPreprendWithComma = true;
        }
        for (const expirationPolicy of headerValue.expirationPolicies) {
            if (shouldPreprendWithComma) {
                stringifiedCacheControl += ",";
            }
            stringifiedCacheControl += ` ${expirationPolicy.name}=${expirationPolicy.value}`;
            shouldPreprendWithComma = true;
        }
        return stringifiedCacheControl;
    },
    "Clear-Site-Data": (headerValue: HTTPHeaderValueClearSiteData) => {
        let stringifiedClearSiteData = "";
        let shouldPreprendWithComma: boolean = false;
        for (const directive of headerValue) {
            if (shouldPreprendWithComma) {
                stringifiedClearSiteData += ", ";
            }
            stringifiedClearSiteData += `"${directive}"`;
            shouldPreprendWithComma = true;
        }
        return stringifiedClearSiteData;
    },
    "Expires": (headerValue: HTTPHeaderValueExpires) => {
        return headerValue.toUTCString();
    },
    "Pragma": (headerValue: HTTPHeaderValuePragma) => {
        return "no-cache";
    },
    "Accept-CH": (headerValue: HTTPHeaderValueAcceptCH) => {
        let stringifiedAcceptCH = "";
        let shouldPreprendWithComma: boolean = false;
        for (const clientHintHeader of headerValue) {
            if (shouldPreprendWithComma) {
                stringifiedAcceptCH += ", ";
            }
            stringifiedAcceptCH += clientHintHeader;
            shouldPreprendWithComma = true;
        }
        return stringifiedAcceptCH;
    },
    "Sec-CH-UA": (headerValue: HTTPHeaderValueSecCHUA) => {
        let stringifiedSecCHUA = "";
        let shouldPreprendWithComma: boolean = false;
        for (const brand of headerValue) {
            if (shouldPreprendWithComma) {
                stringifiedSecCHUA += ", ";
            }
            stringifiedSecCHUA += `"${brand.brandName}";v="${brand.brandMarketingVersion}"`;
            shouldPreprendWithComma = true;
        }
        return stringifiedSecCHUA;
    },
    "Sec-CH-UA-Arch": (headerValue: HTTPHeaderValueSecCHUAArch) => {
        return `"${headerValue}"`;
    },
    "Sec-CH-UA-Bitness": (headerValue: HTTPHeaderValueSecCHUABitness) => {
        return `"${headerValue}"`;
    },
    "Sec-CH-UA-Mobile": (headerValue: HTTPHeaderValueSecCHUAMobile) => {
        return `${headerValue}`;
    },
    "Sec-CH-UA-Model": (headerValue: HTTPHeaderValueSecCHUAModel) => {
        return `"${headerValue}"`;
    },
    "Sec-CH-UA-Platform": (headerValue: HTTPHeaderValueSecCHUAPlatform) => {
        return `"${headerValue}"`;
    },
    "Sec-CH-UA-Platform-Version": (headerValue: HTTPHeaderValueSecCHUAPlatformVersion) => {
        return `"${headerValue.major}.${headerValue.minor}.${headerValue.patch}"`;
    },
    "Downlink": (headerValue: HTTPHeaderValueDownlink) => {
        return `${headerValue}`;
    },
    "ECT": (headerValue: HTTPHeaderValueECT) => {
        return `${headerValue}`;
    },
    "RTT": (headerValue: HTTPHeaderValueRTT) => {
        return `${headerValue}`;
    },
    "Early-Data": (headerValue: HTTPHeaderValueEarlyData) => {
        return `1`;
    },
    "Save-Data": (headerValue: HTTPHeaderValueSaveData) => {
        return `${headerValue ? "on" : "off"}`;
    },
    "Last-Modified": (headerValue: HTTPHeaderValueLastModified) => {
        return headerValue.toUTCString();
    },
    "ETag": (headerValue: HTTPHeaderValueETag) => {
        return `${headerValue.isWeak ? "W/" : ""}"${headerValue.value}"`;
    },
    "If-Match": (headerValue: HTTPHeaderValueIfMatch) => {
        if (headerValue[0] === "*") {
            return "*";
        }
        let stringifiedIfMatch = "";
        let shouldPreprendWithComma: boolean = false;
        for (const etag of headerValue) {
            if (shouldPreprendWithComma) {
                stringifiedIfMatch += ", ";
            }
            stringifiedIfMatch += `"${etag}"`;
            shouldPreprendWithComma = true;
        }
        return stringifiedIfMatch;
    },
    "If-None-Match": (headerValue: HTTPHeaderValueIfNoneMatch) => {
        if (headerValue[0] === "*") {
            return "*";
        }
        let stringifiedIfNoneMatch = "";
        let shouldPreprendWithComma: boolean = false;
        for (const etag of headerValue) {
            if (shouldPreprendWithComma) {
                stringifiedIfNoneMatch += ", ";
            }
            stringifiedIfNoneMatch += `"${etag}"`;
            shouldPreprendWithComma = true;
        }
        return stringifiedIfNoneMatch;
    },
    "If-Modified-Since": (headerValue: HTTPHeaderValueIfModifiedSince) => {
        return headerValue.toUTCString();
    },
    "If-Unmodified-Since": (headerValue: HTTPHeaderValueIfUnmodifiedSince) => {
        return headerValue.toUTCString();
    },
    "Vary": (headerValue: HTTPHeaderValueVary) => {
        let stringifiedVary = "";
        let shouldPreprendWithComma: boolean = false;
        for (const headerName of headerValue) {
            if (shouldPreprendWithComma) {
                stringifiedVary += ", ";
            }
            stringifiedVary += headerName;
            shouldPreprendWithComma = true;
        }
        return stringifiedVary;
    },
    "Connection": (headerValue: HTTPHeaderValueConnection) => {
        if (headerValue === "close") {
            return "close";
        }
        let stringifiedConnection = "";
        let shouldPreprendWithComma: boolean = false;
        for (const headerName of headerValue) {
            if (shouldPreprendWithComma) {
                stringifiedConnection += ", ";
            }
            stringifiedConnection += headerName;
            shouldPreprendWithComma = true;
        }
        return stringifiedConnection;
    },
    "Keep-Alive": (headerValue: HTTPHeaderValueKeepAlive) => {
        return `timeout=${headerValue.timeout}${
            headerValue.maximumRequestCount !== undefined ?
            `, max=${headerValue.maximumRequestCount}` :
            ""
        }`;
    },
    "Accept": (headerValue: HTTPHeaderValueAccept) => {
        let stringifiedAccept = "";
        let shouldPreprendWithComma: boolean = false;
        for (const accept of headerValue) {
            if (shouldPreprendWithComma) {
                stringifiedAccept += ", ";
            }
            stringifiedAccept += `${accept.type};q=${parseFloat(accept.qualityFactor.toFixed(3))}`;
            shouldPreprendWithComma = true;
        }
        return stringifiedAccept;
    },
    "Accept-Charset": (headerValue: HTTPHeaderValueAcceptCharset) => {
        let stringifiedAcceptCharset = "";
        let shouldPreprendWithComma: boolean = false;
        for (const acceptCharset of headerValue) {
            if (shouldPreprendWithComma) {
                stringifiedAcceptCharset += ", ";
            }
            stringifiedAcceptCharset += `${acceptCharset.type};q=${parseFloat(acceptCharset.qualityFactor.toFixed(3))}`;
            shouldPreprendWithComma = true;
        }
        return stringifiedAcceptCharset;
    },
    "Accept-Encoding": (headerValue: HTTPHeaderValueAcceptEncoding) => {
        let stringifiedAcceptEncoding = "";
        let shouldPreprendWithComma: boolean = false;
        for (const acceptEncoding of headerValue) {
            if (shouldPreprendWithComma) {
                stringifiedAcceptEncoding += ", ";
            }
            stringifiedAcceptEncoding += `${acceptEncoding.type};q=${parseFloat(acceptEncoding.qualityFactor.toFixed(3))}`;
            shouldPreprendWithComma = true;
        }
        return stringifiedAcceptEncoding;
    },
    "Accept-Language": (headerValue: HTTPHeaderValueAcceptLanguage) => {
        let stringifiedAcceptLanguage = "";
        let shouldPreprendWithComma: boolean = false;
        for (const acceptLanguage of headerValue) {
            if (shouldPreprendWithComma) {
                stringifiedAcceptLanguage += ", ";
            }
            stringifiedAcceptLanguage += `${acceptLanguage.language}${
                acceptLanguage.country ?
                    `-${acceptLanguage.country}` :
                    ""
                };q=${parseFloat(acceptLanguage.qualityFactor.toFixed(3))}`;
            shouldPreprendWithComma = true;
        }
        return stringifiedAcceptLanguage;
    },
    "Expect": (headerValue: HTTPHeaderValueExpect) => {
        return "100-continue";
    },
    "Max-Forwards": (headerValue: HTTPHeaderValueMaxForwards) => {
        return `${headerValue}`;
    },
    "Cookie": (headerValue: HTTPHeaderValueCookie) => {
        let stringifiedCookie = "";
        let shouldPreprendWithSemiColon: boolean = false;
        for (const cookie of headerValue) {
            if (shouldPreprendWithSemiColon) {
                stringifiedCookie += "; ";
            }
            stringifiedCookie += `${cookie.name}=${cookie.value}`;
            shouldPreprendWithSemiColon = true;
        }
        return stringifiedCookie;
    },
    "Set-Cookie": (headerValue: HTTPHeaderValueSetCookie) => {
        let stringifiedSetCookie = `${headerValue.name}=${headerValue.value}`;
        if (headerValue.isSecure !== undefined) {
            stringifiedSetCookie += `; Secure`;
        }
        if (headerValue.isHttpOnly !== undefined) {
            stringifiedSetCookie += `; HttpOnly`;
        }
        if (headerValue.expires !== undefined) {
            stringifiedSetCookie += `; Expires=${headerValue.expires.toUTCString()}`;
        }
        if (headerValue.maxAge !== undefined) {
            stringifiedSetCookie += `; Max-Age=${headerValue.maxAge}`;
        }
        if (headerValue.domain !== undefined) {
            stringifiedSetCookie += `; Domain=${headerValue.domain}`;
        }
        if (headerValue.path !== undefined) {
            stringifiedSetCookie += `; Path=${headerValue.path}`;
        }
        if (headerValue.sameSite !== undefined) {
            stringifiedSetCookie += `; SameSite=${headerValue.sameSite}`;
        }
        return stringifiedSetCookie;
    },
    "Access-Control-Allow-Origin": (headerValue: HTTPHeaderValueAccessControlAllowOrigin) => {
        return headerValue;
    },
    "Access-Control-Allow-Credentials": (headerValue: HTTPHeaderValueAccessControlAllowCredentials) => {
        return "true";
    },
    "Access-Control-Allow-Headers": (headerValue: HTTPHeaderValueAccessControlAllowHeaders) => {
        let stringifiedAccessControlAllowHeaders = "";
        let shouldPreprendWithComma: boolean = false;
        for (const headerName of headerValue) {
            if (shouldPreprendWithComma) {
                stringifiedAccessControlAllowHeaders += ", ";
            }
            stringifiedAccessControlAllowHeaders += headerName;
            shouldPreprendWithComma = true;
        }
        return stringifiedAccessControlAllowHeaders;
    },
    "Access-Control-Allow-Methods": (headerValue: HTTPHeaderValueAccessControlAllowMethods) => {
        let stringifiedAccessControlAllowMethods = "";
        let shouldPreprendWithComma: boolean = false;
        for (const headerName of headerValue) {
            if (shouldPreprendWithComma) {
                stringifiedAccessControlAllowMethods += ", ";
            }
            stringifiedAccessControlAllowMethods += headerName;
            shouldPreprendWithComma = true;
        }
        return stringifiedAccessControlAllowMethods;
    },
    "Access-Control-Expose-Headers": (headerValue: HTTPHeaderValueAccessControlExposeHeaders) => {
        let stringifiedAccessControlExposeHeaders = "";
        let shouldPreprendWithComma: boolean = false;
        for (const headerName of headerValue) {
            if (shouldPreprendWithComma) {
                stringifiedAccessControlExposeHeaders += ", ";
            }
            stringifiedAccessControlExposeHeaders += headerName;
            shouldPreprendWithComma = true;
        }
        return stringifiedAccessControlExposeHeaders;
    },
    "Access-Control-Max-Age": (headerValue: HTTPHeaderValueAccessControlMaxAge) => {
        return `${headerValue}`;
    },
    "Access-Control-Request-Headers": (headerValue: HTTPHeaderValueAccessControlRequestHeaders) => {
        let stringifiedAccessControlRequestHeaders = "";
        let shouldPreprendWithComma: boolean = false;
        for (const headerName of headerValue) {
            if (shouldPreprendWithComma) {
                stringifiedAccessControlRequestHeaders += ", ";
            }
            stringifiedAccessControlRequestHeaders += headerName;
            shouldPreprendWithComma = true;
        }
        return stringifiedAccessControlRequestHeaders;
    },
    "Access-Control-Request-Method": (headerValue: HTTPHeaderValueAccessControlRequestMethod) => {
        return headerValue;
    },
    "Origin": (headerValue: HTTPHeaderValueOrigin) => {
        if (headerValue === null) {
            return "null";
        }
        return `${headerValue.scheme}://${headerValue.hostname}${
            headerValue.port ?
                `:${headerValue.port}` :
                ""
        }`;
    },
    "Timing-Allow-Origin": (headerValue: HTTPHeaderValueTimingAllowOrigin) => {
        let stringifiedTimingAllowOrigin = "";
        let shouldPreprendWithComma: boolean = false;
        for (const origin of headerValue) {
            if (shouldPreprendWithComma) {
                stringifiedTimingAllowOrigin += ", ";
            }
            stringifiedTimingAllowOrigin += origin;
            shouldPreprendWithComma = true;
        }
        return stringifiedTimingAllowOrigin;
    },
    "Content-Disposition": (headerValue: HTTPHeaderValueContentDisposition) => {
        switch (headerValue.disposition) {
            case "attachment":
                return `attachment${
                    headerValue.fileName !== undefined ?
                        `; filename="${headerValue.fileName}"` :
                        ""
                }"`;
            case "form-data":
                return `form-data; name="${headerValue.name}"${
                    headerValue.fileName !== undefined ?
                        `; filename="${headerValue.fileName}"` :
                        ""
                }`;
            case "inline":
            default:
                return "inline";
        }
    },
    "Content-Length": (headerValue: HTTPHeaderValueContentLength) => {
        return `${headerValue}`;
    },
    "Content-Type": (headerValue: HTTPHeaderValueContentType) => {
        return `${headerValue.type}${
            headerValue.charset !== undefined ?
                `; charset=${headerValue.charset}` :
                ""
        }${
            headerValue.boundary !== undefined ?
                `; boundary=${headerValue.boundary}` :
                ""
        }`;
    },
    "Content-Encoding": (headerValue: HTTPHeaderValueContentEncoding) => {
        let stringifiedContentEncoding = "";
        let shouldPreprendWithComma: boolean = false;
        for (const encoding of headerValue) {
            if (shouldPreprendWithComma) {
                stringifiedContentEncoding += ", ";
            }
            stringifiedContentEncoding += encoding;
            shouldPreprendWithComma = true;
        }
        return stringifiedContentEncoding;
    },
    "Content-Language": (headerValue: HTTPHeaderValueContentLanguage) => {
        let stringifiedContentLanguage = "";
        let shouldPreprendWithComma: boolean = false;
        for (const locale of headerValue) {
            if (shouldPreprendWithComma) {
                stringifiedContentLanguage += ", ";
            }
            stringifiedContentLanguage += `${locale.language}${
                locale.country !== undefined ?
                    `-${locale.country}` :
                    ""
            }`;
            shouldPreprendWithComma = true;
        }
        return stringifiedContentLanguage;
    },
    "Content-Location": (headerValue: HTTPHeaderValueContentLocation) => {
        return headerValue;
    },
    "Forwarded": (headerValue: HTTPHeaderValueForwarded) => {
        let stringifiedForwarded = "";
        let shouldPreprendWithComma: boolean = false;
        for (const forwarded of headerValue) {
            if (shouldPreprendWithComma) {
                stringifiedForwarded += ", ";
            }
            let shouldPreprendWithSemiColon: boolean = false;
            if (forwarded.for !== undefined) {
                if (!forwarded.for.match(/^(\d{1,3}).(\d{1,3}).(\d{1,3}).(\d{1,3})$/)) {
                    stringifiedForwarded += `for="${forwarded.for}"`;
                }
                else {
                    stringifiedForwarded += `for=${forwarded.for}`;
                }
                shouldPreprendWithSemiColon = true;
            }
            if (forwarded.by !== undefined) {
                if (shouldPreprendWithSemiColon) {
                    stringifiedForwarded += "; ";
                }
                if (!forwarded.by.match(/^(\d{1,3}).(\d{1,3}).(\d{1,3}).(\d{1,3})$/)) {
                    stringifiedForwarded += `by="${forwarded.by}"`;
                }
                else {
                    stringifiedForwarded += `by=${forwarded.by}`;
                }
                shouldPreprendWithSemiColon = true;
            }
            if (forwarded.host !== undefined) {
                if (shouldPreprendWithSemiColon) {
                    stringifiedForwarded += "; ";
                }
                stringifiedForwarded += `host=${forwarded.host}`;
                shouldPreprendWithSemiColon = true;
            }
            if (forwarded.proto !== undefined) {
                if (shouldPreprendWithSemiColon) {
                    stringifiedForwarded += "; ";
                }
                stringifiedForwarded += `proto=${forwarded.proto}`;
            }
            shouldPreprendWithComma = true;
        }
        return stringifiedForwarded;
    },
    "Via": (headerValue: HTTPHeaderValueVia) => {
        let stringifiedVia = "";
        let shouldPreprendWithComma: boolean = false;
        for (const via of headerValue) {
            if (shouldPreprendWithComma) {
                stringifiedVia += ", ";
            }
            if (via.protocol.name !== undefined) {
                stringifiedVia += `${via.protocol.name}/`;
            }
            stringifiedVia += `${via.protocol.version} ${via.proxy}`;
            shouldPreprendWithComma = true;
        }
        return stringifiedVia;
    },
    "Location": (headerValue: HTTPHeaderValueLocation) => {
        return headerValue;
    },
    "From": (headerValue: HTTPHeaderValueFrom) => {
        return headerValue;
    },
    "Host": (headerValue: HTTPHeaderValueHost) => {
        return `${headerValue.domain}${
            headerValue.port !== undefined ?
            `:${headerValue.port}` :
            ""
        }`;
    },
    "Referer": (headerValue: HTTPHeaderValueReferer) => {
        return headerValue;
    },
    "Referrer-Policy": (headerValue: HTTPHeaderValueReferrerPolicy) => {
        return headerValue;
    },
    "User-Agent": (headerValue: HTTPHeaderValueUserAgent) => {
        return `${headerValue.product.name}/${headerValue.product.version} ${headerValue.details}`;
    },
    "Allow": (headerValue: HTTPHeaderValueAllow) => {
        let stringifiedAllow = "";
        let shouldPreprendWithComma: boolean = false;
        for (const method of headerValue) {
            if (shouldPreprendWithComma) {
                stringifiedAllow += ", ";
            }
            stringifiedAllow += method;
            shouldPreprendWithComma = true;
        }
        return stringifiedAllow;
    },
    "Server": (headerValue: HTTPHeaderValueServer) => {
        return headerValue;
    },
    "Accept-Ranges": (headerValue: HTTPHeaderValueAcceptRanges) => {
        return headerValue;
    },
    "Range": (headerValue: HTTPHeaderValueRange) => {
        let stringifiedRange = "";
        let shouldPreprendWithComma: boolean = false;
        for (const range of headerValue) {
            if (shouldPreprendWithComma) {
                stringifiedRange += ", ";
            }
            stringifiedRange += `${range.start || ""}-${range.end || ""}`;
            shouldPreprendWithComma = true;
        }
        return stringifiedRange;
    },
    "If-Range": (headerValue: HTTPHeaderValueIfRange) => {
        return headerValue instanceof Date ?
        headerValue.toUTCString() :
        headerValue
        ;
    },
    "Content-Range": (headerValue: HTTPHeaderValueContentRange) => {
        let stringifiedContentRange = headerValue.unit;
        if (headerValue.range === "*") {
            stringifiedContentRange += " *";
        }
        else {
            stringifiedContentRange += ` ${headerValue.range.start}-${headerValue.range.end}`;
        }
        stringifiedContentRange += `/${headerValue.totalSize}`;
        return stringifiedContentRange;
    },
    "Cross-Origin-Embedder-Policy": (headerValue: HTTPHeaderValueCrossOriginEmbedderPolicy) => {
        return headerValue;
    },
    "Cross-Origin-Opener-Policy": (headerValue: HTTPHeaderValueCrossOriginOpenerPolicy) => {
        return headerValue;
    },
    "Cross-Origin-Resource-Policy": (headerValue: HTTPHeaderValueCrossOriginResourcePolicy) => {
        return headerValue;
    },
    "Content-Security-Policy": (headerValue: HTTPHeaderValueContentSecurityPolicy) => {
        let stringifiedContentSecurityPolicy = "";
        let shouldPreprendWithSemiColon: boolean = false;
        for (const policy of headerValue.policies) {
            if (shouldPreprendWithSemiColon) {
                stringifiedContentSecurityPolicy += "; ";
            }
            stringifiedContentSecurityPolicy += `${policy.name} ${policy.values.join(" ")}`;
            shouldPreprendWithSemiColon = true;
        }
        return stringifiedContentSecurityPolicy;
    },
    "Content-Security-Policy-Report-Only": (headerValue: HTTPHeaderValueContentSecurityPolicyReportOnly) => {
        let stringifiedContentSecurityPolicyReportOnly = "";
        let shouldPreprendWithSemiColon: boolean = false;
        for (const policy of headerValue.policies) {
            if (shouldPreprendWithSemiColon) {
                stringifiedContentSecurityPolicyReportOnly += "; ";
            }
            stringifiedContentSecurityPolicyReportOnly += `${policy.name} ${policy.values.join(" ")}`;
            shouldPreprendWithSemiColon = true;
        }
        return stringifiedContentSecurityPolicyReportOnly;
    },
    "Expect-CT": (headerValue: HTTPHeaderValueExpectCT) => {
        let stringifiedExpectCT = "";
        let shouldPreprendWithComma: boolean = false;
        if (headerValue.reportUri !== undefined) {
            stringifiedExpectCT += `report-uri="${headerValue.reportUri}"`;
            shouldPreprendWithComma = true;
        }
        if (headerValue.enforce) {
            if (shouldPreprendWithComma) {
                stringifiedExpectCT += ", ";
            }
            stringifiedExpectCT += `enforce`;
            shouldPreprendWithComma = true;
        }
        if (headerValue.maxAge !== undefined) {
            if (shouldPreprendWithComma) {
                stringifiedExpectCT += ", ";
            }
            stringifiedExpectCT += `max-age=${headerValue.maxAge}`;
        }
        return stringifiedExpectCT;
    },
    "Permissions-Policy": (headerValue: HTTPHeaderValuePermissionsPolicy) => {
        let stringifiedPermissionsPolicy = "";
        let shouldPreprendWithSemiColon: boolean = false;
        for (const policy of headerValue.policies) {
            if (shouldPreprendWithSemiColon) {
                stringifiedPermissionsPolicy += "; ";
            }
            stringifiedPermissionsPolicy += `${policy.name} ${policy.value}`;
            shouldPreprendWithSemiColon = true;
        }
        return stringifiedPermissionsPolicy;
    },
    "Strict-Transport-Security": (headerValue: HTTPHeaderValueStrictTransportSecurity) => {
        let stringifiedStrictTransportSecurity = `max-age=${headerValue.maxAge}`;
        if (headerValue.includeSubDomains) {
            stringifiedStrictTransportSecurity += `; includeSubDomains`;
        }
        if (headerValue.preload) {
            stringifiedStrictTransportSecurity += `; preload`;
        }
        return stringifiedStrictTransportSecurity;
    },
    "Upgrade-Insecure-Requests": (headerValue: HTTPHeaderValueUpgradeInsecureRequests) => {
        return "1";
    },
    "X-Content-Type-Options": (headerValue: HTTPHeaderValueXContentTypeOptions) => {
        return "nosniff";
    },
    "Sec-Fetch-Site": (headerValue: HTTPHeaderValueSecFetchSite) => {
        return headerValue;
    },
    "Sec-Fetch-Mode": (headerValue: HTTPHeaderValueSecFetchMode) => {
        return headerValue;
    },
    "Sec-Fetch-User": (headerValue: HTTPHeaderValueSecFetchUser) => {
        return "?1";
    },
    "Sec-Fetch-Dest": (headerValue: HTTPHeaderValueSecFetchDest) => {
        return headerValue;
    },
    "Service-Worker-Navigation-Preload": (headerValue: HTTPHeaderValueServiceWorkerNavigationPreload) => {
        return headerValue;
    },
    "Last-EventID": (headerValue: HTTPHeaderValueLastEventID) => {
        return headerValue;
    },
    "NEL": (headerValue: HTTPHeaderValueNEL) => {
        const standardNEL: {
            report_to: string;
            max_age: number;
            include_subdomains: boolean;
            success_fraction: number;
            failure_fraction: number;
            request_headers: string[];
            response_headers: string[];
        } = {
            report_to: headerValue.report.to,
            max_age: headerValue.report.duration,
            include_subdomains: headerValue.report.includingSubdomains,
            success_fraction: Number(headerValue.report.successfulRequests),
            failure_fraction: Number(headerValue.report.failedRequests),
            request_headers: headerValue.report.requestHeaders,
            response_headers: headerValue.report.responseHeaders,
        };
        return JSON.stringify(standardNEL);
    },
    "Report-To": (headerValue: HTTPHeaderValueReportTo) => {
        let stringifiedReportTo = "";
        let shouldPreprendWithComma: boolean = false;
        for (const report of headerValue) {
            if (shouldPreprendWithComma) {
                stringifiedReportTo += ", ";
            }
            const standardReportTo: {
                group: string;
                max_age: number;
                include_subdomains: boolean;
                endpoints: {
                    url: string;
                }[];
            } = {
                group: report.groupName,
                max_age: report.duration,
                include_subdomains: report.includeSubdomains,
                endpoints: report.endpoints.map((endpoint) => {
                    return {
                        url: endpoint,
                    };
                }),
            };
            stringifiedReportTo += JSON.stringify(standardReportTo);
            shouldPreprendWithComma = true;
        }
        return stringifiedReportTo;
    },
    "Transfer-Encoding": (headerValue: HTTPHeaderValueTransferEncoding) => {
        let stringifiedTransferEncoding = "";
        let shouldPreprendWithComma: boolean = false;
        for (const encoding of headerValue) {
            if (shouldPreprendWithComma) {
                stringifiedTransferEncoding += ", ";
            }
            stringifiedTransferEncoding += encoding;
            shouldPreprendWithComma = true;
        }
        return stringifiedTransferEncoding;
    },
    "TE": (headerValue: HTTPHeaderValueTE) => {
        let stringifiedTE = "";
        let shouldPreprendWithComma: boolean = false;
        for (const encoding of headerValue) {
            if (shouldPreprendWithComma) {
                stringifiedTE += ", ";
            }
            stringifiedTE += `${encoding.type};q=${parseFloat(encoding.qualityFactor.toFixed(3))}`;
            shouldPreprendWithComma = true;
        }
        return stringifiedTE;
    },
    "Trailer": (headerValue: HTTPHeaderValueTrailer) => {
        let stringifiedTrailer = "";
        let shouldPreprendWithComma: boolean = false;
        for (const trailer of headerValue) {
            if (shouldPreprendWithComma) {
                stringifiedTrailer += ", ";
            }
            stringifiedTrailer += trailer;
            shouldPreprendWithComma = true;
        }
        return stringifiedTrailer;
    },
    "Alt-Svc": (headerValue: HTTPHeaderValueAltSvc) => {
        if (!Array.isArray(headerValue)) {
            return "clear";
        }
        let stringifiedAltSvc = "";
        let shouldPreprendWithComma: boolean = false;
        for (const altSvc of headerValue) {
            if (shouldPreprendWithComma) {
                stringifiedAltSvc += ", ";
            }
            stringifiedAltSvc += `${altSvc.type}="${altSvc.host}"; ma=${altSvc.availableFor}${altSvc.persist ? "; persist=1" : ""}`;
            shouldPreprendWithComma = true;
        }
        return stringifiedAltSvc;
    },
    "Date": (headerValue: HTTPHeaderValueDate) => {
        return headerValue.toUTCString();
    },
    "Link": (headerValue: HTTPHeaderValueLink) => {
        let stringifiedLink = headerValue.url;
        for (const parameter of headerValue.parameters) {
            stringifiedLink += `; ${parameter.name}="${parameter.value}"`;
        }
        return stringifiedLink;
    },
    "Retry-After": (headerValue: HTTPHeaderValueRetryAfter) => {
        return headerValue instanceof Date ?
        headerValue.toUTCString() :
        `${headerValue}`
        ;
    },
    "Server-Timing": (headerValue: HTTPHeaderValueServerTiming) => {
        let stringifiedServerTiming = "";
        let shouldPreprendWithComma: boolean = false;
        for (const serverTiming of headerValue) {
            if (shouldPreprendWithComma) {
                stringifiedServerTiming += ", ";
            }
            stringifiedServerTiming += `${serverTiming.name};dur=${serverTiming.duration}${serverTiming.description ? `;desc="${serverTiming.description}"` : ""}`;
            shouldPreprendWithComma = true;
        }
        return stringifiedServerTiming;
    },
    "SourceMap": (headerValue: HTTPHeaderValueSourceMap) => {
        return headerValue;
    },
    "Upgrade": (headerValue: HTTPHeaderValueUpgrade) => {
        let stringifiedUpgrade = "";
        let shouldPreprendWithComma: boolean = false;
        for (const upgrade of headerValue) {
            if (shouldPreprendWithComma) {
                stringifiedUpgrade += ", ";
            }
            stringifiedUpgrade += upgrade.protocol.name;
            if (upgrade.protocol.version !== undefined) {
                stringifiedUpgrade += `/${upgrade.protocol.version.major}`;
                if (upgrade.protocol.version.minor !== undefined) {
                    stringifiedUpgrade += `.${upgrade.protocol.version.minor}`;
                }
            }
            shouldPreprendWithComma = true;
        }
        return stringifiedUpgrade;
    },
    "X-DNS-Prefetch-Control": (headerValue: HTTPHeaderValueXDNSPrefetchControl) => {
        return headerValue ? "on" : "off";
    },
    "Sec-WebSocket-Accept": (headerValue: HTTPHeaderValueSecWebSocketAccept) => {
        return headerValue;
    },
    "Sec-WebSocket-Key": (headerValue: HTTPHeaderValueSecWebSocketKey) => {
        return headerValue;
    },
    "Sec-WebSocket-Version": (headerValue: HTTPHeaderValueSecWebSocketVersion) => {
        return `${headerValue}`;
    }
};
