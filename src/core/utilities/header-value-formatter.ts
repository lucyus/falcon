import {
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
} from '../../types/header-values.types';
import { HTTPHeader } from '../../types';
import { HEADER_VALUE_PARSER_DATA, HEADER_VALUE_STRINGIFIER_DATA } from '../../data';
import { StringValidator } from '../validators';

export class HeaderValueFormatter {

    public static parse(headerName: 'WWW-Authenticate', headerValue: string): HTTPHeaderValueWWWAuthenticate;
    public static parse(headerName: 'Authorization', headerValue: string): HTTPHeaderValueAuthorization;
    public static parse(headerName: 'Proxy-Authenticate', headerValue: string): HTTPHeaderValueProxyAuthenticate;
    public static parse(headerName: 'Proxy-Authorization', headerValue: string): HTTPHeaderValueProxyAuthorization;
    public static parse(headerName: 'Age', headerValue: string): HTTPHeaderValueAge;
    public static parse(headerName: 'Cache-Control', headerValue: string): HTTPHeaderValueCacheControl;
    public static parse(headerName: 'Clear-Site-Data', headerValue: string): HTTPHeaderValueClearSiteData;
    public static parse(headerName: 'Expires', headerValue: string): HTTPHeaderValueExpires;
    public static parse(headerName: 'Pragma', headerValue: string): HTTPHeaderValuePragma;
    public static parse(headerName: 'Accept-CH', headerValue: string): HTTPHeaderValueAcceptCH;
    public static parse(headerName: 'Sec-CH-UA', headerValue: string): HTTPHeaderValueSecCHUA;
    public static parse(headerName: 'Sec-CH-UA-Arch', headerValue: string): HTTPHeaderValueSecCHUAArch;
    public static parse(headerName: 'Sec-CH-UA-Bitness', headerValue: string): HTTPHeaderValueSecCHUABitness;
    public static parse(headerName: 'Sec-CH-UA-Mobile', headerValue: string): HTTPHeaderValueSecCHUAMobile;
    public static parse(headerName: 'Sec-CH-UA-Model', headerValue: string): HTTPHeaderValueSecCHUAModel;
    public static parse(headerName: 'Sec-CH-UA-Platform', headerValue: string): HTTPHeaderValueSecCHUAPlatform;
    public static parse(headerName: 'Sec-CH-UA-Platform-Version', headerValue: string): HTTPHeaderValueSecCHUAPlatformVersion;
    public static parse(headerName: 'Downlink', headerValue: string): HTTPHeaderValueDownlink;
    public static parse(headerName: 'ECT', headerValue: string): HTTPHeaderValueECT;
    public static parse(headerName: 'RTT', headerValue: string): HTTPHeaderValueRTT;
    public static parse(headerName: 'Early-Data', headerValue: string): HTTPHeaderValueEarlyData;
    public static parse(headerName: 'Save-Data', headerValue: string): HTTPHeaderValueSaveData;
    public static parse(headerName: 'Last-Modified', headerValue: string): HTTPHeaderValueLastModified;
    public static parse(headerName: 'ETag', headerValue: string): HTTPHeaderValueETag;
    public static parse(headerName: 'If-Match', headerValue: string): HTTPHeaderValueIfMatch;
    public static parse(headerName: 'If-None-Match', headerValue: string): HTTPHeaderValueIfNoneMatch;
    public static parse(headerName: 'If-Modified-Since', headerValue: string): HTTPHeaderValueIfModifiedSince;
    public static parse(headerName: 'If-Unmodified-Since', headerValue: string): HTTPHeaderValueIfUnmodifiedSince;
    public static parse(headerName: 'Vary', headerValue: string): HTTPHeaderValueVary;
    public static parse(headerName: 'Connection', headerValue: string): HTTPHeaderValueConnection;
    public static parse(headerName: 'Keep-Alive', headerValue: string): HTTPHeaderValueKeepAlive;
    public static parse(headerName: 'Accept', headerValue: string): HTTPHeaderValueAccept;
    public static parse(headerName: 'Accept-Charset', headerValue: string): HTTPHeaderValueAcceptCharset;
    public static parse(headerName: 'Accept-Encoding', headerValue: string): HTTPHeaderValueAcceptEncoding;
    public static parse(headerName: 'Accept-Language', headerValue: string): HTTPHeaderValueAcceptLanguage;
    public static parse(headerName: 'Expect', headerValue: string): HTTPHeaderValueExpect;
    public static parse(headerName: 'Max-Forwards', headerValue: string): HTTPHeaderValueMaxForwards;
    public static parse(headerName: 'Cookie', headerValue: string): HTTPHeaderValueCookie;
    public static parse(headerName: 'Set-Cookie', headerValue: string): HTTPHeaderValueSetCookie;
    public static parse(headerName: 'Access-Control-Allow-Origin', headerValue: string): HTTPHeaderValueAccessControlAllowOrigin;
    public static parse(headerName: 'Access-Control-Allow-Credentials', headerValue: string): HTTPHeaderValueAccessControlAllowCredentials;
    public static parse(headerName: 'Access-Control-Allow-Headers', headerValue: string): HTTPHeaderValueAccessControlAllowHeaders;
    public static parse(headerName: 'Access-Control-Allow-Methods', headerValue: string): HTTPHeaderValueAccessControlAllowMethods;
    public static parse(headerName: 'Access-Control-Expose-Headers', headerValue: string): HTTPHeaderValueAccessControlExposeHeaders;
    public static parse(headerName: 'Access-Control-Max-Age', headerValue: string): HTTPHeaderValueAccessControlMaxAge;
    public static parse(headerName: 'Access-Control-Request-Headers', headerValue: string): HTTPHeaderValueAccessControlRequestHeaders;
    public static parse(headerName: 'Access-Control-Request-Method', headerValue: string): HTTPHeaderValueAccessControlRequestMethod;
    public static parse(headerName: 'Origin', headerValue: string): HTTPHeaderValueOrigin;
    public static parse(headerName: 'Timing-Allow-Origin', headerValue: string): HTTPHeaderValueTimingAllowOrigin;
    public static parse(headerName: 'Content-Disposition', headerValue: string): HTTPHeaderValueContentDisposition;
    public static parse(headerName: 'Content-Length', headerValue: string): HTTPHeaderValueContentLength;
    public static parse(headerName: 'Content-Type', headerValue: string): HTTPHeaderValueContentType;
    public static parse(headerName: 'Content-Encoding', headerValue: string): HTTPHeaderValueContentEncoding;
    public static parse(headerName: 'Content-Language', headerValue: string): HTTPHeaderValueContentLanguage;
    public static parse(headerName: 'Content-Location', headerValue: string): HTTPHeaderValueContentLocation;
    public static parse(headerName: 'Forwarded', headerValue: string): HTTPHeaderValueForwarded;
    public static parse(headerName: 'Via', headerValue: string): HTTPHeaderValueVia;
    public static parse(headerName: 'Location', headerValue: string): HTTPHeaderValueLocation;
    public static parse(headerName: 'From', headerValue: string): HTTPHeaderValueFrom;
    public static parse(headerName: 'Host', headerValue: string): HTTPHeaderValueHost;
    public static parse(headerName: 'Referer', headerValue: string): HTTPHeaderValueReferer;
    public static parse(headerName: 'Referrer-Policy', headerValue: string): HTTPHeaderValueReferrerPolicy;
    public static parse(headerName: 'User-Agent', headerValue: string): HTTPHeaderValueUserAgent;
    public static parse(headerName: 'Allow', headerValue: string): HTTPHeaderValueAllow;
    public static parse(headerName: 'Server', headerValue: string): HTTPHeaderValueServer;
    public static parse(headerName: 'Accept-Ranges', headerValue: string): HTTPHeaderValueAcceptRanges;
    public static parse(headerName: 'Range', headerValue: string): HTTPHeaderValueRange;
    public static parse(headerName: 'If-Range', headerValue: string): HTTPHeaderValueIfRange;
    public static parse(headerName: 'Content-Range', headerValue: string): HTTPHeaderValueContentRange;
    public static parse(headerName: 'Cross-Origin-Embedder-Policy', headerValue: string): HTTPHeaderValueCrossOriginEmbedderPolicy;
    public static parse(headerName: 'Cross-Origin-Opener-Policy', headerValue: string): HTTPHeaderValueCrossOriginOpenerPolicy;
    public static parse(headerName: 'Cross-Origin-Resource-Policy', headerValue: string): HTTPHeaderValueCrossOriginResourcePolicy;
    public static parse(headerName: 'Content-Security-Policy', headerValue: string): HTTPHeaderValueContentSecurityPolicy;
    public static parse(headerName: 'Content-Security-Policy-Report-Only', headerValue: string): HTTPHeaderValueContentSecurityPolicyReportOnly;
    public static parse(headerName: 'Expect-CT', headerValue: string): HTTPHeaderValueExpectCT;
    public static parse(headerName: 'Permissions-Policy', headerValue: string): HTTPHeaderValuePermissionsPolicy;
    public static parse(headerName: 'Strict-Transport-Security', headerValue: string): HTTPHeaderValueStrictTransportSecurity;
    public static parse(headerName: 'Upgrade-Insecure-Requests', headerValue: string): HTTPHeaderValueUpgradeInsecureRequests;
    public static parse(headerName: 'X-Content-Type-Options', headerValue: string): HTTPHeaderValueXContentTypeOptions;
    public static parse(headerName: 'Sec-Fetch-Site', headerValue: string): HTTPHeaderValueSecFetchSite;
    public static parse(headerName: 'Sec-Fetch-Mode', headerValue: string): HTTPHeaderValueSecFetchMode;
    public static parse(headerName: 'Sec-Fetch-User', headerValue: string): HTTPHeaderValueSecFetchUser;
    public static parse(headerName: 'Sec-Fetch-Dest', headerValue: string): HTTPHeaderValueSecFetchDest;
    public static parse(headerName: 'Service-Worker-Navigation-Preload', headerValue: string): HTTPHeaderValueServiceWorkerNavigationPreload;
    public static parse(headerName: 'Last-EventID', headerValue: string): HTTPHeaderValueLastEventID;
    public static parse(headerName: 'NEL', headerValue: string): HTTPHeaderValueNEL;
    public static parse(headerName: 'Report-To', headerValue: string): HTTPHeaderValueReportTo;
    public static parse(headerName: 'Transfer-Encoding', headerValue: string): HTTPHeaderValueTransferEncoding;
    public static parse(headerName: 'TE', headerValue: string): HTTPHeaderValueTE;
    public static parse(headerName: 'Trailer', headerValue: string): HTTPHeaderValueTrailer;
    public static parse(headerName: 'Alt-Svc', headerValue: string): HTTPHeaderValueAltSvc;
    public static parse(headerName: 'Date', headerValue: string): HTTPHeaderValueDate;
    public static parse(headerName: 'Link', headerValue: string): HTTPHeaderValueLink;
    public static parse(headerName: 'Retry-After', headerValue: string): HTTPHeaderValueRetryAfter;
    public static parse(headerName: 'Server-Timing', headerValue: string): HTTPHeaderValueServerTiming;
    public static parse(headerName: 'SourceMap', headerValue: string): HTTPHeaderValueSourceMap;
    public static parse(headerName: 'Upgrade', headerValue: string): HTTPHeaderValueUpgrade;
    public static parse(headerName: 'X-DNS-Prefetch-Control', headerValue: string): HTTPHeaderValueXDNSPrefetchControl;
    public static parse(headerName: string, headerValue: string): any;
    public static parse(headerName: string, headerValue: string): any {
        return StringValidator.isStandardHttpHeaderName(headerName) ?
            HEADER_VALUE_PARSER_DATA[headerName](headerValue) :
                headerValue
        ;
    }

