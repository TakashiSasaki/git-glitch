/*! modernizr 3.6.0 (Custom Build) | MIT *
 * https://modernizr.com/download/?-webgl-webglextensions !*/
!(function (e, n, t) {
  function o(e, n) {
    return typeof e === n;
  }
  function s() {
    var e, n, t, s, a, r, u;
    for (var f in i)
      if (i.hasOwnProperty(f)) {
        if (
          ((e = []),
          (n = i[f]),
          n.name &&
            (e.push(n.name.toLowerCase()),
            n.options && n.options.aliases && n.options.aliases.length))
        )
          for (t = 0; t < n.options.aliases.length; t++)
            e.push(n.options.aliases[t].toLowerCase());
        for (s = o(n.fn, "function") ? n.fn() : n.fn, a = 0; a < e.length; a++)
          (r = e[a]),
            (u = r.split(".")),
            1 === u.length
              ? (Modernizr[u[0]] = s)
              : (!Modernizr[u[0]] ||
                  Modernizr[u[0]] instanceof Boolean ||
                  (Modernizr[u[0]] = new Boolean(Modernizr[u[0]])),
                (Modernizr[u[0]][u[1]] = s)),
            l.push((s ? "" : "no-") + u.join("-"));
      }
  }
  function a() {
    return "function" != typeof n.createElement
      ? n.createElement(arguments[0])
      : f
      ? n.createElementNS.call(n, "http://www.w3.org/2000/svg", arguments[0])
      : n.createElement.apply(n, arguments);
  }
  var i = [],
    r = {
      _version: "3.6.0",
      _config: {
        classPrefix: "",
        enableClasses: !0,
        enableJSClass: !0,
        usePrefixes: !0,
      },
      _q: [],
      on: function (e, n) {
        var t = this;
        setTimeout(function () {
          n(t[e]);
        }, 0);
      },
      addTest: function (e, n, t) {
        i.push({ name: e, fn: n, options: t });
      },
      addAsyncTest: function (e) {
        i.push({ name: null, fn: e });
      },
    },
    Modernizr = function () {};
  (Modernizr.prototype = r), (Modernizr = new Modernizr());
  var l = [],
    u = n.documentElement,
    f = "svg" === u.nodeName.toLowerCase();
  Modernizr.addTest("webgl", function () {
    var n = a("canvas"),
      t =
        "probablySupportsContext" in n
          ? "probablySupportsContext"
          : "supportsContext";
    return t in n
      ? n[t]("webgl") || n[t]("experimental-webgl")
      : "WebGLRenderingContext" in e;
  }),
    Modernizr.addAsyncTest(function () {
      if (((Modernizr.webglextensions = !1), Modernizr.webgl)) {
        var e, n, o;
        try {
          (e = a("canvas")),
            (n = e.getContext("webgl") || e.getContext("experimental-webgl")),
            (o = n.getSupportedExtensions());
        } catch (s) {
          return;
        }
        n !== t && (Modernizr.webglextensions = new Boolean(!0));
        for (var i = -1, r = o.length; ++i < r; )
          Modernizr.webglextensions[o[i]] = !0;
        e = t;
      }
    }),
    s(),
    delete r.addTest,
    delete r.addAsyncTest;
  for (var p = 0; p < Modernizr._q.length; p++) Modernizr._q[p]();
  e.Modernizr = Modernizr;
})(window, document);
