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

export const HEADER_VALUE_PARSER_DATA: Record<
    HTTPHeader,
    (headerValue: string) => any
> = {
    "WWW-Authenticate": (headerValue: string) => {
        const headerValueSplitted = headerValue.split(" ");
        const rawScheme = headerValueSplitted[0];
        const scheme: string | AuthenticationScheme =
            AUTHENTICATION_SCHEME_BEAUTIFIER[rawScheme.toLowerCase()] ||
            rawScheme
        ;
        const rawParameters = headerValueSplitted.slice(1).join(" ");
        const parameters = HeaderKeyValueParametersFormatter.format(rawParameters);
        let authData: string | undefined = undefined;
        if (scheme === AuthenticationScheme.NEGOTIATE) {
            authData = rawParameters;
        }
        return {
            authenticationScheme: scheme,
            parameters,
            authData,
        } as HTTPHeaderValueWWWAuthenticate;
    },
    "Authorization": (headerValue: string) => {
        const headerValueSplitted = headerValue.split(" ");
        const rawScheme = headerValueSplitted[0];
        const scheme: string | AuthenticationScheme =
            AUTHENTICATION_SCHEME_BEAUTIFIER[rawScheme.toLowerCase()] ||
            rawScheme
        ;
        const rawParameters = headerValueSplitted.slice(1).join(" ");
        const parameters = HeaderKeyValueParametersFormatter.format(rawParameters);
        let credentials: string | undefined = undefined;
        if (
            scheme === AuthenticationScheme.BASIC ||
            scheme === AuthenticationScheme.BEARER
        ) {
            credentials = rawParameters;
        }
        return {
            authenticationScheme: scheme,
            parameters,
            credentials,
        } as HTTPHeaderValueAuthorization;
    },
    "Proxy-Authenticate": (headerValue: string) => {
        const headerValueSplitted = headerValue.split(" ");
        const rawScheme = headerValueSplitted[0];
        const scheme: string | AuthenticationScheme =
            AUTHENTICATION_SCHEME_BEAUTIFIER[rawScheme.toLowerCase()] ||
            rawScheme
        ;
        const rawParameters = headerValueSplitted.slice(1).join(" ");
        const parameters = HeaderKeyValueParametersFormatter.format(rawParameters);
        let authData: string | undefined = undefined;
        if (scheme === AuthenticationScheme.NEGOTIATE) {
            authData = rawParameters;
        }
        return {
            authenticationScheme: scheme,
            parameters,
            authData,
        } as HTTPHeaderValueProxyAuthenticate;
    },
    "Proxy-Authorization": (headerValue: string) => {
        const headerValueSplitted = headerValue.split(" ");
        const rawScheme = headerValueSplitted[0];
        const scheme: string | AuthenticationScheme =
            AUTHENTICATION_SCHEME_BEAUTIFIER[rawScheme.toLowerCase()] ||
            rawScheme
        ;
        const rawParameters = headerValueSplitted.slice(1).join(" ");
        const parameters = HeaderKeyValueParametersFormatter.format(rawParameters);
        let credentials: string | undefined = undefined;
        if (
            scheme === AuthenticationScheme.BASIC ||
            scheme === AuthenticationScheme.BEARER
        ) {
            credentials = rawParameters;
        }
        return {
            authenticationScheme: scheme,
            parameters,
            credentials,
        } as HTTPHeaderValueProxyAuthorization;
    },
    "Age": (headerValue: string) => {
        return Number(headerValue) as HTTPHeaderValueAge;
    },
    "Cache-Control": (headerValue: string) => {
        const parameters = HeaderKeyValueParametersFormatter.format(headerValue);
        const expirationPolicies: {
            name: CacheExpirationPolicyName,
            value: number
        }[] = [];
        const expirationPolicyNames: CacheExpirationPolicyName[] = [
            "max-age",
            "s-maxage",
            "max-stale",
            "min-fresh",
            "stale-while-revalidate",
            "stale-if-error",
        ];
        for (const expirationPolicyName of expirationPolicyNames) {
            if (parameters[expirationPolicyName]) {
                expirationPolicies.push({
                    name: expirationPolicyName,
                    value: Number(parameters[expirationPolicyName]),
                });
            }
        }
        return {
            location: headerValue.includes("private") ? "private" : "public",
            cacheManagement: headerValue.includes("no-cache") ?
                "no-cache"
                :
                (
                    headerValue.includes("no-store") ?
                    "no-store"
                    :
                    (
                        headerValue.includes("must-understand") ?
                        "must-understand"
                        :
                        undefined
                    )
                )
            ,
            expirationPolicies,
            cacheRevalidation: headerValue.includes("must-revalidate") ?
                "must-revalidate"
                :
                (
                    headerValue.includes("proxy-revalidate") ?
                    "proxy-revalidate"
                    :
                    (
                        headerValue.includes("immutable") ?
                        "immutable"
                        :
                        undefined
                    )
                )
            ,
            transformHttpMessage: headerValue.includes("no-transform") ?
                "no-transform"
                :
                undefined
            ,
            acceptResponse: headerValue.includes("only-if-cached") ?
                "only-if-cached"
                :
                undefined
            ,
        } as HTTPHeaderValueCacheControl;
    },
    "Clear-Site-Data": (headerValue: string) => {
        if (headerValue.includes("*")) {
            return ["*"] as HTTPHeaderValueClearSiteData;
        }
        const directives = [];
        const directiveNames = [
            "cache",
            "cookies",
            "storage",
            "executionContexts",
        ];
        for (const directiveName of directiveNames) {
            if (headerValue.includes(directiveName)) {
                directives.push(directiveName);
            }
        }
        return directives as HTTPHeaderValueClearSiteData;
    },
    "Expires": (headerValue: string) => {
        return new Date(headerValue) as HTTPHeaderValueExpires;
    },
    "Pragma": (headerValue: string) => {
        return "no-cache" as HTTPHeaderValuePragma;
    },
    "Accept-CH": (headerValue: string) => {
        const headersBeautified = headerValue
            .replace(" ", "")
            .split(",")
            .map((header) => HTTP_HEADER_BEAUTIFIER[header.toLowerCase()] || header)
        ;
        const clientHintHeaderNames: ClientHintHeader[] = [
            "Device-Memory",
            "Early-Data",
            "Save-Data",
            "Viewport-Width",
            "Width"
        ];
        const clientHintHeaders: ClientHintHeader[] = [];
        for (const clientHintHeaderName of clientHintHeaderNames) {
            if (headersBeautified.includes(clientHintHeaderName)) {
                clientHintHeaders.push(clientHintHeaderName);
            }
        }
        return clientHintHeaders as HTTPHeaderValueAcceptCH;
    },
    "Sec-CH-UA": (headerValue: string) => {
        const brands: HTTPHeaderValueSecCHUA = [];
        const rawBrands = headerValue.split(/(?!"),(?!")/g);
        for (const rawBrand of rawBrands) {
            const brandName = (
                rawBrand.trim().match(/^"(.*)"/) || ["", ""]
            )[1];
            const brandMarketingVersion = HeaderKeyValueParametersFormatter
                .format(rawBrand)["v"] || ""
            ;
            if (brandName && brandMarketingVersion) {
                brands.push({
                    brandName,
                    brandMarketingVersion
                });
            }
        }
        return brands;
    },
    "Sec-CH-UA-Arch": (headerValue: string) => {
        return (
            headerValue.trim().match(/^"(.*)"/) || ["", ""]
        )[1] as HTTPHeaderValueSecCHUAArch;
    },
    "Sec-CH-UA-Bitness": (headerValue: string) => {
        const rawBitness = (
            headerValue.trim().match(/^"(.*)"/) || ["", ""]
        )[1];
        return Number(rawBitness) as HTTPHeaderValueSecCHUABitness;
    },
    "Sec-CH-UA-Mobile": (headerValue: string) => {
        return headerValue.trim() as HTTPHeaderValueSecCHUAMobile;
    },
    "Sec-CH-UA-Model": (headerValue: string) => {
        return (
            headerValue.trim().match(/^"(.*)"/) || ["", ""]
        )[1] as HTTPHeaderValueSecCHUAModel;
    },
    "Sec-CH-UA-Platform": (headerValue: string) => {
        const rawPlatform = (
            headerValue.trim().match(/^"(.*)"/) || ["", ""]
        )[1];
        return (
            PLATFORM_BEAUTIFIER[rawPlatform.toLowerCase()] || "Unknown"
        ) as HTTPHeaderValueSecCHUAPlatform;
    },
    "Sec-CH-UA-Platform-Version": (headerValue: string) => {
        const rawFullPlatformVersion = (
            headerValue.trim().match(/^"(.*)"/) || ["", ""]
        )[1];
        const rawSplittedPlatformVersion = rawFullPlatformVersion.split(".");
        return {
            major: Number(rawSplittedPlatformVersion[0]) || 0,
            minor: Number(rawSplittedPlatformVersion[1]) || 0,
            patch: Number(rawSplittedPlatformVersion[2]) || 0
        } as HTTPHeaderValueSecCHUAPlatformVersion;
    },
    "Downlink": (headerValue: string) => {
        return (Number(headerValue) || 0) as HTTPHeaderValueDownlink;
    },
    "ECT": (headerValue: string) => {
        return headerValue.trim().toLowerCase() as HTTPHeaderValueECT;
    },
    "RTT": (headerValue: string) => {
        return (Number(headerValue) || 0) as HTTPHeaderValueRTT;
    },
    "Early-Data": (headerValue: string) => {
        return "1" as HTTPHeaderValueEarlyData;
    },
    "Save-Data": (headerValue: string) => {
        const shouldSaveData: boolean = headerValue.trim().toLowerCase() === "on" ?
            true :
            false
        ;
        return shouldSaveData as HTTPHeaderValueSaveData;
    },
    "Last-Modified": (headerValue: string) => {
        return new Date(headerValue) as HTTPHeaderValueLastModified;
    },
    "ETag": (headerValue: string) => {
        const isETagWeak: boolean = /W\/"(.*)"/.test(headerValue.trim());
        const eTagValue: string = (
            headerValue.match(/"(.*)"/) || ["", ""]
        )[1];
        return {
            isWeak: isETagWeak,
            value: eTagValue
        } as HTTPHeaderValueETag;
    },
    "If-Match": (headerValue: string) => {
        if (headerValue.trim() === "*") {
            return ["*"] as HTTPHeaderValueIfMatch;
        }
        const eTags: string[] = [];
        const rawETags = headerValue.split(/(?!"),(?!")/g);
        for (const rawETag of rawETags) {
            const eTag = (
                rawETag.trim().match(/^"(.*)"/) || ["", ""]
            )[1];
            eTags.push(eTag);
        }
        return eTags as HTTPHeaderValueIfMatch;
    },
    "If-None-Match": (headerValue: string) => {
        if (headerValue.trim() === "*") {
            return ["*"] as HTTPHeaderValueIfNoneMatch;
        }
        const eTags: string[] = [];
        const rawETags = headerValue.split(/(?!"),(?!")/g);
        for (const rawETag of rawETags) {
            const eTag = (
                rawETag.trim().match(/^"(.*)"/) || ["", ""]
            )[1];
            eTags.push(eTag);
        }
        return eTags as HTTPHeaderValueIfNoneMatch;
    },
    "If-Modified-Since": (headerValue: string) => {
        return new Date(headerValue) as HTTPHeaderValueIfModifiedSince;
    },
    "If-Unmodified-Since": (headerValue: string) => {
        return new Date(headerValue) as HTTPHeaderValueIfUnmodifiedSince;
    },
    "Vary": (headerValue: string) => {
        if (headerValue.trim() === "*") {
            return ["*"] as HTTPHeaderValueVary;
        }
        const headers: string[] = [];
        const rawHeaders = headerValue.split(",");
        for (const rawHeader of rawHeaders) {
            headers.push(
                HTTP_HEADER_BEAUTIFIER[rawHeader.trim().toLowerCase()]
                ||
                rawHeader.trim()
            );
        }
        return headers as HTTPHeaderValueVary;
    },
    "Connection": (headerValue: string) => {
        if (headerValue.trim().toLowerCase() === "close") {
            return "close" as HTTPHeaderValueConnection;
        }
        const headers: string[] = [];
        const rawHeaders = headerValue.split(",");
        for (const rawHeader of rawHeaders) {
            headers.push(
                HTTP_HEADER_BEAUTIFIER[rawHeader.trim().toLowerCase()]
                ||
                rawHeader.trim()
            );
        }
        return headers as HTTPHeaderValueConnection;
    },
    "Keep-Alive": (headerValue: string) => {
        const parameters = HeaderKeyValueParametersFormatter.format(headerValue);
        return {
            timeout: parameters["timeout"] !== undefined ?
                Number(parameters["timeout"])
                :
                undefined
            ,
            maximumRequestCount: parameters["max"] !== undefined ?
                Number(parameters["max"])
                :
                undefined
        } as HTTPHeaderValueKeepAlive;
    },
    "Accept": (headerValue: string) => {
        const accept: HTTPHeaderValueAccept = [];
        const rawMimeTypes: string[] = headerValue.split(",");
        for (const rawMimeType of rawMimeTypes) {
            const rawMimeTypeSplitted = rawMimeType.split(";");
            const rawMimeTypeTrimed = rawMimeTypeSplitted[0].trim();
            const mimeType: MIMEType =
                MIME_TYPE_BEAUTIFIER[rawMimeTypeTrimed.toLowerCase()]
                ||
                rawMimeTypeTrimed
            ;
            const qualityFactor = Number(
                    HeaderKeyValueParametersFormatter
                        .format(rawMimeTypeSplitted[1] || "")["q"]
                )
                ||
                1
            ;
            accept.push({
                type: mimeType,
                qualityFactor
            });
        }
        return accept as HTTPHeaderValueAccept;
    },
    "Accept-Charset": (headerValue: string) => {
        const acceptCharset: HTTPHeaderValueAcceptCharset = [];
        const rawCharsets: string[] = headerValue.split(",");
        for (const rawCharset of rawCharsets) {
            const rawCharsetSplitted = rawCharset.split(";");
            const rawCharsetTrimed = rawCharsetSplitted[0].trim();
            const charset: Charset =
                CHARSET_BEAUTIFIER[rawCharsetTrimed.toLowerCase()]
                ||
                rawCharsetTrimed
            ;
            const qualityFactor = Number(
                    HeaderKeyValueParametersFormatter
                        .format(rawCharsetSplitted[1] || "")["q"]
                )
                ||
                1
            ;
            acceptCharset.push({
                type: charset,
                qualityFactor
            });
        }
        return acceptCharset as HTTPHeaderValueAcceptCharset;
    },
    "Accept-Encoding": (headerValue: string) => {
        const acceptEncoding: HTTPHeaderValueAcceptEncoding = [];
        const rawEncodings: string[] = headerValue.split(",");
        for (const rawEncoding of rawEncodings) {
            const rawEncodingSplitted = rawEncoding.split(";");
            const rawEncodingTrimed = rawEncodingSplitted[0].trim();
            const encoding: ContentEncoder =
                rawEncodingTrimed.toLowerCase() as ContentEncoder
            ;
            const qualityFactor = Number(
                HeaderKeyValueParametersFormatter
                    .format(rawEncodingSplitted[1] || "")["q"]
                )
                ||
                1
            ;
            acceptEncoding.push({
                type: encoding,
                qualityFactor
            });
        }
        return acceptEncoding as HTTPHeaderValueAcceptEncoding;
    },
    "Accept-Language": (headerValue: string) => {
        const acceptLanguage: HTTPHeaderValueAcceptLanguage = [];
        const rawLocales: string[] = headerValue.split(",");
        for (const rawLocale of rawLocales) {
            const rawLocaleSplitted = rawLocale.split(";");
            const rawLocaleTrimed = rawLocaleSplitted[0].trim();
            const languageCountrySplitted = rawLocaleTrimed.split("-");
            const language = languageCountrySplitted[0].toLowerCase() as Language;
            const country = (
                (languageCountrySplitted[1] || "").toUpperCase() ||
                undefined
            ) as Country | undefined;
            const qualityFactor = Number(
                HeaderKeyValueParametersFormatter
                    .format(rawLocaleSplitted[1] || "")["q"]
                )
                ||
                1
            ;
            acceptLanguage.push({
                language,
                country,
                qualityFactor
            });
        }
        return acceptLanguage as HTTPHeaderValueAcceptLanguage;
    },
    "Expect": (headerValue: string) => {
        return "100-continue" as HTTPHeaderValueExpect;
    },
    "Max-Forwards": (headerValue: string) => {
        const unsafeNumber: number = Number(headerValue);
        return !isNaN(unsafeNumber) ? unsafeNumber : Infinity as HTTPHeaderValueMaxForwards;
    },
    "Cookie": (headerValue: string) => {
        const parameters = HeaderKeyValueParametersFormatter.format(headerValue);
        const cookies: HTTPHeaderValueCookie = [];
        for (const parameterName of Object.keys(parameters)) {
            const parameterValue = parameters[parameterName];
            if (parameterValue !== undefined) {
                cookies.push({
                    name: parameterName,
                    value: parameterValue
                });
            }
        }
        return cookies as HTTPHeaderValueCookie;
    },
    "Set-Cookie": (headerValue: string) => {
        const headerValueSplitted: string[] = headerValue.split(";");
        const cookieParameters = HeaderKeyValueParametersFormatter
            .format(headerValueSplitted[0])
        ;
        const cookieName: string = Object.keys(cookieParameters)[0] || "";
        const cookieValue: string = cookieParameters[cookieName] || "";
        const cookie: HTTPHeaderValueSetCookie = {
            name: cookieName,
            value: cookieValue
        };
        for (const headerValuePart of headerValueSplitted.slice(1)) {
            switch (headerValuePart.trim().toLowerCase()) {
                case "secure":
                    cookie.isSecure = true;
                    break;
                case "httponly":
                    cookie.isHttpOnly = true;
                    break;
                default:
                    const otherDirective = HeaderKeyValueParametersFormatter
                        .format(headerValuePart)
                    ;
                    const otherDirectiveName: string =
                        Object.keys(otherDirective)[0] ||
                        ""
                    ;
                    const otherDirectiveValue = otherDirective[otherDirectiveName];
                    if (otherDirectiveValue !== undefined) {
                        switch(otherDirectiveName.toLowerCase()) {
                            case "expires":
                                cookie.expires = new Date(otherDirectiveValue);
                                break;
                            case "max-age":
                                cookie.maxAge = Number(otherDirectiveValue) || 0;
                                break;
                            case "domain":
                                cookie.domain = otherDirectiveValue;
                                break;
                            case "path":
                                cookie.path = otherDirectiveValue;
                                break;
                            case "samesite":
                                switch (otherDirectiveValue.toLowerCase()) {
                                    case "strict":
                                        cookie.sameSite = "Strict";
                                        break;
                                    case "none":
                                        cookie.sameSite = "None";
                                        break;
                                    default:
                                        cookie.sameSite = "Lax";
                                        break;
                                }
                                break;
                            default:
                                break;
                        }
                    }
                    break;
            }

        }
        return cookie as HTTPHeaderValueSetCookie;
    },
    "Access-Control-Allow-Origin": (headerValue: string) => {
        return headerValue.trim() as HTTPHeaderValueAccessControlAllowOrigin;
    },
    "Access-Control-Allow-Credentials": (headerValue: string) => {
        return true as HTTPHeaderValueAccessControlAllowCredentials;
    },
    "Access-Control-Allow-Headers": (headerValue: string) => {
        const headers: string[] = [];
        const headerValueSplitted: string[] = headerValue.split(",");
        for (const rawHeader of headerValueSplitted) {
            const rawHeaderTrimed = rawHeader.trim();
            const header =
                HTTP_HEADER_BEAUTIFIER[rawHeaderTrimed.toLowerCase()] ||
                rawHeaderTrimed
            ;
            headers.push(header);
        }
        return headers as HTTPHeaderValueAccessControlAllowHeaders;
    },
    "Access-Control-Allow-Methods": (headerValue: string) => {
        const methods: string[] = [];
        const headerValueSplitted: string[] = headerValue.split(",");
        for (const rawMethod of headerValueSplitted) {
            const rawMethodTrimed = rawMethod.trim();
            const method =
                HTTP_METHOD_BEAUTIFIER[rawMethodTrimed.toLowerCase()] ||
                rawMethodTrimed
            ;
            methods.push(method);
        }
        return methods as HTTPHeaderValueAccessControlAllowMethods;
    },
    "Access-Control-Expose-Headers": (headerValue: string) => {
        const headers: string[] = [];
        const headerValueSplitted: string[] = headerValue.split(",");
        for (const rawHeader of headerValueSplitted) {
            const rawHeaderTrimed = rawHeader.trim();
            const header =
                HTTP_HEADER_BEAUTIFIER[rawHeaderTrimed.toLowerCase()] ||
                rawHeaderTrimed
            ;
            headers.push(header);
        }
        return headers as HTTPHeaderValueAccessControlExposeHeaders;
    },
    "Access-Control-Max-Age": (headerValue: string) => {
        return Number(headerValue) || 5 as HTTPHeaderValueAccessControlMaxAge;
    },
    "Access-Control-Request-Headers": (headerValue: string) => {
        const headers: string[] = [];
        const headerValueSplitted: string[] = headerValue.split(",");
        for (const rawHeader of headerValueSplitted) {
            const rawHeaderTrimed = rawHeader.trim();
            const header =
                HTTP_HEADER_BEAUTIFIER[rawHeaderTrimed.toLowerCase()] ||
                rawHeaderTrimed
            ;
            headers.push(header);
        }
        return headers as HTTPHeaderValueAccessControlRequestHeaders;
    },
    "Access-Control-Request-Method": (headerValue: string) => {
        return (
            HTTP_METHOD_BEAUTIFIER[headerValue.trim().toLowerCase()] ||
            "GET"
        ) as HTTPHeaderValueAccessControlRequestMethod;
    },
    "Origin": (headerValue: string) => {
        if (headerValue.trim().toLowerCase() === "null") {
            return null as HTTPHeaderValueOrigin;
        }
        const schemeSplitted: string[] = headerValue.split("://");
        const scheme: string = schemeSplitted[0].trim();
        const portSplitted: string[] = schemeSplitted[1].split(":");
        const hostname: string = portSplitted[0];
        const port: number | undefined = Number(portSplitted[1]) || undefined;
        if (
            scheme &&
            hostname &&
            port !== undefined
        )
        {
            return {
                scheme,
                hostname,
                port
            } as HTTPHeaderValueOrigin;
        }
        return null as HTTPHeaderValueOrigin;
    },
    "Timing-Allow-Origin": (headerValue: string) => {
        if (headerValue.trim().startsWith("*")) {
            return ["*"] as HTTPHeaderValueTimingAllowOrigin;
        }
        const origins: HTTPHeaderValueTimingAllowOrigin = [];
        const headerValueSplitted: string[] = headerValue.split(",");
        for (const rawOrigin of headerValueSplitted) {
            const origin = rawOrigin.trim();
            origins.push(origin);
        }
        return origins as HTTPHeaderValueTimingAllowOrigin;
    },
    "Content-Disposition": (headerValue: string) => {
        const contentDisposition: string = headerValue.split(";")[0].trim();
        const parameters = HeaderKeyValueParametersFormatter
            .format(headerValue)
        ;
        switch (contentDisposition.toLowerCase()) {
            case "attachment":
                return {
                    disposition: "attachment",
                    fileName: parameters.filename || undefined,
                } as HTTPHeaderValueContentDisposition;
            case "form-data":
                return {
                    disposition: "form-data",
                    name: parameters.name || undefined,
                    fileName: parameters.filename || undefined,
                } as HTTPHeaderValueContentDisposition;
            case "inline":
            default:
                return {
                    disposition: "inline"
                } as HTTPHeaderValueContentDisposition;
        }
    },
    "Content-Length": (headerValue: string) => {
        return Number(headerValue) || 0 as HTTPHeaderValueContentLength;
    },
    "Content-Type": (headerValue: string) => {
        const headerValueSplitted: string[] = headerValue.split(";");
        const rawContentTypeTrimed: string = headerValueSplitted[0].trim();
        const contentType =
            MIME_TYPE_BEAUTIFIER[rawContentTypeTrimed.toLowerCase()] ||
            rawContentTypeTrimed
        ;
        const parameters = HeaderKeyValueParametersFormatter
            .format(headerValue)
        ;
        return {
            type: contentType,
            charset: parameters.charset || undefined,
            boundary: parameters.boundary || undefined,
        } as HTTPHeaderValueContentType;
    },
    "Content-Encoding": (headerValue: string) => {
        const contentEncodings: string[] = [];
        const headerValueSplitted: string[] = headerValue.split(",");
        for (const rawContentEncoding of headerValueSplitted) {
            const rawContentEncodingTrimed = rawContentEncoding.trim();
            const contentEncoding = rawContentEncodingTrimed.toLowerCase();
            contentEncodings.push(contentEncoding);
        }
        return contentEncodings as HTTPHeaderValueContentEncoding;
    },
    "Content-Language": (headerValue: string) => {
        const locales: HTTPHeaderValueContentLanguage = [];
        const headerValueSplitted: string[] = headerValue.split(",");
        for (const rawLocale of headerValueSplitted) {
            const rawLocaleSplitted = rawLocale.split(";");
            const rawLocaleTrimed = rawLocaleSplitted[0].trim();
            const languageCountrySplitted = rawLocaleTrimed.split("-");
            const language = languageCountrySplitted[0].toLowerCase() as Language;
            const country = (
                (languageCountrySplitted[1] || "").toUpperCase() ||
                undefined
            ) as Country | undefined;
            locales.push({
                language,
                country,
            });
        }
        return locales as HTTPHeaderValueContentLanguage;
    },
    "Content-Location": (headerValue: string) => {
        return headerValue.trim() as HTTPHeaderValueContentLocation;
    },
    "Forwarded": (headerValue: string) => {
        const forwarded: HTTPHeaderValueForwarded = [];
        const rawForwardedList: string[] = headerValue.split(",");
        for (const rawForwarded of rawForwardedList) {
            const parameters = HeaderKeyValueParametersFormatter
                .format(rawForwarded)
            ;
            forwarded.push({
                by: parameters.by || undefined,
                for: parameters.for || undefined,
                host: parameters.host || undefined,
                proto: parameters.proto === "http" || parameters.proto === "https" ?
                    parameters.proto :
                    undefined
                ,
            });
        }
        return forwarded as HTTPHeaderValueForwarded;
    },
    "Via": (headerValue: string) => {
        const via: HTTPHeaderValueVia = [];
        const rawViaList: string[] = headerValue.split(",");
        for (const rawVia of rawViaList) {
            const protocolName =
                (rawVia.match(/([A-Z]+)\//) || "")[1] ||
                undefined
            ;
            const version = (rawVia.match(/\/([0-9.]+)/) || "")[1] || "1.1";
            const rawViaSplitted: string[] = rawVia.split(" ");
            const proxy = rawViaSplitted[rawViaSplitted.length - 1].trim() || "";
            via.push({
                protocol: {
                    name: protocolName,
                    version: {
                        major: Number(version.split(".")[0]) || 0,
                        minor: Number(version.split(".")[1]) || 0,
                    }
                },
                proxy,
            });
        }
        return via as HTTPHeaderValueVia;
    },
    "Location": (headerValue: string) => {
        return headerValue.trim() as HTTPHeaderValueLocation;
    },
    "From": (headerValue: string) => {
        return headerValue.trim() as HTTPHeaderValueFrom;
    },
    "Host": (headerValue: string) => {
        const headerValueSplitted: string[] = headerValue.split(":");
        const hostname: string = headerValueSplitted[0].trim();
        const port = Number(headerValueSplitted[1]) || undefined;
        return {
            domain: hostname,
            port,
        } as HTTPHeaderValueHost;
    },
    "Referer": (headerValue: string) => {
        return headerValue.trim() as HTTPHeaderValueReferer;
    },
    "Referrer-Policy": (headerValue: string) => {
        return headerValue.trim().toLowerCase() as HTTPHeaderValueReferrerPolicy;
    },
    "User-Agent": (headerValue: string) => {
        const headerValueSplitted: string[] = headerValue.split(" ");
        const productSplitted = headerValueSplitted[0].split("/");
        const product = {
            name: productSplitted[0].trim(),
            version: productSplitted[1].trim(),
        };
        const details = headerValueSplitted.slice(1).join(" ");
        return {
            product,
            details
        } as HTTPHeaderValueUserAgent;
    },
    "Allow": (headerValue: string) => {
        const headerValueSplitted: string[] = headerValue.split(",");
        const methods: HTTPHeaderValueAllow = [];
        for (const rawMethod of headerValueSplitted) {
            const rawMethodTrimed = rawMethod.trim();
            const method =
                HTTP_METHOD_BEAUTIFIER[rawMethodTrimed.toLowerCase()] ||
                rawMethodTrimed
            ;
            methods.push(method);
        }
        return methods as HTTPHeaderValueAllow;
    },
    "Server": (headerValue: string) => {
        return headerValue.trim() as HTTPHeaderValueServer;
    },
    "Accept-Ranges": (headerValue: string) => {
        return (
            headerValue.trim().toLowerCase() === "bytes" ?
                "bytes" :
                "none"
        ) as HTTPHeaderValueAcceptRanges;
    },
    "Range": (headerValue: string) => {
        const ranges: HTTPHeaderValueRange = [];
        const headerValueSplitted: string[] = headerValue.split(",");
        for (const rawRange of headerValueSplitted) {
            const rawRangeTrimed = rawRange.trim();
            const rangeMatched = rawRangeTrimed.match(/(\d+)-(\d+)/);
            if (rangeMatched) {
                ranges.push({
                    start: rangeMatched[1] !== undefined ?
                        Number(rangeMatched[1]) :
                        undefined
                    ,
                    end: rangeMatched[2] !== undefined ?
                        Number(rangeMatched[2]) :
                        undefined
                });
            }
        }
        return ranges as HTTPHeaderValueRange;
    },
    "If-Range": (headerValue: string) => {
        const headerValueTrimed: string = headerValue.trim();
        const potentialEtag = headerValueTrimed;
        const potentialDate = new Date(headerValueTrimed);
        return isNaN(potentialDate as any) ?
            potentialEtag :
            potentialDate
        ;
    },
    "Content-Range": (headerValue: string) => {
        const headerValueSplitted: string[] = headerValue.split("/");
        const rawRange = headerValueSplitted[0].trim();
        const rawSize = headerValueSplitted[1].trim();
        const range = rawRange === "*" ?
            "*" :
            {
                start: Number(rawRange.split("-")[0]),
                end: Number(rawRange.split("-")[1]),
            }
        ;
        const size = rawSize === "*" ?
            "*" :
            Number(rawSize)
        ;
        return {
            unit: headerValue.split(" ")[0].trim() || "bytes",
            range,
            totalSize: size
        } as HTTPHeaderValueContentRange;
    },
    "Cross-Origin-Embedder-Policy": (headerValue: string) => {
        return headerValue.trim() as HTTPHeaderValueCrossOriginEmbedderPolicy;
    },
    "Cross-Origin-Opener-Policy": (headerValue: string) => {
        return headerValue.trim().toLowerCase() as HTTPHeaderValueCrossOriginOpenerPolicy;
    },
    "Cross-Origin-Resource-Policy": (headerValue: string) => {
        return headerValue.trim().toLowerCase() as HTTPHeaderValueCrossOriginResourcePolicy;
    },
    "Content-Security-Policy": (headerValue: string) => {
        const contentSecurityPolicy: HTTPHeaderValueContentSecurityPolicy = {
            policies: [],
        };
        const headerValueSplitted: string[] = headerValue.split(";");
        for (const rawPolicy of headerValueSplitted) {
            const rawPolicySplitted: string[] = rawPolicy.split(" ");
            const policyName = rawPolicySplitted[0].trim().toLowerCase();
            const policyValues = rawPolicySplitted
                .slice(1)
                .map((rawPolicy) => rawPolicy.trim().toLowerCase())
            ;
            contentSecurityPolicy.policies.push({
                name: policyName as any,
                values: policyValues,
            });
        }
        return contentSecurityPolicy as HTTPHeaderValueContentSecurityPolicy;
    },
    "Content-Security-Policy-Report-Only": (headerValue: string) => {
        const contentSecurityPolicy: HTTPHeaderValueContentSecurityPolicy = {
            policies: [],
        };
        const headerValueSplitted: string[] = headerValue.split(";");
        for (const rawPolicy of headerValueSplitted) {
            const rawPolicySplitted: string[] = rawPolicy.split(" ");
            const policyName = rawPolicySplitted[0].trim().toLowerCase();
            const policyValues = rawPolicySplitted
                .slice(1)
                .map((rawPolicy) => rawPolicy.trim().toLowerCase())
            ;
            contentSecurityPolicy.policies.push({
                name: policyName as any,
                values: policyValues,
            });
        }
        return contentSecurityPolicy as HTTPHeaderValueContentSecurityPolicy;
    },
    "Expect-CT": (headerValue: string) => {
        const expectCt: HTTPHeaderValueExpectCT = {
            maxAge: 0,
            enforce: undefined,
            reportUri: undefined,
        };
        expectCt.enforce = headerValue.includes("enforce") ?
            true :
            undefined
        ;
        const parameters = HeaderKeyValueParametersFormatter.format(headerValue);
        expectCt.maxAge = parameters["max-age"] ?
            Number(parameters["max-age"]) :
            0
        ;
        expectCt.reportUri = parameters["report-uri"] ?
            parameters["report-uri"] :
            undefined
        ;
        return expectCt as HTTPHeaderValueExpectCT;
    },
    "Permissions-Policy": (headerValue: string) => {
        const permissionsPolicy: HTTPHeaderValuePermissionsPolicy = {
            policies: [],
        };
        const headerValueSplitted: string[] = headerValue.split(";");
        for (const rawPolicy of headerValueSplitted) {
            const rawPolicySplitted: string[] = rawPolicy.split(" ");
            const policyName = rawPolicySplitted[0].trim().toLowerCase();
            const policyValue = rawPolicySplitted[1].trim().toLowerCase();
            permissionsPolicy.policies.push({
                name: policyName as any,
                value: policyValue as any,
            });
        }
        return permissionsPolicy as HTTPHeaderValuePermissionsPolicy;
    },
    "Strict-Transport-Security": (headerValue: string) => {
        const strictTransportSecurity: HTTPHeaderValueStrictTransportSecurity = {
            maxAge: 0,
            includeSubDomains: undefined,
            preload: undefined,
        };
        strictTransportSecurity.includeSubDomains = headerValue.includes("includeSubDomains") ?
            true :
            undefined
        ;
        strictTransportSecurity.preload = headerValue.includes("preload") ?
            true :
            undefined
        ;
        const parameters = HeaderKeyValueParametersFormatter.format(headerValue);
        strictTransportSecurity.maxAge = parameters["max-age"] ?
            Number(parameters["max-age"]) :
            0
        ;
        return strictTransportSecurity as HTTPHeaderValueStrictTransportSecurity;
    },
    "Upgrade-Insecure-Requests": (headerValue: string) => {
        return "1" as HTTPHeaderValueUpgradeInsecureRequests;
    },
    "X-Content-Type-Options": (headerValue: string) => {
        return "nosniff" as HTTPHeaderValueXContentTypeOptions;
    },
    "Sec-Fetch-Site": (headerValue: string) => {
        return headerValue.trim().toLowerCase() as HTTPHeaderValueSecFetchSite;
    },
    "Sec-Fetch-Mode": (headerValue: string) => {
        return headerValue.trim().toLowerCase() as HTTPHeaderValueSecFetchMode;
    },
    "Sec-Fetch-User": (headerValue: string) => {
        return "?1" as HTTPHeaderValueSecFetchUser;
    },
    "Sec-Fetch-Dest": (headerValue: string) => {
        return headerValue.trim().toLowerCase() as HTTPHeaderValueSecFetchDest;
    },
    "Service-Worker-Navigation-Preload": (headerValue: string) => {
        return (
            headerValue.trim().toLowerCase() ||
            "true"
        ) as HTTPHeaderValueServiceWorkerNavigationPreload;
    },
    "Last-EventID": (headerValue: string) => {
        return headerValue.trim() as HTTPHeaderValueLastEventID;
    },
    "NEL": (headerValue: string) => {
        const rawNel = JSON.parse(headerValue);
        const nel: HTTPHeaderValueNEL = {
            report: {
                to: rawNel.report_to,
                duration: rawNel.max_age,
                successfulRequests: rawNel.success_fraction > 0 ? true : false,
                failedRequests: rawNel.failure_fraction > 0 ? true : false,
                includingSubdomains: rawNel.include_subdomains ? true : false,
                requestHeaders: (rawNel.request_headers || [])
                    .map((headerName: string) =>
                        HTTP_HEADER_BEAUTIFIER[headerName.toLowerCase()] || headerName
                    )
                ,
                responseHeaders: (rawNel.response_headers || [])
                    .map((headerName: string) =>
                        HTTP_HEADER_BEAUTIFIER[headerName.toLowerCase()] || headerName
                    )
                ,
            }
        };
        return nel as HTTPHeaderValueNEL;
    },
    "Report-To": (headerValue: string) => {
        const reportTo: HTTPHeaderValueReportTo = [];
        const headerValueSplitted: string[] = headerValue.split(";");
        for (const rawReportTo of headerValueSplitted) {
            const rawParsedReportTo = JSON.parse(rawReportTo);
            reportTo.push({
                groupName: rawParsedReportTo.group || "",
                duration: rawParsedReportTo.max_age || 0,
                includeSubdomains: rawParsedReportTo.include_subdomains || false,
                endpoints: (
                    rawParsedReportTo.endpoints
                    .map((endpoint: { url: string }) => endpoint.url)
                ) || [],
            });
        }
        return reportTo as HTTPHeaderValueReportTo;
    },
    "Transfer-Encoding": (headerValue: string) => {
        const encodings: HTTPHeaderValueTransferEncoding = [];
        const headerValueSplitted: string[] = headerValue.split(",");
        for (const rawEncoding of headerValueSplitted) {
            encodings.push(rawEncoding.trim().toLowerCase() as ContentEncoder);
        }
        return encodings as HTTPHeaderValueTransferEncoding;
    },
    "TE": (headerValue: string) => {
        const te: HTTPHeaderValueTE = [];
        const headerValueSplitted: string[] = headerValue.split(",");
        for (const rawTe of headerValueSplitted) {
            const rawTeSplitted = rawTe.split(";");
            const teName = rawTeSplitted[0]
                .trim()
                .toLowerCase() as ContentEncoder | 'trailers' | 'chunked'
            ;
            const qualityFactor = Number(
                    HeaderKeyValueParametersFormatter
                        .format(rawTeSplitted[1] || "")["q"]
                )
                ||
                1
            ;
            te.push({
                type: teName,
                qualityFactor,
            });
        }
        return te as HTTPHeaderValueTE;
    },
    "Trailer": (headerValue: string) => {
        const headers: HTTPHeaderValueTrailer = [];
        const headerValueSplitted: string[] = headerValue.split(",");
        for (const rawHeader of headerValueSplitted) {
            const rawHeaderTrimed = rawHeader.trim();
            const header =
                HTTP_HEADER_BEAUTIFIER[rawHeaderTrimed.toLowerCase()] ||
                rawHeaderTrimed
            ;
            headers.push(header);
        }
        return headers as HTTPHeaderValueTrailer;
    },
    "Alt-Svc": (headerValue: string) => {
        if (headerValue.toLowerCase().includes("clear")) {
            return {
                clear: true
            } as HTTPHeaderValueAltSvc;
        }
        const altSvc: HTTPHeaderValueAltSvc = [];
        const headerValueSplitted: string[] = headerValue.split(",");
        for (const rawAltSvc of headerValueSplitted) {
            const parameters = HeaderKeyValueParametersFormatter.format(rawAltSvc);
            const alpn = Object
                .keys(parameters)
                .filter((key) => {
                const lowerCaseKey: string = key.toLowerCase();
                return lowerCaseKey !== "ma" && lowerCaseKey !== "persist";
            })[0] || "";
            altSvc.push({
                type: alpn,
                host: parameters[alpn] || "",
                availableFor: parameters.ma ? Number(parameters.ma) : 0,
                persist: parameters.persist ? true : false,
            });
        }
        return altSvc as HTTPHeaderValueAltSvc;
    },
    "Date": (headerValue: string) => {
        return new Date(headerValue) as HTTPHeaderValueDate;
    },
    "Link": (headerValue: string) => {
        const headerValueSplitted: string[] = headerValue.split(";");
        const parameters = HeaderKeyValueParametersFormatter.format(headerValue);
        const linkParameters: { name: string, value: string }[] = [];
        for (const key of Object.keys(parameters)) {
            linkParameters.push({
                name: key,
                value: parameters[key] || "",
            });
        }
        const rawUrlTrimmed: string = headerValueSplitted[0].trim();
        return {
            url: rawUrlTrimmed.startsWith("<") && rawUrlTrimmed.endsWith(">") ?
                rawUrlTrimmed.slice(1, -1) :
                rawUrlTrimmed
            ,
            parameters: linkParameters,
        } as HTTPHeaderValueLink;
    },
    "Retry-After": (headerValue: string) => {
        const headerValueNumberified = Number(headerValue);
        return isNaN(headerValueNumberified) ?
            new Date(headerValue) :
            headerValueNumberified
        ;
    },
    "Server-Timing": (headerValue: string) => {
        const serverTiming: HTTPHeaderValueServerTiming = [];
        const headerValueSplitted: string[] = headerValue.split(",");
        for (const rawServerTiming of headerValueSplitted) {
            const serverTimingName = rawServerTiming.split(";")[0].trim();
            const parameters = HeaderKeyValueParametersFormatter.format(rawServerTiming);
            serverTiming.push({
                name: serverTimingName,
                description: parameters.desc,
                duration: parameters.dur ? Number(parameters.dur) : 0,
            });
        }
        return serverTiming as HTTPHeaderValueServerTiming;
    },
    "SourceMap": (headerValue: string) => {
        return headerValue.trim() as HTTPHeaderValueSourceMap;
    },
    "Upgrade": (headerValue: string) => {
        const upgrades: HTTPHeaderValueUpgrade = [];
        const headerValueSplitted: string[] = headerValue.split(",");
        for (const rawUpgrade of headerValueSplitted) {
            const rawUpgradeSplitted = rawUpgrade.split("/");
            const protocolName = rawUpgradeSplitted[0].trim();
            const protocolVersion = rawUpgradeSplitted[1] ?
                rawUpgradeSplitted[1].trim() :
                undefined
            ;
            const protocolVersionSplitted = protocolVersion ?
                protocolVersion.split(".") :
                undefined
            ;
            upgrades.push({
                protocol: {
                    name: protocolName,
                    version: protocolVersionSplitted ?
                        {
                            major: Number(protocolVersionSplitted[0]),
                            minor: protocolVersionSplitted[1] ?
                                Number(protocolVersionSplitted[1])
                                :
                                undefined
                            ,
                        } :
                        undefined
                    ,
                }
            });
        }
        return upgrades as HTTPHeaderValueUpgrade;
    },
    "X-DNS-Prefetch-Control": (headerValue: string) => {
        const lowerCaseTrimmedHeaderValue = headerValue.trim().toLowerCase();
        return (
            lowerCaseTrimmedHeaderValue === "true" ?
                true
                :
                false
        )  as HTTPHeaderValueXDNSPrefetchControl;
    },
    "Sec-WebSocket-Accept": (headerValue: string) => {
        return headerValue.trim() as HTTPHeaderValueSecWebSocketAccept;
    },
    "Sec-WebSocket-Key": (headerValue: string) => {
        return headerValue.trim() as HTTPHeaderValueSecWebSocketKey;
    },
    "Sec-WebSocket-Version": (headerValue: string) => {
        return Number(headerValue.trim()) as HTTPHeaderValueSecWebSocketVersion;
    },
};