    public static stringify(headerName: 'WWW-Authenticate', headerValue: HTTPHeaderValueWWWAuthenticate): string;
    public static stringify(headerName: 'Authorization', headerValue: HTTPHeaderValueAuthorization): string;
    public static stringify(headerName: 'Proxy-Authenticate', headerValue: HTTPHeaderValueProxyAuthenticate): string;
    public static stringify(headerName: 'Proxy-Authorization', headerValue: HTTPHeaderValueProxyAuthorization): string;
    public static stringify(headerName: 'Age', headerValue: HTTPHeaderValueAge): string;
    public static stringify(headerName: 'Cache-Control', headerValue: HTTPHeaderValueCacheControl): string;
    public static stringify(headerName: 'Clear-Site-Data', headerValue: HTTPHeaderValueClearSiteData): string;
    public static stringify(headerName: 'Expires', headerValue: HTTPHeaderValueExpires): string;
    public static stringify(headerName: 'Pragma', headerValue: HTTPHeaderValuePragma): string;
    public static stringify(headerName: 'Accept-CH', headerValue: HTTPHeaderValueAcceptCH): string;
    public static stringify(headerName: 'Sec-CH-UA', headerValue: HTTPHeaderValueSecCHUA): string;
    public static stringify(headerName: 'Sec-CH-UA-Arch', headerValue: HTTPHeaderValueSecCHUAArch): string;
    public static stringify(headerName: 'Sec-CH-UA-Bitness', headerValue: HTTPHeaderValueSecCHUABitness): string;
    public static stringify(headerName: 'Sec-CH-UA-Mobile', headerValue: HTTPHeaderValueSecCHUAMobile): string;
    public static stringify(headerName: 'Sec-CH-UA-Model', headerValue: HTTPHeaderValueSecCHUAModel): string;
    public static stringify(headerName: 'Sec-CH-UA-Platform', headerValue: HTTPHeaderValueSecCHUAPlatform): string;
    public static stringify(headerName: 'Sec-CH-UA-Platform-Version', headerValue: HTTPHeaderValueSecCHUAPlatformVersion): string;
    public static stringify(headerName: 'Downlink', headerValue: HTTPHeaderValueDownlink): string;
    public static stringify(headerName: 'ECT', headerValue: HTTPHeaderValueECT): string;
    public static stringify(headerName: 'RTT', headerValue: HTTPHeaderValueRTT): string;
    public static stringify(headerName: 'Early-Data', headerValue: HTTPHeaderValueEarlyData): string;
    public static stringify(headerName: 'Save-Data', headerValue: HTTPHeaderValueSaveData): string;
    public static stringify(headerName: 'Last-Modified', headerValue: HTTPHeaderValueLastModified): string;
    public static stringify(headerName: 'ETag', headerValue: HTTPHeaderValueETag): string;
    public static stringify(headerName: 'If-Match', headerValue: HTTPHeaderValueIfMatch): string;
    public static stringify(headerName: 'If-None-Match', headerValue: HTTPHeaderValueIfNoneMatch): string;
    public static stringify(headerName: 'If-Modified-Since', headerValue: HTTPHeaderValueIfModifiedSince): string;
    public static stringify(headerName: 'If-Unmodified-Since', headerValue: HTTPHeaderValueIfUnmodifiedSince): string;
    public static stringify(headerName: 'Vary', headerValue: HTTPHeaderValueVary): string;
    public static stringify(headerName: 'Connection', headerValue: HTTPHeaderValueConnection): string;
    public static stringify(headerName: 'Keep-Alive', headerValue: HTTPHeaderValueKeepAlive): string;
    public static stringify(headerName: 'Accept', headerValue: HTTPHeaderValueAccept): string;
    public static stringify(headerName: 'Accept-Charset', headerValue: HTTPHeaderValueAcceptCharset): string;
    public static stringify(headerName: 'Accept-Encoding', headerValue: HTTPHeaderValueAcceptEncoding): string;
    public static stringify(headerName: 'Accept-Language', headerValue: HTTPHeaderValueAcceptLanguage): string;
    public static stringify(headerName: 'Expect', headerValue: HTTPHeaderValueExpect): string;
    public static stringify(headerName: 'Max-Forwards', headerValue: HTTPHeaderValueMaxForwards): string;
    public static stringify(headerName: 'Cookie', headerValue: HTTPHeaderValueCookie): string;
    public static stringify(headerName: 'Set-Cookie', headerValue: HTTPHeaderValueSetCookie): string;
    public static stringify(headerName: 'Access-Control-Allow-Origin', headerValue: HTTPHeaderValueAccessControlAllowOrigin): string;
    public static stringify(headerName: 'Access-Control-Allow-Credentials', headerValue: HTTPHeaderValueAccessControlAllowCredentials): string;
    public static stringify(headerName: 'Access-Control-Allow-Headers', headerValue: HTTPHeaderValueAccessControlAllowHeaders): string;
    public static stringify(headerName: 'Access-Control-Allow-Methods', headerValue: HTTPHeaderValueAccessControlAllowMethods): string;
    public static stringify(headerName: 'Access-Control-Expose-Headers', headerValue: HTTPHeaderValueAccessControlExposeHeaders): string;
    public static stringify(headerName: 'Access-Control-Max-Age', headerValue: HTTPHeaderValueAccessControlMaxAge): string;
    public static stringify(headerName: 'Access-Control-Request-Headers', headerValue: HTTPHeaderValueAccessControlRequestHeaders): string;
    public static stringify(headerName: 'Access-Control-Request-Method', headerValue: HTTPHeaderValueAccessControlRequestMethod): string;
    public static stringify(headerName: 'Origin', headerValue: HTTPHeaderValueOrigin): string;
    public static stringify(headerName: 'Timing-Allow-Origin', headerValue: HTTPHeaderValueTimingAllowOrigin): string;
    public static stringify(headerName: 'Content-Disposition', headerValue: HTTPHeaderValueContentDisposition): string;
    public static stringify(headerName: 'Content-Length', headerValue: HTTPHeaderValueContentLength): string;
    public static stringify(headerName: 'Content-Type', headerValue: HTTPHeaderValueContentType): string;
    public static stringify(headerName: 'Content-Encoding', headerValue: HTTPHeaderValueContentEncoding): string;
    public static stringify(headerName: 'Content-Language', headerValue: HTTPHeaderValueContentLanguage): string;
    public static stringify(headerName: 'Content-Location', headerValue: HTTPHeaderValueContentLocation): string;
    public static stringify(headerName: 'Forwarded', headerValue: HTTPHeaderValueForwarded): string;
    public static stringify(headerName: 'Via', headerValue: HTTPHeaderValueVia): string;
    public static stringify(headerName: 'Location', headerValue: HTTPHeaderValueLocation): string;
    public static stringify(headerName: 'From', headerValue: HTTPHeaderValueFrom): string;
    public static stringify(headerName: 'Host', headerValue: HTTPHeaderValueHost): string;
    public static stringify(headerName: 'Referer', headerValue: HTTPHeaderValueReferer): string;
    public static stringify(headerName: 'Referrer-Policy', headerValue: HTTPHeaderValueReferrerPolicy): string;
    public static stringify(headerName: 'User-Agent', headerValue: HTTPHeaderValueUserAgent): string;
    public static stringify(headerName: 'Allow', headerValue: HTTPHeaderValueAllow): string;
    public static stringify(headerName: 'Server', headerValue: HTTPHeaderValueServer): string;
    public static stringify(headerName: 'Accept-Ranges', headerValue: HTTPHeaderValueAcceptRanges): string;
    public static stringify(headerName: 'Range', headerValue: HTTPHeaderValueRange): string;
    public static stringify(headerName: 'If-Range', headerValue: HTTPHeaderValueIfRange): string;
    public static stringify(headerName: 'Content-Range', headerValue: HTTPHeaderValueContentRange): string;
    public static stringify(headerName: 'Cross-Origin-Embedder-Policy', headerValue: HTTPHeaderValueCrossOriginEmbedderPolicy): string;
    public static stringify(headerName: 'Cross-Origin-Opener-Policy', headerValue: HTTPHeaderValueCrossOriginOpenerPolicy): string;
    public static stringify(headerName: 'Cross-Origin-Resource-Policy', headerValue: HTTPHeaderValueCrossOriginResourcePolicy): string;
    public static stringify(headerName: 'Content-Security-Policy', headerValue: HTTPHeaderValueContentSecurityPolicy): string;
    public static stringify(headerName: 'Content-Security-Policy-Report-Only', headerValue: HTTPHeaderValueContentSecurityPolicyReportOnly): string;
    public static stringify(headerName: 'Expect-CT', headerValue: HTTPHeaderValueExpectCT): string;
    public static stringify(headerName: 'Permissions-Policy', headerValue: HTTPHeaderValuePermissionsPolicy): string;
    public static stringify(headerName: 'Strict-Transport-Security', headerValue: HTTPHeaderValueStrictTransportSecurity): string;
    public static stringify(headerName: 'Upgrade-Insecure-Requests', headerValue: HTTPHeaderValueUpgradeInsecureRequests): string;
    public static stringify(headerName: 'X-Content-Type-Options', headerValue: HTTPHeaderValueXContentTypeOptions): string;
    public static stringify(headerName: 'Sec-Fetch-Site', headerValue: HTTPHeaderValueSecFetchSite): string;
    public static stringify(headerName: 'Sec-Fetch-Mode', headerValue: HTTPHeaderValueSecFetchMode): string;
    public static stringify(headerName: 'Sec-Fetch-User', headerValue: HTTPHeaderValueSecFetchUser): string;
    public static stringify(headerName: 'Sec-Fetch-Dest', headerValue: HTTPHeaderValueSecFetchDest): string;
    public static stringify(headerName: 'Service-Worker-Navigation-Preload', headerValue: HTTPHeaderValueServiceWorkerNavigationPreload): string;
    public static stringify(headerName: 'Last-EventID', headerValue: HTTPHeaderValueLastEventID): string;
    public static stringify(headerName: 'NEL', headerValue: HTTPHeaderValueNEL): string;
    public static stringify(headerName: 'Report-To', headerValue: HTTPHeaderValueReportTo): string;
    public static stringify(headerName: 'Transfer-Encoding', headerValue: HTTPHeaderValueTransferEncoding): string;
    public static stringify(headerName: 'TE', headerValue: HTTPHeaderValueTE): string;
    public static stringify(headerName: 'Trailer', headerValue: HTTPHeaderValueTrailer): string;
    public static stringify(headerName: 'Alt-Svc', headerValue: HTTPHeaderValueAltSvc): string;
    public static stringify(headerName: 'Date', headerValue: HTTPHeaderValueDate): string;
    public static stringify(headerName: 'Link', headerValue: HTTPHeaderValueLink): string;
    public static stringify(headerName: 'Retry-After', headerValue: HTTPHeaderValueRetryAfter): string;
    public static stringify(headerName: 'Server-Timing', headerValue: HTTPHeaderValueServerTiming): string;
    public static stringify(headerName: 'SourceMap', headerValue: HTTPHeaderValueSourceMap): string;
    public static stringify(headerName: 'Upgrade', headerValue: HTTPHeaderValueUpgrade): string;
    public static stringify(headerName: 'X-DNS-Prefetch-Control', headerValue: HTTPHeaderValueXDNSPrefetchControl): string;
    public static stringify(headerName: string, headerValue: any): string;
    public static stringify(headerName: string, headerValue: any): string {
        return StringValidator.isStandardHttpHeaderName(headerName) ?
            HEADER_VALUE_STRINGIFIER_DATA[headerName](headerValue) :
                headerValue
        ;
    }

}
