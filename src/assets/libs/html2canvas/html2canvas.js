/*
 html2canvas 0.5.0-alpha2 <http://html2canvas.hertzen.com>
 Copyright (c) 2015 Niklas von Hertzen

 Released under MIT License
 */
! function(e) {
    if ("object" == typeof exports && "undefined" != typeof module) module.exports = e();
    else if ("function" == typeof define && define.amd) define([], e);
    else {
        var n;
        "undefined" != typeof window ? n = window : "undefined" != typeof global ? n = global : "undefined" != typeof self && (n = self), n.html2canvas = e()
    }
}(function() {
    var e;
    return function n(e, f, o) {
        function d(t, l) {
            if (!f[t]) {
                if (!e[t]) {
                    var s = "function" == typeof require && require;
                    if (!l && s) return s(t, !0);
                    if (i) return i(t, !0);
                    var u = new Error("Cannot find module '" + t + "'");
                    throw u.code = "MODULE_NOT_FOUND", u
                }
                var a = f[t] = {
                    exports: {}
                };
                e[t][0].call(a.exports, function(n) {
                    var f = e[t][1][n];
                    return d(f ? f : n)
                }, a, a.exports, n, e, f, o)
            }
            return f[t].exports
        }
        for (var i = "function" == typeof require && require, t = 0; t < o.length; t++) d(o[t]);
        return d
    }({
        1: [
            function(n, f) {
                (function(n, o) {
                    (function() {
                        "use strict";

                        function d(e) {
                            return "function" == typeof e || "object" == typeof e && null !== e
                        }

                        function i(e) {
                            return "function" == typeof e
                        }

                        function t(e) {
                            return "object" == typeof e && null !== e
                        }

                        function l() {}

                        function s() {
                            return function() {
                                n.nextTick(c)
                            }
                        }

                        function u() {
                            var e = 0,
                              n = new P(c),
                              f = document.createTextNode("");
                            return n.observe(f, {
                                characterData: !0
                            }),
                              function() {
                                  f.data = e = ++e % 2
                              }
                        }

                        function a() {
                            var e = new MessageChannel;
                            return e.port1.onmessage = c,
                              function() {
                                  e.port2.postMessage(0)
                              }
                        }

                        function p() {
                            return function() {
                                setTimeout(c, 1)
                            }
                        }

                        function c() {
                            for (var e = 0; M > e; e += 2) {
                                var n = R[e],
                                  f = R[e + 1];
                                n(f), R[e] = void 0, R[e + 1] = void 0
                            }
                            M = 0
                        }

                        function y() {}

                        function m() {
                            return new TypeError("You cannot resolve a promise with itself")
                        }

                        function r() {
                            return new TypeError("A promises callback cannot return that same promise.")
                        }

                        function v(e) {
                            try {
                                return e.then
                            } catch (n) {
                                return V.error = n, V
                            }
                        }

                        function w(e, n, f, o) {
                            try {
                                e.call(n, f, o)
                            } catch (d) {
                                return d
                            }
                        }

                        function b(e, n, f) {
                            N(function(e) {
                                var o = !1,
                                  d = w(f, n, function(f) {
                                      o || (o = !0, n !== f ? x(e, f) : k(e, f))
                                  }, function(n) {
                                      o || (o = !0, q(e, n))
                                  }, "Settle: " + (e._label || " unknown promise"));
                                !o && d && (o = !0, q(e, d))
                            }, e)
                        }

                        function g(e, n) {
                            n._state === T ? k(e, n._result) : e._state === U ? q(e, n._result) : z(n, void 0, function(n) {
                                x(e, n)
                            }, function(n) {
                                q(e, n)
                            })
                        }

                        function h(e, n) {
                            if (n.constructor === e.constructor) g(e, n);
                            else {
                                var f = v(n);
                                f === V ? q(e, V.error) : void 0 === f ? k(e, n) : i(f) ? b(e, n, f) : k(e, n)
                            }
                        }

                        function x(e, n) {
                            e === n ? q(e, m()) : d(n) ? h(e, n) : k(e, n)
                        }

                        function j(e) {
                            e._onerror && e._onerror(e._result), A(e)
                        }

                        function k(e, n) {
                            e._state === S && (e._result = n, e._state = T, 0 === e._subscribers.length || N(A, e))
                        }

                        function q(e, n) {
                            e._state === S && (e._state = U, e._result = n, N(j, e))
                        }

                        function z(e, n, f, o) {
                            var d = e._subscribers,
                              i = d.length;
                            e._onerror = null, d[i] = n, d[i + T] = f, d[i + U] = o, 0 === i && e._state && N(A, e)
                        }

                        function A(e) {
                            var n = e._subscribers,
                              f = e._state;
                            if (0 !== n.length) {
                                for (var o, d, i = e._result, t = 0; t < n.length; t += 3) o = n[t], d = n[t + f], o ? D(f, o, d, i) : d(i);
                                e._subscribers.length = 0
                            }
                        }

                        function B() {
                            this.error = null
                        }

                        function C(e, n) {
                            try {
                                return e(n)
                            } catch (f) {
                                return W.error = f, W
                            }
                        }

                        function D(e, n, f, o) {
                            var d, t, l, s, u = i(f);
                            if (u) {
                                if (d = C(f, o), d === W ? (s = !0, t = d.error, d = null) : l = !0, n === d) return void q(n, r())
                            } else d = o, l = !0;
                            n._state !== S || (u && l ? x(n, d) : s ? q(n, t) : e === T ? k(n, d) : e === U && q(n, d))
                        }

                        function E(e, n) {
                            try {
                                n(function(n) {
                                    x(e, n)
                                }, function(n) {
                                    q(e, n)
                                })
                            } catch (f) {
                                q(e, f)
                            }
                        }

                        function F(e, n, f, o) {
                            this._instanceConstructor = e, this.promise = new e(y, o), this._abortOnReject = f, this._validateInput(n) ? (this._input = n, this.length = n.length, this._remaining = n.length, this._init(), 0 === this.length ? k(this.promise, this._result) : (this.length = this.length || 0, this._enumerate(), 0 === this._remaining && k(this.promise, this._result))) : q(this.promise, this._validationError())
                        }

                        function G() {
                            throw new TypeError("You must pass a resolver function as the first argument to the promise constructor")
                        }

                        function H() {
                            throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.")
                        }

                        function I(e) {
                            this._id = en++, this._state = void 0, this._result = void 0, this._subscribers = [], y !== e && (i(e) || G(), this instanceof I || H(), E(this, e))
                        }
                        var J;
                        J = Array.isArray ? Array.isArray : function(e) {
                            return "[object Array]" === Object.prototype.toString.call(e)
                        };
                        var K, L = J,
                          M = (Date.now || function() {
                              return (new Date).getTime()
                          }, Object.create || function(e) {
                              if (arguments.length > 1) throw new Error("Second argument not supported");
                              if ("object" != typeof e) throw new TypeError("Argument must be an object");
                              return l.prototype = e, new l
                          }, 0),
                          N = function(e, n) {
                              R[M] = e, R[M + 1] = n, M += 2, 2 === M && K()
                          }, O = "undefined" != typeof window ? window : {}, P = O.MutationObserver || O.WebKitMutationObserver,
                          Q = "undefined" != typeof Uint8ClampedArray && "undefined" != typeof importScripts && "undefined" != typeof MessageChannel,
                          R = new Array(1e3);
                        K = "undefined" != typeof n && "[object process]" === {}.toString.call(n) ? s() : P ? u() : Q ? a() : p();
                        var S = void 0,
                          T = 1,
                          U = 2,
                          V = new B,
                          W = new B;
                        F.prototype._validateInput = function(e) {
                            return L(e)
                        }, F.prototype._validationError = function() {
                            return new Error("Array Methods must be provided an Array")
                        }, F.prototype._init = function() {
                            this._result = new Array(this.length)
                        };
                        var X = F;
                        F.prototype._enumerate = function() {
                            for (var e = this.length, n = this.promise, f = this._input, o = 0; n._state === S && e > o; o++) this._eachEntry(f[o], o)
                        }, F.prototype._eachEntry = function(e, n) {
                            var f = this._instanceConstructor;
                            t(e) ? e.constructor === f && e._state !== S ? (e._onerror = null, this._settledAt(e._state, n, e._result)) : this._willSettleAt(f.resolve(e), n) : (this._remaining--, this._result[n] = this._makeResult(T, n, e))
                        }, F.prototype._settledAt = function(e, n, f) {
                            var o = this.promise;
                            o._state === S && (this._remaining--, this._abortOnReject && e === U ? q(o, f) : this._result[n] = this._makeResult(e, n, f)), 0 === this._remaining && k(o, this._result)
                        }, F.prototype._makeResult = function(e, n, f) {
                            return f
                        }, F.prototype._willSettleAt = function(e, n) {
                            var f = this;
                            z(e, void 0, function(e) {
                                f._settledAt(T, n, e)
                            }, function(e) {
                                f._settledAt(U, n, e)
                            })
                        };
                        var Y = function(e, n) {
                              return new X(this, e, !0, n).promise
                          }, Z = function(e, n) {
                              function f(e) {
                                  x(i, e)
                              }

                              function o(e) {
                                  q(i, e)
                              }
                              var d = this,
                                i = new d(y, n);
                              if (!L(e)) return q(i, new TypeError("You must pass an array to race.")), i;
                              for (var t = e.length, l = 0; i._state === S && t > l; l++) z(d.resolve(e[l]), void 0, f, o);
                              return i
                          }, $ = function(e, n) {
                              var f = this;
                              if (e && "object" == typeof e && e.constructor === f) return e;
                              var o = new f(y, n);
                              return x(o, e), o
                          }, _ = function(e, n) {
                              var f = this,
                                o = new f(y, n);
                              return q(o, e), o
                          }, en = 0,
                          nn = I;
                        I.all = Y, I.race = Z, I.resolve = $, I.reject = _, I.prototype = {
                            constructor: I,
                            then: function(e, n) {
                                var f = this,
                                  o = f._state;
                                if (o === T && !e || o === U && !n) return this;
                                var d = new this.constructor(y),
                                  i = f._result;
                                if (o) {
                                    var t = arguments[o - 1];
                                    N(function() {
                                        D(o, d, t, i)
                                    })
                                } else z(f, d, e, n);
                                return d
                            },
                            "catch": function(e) {
                                return this.then(null, e)
                            }
                        };
                        var fn = function() {
                            var e;
                            e = "undefined" != typeof o ? o : "undefined" != typeof window && window.document ? window : self;
                            var n = "Promise" in e && "resolve" in e.Promise && "reject" in e.Promise && "all" in e.Promise && "race" in e.Promise && function() {
                                  var n;
                                  return new e.Promise(function(e) {
                                      n = e
                                  }), i(n)
                              }();
                            n || (e.Promise = nn)
                        }, on = {
                            Promise: nn,
                            polyfill: fn
                        };
                        "function" == typeof e && e.amd ? e(function() {
                            return on
                        }) : "undefined" != typeof f && f.exports ? f.exports = on : "undefined" != typeof this && (this.ES6Promise = on)
                    }).call(this)
                }).call(this, n("_process"), "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
            }, {
                _process: 2
            }
        ],
        2: [
            function(e, n) {
                function f() {
                    if (!t) {
                        t = !0;
                        for (var e, n = i.length; n;) {
                            e = i, i = [];
                            for (var f = -1; ++f < n;) e[f]();
                            n = i.length
                        }
                        t = !1
                    }
                }

                function o() {}
                var d = n.exports = {}, i = [],
                  t = !1;
                d.nextTick = function(e) {
                    i.push(e), t || setTimeout(f, 0)
                }, d.title = "browser", d.browser = !0, d.env = {}, d.argv = [], d.version = "", d.on = o, d.addListener = o, d.once = o, d.off = o, d.removeListener = o, d.removeAllListeners = o, d.emit = o, d.binding = function() {
                    throw new Error("process.binding is not supported")
                }, d.cwd = function() {
                    return "/"
                }, d.chdir = function() {
                    throw new Error("process.chdir is not supported")
                }, d.umask = function() {
                    return 0
                }
            }, {}
        ],
        3: [
            function(n, f, o) {
                (function(n) {
                    ! function(d) {
                        function i(e) {
                            throw RangeError(I[e])
                        }

                        function t(e, n) {
                            for (var f = e.length; f--;) e[f] = n(e[f]);
                            return e
                        }

                        function l(e, n) {
                            return t(e.split(H), n).join(".")
                        }

                        function s(e) {
                            for (var n, f, o = [], d = 0, i = e.length; i > d;) n = e.charCodeAt(d++), n >= 55296 && 56319 >= n && i > d ? (f = e.charCodeAt(d++), 56320 == (64512 & f) ? o.push(((1023 & n) << 10) + (1023 & f) + 65536) : (o.push(n), d--)) : o.push(n);
                            return o
                        }

                        function u(e) {
                            return t(e, function(e) {
                                var n = "";
                                return e > 65535 && (e -= 65536, n += L(e >>> 10 & 1023 | 55296), e = 56320 | 1023 & e), n += L(e)
                            }).join("")
                        }

                        function a(e) {
                            return 10 > e - 48 ? e - 22 : 26 > e - 65 ? e - 65 : 26 > e - 97 ? e - 97 : k
                        }

                        function p(e, n) {
                            return e + 22 + 75 * (26 > e) - ((0 != n) << 5)
                        }

                        function c(e, n, f) {
                            var o = 0;
                            for (e = f ? K(e / B) : e >> 1, e += K(e / n); e > J * z >> 1; o += k) e = K(e / J);
                            return K(o + (J + 1) * e / (e + A))
                        }

                        function y(e) {
                            var n, f, o, d, t, l, s, p, y, m, r = [],
                              v = e.length,
                              w = 0,
                              b = D,
                              g = C;
                            for (f = e.lastIndexOf(E), 0 > f && (f = 0), o = 0; f > o; ++o) e.charCodeAt(o) >= 128 && i("not-basic"), r.push(e.charCodeAt(o));
                            for (d = f > 0 ? f + 1 : 0; v > d;) {
                                for (t = w, l = 1, s = k; d >= v && i("invalid-input"), p = a(e.charCodeAt(d++)), (p >= k || p > K((j - w) / l)) && i("overflow"), w += p * l, y = g >= s ? q : s >= g + z ? z : s - g, !(y > p); s += k) m = k - y, l > K(j / m) && i("overflow"), l *= m;
                                n = r.length + 1, g = c(w - t, n, 0 == t), K(w / n) > j - b && i("overflow"), b += K(w / n), w %= n, r.splice(w++, 0, b)
                            }
                            return u(r)
                        }

                        function m(e) {
                            var n, f, o, d, t, l, u, a, y, m, r, v, w, b, g, h = [];
                            for (e = s(e), v = e.length, n = D, f = 0, t = C, l = 0; v > l; ++l) r = e[l], 128 > r && h.push(L(r));
                            for (o = d = h.length, d && h.push(E); v > o;) {
                                for (u = j, l = 0; v > l; ++l) r = e[l], r >= n && u > r && (u = r);
                                for (w = o + 1, u - n > K((j - f) / w) && i("overflow"), f += (u - n) * w, n = u, l = 0; v > l; ++l)
                                    if (r = e[l], n > r && ++f > j && i("overflow"), r == n) {
                                        for (a = f, y = k; m = t >= y ? q : y >= t + z ? z : y - t, !(m > a); y += k) g = a - m, b = k - m, h.push(L(p(m + g % b, 0))), a = K(g / b);
                                        h.push(L(p(a, 0))), t = c(f, w, o == d), f = 0, ++o
                                    }++f, ++n
                            }
                            return h.join("")
                        }

                        function r(e) {
                            return l(e, function(e) {
                                return F.test(e) ? y(e.slice(4).toLowerCase()) : e
                            })
                        }

                        function v(e) {
                            return l(e, function(e) {
                                return G.test(e) ? "xn--" + m(e) : e
                            })
                        }
                        var w = "object" == typeof o && o,
                          b = "object" == typeof f && f && f.exports == w && f,
                          g = "object" == typeof n && n;
                        (g.global === g || g.window === g) && (d = g);
                        var h, x, j = 2147483647,
                          k = 36,
                          q = 1,
                          z = 26,
                          A = 38,
                          B = 700,
                          C = 72,
                          D = 128,
                          E = "-",
                          F = /^xn--/,
                          G = /[^ -~]/,
                          H = /\x2E|\u3002|\uFF0E|\uFF61/g,
                          I = {
                              overflow: "Overflow: input needs wider integers to process",
                              "not-basic": "Illegal input >= 0x80 (not a basic code point)",
                              "invalid-input": "Invalid input"
                          }, J = k - q,
                          K = Math.floor,
                          L = String.fromCharCode;
                        if (h = {
                              version: "1.2.4",
                              ucs2: {
                                  decode: s,
                                  encode: u
                              },
                              decode: y,
                              encode: m,
                              toASCII: v,
                              toUnicode: r
                          }, "function" == typeof e && "object" == typeof e.amd && e.amd) e("punycode", function() {
                            return h
                        });
                        else if (w && !w.nodeType)
                            if (b) b.exports = h;
                            else
                                for (x in h) h.hasOwnProperty(x) && (w[x] = h[x]);
                        else d.punycode = h
                    }(this)
                }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
            }, {}
        ],
        4: [
            function(e, n) {
                function f(e, n, f) {
                    for (var o = e.getElementsByTagName(f), d = n.getElementsByTagName(f), i = o.length, t = 0; i > t; t++) d[t].value = o[t].value
                }

                function o(e, n, f) {
                    !e.defaultView || n === e.defaultView.pageXOffset && f === e.defaultView.pageYOffset || e.defaultView.scrollTo(n, f)
                }

                function d(e) {
                    [].slice.call(e.querySelectorAll("canvas"), 0).forEach(function(e) {
                        e.setAttribute(c, "canvas-" + y++)
                    })
                }

                function i(e, n) {
                    [].slice.call(e.querySelectorAll("[" + c + "]"), 0).forEach(function(e) {
                        try {
                            var f = n.querySelector("[" + c + '="' + e.getAttribute(c) + '"]');
                            f && (f.width = e.width, f.height = e.height, f.getContext("2d").putImageData(e.getContext("2d").getImageData(0, 0, e.width, e.height), 0, 0))
                        } catch (o) {
                            a("Unable to copy canvas content from", e, o)
                        }
                        e.removeAttribute(c)
                    })
                }

                function t(e) {
                    return [].slice.call(e.childNodes, 0).filter(u).forEach(function(n) {
                        "SCRIPT" === n.tagName ? e.removeChild(n) : t(n)
                    }), e
                }

                function l() {
                    return document.documentMode && document.documentMode <= 9
                }

                function s(e, n) {
                    for (var f = 3 === e.nodeType ? document.createTextNode(e.nodeValue) : e.cloneNode(!1), o = e.firstChild; o;)(n === !0 || 1 !== o.nodeType || "SCRIPT" !== o.nodeName) && f.appendChild(s(o, n)), o = o.nextSibling;
                    return f
                }

                function u(e) {
                    return e.nodeType === Node.ELEMENT_NODE
                }
                var a = e("./log"),
                  p = e("./promise"),
                  c = "data-html2canvas-canvas-clone",
                  y = 0;
                n.exports = function(e, n, u, a, c, y, m) {
                    d(e);
                    var r = l() ? s(e.documentElement, c.javascriptEnabled) : e.documentElement.cloneNode(!0),
                      v = n.createElement("iframe");
                    return v.className = "html2canvas-container", v.style.visibility = "hidden", v.style.position = "fixed", v.style.left = "-10000px", v.style.top = "0px", v.style.border = "0", v.width = u, v.height = a, v.scrolling = "no", n.body.appendChild(v), new p(function(n) {
                        var d = v.contentWindow.document;
                        f(e.documentElement, r, "textarea"), f(e.documentElement, r, "select"), v.contentWindow.onload = v.onload = function() {
                            var f = setInterval(function() {
                                d.body.childNodes.length > 0 && (i(e, d), clearInterval(f), "view" === c.type && v.contentWindow.scrollTo(y, m), n(v))
                            }, 50)
                        }, d.open(), d.write("<!DOCTYPE html><html></html>"), o(e, y, m), d.replaceChild(c.javascriptEnabled === !0 ? d.adoptNode(r) : t(d.adoptNode(r)), d.documentElement), d.close()
                    })
                }
            }, {
                "./log": 15,
                "./promise": 18
            }
        ],
        5: [
            function(e, n) {
                function f(e) {
                    this.r = 0, this.g = 0, this.b = 0, this.a = null;
                    this.fromArray(e) || this.namedColor(e) || this.rgb(e) || this.rgba(e) || this.hex6(e) || this.hex3(e)
                }
                f.prototype.darken = function(e) {
                    var n = 1 - e;
                    return new f([Math.round(this.r * n), Math.round(this.g * n), Math.round(this.b * n), this.a])
                }, f.prototype.isTransparent = function() {
                    return 0 === this.a
                }, f.prototype.isBlack = function() {
                    return 0 === this.r && 0 === this.g && 0 === this.b
                }, f.prototype.fromArray = function(e) {
                    return Array.isArray(e) && (this.r = Math.min(e[0], 255), this.g = Math.min(e[1], 255), this.b = Math.min(e[2], 255), e.length > 3 && (this.a = e[3])), Array.isArray(e)
                };
                var o = /^#([a-f0-9]{3})$/i;
                f.prototype.hex3 = function(e) {
                    var n = null;
                    return null !== (n = e.match(o)) && (this.r = parseInt(n[1][0] + n[1][0], 16), this.g = parseInt(n[1][1] + n[1][1], 16), this.b = parseInt(n[1][2] + n[1][2], 16)), null !== n
                };
                var d = /^#([a-f0-9]{6})$/i;
                f.prototype.hex6 = function(e) {
                    var n = null;
                    return null !== (n = e.match(d)) && (this.r = parseInt(n[1].substring(0, 2), 16), this.g = parseInt(n[1].substring(2, 4), 16), this.b = parseInt(n[1].substring(4, 6), 16)), null !== n
                };
                var i = /^rgb\((\d{1,3}) *, *(\d{1,3}) *, *(\d{1,3})\)$/;
                f.prototype.rgb = function(e) {
                    var n = null;
                    return null !== (n = e.match(i)) && (this.r = Number(n[1]), this.g = Number(n[2]), this.b = Number(n[3])), null !== n
                };
                var t = /^rgba\((\d{1,3}) *, *(\d{1,3}) *, *(\d{1,3}) *, *(\d+\.?\d*)\)$/;
                f.prototype.rgba = function(e) {
                    var n = null;
                    return null !== (n = e.match(t)) && (this.r = Number(n[1]), this.g = Number(n[2]), this.b = Number(n[3]), this.a = Number(n[4])), null !== n
                }, f.prototype.toString = function() {
                    return null !== this.a && 1 !== this.a ? "rgba(" + [this.r, this.g, this.b, this.a].join(",") + ")" : "rgb(" + [this.r, this.g, this.b].join(",") + ")"
                }, f.prototype.namedColor = function(e) {
                    var n = l[e.toLowerCase()];
                    if (n) this.r = n[0], this.g = n[1], this.b = n[2];
                    else if ("transparent" === e.toLowerCase()) return this.r = this.g = this.b = this.a = 0, !0;
                    return !!n
                }, f.prototype.isColor = !0;
                var l = {
                    aliceblue: [240, 248, 255],
                    antiquewhite: [250, 235, 215],
                    aqua: [0, 255, 255],
                    aquamarine: [127, 255, 212],
                    azure: [240, 255, 255],
                    beige: [245, 245, 220],
                    bisque: [255, 228, 196],
                    black: [0, 0, 0],
                    blanchedalmond: [255, 235, 205],
                    blue: [0, 0, 255],
                    blueviolet: [138, 43, 226],
                    brown: [165, 42, 42],
                    burlywood: [222, 184, 135],
                    cadetblue: [95, 158, 160],
                    chartreuse: [127, 255, 0],
                    chocolate: [210, 105, 30],
                    coral: [255, 127, 80],
                    cornflowerblue: [100, 149, 237],
                    cornsilk: [255, 248, 220],
                    crimson: [220, 20, 60],
                    cyan: [0, 255, 255],
                    darkblue: [0, 0, 139],
                    darkcyan: [0, 139, 139],
                    darkgoldenrod: [184, 134, 11],
                    darkgray: [169, 169, 169],
                    darkgreen: [0, 100, 0],
                    darkgrey: [169, 169, 169],
                    darkkhaki: [189, 183, 107],
                    darkmagenta: [139, 0, 139],
                    darkolivegreen: [85, 107, 47],
                    darkorange: [255, 140, 0],
                    darkorchid: [153, 50, 204],
                    darkred: [139, 0, 0],
                    darksalmon: [233, 150, 122],
                    darkseagreen: [143, 188, 143],
                    darkslateblue: [72, 61, 139],
                    darkslategray: [47, 79, 79],
                    darkslategrey: [47, 79, 79],
                    darkturquoise: [0, 206, 209],
                    darkviolet: [148, 0, 211],
                    deeppink: [255, 20, 147],
                    deepskyblue: [0, 191, 255],
                    dimgray: [105, 105, 105],
                    dimgrey: [105, 105, 105],
                    dodgerblue: [30, 144, 255],
                    firebrick: [178, 34, 34],
                    floralwhite: [255, 250, 240],
                    forestgreen: [34, 139, 34],
                    fuchsia: [255, 0, 255],
                    gainsboro: [220, 220, 220],
                    ghostwhite: [248, 248, 255],
                    gold: [255, 215, 0],
                    goldenrod: [218, 165, 32],
                    gray: [128, 128, 128],
                    green: [0, 128, 0],
                    greenyellow: [173, 255, 47],
                    grey: [128, 128, 128],
                    honeydew: [240, 255, 240],
                    hotpink: [255, 105, 180],
                    indianred: [205, 92, 92],
                    indigo: [75, 0, 130],
                    ivory: [255, 255, 240],
                    khaki: [240, 230, 140],
                    lavender: [230, 230, 250],
                    lavenderblush: [255, 240, 245],
                    lawngreen: [124, 252, 0],
                    lemonchiffon: [255, 250, 205],
                    lightblue: [173, 216, 230],
                    lightcoral: [240, 128, 128],
                    lightcyan: [224, 255, 255],
                    lightgoldenrodyellow: [250, 250, 210],
                    lightgray: [211, 211, 211],
                    lightgreen: [144, 238, 144],
                    lightgrey: [211, 211, 211],
                    lightpink: [255, 182, 193],
                    lightsalmon: [255, 160, 122],
                    lightseagreen: [32, 178, 170],
                    lightskyblue: [135, 206, 250],
                    lightslategray: [119, 136, 153],
                    lightslategrey: [119, 136, 153],
                    lightsteelblue: [176, 196, 222],
                    lightyellow: [255, 255, 224],
                    lime: [0, 255, 0],
                    limegreen: [50, 205, 50],
                    linen: [250, 240, 230],
                    magenta: [255, 0, 255],
                    maroon: [128, 0, 0],
                    mediumaquamarine: [102, 205, 170],
                    mediumblue: [0, 0, 205],
                    mediumorchid: [186, 85, 211],
                    mediumpurple: [147, 112, 219],
                    mediumseagreen: [60, 179, 113],
                    mediumslateblue: [123, 104, 238],
                    mediumspringgreen: [0, 250, 154],
                    mediumturquoise: [72, 209, 204],
                    mediumvioletred: [199, 21, 133],
                    midnightblue: [25, 25, 112],
                    mintcream: [245, 255, 250],
                    mistyrose: [255, 228, 225],
                    moccasin: [255, 228, 181],
                    navajowhite: [255, 222, 173],
                    navy: [0, 0, 128],
                    oldlace: [253, 245, 230],
                    olive: [128, 128, 0],
                    olivedrab: [107, 142, 35],
                    orange: [255, 165, 0],
                    orangered: [255, 69, 0],
                    orchid: [218, 112, 214],
                    palegoldenrod: [238, 232, 170],
                    palegreen: [152, 251, 152],
                    paleturquoise: [175, 238, 238],
                    palevioletred: [219, 112, 147],
                    papayawhip: [255, 239, 213],
                    peachpuff: [255, 218, 185],
                    peru: [205, 133, 63],
                    pink: [255, 192, 203],
                    plum: [221, 160, 221],
                    powderblue: [176, 224, 230],
                    purple: [128, 0, 128],
                    rebeccapurple: [102, 51, 153],
                    red: [255, 0, 0],
                    rosybrown: [188, 143, 143],
                    royalblue: [65, 105, 225],
                    saddlebrown: [139, 69, 19],
                    salmon: [250, 128, 114],
                    sandybrown: [244, 164, 96],
                    seagreen: [46, 139, 87],
                    seashell: [255, 245, 238],
                    sienna: [160, 82, 45],
                    silver: [192, 192, 192],
                    skyblue: [135, 206, 235],
                    slateblue: [106, 90, 205],
                    slategray: [112, 128, 144],
                    slategrey: [112, 128, 144],
                    snow: [255, 250, 250],
                    springgreen: [0, 255, 127],
                    steelblue: [70, 130, 180],
                    tan: [210, 180, 140],
                    teal: [0, 128, 128],
                    thistle: [216, 191, 216],
                    tomato: [255, 99, 71],
                    turquoise: [64, 224, 208],
                    violet: [238, 130, 238],
                    wheat: [245, 222, 179],
                    white: [255, 255, 255],
                    whitesmoke: [245, 245, 245],
                    yellow: [255, 255, 0],
                    yellowgreen: [154, 205, 50]
                };
                n.exports = f
            }, {}
        ],
        6: [
            function(e, n) {
                function f(e, n) {
                    var f = j++;
                    if (n = n || {}, n.logging && (window.html2canvas.logging = !0, window.html2canvas.start = Date.now()), n.async = "undefined" == typeof n.async ? !0 : n.async, n.allowTaint = "undefined" == typeof n.allowTaint ? !1 : n.allowTaint, n.removeContainer = "undefined" == typeof n.removeContainer ? !0 : n.removeContainer, n.javascriptEnabled = "undefined" == typeof n.javascriptEnabled ? !1 : n.javascriptEnabled, n.imageTimeout = "undefined" == typeof n.imageTimeout ? 1e4 : n.imageTimeout, n.renderer = "function" == typeof n.renderer ? n.renderer : c, n.strict = !! n.strict, "string" == typeof e) {
                        if ("string" != typeof n.proxy) return a.reject("Proxy must be used when rendering url");
                        var i = null != n.width ? n.width : window.innerWidth,
                          t = null != n.height ? n.height : window.innerHeight;
                        return g(u(e), n.proxy, document, i, t, n).then(function(e) {
                            return d(e.contentWindow.document.documentElement, e, n, i, t)
                        })
                    }
                    var l = (void 0 === e ? [document.documentElement] : e.length ? e : [e])[0];
                    return l.setAttribute(x + f, f), o(l.ownerDocument, n, l.ownerDocument.defaultView.innerWidth, l.ownerDocument.defaultView.innerHeight, f).then(function(e) {
                        return "function" == typeof n.onrendered && (v("options.onrendered is deprecated, html2canvas returns a Promise containing the canvas"), n.onrendered(e)), e
                    })
                }

                function o(e, n, f, o, i) {
                    return b(e, e, f, o, n, e.defaultView.pageXOffset, e.defaultView.pageYOffset).then(function(t) {
                        v("Document cloned");
                        var l = x + i,
                          s = "[" + l + "='" + i + "']";
                        e.querySelector(s).removeAttribute(l);
                        var u = t.contentWindow,
                          p = u.document.querySelector(s),
                          c = a.resolve("function" == typeof n.onclone ? n.onclone(u.document) : !0);
                        return c.then(function() {
                            return d(p, t, n, f, o)
                        })
                    })
                }

                function d(e, n, f, o, d) {
                    var u = n.contentWindow,
                      a = new p(u.document),
                      c = new y(f, a),
                      r = h(e),
                      w = "view" === f.type ? o : l(u.document),
                      b = "view" === f.type ? d : s(u.document),
                      g = new f.renderer(w, b, c, f, document),
                      x = new m(e, g, a, c, f);
                    return x.ready.then(function() {
                        v("Finished rendering");
                        var o;
                        return o = "view" === f.type ? t(g.canvas, {
                            width: g.canvas.width,
                            height: g.canvas.height,
                            top: 0,
                            left: 0,
                            x: 0,
                            y: 0
                        }) : e === u.document.body || e === u.document.documentElement || null != f.canvas ? g.canvas : t(g.canvas, {
                            width: null != f.width ? f.width : r.width,
                            height: null != f.height ? f.height : r.height,
                            top: r.top,
                            left: r.left,
                            x: u.pageXOffset,
                            y: u.pageYOffset
                        }), i(n, f), o
                    })
                }

                function i(e, n) {
                    n.removeContainer && (e.parentNode.removeChild(e), v("Cleaned up container"))
                }

                function t(e, n) {
                    var f = document.createElement("canvas"),
                      o = Math.min(e.width - 1, Math.max(0, n.left)),
                      d = Math.min(e.width, Math.max(1, n.left + n.width)),
                      i = Math.min(e.height - 1, Math.max(0, n.top)),
                      t = Math.min(e.height, Math.max(1, n.top + n.height));
                    return f.width = n.width, f.height = n.height, v("Cropping canvas at:", "left:", n.left, "top:", n.top, "width:", d - o, "height:", t - i), v("Resulting crop with width", n.width, "and height", n.height, " with x", o, "and y", i), f.getContext("2d").drawImage(e, o, i, d - o, t - i, n.x, n.y, d - o, t - i), f
                }

                function l(e) {
                    return Math.max(Math.max(e.body.scrollWidth, e.documentElement.scrollWidth), Math.max(e.body.offsetWidth, e.documentElement.offsetWidth), Math.max(e.body.clientWidth, e.documentElement.clientWidth))
                }

                function s(e) {
                    return Math.max(Math.max(e.body.scrollHeight, e.documentElement.scrollHeight), Math.max(e.body.offsetHeight, e.documentElement.offsetHeight), Math.max(e.body.clientHeight, e.documentElement.clientHeight))
                }

                function u(e) {
                    var n = document.createElement("a");
                    return n.href = e, n.href = n.href, n
                }
                var a = e("./promise"),
                  p = e("./support"),
                  c = e("./renderers/canvas"),
                  y = e("./imageloader"),
                  m = e("./nodeparser"),
                  r = e("./nodecontainer"),
                  v = e("./log"),
                  w = e("./utils"),
                  b = e("./clone"),
                  g = e("./proxy").loadUrlDocument,
                  h = w.getBounds,
                  x = "data-html2canvas-node",
                  j = 0;
                f.Promise = a, f.CanvasRenderer = c, f.NodeContainer = r, f.log = v, f.utils = w, n.exports = "undefined" == typeof document || "function" != typeof Object.create || "function" != typeof document.createElement("canvas").getContext ? function() {
                    return a.reject("No canvas support")
                } : f
            }, {
                "./clone": 4,
                "./imageloader": 13,
                "./log": 15,
                "./nodecontainer": 16,
                "./nodeparser": 17,
                "./promise": 18,
                "./proxy": 19,
                "./renderers/canvas": 23,
                "./support": 25,
                "./utils": 29
            }
        ],
        7: [
            function(e, n) {
                function f(e) {
                    if (this.src = e, d("DummyImageContainer for", e), !this.promise || !this.image) {
                        d("Initiating DummyImageContainer"), f.prototype.image = new Image;
                        var n = this.image;
                        f.prototype.promise = new o(function(e, f) {
                            n.onload = e, n.onerror = f, n.src = i(), n.complete === !0 && e(n)
                        })
                    }
                }
                var o = e("./promise"),
                  d = e("./log"),
                  i = e("./utils").smallImage;
                n.exports = f
            }, {
                "./log": 15,
                "./promise": 18,
                "./utils": 29
            }
        ],
        8: [
            function(e, n) {
                function f(e, n) {
                    var f, d, i = document.createElement("div"),
                      t = document.createElement("img"),
                      l = document.createElement("span"),
                      s = "Hidden Text";
                    i.style.visibility = "hidden", i.style.fontFamily = e, i.style.fontSize = n, i.style.margin = 0, i.style.padding = 0, document.body.appendChild(i), t.src = o(), t.width = 1, t.height = 1, t.style.margin = 0, t.style.padding = 0, t.style.verticalAlign = "baseline", l.style.fontFamily = e, l.style.fontSize = n, l.style.margin = 0, l.style.padding = 0, l.appendChild(document.createTextNode(s)), i.appendChild(l), i.appendChild(t), f = t.offsetTop - l.offsetTop + 1, i.removeChild(l), i.appendChild(document.createTextNode(s)), i.style.lineHeight = "normal", t.style.verticalAlign = "super", d = t.offsetTop - i.offsetTop + 1, document.body.removeChild(i), this.baseline = f, this.lineWidth = 1, this.middle = d
                }
                var o = e("./utils").smallImage;
                n.exports = f
            }, {
                "./utils": 29
            }
        ],
        9: [
            function(e, n) {
                function f() {
                    this.data = {}
                }
                var o = e("./font");
                f.prototype.getMetrics = function(e, n) {
                    return void 0 === this.data[e + "-" + n] && (this.data[e + "-" + n] = new o(e, n)), this.data[e + "-" + n]
                }, n.exports = f
            }, {
                "./font": 8
            }
        ],
        10: [
            function(e, n) {
                function f(n, f, o) {
                    this.image = null, this.src = n;
                    var t = this,
                      l = i(n);
                    this.promise = (f ? new d(function(e) {
                        "about:blank" === n.contentWindow.document.URL || null == n.contentWindow.document.documentElement ? n.contentWindow.onload = n.onload = function() {
                            e(n)
                        } : e(n)
                    }) : this.proxyLoad(o.proxy, l, o)).then(function(n) {
                          var f = e("./core");
                          return f(n.contentWindow.document.documentElement, {
                              type: "view",
                              width: n.width,
                              height: n.height,
                              proxy: o.proxy,
                              javascriptEnabled: o.javascriptEnabled,
                              removeContainer: o.removeContainer,
                              allowTaint: o.allowTaint,
                              imageTimeout: o.imageTimeout / 2
                          })
                      }).then(function(e) {
                          return t.image = e
                      })
                }
                var o = e("./utils"),
                  d = e("./promise"),
                  i = o.getBounds,
                  t = e("./proxy").loadUrlDocument;
                f.prototype.proxyLoad = function(e, n, f) {
                    var o = this.src;
                    return t(o.src, e, o.ownerDocument, n.width, n.height, f)
                }, n.exports = f
            }, {
                "./core": 6,
                "./promise": 18,
                "./proxy": 19,
                "./utils": 29
            }
        ],
        11: [
            function(e, n) {
                function f(e) {
                    this.src = e.value, this.colorStops = [], this.type = null, this.x0 = .5, this.y0 = .5, this.x1 = .5, this.y1 = .5, this.promise = o.resolve(!0)
                }
                var o = e("./promise");
                f.prototype.TYPES = {
                    LINEAR: 1,
                    RADIAL: 2
                }, n.exports = f
            }, {
                "./promise": 18
            }
        ],
        12: [
            function(e, n) {
                function f(e, n) {
                    this.src = e, this.image = new Image;
                    var f = this;
                    this.tainted = null, this.promise = new o(function(o, d) {
                        f.image.onload = o, f.image.onerror = d, n && (f.image.crossOrigin = "anonymous"), f.image.src = e, f.image.complete === !0 && o(f.image)
                    })
                }
                var o = e("./promise");
                n.exports = f
            }, {
                "./promise": 18
            }
        ],
        13: [
            function(e, n) {
                function f(e, n) {
                    this.link = null, this.options = e, this.support = n, this.origin = this.getOrigin(window.location.href)
                }
                var o = e("./promise"),
                  d = e("./log"),
                  i = e("./imagecontainer"),
                  t = e("./dummyimagecontainer"),
                  l = e("./proxyimagecontainer"),
                  s = e("./framecontainer"),
                  u = e("./svgcontainer"),
                  a = e("./svgnodecontainer"),
                  p = e("./lineargradientcontainer"),
                  c = e("./webkitgradientcontainer"),
                  y = e("./utils").bind;
                f.prototype.findImages = function(e) {
                    var n = [];
                    return e.reduce(function(e, n) {
                        switch (n.node.nodeName) {
                            case "IMG":
                                return e.concat([{
                                    args: [n.node.src],
                                    method: "url"
                                }]);
                            case "svg":
                            case "IFRAME":
                                return e.concat([{
                                    args: [n.node],
                                    method: n.node.nodeName
                                }])
                        }
                        return e
                    }, []).forEach(this.addImage(n, this.loadImage), this), n
                }, f.prototype.findBackgroundImage = function(e, n) {
                    return n.parseBackgroundImages().filter(this.hasImageBackground).forEach(this.addImage(e, this.loadImage), this), e
                }, f.prototype.addImage = function(e, n) {
                    return function(f) {
                        f.args.forEach(function(o) {
                            this.imageExists(e, o) || (e.splice(0, 0, n.call(this, f)), d("Added image #" + e.length, "string" == typeof o ? o.substring(0, 100) : o))
                        }, this)
                    }
                }, f.prototype.hasImageBackground = function(e) {
                    return "none" !== e.method
                }, f.prototype.loadImage = function(e) {
                    if ("url" === e.method) {
                        var n = e.args[0];
                        return !this.isSVG(n) || this.support.svg || this.options.allowTaint ? n.match(/data:image\/.*;base64,/i) ? new i(n.replace(/url\(['"]{0,}|['"]{0,}\)$/gi, ""), !1) : this.isSameOrigin(n) || this.options.allowTaint === !0 || this.isSVG(n) ? new i(n, !1) : this.support.cors && !this.options.allowTaint && this.options.useCORS ? new i(n, !0) : this.options.proxy ? new l(n, this.options.proxy) : new t(n) : new u(n)
                    }
                    return "linear-gradient" === e.method ? new p(e) : "gradient" === e.method ? new c(e) : "svg" === e.method ? new a(e.args[0], this.support.svg) : "IFRAME" === e.method ? new s(e.args[0], this.isSameOrigin(e.args[0].src), this.options) : new t(e)
                }, f.prototype.isSVG = function(e) {
                    return "svg" === e.substring(e.length - 3).toLowerCase() || u.prototype.isInline(e)
                }, f.prototype.imageExists = function(e, n) {
                    return e.some(function(e) {
                        return e.src === n
                    })
                }, f.prototype.isSameOrigin = function(e) {
                    return this.getOrigin(e) === this.origin
                }, f.prototype.getOrigin = function(e) {
                    var n = this.link || (this.link = document.createElement("a"));
                    return n.href = e, n.href = n.href, n.protocol + n.hostname + n.port
                }, f.prototype.getPromise = function(e) {
                    return this.timeout(e, this.options.imageTimeout)["catch"](function() {
                        var n = new t(e.src);
                        return n.promise.then(function(n) {
                            e.image = n
                        })
                    })
                }, f.prototype.get = function(e) {
                    var n = null;
                    return this.images.some(function(f) {
                        return (n = f).src === e
                    }) ? n : null
                }, f.prototype.fetch = function(e) {
                    return this.images = e.reduce(y(this.findBackgroundImage, this), this.findImages(e)), this.images.forEach(function(e, n) {
                        e.promise.then(function() {
                            d("Succesfully loaded image #" + (n + 1), e)
                        }, function(f) {
                            d("Failed loading image #" + (n + 1), e, f)
                        })
                    }), this.ready = o.all(this.images.map(this.getPromise, this)), d("Finished searching images"), this
                }, f.prototype.timeout = function(e, n) {
                    var f, i = o.race([e.promise, new o(function(o, i) {
                        f = setTimeout(function() {
                            d("Timed out loading image", e), i(e)
                        }, n)
                    })]).then(function(e) {
                        return clearTimeout(f), e
                    });
                    return i["catch"](function() {
                        clearTimeout(f)
                    }), i
                }, n.exports = f
            }, {
                "./dummyimagecontainer": 7,
                "./framecontainer": 10,
                "./imagecontainer": 12,
                "./lineargradientcontainer": 14,
                "./log": 15,
                "./promise": 18,
                "./proxyimagecontainer": 20,
                "./svgcontainer": 26,
                "./svgnodecontainer": 27,
                "./utils": 29,
                "./webkitgradientcontainer": 30
            }
        ],
        14: [
            function(e, n) {
                function f(e) {
                    o.apply(this, arguments), this.type = this.TYPES.LINEAR;
                    var n = null === e.args[0].match(this.stepRegExp);
                    n ? e.args[0].split(" ").reverse().forEach(function(e) {
                        switch (e) {
                            case "left":
                                this.x0 = 0, this.x1 = 1;
                                break;
                            case "top":
                                this.y0 = 0, this.y1 = 1;
                                break;
                            case "right":
                                this.x0 = 1, this.x1 = 0;
                                break;
                            case "bottom":
                                this.y0 = 1, this.y1 = 0;
                                break;
                            case "to":
                                var n = this.y0,
                                  f = this.x0;
                                this.y0 = this.y1, this.x0 = this.x1, this.x1 = f, this.y1 = n
                        }
                    }, this) : (this.y0 = 0, this.y1 = 1), this.colorStops = e.args.slice(n ? 1 : 0).map(function(e) {
                        var n = e.match(this.stepRegExp);
                        return {
                            color: new d(n[1]),
                            stop: "%" === n[3] ? n[2] / 100 : null
                        }
                    }, this), null === this.colorStops[0].stop && (this.colorStops[0].stop = 0), null === this.colorStops[this.colorStops.length - 1].stop && (this.colorStops[this.colorStops.length - 1].stop = 1), this.colorStops.forEach(function(e, n) {
                        null === e.stop && this.colorStops.slice(n).some(function(f, o) {
                            return null !== f.stop ? (e.stop = (f.stop - this.colorStops[n - 1].stop) / (o + 1) + this.colorStops[n - 1].stop, !0) : !1
                        }, this)
                    }, this)
                }
                var o = e("./gradientcontainer"),
                  d = e("./color");
                f.prototype = Object.create(o.prototype), f.prototype.stepRegExp = /((?:rgb|rgba)\(\d{1,3},\s\d{1,3},\s\d{1,3}(?:,\s[0-9\.]+)?\))\s*(\d{1,3})?(%|px)?/, n.exports = f
            }, {
                "./color": 5,
                "./gradientcontainer": 11
            }
        ],
        15: [
            function(e, n) {
                n.exports = function() {
                    window.html2canvas.logging && window.console && window.console.log && Function.prototype.bind.call(window.console.log, window.console).apply(window.console, [Date.now() - window.html2canvas.start + "ms", "html2canvas:"].concat([].slice.call(arguments, 0)))
                }
            }, {}
        ],
        16: [
            function(e, n) {
                function f(e, n) {
                    this.node = e, this.parent = n, this.stack = null, this.bounds = null, this.borders = null, this.clip = [], this.backgroundClip = [], this.offsetBounds = null, this.visible = null, this.computedStyles = null, this.colors = {}, this.styles = {}, this.backgroundImages = null, this.transformData = null, this.transformMatrix = null, this.isPseudoElement = !1, this.opacity = null
                }

                function o(e) {
                    var n = e.options[e.selectedIndex || 0];
                    return n ? n.text || "" : ""
                }

                function d(e) {
                    return e && "matrix" === e[1] ? e[2].split(",").map(function(e) {
                        return parseFloat(e.trim())
                    }) : void 0
                }

                function i(e) {
                    return -1 !== e.toString().indexOf("%")
                }

                function t(e) {
                    return e.replace("px", "")
                }

                function l(e) {
                    return parseFloat(e)
                }
                var s = e("./color"),
                  u = e("./utils"),
                  a = u.getBounds,
                  p = u.parseBackgrounds,
                  c = u.offsetBounds;
                f.prototype.cloneTo = function(e) {
                    e.visible = this.visible, e.borders = this.borders, e.bounds = this.bounds, e.clip = this.clip, e.backgroundClip = this.backgroundClip, e.computedStyles = this.computedStyles, e.styles = this.styles, e.backgroundImages = this.backgroundImages, e.opacity = this.opacity
                }, f.prototype.getOpacity = function() {
                    return null === this.opacity ? this.opacity = this.cssFloat("opacity") : this.opacity
                }, f.prototype.assignStack = function(e) {
                    this.stack = e, e.children.push(this)
                }, f.prototype.isElementVisible = function() {
                    return this.node.nodeType === Node.TEXT_NODE ? this.parent.visible : "none" !== this.css("display") && "hidden" !== this.css("visibility") && !this.node.hasAttribute("data-html2canvas-ignore") && ("INPUT" !== this.node.nodeName || "hidden" !== this.node.getAttribute("type"))
                }, f.prototype.css = function(e) {
                    return this.computedStyles || (this.computedStyles = this.isPseudoElement ? this.parent.computedStyle(this.before ? ":before" : ":after") : this.computedStyle(null)), this.styles[e] || (this.styles[e] = this.computedStyles[e])
                }, f.prototype.prefixedCss = function(e) {
                    var n = ["webkit", "moz", "ms", "o"],
                      f = this.css(e);
                    return void 0 === f && n.some(function(n) {
                        return f = this.css(n + e.substr(0, 1).toUpperCase() + e.substr(1)), void 0 !== f
                    }, this), void 0 === f ? null : f
                }, f.prototype.computedStyle = function(e) {
                    return this.node.ownerDocument.defaultView.getComputedStyle(this.node, e)
                }, f.prototype.cssInt = function(e) {
                    var n = parseInt(this.css(e), 10);
                    return isNaN(n) ? 0 : n
                }, f.prototype.color = function(e) {
                    return this.colors[e] || (this.colors[e] = new s(this.css(e)))
                }, f.prototype.cssFloat = function(e) {
                    var n = parseFloat(this.css(e));
                    return isNaN(n) ? 0 : n
                }, f.prototype.fontWeight = function() {
                    var e = this.css("fontWeight");
                    switch (parseInt(e, 10)) {
                        case 401:
                            e = "bold";
                            break;
                        case 400:
                            e = "normal"
                    }
                    return e
                }, f.prototype.parseClip = function() {
                    var e = this.css("clip").match(this.CLIP);
                    return e ? {
                        top: parseInt(e[1], 10),
                        right: parseInt(e[2], 10),
                        bottom: parseInt(e[3], 10),
                        left: parseInt(e[4], 10)
                    } : null
                }, f.prototype.parseBackgroundImages = function() {
                    return this.backgroundImages || (this.backgroundImages = p(this.css("backgroundImage")))
                }, f.prototype.cssList = function(e, n) {
                    var f = (this.css(e) || "").split(",");
                    return f = f[n || 0] || f[0] || "auto", f = f.trim().split(" "), 1 === f.length && (f = [f[0], i(f[0]) ? "auto" : f[0]]), f
                }, f.prototype.parseBackgroundSize = function(e, n, f) {
                    var o, d, t = this.cssList("backgroundSize", f);
                    if (i(t[0])) o = e.width * parseFloat(t[0]) / 100;
                    else {
                        if (/contain|cover/.test(t[0])) {
                            var l = e.width / e.height,
                              s = n.width / n.height;
                            return s > l ^ "contain" === t[0] ? {
                                width: e.height * s,
                                height: e.height
                            } : {
                                width: e.width,
                                height: e.width / s
                            }
                        }
                        o = parseInt(t[0], 10)
                    }
                    return d = "auto" === t[0] && "auto" === t[1] ? n.height : "auto" === t[1] ? o / n.width * n.height : i(t[1]) ? e.height * parseFloat(t[1]) / 100 : parseInt(t[1], 10), "auto" === t[0] && (o = d / n.height * n.width), {
                        width: o,
                        height: d
                    }
                }, f.prototype.parseBackgroundPosition = function(e, n, f, o) {
                    var d, t, l = this.cssList("backgroundPosition", f);
                    return d = i(l[0]) ? (e.width - (o || n).width) * (parseFloat(l[0]) / 100) : parseInt(l[0], 10), t = "auto" === l[1] ? d / n.width * n.height : i(l[1]) ? (e.height - (o || n).height) * parseFloat(l[1]) / 100 : parseInt(l[1], 10), "auto" === l[0] && (d = t / n.height * n.width), {
                        left: d,
                        top: t
                    }
                }, f.prototype.parseBackgroundRepeat = function(e) {
                    return this.cssList("backgroundRepeat", e)[0]
                }, f.prototype.parseTextShadows = function() {
                    var e = this.css("textShadow"),
                      n = [];
                    if (e && "none" !== e)
                        for (var f = e.match(this.TEXT_SHADOW_PROPERTY), o = 0; f && o < f.length; o++) {
                            var d = f[o].match(this.TEXT_SHADOW_VALUES);
                            n.push({
                                color: new s(d[0]),
                                offsetX: d[1] ? parseFloat(d[1].replace("px", "")) : 0,
                                offsetY: d[2] ? parseFloat(d[2].replace("px", "")) : 0,
                                blur: d[3] ? d[3].replace("px", "") : 0
                            })
                        }
                    return n
                }, f.prototype.parseTransform = function() {
                    if (!this.transformData)
                        if (this.hasTransform()) {
                            var e = this.parseBounds(),
                              n = this.prefixedCss("transformOrigin").split(" ").map(t).map(l);
                            n[0] += e.left, n[1] += e.top, this.transformData = {
                                origin: n,
                                matrix: this.parseTransformMatrix()
                            }
                        } else this.transformData = {
                            origin: [0, 0],
                            matrix: [1, 0, 0, 1, 0, 0]
                        };
                    return this.transformData
                }, f.prototype.parseTransformMatrix = function() {
                    if (!this.transformMatrix) {
                        var e = this.prefixedCss("transform"),
                          n = e ? d(e.match(this.MATRIX_PROPERTY)) : null;
                        this.transformMatrix = n ? n : [1, 0, 0, 1, 0, 0]
                    }
                    return this.transformMatrix
                }, f.prototype.parseBounds = function() {
                    return this.bounds || (this.bounds = this.hasTransform() ? c(this.node) : a(this.node))
                }, f.prototype.hasTransform = function() {
                    return "1,0,0,1,0,0" !== this.parseTransformMatrix().join(",") || this.parent && this.parent.hasTransform()
                }, f.prototype.getValue = function() {
                    var e = this.node.value || "";
                    return "SELECT" === this.node.tagName ? e = o(this.node) : "password" === this.node.type && (e = Array(e.length + 1).join("•")), 0 === e.length ? this.node.placeholder || "" : e
                }, f.prototype.MATRIX_PROPERTY = /(matrix)\((.+)\)/, f.prototype.TEXT_SHADOW_PROPERTY = /((rgba|rgb)\([^\)]+\)(\s-?\d+px){0,})/g, f.prototype.TEXT_SHADOW_VALUES = /(-?\d+px)|(#.+)|(rgb\(.+\))|(rgba\(.+\))/g, f.prototype.CLIP = /^rect\((\d+)px,? (\d+)px,? (\d+)px,? (\d+)px\)$/, n.exports = f
            }, {
                "./color": 5,
                "./utils": 29
            }
        ],
        17: [
            function(e, n) {
                function f(e, n, f, o, d) {
                    N("Starting NodeParser"), this.renderer = n, this.options = d, this.range = null, this.support = f, this.renderQueue = [], this.stack = new V(!0, 1, e.ownerDocument, null);
                    var i = new P(e, null);
                    if (d.background && n.rectangle(0, 0, n.width, n.height, new T(d.background)), e === e.ownerDocument.documentElement) {
                        var t = new P(i.color("backgroundColor").isTransparent() ? e.ownerDocument.body : e.ownerDocument.documentElement, null);
                        n.rectangle(0, 0, n.width, n.height, t.color("backgroundColor"))
                    }
                    i.visibile = i.isElementVisible(), this.createPseudoHideStyles(e.ownerDocument), this.disableAnimations(e.ownerDocument), this.nodes = I([i].concat(this.getChildren(i)).filter(function(e) {
                        return e.visible = e.isElementVisible()
                    }).map(this.getPseudoElements, this)), this.fontMetrics = new S, N("Fetched nodes, total:", this.nodes.length), N("Calculate overflow clips"), this.calculateOverflowClips(), N("Start fetching images"), this.images = o.fetch(this.nodes.filter(A)), this.ready = this.images.ready.then(X(function() {
                        return N("Images loaded, starting parsing"), N("Creating stacking contexts"), this.createStackingContexts(), N("Sorting stacking contexts"), this.sortStackingContexts(this.stack), this.parse(this.stack), N("Render queue created with " + this.renderQueue.length + " items"), new U(X(function(e) {
                            d.async ? "function" == typeof d.async ? d.async.call(this, this.renderQueue, e) : this.renderQueue.length > 0 ? (this.renderIndex = 0, this.asyncRenderer(this.renderQueue, e)) : e() : (this.renderQueue.forEach(this.paint, this), e())
                        }, this))
                    }, this))
                }

                function o(e) {
                    return e.parent && e.parent.clip.length
                }

                function d(e) {
                    return e.replace(/(\-[a-z])/g, function(e) {
                        return e.toUpperCase().replace("-", "")
                    })
                }

                function i() {}

                function t(e, n, f, o) {
                    return e.map(function(d, i) {
                        if (d.width > 0) {
                            var t = n.left,
                              l = n.top,
                              s = n.width,
                              u = n.height - e[2].width;
                            switch (i) {
                                case 0:
                                    u = e[0].width, d.args = a({
                                        c1: [t, l],
                                        c2: [t + s, l],
                                        c3: [t + s - e[1].width, l + u],
                                        c4: [t + e[3].width, l + u]
                                    }, o[0], o[1], f.topLeftOuter, f.topLeftInner, f.topRightOuter, f.topRightInner);
                                    break;
                                case 1:
                                    t = n.left + n.width - e[1].width, s = e[1].width, d.args = a({
                                        c1: [t + s, l],
                                        c2: [t + s, l + u + e[2].width],
                                        c3: [t, l + u],
                                        c4: [t, l + e[0].width]
                                    }, o[1], o[2], f.topRightOuter, f.topRightInner, f.bottomRightOuter, f.bottomRightInner);
                                    break;
                                case 2:
                                    l = l + n.height - e[2].width, u = e[2].width, d.args = a({
                                        c1: [t + s, l + u],
                                        c2: [t, l + u],
                                        c3: [t + e[3].width, l],
                                        c4: [t + s - e[3].width, l]
                                    }, o[2], o[3], f.bottomRightOuter, f.bottomRightInner, f.bottomLeftOuter, f.bottomLeftInner);
                                    break;
                                case 3:
                                    s = e[3].width, d.args = a({
                                        c1: [t, l + u + e[2].width],
                                        c2: [t, l],
                                        c3: [t + s, l + e[0].width],
                                        c4: [t + s, l + u]
                                    }, o[3], o[0], f.bottomLeftOuter, f.bottomLeftInner, f.topLeftOuter, f.topLeftInner)
                            }
                        }
                        return d
                    })
                }

                function l(e, n, f, o) {
                    var d = 4 * ((Math.sqrt(2) - 1) / 3),
                      i = f * d,
                      t = o * d,
                      l = e + f,
                      s = n + o;
                    return {
                        topLeft: u({
                            x: e,
                            y: s
                        }, {
                            x: e,
                            y: s - t
                        }, {
                            x: l - i,
                            y: n
                        }, {
                            x: l,
                            y: n
                        }),
                        topRight: u({
                            x: e,
                            y: n
                        }, {
                            x: e + i,
                            y: n
                        }, {
                            x: l,
                            y: s - t
                        }, {
                            x: l,
                            y: s
                        }),
                        bottomRight: u({
                            x: l,
                            y: n
                        }, {
                            x: l,
                            y: n + t
                        }, {
                            x: e + i,
                            y: s
                        }, {
                            x: e,
                            y: s
                        }),
                        bottomLeft: u({
                            x: l,
                            y: s
                        }, {
                            x: l - i,
                            y: s
                        }, {
                            x: e,
                            y: n + t
                        }, {
                            x: e,
                            y: n
                        })
                    }
                }

                function s(e, n, f) {
                    var o = e.left,
                      d = e.top,
                      i = e.width,
                      t = e.height,
                      s = n[0][0],
                      u = n[0][1],
                      a = n[1][0],
                      p = n[1][1],
                      c = n[2][0],
                      y = n[2][1],
                      m = n[3][0],
                      r = n[3][1],
                      v = i - a,
                      w = t - y,
                      b = i - c,
                      g = t - r;
                    return {
                        topLeftOuter: l(o, d, s, u).topLeft.subdivide(.5),
                        topLeftInner: l(o + f[3].width, d + f[0].width, Math.max(0, s - f[3].width), Math.max(0, u - f[0].width)).topLeft.subdivide(.5),
                        topRightOuter: l(o + v, d, a, p).topRight.subdivide(.5),
                        topRightInner: l(o + Math.min(v, i + f[3].width), d + f[0].width, v > i + f[3].width ? 0 : a - f[3].width, p - f[0].width).topRight.subdivide(.5),
                        bottomRightOuter: l(o + b, d + w, c, y).bottomRight.subdivide(.5),
                        bottomRightInner: l(o + Math.min(b, i - f[3].width), d + Math.min(w, t + f[0].width), Math.max(0, c - f[1].width), y - f[2].width).bottomRight.subdivide(.5),
                        bottomLeftOuter: l(o, d + g, m, r).bottomLeft.subdivide(.5),
                        bottomLeftInner: l(o + f[3].width, d + g, Math.max(0, m - f[3].width), r - f[2].width).bottomLeft.subdivide(.5)
                    }
                }

                function u(e, n, f, o) {
                    var d = function(e, n, f) {
                        return {
                            x: e.x + (n.x - e.x) * f,
                            y: e.y + (n.y - e.y) * f
                        }
                    };
                    return {
                        start: e,
                        startControl: n,
                        endControl: f,
                        end: o,
                        subdivide: function(i) {
                            var t = d(e, n, i),
                              l = d(n, f, i),
                              s = d(f, o, i),
                              a = d(t, l, i),
                              p = d(l, s, i),
                              c = d(a, p, i);
                            return [u(e, t, a, c), u(c, p, s, o)]
                        },
                        curveTo: function(e) {
                            e.push(["bezierCurve", n.x, n.y, f.x, f.y, o.x, o.y])
                        },
                        curveToReversed: function(o) {
                            o.push(["bezierCurve", f.x, f.y, n.x, n.y, e.x, e.y])
                        }
                    }
                }

                function a(e, n, f, o, d, i, t) {
                    var l = [];
                    return n[0] > 0 || n[1] > 0 ? (l.push(["line", o[1].start.x, o[1].start.y]), o[1].curveTo(l)) : l.push(["line", e.c1[0], e.c1[1]]), f[0] > 0 || f[1] > 0 ? (l.push(["line", i[0].start.x, i[0].start.y]), i[0].curveTo(l), l.push(["line", t[0].end.x, t[0].end.y]), t[0].curveToReversed(l)) : (l.push(["line", e.c2[0], e.c2[1]]), l.push(["line", e.c3[0], e.c3[1]])), n[0] > 0 || n[1] > 0 ? (l.push(["line", d[1].end.x, d[1].end.y]), d[1].curveToReversed(l)) : l.push(["line", e.c4[0], e.c4[1]]), l
                }

                function p(e, n, f, o, d, i, t) {
                    n[0] > 0 || n[1] > 0 ? (e.push(["line", o[0].start.x, o[0].start.y]), o[0].curveTo(e), o[1].curveTo(e)) : e.push(["line", i, t]), (f[0] > 0 || f[1] > 0) && e.push(["line", d[0].start.x, d[0].start.y])
                }

                function c(e) {
                    return e.cssInt("zIndex") < 0
                }

                function y(e) {
                    return e.cssInt("zIndex") > 0
                }

                function m(e) {
                    return 0 === e.cssInt("zIndex")
                }

                function r(e) {
                    return -1 !== ["inline", "inline-block", "inline-table"].indexOf(e.css("display"))
                }

                function v(e) {
                    return e instanceof V
                }

                function w(e) {
                    return e.node.data.trim().length > 0
                }

                function b(e) {
                    return /^(normal|none|0px)$/.test(e.parent.css("letterSpacing"))
                }

                function g(e) {
                    return ["TopLeft", "TopRight", "BottomRight", "BottomLeft"].map(function(n) {
                        var f = e.css("border" + n + "Radius"),
                          o = f.split(" ");
                        return o.length <= 1 && (o[1] = o[0]), o.map(F)
                    })
                }

                function h(e) {
                    return e.nodeType === Node.TEXT_NODE || e.nodeType === Node.ELEMENT_NODE
                }

                function x(e) {
                    var n = e.css("position"),
                      f = -1 !== ["absolute", "relative", "fixed"].indexOf(n) ? e.css("zIndex") : "auto";
                    return "auto" !== f
                }

                function j(e) {
                    return "static" !== e.css("position")
                }

                function k(e) {
                    return "none" !== e.css("float")
                }

                function q(e) {
                    return -1 !== ["inline-block", "inline-table"].indexOf(e.css("display"))
                }

                function z(e) {
                    var n = this;
                    return function() {
                        return !e.apply(n, arguments)
                    }
                }

                function A(e) {
                    return e.node.nodeType === Node.ELEMENT_NODE
                }

                function B(e) {
                    return e.isPseudoElement === !0
                }

                function C(e) {
                    return e.node.nodeType === Node.TEXT_NODE
                }

                function D(e) {
                    return function(n, f) {
                        return n.cssInt("zIndex") + e.indexOf(n) / e.length - (f.cssInt("zIndex") + e.indexOf(f) / e.length)
                    }
                }

                function E(e) {
                    return e.getOpacity() < 1
                }

                function F(e) {
                    return parseInt(e, 10)
                }

                function G(e) {
                    return e.width
                }

                function H(e) {
                    return e.node.nodeType !== Node.ELEMENT_NODE || -1 === ["SCRIPT", "HEAD", "TITLE", "OBJECT", "BR", "OPTION"].indexOf(e.node.nodeName)
                }

                function I(e) {
                    return [].concat.apply([], e)
                }

                function J(e) {
                    var n = e.substr(0, 1);
                    return n === e.substr(e.length - 1) && n.match(/'|"/) ? e.substr(1, e.length - 2) : e
                }

                function K(e) {
                    for (var n, f = [], o = 0, d = !1; e.length;) L(e[o]) === d ? (n = e.splice(0, o), n.length && f.push(O.ucs2.encode(n)), d = !d, o = 0) : o++, o >= e.length && (n = e.splice(0, o), n.length && f.push(O.ucs2.encode(n)));
                    return f
                }

                function L(e) {
                    return -1 !== [32, 13, 10, 9, 45].indexOf(e)
                }

                function M(e) {
                    return /[^\u0000-\u00ff]/.test(e)
                }
                var N = e("./log"),
                  O = e("punycode"),
                  P = e("./nodecontainer"),
                  Q = e("./textcontainer"),
                  R = e("./pseudoelementcontainer"),
                  S = e("./fontmetrics"),
                  T = e("./color"),
                  U = e("./promise"),
                  V = e("./stackingcontext"),
                  W = e("./utils"),
                  X = W.bind,
                  Y = W.getBounds,
                  Z = W.parseBackgrounds,
                  $ = W.offsetBounds;
                f.prototype.calculateOverflowClips = function() {
                    this.nodes.forEach(function(e) {
                        if (A(e)) {
                            B(e) && e.appendToDOM(), e.borders = this.parseBorders(e);
                            var n = "hidden" === e.css("overflow") ? [e.borders.clip] : [],
                              f = e.parseClip();
                            f && -1 !== ["absolute", "fixed"].indexOf(e.css("position")) && n.push([
                                ["rect", e.bounds.left + f.left, e.bounds.top + f.top, f.right - f.left, f.bottom - f.top]
                            ]), e.clip = o(e) ? e.parent.clip.concat(n) : n, e.backgroundClip = "hidden" !== e.css("overflow") ? e.clip.concat([e.borders.clip]) : e.clip, B(e) && e.cleanDOM()
                        } else C(e) && (e.clip = o(e) ? e.parent.clip : []);
                        B(e) || (e.bounds = null)
                    }, this)
                }, f.prototype.asyncRenderer = function(e, n, f) {
                    f = f || Date.now(), this.paint(e[this.renderIndex++]), e.length === this.renderIndex ? n() : f + 20 > Date.now() ? this.asyncRenderer(e, n, f) : setTimeout(X(function() {
                        this.asyncRenderer(e, n)
                    }, this), 0)
                }, f.prototype.createPseudoHideStyles = function(e) {
                    this.createStyles(e, "." + R.prototype.PSEUDO_HIDE_ELEMENT_CLASS_BEFORE + ':before { content: "" !important; display: none !important; }.' + R.prototype.PSEUDO_HIDE_ELEMENT_CLASS_AFTER + ':after { content: "" !important; display: none !important; }')
                }, f.prototype.disableAnimations = function(e) {
                    this.createStyles(e, "* { -webkit-animation: none !important; -moz-animation: none !important; -o-animation: none !important; animation: none !important; -webkit-transition: none !important; -moz-transition: none !important; -o-transition: none !important; transition: none !important;}")
                }, f.prototype.createStyles = function(e, n) {
                    var f = e.createElement("style");
                    f.innerHTML = n, e.body.appendChild(f)
                }, f.prototype.getPseudoElements = function(e) {
                    var n = [
                        [e]
                    ];
                    if (e.node.nodeType === Node.ELEMENT_NODE) {
                        var f = this.getPseudoElement(e, ":before"),
                          o = this.getPseudoElement(e, ":after");
                        f && n.push(f), o && n.push(o)
                    }
                    return I(n)
                }, f.prototype.getPseudoElement = function(e, n) {
                    var f = e.computedStyle(n);
                    if (!f || !f.content || "none" === f.content || "-moz-alt-content" === f.content || "none" === f.display) return null;
                    for (var o = J(f.content), i = "url" === o.substr(0, 3), t = document.createElement(i ? "img" : "html2canvaspseudoelement"), l = new R(t, e, n), s = f.length - 1; s >= 0; s--) {
                        var u = d(f.item(s));
                        t.style[u] = f[u]
                    }
                    if (t.className = R.prototype.PSEUDO_HIDE_ELEMENT_CLASS_BEFORE + " " + R.prototype.PSEUDO_HIDE_ELEMENT_CLASS_AFTER, i) return t.src = Z(o)[0].args[0], [l];
                    var a = document.createTextNode(o);
                    return t.appendChild(a), [l, new Q(a, l)]
                }, f.prototype.getChildren = function(e) {
                    return I([].filter.call(e.node.childNodes, h).map(function(n) {
                        var f = [n.nodeType === Node.TEXT_NODE ? new Q(n, e) : new P(n, e)].filter(H);
                        return n.nodeType === Node.ELEMENT_NODE && f.length && "TEXTAREA" !== n.tagName ? f[0].isElementVisible() ? f.concat(this.getChildren(f[0])) : [] : f
                    }, this))
                }, f.prototype.newStackingContext = function(e, n) {
                    var f = new V(n, e.getOpacity(), e.node, e.parent);
                    e.cloneTo(f);
                    var o = n ? f.getParentStack(this) : f.parent.stack;
                    o.contexts.push(f), e.stack = f
                }, f.prototype.createStackingContexts = function() {
                    this.nodes.forEach(function(e) {
                        A(e) && (this.isRootElement(e) || E(e) || x(e) || this.isBodyWithTransparentRoot(e) || e.hasTransform()) ? this.newStackingContext(e, !0) : A(e) && (j(e) && m(e) || q(e) || k(e)) ? this.newStackingContext(e, !1) : e.assignStack(e.parent.stack)
                    }, this)
                }, f.prototype.isBodyWithTransparentRoot = function(e) {
                    return "BODY" === e.node.nodeName && e.parent.color("backgroundColor").isTransparent()
                }, f.prototype.isRootElement = function(e) {
                    return null === e.parent
                }, f.prototype.sortStackingContexts = function(e) {
                    e.contexts.sort(D(e.contexts.slice(0))), e.contexts.forEach(this.sortStackingContexts, this)
                }, f.prototype.parseTextBounds = function(e) {
                    return function(n, f, o) {
                        if ("none" !== e.parent.css("textDecoration").substr(0, 4) || 0 !== n.trim().length) {
                            if (this.support.rangeBounds && !e.parent.hasTransform()) {
                                var d = o.slice(0, f).join("").length;
                                return this.getRangeBounds(e.node, d, n.length)
                            }
                            if (e.node && "string" == typeof e.node.data) {
                                var i = e.node.splitText(n.length),
                                  t = this.getWrapperBounds(e.node, e.parent.hasTransform());
                                return e.node = i, t
                            }
                        } else(!this.support.rangeBounds || e.parent.hasTransform()) && (e.node = e.node.splitText(n.length));
                        return {}
                    }
                }, f.prototype.getWrapperBounds = function(e, n) {
                    var f = e.ownerDocument.createElement("html2canvaswrapper"),
                      o = e.parentNode,
                      d = e.cloneNode(!0);
                    f.appendChild(e.cloneNode(!0)), o.replaceChild(f, e);
                    var i = n ? $(f) : Y(f);
                    return o.replaceChild(d, f), i
                }, f.prototype.getRangeBounds = function(e, n, f) {
                    var o = this.range || (this.range = e.ownerDocument.createRange());
                    return o.setStart(e, n), o.setEnd(e, n + f), o.getBoundingClientRect()
                }, f.prototype.parse = function(e) {
                    var n = e.contexts.filter(c),
                      f = e.children.filter(A),
                      o = f.filter(z(k)),
                      d = o.filter(z(j)).filter(z(r)),
                      t = f.filter(z(j)).filter(k),
                      l = o.filter(z(j)).filter(r),
                      s = e.contexts.concat(o.filter(j)).filter(m),
                      u = e.children.filter(C).filter(w),
                      a = e.contexts.filter(y);
                    n.concat(d).concat(t).concat(l).concat(s).concat(u).concat(a).forEach(function(e) {
                        this.renderQueue.push(e), v(e) && (this.parse(e), this.renderQueue.push(new i))
                    }, this)
                }, f.prototype.paint = function(e) {
                    try {
                        e instanceof i ? this.renderer.ctx.restore() : C(e) ? (B(e.parent) && e.parent.appendToDOM(), this.paintText(e), B(e.parent) && e.parent.cleanDOM()) : this.paintNode(e)
                    } catch (n) {
                        if (N(n), this.options.strict) throw n
                    }
                }, f.prototype.paintNode = function(e) {
                    v(e) && (this.renderer.setOpacity(e.opacity), this.renderer.ctx.save(), e.hasTransform() && this.renderer.setTransform(e.parseTransform())), "INPUT" === e.node.nodeName && "checkbox" === e.node.type ? this.paintCheckbox(e) : "INPUT" === e.node.nodeName && "radio" === e.node.type ? this.paintRadio(e) : this.paintElement(e)
                }, f.prototype.paintElement = function(e) {
                    var n = e.parseBounds();
                    this.renderer.clip(e.backgroundClip, function() {
                        this.renderer.renderBackground(e, n, e.borders.borders.map(G))
                    }, this), this.renderer.clip(e.clip, function() {
                        this.renderer.renderBorders(e.borders.borders)
                    }, this), this.renderer.clip(e.backgroundClip, function() {
                        switch (e.node.nodeName) {
                            case "svg":
                            case "IFRAME":
                                var f = this.images.get(e.node);
                                f ? this.renderer.renderImage(e, n, e.borders, f) : N("Error loading <" + e.node.nodeName + ">", e.node);
                                break;
                            case "IMG":
                                var o = this.images.get(e.node.src);
                                o ? this.renderer.renderImage(e, n, e.borders, o) : N("Error loading <img>", e.node.src);
                                break;
                            case "CANVAS":
                                this.renderer.renderImage(e, n, e.borders, {
                                    image: e.node
                                });
                                break;
                            case "SELECT":
                            case "INPUT":
                            case "TEXTAREA":
                                this.paintFormValue(e)
                        }
                    }, this)
                }, f.prototype.paintCheckbox = function(e) {
                    var n = e.parseBounds(),
                      f = Math.min(n.width, n.height),
                      o = {
                          width: f - 1,
                          height: f - 1,
                          top: n.top,
                          left: n.left
                      }, d = [3, 3],
                      i = [d, d, d, d],
                      l = [1, 1, 1, 1].map(function(e) {
                          return {
                              color: new T("#A5A5A5"),
                              width: e
                          }
                      }),
                      u = s(o, i, l);
                    this.renderer.clip(e.backgroundClip, function() {
                        this.renderer.rectangle(o.left + 1, o.top + 1, o.width - 2, o.height - 2, new T("#DEDEDE")), this.renderer.renderBorders(t(l, o, u, i)), e.node.checked && (this.renderer.font(new T("#424242"), "normal", "normal", "bold", f - 3 + "px", "arial"), this.renderer.text("✔", o.left + f / 6, o.top + f - 1))
                    }, this)
                }, f.prototype.paintRadio = function(e) {
                    var n = e.parseBounds(),
                      f = Math.min(n.width, n.height) - 2;
                    this.renderer.clip(e.backgroundClip, function() {
                        this.renderer.circleStroke(n.left + 1, n.top + 1, f, new T("#DEDEDE"), 1, new T("#A5A5A5")), e.node.checked && this.renderer.circle(Math.ceil(n.left + f / 4) + 1, Math.ceil(n.top + f / 4) + 1, Math.floor(f / 2), new T("#424242"))
                    }, this)
                }, f.prototype.paintFormValue = function(e) {
                    var n = e.getValue();
                    if (n.length > 0) {
                        var f = e.node.ownerDocument,
                          o = f.createElement("html2canvaswrapper"),
                          d = ["lineHeight", "textAlign", "fontFamily", "fontWeight", "fontSize", "color", "paddingLeft", "paddingTop", "paddingRight", "paddingBottom", "width", "height", "borderLeftStyle", "borderTopStyle", "borderLeftWidth", "borderTopWidth", "boxSizing", "whiteSpace", "wordWrap"];
                        d.forEach(function(n) {
                            try {
                                o.style[n] = e.css(n)
                            } catch (f) {
                                N("html2canvas: Parse: Exception caught in renderFormValue: " + f.message)
                            }
                        });
                        var i = e.parseBounds();
                        o.style.position = "fixed", o.style.left = i.left + "px", o.style.top = i.top + "px", o.textContent = n, f.body.appendChild(o), this.paintText(new Q(o.firstChild, e)), f.body.removeChild(o)
                    }
                }, f.prototype.paintText = function(e) {
                    e.applyTextTransform();
                    var n = O.ucs2.decode(e.node.data),
                      f = this.options.letterRendering && !b(e) || M(e.node.data) ? n.map(function(e) {
                          return O.ucs2.encode([e])
                      }) : K(n),
                      o = e.parent.fontWeight(),
                      d = e.parent.css("fontSize"),
                      i = e.parent.css("fontFamily"),
                      t = e.parent.parseTextShadows();
                    this.renderer.font(e.parent.color("color"), e.parent.css("fontStyle"), e.parent.css("fontVariant"), o, d, i), t.length ? this.renderer.fontShadow(t[0].color, t[0].offsetX, t[0].offsetY, t[0].blur) : this.renderer.clearShadow(), this.renderer.clip(e.parent.clip, function() {
                        f.map(this.parseTextBounds(e), this).forEach(function(n, o) {
                            n && (this.renderer.text(f[o], n.left, n.bottom), this.renderTextDecoration(e.parent, n, this.fontMetrics.getMetrics(i, d)))
                        }, this)
                    }, this)
                }, f.prototype.renderTextDecoration = function(e, n, f) {
                    switch (e.css("textDecoration").split(" ")[0]) {
                        case "underline":
                            this.renderer.rectangle(n.left, Math.round(n.top + f.baseline + f.lineWidth), n.width, 1, e.color("color"));
                            break;
                        case "overline":
                            this.renderer.rectangle(n.left, Math.round(n.top), n.width, 1, e.color("color"));
                            break;
                        case "line-through":
                            this.renderer.rectangle(n.left, Math.ceil(n.top + f.middle + f.lineWidth), n.width, 1, e.color("color"))
                    }
                };
                var _ = {
                    inset: [
                        ["darken", .6],
                        ["darken", .1],
                        ["darken", .1],
                        ["darken", .6]
                    ]
                };
                f.prototype.parseBorders = function(e) {
                    var n = e.parseBounds(),
                      f = g(e),
                      o = ["Top", "Right", "Bottom", "Left"].map(function(n, f) {
                          var o = e.css("border" + n + "Style"),
                            d = e.color("border" + n + "Color");
                          "inset" === o && d.isBlack() && (d = new T([255, 255, 255, d.a]));
                          var i = _[o] ? _[o][f] : null;
                          return {
                              width: e.cssInt("border" + n + "Width"),
                              color: i ? d[i[0]](i[1]) : d,
                              args: null
                          }
                      }),
                      d = s(n, f, o);
                    return {
                        clip: this.parseBackgroundClip(e, d, o, f, n),
                        borders: t(o, n, d, f)
                    }
                }, f.prototype.parseBackgroundClip = function(e, n, f, o, d) {
                    var i = e.css("backgroundClip"),
                      t = [];
                    switch (i) {
                        case "content-box":
                        case "padding-box":
                            p(t, o[0], o[1], n.topLeftInner, n.topRightInner, d.left + f[3].width, d.top + f[0].width), p(t, o[1], o[2], n.topRightInner, n.bottomRightInner, d.left + d.width - f[1].width, d.top + f[0].width), p(t, o[2], o[3], n.bottomRightInner, n.bottomLeftInner, d.left + d.width - f[1].width, d.top + d.height - f[2].width), p(t, o[3], o[0], n.bottomLeftInner, n.topLeftInner, d.left + f[3].width, d.top + d.height - f[2].width);
                            break;
                        default:
                            p(t, o[0], o[1], n.topLeftOuter, n.topRightOuter, d.left, d.top), p(t, o[1], o[2], n.topRightOuter, n.bottomRightOuter, d.left + d.width, d.top), p(t, o[2], o[3], n.bottomRightOuter, n.bottomLeftOuter, d.left + d.width, d.top + d.height), p(t, o[3], o[0], n.bottomLeftOuter, n.topLeftOuter, d.left, d.top + d.height)
                    }
                    return t
                }, n.exports = f
            }, {
                "./color": 5,
                "./fontmetrics": 9,
                "./log": 15,
                "./nodecontainer": 16,
                "./promise": 18,
                "./pseudoelementcontainer": 21,
                "./stackingcontext": 24,
                "./textcontainer": 28,
                "./utils": 29,
                punycode: 3
            }
        ],
        18: [
            function(e, n) {
                n.exports = e("es6-promise").Promise
            }, {
                "es6-promise": 1
            }
        ],
        19: [
            function(e, n, f) {
                function o(e, n, f) {
                    var o = "withCredentials" in new XMLHttpRequest;
                    if (!n) return a.reject("No proxy configured");
                    var d = t(o),
                      s = l(n, e, d);
                    return o ? p(s) : i(f, s, d).then(function(e) {
                        return r(e.content)
                    })
                }

                function d(e, n, f) {
                    var o = "crossOrigin" in new Image,
                      d = t(o),
                      s = l(n, e, d);
                    return o ? a.resolve(s) : i(f, s, d).then(function(e) {
                        return "data:" + e.type + ";base64," + e.content
                    })
                }

                function i(e, n, f) {
                    return new a(function(o, d) {
                        var i = e.createElement("script"),
                          t = function() {
                              delete window.html2canvas.proxy[f], e.body.removeChild(i)
                          };
                        window.html2canvas.proxy[f] = function(e) {
                            t(), o(e)
                        }, i.src = n, i.onerror = function(e) {
                            t(), d(e)
                        }, e.body.appendChild(i)
                    })
                }

                function t(e) {
                    return e ? "" : "html2canvas_" + Date.now() + "_" + ++v + "_" + Math.round(1e5 * Math.random())
                }

                function l(e, n, f) {
                    return e + "?url=" + encodeURIComponent(n) + (f.length ? "&callback=html2canvas.proxy." + f : "")
                }

                function s(e) {
                    return function(n) {
                        var f, o = new DOMParser;
                        try {
                            f = o.parseFromString(n, "text/html")
                        } catch (d) {
                            y("DOMParser not supported, falling back to createHTMLDocument"), f = document.implementation.createHTMLDocument("");
                            try {
                                f.open(), f.write(n), f.close()
                            } catch (i) {
                                y("createHTMLDocument write not supported, falling back to document.body.innerHTML"), f.body.innerHTML = n
                            }
                        }
                        var t = f.querySelector("base");
                        if (!t || !t.href.host) {
                            var l = f.createElement("base");
                            l.href = e, f.head.insertBefore(l, f.head.firstChild)
                        }
                        return f
                    }
                }

                function u(e, n, f, d, i, t) {
                    return new o(e, n, window.document).then(s(e)).then(function(e) {
                        return m(e, f, d, i, t, 0, 0)
                    })
                }
                var a = e("./promise"),
                  p = e("./xhr"),
                  c = e("./utils"),
                  y = e("./log"),
                  m = e("./clone"),
                  r = c.decode64,
                  v = 0;
                f.Proxy = o, f.ProxyURL = d, f.loadUrlDocument = u
            }, {
                "./clone": 4,
                "./log": 15,
                "./promise": 18,
                "./utils": 29,
                "./xhr": 31
            }
        ],
        20: [
            function(e, n) {
                function f(e, n) {
                    var f = document.createElement("a");
                    f.href = e, e = f.href, this.src = e, this.image = new Image;
                    var i = this;
                    this.promise = new d(function(f, d) {
                        i.image.crossOrigin = "Anonymous", i.image.onload = f, i.image.onerror = d, new o(e, n, document).then(function(e) {
                            i.image.src = e
                        })["catch"](d)
                    })
                }
                var o = e("./proxy").ProxyURL,
                  d = e("./promise");
                n.exports = f
            }, {
                "./promise": 18,
                "./proxy": 19
            }
        ],
        21: [
            function(e, n) {
                function f(e, n, f) {
                    o.call(this, e, n), this.isPseudoElement = !0, this.before = ":before" === f
                }
                var o = e("./nodecontainer");
                f.prototype.cloneTo = function(e) {
                    f.prototype.cloneTo.call(this, e), e.isPseudoElement = !0, e.before = this.before
                }, f.prototype = Object.create(o.prototype), f.prototype.appendToDOM = function() {
                    this.before ? this.parent.node.insertBefore(this.node, this.parent.node.firstChild) : this.parent.node.appendChild(this.node), this.parent.node.className += " " + this.getHideClass()
                }, f.prototype.cleanDOM = function() {
                    this.node.parentNode.removeChild(this.node), this.parent.node.className = this.parent.node.className.replace(this.getHideClass(), "")
                }, f.prototype.getHideClass = function() {
                    return this["PSEUDO_HIDE_ELEMENT_CLASS_" + (this.before ? "BEFORE" : "AFTER")]
                }, f.prototype.PSEUDO_HIDE_ELEMENT_CLASS_BEFORE = "___html2canvas___pseudoelement_before", f.prototype.PSEUDO_HIDE_ELEMENT_CLASS_AFTER = "___html2canvas___pseudoelement_after", n.exports = f
            }, {
                "./nodecontainer": 16
            }
        ],
        22: [
            function(e, n) {
                function f(e, n, f, o, d) {
                    this.width = e, this.height = n, this.images = f, this.options = o, this.document = d
                }
                var o = e("./log");
                f.prototype.renderImage = function(e, n, f, o) {
                    var d = e.cssInt("paddingLeft"),
                      i = e.cssInt("paddingTop"),
                      t = e.cssInt("paddingRight"),
                      l = e.cssInt("paddingBottom"),
                      s = f.borders,
                      u = n.width - (s[1].width + s[3].width + d + t),
                      a = n.height - (s[0].width + s[2].width + i + l);
                    this.drawImage(o, 0, 0, o.image.width || u, o.image.height || a, n.left + d + s[3].width, n.top + i + s[0].width, u, a)
                }, f.prototype.renderBackground = function(e, n, f) {
                    n.height > 0 && n.width > 0 && (this.renderBackgroundColor(e, n), this.renderBackgroundImage(e, n, f))
                }, f.prototype.renderBackgroundColor = function(e, n) {
                    var f = e.color("backgroundColor");
                    f.isTransparent() || this.rectangle(n.left, n.top, n.width, n.height, f)
                }, f.prototype.renderBorders = function(e) {
                    e.forEach(this.renderBorder, this)
                }, f.prototype.renderBorder = function(e) {
                    e.color.isTransparent() || null === e.args || this.drawShape(e.args, e.color)
                }, f.prototype.renderBackgroundImage = function(e, n, f) {
                    var d = e.parseBackgroundImages();
                    d.reverse().forEach(function(d, i, t) {
                        switch (d.method) {
                            case "url":
                                var l = this.images.get(d.args[0]);
                                l ? this.renderBackgroundRepeating(e, n, l, t.length - (i + 1), f) : o("Error loading background-image", d.args[0]);
                                break;
                            case "linear-gradient":
                            case "gradient":
                                var s = this.images.get(d.value);
                                s ? this.renderBackgroundGradient(s, n, f) : o("Error loading background-image", d.args[0]);
                                break;
                            case "none":
                                break;
                            default:
                                o("Unknown background-image type", d.args[0])
                        }
                    }, this)
                }, f.prototype.renderBackgroundRepeating = function(e, n, f, o, d) {
                    var i = e.parseBackgroundSize(n, f.image, o),
                      t = e.parseBackgroundPosition(n, f.image, o, i),
                      l = e.parseBackgroundRepeat(o);
                    switch (l) {
                        case "repeat-x":
                        case "repeat no-repeat":
                            this.backgroundRepeatShape(f, t, i, n, n.left + d[3], n.top + t.top + d[0], 99999, i.height, d);
                            break;
                        case "repeat-y":
                        case "no-repeat repeat":
                            this.backgroundRepeatShape(f, t, i, n, n.left + t.left + d[3], n.top + d[0], i.width, 99999, d);
                            break;
                        case "no-repeat":
                            this.backgroundRepeatShape(f, t, i, n, n.left + t.left + d[3], n.top + t.top + d[0], i.width, i.height, d);
                            break;
                        default:
                            this.renderBackgroundRepeat(f, t, i, {
                                top: n.top,
                                left: n.left
                            }, d[3], d[0])
                    }
                }, n.exports = f
            }, {
                "./log": 15
            }
        ],
        23: [
            function(e, n) {
                function f(e, n) {
                    d.apply(this, arguments), this.canvas = this.options.canvas || this.document.createElement("canvas"), this.options.canvas || (this.canvas.width = e, this.canvas.height = n), this.ctx = this.canvas.getContext("2d"), this.taintCtx = this.document.createElement("canvas").getContext("2d"), this.ctx.textBaseline = "bottom", this.variables = {}, t("Initialized CanvasRenderer with size", e, "x", n)
                }

                function o(e) {
                    return e.length > 0
                }
                var d = e("../renderer"),
                  i = e("../lineargradientcontainer"),
                  t = e("../log");
                f.prototype = Object.create(d.prototype), f.prototype.setFillStyle = function(e) {
                    return this.ctx.fillStyle = "object" == typeof e && e.isColor ? e.toString() : e, this.ctx
                }, f.prototype.rectangle = function(e, n, f, o, d) {
                    this.setFillStyle(d).fillRect(e, n, f, o)
                }, f.prototype.circle = function(e, n, f, o) {
                    this.setFillStyle(o), this.ctx.beginPath(), this.ctx.arc(e + f / 2, n + f / 2, f / 2, 0, 2 * Math.PI, !0), this.ctx.closePath(), this.ctx.fill()
                }, f.prototype.circleStroke = function(e, n, f, o, d, i) {
                    this.circle(e, n, f, o), this.ctx.strokeStyle = i.toString(), this.ctx.stroke()
                }, f.prototype.drawShape = function(e, n) {
                    this.shape(e), this.setFillStyle(n).fill()
                }, f.prototype.taints = function(e) {
                    if (null === e.tainted) {
                        this.taintCtx.drawImage(e.image, 0, 0);
                        try {
                            this.taintCtx.getImageData(0, 0, 1, 1), e.tainted = !1
                        } catch (n) {
                            this.taintCtx = document.createElement("canvas").getContext("2d"), e.tainted = !0
                        }
                    }
                    return e.tainted
                }, f.prototype.drawImage = function(e, n, f, o, d, i, t, l, s) {
                    (!this.taints(e) || this.options.allowTaint) && this.ctx.drawImage(e.image, n, f, o, d, i, t, l, s)
                }, f.prototype.clip = function(e, n, f) {
                    this.ctx.save(), e.filter(o).forEach(function(e) {
                        this.shape(e).clip()
                    }, this), n.call(f), this.ctx.restore()
                }, f.prototype.shape = function(e) {
                    return this.ctx.beginPath(), e.forEach(function(e, n) {
                        "rect" === e[0] ? this.ctx.rect.apply(this.ctx, e.slice(1)) : this.ctx[0 === n ? "moveTo" : e[0] + "To"].apply(this.ctx, e.slice(1))
                    }, this), this.ctx.closePath(), this.ctx
                }, f.prototype.font = function(e, n, f, o, d, i) {
                    this.setFillStyle(e).font = [n, f, o, d, i].join(" ").split(",")[0]
                }, f.prototype.fontShadow = function(e, n, f, o) {
                    this.setVariable("shadowColor", e.toString()).setVariable("shadowOffsetY", n).setVariable("shadowOffsetX", f).setVariable("shadowBlur", o)
                }, f.prototype.clearShadow = function() {
                    this.setVariable("shadowColor", "rgba(0,0,0,0)")
                }, f.prototype.setOpacity = function(e) {
                    this.ctx.globalAlpha = e
                }, f.prototype.setTransform = function(e) {
                    this.ctx.translate(e.origin[0], e.origin[1]), this.ctx.transform.apply(this.ctx, e.matrix), this.ctx.translate(-e.origin[0], -e.origin[1])
                }, f.prototype.setVariable = function(e, n) {
                    return this.variables[e] !== n && (this.variables[e] = this.ctx[e] = n), this
                }, f.prototype.text = function(e, n, f) {
                    this.ctx.fillText(e, n, f)
                }, f.prototype.backgroundRepeatShape = function(e, n, f, o, d, i, t, l, s) {
                    var u = [
                        ["line", Math.round(d), Math.round(i)],
                        ["line", Math.round(d + t), Math.round(i)],
                        ["line", Math.round(d + t), Math.round(l + i)],
                        ["line", Math.round(d), Math.round(l + i)]
                    ];
                    this.clip([u], function() {
                        this.renderBackgroundRepeat(e, n, f, o, s[3], s[0])
                    }, this)
                }, f.prototype.renderBackgroundRepeat = function(e, n, f, o, d, i) {
                    var t = Math.round(o.left + n.left + d),
                      l = Math.round(o.top + n.top + i);
                    this.setFillStyle(this.ctx.createPattern(this.resizeImage(e, f), "repeat")), this.ctx.translate(t, l), this.ctx.fill(), this.ctx.translate(-t, -l)
                }, f.prototype.renderBackgroundGradient = function(e, n) {
                    if (e instanceof i) {
                        var f = this.ctx.createLinearGradient(n.left + n.width * e.x0, n.top + n.height * e.y0, n.left + n.width * e.x1, n.top + n.height * e.y1);
                        e.colorStops.forEach(function(e) {
                            f.addColorStop(e.stop, e.color.toString())
                        }), this.rectangle(n.left, n.top, n.width, n.height, f)
                    }
                }, f.prototype.resizeImage = function(e, n) {
                    var f = e.image;
                    if (f.width === n.width && f.height === n.height) return f;
                    var o, d = document.createElement("canvas");
                    return d.width = n.width, d.height = n.height, o = d.getContext("2d"), o.drawImage(f, 0, 0, f.width, f.height, 0, 0, n.width, n.height), d
                }, n.exports = f
            }, {
                "../lineargradientcontainer": 14,
                "../log": 15,
                "../renderer": 22
            }
        ],
        24: [
            function(e, n) {
                function f(e, n, f, d) {
                    o.call(this, f, d), this.ownStacking = e, this.contexts = [], this.children = [], this.opacity = (this.parent ? this.parent.stack.opacity : 1) * n
                }
                var o = e("./nodecontainer");
                f.prototype = Object.create(o.prototype), f.prototype.getParentStack = function(e) {
                    var n = this.parent ? this.parent.stack : null;
                    return n ? n.ownStacking ? n : n.getParentStack(e) : e.stack
                }, n.exports = f
            }, {
                "./nodecontainer": 16
            }
        ],
        25: [
            function(e, n) {
                function f(e) {
                    this.rangeBounds = this.testRangeBounds(e), this.cors = this.testCORS(), this.svg = this.testSVG()
                }
                f.prototype.testRangeBounds = function(e) {
                    var n, f, o, d, i = !1;
                    return e.createRange && (n = e.createRange(), n.getBoundingClientRect && (f = e.createElement("boundtest"), f.style.height = "123px", f.style.display = "block", e.body.appendChild(f), n.selectNode(f), o = n.getBoundingClientRect(), d = o.height, 123 === d && (i = !0), e.body.removeChild(f))), i
                }, f.prototype.testCORS = function() {
                    return "undefined" != typeof(new Image).crossOrigin
                }, f.prototype.testSVG = function() {
                    var e = new Image,
                      n = document.createElement("canvas"),
                      f = n.getContext("2d");
                    e.src = "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg'></svg>";
                    try {
                        f.drawImage(e, 0, 0), n.toDataURL()
                    } catch (o) {
                        return !1
                    }
                    return !0
                }, n.exports = f
            }, {}
        ],
        26: [
            function(e, n) {
                function f(e) {
                    this.src = e, this.image = null;
                    var n = this;
                    this.promise = this.hasFabric().then(function() {
                        return n.isInline(e) ? o.resolve(n.inlineFormatting(e)) : d(e)
                    }).then(function(e) {
                        return new o(function(f) {
                            window.html2canvas.svg.fabric.loadSVGFromString(e, n.createCanvas.call(n, f))
                        })
                    })
                }
                var o = e("./promise"),
                  d = e("./xhr"),
                  i = e("./utils").decode64;
                f.prototype.hasFabric = function() {
                    return window.html2canvas.svg && window.html2canvas.svg.fabric ? o.resolve() : o.reject(new Error("html2canvas.svg.js is not loaded, cannot render svg"))
                }, f.prototype.inlineFormatting = function(e) {
                    return /^data:image\/svg\+xml;base64,/.test(e) ? this.decode64(this.removeContentType(e)) : this.removeContentType(e)
                }, f.prototype.removeContentType = function(e) {
                    return e.replace(/^data:image\/svg\+xml(;base64)?,/, "")
                }, f.prototype.isInline = function(e) {
                    return /^data:image\/svg\+xml/i.test(e)
                }, f.prototype.createCanvas = function(e) {
                    var n = this;
                    return function(f, o) {
                        var d = new window.html2canvas.svg.fabric.StaticCanvas("c");
                        n.image = d.lowerCanvasEl, d.setWidth(o.width).setHeight(o.height).add(window.html2canvas.svg.fabric.util.groupSVGElements(f, o)).renderAll(), e(d.lowerCanvasEl)
                    }
                }, f.prototype.decode64 = function(e) {
                    return "function" == typeof window.atob ? window.atob(e) : i(e)
                }, n.exports = f
            }, {
                "./promise": 18,
                "./utils": 29,
                "./xhr": 31
            }
        ],
        27: [
            function(e, n) {
                function f(e, n) {
                    this.src = e, this.image = null;
                    var f = this;
                    this.promise = n ? new d(function(n, o) {
                        f.image = new Image, f.image.onload = n, f.image.onerror = o, f.image.src = "data:image/svg+xml," + (new XMLSerializer).serializeToString(e), f.image.complete === !0 && n(f.image)
                    }) : this.hasFabric().then(function() {
                        return new d(function(n) {
                            window.html2canvas.svg.fabric.parseSVGDocument(e, f.createCanvas.call(f, n))
                        })
                    })
                }
                var o = e("./svgcontainer"),
                  d = e("./promise");
                f.prototype = Object.create(o.prototype), n.exports = f
            }, {
                "./promise": 18,
                "./svgcontainer": 26
            }
        ],
        28: [
            function(e, n) {
                function f(e, n) {
                    d.call(this, e, n)
                }

                function o(e, n, f) {
                    return e.length > 0 ? n + f.toUpperCase() : void 0
                }
                var d = e("./nodecontainer");
                f.prototype = Object.create(d.prototype), f.prototype.applyTextTransform = function() {
                    this.node.data = this.transform(this.parent.css("textTransform"))
                }, f.prototype.transform = function(e) {
                    var n = this.node.data;
                    switch (e) {
                        case "lowercase":
                            return n.toLowerCase();
                        case "capitalize":
                            return n.replace(/(^|\s|:|-|\(|\))([a-z])/g, o);
                        case "uppercase":
                            return n.toUpperCase();
                        default:
                            return n
                    }
                }, n.exports = f
            }, {
                "./nodecontainer": 16
            }
        ],
        29: [
            function(e, n, f) {
                f.smallImage = function() {
                    return "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
                }, f.bind = function(e, n) {
                    return function() {
                        return e.apply(n, arguments)
                    }
                }, f.decode64 = function(e) {
                    var n, f, o, d, i, t, l, s, u = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
                      a = e.length,
                      p = "";
                    for (n = 0; a > n; n += 4) f = u.indexOf(e[n]), o = u.indexOf(e[n + 1]), d = u.indexOf(e[n + 2]), i = u.indexOf(e[n + 3]), t = f << 2 | o >> 4, l = (15 & o) << 4 | d >> 2, s = (3 & d) << 6 | i, p += 64 === d ? String.fromCharCode(t) : 64 === i || -1 === i ? String.fromCharCode(t, l) : String.fromCharCode(t, l, s);
                    return p
                }, f.getBounds = function(e) {
                    if (e.getBoundingClientRect) {
                        var n = e.getBoundingClientRect(),
                          f = null == e.offsetWidth ? n.width : e.offsetWidth;
                        return {
                            top: n.top,
                            bottom: n.bottom || n.top + n.height,
                            right: n.left + f,
                            left: n.left,
                            width: f,
                            height: null == e.offsetHeight ? n.height : e.offsetHeight
                        }
                    }
                    return {}
                }, f.offsetBounds = function(e) {
                    var n = e.offsetParent ? f.offsetBounds(e.offsetParent) : {
                        top: 0,
                        left: 0
                    };
                    return {
                        top: e.offsetTop + n.top,
                        bottom: e.offsetTop + e.offsetHeight + n.top,
                        right: e.offsetLeft + n.left + e.offsetWidth,
                        left: e.offsetLeft + n.left,
                        width: e.offsetWidth,
                        height: e.offsetHeight
                    }
                }, f.parseBackgrounds = function(e) {
                    var n, f, o, d, i, t, l, s = " \r\n ",
                      u = [],
                      a = 0,
                      p = 0,
                      c = function() {
                          n && ('"' === f.substr(0, 1) && (f = f.substr(1, f.length - 2)), f && l.push(f), "-" === n.substr(0, 1) && (d = n.indexOf("-", 1) + 1) > 0 && (o = n.substr(0, d), n = n.substr(d)), u.push({
                              prefix: o,
                              method: n.toLowerCase(),
                              value: i,
                              args: l,
                              image: null
                          })), l = [], n = o = f = i = ""
                      };
                    return l = [], n = o = f = i = "", e.split("").forEach(function(e) {
                        if (!(0 === a && s.indexOf(e) > -1)) {
                            switch (e) {
                                case '"':
                                    t ? t === e && (t = null) : t = e;
                                    break;
                                case "(":
                                    if (t) break;
                                    if (0 === a) return a = 1, void(i += e);
                                    p++;
                                    break;
                                case ")":
                                    if (t) break;
                                    if (1 === a) {
                                        if (0 === p) return a = 0, i += e, void c();
                                        p--
                                    }
                                    break;
                                case ",":
                                    if (t) break;
                                    if (0 === a) return void c();
                                    if (1 === a && 0 === p && !n.match(/^url$/i)) return l.push(f), f = "", void(i += e)
                            }
                            i += e, 0 === a ? n += e : f += e
                        }
                    }), c(), u
                }
            }, {}
        ],
        30: [
            function(e, n) {
                function f(e) {
                    o.apply(this, arguments), this.type = "linear" === e.args[0] ? this.TYPES.LINEAR : this.TYPES.RADIAL
                }
                var o = e("./gradientcontainer");
                f.prototype = Object.create(o.prototype), n.exports = f
            }, {
                "./gradientcontainer": 11
            }
        ],
        31: [
            function(e, n) {
                function f(e) {
                    return new o(function(n, f) {
                        var o = new XMLHttpRequest;
                        o.open("GET", e), o.onload = function() {
                            200 === o.status ? n(o.responseText) : f(new Error(o.statusText))
                        }, o.onerror = function() {
                            f(new Error("Network Error"))
                        }, o.send()
                    })
                }
                var o = e("./promise");
                n.exports = f
            }, {
                "./promise": 18
            }
        ]
    }, {}, [6])(6)
});