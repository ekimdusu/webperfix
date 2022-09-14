var speedKit = {
    appName: "archaic-castle-89",
    whitelist: [
        /* START Default Whitelist + Third Party Content */
        {
            host: [/neredeoku\.com$/, "stackpath.bootstrapcdn.com", "cdnjs.cloudflare.com", "code.jquery.com", "snap.licdn.com", "rum-static.pingdom.net", "ajax.googleapis.com", "fonts.googleapis.com", "fonts.gstatic.com"],
        },
        {
            url: "",
        },
        {
            url: [
                "stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css",
                "stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.bundle.min.js",
                "cdnjs.cloudflare.com/ajax/libs/jquery-cookie/1.4.1/jquery.cookie.min.js",
                "cdnjs.cloudflare.com/ajax/libs/unveil2/2.0.8/jquery.unveil2.min.js",
                "cdnjs.cloudflare.com/ajax/libs/malihu-custom-scrollbar-plugin/3.1.5/jquery.mCustomScrollbar.concat.min.js",
                "cdnjs.cloudflare.com/ajax/libs/malihu-custom-scrollbar-plugin/3.1.5/jquery.mCustomScrollbar.min.css",
                "code.jquery.com/jquery-3.3.1.min.js",
                "snap.licdn.com/li.lms-analytics/insight.min.js",
                "www.googletagmanager.com/gtm.js",
                "www.google-analytics.com/analytics.js",
            ],
        },
        /* END Default Whitelist */
    ],
    blacklist: [
        /* START Not Static Content */
        {
            contentType: ["document"],
        },
        /* END Not Static Content */
        /* START Default Blacklist */
        {
            url: [/[?&](_=1\d{12})/, /\.pdf/],
        },
        {
            contentType: ["video"],
        },
        /* END Default Blacklist */
    ],
};
!(function (e, t, n, r, i, o, a) {
    "use strict";
    var s = "baqend-speedkit",
        c = s + "-user-id",
        u = s + "-session-id",
        d = s + "-session-index",
        p = s + "-session-timestamp";
    function l(e, t, n, r) {
        return Promise.resolve(e).then(function (e) {
            return new Promise(function (i, o) {
                var a = e.transaction(t, n),
                    s = Promise.resolve(r(a.objectStore(t)));
                (a.oncomplete = function () {
                    return s.then(i);
                }),
                    (a.onabort = a.onerror = function () {
                        return o(a.error);
                    });
            });
        });
    }
    function f(e, t, n) {
        return l(e, t, "readwrite", n);
    }
    function g(e, t) {
        return t && "/" !== t ? "" + ("" + (t.lastIndexOf("/") === t.length - 1 ? t.substr(0, t.length - 1) : t)) + ((0 === e.indexOf("/") ? "" : "/") + e) : e;
    }
    var v = (function () {
        function e(e) {
            (this.dbp = null), (this.cacheName = g(s, e)), (this.dbp = this.openDb());
        }
        return (
            (e.prototype.get = function (e) {
                return ((t = this.db()),
                (n = "baqend-speedkit-store"),
                (r = function (t) {
                    return t.get(e);
                }),
                l(t, n, "readonly", r)).then(function (e) {
                    return e.result || null;
                });
                var t, n, r;
            }),
            (e.prototype.set = function (e, t) {
                return f(this.db(), "baqend-speedkit-store", function (n) {
                    return n.put(t, e) && void 0;
                });
            }),
            (e.prototype.clear = function () {
                return Promise.all([
                    ((e = this.db()),
                    (t = "baqend-speedkit-store"),
                    f(e, t, function (e) {
                        return e.clear();
                    }).then(function () {})),
                ]).then(function () {});
                var e, t;
            }),
            (e.prototype.disconnect = function () {
                var e = this;
                return this.dbp
                    ? this.dbp.then(function (t) {
                          (e.dbp = null), t.close();
                      })
                    : Promise.resolve();
            }),
            (e.prototype.db = function () {
                return this.dbp || (this.dbp = this.openDb()), this.dbp;
            }),
            (e.prototype.openDb = function () {
                var e = this,
                    t = indexedDB.open(this.cacheName, 1);
                return (
                    (t.onupgradeneeded = function (e) {
                        var n = e.oldVersion,
                            r = t.result;
                        if (n < 1) {
                            if (!r) return;
                            try {
                                r.createObjectStore("baqend-speedkit-store");
                            } catch (i) {}
                        }
                    }),
                    this.openRequest(t).then(function (t) {
                        return (
                            (t.onclose = function () {
                                e.dbp = null;
                            }),
                            (t.onerror = function () {
                                e.dbp = null;
                            }),
                            (t.onversionchange = function (n) {
                                n.newVersion || ((e.dbp = null), t.close());
                            }),
                            t
                        );
                    })
                );
            }),
            (e.prototype.openRequest = function (e) {
                return new Promise(function (t, n) {
                    (e.onsuccess = function () {
                        return t(e.result);
                    }),
                        (e.onerror = function () {
                            return n(e.error);
                        }),
                        (e.onblocked = function () {
                            return n(e.error);
                        });
                });
            }),
            e
        );
    })();
    !(function () {
        function e() {
            this.map = new Map();
        }
        (e.prototype.get = function (e) {
            return Promise.resolve(this.map.get(e) || null);
        }),
            (e.prototype.set = function (e, t) {
                return this.map.set(e, t), Promise.resolve();
            }),
            (e.prototype.clear = function () {
                return this.map.clear(), Promise.resolve();
            });
    })();
    function h(t) {
        "complete" !== e.readyState
            ? window.addEventListener("load", function () {
                  return t();
              })
            : t();
    }
    var m = 1e5;
    function y(e, n) {
        var r = (function (e, t) {
            void 0 === t && (t = m);
            var n = JSON.stringify(e),
                r = n.length;
            if (r <= t) return n;
            var i = [],
                o = [];
            Object.keys(e).forEach(function (t) {
                var n = JSON.stringify(e[t]);
                i.push({ name: t, size: n.length });
            }),
                i.sort(function (e, t) {
                    return t.size - e.size;
                });
            for (var a = 0; r > t && i[a]; ) delete e[i[a].name], (r -= i[a].size), o.push(i[a].name), (a += 1);
            return (e.truncatedKeys = o), JSON.stringify(e);
        })(n);
        try {
            if (t.sendBeacon && t.sendBeacon(e, r)) return;
        } catch (o) {}
        var i = new XMLHttpRequest();
        i.open("POST", e, !0), i.setRequestHeader("Content-Type", "text/plain;charset=UTF-8"), i.send(r);
    }
    function S(e, t) {
        return (
            !((Array.isArray(e) && !Array.isArray(t)) || (!Array.isArray(e) && Array.isArray(t))) &&
            !(typeof e != typeof t) &&
            (Array.isArray(e)
                ? e.length === t.length
                : "object" == typeof e
                ? (function (e, t) {
                      var n = 0,
                          r = 0;
                      for (var i in e) if (Object.prototype.hasOwnProperty.call(e, i) && ((n += 1), !S(e[i], t[i]))) return !1;
                      for (var i in t) r += 1;
                      return n === r;
                  })(e, t)
                : e === t)
        );
    }
    function w(t) {
        "loading" === e.readyState
            ? e.addEventListener("DOMContentLoaded", function () {
                  return t();
              })
            : setTimeout(t, 0);
    }
    function b(t) {
        e.querySelector("html.speed-kit-dynamic-loaded")
            ? setTimeout(t, 0)
            : e.addEventListener("speed-kit-loaded", function () {
                  return t();
              });
    }
    var T = (function () {
        function e() {
            this.dataLayerObservers = [];
        }
        return (
            (e.prototype.onDataLayer = function (e) {
                if (!this.dataLayerObservers.length) {
                    var t = this.dataLayerObservers;
                    this.observeDataLayer(function () {
                        for (
                            var e = function (e) {
                                    var t = n;
                                    setTimeout(function () {
                                        e.apply({}, t);
                                    }, 0);
                                },
                                n = arguments,
                                r = 0,
                                i = t;
                            r < i.length;
                            r++
                        ) {
                            var o = i[r];
                            e(o);
                        }
                    });
                }
                this.dataLayerObservers.push(e);
            }),
            (e.prototype.onDataLayerReady = function (e) {
                this.waitForDataLayer(e);
            }),
            (e.prototype.observeDataLayer = function (e) {
                w(this.initDataLayer.bind(this, e));
            }),
            (e.prototype.initDataLayer = function () {
                var e = arguments[0];
                this.waitForDataLayer(function () {
                    var t = window.dataLayer,
                        n = t.push;
                    t.push = function push() {
                        var r = Array.prototype.slice.call(arguments),
                            i = n.apply(t, r);
                        return e.apply(t, r), i;
                    };
                    for (var r = 0; r < t.length; r += 1) e.call(t, t[r]);
                });
            }),
            (e.prototype.waitForDataLayer = function (e) {
                var t = this;
                window.dataLayer
                    ? e()
                    : setTimeout(function () {
                          t.waitForDataLayer(e);
                      }, 500);
            }),
            e
        );
    })();
    function k(e) {
        return (
            void 0 === e && (e = 25),
            (function (e) {
                var t = [];
                t.length = e;
                var n = 0;
                for (; n < e; ) (t[n] = 0), (n += 1);
                return t;
            })(e)
                .map(function () {
                    return Math.floor(62 * Math.random());
                })
                .map(function (e) {
                    return "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"[e];
                })
                .join("")
        );
    }
    function I() {
        for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
        var n = {};
        return (
            e.forEach(function (e) {
                Object.keys(e).forEach(function (t) {
                    return (n[t] = e[t]);
                });
            }),
            n
        );
    }
    var C = { performanceOnly: !1, stripAllParameter: !1, noCookies: !1, noTracking: !1, pageDisabled: !1 };
    function N() {
        var e = I({}, C);
        return r.rumTracking ? ("boolean" == typeof r.rumTracking ? e : I(e, r.rumTracking)) : I(e, { noTracking: !0 });
    }
    function P(e) {
        var t = null;
        if ("undefined" != typeof Storage)
            try {
                t = localStorage.getItem(e);
            } catch (n) {}
        return t;
    }
    function E() {
        var e,
            t = k(),
            n = 0;
        if ((e = P(p)) && (Date.now() - parseInt(e, 10)) / 1e3 <= 1800) {
            t = P(u);
            var r = "" + (P(d) || -1);
            n = parseInt(r, 10) + 1;
        }
        return [t, n];
    }
    function D(e, t) {
        if ("undefined" != typeof Storage)
            try {
                localStorage.setItem(e, t);
            } catch (n) {}
    }
    var O,
        L = [c, "baqend-speedkit-config"];
    function R() {
        return !("1" !== P("baqend-speedkit-sk-opt-out") && !window.deactivateSpeedKit);
    }
    function A(t, n) {
        if (!(R() || (D(t, n), N().noCookies || L.indexOf(t) < 0))) {
            var i = r.cookieLifetime || 180,
                o = new Date(Date.now() + 24 * i * 60 * 60 * 1e3).toUTCString();
            try {
                e.cookie = t + "=" + n + "; expires=" + o + "; path=/; SameSite=Lax; Secure";
            } catch (a) {}
        }
    }
    function B(t, n) {
        void 0 === n && (n = !0);
        var r = P(t),
            i = (function (t) {
                try {
                    var n = new RegExp(t + "=([^,;]*)"),
                        r = e.cookie.match(n);
                    return r && r[1] ? r[1] : null;
                } catch (i) {}
                return null;
            })(t),
            o = r || i;
        return o && r !== i && n && A(t, o), o;
    }
    function F(e) {
        return void 0 === e && (e = !0), B(c, e) || k();
    }
    function x(e) {
        return "reason" in e;
    }
    function K(e, t) {
        !(function () {
            if (window.SpeedKit && window.SpeedKit.track) return;
            var e = N(),
                t = !(e.noTracking || e.performanceOnly);
            if (
                ((window.SpeedKit = window.SpeedKit || {}),
                (window.SpeedKit.navigateId = window.SpeedKit.navigateId || "" + k(32)),
                (window.SpeedKit.group = window.SpeedKit.group || "sk"),
                (window.SpeedKit.track = U),
                !window.SpeedKit.sessionId && t)
            ) {
                var n = E(),
                    r = n[0],
                    i = n[1];
                (window.SpeedKit.sessionId = r), (window.SpeedKit.sessionIndex = i);
            }
            t && (window.SpeedKit.userId = window.SpeedKit.userId || F());
        })();
        var n = { timestamp: Date.now(), type: t, message: "Install.js", stackTrace: "null" };
        if (
            (function (e) {
                return !!e && ("reason" in e || "message" in e);
            })(e)
        ) {
            var r = x(e) ? e.reason.message || JSON.stringify(e.reason) : e.message,
                i = x(e) ? e.reason.stack : e.stack;
            (n.message = "Install.js: " + r), (n.stackTrace = i || "null");
        }
        !(function (e) {
            q("jsErrors", [e]);
        })(n);
    }
    function U(e, t, n) {
        q("events", [{ action: "" + e, label: "" + t, value: isNaN(Number(n)) ? 0 : Number(n) }]);
    }
    function q(e, t) {
        var n = N();
        if (!n.noTracking) {
            var i = { sessionId: SpeedKit.sessionId, userId: SpeedKit.userId },
                o = { piId: SpeedKit.navigateId, testGroup: SpeedKit.group };
            o[e] = t;
            var a = n.performanceOnly ? o : I(o, i);
            y("https://" + (r.appDomain || "{}.app.baqend.com".replace("{}", r.appName)) + "/v1" + "/rum/pi", a);
        }
    }
    !(function (e) {
        (e.SNIPPET = "snippet"), (e.CONFIG = "skConfig"), (e.RUMPLUGIN = "rum"), (e.JSTRACKINGPLUGIN = "js"), (e.DFCONFIG = "dfConfig"), (e.MERGE = "merge"), (e.CHANGEDETECTION = "cd"), (e.DYNAMICFETCHER = "df");
    })(O || (O = {}));
    var G = (function () {
        function e(e) {
            (this.rumController = e),
                (this.triggerFunctions = {
                    domInteractive: this.rumController.onDOMInteractive,
                    load: this.rumController.onLoad,
                    speedKitLoaded: this.rumController.onSpeedKitLoaded,
                    dataLayer: this.rumController.onDataLayer.bind(this.rumController),
                    dataLayerReady: this.rumController.onDataLayerReady.bind(this.rumController),
                    visibilityHidden: this.rumController.onVisibilityHidden,
                    dfDataReady: this.rumController.onDfDataReady,
                    leavePage: this.rumController.onLeavePage.bind(this.rumController),
                    gaReady: this.rumController.onGaReady.bind(this.rumController),
                    gaTracking: this.rumController.onGaTracking.bind(this.rumController),
                });
        }
        return (
            (e.prototype.initPlugin = function (e) {
                if (e.shouldExecute)
                    try {
                        if (!e.shouldExecute()) return;
                    } catch (n) {
                        K(n, O.RUMPLUGIN);
                    }
                e.type || (e.type = "Data");
                "string" == typeof e.on
                    ? (e.on = this.triggerFunctions[e.on] || this.getUnknownTriggerFunction(e.on))
                    : (e.on =
                          e.on ||
                          function (e) {
                              return e();
                          });
                var t = this.generateCallbackFunction(e);
                try {
                    e.on(t, this.rumController);
                } catch (n) {
                    K(n, O.RUMPLUGIN);
                }
            }),
            (e.prototype.generateCallbackFunction = function (e) {
                var t = this;
                return function () {
                    for (var n = [], r = 0; r < arguments.length; r++) n[r] = arguments[r];
                    if (e.track) {
                        var i = [t.rumController].concat(n);
                        try {
                            e.track.apply(e, i);
                        } catch (c) {
                            K(c, O.RUMPLUGIN);
                        }
                    } else if (e.key && (e.set || e.append || e.setTiming)) {
                        var o,
                            a = t.getControllerFunction(e),
                            s = t.getTrackingFunction(e);
                        try {
                            o = s.apply(e, n);
                        } catch (c) {
                            K(c, O.RUMPLUGIN);
                        }
                        null != o && a.call(t.rumController, e.key, o);
                    }
                };
            }),
            (e.prototype.getControllerFunction = function (e) {
                return e.setTiming ? this.rumController.setTiming : e.set ? this.rumController.set : this.rumController.append;
            }),
            (e.prototype.getTrackingFunction = function (e) {
                return e.setTiming || e.set || e.append;
            }),
            (e.prototype.getUnknownTriggerFunction = function (e) {
                var t = this,
                    n = function (r) {
                        null !== t.resolvePluginVariable(e)
                            ? r()
                            : setTimeout(function () {
                                  return n(r);
                              }, 200);
                    };
                return n;
            }),
            (e.prototype.resolvePluginVariable = function (e) {
                for (var t = e.replace(/\[(\w+)\]/g, ".$1"), n = (t = t.replace(/^\./, "")).split("."), r = window, i = 0, o = n; i < o.length; i++) {
                    var a = o[i];
                    if ("object" != typeof r || null == r) break;
                    r = r[a];
                }
                return r || null;
            }),
            e
        );
    })();
    function M(t) {
        e.addEventListener(
            "visibilitychange",
            function () {
                "hidden" === e.visibilityState && t();
            },
            !0
        );
    }
    function H(t) {
        (SpeedKit && SpeedKit.dynamicBlocks && SpeedKit.dynamicBlocks.complete && SpeedKit.dynamicBlocks.dataComplete) || !e.querySelector("html.speed-kit-dynamic-loading")
            ? setTimeout(t, 0)
            : e.addEventListener("dynamic-fetcher-data-ready", function () {
                  return t();
              });
    }
    var j,
        W = (function () {
            function t() {
                (this.callbacks = []), (this.unloaded = !1);
            }
            return (
                (t.prototype.init = function () {
                    var t = this;
                    e.addEventListener("visibilitychange", function () {
                        "hidden" === e.visibilityState ? t.prepareBeforeLeaving("visibilityChange") : "visible" === e.visibilityState && (t.unloaded = !1);
                    }),
                        "onpagehide" in window
                            ? window.addEventListener("pagehide", function () {
                                  return t.prepareBeforeLeaving("pagehide");
                              })
                            : (window.addEventListener("beforeunload", function () {
                                  return t.prepareBeforeLeaving("beforeunload");
                              }),
                              window.addEventListener("unload", function () {
                                  return t.prepareBeforeLeaving("unload");
                              }));
                }),
                (t.prototype.onLeavePage = function (e) {
                    this.callbacks.push(e);
                }),
                (t.prototype.executeRemainingCallbacks = function () {
                    for (var e = 0, t = this.callbacks; e < t.length; e++) {
                        (0, t[e])();
                    }
                    this.callbacks = [];
                }),
                (t.prototype.prepareBeforeLeaving = function (e) {
                    var t = SpeedKit;
                    this.executeRemainingCallbacks(), ce(t, e), (this.unloaded = !0);
                }),
                (t.prototype.isUnloaded = function () {
                    return this.unloaded;
                }),
                t
            );
        })(),
        J = (function () {
            function e() {
                this.gaObserver = [];
            }
            return (
                (e.prototype.onGaTracking = function (e) {
                    if (!this.gaObserver.length) {
                        var t = this.gaObserver;
                        this.observeGa(function () {
                            for (var e = 0, n = t; e < n.length; e++) {
                                var r = n[e];
                                r.apply({}, arguments);
                            }
                        });
                    }
                    this.gaObserver.push(e);
                }),
                (e.prototype.onGaReady = function (e) {
                    w(this.waitForGa.bind(this, e));
                }),
                (e.prototype.observeGa = function (e) {
                    w(this.initGa.bind(this, e));
                }),
                (e.prototype.initGa = function () {
                    var e = this,
                        t = arguments[0];
                    this.waitForGa(function () {
                        window.ga.getAll().forEach(function (n) {
                            var r = n.get("sendHitTask");
                            n.set("sendHitTask", function (n) {
                                r.call(e, n), t.call(e, n);
                            });
                        });
                    });
                }),
                (e.prototype.waitForGa = function (e) {
                    var t = this,
                        n = window.ga;
                    n
                        ? n(function () {
                              return e();
                          })
                        : setTimeout(function () {
                              return t.waitForGa(e);
                          }, 500);
                }),
                e
            );
        })();
    !(function (e) {
        (e.Override = "override"), (e.Append = "append"), (e.Force = "force"), (e.Once = "once");
    })(j || (j = {}));
    var V,
        z,
        _,
        X,
        Y,
        Q,
        Z,
        $ = (function () {
            function e(e, t, n) {
                (this.beaconIndex = 0),
                    (this.sendingScheduled = !1),
                    (this.init = this.getInit(e, t)),
                    (this.sentTracking = Object.create(this.init)),
                    (this.unsentTracking = {}),
                    (this.customTimers = {}),
                    (this.shouldTrackPI = n),
                    (this.dataLayerHandler = new T()),
                    (this.leavePageHandler = new W()),
                    (this.gATrackingHandler = new J()),
                    (this.customDimensions = [
                        { name: "customPiDimensions", type: "PiDimension", dimensionData: {} },
                        { name: "customSessionDimensions", type: "SessionDimension", dimensionData: {} },
                    ]),
                    (this.onDOMInteractive = w),
                    (this.onLoad = h),
                    (this.onSpeedKitLoaded = b),
                    (this.onGaReady = this.gATrackingHandler.onGaReady.bind(this.gATrackingHandler)),
                    (this.onGaTracking = this.gATrackingHandler.onGaTracking.bind(this.gATrackingHandler)),
                    (this.onDataLayer = this.dataLayerHandler.onDataLayer.bind(this.dataLayerHandler)),
                    (this.onDataLayerReady = this.dataLayerHandler.onDataLayerReady.bind(this.dataLayerHandler)),
                    (this.onDfDataReady = H),
                    (this.onVisibilityHidden = M),
                    (this.onLeavePage = this.leavePageHandler.onLeavePage.bind(this.leavePageHandler)),
                    (this.pluginHandler = new G(this));
            }
            return (
                (e.prototype.initializePlugins = function () {
                    var e = this.getPlugins();
                    this.initCustomTimerData(e), this.initCustomDimensionData(e), e.forEach(this.pluginHandler.initPlugin, this.pluginHandler), this.leavePageHandler.init();
                }),
                (e.prototype.reinitialize = function (e, t) {
                    (this.init = this.getInit(e, t)), (this.sentTracking = Object.create(this.init)), (this.unsentTracking = {}), (this.beaconIndex = 0);
                    var n = !N().pageDisabled && "B" !== r.group;
                    this.shouldTrackPI = n;
                }),
                (e.prototype.reportEvent = function (e, t, n, r) {
                    if (!(void 0 === t || t < 0) && (this.reportTracking(e, t), void 0 !== r && n)) {
                        var i = r - t;
                        if (i < 0) return;
                        this.reportTracking(n, i);
                    }
                }),
                (e.prototype.sendCurrentTracking = function (e) {
                    if (!N().noTracking) {
                        var t = this.getUnsentTracking();
                        if (t) {
                            e && (t.unloadType = e);
                            var n = "";
                            0 === t.beaconIndex && (n = "?pi=1" + (this.shouldTrackPI ? "&bqpi=1" : "")), (this.shouldTrackPI = !1), y(r.appURL + "/rum/pi" + n, t);
                        }
                    }
                }),
                (e.prototype.updateBaseDimension = function (e, t) {
                    this.init[e] = t;
                }),
                (e.prototype.trackCustomEvent = function (e, t, n, r) {
                    void 0 === r && (r = !0);
                    var i = { action: "" + e, label: "" + t, value: isNaN(Number(n)) ? 0 : Number(n) };
                    this.reportTracking("events", i, j.Append), r && this.sendCollapsed();
                }),
                (e.prototype.set = function (e, t, n, r) {
                    var i;
                    void 0 === n && (n = !0), void 0 === r && (r = !1), (i = "boolean" == typeof r ? (r ? j.Force : j.Override) : r);
                    var o = this.reportTracking(e, t, i);
                    return n && this.sendCollapsed(), o;
                }),
                (e.prototype.setTiming = function (e, t, n, r) {
                    return void 0 === n && (n = !0), void 0 === r && (r = !1), "number" == typeof t ? this.set(e, t - this.init.navigationStart, n, r) : this.set(e, t, n, r);
                }),
                (e.prototype.append = function (e, t, n) {
                    void 0 === n && (n = !0), this.reportTracking(e, t, j.Append), n && this.sendCollapsed();
                }),
                (e.prototype.getBeaconIndex = function () {
                    return this.beaconIndex;
                }),
                (e.prototype.calculateRelative = function (e) {
                    if (void 0 !== e) return e - this.init.navigationStart;
                }),
                (e.prototype.reportTracking = function (e, t, n) {
                    if ((void 0 === n && (n = j.Override), null == t)) return !1;
                    var r = this.customDimensions.filter(function (t) {
                        return t.dimensionData.hasOwnProperty(e);
                    })[0];
                    if (r) return this.reportCustomDimension(e, t, r.type);
                    if (this.customTimers.hasOwnProperty(e)) return this.reportCustomTimer(e, t);
                    if (n === j.Append) {
                        var i = Array.isArray(t) ? t : [t],
                            o = void 0 !== this.unsentTracking[e] ? this.unsentTracking[e] : [],
                            a = Array.isArray(o) ? o : [o];
                        return (this.unsentTracking[e] = a.concat(i)), !0;
                    }
                    return !(!Array.isArray(t) && S(t, this.sentTracking[e]) && n !== j.Force) && (!this.sentTracking.hasOwnProperty(e) || n !== j.Once) && ((this.unsentTracking[e] = t), !0);
                }),
                (e.prototype.reportCustomDimension = function (e, t, n) {
                    var r = "string" == typeof t ? t : JSON.stringify(t),
                        i = this.customDimensions.filter(function (e) {
                            return e.type === n;
                        })[0];
                    if (!i) return !1;
                    if (i.dimensionData[e] && "null" !== i.dimensionData[e]) return !1;
                    i.dimensionData[e] = r;
                    var o = this.unsentTracking[i.name] || {};
                    return (o[e] = r), (this.unsentTracking[i.name] = o), !0;
                }),
                (e.prototype.reportCustomTimer = function (e, t) {
                    if ("number" != typeof t) return !1;
                    if (this.customTimers[e] && -1 !== this.customTimers[e]) return !1;
                    this.customTimers[e] = t;
                    var n = this.unsentTracking.customTimers || {};
                    return (n[e] = t), (this.unsentTracking.customTimers = n), !0;
                }),
                (e.prototype.getPlugins = function () {
                    return window.SpeedKit && window.SpeedKit.rumPlugins ? window.SpeedKit.rumPlugins : [];
                }),
                (e.prototype.initCustomDimensionData = function (e) {
                    var t = this;
                    e.forEach(function (e) {
                        e.key &&
                            (t.customDimensions.every(function (t) {
                                return t.type !== e.type;
                            }) ||
                                t.reportCustomDimension(e.key, "null", e.type));
                    });
                }),
                (e.prototype.initCustomTimerData = function (e) {
                    var t = this;
                    e.forEach(function (e) {
                        e.key && "CustomTimer" === e.type && (t.customTimers[e.key] = -1);
                    });
                }),
                (e.prototype.getUnsentTracking = function () {
                    if (0 === Object.keys(this.unsentTracking).length) return null;
                    var e = Object.create(null);
                    for (var t in this.init) Object.prototype.hasOwnProperty.call(this.init, t) && (e[t] = this.init[t]);
                    for (var t in ((e.beaconIndex = this.beaconIndex), this.unsentTracking)) Object.prototype.hasOwnProperty.call(this.unsentTracking, t) && ((e[t] = this.unsentTracking[t]), (this.sentTracking[t] = this.unsentTracking[t]));
                    return (this.unsentTracking = Object.create(null)), (this.beaconIndex += 1), e;
                }),
                (e.prototype.sendCollapsed = function () {
                    var e = this;
                    this.leavePageHandler.isUnloaded()
                        ? this.sendCurrentTracking()
                        : this.sendingScheduled ||
                          ((this.sendingScheduled = !0),
                          setTimeout(function () {
                              (e.sendingScheduled = !1), e.sendCurrentTracking();
                          }, 100));
                }),
                (e.prototype.getInit = function (e, t) {
                    return N().performanceOnly ? e : I(e, t);
                }),
                e
            );
        })();
    function ee(e) {
        return parseFloat((1 - e).toFixed(2));
    }
    function te() {
        var e = t.userAgent;
        return e.indexOf("Safari") > -1 && -1 === e.indexOf("Edge") && -1 === e.indexOf("Chrome");
    }
    function ne() {
        return !te() && "undefined" != typeof PerformanceNavigationTiming && !!performance.getEntriesByType;
    }
    function re() {
        var e = performance.navigation;
        if (!ne()) return ie(e.type);
        var t = performance.getEntriesByType("navigation");
        return t[0] && "toJSON" in t[0] ? Y[t[0].type] : ie(e.type);
    }
    function ie(e) {
        return "number" != typeof e ? Y[e] : e;
    }
    function oe() {
        return window.performance ? performance.timing.navigationStart || Math.trunc(performance.timeOrigin) : 0;
    }
    function ae(e) {
        var t = (function () {
                var e = window.performance.timing;
                if (!ne()) return e;
                var t = performance.getEntriesByType("navigation");
                if (t[0] && "toJSON" in t[0]) return t[0].toJSON();
                return e;
            })(),
            n = window.performance.timing,
            r = "entryType" in t,
            i = {};
        for (var o in t)
            if ("number" == typeof t[o]) {
                var a = 0 !== t[o],
                    s = n && ("number" != typeof n[o] || 0 !== n[o]);
                a || s ? (r ? (i[o] = Math.trunc(t[o])) : t[o] >= e && (i[o] = t[o] - e)) : (i[o] = -1);
            } else i[o] = t[o];
        return (i.navigationStart = e), (i.domLoading = n.domLoading - e), (i.ttfb = r ? i.responseStart : n.domLoading - e), i;
    }
    function se(e, t) {
        var n, i, o;
        e.controllingServiceWorker && t.set("controllingSw", e.controllingServiceWorker, !1),
            e.lastNavigate.applicationState && t.set("applicationState", e.lastNavigate.applicationState, !1),
            e.lastNavigate.responseCause !== V.Unknown && t.set("responseCause", e.lastNavigate.responseCause, !1) && t.set("responseSource", e.lastNavigate.responseSource, !1, !0),
            e.lastNavigate.disconnectCause !== X.None && e.lastNavigate.disconnectCause !== X.DashboardDisabled && t.set("disconnectCause", e.lastNavigate.disconnectCause, !1),
            "number" == typeof e.split && t.set("split", ((n = e.group), (i = e.split), (o = "A" === n && "number" == typeof r.secondarySplit ? ("B" === r.secondaryGroup ? ee(r.secondarySplit) : r.secondarySplit) : 1), i * o), !1),
            "complete" === e.readyState && e.lastNavigate.splitTestId !== e.splitTestId && t.set("actualTestId", "" + e.lastNavigate.splitTestId, !1),
            "complete" === e.readyState && e.lastNavigate.group !== e.group && t.set("actualTestGroup", "" + e.lastNavigate.group, !1);
    }
    function ce(n, i) {
        var o,
            a = n.rumController,
            s = !!r.secondaryGroup,
            c = n.lastNavigate.responseCause === V.BfCache,
            u = s ? n.splitTestId + "-" + r.secondaryTestId : n.splitTestId,
            d = (function () {
                if (N().stripAllParameter) return location.href.replace(/\?.*/, "?redacted");
                if (N().stripParameters) {
                    var e = new URL(location.href);
                    return (
                        N().stripParameters.forEach(function (t, n) {
                            var r = new URL(location.href).searchParams.get(t) || "",
                                i = r.length ? t + "=" + r : t;
                            e.search = e.search.replace(new RegExp("(\\?|&)" + i), "$1redacted-" + n);
                        }),
                        e.href
                    );
                }
                return location.href;
            })();
        s && a.updateBaseDimension("testGroup", r.group + "-" + r.secondaryGroup);
        var p = N().performanceOnly ? 0 : n.sessionIndex;
        a.set("sessionIndex", p, !1);
        var l = oe();
        a.reportEvent("snippetExecution", n.executionTime - l),
            a.set("url", d, !1, j.Once),
            a.set("userAgent", t.userAgent, !1),
            a.set("referrer", e.referrer, !1),
            a.set("testId", u || "None", !1),
            a.set("responseSource", n.lastNavigate.responseSource, !1),
            a.set("assetTTFB", n.lastNavigate.assetTTFB, !1),
            a.set("originTTFB", n.lastNavigate.originTTFB, !1),
            a.set("assetSource", n.lastNavigate.assetSource, !1),
            a.set("assetCause", n.lastNavigate.assetCause, !1),
            a.set("firstLoad", n.lastNavigate.firstLoad, !1),
            a.set("disabled", n.disabled, !1),
            a.set("swSupported", n.swSupported, !1),
            a.set("skSupported", n.skSupported, !1),
            a.set(
                "redirectList",
                null === (o = n.lastNavigate.redirectList) || void 0 === o
                    ? void 0
                    : o.map(function (e) {
                          return e.url;
                      }),
                !1,
                j.Once
            ),
            a.set("screenResolution", n.screenResolution, !1, j.Once),
            se(n, a),
            void 0 === typeof window.performance ||
                c ||
                ((function (e) {
                    var t = oe(),
                        n = ae(t);
                    e.set("navigationStart", t, !1),
                        e.set("secureConnectDuration", n.secureConnectionStart >= 0 && n.connectEnd >= 0 ? n.connectEnd - n.secureConnectionStart : -1, !1),
                        e.reportEvent("unload", n.unloadEventStart, "unloadDuration", n.unloadEventEnd),
                        e.reportEvent("domainLookup", n.domainLookupStart, "domainLookupDuration", n.domainLookupEnd),
                        e.reportEvent("connect", n.connectStart, "connectDuration", n.connectEnd),
                        e.reportEvent("redirect", n.redirectStart, "redirectDuration", n.redirectEnd),
                        e.reportEvent("response", n.responseStart, "responseDuration", n.responseEnd),
                        e.reportEvent("load", n.loadEventStart, "loadDuration", n.loadEventEnd),
                        e.reportEvent("domContentLoaded", n.domContentLoadedEventStart, "domContentLoadedDuration", n.domContentLoadedEventEnd),
                        e.reportEvent("request", n.requestStart),
                        e.reportEvent("fetch", n.fetchStart),
                        e.reportEvent("ttfb", n.ttfb),
                        e.reportEvent("domComplete", n.domComplete),
                        e.reportEvent("domInteractive", n.domInteractive),
                        e.reportEvent("workerStart", n.workerStart);
                })(a),
                (function (e) {
                    var t = re();
                    void 0 !== t && e.set("navigationType", t, !1);
                })(a),
                (function (e) {
                    if ("undefined" != typeof PerformancePaintTiming && window.performance.getEntriesByType) {
                        var t = performance.getEntriesByType("paint");
                        if (t && t.length) {
                            var n = t.find(function (e) {
                                    return "first-paint" === e.name;
                                }),
                                r = t.find(function (e) {
                                    return "first-contentful-paint" === e.name;
                                });
                            e.set("firstPaint", n ? Math.round(n.startTime) : -1, !1), e.set("firstContentfulPaint", r ? Math.round(r.startTime) : -1, !1);
                        }
                    } else if (void 0 !== window.performance) {
                        var i = performance.timing.msFirstPaint;
                        i && (e.setTiming("firstPaint", i, !1), e.setTiming("firstContentfulPaint", i, !1));
                    }
                })(a)),
            c ||
                ((function (e, t) {
                    e.lastNavigate.cdnBackendTime && t.set("cdnBackendTime", e.lastNavigate.cdnBackendTime, !1), e.lastNavigate.cdnPoP && t.set("cdnPop", "" + e.lastNavigate.cdnPoP, !1);
                })(n, a),
                (function (e, t) {
                    var n = e.lastNavigate ? e.lastNavigate.timings : null;
                    n &&
                        (t.setTiming("speedKitFetchEvent", n.eventStart, !1),
                        t.setTiming("speedKitHandle", n.handleStart, !1),
                        t.setTiming("speedKitBlacklistHandler", n.blacklistHandler, !1),
                        t.setTiming("speedKitDisabledPageHandler", n.disabledPageHandler, !1),
                        void 0 !== n.handleStart && void 0 !== n.handleEnd && t.set("speedKitHandleDuration", n.handleEnd - n.handleStart, !1),
                        void 0 !== n.cacheStart && void 0 !== n.cacheEnd && t.reportEvent("speedKitCacheLookup", n.cacheStart - n.handleStart, "speedKitCacheLookupDuration", n.cacheEnd - n.handleStart),
                        void 0 !== n.fetchStart && void 0 !== n.fetchEnd && t.reportEvent("speedKitFetchCall", n.fetchStart - n.handleStart, "speedKitFetchCallDuration", n.fetchEnd - n.handleStart));
                })(n, a)),
            i ? a.sendCurrentTracking(i) : a.sendCollapsed();
    }
    function ue() {
        return !!e.querySelector(".speed-kit-dynamic-loading,.speed-kit-dynamic-loaded");
    }
    function de(e) {
        var t,
            n = !1,
            r = !1,
            i = !1,
            o = function () {
                n && r && i && ce(e);
            };
        h(function () {
            setTimeout(function () {
                (n = !0), o();
            });
        }),
            (function (e, t) {
                "complete" !== e.readyState ? window.addEventListener("speed-kit-completed", t, { once: !0 }) : t();
            })(e, function () {
                (r = !0), o();
            }),
            (t = function () {
                (i = !0), o();
            }),
            ("undefined" != typeof PerformancePaintTiming && window.performance.getEntriesByType && performance.getEntriesByType("paint").length > 0) ||
            "undefined" == typeof PerformanceObserver ||
            "undefined" == typeof PerformancePaintTiming
                ? t()
                : new PerformanceObserver(t).observe({ entryTypes: ["paint"] }),
            window.addEventListener("pageshow", function (e) {
                if (e.persisted) {
                    var t = E(),
                        n = t[0],
                        r = t[1];
                    (SpeedKit.navigateId = "" + k(32)),
                        (SpeedKit.lastNavigate.responseCause = V.BfCache),
                        (SpeedKit.lastNavigate.responseSource = ue() ? Q.AssetAPI : Q.Origin),
                        (SpeedKit.sessionIndex = r),
                        (SpeedKit.executionTime = Date.now());
                    var i = performance.timing.navigationStart || performance.timeOrigin,
                        o = { sessionId: n, userId: SpeedKit.userId },
                        a = { navigationStart: i, testGroup: SpeedKit.group, piId: SpeedKit.navigateId };
                    SpeedKit.rumController.reinitialize(a, o), ce(SpeedKit);
                }
            });
    }
    function pe(t) {
        "complete" !== t.readyState &&
            setTimeout(function () {
                var n, r, i, o;
                (t.readyState = "complete"),
                    (n = "speed-kit-completed"),
                    (r = window),
                    void 0 === i && (i = {}),
                    "function" == typeof CustomEvent ? (o = new CustomEvent(n, { detail: i })) : (o = e.createEvent("CustomEvent")).initCustomEvent(n, !0, !0, i),
                    r.dispatchEvent(o);
            });
    }
    function le(e, t, n, r) {
        void 0 === r && (r = 1e3);
        var i = !1;
        return (
            n &&
                setTimeout(function () {
                    return i ? null : n();
                }, r),
            new Promise(function (n, r) {
                var o = new MessageChannel(),
                    a = o.port1,
                    s = o.port2;
                (a.onmessage = function (e) {
                    (i = !0), n(e.data);
                }),
                    (a.onmessageerror = function (e) {
                        return r(e.data);
                    }),
                    e.postMessage(t, [s]);
            })
        );
    }
    function fe(e, t) {
        le(e, { type: "get-navigate-info", clientURL: location.href }, function () {
            (t.lastNavigate.responseSource = ue() ? Q.AssetAPI : Q.Origin), (t.lastNavigate.responseCause = V.NoSwResponse), pe(t);
        })
            .catch(function (e) {
                return K(e, O.SNIPPET), null;
            })
            .then(function (e) {
                !(function (e, t) {
                    if (!t || "wasCacheHit" in t) return;
                    if ("reason" in t) return (e.lastNavigate.applicationState = t.applicationState), (e.lastNavigate.errorMessage = t.reason), void (t.applicationState === Z.FAILED && (e.lastNavigate.responseCause = V.SwFailed));
                    t.firstLoad = e.lastNavigate.firstLoad;
                    var n = t.responseSource === Q.Origin;
                    t.assetSource || t.assetCause || t.assetTTFB || ((t.assetSource = e.lastNavigate.assetSource), (t.assetCause = e.lastNavigate.assetCause), (t.assetTTFB = e.lastNavigate.assetTTFB));
                    t.originTTFB || (t.originTTFB = e.lastNavigate.originTTFB);
                    (e.lastNavigate = t),
                        (e.lastNavigate.applicationState = t.applicationState),
                        (e.lastNavigate.responseCause = t.responseCause),
                        (e.lastNavigate.responseSource = n && ue() ? Q.SDN : t.responseSource),
                        (e.lastNavigate.originStatus = t.originStatus),
                        (e.lastNavigate.disconnectCause = t.disconnectCause),
                        (e.lastNavigate.assetTTFB = t.assetTTFB);
                })(t, e),
                    pe(t);
            });
    }
    function ge(e) {
        return fetch(r.appURL + "/config/VAPIDPublicKey")
            .then(function (e) {
                return e.arrayBuffer();
            })
            .then(function (e) {
                return { applicationServerKey: e, userVisibleOnly: !0 };
            })
            .then(function (t) {
                return e.subscribe(t);
            })
            .then(function (e) {
                var t = { subscription: e, devicetype: "WebPush" };
                return fetch(r.appURL + "/db/Device/register", { method: "POST", credentials: "include", body: JSON.stringify(t), headers: { "Content-Type": "application/json" } });
            })
            .then(
                function (e) {
                    return 200 === e.status;
                },
                function () {
                    return !1;
                }
            );
    }
    function ve() {
        return "Notification" in window
            ? Notification.requestPermission().then(function (e) {
                  return "denied" === e
                      ? "denied"
                      : "granted" !== e
                      ? "undecided"
                      : t[n].ready
                            .then(function (e) {
                                var t = e.pushManager;
                                return (function (e) {
                                    return e.getSubscription().then(function (e) {
                                        return !!e;
                                    });
                                })(t).then(function (e) {
                                    return !!e || ge(t);
                                });
                            })
                            .then(function (e) {
                                return e ? "registered" : "unregistered";
                            });
              })
            : Promise.resolve("unsupported");
    }
    function he(e) {
        var r = t[n];
        if (r)
            return r.ready.then(function (t) {
                var n;
                if (t.active && "activated" === t.active.state) return t.active.postMessage(e);
                null === (n = t.active) ||
                    void 0 === n ||
                    n.addEventListener("statechange", function () {
                        var n;
                        "activated" === (null === (n = t.active) || void 0 === n ? void 0 : n.state) && t.active.postMessage(e);
                    });
            });
    }
    function me(e) {
        return e ? new URL(e, location.origin).pathname : e;
    }
    function ye(e) {
        var n;
        null === (n = he({ type: "update-device", data: e })) ||
            void 0 === n ||
            n.catch(function (e) {
                return K(e, O.SNIPPET);
            });
        try {
            !(function (e) {
                var n = me(r.scope),
                    i = t.userAgent,
                    o = new v(n);
                o.set("/com.baqend.speedkit.device", { device: e, userAgent: i })
                    .catch(function (e) {
                        return K(e, O.SNIPPET);
                    })
                    .finally(function () {
                        return o.disconnect().catch(function (e) {
                            return K(e, O.SNIPPET);
                        });
                    });
            })(e);
        } catch (i) {
            K(i, O.SNIPPET);
        }
    }
    function Se(e) {
        var r = t[n].controller;
        r && r.postMessage({ type: "bypass-deactivation", data: e });
    }
    function we() {
        var e = t[n];
        e && e.controller && e.controller.postMessage({ type: "connect" });
    }
    function be() {
        var e = t[n];
        e && e.controller && e.controller.postMessage({ type: "disconnect" });
    }
    function Te() {
        var e = P("baqend-speedkit-hashing-salt");
        if (e) return e;
        var t = (function () {
            for (var e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", t = "", n = 0; n < 32; n += 1) t += e.charAt(Math.floor(Math.random() * e.length));
            return t;
        })();
        return D("baqend-speedkit-hashing-salt", t), t;
    }
    function ke(e) {
        return (function (e, t) {
            for (var n = "", r = 0; r < e.length; r += 1) {
                var i = r % t.length;
                n += (e.charCodeAt(r) ^ t.charCodeAt(i)).toString(32);
            }
            return n;
        })(e, Te());
    }
    function Ie(e) {
        var r = t[n].controller;
        r && r.postMessage({ type: "offline", data: e });
    }
    function Ce() {
        var e = t[n].controller;
        e && e.postMessage({ type: "fetch-bloom-filter", data: !0 });
    }
    function Ne() {
        return r.disabled || !1 === r.enabled;
    }
    function Pe(e) {
        return e === V.SkUnsupported;
    }
    function Ee(t) {
        var n;
        null === (n = he({ event: t, type: "send-cookies", data: e.cookie })) ||
            void 0 === n ||
            n.catch(function (e) {
                return K(e, O.SNIPPET);
            });
    }
    function De(e, r, i) {
        return (
            !!t[n] &&
            !!t[n].getRegistrations &&
            (function (e, t, n) {
                return "Safari" === e ? 15 !== t || n >= 2 : "Chrome" === e ? t >= 61 : "Firefox" !== e || 59 !== t;
            })(e, r, i)
        );
    }
    function Oe() {
        return t.userAgent.toLowerCase().indexOf("wv)") > -1;
    }
    function Le(e) {
        var n = e.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)\.?(\d+)?/i) || [],
            r = null;
        if (/trident/i.test(n[1])) return (r = /\brv[ :]+(\d+)\.?(\d+)?/g.exec(e) || []), ["IE", parseInt(r[1], 10) || 0, parseInt(r[2], 10) || 0];
        var i =
            (function (e) {
                if (/(iPhone|iPod|iPad).*AppleWebKit(?!.*Version)/.test(e)) {
                    var t = e.match(/(OS |os |OS)(\d+)_?(\d+)?/i) || [];
                    return ["SafariWebView", parseInt(t[2], 10) || 0, parseInt(t[3], 10) || 0];
                }
                return null;
            })(e) ||
            (function (e, t) {
                if ("Chrome" === t[1]) {
                    var n = null;
                    if (null != (n = e.match(/\bEdg\/(\d+)\.?(\d+)?/) || e.match(/\bEdge\/(\d+)\.?(\d+)?/))) return ["Edge", parseInt(n[1], 10), parseInt(n[2], 10) || 0];
                    if (null != (n = e.match(/\bOPR\/(\d+)\.?(\d+)?/))) return ["Opera", parseInt(n[1], 10), parseInt(n[2], 10) || 0];
                }
                return null;
            })(e, n);
        if (null !== i) return i;
        var o = n[2] ? [n[1], parseInt(n[2], 10), parseInt(n[3], 10) || 0] : [t.appName, parseInt(t.appVersion, 10), 0];
        return -1 === e.indexOf("Android") && null != (r = e.match(/version\/(\d+)\.?(\d+)?/i)) && (o.splice(1, 1, parseInt(r[1], 10)), o.splice(2, 1, parseInt(r[2], 10) || 0)), o;
    }
    function Re() {
        var e = Le(t.userAgent);
        return "SafariWebView" === e[0] && e[1] >= 14;
    }
    function Ae() {
        return t.userAgent.indexOf("Edge") >= 0;
    }
    function Be(e, t, n, i) {
        void 0 === i && (i = !1);
        var o = !r.enableForWebViews && (Oe() || Re());
        return De(e, t, n) && !i && !o && !Ae();
    }
    function Fe(e, t) {
        var n,
            i,
            o = r.group,
            a = window.SpeedKit || {},
            s = a.navigateId || "" + k(32),
            c = oe(),
            u = t.userId,
            d = t.sessionId,
            p = t.sessionIndex,
            l = e.browser,
            f = e.browserVersion,
            g = e.minorVersion,
            v = { navigationStart: c, testGroup: o, piId: s },
            h = { userId: u, sessionId: d },
            m = ((n = e.responseCause), (i = !N().pageDisabled), (Ne() || Pe(n)) && i && "B" !== r.group),
            y = new $(v, h, m),
            S = y.trackCustomEvent.bind(y),
            w = {
                navigateId: s,
                userId: u,
                sessionId: d,
                sessionIndex: p,
                group: o,
                rumController: y,
                track: S,
                subscribe: ve,
                bypassDeactivation: Se,
                activate: we,
                deactivate: be,
                split: "number" == typeof r.split ? ("B" === r.group ? ee(r.split) : r.split) : 1,
                updateDevice: ye,
                getHash: ke,
                simulateOfflineMode: Ie,
                fetchBloomFilter: Ce,
                updateCookies: Ee,
                disabled: !1,
                lastNavigate: e,
                readyState: "loading",
                splitTestId: r.splitTestId,
                controllingServiceWorker: xe(),
                executionTime: Date.now(),
                swSupported: De(l, f, g),
                skSupported: Be(l, f, g),
                screenResolution: { width: window.screen.width * window.devicePixelRatio, height: window.screen.height * window.devicePixelRatio },
            };
        return (
            Object.keys(a).forEach(function (e) {
                w[e] = a[e];
            }),
            (window.SpeedKit = w),
            y.initializePlugins(),
            window.SpeedKit
        );
    }
    function xe() {
        return t.serviceWorker && t.serviceWorker.controller ? t.serviceWorker.controller.scriptURL : null;
    }
    function Ke(t) {
        if ("undefined" != typeof Storage)
            try {
                localStorage.removeItem(t);
            } catch (n) {}
        try {
            e.cookie = t + "=; expires=" + new Date().toUTCString() + "; path=/; SameSite=lax; Secure";
        } catch (n) {}
    }
    function Ue(e, t) {
        if (t) return !0;
        var n = e.group,
            r = e.testId;
        return !(!r || -1 === r.indexOf("-debug")) || "A" !== n;
    }
    function qe(e, t) {
        var n = (function (e, t) {
                var n = "baqend-speedkit-secondary-config" === t,
                    i = (function (e, t) {
                        var n = "undefined" !== e.testId,
                            i = "undefined" !== e.group,
                            o = t ? r.secondaryTestId : r.splitTestId,
                            a = n && ((s = e.testId), (c = o), (null == s ? void 0 : s.replace("-debug", "")) !== (null == c ? void 0 : c.replace("-debug", "")));
                        var s, c;
                        if (i && !a) return e.group;
                        var u = t ? r.secondaryGroup : r.group,
                            d = t ? r.secondarySplit : r.split;
                        return (function (e, t) {
                            if (void 0 === e) return Math.random() < t ? "A" : "B";
                            return e;
                        })(u, d);
                    })(e, n),
                    o = n ? r.secondaryTestId : r.splitTestId;
                o &&
                    (o = (function (e) {
                        if ("true" !== P("baqend-speedkit-debug")) return e.replace("-debug", "");
                        if (e.indexOf("-debug") > -1) return e;
                        return e + "-debug";
                    })(o));
                return { group: i, testId: o };
            })(e, t),
            i = "baqend-speedkit-secondary-config" === t;
        return (
            i ? ((r.secondaryGroup = n.group), (r.secondaryTestId = n.testId)) : ((r.group = n.group), (r.splitTestId = n.testId)),
            Ue(n, i ? r.secondarySplit < 1 : r.split < 1)
                ? ((function (e, t, n) {
                      (r = n), (i = encodeURIComponent(JSON.stringify(e))), (o = encodeURIComponent(JSON.stringify(t))), o !== i && o && A(r, o);
                      var r, i, o;
                  })(e, n, t),
                  !0)
                : (Ke(t), !1)
        );
    }
    function Ge(e, i, o, a) {
        var s = window.location.href,
            c = Le(t.userAgent),
            u = c[0],
            d = c[1],
            p = c[2],
            l = (function (e, i, o, a, s, c) {
                var u = Be(e, i, o, a),
                    d = "B" === r.group || "B" === r.secondaryGroup;
                return u
                    ? !d && Ne()
                        ? [Q.Origin, V.Disabled]
                        : !s || (!r.sdnSetup && ue())
                        ? !d && c
                            ? [Q.Origin, V.GroupChange]
                            : t[n].controller
                            ? [ue() ? Q.AssetAPI : Q.Origin, V.Unknown]
                            : [Q.Origin, d ? V.NonSKGroup : V.NoSwInstalled]
                        : [Q.Origin, V.FirstLoad]
                    : [Q.Origin, V.SkUnsupported];
            })(u, d, p, e, i, "B" === o.group || "B" === a.group),
            f = l[0];
        return {
            url: s,
            browser: u,
            firstLoad: i,
            browserVersion: d,
            minorVersion: p,
            responseCause: l[1],
            responseSource: f,
            cdnBackendTime: null,
            cdnPoP: null,
            splitTestId: o.testId,
            group: void 0 !== r.split ? o.group : r.group,
            disconnectCause: X.None,
        };
    }
    function Me(e, t, n) {
        return e.put(
            "" + t,
            new Response(null, {
                status: 200,
                statusText:
                    ((r = n),
                    JSON.stringify(r, function (e, t) {
                        return t instanceof RegExp ? "regexp:/" + (n = t).source + "/" + (n.flags || "") : t;
                        var n;
                    })),
            })
        );
        var r;
    }
    function He() {
        var e = new URL(r.sw || "/sw.js", location.origin);
        return e.origin + e.pathname;
    }
    function je(i) {
        var o = (function (e) {
            var t = e;
            if (r.includeServiceWorker) {
                var n = e.indexOf("?") >= 0 ? "&" : "?";
                t += n + "othersw=" + r.includeServiceWorker;
            }
            return t;
        })(r.sw);
        return t[n].register(o, { scope: r.scope || "/" }).then(function (t) {
            var n;
            (n = !1),
                e.addEventListener("visibilitychange", function () {
                    "hidden" === e.visibilityState ? n || ((n = !0), Ee("visibilitychange")) : (n = !1);
                }),
                window.addEventListener("pagehide", function () {
                    n || ((n = !0), Ee("pagehide"));
                });
            var o = He(),
                a = i.controllingServiceWorker;
            (!a || (null == o ? void 0 : o.split("?")[0]) !== a.split("?")[0]) &&
                (function (t) {
                    h(function () {
                        window.setTimeout(function () {
                            if (t.active && "undefined" != typeof PerformanceResourceTiming) {
                                var n,
                                    i = ((n = ae(oe()).domContentLoadedEventEnd),
                                    window.performance.getEntriesByType
                                        ? performance.getEntriesByType("resource").filter(function (e) {
                                              if (n > 0 && e.startTime + e.duration > n) return !1;
                                              var t;
                                              try {
                                                  t = new URL(e.name);
                                              } catch (r) {
                                                  return !1;
                                              }
                                              return (null == t ? void 0 : t.origin) !== window.location.origin;
                                          })
                                        : []).map(function (e) {
                                        var t = e.name;
                                        return { initiatorType: e.initiatorType, url: t };
                                    });
                                le(t.active, { type: "prewarm-fetch", data: i }).then(function (n) {
                                    if (n.applicationState === Z.FAILED)
                                        return (function (t) {
                                            return window.caches
                                                ? caches
                                                      .open(g(s, r.scope))
                                                      .then(function (t) {
                                                          var n = window.devicePixelRatio,
                                                              i = window.screen.width,
                                                              o = [[location.origin, e.cookie]];
                                                          return Promise.all([Me(t, "/com.baqend.speedkit.screen", { dpr: n, width: i }), Me(t, "/com.baqend.speedkit.config", r), Me(t, "/com.baqend.speedkit.cookie", { origins: o })]);
                                                      })
                                                      .then(function () {
                                                          return t.postMessage({ type: "init-cache" });
                                                      })
                                                : Promise.resolve();
                                        })(t.active);
                                });
                            }
                        }, 1e3);
                    });
                })(t),
                (function (e) {
                    e.navigationPreload &&
                        (function (e) {
                            if (e.active) return Promise.resolve(e.active);
                            var t = e.waiting || e.installing;
                            return new Promise(function (e) {
                                return (t.onstatechange = function () {
                                    "activated" === t.state && e(t);
                                });
                            });
                        })(e)
                            .then(function () {
                                r.navigationPreload ? e.navigationPreload.enable() : e.navigationPreload.disable();
                            })
                            .catch(function (e) {
                                return K(e, O.SNIPPET);
                            });
                })(t);
        });
    }
    function We(e) {
        var t = B(e),
            n = "baqend-speedkit-secondary-config" === e,
            i = n ? r.secondarySplit : r.split,
            o = n ? s + "-secondary-ab-test-info" : s + "-ab-test-info";
        if (t) return Je(t);
        var a = { group: "undefined", testId: "undefined" },
            c = B(o);
        c && ((a = Je(c)), Ke(o), Ue(a, null != i && i < 1) && A(e, encodeURIComponent(JSON.stringify(a))));
        return a;
    }
    function Je(e) {
        try {
            return JSON.parse(decodeURIComponent(e));
        } catch (t) {
            return { group: "undefined", testId: "undefined" };
        }
    }
    function Ve() {
        var e,
            t,
            n = JSON.parse(P("baqend-speedkit-rum-split-enabled") || "{}"),
            i = !n.sessionId,
            o = n.sessionId === B(u);
        return {
            rumSplitEnabled:
                n && n.sessionId
                    ? !1 !== n.split
                    : ((t = Math.random() < (null !== (e = r.sampleRate) && void 0 !== e ? e : 1)), r.sampleRate && D("baqend-speedkit-rum-split-enabled", JSON.stringify({ split: t, sessionId: B("baqend-speedkit-session-id") })), t),
            isActiveSession: i || o,
        };
    }
    function ze() {
        if (!(!R() && "1" !== P("baqend-speedkit-rum-opt-out") && !window.deactivateSpeedKitRUM)) return !1;
        var t = r.rumTracking;
        if (!t) return !1;
        if (void 0 === r.sampleRate)
            return (
                (function (t) {
                    if (((e.cookie = t + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Lax; Secure"), "undefined" != typeof Storage))
                        try {
                            localStorage.removeItem(t);
                        } catch (n) {}
                })("baqend-speedkit-rum-split-enabled"),
                t
            );
        var n = Ve(),
            i = n.rumSplitEnabled,
            o = n.isActiveSession;
        return !(!i || !o) && t;
    }
    function _e() {
        var e,
            t = window.SpeedKit || {},
            n = t.userId,
            r = t.sessionId,
            i = t.sessionIndex,
            o = N(),
            a = !o.noTracking && !o.performanceOnly;
        return (
            t.sessionId || ((r = (e = a ? E() : ["", 0])[0]), (i = e[1])),
            t.userId || (n = a ? F() : ""),
            {
                userInfo: { userId: n, sessionId: r, sessionIndex: i },
                persisted: (function (e, t, n) {
                    var r = N();
                    if (r.noTracking || r.performanceOnly) return !1;
                    return A(c, e), A(u, t), A(d, "" + n), A(p, Date.now().toString()), !0;
                })(n, r, i),
            }
        );
    }
    function Xe(t) {
        for (
            var n = 0,
                r = e.cookie
                    .replace(/\s/g, "")
                    .split(";")
                    .filter(function (e) {
                        return 0 === e.lastIndexOf(t, 0);
                    });
            n < r.length;
            n++
        ) {
            var i = r[n],
                o = i.indexOf("="),
                a = o > -1 ? i.substr(0, o) : i;
            e.cookie = a + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Lax; Secure";
        }
    }
    function Ye(e, t) {
        if (e)
            return (
                (function (e, t) {
                    if ("undefined" != typeof Storage)
                        try {
                            for (var n in localStorage) n.includes(e) && !(null == t ? void 0 : t.includes(n)) && localStorage.removeItem(n);
                        } catch (r) {}
                })(s, ["baqend-speedkit-sk-opt-out"]),
                void Xe(s)
            );
        t.noCookies && Xe(s),
            (!t.noTracking && !t.performanceOnly) ||
                r.sampleRate ||
                [c, u, d, p].forEach(function (e) {
                    return Ke(e);
                });
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
    })(V || (V = {})),
        (function (e) {
            (e.CacheMiss = "CacheMiss"),
                (e.ExpiredResponse = "ExpiredResponse"),
                (e.InstantRefresh = "InstantRefresh"),
                (e.InvalidCacheSketch = "InvalidCacheSketch"),
                (e.ReloadCacheMode = "ReloadCacheMode"),
                (e.UrlInCacheSketch = "UrlInCacheSketch");
        })(z || (z = {})),
        (function (e) {
            (e.CacheHit = "CacheHit"), (e.RevalidationWhitelist = "RevalidationWhitelist");
        })(_ || (_ = {})),
        (function (e) {
            (e.SWException = "SWException"), (e.BloomfilterException = "BloomfilterException"), (e.DashboardDisabled = "DashboardDisabled"), (e.ServerError = "ServerError"), (e.None = "None"), (e.AssetTimeout = "AssetTimeout");
        })(X || (X = {})),
        (function (e) {
            (e[(e.navigate = 0)] = "navigate"), (e[(e.reload = 1)] = "reload"), (e[(e.back_forward = 2)] = "back_forward"), (e[(e.prerender = 3)] = "prerender"), (e[(e.reserved = 255)] = "reserved");
        })(Y || (Y = {})),
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
        })(Q || (Q = {})),
        (function (e) {
            (e.INSTALLING = "installing"), (e.BOOTING = "booting"), (e.RUNNING = "running"), (e.FAILED = "failed");
        })(Z || (Z = {}));
    try {
        !(function () {
            if (window[i]) return;
            window[i] = !0;
            var o = window.location.href.match(/speed-kit-rum-opt-out=([01])/);
            o && D("baqend-speedkit-rum-opt-out", o[1]);
            var a = R();
            a && (r.rumTracking = !1);
            var s =
                    (function () {
                        var e = { group: "", testId: r.splitTestId };
                        if ((window.location.href.indexOf("disableSpeedKit=1") >= 0 ? (e.group = "B") : window.location.href.indexOf("enableSpeedKit=1") >= 0 && (e.group = "A"), e.group))
                            return A("baqend-speedkit-config", encodeURIComponent(JSON.stringify(e))), e;
                    })() || We("baqend-speedkit-config"),
                u = We("baqend-speedkit-secondary-config"),
                d = (function (e, t, n) {
                    var i = !1;
                    if (n) return (r.group = "optOut"), i;
                    if (null == r.split) {
                        var o = "undefined" === e.testId && "undefined" !== e.group;
                        r.group = o ? e.group : "A";
                    } else i = qe(e, "baqend-speedkit-config");
                    "true" === B("baqend-speedkit-debug") && (r.secondarySplit = null);
                    if (null != r.secondarySplit && "A" === r.group) {
                        var a = qe(t, "baqend-speedkit-secondary-config");
                        i = i || a;
                    }
                    return i;
                })(s, u, a),
                p = null === B(c),
                l = _e(),
                f = l.userInfo,
                g = l.persisted,
                v = (function (e, t) {
                    var n = null === B(c) && null === B("baqend-speedkit-config") && null === B("baqend-speedkit-secondary-config");
                    if (!n) return !1;
                    if (n && e) return !0;
                    if (t) return !1;
                    return A(c, "testDenied"), (n = null === B(c)), Ke(c), n;
                })(d && g, a);
            !(function (e) {
                (r.sw = r.sw || "/sw.js"), null != r.split && r.group && (r.sw = ((n = r.sw), (i = "gr"), (o = r.group), (a = n.indexOf("?") > -1 ? "&" : "?"), "" + n + a + i + "=" + o));
                var n, i, o, a;
                r.rumTracking = ze();
                var s = !r.enableForWebViews && (Oe() || Re());
                (r.disabled = !1 === r.enabled || r.disabled || "B" === r.group || "B" === r.secondaryGroup || s || Ae() || e),
                    (r.appURL = "https://" + (r.appDomain || "{}.app.baqend.com".replace("{}", r.appName)) + "/v1"),
                    r.customVariation &&
                        r.customVariation.forEach(function (e) {
                            e.variationFunction = "function" == typeof e.variationFunction ? e.variationFunction.toString() : e.variationFunction;
                        });
                r.image &&
                    Array.isArray(r.image) &&
                    r.image.forEach(function (e) {
                        var t;
                        e.imageFunction = "function" == typeof e.imageFunction ? (null === (t = e.imageFunction) || void 0 === t ? void 0 : t.toString()) : e.imageFunction;
                    });
                if ("function" == typeof r.customDevice) {
                    var c = r.customDevice.call(null);
                    (r.customDevice = "string" == typeof c ? c : null),
                        Promise.resolve(c)
                            .then(function (e) {
                                e && ye(e);
                            })
                            .catch(function (e) {
                                K(e, O.CONFIG);
                            });
                } else r.customDevice && ye(r.customDevice);
                t.userAgent.indexOf("Firefox/") >= 0 && (r.navigationPreload = !1);
            })(a);
            var m = (function (e, i) {
                    var o = Fe(e, i);
                    (o.disabled = "B" !== r.group && "B" !== r.secondaryGroup && !!Ne()), (t[n] && t[n].controller) || !ue() || (o.lastNavigate.responseSource = Q.SDN);
                    return o;
                })(Ge(v, p, s, u), f),
                y = N();
            Ye(a, y),
                y.noTracking ||
                    v ||
                    (function (e) {
                        ce(e), de(e);
                    })(m);
            if (Pe(m.lastNavigate.responseCause) || ((S = window.top !== window), "https:" !== location.protocol || (!r.executeInIframe && S))) return void pe(m);
            var S;
            var w = t[n].controller;
            w
                ? (function (i, o, a) {
                      var s = He();
                      if (
                          a.scriptURL &&
                          !(function (e, t) {
                              var n = t.scriptURL;
                              if (!n) return !1;
                              if (e === n.split("?")[0]) return !0;
                              var r = new URL(n).searchParams.get("othersw");
                              return !!r && e === r.split("?")[0];
                          })(s, a)
                      )
                          return (
                              (function (e, t) {
                                  return "B" === r.group || "B" === r.secondaryGroup || "B" === e.lastNavigate.group || !!Ne() || t;
                              })(i, o) || (i.lastNavigate.responseCause = V.OtherSwInstalled),
                              void pe(i)
                          );
                      fe(a, i),
                          Ee("load"),
                          (c = Object.getOwnPropertyDescriptor(Document.prototype, "cookie")),
                          void (
                              c &&
                              c.configurable &&
                              Object.defineProperty(Document.prototype, "cookie", {
                                  configurable: !0,
                                  get: function () {
                                      return c.get.call(e);
                                  },
                                  set: function (t) {
                                      c.set.call(e, t), Ee();
                                  },
                              })
                          ),
                          (function (e) {
                              t[n].addEventListener("message", function (t) {
                                  var n = t.data,
                                      r = n.type,
                                      i = n.payload;
                                  if ("asset-response-timings" === r) {
                                      var o = i.assetSource,
                                          a = i.assetTTFB,
                                          s = i.cdnPoP,
                                          c = i.originTTFB,
                                          u = i.assetCause;
                                      (e.lastNavigate.assetSource = o), (e.lastNavigate.assetTTFB = a), (e.lastNavigate.originTTFB = c), (e.lastNavigate.cdnPoP = s), (e.lastNavigate.assetCause = u), ce(e);
                                  }
                              });
                          })(i),
                          te() &&
                              (function () {
                                  return re() === Y.reload;
                              })() &&
                              Ce();
                      var c;
                  })(m, p, w)
                : pe(m);
            if (Ne())
                return void et().catch(function (e) {
                    return K(e, O.SNIPPET);
                });
            if (!w) return Qe();
            (b = !1),
                h(function () {
                    b || ((b = !0), Qe());
                }),
                (T = function () {
                    setTimeout(function () {
                        b || ((b = !0), Qe());
                    }, 1e3);
                }),
                "loading" === e.readyState ? e.addEventListener("DOMContentLoaded", T) : setTimeout(T, 0);
            var b, T;
        })();
    } catch (nt) {
        K(nt, O.SNIPPET);
    }
    function Qe() {
        var e = !1;
        Ze()
            .catch(function (t) {
                return (
                    !e && K(t, O.SNIPPET),
                    (e = !0),
                    tt().then(function () {
                        return Ze();
                    })
                );
            })
            .then(function () {
                return je(SpeedKit);
            })
            .catch(function (t) {
                var n = x(t) ? t.reason.message || JSON.stringify(t.reason) : t.message;
                return "The operation is insecure." === n || "Rejected" === n ? ((SpeedKit.lastNavigate.responseCause = V.SkUnsupported), ce(SpeedKit), et()) : (!e && K(t, O.SNIPPET), (e = !0), et());
            })
            .catch(function (t) {
                !e && K(t, O.SNIPPET), (e = !0);
            });
    }
    function Ze() {
        var n = me(r.scope),
            i = new v(n),
            o = window.devicePixelRatio,
            a = window.screen.width,
            s = t.userAgent,
            c = r.customDevice,
            u = c ? i.set("/com.baqend.speedkit.device", { device: c, userAgent: s }) : Promise.resolve();
        return Promise.all([i.set("/com.baqend.speedkit.config", r), i.set("/com.baqend.speedkit.screen", { dpr: o, width: a }), i.set("/com.baqend.speedkit.cookie", { origins: [[location.origin, e.cookie]] }), $e(i), u]).then(function () {
            return i.disconnect();
        });
    }
    function $e(e) {}
    function et() {
        var e = new URL(r.scope || "/", location.origin).toString(),
            i = He();
        return t[n]
            .getRegistrations()
            .then(function (t) {
                return t.forEach(function (t) {
                    var n = (function (e) {
                        var t = e.active || e.installing || e.waiting;
                        if (!t) return "";
                        var n = new URL(t.scriptURL);
                        return n.origin + n.pathname;
                    })(t);
                    t.scope === e && n === i && t.unregister();
                });
            })
            .catch(function () {
                return null;
            })
            .then(function () {
                return tt();
            });
    }
    function tt() {
        return Promise.all([
            window.caches
                ? caches.keys().then(function (e) {
                      var t = e.filter(function (e) {
                          return new RegExp("^" + g(s, r.scope) + ".*").test(e);
                      });
                      return Promise.all(
                          t.map(function (e) {
                              return caches.delete(e);
                          })
                      );
                  })
                : Promise.resolve(),
            ((e = new v(r.scope)),
            e.clear().then(function () {
                return e.disconnect();
            })),
        ]);
        var e;
    }
})(document, navigator, "serviceWorker", "undefined" != typeof speedKit ? speedKit : config, "SNIPPET_LOADED");