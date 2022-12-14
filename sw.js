/* ! speed-kit 2.12.0 | Copyright (c) 2022 Baqend GmbH */
"use strict";
function e(e) {
    const t = e.split(/[?&#]/)[0],
        s = t.lastIndexOf(".");
    return -1 === s || t.lastIndexOf("/") > s ? "" : t.substr(s).toLowerCase();
}
var t;
function s(e) {
    switch (e) {
        case ".js":
        case ".mjs":
        case ".wasm":
        case ".wast":
            return t.Script;
        case ".html":
        case ".htm":
            return t.Document;
        case ".css":
            return t.Style;
        case ".woff2":
        case ".woff":
        case ".ttf":
        case ".otf":
        case ".eot":
            return t.Font;
        case ".mp3":
        case ".wav":
            return t.Audio;
        case ".vtt":
            return t.Track;
        case ".pdf":
            return t.PDF;
        case ".png":
        case ".jpeg":
        case ".jpg":
        case ".gif":
        case ".svg":
        case ".ico":
        case ".webp":
            return t.Image;
        case ".mp4":
        case ".ogg":
        case ".ogv":
        case ".webm":
            return t.Video;
        default:
            return t.Undefined;
    }
}
function i(i) {
    if ("navigate" === i.mode) return t.Navigate;
    const n = (function (e) {
        for (const s of Object.values(t)) if (s === e) return s;
        return t.Undefined;
    })(i.destination || "");
    if (n !== t.Undefined) return i.url, n;
    if (
        (function (e) {
            return e.headers.has("X-Requested-With") && "XMLHttpRequest" === e.headers.get("X-Requested-With") ? t.Fetch : t.Undefined;
        })(i) !== t.Undefined
    )
        return t.Fetch, i.url, t.Fetch;
    const r = (function (e) {
        const s = [];
        return e && "*/*" !== e
            ? ((e.includes("text/html") || e.includes("application/xhtml+xml")) && s.push(t.Document),
              e.includes("text/css") && s.push(t.Style),
              (e.includes("text/javascript") || e.includes("application/javascript") || e.includes("application/wasm")) && s.push(t.Script),
              e.includes("image/") && s.push(t.Image),
              e.includes("font/") && s.push(t.Font),
              e.includes("video/") && s.push(t.Video),
              e.includes("audio/") && s.push(t.Audio),
              e.includes("text/vtt") && s.push(t.Track),
              1 === s.length ? s[0] : t.Undefined)
            : t.Undefined;
    })(i.headers.get("accept") || "");
    if (r !== t.Undefined) return i.url, r;
    const { pathname: a } = new URL(i.url),
        o = s(e(a));
    return o !== t.Undefined ? (i.url, o) : a.endsWith("/") ? t.Document : t.Undefined;
}
function n(e) {
    const { userAgent: t } = navigator;
    return t.indexOf(e + "/") > -1;
}
function r() {
    return n("Firefox");
}
!(function (e) {
    (e.Document = "document"),
        (e.Navigate = "navigate"),
        (e.Fetch = "fetch"),
        (e.Audio = "audio"),
        (e.Video = "video"),
        (e.Track = "track"),
        (e.PDF = "pdf"),
        (e.Image = "image"),
        (e.Style = "style"),
        (e.Script = "script"),
        (e.Font = "font"),
        (e.Undefined = "undefined");
})(t || (t = {}));
const a = [t.Navigate, t.Document, t.Script, t.Style, t.Undefined];
function o(s, i) {
    const n = s.contentType,
        o = new URL(s.originalRequest.url),
        c = i.relativeModuleImports;
    return (
        !i.shouldResetResponseUrl(s) &&
        (n !== t.Image || !r()) &&
        ((!c && n === t.Script) ||
            !(function (t, s) {
                const { pathname: i } = t,
                    n = ".svg" === e(i);
                return a.includes(s) || n;
            })(o, n))
    );
}
function c(e, t) {
    var s = {};
    for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && t.indexOf(i) < 0 && (s[i] = e[i]);
    if (null != e && "function" == typeof Object.getOwnPropertySymbols) {
        var n = 0;
        for (i = Object.getOwnPropertySymbols(e); n < i.length; n++) t.indexOf(i[n]) < 0 && Object.prototype.propertyIsEnumerable.call(e, i[n]) && (s[i[n]] = e[i[n]]);
    }
    return s;
}
function h(e, t, s, i) {
    var n,
        r = arguments.length,
        a = r < 3 ? t : null === i ? (i = Object.getOwnPropertyDescriptor(t, s)) : i;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(e, t, s, i);
    else for (var o = e.length - 1; o >= 0; o--) (n = e[o]) && (a = (r < 3 ? n(a) : r > 3 ? n(t, s, a) : n(t, s)) || a);
    return r > 3 && a && Object.defineProperty(t, s, a), a;
}
Object.create;
Object.create;
class u {
    constructor(e) {
        (this.Be = []), (this.Bf = e);
    }
    putItem(e, t) {
        this.popItem(e), this.Be.length >= this.Bf && this.Be.shift(), this.Be.push({ navigationKey: e, item: t });
    }
    getItem(e) {
        for (const t of this.Be) if (t.navigationKey === e) return t.item;
        return null;
    }
    popItem(e) {
        for (const t of this.Be) if (t.navigationKey === e) return this.Be.splice(this.Be.indexOf(t), 1), t.item;
        return null;
    }
    size() {
        return this.Be.length;
    }
}
const l = new u(10);
class d {
    constructor(e, t) {
        (this.clientId = e), (this.url = t);
    }
    static fromClientID(e) {
        const t = l.getItem(e);
        if (!t) {
            const t = clients.get(e),
                s = new d(
                    e,
                    t.then((e) => e.url).catch(() => "")
                );
            return l.putItem(e, s), s;
        }
        return t;
    }
    static fromNavigateURL(e, t) {
        const s = new d(t || "", e);
        return t && l.putItem(t, s), s;
    }
}
function p(e) {
    return [].concat(e);
}
const g = [240, 375, 576, 768, 992, 1200, 1920, 2560, 3840];
function m(e) {
    const t = g.find((t) => e <= t);
    return void 0 === t ? -1 : t;
}
function f(e) {
    if (e.clientHintWidth) return new Map([["width", "" + m(e.clientHintWidth)]]);
    if (!e.downscale) return new Map();
    if (e.maxHeight) return new Map([["height", "" + e.maxHeight]]);
    const t = (function (e) {
            const { screenWidth: t, screenDPR: s } = e;
            return m(t * (s * (e.screenSizeFactor || 1)));
        })(e),
        s = e.maxWidth ? e.maxWidth : t;
    return isFinite(s) && s > 0 ? new Map([["width", "" + s]]) : new Map();
}
function w(e) {
    const t = f(e);
    return (
        e.webp && t.set("auto", "webp"),
        null !== e.quality && 100 !== e.quality && t.set("quality", "" + e.quality),
        null === e.quality && e.optimize && t.set("optimize", "" + e.optimize),
        e.pjpeg && e.pathname.match(/\.jpe?g$/i) && t.set("format", "pjpeg"),
        e.format && t.set("format", e.format),
        (function (e, t) {
            const s = t.crop;
            if (s)
                if ("string" == typeof s) e.set("crop", s + ",smart");
                else if (s instanceof Array)
                    if (s.length >= 4) {
                        const [t, i, n, r] = s;
                        e.set("crop", `${n},${r},x${t},y${i}`);
                    } else if (s.length >= 2) {
                        const [t, i] = s;
                        e.set("crop", `${t},${i},smart`);
                    }
        })(t, e),
        (function (e, t) {
            if (!1 !== t.overrideWidth)
                for (const s of p(t.overrideWidth)) {
                    const i = t.searchParams.get(s);
                    if (i && !Number.isNaN(+i)) {
                        e.delete("height"), e.set("width", String(+i));
                        break;
                    }
                }
        })(t, e),
        (function (e, t) {
            if (!1 !== t.overrideHeight)
                for (const s of p(t.overrideHeight)) {
                    const i = t.searchParams.get(s);
                    if (i && !Number.isNaN(+i)) {
                        e.delete("width"), e.set("height", String(+i));
                        break;
                    }
                }
        })(t, e),
        [...t].map((e) => e.join("="))
    );
}
function y(e, t) {
    const { url: s } = e,
        i = s.search.split(/[?&]/).filter((e) => e && !e.includes("="));
    for (const e of i) t.search = t.search.replace(new RegExp(e + "=(&|$)"), e + "$1");
}
function v(e, t) {
    const s = new URL("https://www.baqend.com/");
    return s.searchParams.append(e, t), s.search.replace(/\?/, "");
}
function C(e, t) {
    return (
        (function (e, t) {
            if (!t.search.length) return;
            const s = new URL(e.originalRequest.url),
                i = new Map(),
                n = s.search
                    .substring(1)
                    .split("&")
                    .filter((e) => "" !== e);
            let r = 0;
            s.searchParams.forEach((e, t) => {
                const s = n[r];
                s && i.set(v(t, e), s), (r += 1);
            });
            const a = [...t.searchParams].map((e) => {
                const [t, s] = e,
                    n = i.get(v(t, s));
                return n ? "" + n : `${t}=${s}`;
            });
            t.search = "?" + a.join("&");
        })(e, t),
        y(e, t),
        t
    );
}
function R(e, t) {
    const s = 3 & t.length,
        i = t.length - s,
        n = 3432918353,
        r = 461845907;
    let a, o, c, h;
    for (a = e, h = 0; h < i; )
        (c = (255 & t.charCodeAt(h)) | ((255 & t.charCodeAt((h += 1))) << 8) | ((255 & t.charCodeAt((h += 1))) << 16) | ((255 & t.charCodeAt((h += 1))) << 24)),
            (h += 1),
            (c = ((65535 & c) * n + ((((c >>> 16) * n) & 65535) << 16)) & 4294967295),
            (c = (c << 15) | (c >>> 17)),
            (c = ((65535 & c) * r + ((((c >>> 16) * r) & 65535) << 16)) & 4294967295),
            (a ^= c),
            (a = (a << 13) | (a >>> 19)),
            (o = (5 * (65535 & a) + (((5 * (a >>> 16)) & 65535) << 16)) & 4294967295),
            (a = 27492 + (65535 & o) + (((58964 + (o >>> 16)) & 65535) << 16));
    switch (((c = 0), s)) {
        case 3:
            c ^= (255 & t.charCodeAt(h + 2)) << 16;
        case 2:
            c ^= (255 & t.charCodeAt(h + 1)) << 8;
        case 1:
            (c ^= 255 & t.charCodeAt(h)), (c = ((65535 & c) * n + ((((c >>> 16) * n) & 65535) << 16)) & 4294967295), (c = (c << 15) | (c >>> 17)), (c = ((65535 & c) * r + ((((c >>> 16) * r) & 65535) << 16)) & 4294967295), (a ^= c);
    }
    return (
        (a ^= t.length),
        (a ^= a >>> 16),
        (a = (2246822507 * (65535 & a) + (((2246822507 * (a >>> 16)) & 65535) << 16)) & 4294967295),
        (a ^= a >>> 13),
        (a = (3266489909 * (65535 & a) + (((3266489909 * (a >>> 16)) & 65535) << 16)) & 4294967295),
        (a ^= a >>> 16),
        a >>> 0
    );
}
function D(e) {
    const t = Array.from(e)
        .map((e) => String.fromCharCode(e))
        .join("");
    return btoa(t).replace(/(?:A(?:AAA|AA=|A==))+$/, "");
}
class b {
    constructor(e, t, s) {
        (this.B5 = e), (this.B6 = t), (this.B7 = s);
    }
    static fromJSON(e) {
        return new b(((t = e.b), Uint8Array.from([...atob(t)].map((e) => e.charCodeAt(0)))), e.m, e.h);
        var t;
    }
    contains(e) {
        return this.B3(e).every((e) => this.B4(e));
    }
    toJSON() {
        return { b: D(this.B5), m: this.B6, h: this.B7 };
    }
    B3(e) {
        const t = [],
            s = R(0, e),
            i = R(s, e);
        for (let e = 0; e < this.B7; e += 1) t[e] = (s + e * i) % this.B6;
        return t;
    }
    B4(e) {
        const t = this.B5[e >> 3];
        if (t) {
            return 0 != (t & (1 << (7 & e)));
        }
        return !1;
    }
}
var S;
!(function (e) {
    (e[(e.OK = 200)] = "OK"),
        (e[(e.NoContent = 204)] = "NoContent"),
        (e[(e.BaqendRedirect = 231)] = "BaqendRedirect"),
        (e[(e.MovedPermanently = 301)] = "MovedPermanently"),
        (e[(e.MovedTemporarily = 302)] = "MovedTemporarily"),
        (e[(e.NotModified = 304)] = "NotModified"),
        (e[(e.PermanentRedirect = 308)] = "PermanentRedirect"),
        (e[(e.CORSRedirect = 357)] = "CORSRedirect"),
        (e[(e.BadRequest = 400)] = "BadRequest"),
        (e[(e.Forbidden = 403)] = "Forbidden"),
        (e[(e.InternalServerError = 500)] = "InternalServerError"),
        (e[(e.BadGateway = 502)] = "BadGateway"),
        (e[(e.FetchTypeError = 542)] = "FetchTypeError"),
        (e[(e.TimeoutError = 543)] = "TimeoutError");
})(S || (S = {}));
const k = "baqend-speedkit";
function q(e) {
    const t = e.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)\.?(\d+)?/i) || [];
    let s = null;
    if (/trident/i.test(t[1])) return (s = /\brv[ :]+(\d+)\.?(\d+)?/g.exec(e) || []), ["IE", parseInt(s[1], 10) || 0, parseInt(s[2], 10) || 0];
    const i =
        (function (e) {
            if (/(iPhone|iPod|iPad).*AppleWebKit(?!.*Version)/.test(e)) {
                const t = e.match(/(OS |os |OS)(\d+)_?(\d+)?/i) || [];
                return ["SafariWebView", parseInt(t[2], 10) || 0, parseInt(t[3], 10) || 0];
            }
            return null;
        })(e) ||
        (function (e, t) {
            if ("Chrome" === t[1]) {
                let t = null;
                if (((t = e.match(/\bEdg\/(\d+)\.?(\d+)?/) || e.match(/\bEdge\/(\d+)\.?(\d+)?/)), null != t)) return ["Edge", parseInt(t[1], 10), parseInt(t[2], 10) || 0];
                if (((t = e.match(/\bOPR\/(\d+)\.?(\d+)?/)), null != t)) return ["Opera", parseInt(t[1], 10), parseInt(t[2], 10) || 0];
            }
            return null;
        })(e, t);
    if (null !== i) return i;
    const n = t[2] ? [t[1], parseInt(t[2], 10), parseInt(t[3], 10) || 0] : [navigator.appName, parseInt(navigator.appVersion, 10), 0];
    return -1 === e.indexOf("Android") && null != (s = e.match(/version\/(\d+)\.?(\d+)?/i)) && (n.splice(1, 1, parseInt(s[1], 10)), n.splice(2, 1, parseInt(s[2], 10) || 0)), n;
}
function I(e) {
    return new Promise((t) => setTimeout(t, e));
}
function O(e) {
    const [t] = q(navigator.userAgent);
    return "Safari" === t
        ? (async function e(t) {
              const s = Date.now();
              if (t < 10) return;
              if (t < 500) return I(t);
              await I(500);
              const i = Date.now() - s;
              return e(t - i);
          })(e)
        : I(e);
}
function A(e) {
    const t = e.headers.get("date") || "";
    return Date.parse(t);
}
class N {
    constructor(e) {
        (this.public = e.has("public")),
            (this.private = e.has("private")),
            (this.noCache = e.has("no-cache")),
            (this.onlyIfCached = e.has("only-if-cached")),
            (this.swMaxAge = e.get("sw-max-age")),
            (this.maxAge = e.get("max-age")),
            (this.maxStale = e.get("max-stale")),
            (this.minFresh = e.get("min-fresh")),
            (this.staleWhileRevalidate = e.get("stale-while-revalidate")),
            (this.staleIfError = e.get("stale-if-error")),
            (this.mustRevalidate = e.has("must-revalidate")),
            (this.proxyRevalidate = e.has("proxy-revalidate")),
            (this.immutable = e.has("immutable")),
            (this.noStore = e.has("no-store")),
            (this.noTransform = e.has("no-transform")),
            (this.expires = e.get("expires"));
    }
    static fromString(e) {
        const t = e
                .split(/,\s*/)
                .map((e) => e.split("=", 2))
                .map(([e, t]) => [e, t ? parseInt(t, 10) : -1]),
            s = new Map(t);
        return new N(s);
    }
}
function E(e, t) {
    return N.fromString(e.headers.get(t) || "");
}
function P(e, t) {
    const s = E(e, "cache-control"),
        i = E(e, "baqend-sw-control"),
        n = (function (...e) {
            for (const t of e) if (null != t) return t;
            return null;
        })(s.swMaxAge, s.maxAge),
        r = !!i.expires;
    if (e.headers.has("date") && null != n) {
        const s = (function (e, t, s = 0) {
                const i = e.headers.get(t);
                return null == i ? s : parseInt(i, 10);
            })(e, "age"),
            a = A(e) + t,
            o = (new Date(a - t), r ? i.expires + t : a + 1e3 * (n - s));
        return Date.now(), Date.now() > o;
    }
    return null;
}
var H, B, x, T, U;
!(function (e) {
    (e.SWException = "SWException"), (e.BloomfilterException = "BloomfilterException"), (e.DashboardDisabled = "DashboardDisabled"), (e.ServerError = "ServerError"), (e.None = "None"), (e.AssetTimeout = "AssetTimeout");
})(H || (H = {}));
function L(e) {
    const [, t, s, i, n, r, a] = /^(?:(https?:)\/\/)?(([\w.-]+)(?::(\d+))?)([^#]*)(#.*)?$/.exec(e);
    return { protocol: t, host: s, hostname: i, port: n, pathname: r, hash: a };
}
function F(e) {
    const t = new URL(e);
    return (
        t.hash && (t.hash = ""),
        (function (e) {
            const t = Array.from(e.entries()).sort((e, t) => (e[0] === t[0] ? (e[1] < t[1] ? -1 : 1) : e[0] < t[0] ? -1 : 1));
            t.forEach((t) => e.delete(t[0])), t.forEach((t) => e.append(t[0], t[1]));
        })(t.searchParams),
        t.toString()
    );
}
function W(e) {
    return (function (e) {
        const [, t] = /^(?:(?:\w+?:)?\/\/)?(.*)$/.exec(e);
        return t;
    })(
        (function (e) {
            const t = new URL(e);
            return t.hash && (t.hash = ""), t.toString();
        })(e)
    );
}
function M(e) {
    const t = {};
    return e
        ? (e.split(",").forEach((e) => {
              const s = e.includes(";") ? e.trim().split(";")[0] : e,
                  i = e.match(/desc=([^;]*)/),
                  n = e.match(/dur=([^;]*)/);
              Object.assign(t, { [s]: { desc: i ? i[1] : "", dur: n ? n[1] : "" } });
          }),
          t)
        : t;
}
!(function (e) {
    (e.Blacklist = "Blacklist"),
        (e.ClientError = "ClientError"),
        (e.Redirect = "Redirect"),
        (e.CORSRedirect = "CORSRedirect"),
        (e.CriticalResource = "CriticalResource"),
        (e.Delayed = "Delayed"),
        (e.Disabled = "Disabled"),
        (e.Disconnected = "Disconnected"),
        (e.DynamicBlock = "DynamicBlock"),
        (e.DynamicBlockPreload = "DynamicBlockPreload"),
        (e.DynamicBlockCached = "DynamicBlockCached"),
        (e.Error = "Error"),
        (e.Fallback = "Fallback"),
        (e.Fetchlist = "Fetchlist"),
        (e.FirstLoad = "FirstLoad"),
        (e.GroupChange = "GroupChange"),
        (e.IgnoredAfterPOSTNavigate = "IgnoredAfterPOSTNavigate"),
        (e.InternalServerError = "InternalServerError"),
        (e.LoopDetected = "LoopDetected"),
        (e.NavigationPreload = "NavigationPreload"),
        (e.NonSKGroup = "NonSKGroup"),
        (e.SkUnsupported = "SkUnsupported"),
        (e.NoSwInstalled = "NoSwInstalled"),
        (e.NoSwResponse = "NoSwResponse"),
        (e.Offline = "Offline"),
        (e.Onboarding = "Onboarding"),
        (e.SafeScript = "SafeScript"),
        (e.SwFailed = "SwFailed"),
        (e.TrackingRequest = "TrackingRequest"),
        (e.Unknown = "Unknown"),
        (e.Immutable = "Immutable"),
        (e.BfCache = "BfCache"),
        (e.NotEnabled = "NotEnabled"),
        (e.NotWhitelisted = "NotWhitelisted"),
        (e.UserAgentChanged = "UserAgentChanged"),
        (e.TooLargeRequest = "TooLargeRequest"),
        (e.FormatNotSupported = "FormatNotSupported"),
        (e.OtherSwInstalled = "OtherSwInstalled"),
        (e.SwBooting = "SwBooting"),
        (e.NoNavigate = "NoNavigate"),
        (e.NoMatchingNavigate = "NoMatchingNavigate"),
        (e.Timeout = "Timeout"),
        (e.DisabledSites = "DisabledSites"),
        (e.PartialResponse = "PartialResponse");
})(B || (B = {})),
    (function (e) {
        (e.CacheMiss = "CacheMiss"),
            (e.ExpiredResponse = "ExpiredResponse"),
            (e.InstantRefresh = "InstantRefresh"),
            (e.InvalidCacheSketch = "InvalidCacheSketch"),
            (e.ReloadCacheMode = "ReloadCacheMode"),
            (e.UrlInCacheSketch = "UrlInCacheSketch");
    })(x || (x = {})),
    (function (e) {
        (e.CacheHit = "CacheHit"), (e.RevalidationWhitelist = "RevalidationWhitelist");
    })(T || (T = {})),
    (function (e) {
        (e.AssetAPI = "AssetAPI"),
            (e.Shield = "Shield"),
            (e.Storage = "Storage"),
            (e.Edge = "Edge"),
            (e.Collapsed = "Collapsed"),
            (e.PendingAsset = "PendingAsset"),
            (e.Stream = "Stream"),
            (e.MissingCachingHeader = "MissingCachingHeader"),
            (e.Generated = "Generated"),
            (e.Origin = "Origin"),
            (e.SwCache = "SwCache"),
            (e.SDN = "SDN");
    })(U || (U = {}));
class J {
    constructor(e) {
        (this.HH = null), (this.pop = null), (this.HI = !1), (this.HK = null);
        e.get("etag");
        const t = e.get("x-cache-lookup"),
            s = M(e.get("server-timing"));
        (this.HJ = U.MissingCachingHeader), (this.HG = "MISS"), this.setPoP(s.pop), this.setDuration(s.pop), this.HE(e), this.HF(s.hotness), this.interpretCacheMetric(s.cache, t), this.HG, this.pop, this.HH;
    }
    getDuration() {
        return this.HH;
    }
    setDuration(e) {
        e && e.dur ? (this.HH = parseInt(e.dur, 10)) : (this.HH = null);
    }
    interpretCacheMetric(e, t) {
        const s = !!t;
        if (s && !/Upstream/i.test(t)) return (this.HG = "HIT"), void (this.HJ = U.Edge);
        if (!e || !e.desc) return;
        const i = e.desc;
        if ("HIT" === i) return (this.HG = s ? "SHIELD" : "HIT"), void (this.HJ = s ? U.Shield : U.Edge);
        if ("SHIELD" === i) return (this.HG = "SHIELD"), void (this.HJ = U.Shield);
        var n;
        "STORAGE" !== i
            ? (this.HJ =
                  "MISS" !== i
                      ? U[
                            ((n = i),
                            n
                                .split(/[ _-]/)
                                .filter((e) => !!e.length)
                                .map((e) => `${e.charAt(0).toUpperCase()}${e.slice(1).toLowerCase()}`)
                                .join(""))
                        ] || U.AssetAPI
                      : U.Stream)
            : (this.HJ = U.Storage);
    }
    getResponseSource() {
        return this.HJ;
    }
    getCache() {
        return this.HG;
    }
    setPoP(e) {
        e && e.desc && (this.pop = e.desc);
    }
    getPoP() {
        return this.pop || null;
    }
    isBackendCacheHit() {
        return this.HI;
    }
    HE(e) {
        this.HI = e.has("etag");
    }
    HF(e) {
        e && e.desc ? (this.HK = parseInt(e.desc, 10)) : (this.HK = null);
    }
    getHotness() {
        return this.HK;
    }
}
function j(e) {
    return (
        "opaqueredirect" === e.type ||
        (function (e) {
            return e.status >= S.MovedPermanently && e.status <= S.PermanentRedirect && e.status !== S.NotModified;
        })(e)
    );
}
class $ {
    constructor(e, t, s, i, n) {
        (this.request = s),
            (this.response = i),
            (this.cause = t),
            (this.source = e),
            (this.fastlyHeaders = n),
            i &&
                e.toString() === U.PendingAsset &&
                i.then((e) => {
                    (this.fastlyHeaders = new J(e.headers)), (this.source = this.fastlyHeaders.getResponseSource());
                });
    }
    setDisconnectCause(e) {
        this.disconnectCause = e;
    }
    waitUntil(...e) {
        this.request.waitUntil(...e);
    }
    clone(e) {
        return new $(this.source, this.cause, e, this.response && this.response.then((e) => e.clone()));
    }
    async getResponseStatus() {
        if (!this.response) return null;
        return (await this.response).status;
    }
    async wasRedirectedFromOrigin() {
        if (this.source !== U.Origin || !this.response) return !1;
        const e = await this.response;
        return e.redirected || e.url !== this.request.originalRequest.url;
    }
    async isRedirect() {
        return !!this.response && j(await this.response);
    }
    async isSuccessful() {
        return !!this.response && !(await this.isClientError()) && !(await this.isServerError());
    }
    async isClientError() {
        if (!this.response) return this.cause === B.ClientError;
        try {
            if ("opaqueredirect" === (await this.response).type) return !1;
            const e = await this.getResponseStatus();
            return !e || (e >= S.BadRequest && e < S.InternalServerError);
        } catch (e) {
            return (this.disconnectCause = H.SWException), !1;
        }
    }
    async isServerError() {
        if (!this.response) return this.cause === B.InternalServerError;
        try {
            const e = await this.getResponseStatus();
            return "opaqueredirect" !== (await this.response).type && (!e || e >= S.InternalServerError || 0 === e);
        } catch (e) {
            return (this.disconnectCause = H.SWException), !0;
        }
    }
}
function z(e, t, s, i) {
    t && e.markAsFetched();
    const n = i ? Promise.resolve(i) : void 0;
    return new $(U.Origin, s, e, n);
}
function K(e, t, s, i) {
    t && e.markAsFetched();
    const n = i ? Promise.resolve(i) : void 0;
    return new $(U.SwCache, s, e, n);
}
function G(e, t, s, i) {
    t && e.markAsFetched();
    const n = i ? Promise.resolve(i) : void 0;
    return new $(U.PendingAsset, s, e, n);
}
function V(e, t, s = {}, i, n = U.Generated, r) {
    return e.markAsFetched(), new $(n, i, e, Promise.resolve(new Response(t, s)), r);
}
function _(e, t, s) {
    e.markAsFetched();
    const i = new $(U.Origin, B.Error, e, Promise.resolve(t));
    return i.setDisconnectCause(s), i;
}
function Q(e) {
    return e === U.Edge || e === U.AssetAPI || e === U.Stream || e === U.Collapsed || e === U.Shield || e === U.Storage || e === U.PendingAsset || e === U.MissingCachingHeader;
}
class X {
    constructor(e, t) {
        (this.urls = e),
            (this.contentTypes = t),
            (this.urlRegExp = (function (e) {
                const t = [];
                if (
                    (e &&
                        t.push(
                            ...[...e].map((e) => {
                                return `^${((t = e), t.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")).replace(/\\\*/g, ".*")}$`;
                                var t;
                            })
                        ),
                    t.length)
                )
                    return new RegExp(t.join("|"));
            })(e));
    }
    static fromJSON(e) {
        const t = (e) => {
            if (e && e.length) return new Set(e);
        };
        return new X(t(e.urls), t(e.contentTypes));
    }
    match(e, t) {
        let s = this.doesContentTypeMatch(t);
        return this.urlRegExp && (s = s && !!e.match(this.urlRegExp)), s;
    }
    toJSON() {
        const e = (e) => {
            if (e) return [...e];
        };
        return { urls: e(this.urls), contentTypes: e(this.contentTypes) };
    }
    doesContentTypeMatch(e) {
        const s = e === t.Undefined,
            i = e === t.Navigate;
        return !(this.contentTypes && !s) || (i ? this.contentTypes.has(t.Document) || this.contentTypes.has(t.Navigate) : this.contentTypes.has(e));
    }
}
function Y(e) {
    return function (t) {
        return class extends t {
            async handle(t, s, i) {
                if (!this.Ha(s)) return !1;
                const { type: n } = s,
                    r = c(s, ["type"]);
                return e === n && super.handle(t, r, i);
            }
            Ha(e) {
                return !!e && "object" == typeof e && "string" == typeof e.type;
            }
        };
    };
}
function Z(e) {
    return function (t) {
        return class extends t {
            cachePath() {
                return e;
            }
        };
    };
}
function* ee(e, t) {
    for (const s of e) yield* t(s);
}
class te {
    constructor(e) {
        if (((this[Symbol.toStringTag] = "MultiMap"), (this.HS = new Map()), e)) for (const [t, s] of e) this.HS.has(t) ? this.HS.get(t).add(s) : this.HS.set(t, new Set([s]));
    }
    get size() {
        return (e = this.values()), [...e].length;
        var e;
    }
    [Symbol.iterator]() {
        return this.entries();
    }
    entries() {
        return ee(this.HS.entries(), ([e, t]) =>
            (function* (e, t) {
                for (const s of e) yield t(s);
            })(t, (t) => [e, t])
        );
    }
    keys() {
        return this.HS.keys();
    }
    values() {
        return ee(this.HS.values(), (e) => e.keys());
    }
    clear() {
        this.HS.clear();
    }
    delete(e) {
        return this.HS.delete(e);
    }
    forEach(e, t) {
        for (const [s, i] of this.entries()) e.call(t, i, s, this);
    }
    map(e, t) {
        return new te([...this.entries()].map(([s, i]) => e.call(t, i, s, this)));
    }
    filter(e, t) {
        return new te([...this.entries()].filter(([s, i]) => e.call(t, i, s, this)));
    }
    filterKey(e, t) {
        return new te([...this.entries()].filter(([s]) => e.call(t, s, this)));
    }
    getAll(e) {
        const t = this.HS.get(e);
        if (!t) {
            const t = new Set();
            return this.HS.set(e, t), t;
        }
        return t;
    }
    get(e) {
        return (function (e) {
            const [t] = e;
            return t;
        })(this.getAll(e));
    }
    has(e) {
        return this.HS.has(e);
    }
    add(e, t) {
        return this.getAll(e).add(t), this;
    }
    set(e, t) {
        const s = this.getAll(e);
        return s.clear(), s.add(t), this;
    }
    setAll(e, t) {
        const s = this.getAll(e);
        s.clear();
        for (const e of t) s.add(e);
        return this;
    }
}
class se {
    constructor() {
        this.Dr = [];
    }
    observe(e) {
        this.Dr.push(e);
    }
    notify() {
        for (const e of this.Dr) e();
    }
}
const ie = [t.Image, t.Style, t.Font, t.Script];
let ne = class extends se {
    constructor(e) {
        super(), (this.revalidationWhitelist = new Set()), (this.refreshJobs = new te()), (this.Dj = 0), (this.Dk = "default"), (this.Dl = null), (this.Di = e);
    }
    addToRevalidationWhitelist(e, t) {
        ie.includes(t) || this.revalidationWhitelist.add(e);
    }
    clearRevalidationWhitelist() {
        this.revalidationWhitelist.clear();
    }
    updateLastReload() {
        this.lastReload = Date.now();
    }
    isExpired() {
        return null == this.maxAge || this.maxAge < Date.now();
    }
    isInvalid() {
        if (null == this.maxAge) return !0;
        const e = this.Di.staleWhileRevalidate,
            t = this.maxAge + e <= Date.now();
        return this.maxAge, Date.now(), t;
    }
    isOnWhitelist(e, t, s) {
        if (this.revalidationWhitelist.has(e)) return !0;
        if (ie.includes(t)) {
            const e = A(s) + this.getDrift(),
                t = Date.now() - e < this.Di.staleWhileRevalidate,
                i = !this.lastReload || e > this.lastReload;
            if (t && i) return !0;
        }
        return !1;
    }
    isInBloomFilter(e) {
        return !this.bloomFilter || this.bloomFilter.contains(e);
    }
    isResponseStale(e, t, s) {
        const i = A(s),
            n = this.refreshJobs.filterKey((e) => e.getTime() >= i);
        for (const s of n.values()) if (s.match(e, t)) return JSON.stringify(s.toJSON()), !0;
        return !1;
    }
    getDrift() {
        return this.Dj;
    }
    getClientRevision() {
        return this.Dk;
    }
    getServerRevision() {
        return this.Dl;
    }
    update(e) {
        void 0 !== e.body && this.Dh(e.body),
            void 0 !== e.maxAge && (this.maxAge = e.maxAge),
            void 0 !== e.drift && (this.Dj = e.drift),
            void 0 !== e.clientRevision && (this.Dk = e.clientRevision),
            void 0 !== e.serverRevision && (this.Dl = e.serverRevision),
            this.notify();
    }
    purge() {
        (this.bloomFilter = void 0), (this.maxAge = void 0), this.revalidationWhitelist.clear(), this.notify();
    }
    toJSON() {
        return { maxAge: this.maxAge, body: this.Df(), drift: this.Dj, clientRevision: this.Dk, serverRevision: this.Dl };
    }
    fromJSON(e) {
        (this.Dj = e.drift), this.Dh(e.body), e.maxAge && (this.maxAge = e.maxAge), void 0 !== e.clientRevision && (this.Dk = e.clientRevision), void 0 !== e.serverRevision && (this.Dl = e.serverRevision);
    }
    Df() {
        if (!this.bloomFilter) return;
        const e = this.Dg();
        return Object.assign(Object.assign({}, this.bloomFilter.toJSON()), { r: e });
    }
    Dg() {
        if (this.refreshJobs.size) return [...this.refreshJobs.map((e, t) => [t.getTime(), e.toJSON()])];
    }
    Dh(e) {
        if ((this.refreshJobs.clear(), e && ((this.bloomFilter = b.fromJSON(e)), e.r))) for (const [t, s] of e.r) this.refreshJobs.add(new Date(t), X.fromJSON(s));
    }
};
ne = h([Z("/com.baqend.speedkit.clock")], ne);
class re {
    constructor(e = "") {
        (this.Dm = new Map()), e && this.fromString(e);
    }
    clear() {
        this.Dm.clear();
    }
    fromString(e) {
        this.clear();
        const t = e.trim();
        if (!t) return;
        const s = t.split(/\s*;\s+/);
        for (const e of s) {
            const [t, s] = e.split(/\s*=\s*/, 2);
            this.Dm.set(t, s);
        }
    }
    toString() {
        return [...this.Dm].map(([e, t]) => `${e}=${t}`).join("; ");
    }
    getItem(e) {
        return this.Dm.get(e);
    }
    keys() {
        return this.Dm.keys();
    }
    entries() {
        return this.Dm.entries();
    }
    getMap() {
        return this.Dm;
    }
}
let ae = class extends se {
    constructor() {
        super(), (this.Dn = new Map());
    }
    getCookies(e) {
        return this.Dn.get(e) || new re();
    }
    updateCookies(e, t) {
        this.Dn.set(e, new re(t)), this.notify();
    }
    toJSON() {
        return { origins: [...this.Dn].map(([e, t]) => [e, t.toString()]) };
    }
    fromJSON(e) {
        if ("string" == typeof e) return this.fromJSON({ origins: [[location.origin, e]] }), void this.notify();
        const { origins: t } = e;
        this.Dn.clear();
        for (const [e, s] of t) this.Dn.set(e, new re(s));
        this.Dn;
    }
};
function oe(e) {
    if ("string" != typeof e) return null;
    const t = /^regexp:\/(.*)\/([\w]*)$/.exec(e);
    if (t) {
        const [, e, s] = t;
        return new RegExp(e, s);
    }
    return null;
}
function ce(e) {
    return JSON.parse(e, (e, t) => ("string" == typeof t && oe(t)) || t);
}
function he(e, t) {
    if (!t || "/" === t) return e;
    return `${"" + (t.lastIndexOf("/") === t.length - 1 ? t.substr(0, t.length - 1) : t)}${`${0 === e.indexOf("/") ? "" : "/"}${e}`}`;
}
ae = h([Z("/com.baqend.speedkit.cookie")], ae);
let ue = class extends se {
    constructor(e) {
        super(), (this.count = 1), (this.disabledCount = 0), (this.disconnectedCount = 0), (this.Du = e), (this.Dv = []);
    }
    getAndResetCount() {
        const e = this.count;
        return e > 0 ? ((this.count = 0), this.notify(), e) : 0;
    }
    getAndResetDisabledCount() {
        const e = this.disabledCount;
        return 0 !== this.disabledCount && ((this.disabledCount = 0), this.notify()), e;
    }
    getAndResetDisconnectedCount() {
        const e = this.disconnectedCount;
        return 0 !== this.disconnectedCount && ((this.disconnectedCount = 0), this.notify()), e;
    }
    decrementCount() {
        (this.count -= 1), this.notify();
    }
    incrementCount(e, t) {
        this.Dv.includes(t) || ((this.count += 1), this.Dv.length > 10 && this.Dv.shift(), t && this.Dv.push(t), this.notify(), this.Du.shouldCountIFrameNavigation() || this.Ds(e).then((e) => e && this.decrementCount()));
    }
    incrementDisabledCount(e, t) {
        this.Dv.includes(t) || ((this.disabledCount += 1), this.Dv.length > 10 && this.Dv.shift(), t && this.Dv.push(t), this.notify(), this.Du.shouldCountIFrameNavigation() || this.Ds(e).then((e) => e && this.decrementDisabledCount()));
    }
    decrementDisabledCount() {
        (this.disabledCount -= 1), this.notify();
    }
    incrementDisconnectedCount(e, t) {
        this.Dv.includes(t) ||
            ((this.disconnectedCount += 1), this.Dv.length > 10 && this.Dv.shift(), t && this.Dv.push(t), this.notify(), this.Du.shouldCountIFrameNavigation() || this.Ds(e).then((e) => e && this.decrementDisconnectedCount()));
    }
    decrementDisconnectedCount() {
        (this.disconnectedCount -= 1), this.notify();
    }
    appendParamsToBloomFilterUrl(e) {
        if (0 === this.disconnectedCount && 0 === this.disabledCount) return;
        const t = this.Dt();
        e.searchParams.append("bqpi", "0"), (e.search += ";" + t.join(";"));
    }
    appendParamsToAssetUrl(e) {
        const t = this.getAndResetCount(),
            s = this.Dt();
        (t < 1 && !s.length) || (e.searchParams.append("bqpi", "" + t), s.length && (e.search += ";" + s.join(";")));
    }
    fromJSON(e) {
        (this.count = void 0 !== e.count ? e.count : 1), (this.disabledCount = e.disabledCount || 0), (this.disconnectedCount = e.disconnectedCount || 0);
    }
    toJSON() {
        return { count: this.count, disabledCount: this.disabledCount, disconnectedCount: this.disconnectedCount };
    }
    async Ds(e) {
        const t = e.resultingClientId || e.navigation.clientId;
        if (!t) return !1;
        const s = await clients.get(t);
        return !(r() && !s) && (!s || "nested" === s.frameType);
    }
    Dt() {
        const e = [],
            t = this.getAndResetDisconnectedCount();
        t > 0 && e.push("dc=" + t);
        const s = this.getAndResetDisabledCount();
        return s > 0 && e.push("de=" + s), e;
    }
};
ue = h([Z("/com.baqend.speedkit.pi")], ue);
let le = class extends se {
    constructor() {
        super(...arguments), (this.dpr = 1), (this.width = 1 / 0);
    }
    fromJSON(e) {
        (this.dpr = e.dpr || 1), (this.width = e.width || 1 / 0);
    }
    toJSON() {
        return { dpr: this.dpr, width: this.width };
    }
};
function de(e, ...t) {
    const s = e.toLowerCase();
    return t.some((e) => ("string" == typeof e ? s.includes(e) : e.test(s)));
}
le = h([Z("/com.baqend.speedkit.screen")], le);
const pe = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series[46]0|symbian|treo|up\.(?:browser|link)|vodafone|wap|windows ce|xda|xiino/,
    ge = /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br[ev]w|bumb|bw\-[nu]|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c[- ]|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/;
function me(e) {
    return de(e, "tablet", "ipad", "nexus 7", "nexus 10", "silk/", /\bgt-[pn]\d{4}\b/, /\bsm-t\d{3}\b/, /^.*android(?!.*mobile|.*smart-tv|.*smarttv|.*aft[tm]|.*crkey).*$/);
}
function fe(e) {
    return de(e, "appletv", "apple tv", "googletv", "crkey", "armv7l", "aftt", "aftm", "roku", "bravia", "philipstv", "tsbnettv", "smarttv", "smart-tv", /\btv\b/);
}
function we(e, t) {
    if (!t) return e.toString();
    try {
        return new URL(t).toString();
    } catch (s) {
        if (t.startsWith("//")) return `${e.protocol}${t}`;
        if (t.startsWith("/")) return `${e.origin}${t}`;
        const i = (function e(t) {
                return t.startsWith("/") ? e(t.substr(1)) : t;
            })(e.pathname).split("/"),
            n = t.split("/");
        i.pop();
        for (const e of n) ".." === e ? i.pop() : "." === e || i.push(e);
        return `${e.origin}/${i.join("/")}`;
    }
}
class ye {}
ye.propName = "";
class ve extends ye {
    constructor(e = []) {
        super(), (this.Hb = e);
    }
    matches(e, t, s) {
        return !!this.Hb.length && this.Hb.every((i) => i.matches(e, t, s));
    }
    toJSON() {
        const e = {};
        for (const t of this.Hb) {
            e[t.constructor.propName] = t.toJSON();
        }
        return e;
    }
    fromJSON(e) {
        if ("string" == typeof e) return this.fromJSON(ce(e));
        for (const [t, s] of Object.entries(e)) {
            if (!Be[t]) throw new Error("Illegal rule: " + t);
            {
                const e = new Be[t]();
                e.fromJSON(s), this.addCondition(e);
            }
        }
        return this;
    }
    addCondition(e) {
        return this.Hb.push(e);
    }
    removeCondition(e) {
        const t = this.Hb.indexOf(e);
        return !(t < 0) && (this.Hb.splice(t, 1), !0);
    }
}
function Ce(e, t) {
    return t instanceof Array ? t.some((t) => Ce(e, t)) : t instanceof RegExp ? t.test(e) : e.toLowerCase().startsWith(t.toLowerCase());
}
class Re extends ye {
    constructor(e = []) {
        super(), (this.Hc = e);
    }
    matches(e, s, n) {
        if (!this.Hc.length) return !1;
        const r = s || i(e);
        if (r === t.Navigate) {
            const e = this.Hc.includes(r) || this.Hc.includes(t.Document);
            return e;
        }
        const a = this.Hc.includes(r);
        return a;
    }
    toJSON() {
        return this.Hc;
    }
    fromJSON(e) {
        if ("string" == typeof e) return this.fromJSON(ce(e));
        if (e instanceof Array) return (this.Hc = e), this;
        throw new Error("Invalid ContentTypeCondition JSON");
    }
}
Re.propName = "contentType";
class De extends ye {
    constructor(e) {
        super(), (this.Hi = e);
    }
    test(e) {
        return null != this.Hi && Ce(e, this.Hi);
    }
    toJSON() {
        return this.Hi
            ? (function e(t) {
                  return t instanceof Array ? t.map((t) => e(t)) : t instanceof RegExp ? `regexp:/${(s = t).source}/${s.flags || ""}` : t;
                  var s;
              })(this.Hi)
            : null;
    }
    fromJSON(e) {
        if (null == e || "null" === e) return (this.Hi = null), this;
        try {
            return this.fromJSON(ce(e));
        } catch (e) {}
        return (this.Hi = e), this;
    }
}
class be extends De {
    matches(e, t, s) {
        if (!s) return !1;
        if (!e.url.startsWith(location.origin)) return location.origin, !1;
        const i = [...s.entries()].some((e) => this.test(`${e[0]}=${e[1]}`));
        return i;
    }
}
be.propName = "cookie";
class Se extends ye {
    matches(e, t, s) {
        const i = e.headers.get("user-agent") || navigator.userAgent;
        return !i || (this.constructor.name, this.userAgentMatches(i), this.userAgentMatches(i));
    }
    toJSON() {
        return !0;
    }
    fromJSON(e) {
        return this;
    }
}
class ke extends Se {
    userAgentMatches(e) {
        return (function (e) {
            return de(e, "wow64", "windows nt", "win64", "msie", "macintosh;", "linux x86_64");
        })(e);
    }
}
ke.propName = "desktop";
class qe extends De {
    matches(e, t, s) {
        return this.test(L(e.url).host);
    }
}
qe.propName = "host";
class Ie extends Se {
    userAgentMatches(e) {
        return (
            !(/\bsm-t\d{3}\b/i.test(e) || /\bgt-p\d{3}/i.test(e)) &&
            (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|samsungbrowser|psp|series[46]0|symbian|treo|up\.(?:browser|link)|vodafone(?!.*tab)|wap|windows ce|xda|xiino/i.test(
                e
            ) ||
                /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br[ev]w|bumb|bw\-[nu]|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c[- ]|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
                    e.substr(0, 4)
                ))
        );
    }
}
Ie.propName = "mobile";
class Oe extends De {
    matches(e, t, s) {
        return this.test(L(e.url).pathname);
    }
}
Oe.propName = "pathname";
class Ae extends ye {
    constructor(e = []) {
        super(), (this.Hd = e);
    }
    get size() {
        return this.Hd.length;
    }
    toJSON() {
        return this.Hd.map((e) => e.toJSON());
    }
    fromJSON(e) {
        const t = e || [];
        if (t instanceof Array) return (this.Hd = t.map((e) => new ve().fromJSON(e))), this;
        throw new Error("Invalid RuleSet JSON");
    }
    matches(e, t, s) {
        return this.Hd.some((i) => i.matches(e, t, s));
    }
    [Symbol.iterator]() {
        return this.Hd[Symbol.iterator]();
    }
    addRule(e) {
        return this.Hd.push(e);
    }
    removeRule(e) {
        const t = this.Hd.indexOf(e);
        return !(t < 0) && (this.Hd.splice(t, 1), !0);
    }
}
class Ne extends Se {
    userAgentMatches(e) {
        return me(e);
    }
}
Ne.propName = "tablet";
class Ee extends Se {
    userAgentMatches(e) {
        return fe(e);
    }
}
Ee.propName = "tv";
class Pe extends De {
    matches(e, t, s) {
        return this.test(W(e.url));
    }
}
Pe.propName = "url";
class He extends De {
    matches(e, t, s) {
        return this.test(L(e.url).hash || "");
    }
}
He.propName = "hashparam";
const Be = { [Re.propName]: Re, [be.propName]: be, [ke.propName]: ke, [qe.propName]: qe, [Ie.propName]: Ie, [Oe.propName]: Oe, [Ne.propName]: Ne, [Ee.propName]: Ee, [Pe.propName]: Pe, [He.propName]: He };
var xe, Te;
function Ue(e, t) {
    return e instanceof Promise ? e.then((e) => t(e)) : t(e);
}
function Le(e, t) {
    const s = e.rumTracking;
    if (!s || ("object" == typeof s && s.noTracking)) return;
    const i = e.appURL + "/rum/pi";
    fetch(i, { method: "POST", headers: { "Content-Type": "text/plain;charset=UTF-8" }, body: JSON.stringify({ jsErrors: [t] }) }).catch((e) => {});
}
function Fe(e) {
    return new Function("return " + e)();
}
!(function (e) {
    (e.LOAD = "load"), (e.SPEED_KIT_DYNAMIC_LOADED = "speed-kit-dynamic-loaded");
})(xe || (xe = {}));
let We = (Te = class extends se {
    constructor(e, t) {
        super(), (this.D1 = !0), (this.properties = Te.getDefaults()), (this.D2 = !1), (this.Dz = e), (this.D0 = t);
    }
    get appURL() {
        if (!this.optionalAppURL) throw new Error("Options are not initialized yet.");
        return this.optionalAppURL;
    }
    get reconnectInterval() {
        return this.properties.reconnectInterval;
    }
    get refreshInterval() {
        return 1e3 * this.properties.refreshInterval;
    }
    get relativeModuleImports() {
        return this.properties.relativeModuleImports;
    }
    get staleWhileRevalidate() {
        return 1e3 * this.properties.staleWhileRevalidate;
    }
    get preloadBloomFilter() {
        return this.properties.preloadBloomFilter;
    }
    get navigationPreload() {
        return this.properties.navigationPreload;
    }
    get cachingDisabled() {
        return this.properties.disableCache;
    }
    get originCachingEnabled() {
        return this.properties.enableOriginCache;
    }
    get preloadDynamicBlocks() {
        return this.properties.preloadDynamicBlocks;
    }
    get sdnSetup() {
        return this.properties.sdnSetup;
    }
    get ignoreAfterPostNavigate() {
        return this.properties.ignoreAfterPostNavigate;
    }
    get offlinePage() {
        return this.properties.offlinePage || null;
    }
    get useCacheWhenOffline() {
        return this.properties.useCacheWhenOffline;
    }
    get rumTracking() {
        return this.properties.rumTracking;
    }
    get enforceDisabledPages() {
        return this.properties.enforceDisabledPages;
    }
    get omitImageCredentials() {
        return this.properties.omitImageCredentials;
    }
    shouldCacheRequest(e) {
        const { request: s, cookies: i } = e,
            n = this.userAgentChangeDetected(e);
        if (e.modifying) return e.setResponseCause(B.Blacklist), !1;
        if (e.url.hash.indexOf("bqBlacklist") >= 0) return e.setResponseCause(B.Blacklist), !1;
        if ("navigate" === e.request.mode && this.getCustomDevice() && n) return e.setResponseCause(B.UserAgentChanged), this.D0.setCustomDevice(""), !1;
        if (this.properties.disableCache) return e.setResponseCause(B.Disabled), !1;
        if (this.properties.whitelist.size && !this.properties.whitelist.matches(s, e.contentType, i)) return e.setResponseCause(B.NotWhitelisted), !1;
        if (this.properties.blacklist.matches(s, e.contentType, i)) return e.setResponseCause(B.Blacklist), !1;
        if (encodeURI(s.url).length > 3800) return e.setResponseCause(B.TooLargeRequest), !1;
        return !(e.contentType === t.Image && !this.supportsWebP(e) && !e.isCritical()) || (e.setResponseCause(B.FormatNotSupported), !1);
    }
    supportsWebP(e) {
        const t = e.request.headers.get("Accept");
        return this.properties.enforceImageServing || (!!t && (t.includes("image/webp") || "*/*" === t));
    }
    shouldEnsureFetch(e) {
        if (e.isDynamicBlockRequest() || e.isNavigateRequest()) return !1;
        if (this.shouldDelayRequest(e)) return !1;
        if (this.isTrackingRequest(e)) return !1;
        const t = (!this.properties.whitelist.size || this.properties.whitelist.matches(e.request, e.contentType, e.cookies)) && !e.modifying,
            s = this.properties.blacklist.matches(e.request, e.contentType, e.cookies),
            i = this.properties.fetchlist.matches(e.request, e.contentType, e.cookies);
        return (!t && !s) || (s && i);
    }
    shouldDelayRequest(e) {
        const s = this.properties.delayed.some((t) => t.rules.matches(e.request, e.contentType, e.cookies)),
            i = e.contentType,
            n = [t.Script, t.Image];
        return s && !!i && n.includes(i);
    }
    isEnabledOnSite(e) {
        return Ue(e.getNavigateUrl(), (t) => 0 !== t.length && this.Dx(e, this.properties.enabledSites));
    }
    isEnabledOnURL(e, t, s = this.properties.enabledSites) {
        if (this.isDisabledOnURL(e, t)) return !1;
        if (!s.size) return !0;
        const i = s.matches(new Request(e), t.contentType, t.cookies);
        return i;
    }
    isDisabledOnURL(e, t) {
        if (!this.properties.disabledSites.size) return !1;
        const s = this.properties.disabledSites.matches(new Request(e), t.contentType, t.cookies);
        return s;
    }
    isImmutable(e) {
        if (!this.properties.immutableAssets.size || e.isNavigateRequest()) return !1;
        const { request: t, cookies: s } = e,
            i = this.properties.immutableAssets.matches(t, e.contentType, s);
        return t.url, i;
    }
    isTrackingRequest(e, t = this.properties.trackingRequests) {
        const { request: s, cookies: i } = e,
            n = t.matches(s, e.contentType, i);
        return s.url, n;
    }
    shouldApplyUserAgentDetection(e) {
        return this.properties.userAgentDetection && this.properties.userAgentDetection.matches(e.originalRequest);
    }
    Dw(e) {
        if (!this.properties.disabledSites.size) return !1;
        if (e.isNavigateRequest()) {
            const t = this.properties.disabledSites.matches(e.originalRequest, e.contentType, e.cookies);
            return t && e.setResponseCause(B.DisabledSites), t;
        }
        const t = Ue(e.navigation.url, (t) => this.isDisabledOnURL(t, e));
        return t && e.setResponseCause(B.DisabledSites), t;
    }
    Dx(e, t) {
        return Ue(this.Dw(e), (s) => {
            if (s) return e.setResponseCause(B.DisabledSites), !1;
            if (!t || !t.size) return !0;
            if (e.isNavigateRequest()) {
                const s = t.matches(e.originalRequest, e.contentType, e.cookies);
                return s || e.setResponseCause(B.NotEnabled), s;
            }
            const i = Ue(e.navigation.url, (s) => this.isEnabledOnURL(s, e, t));
            return i || e.setResponseCause(B.NotEnabled), i;
        });
    }
    hasCustomVariation() {
        return !!this.properties.customVariation.length;
    }
    getCustomVariation(e, t) {
        const s = e.originalRequest;
        let i = null;
        return (
            this.properties.customVariation.forEach((n) => {
                if (!n.rules || n.rules.matches(s))
                    try {
                        i = n.variationFunction(s, t, e.cookies.getMap());
                    } catch (e) {
                        Le(this, { type: "sw", timestamp: Date.now(), action: "variationFunctionError", stackTrace: e.stack, message: e.message });
                    }
            }),
            i
        );
    }
    updateCustomDevice(e) {
        return this.D0.getCustomDevice() !== e && (this.D0.setCustomDevice(e), !0);
    }
    getCustomDevice() {
        return this.D0.getCustomDevice() || null;
    }
    userAgentChangeDetected(e) {
        if ("navigate" !== e.request.mode) return !1;
        const t = e.originalRequest.headers.get("user-agent") || navigator.userAgent || navigator.vendor;
        return this.D0.getUserAgent() ? this.D0.getUserAgent() !== t && (this.D0.setUserAgent(t), !0) : (this.D0.setUserAgent(t), !1);
    }
    static getUAClass(e) {
        return de((t = e), pe) || de(t.substr(0, 4), ge) ? "mobile" : me(e) ? "tablet" : fe(e) ? "tv" : "desktop";
        var t;
    }
    static isCustomVariation(e) {
        return !["desktop", "mobile", "tablet", "tv"].includes(e);
    }
    async shouldFetchOrigin(e) {
        if (-1 === this.properties.fetchOriginInterval) return !1;
        if (0 === this.properties.fetchOriginInterval) return !0;
        const t = Math.floor(Date.now() / 1e3);
        if (((await this.Dz.get("/fetch-origin-time")) || t) <= t) {
            const e = t + this.properties.fetchOriginInterval + 2;
            return await this.Dz.set("/fetch-origin-time", e), !0;
        }
        return !1;
    }
    getDelayOptions(e) {
        const t = Te.getDelayDefaults();
        for (const s of this.properties.delayed) {
            (!s.rules || s.rules.matches(e.originalRequest)) && (s.options, Object.assign(t, s.options));
        }
        return t;
    }
    shouldDefer(e) {
        return this.properties.defer.matches(e.originalRequest);
    }
    async getImageOptions(e) {
        if (!1 === this.properties.image) return !1;
        const t = Te.getImageDefaults();
        if (this.properties.image instanceof Array) {
            const s = await e.getNavigateUrl(),
                i = e.cookies.getMap(),
                { width: n } = await this.Dz.get("/com.baqend.speedkit.screen");
            for (const r of this.properties.image) {
                if (!r.rules || r.rules.matches(e.originalRequest)) {
                    if (await this.Dx(e, r.enabledSites)) {
                        const a = this.getImageCallbackOptions(e.request, s, i, r, n),
                            o = Object.assign(Object.assign({}, r.options), a);
                        Object.assign(t, o), JSON.stringify(o);
                    }
                }
            }
            return t;
        }
        return Object.assign(t, this.properties.image);
    }
    getImageCallbackOptions(e, t, s, i, n) {
        return i.imageFunction ? i.imageFunction(e, t, s, i.options, n) : {};
    }
    shouldStripQueryParameter(e, t) {
        return !!this.properties.stripQueryParams.length && Ce(e, t);
    }
    async getQueryParameterStripConditions(e) {
        let t = [];
        for (const s of this.properties.stripQueryParams) {
            if (!s.rules || s.rules.matches(e.originalRequest, e.contentType, e.cookies)) {
                (!s.enabledSites || (await this.Dx(e, s.enabledSites))) && (t = t.concat(s.params));
            }
        }
        return t;
    }
    async appendStrippedParams(e, t) {
        const s = new URL(t.originalRequest.url),
            i = await this.getQueryParameterStripConditions(t);
        return (
            s.searchParams.forEach((t, s) => {
                this.shouldStripQueryParameter(s, i) && e.searchParams.append(s, t);
            }),
            e.toString()
        );
    }
    hasCriticalResources() {
        return !!this.properties.criticalResources.length;
    }
    getRequestKey(e) {
        const t = F(e.originalRequest.url);
        return "navigate" === e.originalRequest.mode ? ((this.D1 = !!e.resultingClientId), e.resultingClientId || t) : this.D1 ? e.navigation.clientId : t;
    }
    supportsClientId(e) {
        return e && "navigate" === e.originalRequest.mode && (this.D1 = !!e.resultingClientId), this.D1;
    }
    toggleBypassDeactivation(e) {
        this.D2 = e;
    }
    shouldBypassDeactivation() {
        return this.D2;
    }
    shouldCountIFrameNavigation() {
        return this.properties.enableIFramePiTracking;
    }
    async getCriticalResources(e) {
        const t = [];
        for (const { enabledOn: s, resources: i } of this.properties.criticalResources) (await this.Dx(e, s)) && t.push(...i);
        return t.filter((e, s) => t.indexOf(e) === s);
    }
    getPrecache() {
        return this.properties.precache;
    }
    getSplitTestId() {
        return this.properties.splitTestId;
    }
    getGroup() {
        return this.properties.group;
    }
    toJSON() {
        const e = this.properties.delayed.map((e) => ({ options: e.options, rules: e.rules.toJSON() })),
            t = this.properties.image instanceof Array ? this.properties.image.map((e) => ({ options: e.options, enabledSites: e.enabledSites && e.enabledSites.toJSON(), rules: e.rules && e.rules.toJSON() })) : this.properties.image,
            s = this.properties.criticalResources.map((e) => ({ enabledOn: e.enabledOn && e.enabledOn.toJSON(), resources: e.resources })),
            i = this.properties.stripQueryParams.map((e) => ({ enabledSites: e.enabledSites && e.enabledSites.toJSON(), rules: e.rules && e.rules.toJSON(), params: e.params })),
            n = this.properties.customVariation.map((e) => ({ rules: e.rules && e.rules.toJSON(), variationFunction: e.variationFunction.toString() })),
            r = new URL(this.appURL);
        let a,
            o = "local";
        return (
            r.host.endsWith(".app.baqend.com") ? (o = r.host.substring(r.host.length - ".app.baqend.com".length)) : (a = r.host),
            {
                appName: o,
                appDomain: a,
                delayed: e,
                image: t,
                criticalResources: s,
                stripQueryParams: i,
                customVariation: n,
                defer: this.properties.defer.toJSON(),
                splitTestId: this.properties.splitTestId,
                group: this.properties.group,
                blacklist: this.properties.blacklist.toJSON(),
                whitelist: this.properties.whitelist.toJSON(),
                enabledSites: this.properties.enabledSites.toJSON(),
                disabledSites: this.properties.disabledSites.toJSON(),
                disableCache: this.properties.disableCache,
                enableOriginCache: this.properties.enableOriginCache,
                ignoreAfterPostNavigate: this.properties.ignoreAfterPostNavigate,
                userAgentDetection: this.properties.userAgentDetection.toJSON(),
                fetchOriginInterval: this.properties.fetchOriginInterval,
                preloadBloomFilter: this.properties.preloadBloomFilter,
                navigationPreload: this.properties.navigationPreload,
                reconnectInterval: this.properties.reconnectInterval,
                refreshInterval: this.properties.refreshInterval,
                staleWhileRevalidate: this.properties.staleWhileRevalidate,
                precache: this.properties.precache,
                immutableAssets: this.properties.immutableAssets.toJSON(),
                trackingRequests: this.properties.trackingRequests.toJSON(),
                offlinePage: this.properties.offlinePage,
                useCacheWhenOffline: this.properties.useCacheWhenOffline,
                enableIFramePiTracking: this.properties.enableIFramePiTracking,
                enforceDisabledPages: this.properties.enforceDisabledPages,
                enforceImageServing: this.properties.enforceImageServing,
                omitImageCredentials: this.properties.omitImageCredentials,
            }
        );
    }
    fromJSON(e) {
        const { sw: t, scope: s, disabled: i } = e,
            n = c(e, ["sw", "scope", "disabled"]),
            { appName: r, appDomain: a } = n,
            o = c(n, ["appName", "appDomain"]),
            h = r + ".app.baqend.com";
        (this.optionalAppURL = `https://${a || h}/v1`), this.optionalAppURL;
        const u = Te.getDefaults(),
            { maxStaleness: l, refreshInterval: d } = o,
            p = c(o, ["maxStaleness", "refreshInterval"]),
            g = d || (l && l / 1e3) || u.refreshInterval,
            {
                whitelist: m,
                blacklist: f,
                fetchlist: w,
                delayed: y,
                defer: v,
                stripQueryParams: C,
                customVariation: R,
                enabledSites: D,
                disabledSites: b,
                criticalResources: S,
                precache: k,
                image: q,
                userAgentDetection: I,
                immutableAssets: O,
                trackingRequests: A,
                enforceDisabledPages: N,
                omitImageCredentials: E,
                resetResponseUrl: P,
            } = p,
            H = c(p, [
                "whitelist",
                "blacklist",
                "fetchlist",
                "delayed",
                "defer",
                "stripQueryParams",
                "customVariation",
                "enabledSites",
                "disabledSites",
                "criticalResources",
                "precache",
                "image",
                "userAgentDetection",
                "immutableAssets",
                "trackingRequests",
                "enforceDisabledPages",
                "omitImageCredentials",
                "resetResponseUrl",
            ]);
        this.properties = Object.assign(
            Object.assign(Object.assign({}, u), {
                refreshInterval: g,
                omitImageCredentials: E || !1,
                userAgentDetection: this.getUserAgentRuleSet(I || !1),
                whitelist: new Ae().fromJSON(m),
                blacklist: new Ae().fromJSON(f),
                fetchlist: new Ae().fromJSON(w),
                immutableAssets: new Ae().fromJSON(O),
                trackingRequests: new Ae().fromJSON(A),
                enabledSites: new Ae().fromJSON(D),
                disabledSites: new Ae().fromJSON(b),
                stripQueryParams: Te.initStripParams(C),
                customVariation: this.Dy(R),
                delayed: Te.initDelayed(y),
                defer: new Ae().fromJSON(v),
                criticalResources: Te.initCriticalResources(S),
                precache: k || [],
                image: Te.initImage(q),
                enforceDisabledPages: N || !!D,
                resetResponseUrl: new Ae().fromJSON(P),
            }),
            H
        );
    }
    shouldResetResponseUrl(e) {
        return this.properties.resetResponseUrl.matches(e.originalRequest, e.contentType, e.cookies);
    }
    getUserAgentRuleSet(e) {
        const t = new Ae();
        return "boolean" == typeof e ? e && t.addRule(new ve([new Pe("")])) : t.fromJSON(e), t;
    }
    static getDefaults() {
        return {
            blacklist: new Ae(),
            criticalResources: [],
            delayed: [{ rules: new Ae(), options: this.getDelayDefaults() }],
            defer: new Ae(),
            disableCache: !1,
            enableOriginCache: !1,
            enabledSites: new Ae(),
            disabledSites: new Ae(),
            fetchOriginInterval: -1,
            image: this.getImageDefaults(),
            ignoreAfterPostNavigate: !0,
            preloadBloomFilter: !0,
            preloadDynamicBlocks: !1,
            navigationPreload: !1,
            reconnectInterval: 6e4,
            refreshInterval: 300,
            relativeModuleImports: !1,
            sdnSetup: !1,
            staleWhileRevalidate: 1800,
            stripQueryParams: [],
            userAgentDetection: new Ae(),
            customVariation: [],
            whitelist: new Ae(),
            fetchlist: new Ae(),
            splitTestId: "undefined",
            group: "A",
            offlinePage: "",
            useCacheWhenOffline: !1,
            precache: [],
            immutableAssets: new Ae(),
            trackingRequests: new Ae(),
            rumTracking: !1,
            enableIFramePiTracking: !1,
            enforceDisabledPages: !1,
            enforceImageServing: !1,
            resetResponseUrl: new Ae(),
            omitImageCredentials: !1,
        };
    }
    static getDelayDefaults() {
        return { event: xe.LOAD, timeout: 1e3 };
    }
    static getImageDefaults() {
        return { downscale: !0, screenSizeFactor: 1, maxWidth: !1, maxHeight: !1, quality: null, optimize: "medium", webp: !0, pjpeg: !0, crop: !1, overrideWidth: !1, overrideHeight: !1, format: null };
    }
    static initDelayed(e) {
        return e
            ? e.some((e) => e.hasOwnProperty("rules"))
                ? e.map((e) => ({ rules: new Ae().fromJSON(e.rules), options: e.options })).reverse()
                : [{ rules: new Ae().fromJSON(e), options: this.getDelayDefaults() }]
            : [{ rules: new Ae(), options: this.getDelayDefaults() }];
    }
    static initStripParams(e) {
        if (!e) return [];
        return e instanceof Array && e.some((e) => "object" == typeof e && e.params)
            ? e.map((e) => ({ enabledSites: e.enabledSites && new Ae().fromJSON(e.enabledSites), rules: e.rules && new Ae().fromJSON(e.rules), params: e.params }))
            : [{ params: e }];
    }
    Dy(e) {
        if (!e) return [];
        try {
            return e.map((e) => ({ rules: e.rules && new Ae().fromJSON(e.rules), variationFunction: Fe("string" == typeof e.variationFunction ? e.variationFunction : e.variationFunction.toString()) }));
        } catch (e) {
            try {
                Le(this, { type: "sw", timestamp: Date.now(), action: "variationParseError", message: e.message, stackTrace: e.stack });
            } catch (e) {}
            return [];
        }
    }
    static initImage(e) {
        return (
            !1 !== e &&
            (e
                ? e instanceof Array
                    ? e
                          .map((e) => ({
                              enabledSites: e.enabledSites && new Ae().fromJSON(e.enabledSites),
                              rules: e.rules && new Ae().fromJSON(e.rules),
                              options: Te.normalizeImageOptions(e.options || {}),
                              imageFunction: (e.imageFunction && Fe("string" == typeof e.imageFunction ? e.imageFunction : e.imageFunction.toString())) || void 0,
                          }))
                          .reverse()
                    : Te.normalizeImageOptions(e)
                : {})
        );
    }
    static normalizeImageOptions(e) {
        return "number" == typeof e.quality ? (e.quality = Math.max(1, Math.min(100, Math.round(e.quality)))) : !1 === e.quality && (e.quality = 100), e;
    }
    static initCriticalResources(e = []) {
        return e.length ? e.map(Te.makeResourceRule).map(Te.normalizeResourceURLs).map(Te.instantiateResourceEnabledOn) : [];
    }
    static makeResourceRule(e) {
        return "string" == typeof e ? { resources: [e] } : e;
    }
    static normalizeResourceURLs({ enabledOn: e, resources: t }) {
        const s = new URL(location.href);
        return { enabledOn: e, resources: t.map((e) => we(s, e)) };
    }
    static instantiateResourceEnabledOn({ enabledOn: e, resources: t }) {
        return { enabledOn: e && new Ae().fromJSON(e), resources: t };
    }
});
We = Te = h([Z("/com.baqend.speedkit.config")], We);
let Me = class extends se {
    constructor() {
        super(...arguments), (this.device = ""), (this.userAgent = "");
    }
    getCustomDevice() {
        return this.device;
    }
    setCustomDevice(e) {
        (this.device = e), this.notify();
    }
    getUserAgent() {
        return this.userAgent;
    }
    setUserAgent(e) {
        (this.userAgent = e), this.notify();
    }
    fromJSON(e) {
        if ("string" == typeof e) return this.fromJSON({ device: e, userAgent: this.userAgent }), void this.notify();
        (this.device = e.device || this.device), (this.userAgent = e.userAgent || this.userAgent);
    }
    toJSON() {
        return { device: this.device, userAgent: this.userAgent };
    }
};
function Je(e, t) {
    return void 0 === e ? t : e;
}
Me = h([Z("/com.baqend.speedkit.device")], Me);
class je {
    constructor(e) {
        (this.isFetched = !1),
            (this.BV = null),
            (this.BW = null),
            (this.dependent = new Set()),
            (this.originalRequest = e.request),
            (this.request = e.request),
            (this.Ba = e.awaiter),
            (this.navigation = e.navigation),
            (this.cookies = Je(e.cookies, new re())),
            (this.BX = e.navigateRequest),
            (this.BY = Je(e.critical, !1)),
            (this.BZ = Je(e.precache, !1)),
            (this.preloadResponse = e.preloadResponse),
            (this.prewarm = Je(e.prewarm, !1)),
            (this.marks = Je(e.marks, new Map())),
            (this.dependsOn = e.dependsOn),
            (this.resultingClientId = Je(e.resultingClientId, "")),
            (this.contentType = e.contentType),
            (this.BW = e.userAgent),
            (this.Bb = Je(e.offlineResource, !1)),
            (this.applicationState = e.applicationState);
    }
    static create(e, t = {}, s = () => {}) {
        const n = d.fromNavigateURL(e),
            { navigation: r = n, cookies: a = new re(), critical: o = !1, precache: h = !1, offlineResource: u = !1 } = t,
            l = c(t, ["navigation", "cookies", "critical", "precache", "offlineResource"]),
            p = l.headers ? l.headers.get("user-agent") : null,
            g = new Request(e, l),
            m = "navigate" === t.mode,
            f = l.contentType || i(g);
        return new je({
            request: g,
            navigation: r,
            cookies: a,
            critical: o,
            precache: h,
            navigateRequest: m,
            contentType: f,
            userAgent: p,
            offlineResource: u,
            awaiter: s,
            prewarm: t.prewarm,
            marks: t.marks,
            dependsOn: t.dependsOn,
            resultingClientId: t.resultingClientId,
        });
    }
    static fromEvent(e, t) {
        const { request: s, preloadResponse: n, resultingClientId: r } = e,
            a = "navigate" === s.mode,
            o = a ? d.fromNavigateURL(s.url, r) : d.fromClientID(e.clientId),
            c = i(s),
            h = s.headers.get("user-agent");
        return new je({ request: s, awaiter: (t) => e.waitUntil(t), navigation: o, navigateRequest: a, contentType: c, preloadResponse: n, resultingClientId: r, userAgent: h, applicationState: t });
    }
    createSubRequest(e, t) {
        return t.redirect || this.request.redirect, je.create(e, Object.assign({ marks: new Map(this.marks), resultingClientId: this.resultingClientId, redirect: this.request.redirect }, t), this.Ba);
    }
    createDynamicBlockRequest(e) {
        return (
            this.originalRequest.redirect,
            e
                ? this.createSubRequest(this.originalRequest.url, Object.assign({}, this.originalRequest))
                : new je({ request: this.originalRequest, awaiter: this.Ba, navigation: this.navigation, navigateRequest: this.BX, contentType: this.contentType, userAgent: this.BW, dependsOn: this.dependsOn, marks: new Map(this.marks) })
        );
    }
    waitUntil(...e) {
        this.Ba(Promise.all(e));
    }
    get url() {
        return new URL(this.request.url);
    }
    get headers() {
        return new Headers(this.request.headers);
    }
    get timings() {
        if (!this.marks.size) return null;
        const e = Object.create(null);
        for (const [t, s] of this.marks) e[t] = s;
        return e;
    }
    mark(e) {
        this.marks.set(e, Date.now());
    }
    isNavigateRequest() {
        return this.BX;
    }
    isCritical() {
        return this.BY || this.BZ;
    }
    isPrecache() {
        return this.BZ;
    }
    isSameOrigin() {
        return this.url.origin === location.origin;
    }
    isDynamicBlockRequest() {
        return "dynamic" === this.request.headers.get("baqend-speed-kit-request");
    }
    getResponseCause() {
        return this.responseCause ? this.responseCause : B.Unknown;
    }
    getApplicationState() {
        return this.applicationState;
    }
    isOfflineResource() {
        return this.Bb;
    }
    get modifying() {
        return "GET" !== this.request.method && "HEAD" !== this.request.method;
    }
    set url(e) {
        const t = e.toString();
        this.url.toString() !== t &&
            (this.request = (function (e, t, s = {}) {
                const i = new Headers(),
                    n = ["accept-language", "content-language", "content-type"];
                "navigate" !== e.mode && n.push("accept");
                for (const [t, s] of e.headers) n.includes(t.toLocaleLowerCase()) && i.append(t, s);
                const r = { headers: i };
                return (r.credentials = e.credentials), (r.referrer = e.referrer), "navigate" !== e.mode && (r.mode = e.mode), new Request(t, Object.assign(r, s));
            })(this.request, t));
    }
    set headers(e) {
        this.request = new Request(this.request, { headers: e, referrer: this.request.referrer });
    }
    set method(e) {
        this.method !== e && (this.request = new Request(this.request, { method: e, referrer: this.request.referrer }));
    }
    get method() {
        return this.request.method.toUpperCase();
    }
    set mode(e) {
        this.request.mode !== e && (this.request = new Request(this.request, { mode: e, referrer: this.request.referrer }));
    }
    set cache(e) {
        this.request.cache !== e && (this.request = new Request(this.request, { cache: e, referrer: this.request.referrer }));
    }
    set credentials(e) {
        this.credentials !== e &&
            (this.request = (function (e, t) {
                return new Request(e, { credentials: t, headers: e.headers, referrer: e.referrer });
            })(this.request, e));
    }
    setResponseCause(e) {
        this.responseCause || (this.responseCause = e);
    }
    markAsFetched() {
        this.isFetched = !0;
        for (const e of this.dependent) this.dependent.delete(e), e();
    }
    async fetch(e = {}) {
        this.mark("fetchStart"),
            this.dependsOn && (this.dependsOn, this.dependsOn.isFetched),
            this.dependsOn &&
                !this.dependsOn.isFetched &&
                (await new Promise((e) => {
                    this.dependsOn.dependent.add(e);
                }));
        const t = this.BU(this.request);
        this.method, this.url.pathname;
        const s = fetch(t, e);
        this.markAsFetched();
        const i = await s;
        return this.mark("fetchEnd"), i;
    }
    BU(e) {
        const [t, s, i] = q(navigator.userAgent);
        return "Safari" === t && (s < 15 || (15 === s && i < 4)) && "navigate" === e.mode
            ? new Request(e.url, {
                  mode: "same-origin",
                  method: e.method,
                  referrer: e.referrer,
                  referrerPolicy: e.referrerPolicy,
                  credentials: e.credentials,
                  cache: e.cache,
                  redirect: e.redirect,
                  integrity: e.integrity,
                  keepalive: e.keepalive,
                  headers: e.headers,
              })
            : e;
    }
    getNavigateUrl() {
        return this.isNavigateRequest() ? this.originalRequest.url : this.navigation.url;
    }
    fetchOriginal() {
        this.method, this.url.pathname;
        const e = this.BU(this.originalRequest);
        return fetch(e);
    }
    toString() {
        return this.isSameOrigin() ? `${this.method} ${this.url.pathname}` : `${this.method} ${this.url}`;
    }
    getVariation(e) {
        if (this.BV) return this.BV;
        const t = e.shouldApplyUserAgentDetection(this),
            s = e.getCustomDevice();
        if (!t && !e.hasCustomVariation()) return s || null;
        const i = this.BW || navigator.userAgent || navigator.vendor,
            n = We.getUAClass(i),
            r = e.getCustomVariation(this, s || n);
        return (this.BV = r || s || (t ? n : null));
    }
}
var $e, ze;
!(function (e) {
    (e.INSTALLING = "installing"), (e.BOOTING = "booting"), (e.RUNNING = "running"), (e.FAILED = "failed");
})($e || ($e = {}));
const Ke = Symbol("State"),
    Ge = Symbol("Reason"),
    Ve = Symbol("Waiters");
function _e(e) {
    return e.includes("TypeError: Failed to fetch") || e.includes("TypeError: The network connection was lost");
}
ze = Ve;
function Qe(e, t, s, i) {
    return Promise.resolve(e).then(
        (e) =>
            new Promise((n, r) => {
                const a = e.transaction(t, s),
                    o = Promise.resolve(i(a.objectStore(t)));
                (a.oncomplete = () => o.then(n)), (a.onabort = a.onerror = () => r(a.error));
            })
    );
}
function Xe(e, t, s) {
    return Qe(e, t, "readwrite", s);
}
async function Ye(e, t = {}) {
    if (e.status === S.NoContent) return new Response(null, t);
    const s = await e.blob();
    return new Response(s, t);
}
function Ze(e, t = {}) {
    const { status: s, statusText: i, headers: n } = e,
        r = new Headers(e.headers);
    r.set("timing-allow-origin", "*");
    const a = Object.assign({ status: s, statusText: i, headers: r }, t);
    if (!e.body) return Ye(e, a);
    try {
        return Promise.resolve(new Response(e.body, a));
    } catch (t) {
        return Ye(e, a);
    }
}
class et {}
class tt {
    constructor(e, t) {
        (this.o = e), (this.p = t);
    }
    async handleInternalServerError(e) {
        return this.p.preloadDynamicBlocks ? G(e, !0, B.InternalServerError) : this.retryOrigin(e, !0);
    }
    async retryOrigin(e, t = !1) {
        try {
            const s = await e.fetchOriginal();
            return s.status >= S.InternalServerError ? _(e, s, H.ServerError) : t ? (this.disconnect(H.ServerError), z(e, !0, B.Error, s)) : z(e, !0, B.Error, s);
        } catch (t) {
            const s = t instanceof TypeError ? S.FetchTypeError : S.BadGateway;
            return _(e, new Response(t.message, { status: s }), H.SWException);
        }
    }
    disconnect(e) {
        this.o.isDisconnected() || this.o.disconnect(!0, e);
    }
}
var st;
!(function (e) {
    (e.SameOrigin = "same-origin"), (e.Omit = "omit"), (e.Include = "include");
})(st || (st = {}));
function it(e, t) {
    return V(e, Uint8Array.from([71, 73, 70, 56, 57, 97, 1, 0, 1, 0, 128, 0, 0, 0, 0, 0, 255, 255, 255, 33, 249, 4, 1, 0, 0, 0, 0, 44, 0, 0, 0, 0, 1, 0, 1, 0, 0, 2, 1, 68, 0, 59]), t, B.TrackingRequest);
}
class nt extends et {
    constructor(e) {
        super(), (this.Cl = e);
    }
    handle(e, t) {
        const { url: s } = e;
        return s.searchParams.get("bqpassthrough") ? (s.searchParams.delete("bqpassthrough"), y(e, s), (e.url = s), this.Cl.shouldCacheRequest(e) ? t(e) : z(e, !1, B.Delayed, e.fetch())) : this.Cj(e, t);
    }
    supportsHandling(e) {
        return this.Cl.shouldDelayRequest(e);
    }
    async Cj(e, s) {
        return e.contentType === t.Script
            ? (e.url.toString(), this.Ck(e))
            : e.contentType === t.Image
            ? (e.url.toString(),
              O(1e3)
                  .then(() => e.fetchOriginal())
                  .catch(console.error),
              it(e, nt.buildContentTypeHeader("image/gif")))
            : (e.url.toString(), s(e));
    }
    Ck(e) {
        const t = e.url;
        t.searchParams.append("bqpassthrough", "1"), y(e, t);
        const s = this.Cl.getDelayOptions(e);
        return V(
            e,
            `(function(){\n  const thisNode = document.currentScript;\n  const parentNode = thisNode.parentNode;\n  function loadScript() {\n    const scr = document.createElement('script');\n    for (let i = 0, len = thisNode.attributes.length; i < len; i++) {\n      var attr = thisNode.attributes.item(i);\n      scr.setAttribute(attr.nodeName, attr.nodeValue);\n    }\n    scr.async = true;\n    scr.src = '${t}';\n    // True if original script and corresponding parentNode were not removed from DOM\n    if (thisNode.isConnected) {\n      parentNode.replaceChild(scr, thisNode);\n    } else {\n      var container = parentNode.isConnected ? parentNode : document.head;\n      // Remove delayed script if original script was removed from DOM\n      scr.onload = function() { container.removeChild(scr); };\n      container.appendChild(scr);\n    }\n  }\n  function delayAfter(cb) { ${
                s.event === xe.SPEED_KIT_DYNAMIC_LOADED
                    ? "\n      if (!document.documentElement.classList.contains('speed-kit-dynamic-loading')) {\n        return cb();\n      }\n      document.addEventListener('speed-kit-loaded', () => {\n        cb();\n      });"
                    : "\n      if (document.readyState === 'complete') {\n        return cb();\n      }\n      document.addEventListener('readystatechange', () => {\n        if (document.readyState === 'complete') {\n          cb();\n         }\n      });"
            } }\n  delayAfter(() => {\n    window.setTimeout(() => {\n      loadScript();\n    }, ${s.timeout});\n  });\n})();\n`,
            nt.buildContentTypeHeader("application/javascript; charset=utf-8"),
            B.Delayed
        );
    }
    static buildContentTypeHeader(e) {
        return { headers: { "content-type": e } };
    }
}
class rt extends et {
    constructor(e, t) {
        super(), (this.Cx = e), (this.Cy = t);
    }
    async handle(e, t) {
        e.url;
        const s = await this.Cw(e);
        return e.waitUntil(this.Cy.storeDynamicBlockResponse(e, s)), s;
    }
    supportsHandling(e) {
        return e.isDynamicBlockRequest();
    }
    async Cu(e) {
        if ("true" === e.request.headers.get("baqend-speed-kit-offline")) {
            const t = await this.Cy.retrieveDynamicBlockResponse(e);
            if (t) return t;
        }
        const t = this.Cx.getRequestKey(e),
            s = this.Cy.popDynamicBlockResponse(t);
        return s ? this.Cv(e, s) : this.Cy.fetchAsDynamicBlockRequest(e);
    }
    async Cv(e, t) {
        const s = await t,
            i = await s.isRedirect();
        if (!i && (await s.isSuccessful())) return s;
        if (i) {
            const t = this.Cy.fetchAsDynamicBlockRequest(e, { redirect: "follow" }, !0);
            if (await rt.isCorsRedirect(t)) {
                const t = new Response(null, { status: S.CORSRedirect });
                return z(e, !1, B.CORSRedirect, t);
            }
            return t;
        }
        return z(e, !0, B.DynamicBlock);
    }
    static async isCorsRedirect(e) {
        try {
            return !(await e.getResponseStatus());
        } catch (t) {
            e.disconnectCause = H.SWException;
        }
        return !0;
    }
    async Cw(e) {
        const t = await this.Cu(e),
            s = await t.response;
        if (!e.headers.has("baqend-request-hotness") || !s || s.redirected) return t;
        const { status: i, statusText: n, headers: r } = s,
            a = new Headers(r),
            o = this.Cx.getRequestKey(e),
            c = this.Cy.getResourceHotness(o);
        if (null === c) return t;
        a.set("baqend-response-hotness", c.toString());
        const h = { status: i, statusText: n, headers: a },
            u = new Response(s.body, h);
        return z(t.request, !1, t.cause, u);
    }
}
function at(e) {
    return Q(e.source) || e.source === U.SwCache;
}
class ot {
    constructor() {
        this.HW = new Set();
    }
    addRedirect(e, t) {
        return !!this.HU(t) || (this.HV(e), !1);
    }
    HU(e) {
        const t = e.headers.get("location");
        return !!t && this.HW.has(t);
    }
    HV(e) {
        this.HW.add(e.url);
    }
    clear() {
        this.HW.clear();
    }
}
function ct(e, t) {
    return V(e, null, { status: (t && t.status) || 204, headers: Object.assign({ "cache-control": "max-age=0, no-cache, no-store", vary: "*" }, (t && t.headers) || {}) }, B.TrackingRequest, U.Origin);
}
class ht {
    constructor(e) {
        this.provider = e;
    }
}
let ut = class extends ht {
    async handle() {
        return this.provider.connect(), !0;
    }
};
ut = h([Y("connect")], ut);
let lt = class extends ht {
    async handle() {
        return this.provider.disconnect(!0, H.None, !0), !0;
    }
};
lt = h([Y("disconnect")], lt);
let dt = class extends ht {
    async handle(e, t, s) {
        return t.data ? this.provider.refreshOnReload(!1) : await this.provider.refreshCacheSketch(!0), !0;
    }
};
dt = h([Y("fetch-bloom-filter")], dt);
let pt = class {
    constructor(e, t, s) {
        (this.D8 = e), (this.D9 = t), (this.D$ = s);
    }
    async handle(e, t, s) {
        const i = t.clientURL;
        if (!s || !t || !i) return !1;
        const n = F(i),
            r = e.id && this.D9.supportsClientId() ? e.id : void 0;
        this.D$.markClientAsReady(r || n, e);
        const a = this.D8.pop(n, r) || this.D8.getUnknownNavigateMetadata(i);
        return s.postMessage(a), !0;
    }
};
pt = h([Y("get-navigate-info")], pt);
let gt = class {
    constructor(e, t, s, i, n) {
        (this.EC = e), (this.ED = t), (this.EE = s), (this.EF = i), (this.EG = n);
    }
    async handle(e, t) {
        if (!this.D_(t)) return !1;
        const s = new URL(e.url),
            i = this.EA(t.data);
        return await this.EB(s, i), !0;
    }
    D_(e) {
        return !!e && "object" == typeof e && e.data instanceof Array && e.data.every((e) => "string" == typeof e.url);
    }
    EA(i) {
        const n = [t.Style, t.Script, t.Font];
        return i
            .map((i) => {
                const r = (e) => (n.includes(e) ? { contentType: e, url: i.url } : null);
                if ("script" === i.initiatorType) return r(t.Script);
                if ("font" === i.initiatorType) return r(t.Font);
                if (["other", "link", "css"].includes(i.initiatorType)) {
                    const { pathname: t } = new URL(i.url);
                    return r(s(e(t)));
                }
                return null;
            })
            .filter((e) => e);
    }
    async EB(e, t) {
        if (!t.length) return;
        await this.EE.refreshCacheSketch();
        const s = d.fromNavigateURL(e.toString());
        for (const { url: e, contentType: i } of t) {
            const t = this.EF.getCookies(location.origin),
                n = !0,
                r = je.create(e, { navigation: s, cookies: t, prewarm: n, contentType: i }),
                a = this.EC.shouldCacheRequest(r);
            if (!a) continue;
            const o = await this.ED.loadResponse(r);
            o || (await this.EG.fetch(r));
        }
    }
};
function mt(e, ...t) {
    return "object" == typeof e && void 0 === e.prototype && t.every((t) => t in e);
}
gt = h([Y("prewarm-fetch")], gt);
let ft = class {
    constructor(e, t, s) {
        (this.EI = e), (this.EJ = t), (this.EK = s);
    }
    async handle(e, t) {
        return !!mt(t, "data") && (await this.EH(t.data, mt(t, "event") ? t.event : void 0), !0);
    }
    async EH(e, t) {
        "load" === t && (this.EJ.trackLoadEvent(), 2 === this.EJ.loadEventCount && this.EI.refreshCacheSketch(!0)), this.EK.updateCookies(location.origin, e);
    }
};
ft = h([Y("send-cookies")], ft);
let wt = class {
    constructor(e) {
        this.EL = e;
    }
    async handle(e) {
        return e.id, this.EL.reportDynamicBlocksApplied(e.id), !0;
    }
};
wt = h([Y("dom-ready")], wt);
let yt = class {
    constructor(e) {
        this.EN = e;
    }
    async handle(e, t) {
        return !!mt(t, "data") && (await this.EM(t.data), !0);
    }
    async EM(e) {
        this.EN.updateCustomDevice(e);
    }
};
yt = h([Y("update-device")], yt);
let vt = class {
    constructor(e, t) {
        (this.EO = e), (this.EP = t);
    }
    async handle(e, t, s) {
        const i = t.clientURL;
        if (!s || !t) return !1;
        const n = F(i),
            r = e.id && this.EP.supportsClientId() ? e.id : void 0,
            a = this.EO.popOriginTimings(r || n);
        return s.postMessage(a), !0;
    }
};
vt = h([Y("get-origin-timings")], vt);
let Ct = class {
    constructor(e) {
        this.ER = e;
    }
    async handle(e, t) {
        return !!this.EQ(t) && (t.data, this.ER.toggleBypassDeactivation(t.data), !0);
    }
    EQ(e) {
        return !!e && "object" == typeof e && "boolean" == typeof e.data;
    }
};
Ct = h([Y("bypass-deactivation")], Ct);
let Rt = class {
    async handle(e, t) {
        if (!this.ES(t)) return !1;
        const s = t.data;
        return Object.defineProperty(navigator.constructor.prototype, "onLine", { get: () => !s }), !0;
    }
    ES(e) {
        return !!e && "object" == typeof e && "boolean" == typeof e.data;
    }
};
Rt = h([Y("offline")], Rt);
let Dt = class {
    constructor(e) {
        this.EV = e;
    }
    async handle(e, t, s) {
        return !(!s || !t) && (this.ET(e.id, s, t), this.EU(e.id), !0);
    }
    ET(e, t, s) {
        const i = JSON.stringify(this.EV.getResponses(e, null == s ? void 0 : s.includeOrigin));
        t.postMessage(i);
    }
    EU(e) {
        this.EV.clearResponses(e);
    }
};
Dt = h([Y("resource-info")], Dt);
let bt = class {
    constructor(e) {
        this.EW = e;
    }
    async handle(e, t, s) {
        const i = e.id;
        if (!s) return !1;
        const n = this.EW.pop(i, t.contentType);
        return s.postMessage(n), !0;
    }
};
bt = h([Y("get-broken-assets")], bt);
let St = class {
    constructor(e) {
        this.cacheRevision = e;
    }
    async handle(e, t, s) {
        return !!this.EX(t) && (await this.cachePages(t.data), !0);
    }
    EX(e) {
        return !!e && "object" == typeof e && Array.isArray(e.data) && e.data.every((e) => "string" == typeof e);
    }
    async cachePages(e) {
        try {
            e.forEach((e) => {
                this.cachePage(e);
            });
        } catch (e) {}
    }
    async cachePage(e) {
        const t = je.create(e, { offlineResource: !0 }),
            s = await t.fetch();
        await this.cacheRevision.storeResponse(t, s);
    }
};
St = h([Y("offline-page")], St);
class kt {
    constructor(e) {
        (this.swResponse = !0),
            (this.url = e.url),
            (this.resultingClientId = e.resultingClientId),
            (this.fromOrigin = e.fromOrigin),
            (this.cacheHit = e.cacheHit),
            (this.cdnCacheHit = e.cdnCacheHit),
            (this.cdnBackendTime = e.cdnBackendTime),
            (this.cdnPoP = e.cdnPoP),
            (this.firstLoad = !1),
            (this.splitTestId = e.splitTestId),
            (this.group = e.group),
            (this.responseCause = e.responseCause),
            (this.responseSource = e.responseSource.toString()),
            (this.backendCacheHit = e.backendCacheHit),
            (this.applicationState = e.applicationState),
            ([this.browser, this.browserVersion, this.minorVersion] = q(navigator.userAgent)),
            e.originStatus && (this.originStatus = e.originStatus),
            e.timings && ((this.timings = e.timings), !e.fromOrigin && e.timings.fetchEnd && e.timings.fetchStart && (this.assetTTFB = e.timings.fetchEnd - e.timings.fetchStart)),
            e.disconnectCause && (this.disconnectCause = e.disconnectCause);
    }
    static fromContext(e, t, s, i, n) {
        const r = e.request,
            a = t && n ? n.status : null,
            o = n ? new J(n.headers) : null,
            c = !!o && o.isBackendCacheHit(),
            h = o ? o.getPoP() : null,
            u = e.disconnectCause ? e.disconnectCause : null,
            l = r.timings;
        return new kt({
            fromOrigin: t,
            splitTestId: s,
            group: i,
            originStatus: a,
            timings: l,
            applicationState: r.getApplicationState(),
            responseSource: e.source,
            url: r.originalRequest.url,
            resultingClientId: r.resultingClientId,
            cacheHit: e.source === U.SwCache,
            cdnCacheHit: o ? o.getCache() : null,
            cdnBackendTime: o ? o.getDuration() : null,
            cdnPoP: h,
            responseCause: e.cause,
            backendCacheHit: c,
            disconnectCause: u,
        });
    }
}
class qt {
    constructor() {
        this.promise = new Promise((e) => {
            this.resolver = e;
        });
    }
    resolve(e) {
        this.resolver(e);
    }
}
const It = (function (e) {
        return new URL(e.scope).pathname;
    })(self.registration),
    Ot = new (class {
        constructor(e) {
            (this.Bv = null), (this.Bu = he(k, e)), (this.Bv = this.Bt());
        }
        get(e) {
            return ((t = this.Bs()), (s = "baqend-speedkit-store"), (i = (t) => t.get(e)), Qe(t, s, "readonly", i)).then((e) => e.result || null);
            var t, s, i;
        }
        set(e, t) {
            return Xe(this.Bs(), "baqend-speedkit-store", (s) => s.put(t, e) && void 0);
        }
        clear() {
            return Promise.all([((e = this.Bs()), (t = "baqend-speedkit-store"), Xe(e, t, (e) => e.clear()).then(() => {}))]).then(() => {});
            var e, t;
        }
        disconnect() {
            return this.Bv
                ? this.Bv.then((e) => {
                      (this.Bv = null), e.close();
                  })
                : Promise.resolve();
        }
        Bs() {
            return this.Bv || (this.Bv = this.Bt()), this.Bv;
        }
        Bt() {
            const e = indexedDB.open(this.Bu, 1);
            return (
                (e.onupgradeneeded = (t) => {
                    const { oldVersion: s } = t,
                        { result: i } = e;
                    if (s < 1) {
                        if (!i) return;
                        try {
                            i.createObjectStore("baqend-speedkit-store");
                        } catch (e) {}
                    }
                }),
                this.openRequest(e).then(
                    (e) => (
                        (e.onclose = () => {
                            this.Bv = null;
                        }),
                        (e.onerror = () => {
                            this.Bv = null;
                        }),
                        (e.onversionchange = (t) => {
                            t.newVersion || ((this.Bv = null), e.close());
                        }),
                        e
                    )
                )
            );
        }
        openRequest(e) {
            return new Promise((t, s) => {
                (e.onsuccess = () => t(e.result)), (e.onerror = () => s(e.error)), (e.onblocked = () => s(e.error));
            });
        }
    })(It),
    At = new (class {
        constructor(e, t, s, i) {
            this.Dq = [];
            const n = he(s, i);
            (this.Do = e), (this.Dp = t.open(n));
        }
        async store(e) {
            if ("function" != typeof e.cachePath) throw new TypeError("Cannot store an object without cachePath method.");
            const t = e.cachePath(),
                s = e.toJSON();
            await this.Do.set(t, s), location.origin;
        }
        async load(e, t = !1) {
            if ("function" != typeof e.cachePath) throw new TypeError("Cannot store an object without cachePath method.");
            const s = e.cachePath(),
                i = await this.Do.get(s);
            if (null != i) return void e.fromJSON(i);
            const n = await this.Dp,
                r = await (async function (e, t, s = !1) {
                    const i = await e.match(`${location.origin}${t}`);
                    if (!i) {
                        const e = `Could not load object "${location.origin}${t}" from cache.`;
                        if (s) throw new Error(e);
                        return null;
                    }
                    const n = i.statusText;
                    try {
                        return ce(n);
                    } catch (e) {
                        const i = `Object at "${t}" is not in JSON format.`;
                        if (s) throw new Error(i);
                        return n;
                    }
                })(n, s, t);
            null !== r && (e.fromJSON(r), await this.Do.set(s, r));
        }
        async loadAllWatched() {
            await this.loadAll(...this.Dq);
        }
        async loadAll(...e) {
            await Promise.all(
                e.map((e) => {
                    const t = !!e.cachePath && "/com.baqend.speedkit.config" === e.cachePath();
                    return this.load(e, t);
                })
            );
        }
        watch(...e) {
            for (const t of e) this.Dq.push(t), t.observe(() => this.store(t));
        }
    })(Ot, caches, k, It),
    Nt = new Me(),
    Et = new We(Ot, Nt),
    Pt = new (class {
        constructor(e) {
            (this.Dc = new u(10)), (this.Dd = !0), (this.De = !1), (this.Db = e);
        }
        capture(e, t) {
            t.url, (this.Dd = !1);
            const s = this.Db.getRequestKey(e),
                i = this.Dc.getItem(s) || [],
                n = [...i.map((e) => ({ url: e.url, handleStart: e.timings.handleStart }))].sort((e, t) => e.handleStart - t.handleStart);
            (t.redirectList = n), i.push(t), this.Dc.putItem(s, i);
        }
        pop(e, t) {
            const s = t || e,
                i = this.Dc.getItem(s);
            if (!i || !i.length) return null;
            1 === i.length && this.Dc.popItem(s);
            let n = -1;
            return (
                i.forEach((t, s) => {
                    F(t.url) === e && (n = s);
                }),
                -1 !== n ? i.splice(n, 1)[0] : i.pop()
            );
        }
        getUnknownNavigateMetadata(e) {
            return new kt({
                url: e,
                resultingClientId: "",
                fromOrigin: !0,
                cacheHit: !1,
                timings: null,
                cdnCacheHit: null,
                cdnBackendTime: null,
                cdnPoP: null,
                backendCacheHit: !1,
                originStatus: null,
                splitTestId: this.Db.getSplitTestId(),
                group: this.Db.getGroup(),
                responseSource: U.Origin,
                responseCause: this.Da(e),
                applicationState: $e.RUNNING,
            });
        }
        Da(e) {
            return this.Dd ? B.SwBooting : 0 === this.Dc.size() ? B.NoNavigate : null === this.Dc.getItem(e) ? B.NoMatchingNavigate : B.Unknown;
        }
        setIgnoreNextNavigate(e) {
            this.De = e;
        }
        shouldIgnoreNavigate() {
            return this.De;
        }
    })(Et),
    Ht = new ae(),
    Bt = new ne(Et),
    xt = new le(),
    Tt = new ue(Et),
    Ut = new (class {
        constructor(e) {
            (this.swCacheKeys = new WeakMap()), (this.CR = e);
        }
        async getSWCacheKey(e) {
            if (this.swCacheKeys.has(e)) return this.swCacheKeys.get(e);
            const { url: t } = e,
                s = await this.CR.getQueryParameterStripConditions(e);
            for (const e of Array.from(t.searchParams.keys())) {
                (this.CR.shouldStripQueryParameter(e, s) || "bqpassthrough" === e || "bqpreloadrequest" === e) && t.searchParams.delete(e);
            }
            const i = F(t.toString());
            return this.swCacheKeys.set(e, i), i;
        }
    })(Et),
    Lt = new (class {
        constructor(e, t, s, i) {
            (this.assetAPIKeys = new WeakMap()), (this.Bz = e), (this.B0 = t), (this.B1 = s), (this.B2 = i);
        }
        async getAssetAPIKey(e) {
            if (this.assetAPIKeys.has(e)) return this.assetAPIKeys.get(e);
            const t = await this.B0.getSWCacheKey(e),
                s = new URL(t),
                i = await this.Bz.getImageOptions(e),
                n = (e) => {
                    if (!1 !== e)
                        for (const t of p(e))
                            if (s.searchParams.has(t)) {
                                s.searchParams.delete(t);
                                break;
                            }
                };
            !1 !== i && (n(i.overrideWidth), n(i.overrideHeight));
            const r = C(e, s).toString();
            return this.assetAPIKeys.set(e, r), r;
        }
        async createAssetAPIRequest(e) {
            const s = await this.getAssetAPIKey(e);
            if (s.startsWith(this.Bz.appURL)) return new URL(s);
            const i = new URL(s),
                n = e.getVariation(this.Bz),
                r = n && We.isCustomVariation(n),
                a = e.contentType !== t.Image || r;
            n && "desktop" !== n && a && i.searchParams.append("bqvariation", n), this.Bz.shouldBypassDeactivation() && i.searchParams.append("bqpass", "1");
            const o = this.getSpeedKitConfigVersion();
            o && i.searchParams.append("bqcv", o);
            const c = this.getSpeedKitVersion();
            i.searchParams.append("bqsk", c), this.B1.appendParamsToAssetUrl(i), await this.Bx(e, i);
            const h = new URL(`${this.Bz.appURL}/asset/${i}`);
            return e.url, C(e, h);
        }
        getSpeedKitConfigVersion() {
            var e;
            const t = new URLSearchParams(self.location.search);
            if (t.has("r")) return t.get("r").substr(0, 8);
            if (t.has("othersw"))
                try {
                    return null === (e = new URL(t.get("othersw"), self.location.origin).searchParams.get("r")) || void 0 === e ? void 0 : e.substr(0, 8);
                } catch (e) {}
        }
        getSpeedKitVersion() {
            return ("2.12.0" + (!"2.12.0".endsWith("-0") ? "" : "-2e2da1e0\n")).replace(/\n/g, "");
        }
        async Bx(s, i) {
            const { request: n } = s;
            if ((n.destination, s.contentType !== t.Image)) return;
            if (".svg" === e(i.pathname)) return;
            const r = await this.Bz.getImageOptions(s);
            if (!1 !== r && !1 !== r.optimize) {
                const e = new URL(s.originalRequest.url).searchParams,
                    t = w(this.By(s, i.pathname, e, r));
                t.length && (i.searchParams.append("bqoptimize", "1"), (i.search += ";" + t.join(";")));
            }
        }
        By(e, t, s, i) {
            const { width: n, dpr: r } = this.B2,
                a = ((o = e.headers.get("width") || void 0), (c = (e) => parseInt(e, 10)), null === o ? null : void 0 !== o ? c(o) : void 0);
            var o, c;
            return Object.assign(Object.assign({}, i), { screenWidth: n, screenDPR: r, clientHintWidth: a, pathname: t, searchParams: s });
        }
    })(Et, Ut, Tt, xt),
    Ft = new (class {
        constructor(e, t, s, i) {
            (this.AL = e), (this.AM = t), (this.AN = s), (this.AO = he(k, i));
        }
        async delete() {
            await (async function (e) {
                const t = (await caches.keys()).filter(e).map((e) => caches.delete(e));
                await Promise.all(t);
            })((e) => e.startsWith(this.AO) && e.endsWith(this.AL.getClientRevision())),
                this.AL.getClientRevision();
        }
        async loadResponse(e) {
            const t = this.AI(e);
            return await caches.match(await this.AN.getSWCacheKey(e), { cacheName: t });
        }
        async storeResponse(e, t) {
            const s = this.AI(e),
                i = await this.AN.getSWCacheKey(e);
            await this.putIntoCache(s, i, t);
        }
        async storeOriginResponse(e, t) {
            try {
                const s = this.AO + "-origin",
                    i = await caches.open(s),
                    n = e.originalRequest.url;
                await i.put(n, t);
            } catch (e) {
                this.AH("cacheOriginError", e);
            }
        }
        async retrieveOriginResponse(e) {
            try {
                const t = this.AO + "-origin",
                    s = await caches.open(t),
                    i = e.originalRequest.url;
                return await s.match(i);
            } catch (e) {
                this.AH("cacheOriginError", e);
            }
        }
        async putIntoCache(e, t, s) {
            const i = await caches.open(e);
            this.AL.getClientRevision(), await this.AG(i, t, s.clone());
        }
        async AG(e, s, i, n = !1, r = !1) {
            try {
                await e.put(s, i);
            } catch (a) {
                return r
                    ? this.AH("cacheErrorAfterCleanAssets", a)
                    : n
                    ? (this.AH("cacheErrorAfterCleanImages", a), await this.AJ(Object.keys(t)), this.AG(e, s, i, !0, !0))
                    : (this.AH("cacheError", a), await this.AJ([t.Image]), this.AG(e, s, i.clone(), !0, !1));
            }
        }
        AH(e, t) {
            try {
                Le(this.AM, { action: e, type: "sw", timestamp: Date.now(), message: t.message, stackTrace: t.stack || "" });
            } catch (e) {}
        }
        AI(e) {
            if (e.isOfflineResource()) return this.AO + "-offline";
            const t = e.getVariation(this.AM) || "assets";
            return `${this.AO}-${t}-${this.AL.getClientRevision()}`;
        }
        async AJ(e) {
            e.join(", ");
            const t = (await caches.keys()).filter((e) => new RegExp(`^${k}-.*`).test(e));
            return (
                await Promise.all(
                    t.map(async (t) => {
                        const s = await caches.open(t);
                        return this.AK(s, e);
                    })
                )
            ).reduce((e, t) => e + t, 0);
        }
        async AK(e, t) {
            const s = (await e.keys()).filter((e) => {
                const s = i(e);
                return -1 !== t.indexOf(s);
            });
            return (await Promise.all(s.map((t) => e.delete(t)))).filter((e) => e).length;
        }
    })(Bt, Et, Ut, It),
    Wt = new (class {
        constructor(e, t, s, i) {
            (this.loading = !1), (this.disconnected = !1), (this.shuttingDown = !1), (this.reconnectAttempt = 0), (this.disconnectCause = H.None), (this.CB = e), (this.CC = t), (this.CD = s), (this.CE = i);
        }
        isDisconnected() {
            return this.disconnected;
        }
        setDisconnectCause(e) {
            this.disconnectCause = e;
        }
        getDisconnectCause() {
            return this.disconnectCause;
        }
        async purge() {
            this.CB.purge(), await this.B9();
        }
        refreshCacheSketch(e = !1) {
            return e || this.CB.isExpired() ? this.B9() : (this.CB.getDrift(), Promise.resolve());
        }
        refreshOnReload(e) {
            e ? this.purge() : this.refreshCacheSketch(!0), this.CB.updateLastReload();
        }
        connect() {
            (this.reconnectAttempt = 0), (this.disconnected = !1);
        }
        async B8() {
            (this.disconnected = !0), (this.shuttingDown = !0), await registration.unregister();
        }
        disconnect(e = !0, t, s = !1) {
            if (((this.disconnected = !0), this.setDisconnectCause(t), !e || this.shuttingDown)) return;
            if (s) return void O(this.CC.reconnectInterval).then(() => this.B9());
            const i = Math.min(this.CC.reconnectInterval * Math.pow(5, this.reconnectAttempt), 216e5);
            (this.reconnectAttempt += 1), O(i).then(() => this.B9());
        }
        async B9() {
            if (navigator.onLine && !this.loading) {
                this.loading = !0;
                try {
                    await this.B$();
                } catch (e) {
                    this.disconnect(!0, H.BloomfilterException);
                } finally {
                    this.loading = !1;
                }
            }
        }
        async B$() {
            const e = this.B_(),
                t = await fetch(e);
            if (t.status !== S.OK) return t.status === S.Forbidden ? (t.status, this.setDisconnectCause(H.ServerError), this.B8()) : (t.status, this.disconnect(!0, H.BloomfilterException));
            const s = (function (e = null) {
                if (!e) return new Map();
                const t = e.split(";").map((e) => e.split("=", 2));
                return new Map(t);
            })(t.headers.get("baqend-speed-kit"));
            if (!this.CC.shouldBypassDeactivation() && "true" === s.get("disabled")) return this.disconnect(!0, H.DashboardDisabled);
            const i = this.CB.getClientRevision(),
                n = s.get("cachingId") || null,
                r = this.CB.getServerRevision(),
                a = ((o = i), (c = r), null === (h = n) || null === c || h === c ? o : h);
            var o, c, h;
            a !== i && (await this.CD.delete()), this.shuttingDown || ((this.reconnectAttempt = 0), (this.disconnected = !1));
            const u = Date.now(),
                l = u + this.CC.refreshInterval,
                d = u - A(t);
            await (async function (e, t, s) {
                const i = t.headers.get("content-type");
                if (!i.startsWith("application/json")) throw new Error("Weird server reply: " + i);
                const n = await t.json();
                e.clearRevalidationWhitelist(), e.update(Object.assign(Object.assign({}, s), { body: n }));
            })(this.CB, t, { maxAge: l, drift: d, serverRevision: n, clientRevision: a });
        }
        B_() {
            const e = { accept: "application/json" },
                t = new URL(this.CA());
            return this.CE.appendParamsToBloomFilterUrl(t), t.searchParams.append("BCB", "1"), t.searchParams.append("skversion", "2.12.0"), (t.search = decodeURIComponent(t.search)), new Request(t.toString(), { headers: e });
        }
        CA() {
            return this.CC.appURL + "/bloomfilter";
        }
    })(Bt, Et, Ft, Tt),
    Mt = new (class {
        constructor() {
            this.requestHandlers = new Set();
        }
        addHandler(e) {
            this.requestHandlers.add(e);
        }
        fetch(e) {
            try {
                const t = this.requestHandlers.values(),
                    s = this.Cz(e, t);
                return s instanceof Promise ? s.catch((t) => (t.message, z(e, !0, B.Error))) : s;
            } catch (t) {
                return t.message, z(e, !0, B.Error);
            }
        }
        Cz(e, t) {
            const { done: s, value: i } = t.next();
            return s ? z(e, !0, B.Error) : i.supportsHandling(e) ? (i.constructor.name, i.handle(e, (e) => (i.constructor.name, this.Cz(e, t)))) : this.Cz(e, t);
        }
    })(),
    Jt = new (class {
        constructor(e, t) {
            (this.DY = e), (this.DZ = t);
        }
        async executeFor(e) {
            const { navigation: t } = e,
                s = await this.DY.getCriticalResources(e);
            let i = e;
            for (const n of s) {
                const s = new Headers();
                for (const [t, i] of e.originalRequest.headers) "accept" !== t.toLocaleLowerCase() && s.append(t, i);
                const r = { navigation: t, dependsOn: i, headers: s, critical: !0 },
                    a = e.createSubRequest(n, r);
                e.waitUntil(Promise.resolve(this.DZ.fetch(a))), (i = a);
            }
        }
    })(Et, Mt),
    jt = new tt(Wt, Et),
    $t = new (class {
        constructor() {
            (this.AD = new u(10)), (this.AE = new u(10)), (this.AF = new u(10));
        }
        capture(e, s, i) {
            if (i === t.Style) {
                const t = this.AD.getItem(e) || [];
                return t.push(s), void this.AD.putItem(e, t);
            }
            if (i === t.Image) {
                const t = this.AE.getItem(e) || [];
                if (this.shouldIgnorePixel(s)) return;
                return t.push(s), void this.AE.putItem(e, t);
            }
            const n = this.AF.getItem(e) || [];
            n.push(s), this.AE.putItem(e, n);
        }
        pop(e, s) {
            if (s === t.Style) {
                const t = this.AD.getItem(e);
                if (t && t.length > 0) return this.AD.popItem(e);
            }
            if (s === t.Image) {
                const t = this.AE.getItem(e);
                if (t && t.length > 0) return this.AE.popItem(e);
            }
            const i = this.AF.getItem(e);
            return i && i.length > 0 ? this.AF.popItem(e) : null;
        }
        shouldIgnorePixel(e) {
            const t = e.split("?")[1];
            return !!t && t.split("&").length > 10;
        }
    })(),
    zt = new (class extends class {
        constructor(e = $e.BOOTING, t = "") {
            (this[ze] = new Map()), (this[Ke] = e), (this[Ge] = t);
        }
        get state() {
            return this[Ke];
        }
        get reason() {
            return this[Ge];
        }
        waitUntil(...e) {
            if (!e.length) throw new TypeError("You must wait for at least one desired state.");
            return e.indexOf(this.state) >= 0 ? Promise.resolve(this.state) : Promise.race(e.map((e) => this.Bc(e)));
        }
        transition(e, t) {
            this[Ge] = t || "";
            const s = this[Ke];
            return e === s || ((this[Ke] = e), this.Bd(e)), s;
        }
        Bc(e) {
            return new Promise((t) => {
                const s = this[Ve].get(e) || [];
                s.push(t), this[Ve].set(e, s);
            });
        }
        Bd(e) {
            const t = this[Ve].get(e) || [];
            this[Ve].delete(e);
            for (const s of t) s(e);
        }
    } {
        constructor(e) {
            super($e.BOOTING),
                (this.W = e.scope),
                (this.cookieStore = e.cookieStore),
                (this.X = e.handlerExecutor),
                (this.Y = e.options),
                (this.Z = e.cache),
                (this.a = e.cacheRevision),
                (this.b = e.provider),
                (this.c = e.brokenAssetListener),
                (this.d = []),
                (this.e = e.navigateListener),
                ([this.f, this.g, this.h] = q(navigator.userAgent)),
                this.W.addEventListener("fetch", (e) => this.I(e)),
                this.W.addEventListener("message", (e) => e.waitUntil(this.N(e))),
                this.W.addEventListener("push", (e) => this.F(e)),
                this.W.addEventListener("notificationclick", (e) => this.G(e)),
                this.W.addEventListener("error", (e) => this.T(e)),
                this.W.addEventListener("unhandledrejection", (e) => this.U(e)),
                this.E();
        }
        run() {
            this.transition($e.RUNNING);
        }
        fail(e) {
            this.transition($e.FAILED, e);
        }
        install(e) {
            this.W.addEventListener("install", (t) => {
                t.waitUntil(this.A(e));
            });
        }
        async A(e) {
            if ((await this.waitUntil($e.FAILED, $e.RUNNING), this.state === $e.RUNNING)) {
                await this.B(e), this.Y.offlinePage && (await this.D());
                try {
                    await this.Z.loadAllWatched();
                } catch (e) {}
            }
            this.skipWaitingUntilActive();
        }
        claimClients() {
            this.W.addEventListener("activate", (e) => e.waitUntil(this.W.clients.claim()));
        }
        pushHandler(e) {
            this.X.addHandler(e);
        }
        pushMessage(e) {
            this.d.push(e);
        }
        async watch(e, t, s, i, n, r) {
            return this.Z.watch(e, t, s, i, n, r);
        }
        async load() {
            try {
                await this.Z.loadAllWatched(), this.Y.preloadBloomFilter && this.b.refreshCacheSketch(), this.run();
            } catch (e) {
                this.b.setDisconnectCause(H.SWException), e.message, this.fail(e.message);
            }
        }
        async skipWaitingUntilActive() {
            this.W.skipWaiting(), await O(500);
            const e = this.W.registration.installing || this.W.registration.waiting || this.W.registration.active;
            if (e && "activated" !== e.state) return this.skipWaitingUntilActive();
        }
        async B(e) {
            const t = [];
            for (const s of e.getPrecache()) {
                const e = this.C(s).catch((e) => {});
                t.push(e);
            }
            await Promise.all(t);
        }
        async C(e) {
            const t = "string" == typeof e ? e : e.href,
                s = "object" == typeof e ? e.as : null,
                i = je.create(t, { precache: !0, contentType: s });
            try {
                (await this.X.fetch(i)).source;
            } catch (e) {}
        }
        async D() {
            const e = je.create(this.Y.offlinePage, { offlineResource: !0 });
            try {
                const t = await e.fetch();
                await this.a.storeResponse(e, t);
            } catch (e) {}
        }
        async E() {
            try {
                const e = new URL(self.location.href).searchParams.get("othersw");
                if (!e) return;
                const t = new URL(decodeURIComponent(e), self.location.href);
                if (t.host !== self.location.host) return;
                const s = ServiceWorkerGlobalScope.prototype.addEventListener;
                (ServiceWorkerGlobalScope.prototype.addEventListener = function (e, t, i) {
                    "fetch" !== e && s(e, t, i);
                }),
                    self.importScripts(t.href),
                    (ServiceWorkerGlobalScope.prototype.onfetch = function () {});
            } catch (e) {}
        }
        F(e) {
            if (!e.data) return;
            const t = e.data.json();
            if (t.isBaqend) {
                const { title: s } = t;
                (t.data.isBaqend = t.isBaqend), e.waitUntil(registration.showNotification(s, t));
            }
        }
        G(e) {
            const { action: t, notification: s } = e;
            if (!s.data.isBaqend) return;
            const i = s.data.closeNotification;
            "close" !== t ? (e.waitUntil(this.H(s.data.launchUrl)), i && setTimeout(s.close.bind(s), 1e4)) : s.close();
        }
        async H(e) {
            if (e) return clients.openWindow(e);
            const t = await clients.matchAll();
            return t.length > 0 ? t[0].focus() : clients.openWindow("/");
        }
        I(e) {
            if ((e.request.url, !this.P(e.request))) return;
            const t = je.fromEvent(e, this.state);
            t.mark("eventStart"), this.state !== $e.FAILED ? (this.state !== $e.RUNNING ? this.L(e, t) : this.J(e, t)) : this.M(t);
        }
        J(e, t) {
            t.cookies = this.cookieStore.getCookies(location.origin);
            const s = this.X.fetch(t);
            return (
                this.S(Promise.resolve(s)),
                s instanceof Promise
                    ? e.respondWith(
                          s.then((e) => {
                              if (e.response) return e.request, this.K(t, e.response), e.response;
                              e.request;
                              const s = e.request.fetchOriginal();
                              return this.K(t, s), s;
                          })
                      )
                    : s.response
                    ? (s.request, void e.respondWith(s.response))
                    : void s.request
            );
        }
        async K(e, t) {
            const s = await t;
            if (s.status < S.BadRequest) return;
            const i = e.navigation.clientId;
            this.c.capture(i, s.url, e.contentType);
        }
        L(e, t) {
            e.request.url,
                e.respondWith(
                    this.waitUntil($e.RUNNING, $e.FAILED).then((e) => {
                        if (e === $e.FAILED) return this.M(t), t.fetchOriginal();
                        t.cookies = this.cookieStore.getCookies(location.origin);
                        const s = Promise.resolve(this.X.fetch(t));
                        return this.S(s), s.then((e) => e.response || e.request.fetchOriginal());
                    })
                );
        }
        M(e) {
            e.request.url, e.isNavigateRequest() && (e.request.url, this.load());
        }
        async N(e) {
            if ((await this.waitUntil($e.RUNNING, $e.FAILED), this.state === $e.FAILED)) return this.O(e, this.reason);
            const t = e.source;
            e.data;
            for (const s of this.d) if (await s.handle(t, e.data, e.ports ? e.ports[0] : void 0)) return;
            e.data, await this.O(e, "No message handler could handle.");
        }
        async O(e, t) {
            if (e.ports && e.ports.length) return "init-cache" === e.data.type ? this.load() : void e.ports[0].postMessage({ reason: t, applicationState: this.state });
        }
        P(e) {
            try {
                if (
                    !(function (e) {
                        return e.url.startsWith("https");
                    })(e)
                )
                    return e.url, !1;
                if ("POST" === e.method && "navigate" === e.mode && this.state === $e.BOOTING) return e.url, this.e.setIgnoreNextNavigate(!0), !1;
                if ("same-origin" === e.mode) return e.url, !1;
                if ("only-if-cached" === e.cache) return e.url, !1;
                const s = i(e);
                if ([t.Audio, t.Video, t.PDF].includes(s)) return e.url, !1;
                if (e.headers.has("Range")) return e.url, !1;
                if (this.Q(e)) return e.url, !1;
                if (this.R(e)) return e.url, !1;
            } catch (e) {
                return !1;
            }
            return !0;
        }
        Q(e) {
            const t = new URL(e.url);
            return !!t.username || !!t.password;
        }
        R(e) {
            const t = new URL(e.url);
            if (!this.f.includes("Safari") || t.pathname.includes("/v1/rum/pi")) return !1;
            const s = this.g < 15 || (15 === this.g && this.h < 4),
                i = "GET" !== e.method && "HEAD" !== e.method,
                n = t.origin === location.origin,
                r = e.headers.has("content-type");
            if (i && ((!n && s) || !r)) return !0;
            const a = e.headers.has("cache-control");
            return s && !i && !n && a;
        }
        async S(e) {
            const t = await e;
            if (t.response && t.source === U.Origin && t.cause !== B.Fetchlist && !(await t.isSuccessful()))
                try {
                    const e = await t.response;
                    if (!e.status) return;
                    this.V({ type: "sw", timestamp: Date.now(), value: e.status, action: "originError", stackTrace: "", message: "" });
                } catch (e) {}
        }
        T(e) {
            _e("" + e.error) || this.V({ type: "sw", timestamp: Date.now(), action: "swError", message: e.message, stackTrace: "" });
        }
        U(e) {
            if (_e("" + e.reason)) return;
            const { message: t, stackTrace: s } = e.reason;
            this.V({ message: t, stackTrace: s, type: "sw", action: "swRejection", timestamp: Date.now() });
        }
        V(e) {
            try {
                Le(this.Y, e);
            } catch (e) {}
        }
    })({ cookieStore: Ht, handlerExecutor: Mt, options: Et, cache: At, cacheRevision: Ft, provider: Wt, brokenAssetListener: $t, navigateListener: Pt, scope: self });
const Kt = new (class {
        constructor(e, t) {
            (this.k = new u(3)), (this.l = new u(3)), (this.m = new Map()), (this.n = new u(3)), (this.i = e), (this.j = t);
        }
        popDynamicBlockResponse(e) {
            return this.k.popItem(e);
        }
        setDynamicBlockPreload(e, t) {
            this.k.putItem(e, t);
        }
        fetchAsDynamicBlockRequest(e, t = {}, s = !1) {
            const i = e.createDynamicBlockRequest(this.i.sdnSetup);
            if (this.i.sdnSetup) {
                const s = new Headers(e.originalRequest.headers);
                s.set("baqend-speed-kit-request", "dynamic"), (t.headers = s), (t.referrer = e.originalRequest.referrer), (t.credentials = "include");
            }
            const n = s ? O(0).then(() => i.fetch(t)) : i.fetch(t),
                r = s ? B.DynamicBlockPreload : B.DynamicBlock;
            return z(i, !0, r, n);
        }
        setOriginTimings(e, t, s) {
            this.l.putItem(e, { requestStart: t, responseStart: s });
        }
        popOriginTimings(e) {
            return this.l.popItem(e) || { responseStart: -1, requestStart: -1 };
        }
        async waitForDynamicBlocks(e, t = !1) {
            const s = this.m.get(e);
            if (s) return s.promise;
            if (t) return;
            const i = new qt();
            return this.m.set(e, i), i.promise;
        }
        async storeDynamicBlockResponse(e, t) {
            if (this.i.cachingDisabled || !this.i.originCachingEnabled || !t.response) return;
            const s = await t.response,
                i = s.headers.has("baqend-speed-kit-origin-cache");
            if (!(s && s.status < 400 && s.status >= 200) || i) return;
            const n = new Headers(s.headers);
            n.set("baqend-speed-kit-origin-cache", "true");
            const r = await Ze(s.clone(), { headers: n });
            e.url, await this.j.storeOriginResponse(e, r);
        }
        async retrieveDynamicBlockResponse(e) {
            const t = e.createDynamicBlockRequest(this.i.sdnSetup);
            if (this.i.cachingDisabled || !this.i.originCachingEnabled) return null;
            e.url;
            const s = await this.j.retrieveOriginResponse(e);
            return s ? z(t, !0, B.DynamicBlockCached, s) : null;
        }
        reportDynamicBlocksApplied(e) {
            const t = this.m.get(e);
            t && (t.resolve(), this.m.delete(e));
        }
        releaseOldClients() {
            this.m.forEach(async (e, t) => {
                if (!(await clients.get(t))) return this.reportDynamicBlocksApplied(t);
            });
        }
        setResourceHotness(e, t) {
            this.n.putItem(e, t);
        }
        getResourceHotness(e) {
            return this.n.getItem(e);
        }
    })(Et, Ft),
    Gt = new (class {
        constructor() {
            this.AC = new u(3);
        }
        addResponse(e) {
            const t = this.AB(e),
                s = e.request.navigation.clientId,
                i = this.AC.getItem(s) || [];
            t && i.push(t), this.AC.putItem(s, i);
        }
        AB(e) {
            return e.request.url
                ? { hasFastlyHeaders: !!e.fastlyHeaders, url: e.request.url, originURL: e.request.originalRequest.url, hotness: e.fastlyHeaders ? e.fastlyHeaders.getHotness() : null, served: at(e), cause: e.cause, source: e.source }
                : null;
        }
        getResponses(e, t = !1) {
            return (this.AC.getItem(e) || []).filter((e) => e.hasFastlyHeaders || t);
        }
        clearResponses(e) {
            this.AC.popItem(e);
        }
    })(),
    Vt = new (class extends et {
        constructor(e) {
            super(), (this.requestsInflightToPromiseMap = new Map()), (this.C0 = e);
        }
        async handle(e, t) {
            const s = await this.C0.getSWCacheKey(e),
                i = this.requestsInflightToPromiseMap.get(s);
            if (i) {
                const s = await i;
                return s.source === U.SwCache && !e.isCritical() ? t(e) : s.clone(e);
            }
            const n = e.url.searchParams.has("bqpreloadrequest");
            if (!e.isCritical() && !n) return t(e);
            const r = Promise.resolve(t(e));
            this.requestsInflightToPromiseMap.set(s, r);
            const a = await r;
            return (a.source !== U.SwCache && a.cause !== T.CacheHit) || this.requestsInflightToPromiseMap.delete(s), a;
        }
        async removeFromInflightList(e) {
            const t = await this.C0.getSWCacheKey(e);
            this.requestsInflightToPromiseMap.delete(t);
        }
        supportsHandling(e) {
            return !0;
        }
    })(Ut),
    _t = new (class {
        constructor(e, t, s, i, n, r) {
            (this.CL = e), (this.CM = t), (this.CN = s), (this.CP = i), (this.CO = n), (this.CQ = r);
        }
        async handleFromCache(e) {
            if (!navigator.onLine) return this.CF(e);
            if (e.isNavigateRequest() && "reload" === e.request.cache) return e.setResponseCause(x.ReloadCacheMode), null;
            const t = await this.CH(e);
            return t ? (e.url, this.CG(e, t)) : (e.url, e.setResponseCause(x.CacheMiss), null);
        }
        async cacheResponse(e, t) {
            return this.CL.cachingDisabled || !t.response ? (e.url, await this.CP.removeFromInflightList(e), t) : (e.waitUntil(this.CJ(e, t)), t);
        }
        async hasRunningRefreshJobs(e, t) {
            const s = await this.CO.getAssetAPIKey(e);
            return this.CM.isResponseStale(s, e.contentType, t);
        }
        async isOnRevalidationWhitelist(e, t) {
            const s = await this.CO.getAssetAPIKey(e);
            return this.CM.isOnWhitelist(s, e.contentType, t);
        }
        async isInCacheSketch(e) {
            const t = await this.CO.getAssetAPIKey(e);
            return this.CM.isInBloomFilter(t);
        }
        async trackRevalidation(e) {
            const t = await this.CO.getAssetAPIKey(e);
            this.CM.addToRevalidationWhitelist(t, e.contentType);
        }
        isRequestImmutable(e, t) {
            const s = this.CK(t);
            return (s && s.immutable) || this.CL.isImmutable(e);
        }
        isCacheSketchInvalid() {
            return this.CM.isInvalid();
        }
        isCachedResponseExpired(e) {
            const t = P(e, this.CM.getDrift());
            if (null !== t) return t;
            const s = (function (e) {
                const t = e.headers.get("expires");
                return t ? (Date.now(), Date.now() > Date.parse(t)) : null;
            })(e);
            if (null !== s) return s;
            const i = (function (e, t, s) {
                const i = e.headers.get("date");
                if (i) {
                    const i = Date.now(),
                        n = A(e) + s;
                    return Date.now(), t.staleWhileRevalidate, i - n > t.staleWhileRevalidate;
                }
                return null;
            })(e, this.CL, this.CM.getDrift());
            return null !== i && i;
        }
        async CF(e) {
            e.url;
            const t = await this.CH(e);
            return t ? K(e, !0, B.Offline, t) : (e.setResponseCause(x.CacheMiss), null);
        }
        async CG(e, t) {
            if (e.isCritical()) return K(e, !0, B.CriticalResource, t);
            if (this.isRequestImmutable(e, t)) return e.url, K(e, !0, B.Immutable, t);
            if (this.isCacheSketchInvalid()) return e.setResponseCause(x.InvalidCacheSketch), null;
            const s = await this.hasRunningRefreshJobs(e, t),
                i = this.isCachedResponseExpired(t);
            if (s) {
                e.url;
                const t = i ? x.ExpiredResponse : x.InstantRefresh;
                return e.setResponseCause(t), null;
            }
            if (await this.isOnRevalidationWhitelist(e, t)) return K(e, !0, T.RevalidationWhitelist, t);
            if (i) return e.url, e.setResponseCause(x.ExpiredResponse), null;
            return (await this.isInCacheSketch(e)) ? (e.setResponseCause(x.UrlInCacheSketch), null) : (e.url, K(e, !0, T.CacheHit, t));
        }
        async CH(e) {
            e.mark("cacheStart");
            const t = navigator.onLine ? await this.CN.loadResponse(e) : await this.CI(e);
            return e.mark("cacheEnd"), t;
        }
        async CI(e) {
            const t = je.create(e.request.url, { offlineResource: !0 }),
                s = await this.CN.loadResponse(t);
            if (s) return s;
            if (this.CL.useCacheWhenOffline) {
                const t = await this.CN.loadResponse(e);
                if (t) return t;
            }
            if (e.isNavigateRequest() && this.CL.offlinePage) {
                const e = je.create(this.CL.offlinePage, { offlineResource: !0 }),
                    t = await this.CN.loadResponse(e);
                if (t) return t;
            }
            return this.CN.loadResponse(e);
        }
        async CJ(e, t) {
            try {
                const s = await t.response;
                s && Q(t.source) && s.status < 400 && s.status >= 200 && 206 !== s.status && (await this.CN.storeResponse(e, s.clone()), await this.trackRevalidation(e));
            } catch (t) {
                e.url, t.message;
            }
            await this.CP.removeFromInflightList(e);
        }
        CK(e) {
            const t = N.fromString(e.headers.get("baqend-sw-control") || "");
            return t || null;
        }
    })(Et, Bt, Ft, Vt, Lt, Wt),
    Qt = new (class extends et {
        async handle(e, t) {
            return this.DP(e);
        }
        supportsHandling(e) {
            return e.url.pathname.endsWith("/speed-kit-safe-script.js");
        }
        DP(e) {
            return V(e, "", { status: 200, headers: { "content-type": "application/javascript", "cache-control": "public, max-age=31536000" } }, B.SafeScript);
        }
    })(),
    Xt = new (class extends et {
        constructor(e) {
            super(), (this.DS = e);
        }
        async handle(e, t) {
            const s = e.navigation.clientId;
            return e.url, await this.DS.waitForDynamicBlocks(s), this.DR(e);
        }
        supportsHandling(e) {
            return e.url.pathname.endsWith("/speed-kit-dom-ready.js");
        }
        DR(e) {
            return V(e, "", { status: 200, headers: { "content-type": "application/javascript", "cache-control": "max-age=0, no-cache, no-store", vary: "*" } }, B.Delayed);
        }
    })(Kt),
    Yt = new (class extends et {
        constructor(e, t, s, i, n) {
            super(), (this.loadEvents = 0), (this.C7 = e), (this.C8 = t), (this.C9 = s), (this.C$ = i), (this.C_ = n);
        }
        get loadEventCount() {
            return this.loadEvents;
        }
        trackLoadEvent() {
            this.loadEvents += 1;
        }
        handle(e, t) {
            if ((this.C$.releaseOldClients(), (this.loadEvents = 0), this.C5(e), this.C_.navigationPreload && e.preloadResponse && !this.C_.shouldCacheRequest(e)))
                return (async function (e) {
                    const t = e.preloadResponse;
                    if (!t) throw new TypeError("The request needs to have a Navigation Preload response.");
                    const s = await t;
                    return s ? (e.markAsFetched(), new $(U.Origin, B.NavigationPreload, e, Promise.resolve(s))) : z(e, !0, B.NavigationPreload);
                })(e).then((e) => this.C6(e));
            if (!e.modifying && this.C8.shouldIgnoreNavigate()) {
                this.C8.setIgnoreNextNavigate(!1);
                const t = this.C_.shouldCacheRequest(e) ? B.IgnoredAfterPOSTNavigate : e.getResponseCause();
                return this.C6(z(e, !0, t));
            }
            this.C8.setIgnoreNextNavigate(e.modifying && this.C_.ignoreAfterPostNavigate);
            const s = t(e);
            return s instanceof Promise ? s.then((e) => this.C6(e)) : this.C6(s);
        }
        supportsHandling(e) {
            return e.isNavigateRequest();
        }
        C5(e) {
            if ("reload" !== e.request.cache && "no-cache" !== e.request.cache) return;
            const t = !this.C_.isEnabledOnURL(e.originalRequest.url, e),
                s = this.C9.isDisconnected();
            if (t || s) return;
            const i = "reload" === e.request.cache;
            e.request.cache, this.C9.refreshOnReload(i);
        }
        C6(e) {
            const { request: t } = e;
            at(e);
            return e.cause === B.NavigationPreload && e.waitUntil(this.C7.executeFor(t)), e;
        }
    })(Jt, Pt, Wt, Kt, Et),
    Zt = new (class extends et {
        constructor(e) {
            super(), (this.DB = e);
        }
        supportsHandling(e) {
            return !e.isNavigateRequest();
        }
        handle(e, t) {
            const s = t(e);
            return s instanceof Promise ? s.then((e) => this.DA(e)) : this.DA(s);
        }
        DA(e) {
            const { request: t } = e;
            at(e);
            return this.DB.addResponse(e), e;
        }
    })(Gt),
    es = new (class {
        constructor() {
            (this._ = new u(10)), (this.AA = new u(10));
        }
        markClientAsReady(e, t) {
            const s = this._.popItem(e);
            s ? s(t) : this.AA.putItem(e, t);
        }
        async sendMessageToClient(e, t, s) {
            const i = this.AA.popItem(e);
            i
                ? i.postMessage({ type: t, payload: s })
                : new Promise((t) => {
                      this._.putItem(e, t);
                  }).then((e) => {
                      e.postMessage({ type: t, payload: s });
                  });
        }
    })(),
    ts = new (class extends et {
        constructor(e, t, s, i) {
            super(), (this.DL = e), (this.DN = t), (this.DM = s), (this.DO = i);
        }
        handle(e, t) {
            if (!this.DL.preloadDynamicBlocks) return e.waitUntil(this.DK(e)), t(e);
            const s = this.DJ(e),
                i = this.DI(s),
                n = this.DI(t(e));
            return this.DC(e, n, i), this.DD(e, i, n);
        }
        supportsHandling(e) {
            return e.isNavigateRequest();
        }
        DC(e, t, s) {
            e.waitUntil(
                Promise.all([
                    t,
                    s.then((t) => {
                        const s = this.DL.getRequestKey(e),
                            i = t.request.timings,
                            n = i && i.fetchStart ? i.fetchStart : -1,
                            r = i && i.fetchEnd ? i.fetchEnd : -1;
                        return this.DN.setOriginTimings(s, n, r), this.DH();
                    }),
                ])
            );
        }
        DD(e, t, s) {
            return Promise.race([t, s]).then(async (e) => {
                var i;
                const n = e.source !== U.Origin,
                    r = await e.isSuccessful(),
                    a = await e.isRedirect();
                if ((this.DG(t, s), a || this.DF(s, t), n && r && !a)) {
                    const t = null === (i = null == e ? void 0 : e.fastlyHeaders) || void 0 === i ? void 0 : i.getHotness(),
                        s = this.DL.getRequestKey(e.request);
                    return "number" == typeof t && this.DN.setResourceHotness(s, t), e;
                }
                return (
                    t.then((t) => {
                        r || (t.cause = e.cause), a && (t.cause = B.Redirect);
                    }),
                    t
                );
            });
        }
        DE(e) {
            const t = e.request.timings;
            return t && t.fetchEnd && t.fetchStart ? t.fetchEnd - t.fetchStart : null;
        }
        async DF(e, t) {
            const s = await e,
                i = await t,
                n = { assetSource: s.source === U.Origin ? U.AssetAPI : s.source, assetCause: s.cause },
                r = this.DE(s);
            r && (n.assetTTFB = r);
            const a = this.DE(i);
            a && (n.originTTFB = a);
            const o = s.fastlyHeaders ? s.fastlyHeaders.getPoP() : null;
            o && (n.cdnPoP = o);
            const c = s.request.navigation.clientId,
                h = c && this.DL.supportsClientId() ? c : F(s.request.originalRequest.url.toString());
            return this.DO.sendMessageToClient(h, "asset-response-timings", n);
        }
        async DG(e, t) {
            const s = await t;
            if (!(await s.isServerError())) return;
            const i = await e;
            (await i.isServerError()) || this.DM.disconnect(H.ServerError);
        }
        async DH() {
            if (this.DL.navigationPreload) return O(6e4);
        }
        async DI(e, t = 0) {
            const s = await e;
            return Date.now(), await s.response, t && (await O(t)), s;
        }
        DJ(e) {
            let t;
            t =
                this.DL.navigationPreload && e.preloadResponse
                    ? e.preloadResponse.then((t) => (t && t.url === e.originalRequest.url ? z(e, !0, B.DynamicBlockPreload, t) : this.DN.fetchAsDynamicBlockRequest(e, {}, !0)))
                    : Promise.resolve(this.DN.fetchAsDynamicBlockRequest(e, {}, !0));
            const s = this.DL.getRequestKey(e);
            return this.DN.setDynamicBlockPreload(s, t), t;
        }
        async DK(e) {
            if (await this.DL.shouldFetchOrigin(e.request)) {
                await O(2e3);
                try {
                    const t = {},
                        s = e.createDynamicBlockRequest(!1);
                    if (this.DL.sdnSetup) {
                        const s = new Headers(e.originalRequest.headers);
                        s.set("baqend-speed-kit-request", "dynamic"), (t.headers = s);
                    }
                    await s.fetch(t);
                } catch (e) {
                    e.stack;
                }
            }
        }
    })(Et, Kt, jt, es),
    ss = new (class extends et {
        constructor(e, t, s, i, n, r) {
            super(), (this.v = e), (this.w = t), (this.x = s), (this.y = i), (this.z = n), (this.$ = r);
        }
        handle(e, t) {
            this.u(e);
            const s = t(e);
            return e.isNavigateRequest() ? (s instanceof Promise ? s.then((t) => this.r(e, t)) : this.r(e, s)) : s;
        }
        supportsHandling(e) {
            return !0;
        }
        q(e, t) {
            const s = e.request.destination;
            if (!this.$.shouldCountIFrameNavigation() && ["embed", "frame", "iframe"].includes(s)) return;
            if (this.y.isDisconnected()) return void this.z.incrementDisconnectedCount(e, t);
            Ue(this.$.isEnabledOnSite(e), (s) => {
                s ? this.z.incrementCount(e, t) : this.z.incrementDisabledCount(e, t);
            });
        }
        r(e, t) {
            return this.y.getDisconnectCause() && (t.disconnectCause = this.y.getDisconnectCause()), this.s(e, t);
        }
        s(e, t) {
            return t.waitUntil(this.t(e, t)), t;
        }
        async t(e, t) {
            const s = await t.response,
                i = this.$.supportsClientId(e);
            (s && (await t.isRedirect()) && !i) || this.v.capture(e, kt.fromContext(t, t.source === U.Origin, this.$.getSplitTestId(), this.$.getGroup(), s));
        }
        u(e) {
            const t = e.isNavigateRequest(),
                s = this.$.supportsClientId(e);
            (!t && s) || (t && !s) || this.q(e, e.resultingClientId || e.navigation.clientId);
        }
    })(Pt, Yt, Kt, Wt, Tt, Et);
zt.pushHandler(ss),
    zt.pushHandler(
        new (class extends et {
            constructor(e, t) {
                super(), (this.C3 = e), (this.C4 = t);
            }
            handle(e, t) {
                e.mark(this.C3);
                const s = t(e);
                return s instanceof Promise || s.response instanceof Promise ? (e.waitUntil(this.C2(s)), s) : (s.request.mark(this.C4), s);
            }
            supportsHandling(e) {
                return !0;
            }
            async C2(e) {
                Ue(e, async (e) => {
                    await e.response, e.request.mark(this.C4);
                });
            }
        })("handleStart", "handleEnd")
    ),
    zt.pushHandler(Yt),
    zt.pushHandler(Zt),
    zt.pushHandler(Qt),
    zt.pushHandler(Xt),
    zt.pushHandler(
        new (class extends et {
            constructor(e) {
                super(), (this.DU = e);
            }
            handle(e, t) {
                e.url;
                const s = e.fetch();
                return new $(U.Origin, B.Fetchlist, e, s);
            }
            supportsHandling(e) {
                return this.DU.shouldEnsureFetch(e) && !e.isCritical();
            }
        })(Et)
    ),
    zt.pushHandler(new rt(Et, Kt)),
    zt.pushHandler(
        new (class extends et {
            constructor(e, t) {
                super(), (this.Cs = e), (this.Ct = t);
            }
            handle(e, t) {
                e.url;
                const s = z(e, !0, B.Disconnected);
                return s.setDisconnectCause(this.Cs.getDisconnectCause()), s;
            }
            supportsHandling(e) {
                return navigator.onLine && this.Cs.isDisconnected() && !this.Ct.shouldBypassDeactivation();
            }
        })(Wt, Et)
    ),
    zt.pushHandler(
        new (class extends et {
            constructor(e, t) {
                super(), (this.Ch = e), (this.Ci = t);
            }
            handle(e, t) {
                return e.url, e.isNavigateRequest() && e.waitUntil(this.Ch.executeFor(e)), z(e, !0, e.getResponseCause());
            }
            supportsHandling(e) {
                return e.mark("blacklistHandler"), !(e.prewarm || this.Ci.shouldCacheRequest(e) || this.Ci.isTrackingRequest(e) || this.Ci.shouldDelayRequest(e));
            }
        })(Jt, Et)
    ),
    zt.pushHandler(
        new (class extends et {
            constructor(e, t) {
                super(), (this.Cq = e), (this.Cr = t);
            }
            handle(e, t) {
                return Ue(this.Cq.isEnabledOnSite(e), (s) => {
                    if (s) return t(e);
                    const i = z(e, !0, e.getResponseCause());
                    return this.Cq.enforceDisabledPages || e.isNavigateRequest() ? i : this.Cr.handleFromCache(e).then((e) => e || i);
                });
            }
            supportsHandling(e) {
                return e.mark("disabledPageHandler"), !e.prewarm && !e.isPrecache();
            }
        })(Et, _t)
    ),
    zt.pushHandler(
        new (class extends et {
            constructor(e, t) {
                super(), (this.DV = e), (this.DW = t);
            }
            async handle(e, t) {
                e.url;
                const s = t(e),
                    i = await s;
                let n = await i.response;
                n || (n = await e.fetchOriginal());
                const r = new Headers(n.headers);
                r.set("timing-allow-origin", "*"), r.set("cache-control", "max-age=0, no-cache, no-store"), r.set("vary", "*");
                const a = Ze(n, { headers: r });
                return await this.DW.waitForDynamicBlocks(e.navigation.clientId, !0), new $(i.source, i.cause, e, a);
            }
            supportsHandling(e) {
                return this.DV.shouldDefer(e);
            }
        })(Et, Kt)
    ),
    zt.pushHandler(new nt(Et)),
    zt.pushHandler(
        new (class extends et {
            constructor(e) {
                super(), (this.DX = e);
            }
            handle(e, s) {
                return Promise.resolve().then(async () =>
                    (await this.DX.isEnabledOnSite(e))
                        ? (e.fetchOriginal(),
                          e.url,
                          e.contentType === t.Image ? it(e, { headers: { "content-type": "image/gif" }, status: 200 }) : e.contentType === t.Script ? ct(e, { headers: { "content-type": "text/javascript" }, status: 200 }) : ct(e))
                        : s(e)
                );
            }
            supportsHandling(e) {
                return this.DX.isTrackingRequest(e);
            }
        })(Et)
    ),
    zt.pushHandler(
        new (class extends et {
            constructor(e) {
                super(), (this.C1 = e);
            }
            handle(e, t) {
                return e.url, e.waitUntil(this.C1.refreshCacheSketch()), t(e);
            }
            supportsHandling(e) {
                return !0;
            }
        })(Wt)
    ),
    zt.pushHandler(ts),
    zt.pushHandler(Vt),
    zt.pushHandler(
        new (class extends et {
            constructor() {
                super(...arguments), (this.DT = new ot());
            }
            async handle(e, t) {
                const s = t(e),
                    i = await s,
                    n = await i.response;
                return at(i) && n && j(n) ? this.resolvePossibleLoop(e, i, n) : (this.DT.clear(), i);
            }
            resolvePossibleLoop(e, t, s) {
                if (this.DT.addRedirect(e.originalRequest, s)) {
                    const t = e.fetchOriginal();
                    return t.then(() => this.DT.clear()), e.markAsFetched(), new $(U.Origin, B.LoopDetected, e, t);
                }
                return t;
            }
            supportsHandling(e) {
                return e.isNavigateRequest();
            }
        })()
    ),
    zt.pushHandler(
        new (class extends et {
            constructor(e) {
                super(), (this.DQ = e);
            }
            async handle(e, t) {
                const s = await this.DQ.handleFromCache(e);
                if (s) return s;
                e.url;
                const i = await t(e);
                if (!navigator.onLine && i.cause === B.Error) {
                    const t = await this.DQ.handleFromCache(e);
                    if (t) return t;
                }
                return this.DQ.cacheResponse(e, i);
            }
            supportsHandling(e) {
                return !0;
            }
        })(_t)
    ),
    zt.pushHandler(
        new (class extends et {
            constructor(e, t, s) {
                super(), (this.Cn = e), (this.Co = t), (this.Cp = s);
            }
            handle(e, t) {
                return e.waitUntil(this.Cm(e)), t(e);
            }
            supportsHandling(e) {
                return e.isNavigateRequest();
            }
            async Cm(e) {
                if (!this.Cp.hasCriticalResources()) return;
                const t = await this.Co.loadResponse(e);
                t || (await this.Cn.executeFor(e));
            }
        })(Jt, Ft, Et)
    ),
    zt.pushHandler(
        new (class extends et {
            constructor(e) {
                super(), (this.Cf = e);
                const [t, s] = q(navigator.userAgent);
                this.Cg = !(("Chrome" === t && s < 64) || ("Firefox" === t && s < 61));
            }
            async handle(e, t) {
                const s = await this.Ce(e);
                return s ? z(e, !0, T.CacheHit, s) : t(e);
            }
            supportsHandling(e) {
                return this.Cg && e.isSameOrigin() && !e.isNavigateRequest() && !e.isPrecache();
            }
            async Ce(e) {
                const t = e.originalRequest.url;
                try {
                    const e = await fetch(t, { mode: "same-origin", cache: "only-if-cached" });
                    if (!this.Cf.isCachedResponseExpired(e) && e.status < S.BadRequest) return e;
                } catch (e) {}
                return null;
            }
        })(_t)
    ),
    zt.pushHandler(
        new (class extends et {
            constructor(e, t, s) {
                super(), (this.Ca = e), (this.Cb = t), (this.Cc = s), (this.Cd = new tt(t, e));
            }
            async handle(e) {
                e.url = await this.Cc.createAssetAPIRequest(e);
                const t = await this.CS(e);
                return t.status === S.BaqendRedirect ? this.CT(e, t) : t.status === S.TimeoutError ? this.CY(e, t) : t.status >= S.BadRequest || t.status < S.OK ? this.CU(e, t) : 206 === t.status ? this.CZ(e, t) : this.CW(e, t);
            }
            supportsHandling(e) {
                return !0;
            }
            async CS(e) {
                try {
                    (e.headers = this.CX(e)), (e.mode = this.CV(e)), (e.cache = "no-cache"), e.url, e.request.cache;
                    const s = e.originalRequest.referrer;
                    e.contentType === t.Image && this.Ca.omitImageCredentials && (e.credentials = st.Omit);
                    const i = e.fetch({ referrer: s }),
                        n = e.contentType !== t.Navigate ? await Promise.race([i, O(1e4)]) : await i;
                    return n || new Response(null, { status: S.TimeoutError });
                } catch (e) {
                    this.Cb.setDisconnectCause(H.SWException);
                    const t = e instanceof TypeError ? S.FetchTypeError : S.BadGateway;
                    return new Response(e.message, { status: t });
                }
            }
            async CT(e, t) {
                const s = we(new URL(e.originalRequest.url), t.headers.get("location")),
                    i = await this.Ca.appendStrippedParams(new URL(s), e),
                    n = je.create(i);
                if (!this.Ca.shouldCacheRequest(n)) {
                    if ((e.url, n.url, this.Ca.preloadDynamicBlocks)) return z(e, !0, B.Redirect);
                    const t = e.fetchOriginal();
                    return z(e, !1, B.Redirect, t);
                }
                const r = new J(t.headers),
                    a = r.getResponseSource(),
                    o = e.getResponseCause(),
                    c = new Headers(t.headers);
                return c.set("location", i), V(e, null, { headers: c, status: S.MovedTemporarily, statusText: t.statusText }, o, a, r);
            }
            async CU(e, t) {
                if (e.isCritical()) return G(e, !0, B.Error);
                if (t.status >= S.InternalServerError) return this.Cd.handleInternalServerError(e);
                t.status;
                const s = M(t.headers.get("server-timing")).errorCause,
                    i = (null == s ? void 0 : s.desc) || B.ClientError;
                if (this.Ca.preloadDynamicBlocks) return z(e, !0, i);
                const n = e.fetchOriginal();
                return z(e, !1, i, n);
            }
            CV(e) {
                return e.isSameOrigin() ? "same-origin" : e.request.headers.has("origin") || e.request.url.startsWith(this.Ca.appURL.toLowerCase()) ? "cors" : "no-cors";
            }
            CW(e, t) {
                return o(e, this.Ca) ? (e.url, G(e, !1, e.getResponseCause(), t)) : Ze(t).then((t) => (Object.defineProperty(t, "url", { value: e.originalRequest.url.toString() }), e.url, G(e, !1, e.getResponseCause(), t)));
            }
            CX(e) {
                const t = new Headers();
                return (
                    e.headers.forEach((e, s) => {
                        new Blob([e]).size <= 128 && t.append(s, e);
                    }),
                    t
                );
            }
            CY(e, t) {
                return t.status, this.Cd.disconnect(H.AssetTimeout), z(e, !0, B.Timeout);
            }
            CZ(e, t) {
                return t.status, z(e, !0, B.PartialResponse);
            }
        })(Et, Wt, Lt)
    ),
    zt.pushMessage(new pt(Pt, Et, es)),
    zt.pushMessage(new ut(Wt)),
    zt.pushMessage(new lt(Wt)),
    zt.pushMessage(new dt(Wt)),
    zt.pushMessage(new gt(Et, Ft, Wt, Ht, Mt)),
    zt.pushMessage(new ft(Wt, Yt, Ht)),
    zt.pushMessage(new wt(Kt)),
    zt.pushMessage(new yt(Et)),
    zt.pushMessage(new vt(Kt, Et)),
    zt.pushMessage(new Ct(Et)),
    zt.pushMessage(new Rt()),
    zt.pushMessage(new Dt(Gt)),
    zt.pushMessage(new bt($t)),
    zt.pushMessage(new St(Ft)),
    zt.install(Et),
    zt.claimClients(),
    zt.watch(Nt, Et, Ht, Bt, Tt, xt).then(() => zt.load());
