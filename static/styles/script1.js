!function (t, e, i) {
  !function (t) {
    "function" == typeof define && define.amd ? define(["jquery"], t) : jQuery && !jQuery.fn.sparkline && t(jQuery)
  }(function (n) {
    "use strict";
    var r, s, a, o, l, h, u, c, d, f, p, g, v, m, y, b, x, _, w, C, S, D, T, k, M, I, F, A, R, P, L, E, H = {}, N = 0;
    r = function () {
      return {
        common: {
          type: "line",
          lineColor: "#00f",
          fillColor: "#cdf",
          defaultPixelsPerValue: 3,
          width: "auto",
          height: "auto",
          composite: !1,
          tagValuesAttribute: "values",
          tagOptionsPrefix: "spark",
          enableTagOptions: !1,
          enableHighlight: !0,
          highlightLighten: 1.4,
          tooltipSkipNull: !0,
          tooltipPrefix: "",
          tooltipSuffix: "",
          disableHiddenCheck: !1,
          numberFormatter: !1,
          numberDigitGroupCount: 3,
          numberDigitGroupSep: ",",
          numberDecimalMark: ".",
          disableTooltips: !1,
          disableInteraction: !1
        },
        line: {
          spotColor: "#f80",
          highlightSpotColor: "#5f5",
          highlightLineColor: "#f22",
          spotRadius: 1.5,
          minSpotColor: "#f80",
          maxSpotColor: "#f80",
          lineWidth: 1,
          normalRangeMin: i,
          normalRangeMax: i,
          normalRangeColor: "#ccc",
          drawNormalOnTop: !1,
          chartRangeMin: i,
          chartRangeMax: i,
          chartRangeMinX: i,
          chartRangeMaxX: i,
          tooltipFormat: new a('<span style="color: {{color}}">&#9679;</span> {{prefix}}{{y}}{{suffix}}')
        },
        bar: {
          barColor: "#3366cc",
          negBarColor: "#f44",
          stackedBarColor: ["#3366cc", "#dc3912", "#ff9900", "#109618", "#66aa00", "#dd4477", "#0099c6", "#990099"],
          zeroColor: i,
          nullColor: i,
          zeroAxis: !0,
          barWidth: 4,
          barSpacing: 1,
          chartRangeMax: i,
          chartRangeMin: i,
          chartRangeClip: !1,
          colorMap: i,
          tooltipFormat: new a('<span style="color: {{color}}">&#9679;</span> {{prefix}}{{value}}{{suffix}}')
        },
        tristate: {
          barWidth: 4,
          barSpacing: 1,
          posBarColor: "#6f6",
          negBarColor: "#f44",
          zeroBarColor: "#999",
          colorMap: {},
          tooltipFormat: new a('<span style="color: {{color}}">&#9679;</span> {{value:map}}'),
          tooltipValueLookups: {map: {"-1": "Loss", 0: "Draw", 1: "Win"}}
        },
        discrete: {
          lineHeight: "auto",
          thresholdColor: i,
          thresholdValue: 0,
          chartRangeMax: i,
          chartRangeMin: i,
          chartRangeClip: !1,
          tooltipFormat: new a("{{prefix}}{{value}}{{suffix}}")
        },
        bullet: {
          targetColor: "#f33",
          targetWidth: 3,
          performanceColor: "#33f",
          rangeColors: ["#d3dafe", "#a8b6ff", "#7f94ff"],
          base: i,
          tooltipFormat: new a("{{fieldkey:fields}} - {{value}}"),
          tooltipValueLookups: {fields: {r: "Range", p: "Performance", t: "Target"}}
        },
        pie: {
          offset: 0,
          sliceColors: ["#3366cc", "#dc3912", "#ff9900", "#109618", "#66aa00", "#dd4477", "#0099c6", "#990099"],
          borderWidth: 0,
          borderColor: "#000",
          tooltipFormat: new a('<span style="color: {{color}}">&#9679;</span> {{value}} ({{percent.1}}%)')
        },
        box: {
          raw: !1,
          boxLineColor: "#000",
          boxFillColor: "#cdf",
          whiskerColor: "#000",
          outlierLineColor: "#333",
          outlierFillColor: "#fff",
          medianColor: "#f00",
          showOutliers: !0,
          outlierIQR: 1.5,
          spotRadius: 1.5,
          target: i,
          targetColor: "#4a2",
          chartRangeMax: i,
          chartRangeMin: i,
          tooltipFormat: new a("{{field:fields}}: {{value}}"),
          tooltipFormatFieldlistKey: "field",
          tooltipValueLookups: {
            fields: {
              lq: "Lower Quartile",
              med: "Median",
              uq: "Upper Quartile",
              lo: "Left Outlier",
              ro: "Right Outlier",
              lw: "Left Whisker",
              rw: "Right Whisker"
            }
          }
        }
      }
    }, I = '.jqstooltip { position: absolute;left: 0px;top: 0px;visibility: hidden;background: rgb(0, 0, 0) transparent;background-color: rgba(0,0,0,0.6);filter:progid:DXImageTransform.Microsoft.gradient(startColorstr=#99000000, endColorstr=#99000000);-ms-filter: "progid:DXImageTransform.Microsoft.gradient(startColorstr=#99000000, endColorstr=#99000000)";color: white;font: 10px arial, san serif;text-align: left;white-space: nowrap;padding: 5px;border: 1px solid white;z-index: 10000;}.jqsfield { color: white;font: 10px arial, san serif;text-align: left;}', s = function () {
      var t, e;
      return t = function () {
        this.init.apply(this, arguments)
      }, arguments.length > 1 ? (arguments[0] ? (t.prototype = n.extend(new arguments[0], arguments[arguments.length - 1]), t._super = arguments[0].prototype) : t.prototype = arguments[arguments.length - 1], arguments.length > 2 && (e = Array.prototype.slice.call(arguments, 1, -1), e.unshift(t.prototype), n.extend.apply(n, e))) : t.prototype = arguments[0], t.prototype.cls = t, t
    }, n.SPFormatClass = a = s({
      fre: /\{\{([\w.]+?)(:(.+?))?\}\}/g, precre: /(\w+)\.(\d+)/, init: function (t, e) {
        this.format = t, this.fclass = e
      }, render: function (t, e, n) {
        var r, s, a, o, l, h = this, u = t;
        return this.format.replace(this.fre, function () {
          var t;
          return s = arguments[1], a = arguments[3], r = h.precre.exec(s), r ? (l = r[2], s = r[1]) : l = !1, o = u[s], o === i ? "" : a && e && e[a] ? (t = e[a], t.get ? e[a].get(o) || o : e[a][o] || o) : (d(o) && (o = n.get("numberFormatter") ? n.get("numberFormatter")(o) : m(o, l, n.get("numberDigitGroupCount"), n.get("numberDigitGroupSep"), n.get("numberDecimalMark"))), o)
        })
      }
    }), n.spformat = function (t, e) {
      return new a(t, e)
    }, o = function (t, e, i) {
      return e > t ? e : t > i ? i : t
    }, l = function (t, i) {
      var n;
      return 2 === i ? (n = e.floor(t.length / 2), t.length % 2 ? t[n] : (t[n - 1] + t[n]) / 2) : t.length % 2 ? (n = (t.length * i + i) / 4, n % 1 ? (t[e.floor(n)] + t[e.floor(n) - 1]) / 2 : t[n - 1]) : (n = (t.length * i + 2) / 4, n % 1 ? (t[e.floor(n)] + t[e.floor(n) - 1]) / 2 : t[n - 1])
    }, h = function (t) {
      var e;
      switch (t) {
        case"undefined":
          t = i;
          break;
        case"null":
          t = null;
          break;
        case"true":
          t = !0;
          break;
        case"false":
          t = !1;
          break;
        default:
          e = parseFloat(t), t == e && (t = e)
      }
      return t
    }, u = function (t) {
      var e, i = [];
      for (e = t.length; e--;)i[e] = h(t[e]);
      return i
    }, c = function (t, e) {
      var i, n, r = [];
      for (i = 0, n = t.length; n > i; i++)t[i] !== e && r.push(t[i]);
      return r
    }, d = function (t) {
      return !isNaN(parseFloat(t)) && isFinite(t)
    }, m = function (t, e, i, r, s) {
      var a, o;
      for (t = (e === !1 ? parseFloat(t).toString() : t.toFixed(e)).split(""), a = (a = n.inArray(".", t)) < 0 ? t.length : a, a < t.length && (t[a] = s), o = a - i; o > 0; o -= i)t.splice(o, 0, r);
      return t.join("")
    }, f = function (t, e, i) {
      var n;
      for (n = e.length; n--;)if ((!i || null !== e[n]) && e[n] !== t)return !1;
      return !0
    }, p = function (t) {
      var e, i = 0;
      for (e = t.length; e--;)i += "number" == typeof t[e] ? t[e] : 0;
      return i
    }, v = function (t) {
      return n.isArray(t) ? t : [t]
    }, g = function (e) {
      var i;
      t.createStyleSheet ? t.createStyleSheet().cssText = e : (i = t.createElement("style"), i.type = "text/css", t.getElementsByTagName("head")[0].appendChild(i), i["string" == typeof t.body.style.WebkitAppearance ? "innerText" : "innerHTML"] = e)
    }, n.fn.simpledraw = function (e, r, s, a) {
      var o, l;
      if (s && (o = this.data("_jqs_vcanvas")))return o;
      if (n.fn.sparkline.canvas === !1)return !1;
      if (n.fn.sparkline.canvas === i) {
        var h = t.createElement("canvas");
        if (h.getContext && h.getContext("2d"))n.fn.sparkline.canvas = function (t, e, i, n) {
          return new P(t, e, i, n)
        }; else {
          if (!t.namespaces || t.namespaces.v)return n.fn.sparkline.canvas = !1, !1;
          t.namespaces.add("v", "urn:schemas-microsoft-com:vml", "#default#VML"), n.fn.sparkline.canvas = function (t, e, i) {
            return new L(t, e, i)
          }
        }
      }
      return e === i && (e = n(this).innerWidth()), r === i && (r = n(this).innerHeight()), o = n.fn.sparkline.canvas(e, r, this, a), l = n(this).data("_jqs_mhandler"), l && l.registerCanvas(o), o
    }, n.fn.cleardraw = function () {
      var t = this.data("_jqs_vcanvas");
      t && t.reset()
    }, n.RangeMapClass = y = s({
      init: function (t) {
        var e, i, n = [];
        for (e in t)t.hasOwnProperty(e) && "string" == typeof e && e.indexOf(":") > -1 && (i = e.split(":"), i[0] = 0 === i[0].length ? -1 / 0 : parseFloat(i[0]), i[1] = 0 === i[1].length ? 1 / 0 : parseFloat(i[1]), i[2] = t[e], n.push(i));
        this.map = t, this.rangelist = n || !1
      }, get: function (t) {
        var e, n, r, s = this.rangelist;
        if ((r = this.map[t]) !== i)return r;
        if (s)for (e = s.length; e--;)if (n = s[e], n[0] <= t && n[1] >= t)return n[2];
        return i
      }
    }), n.range_map = function (t) {
      return new y(t)
    }, b = s({
      init: function (t, e) {
        var i = n(t);
        this.$el = i, this.options = e, this.currentPageX = 0, this.currentPageY = 0, this.el = t, this.splist = [], this.tooltip = null, this.over = !1, this.displayTooltips = !e.get("disableTooltips"), this.highlightEnabled = !e.get("disableHighlight")
      }, registerSparkline: function (t) {
        this.splist.push(t), this.over && this.updateDisplay()
      }, registerCanvas: function (t) {
        var e = n(t.canvas);
        this.canvas = t, this.$canvas = e, e.mouseenter(n.proxy(this.mouseenter, this)), e.mouseleave(n.proxy(this.mouseleave, this)), e.click(n.proxy(this.mouseclick, this))
      }, reset: function (t) {
        this.splist = [], this.tooltip && t && (this.tooltip.remove(), this.tooltip = i)
      }, mouseclick: function (t) {
        var e = n.Event("sparklineClick");
        e.originalEvent = t, e.sparklines = this.splist, this.$el.trigger(e)
      }, mouseenter: function (e) {
        n(t.body).unbind("mousemove.jqs"), n(t.body).bind("mousemove.jqs", n.proxy(this.mousemove, this)), this.over = !0, this.currentPageX = e.pageX, this.currentPageY = e.pageY, this.currentEl = e.target, !this.tooltip && this.displayTooltips && (this.tooltip = new x(this.options), this.tooltip.updatePosition(e.pageX, e.pageY)), this.updateDisplay()
      }, mouseleave: function () {
        n(t.body).unbind("mousemove.jqs");
        var e, i, r = this.splist, s = r.length, a = !1;
        for (this.over = !1, this.currentEl = null, this.tooltip && (this.tooltip.remove(), this.tooltip = null), i = 0; s > i; i++)e = r[i], e.clearRegionHighlight() && (a = !0);
        a && this.canvas.render()
      }, mousemove: function (t) {
        this.currentPageX = t.pageX, this.currentPageY = t.pageY, this.currentEl = t.target, this.tooltip && this.tooltip.updatePosition(t.pageX, t.pageY), this.updateDisplay()
      }, updateDisplay: function () {
        var t, e, i, r, s, a = this.splist, o = a.length, l = !1, h = this.$canvas.offset(), u = this.currentPageX - h.left, c = this.currentPageY - h.top;
        if (this.over) {
          for (i = 0; o > i; i++)e = a[i], r = e.setRegionHighlight(this.currentEl, u, c), r && (l = !0);
          if (l) {
            if (s = n.Event("sparklineRegionChange"), s.sparklines = this.splist, this.$el.trigger(s), this.tooltip) {
              for (t = "", i = 0; o > i; i++)e = a[i], t += e.getCurrentRegionTooltip();
              this.tooltip.setContent(t)
            }
            this.disableHighlight || this.canvas.render()
          }
          null === r && this.mouseleave()
        }
      }
    }), x = s({
      sizeStyle: "position: static !important;display: block !important;visibility: hidden !important;float: left !important;",
      init: function (e) {
        var i, r = e.get("tooltipClassname", "jqstooltip"), s = this.sizeStyle;
        this.container = e.get("tooltipContainer") || t.body, this.tooltipOffsetX = e.get("tooltipOffsetX", 10), this.tooltipOffsetY = e.get("tooltipOffsetY", 12), n("#jqssizetip").remove(), n("#jqstooltip").remove(), this.sizetip = n("<div/>", {
          id: "jqssizetip",
          style: s,
          "class": r
        }), this.tooltip = n("<div/>", {
          id: "jqstooltip",
          "class": r
        }).appendTo(this.container), i = this.tooltip.offset(), this.offsetLeft = i.left, this.offsetTop = i.top, this.hidden = !0, n(window).unbind("resize.jqs scroll.jqs"), n(window).bind("resize.jqs scroll.jqs", n.proxy(this.updateWindowDims, this)), this.updateWindowDims()
      },
      updateWindowDims: function () {
        this.scrollTop = n(window).scrollTop(), this.scrollLeft = n(window).scrollLeft(), this.scrollRight = this.scrollLeft + n(window).width(), this.updatePosition()
      },
      getSize: function (t) {
        this.sizetip.html(t).appendTo(this.container), this.width = this.sizetip.width() + 1, this.height = this.sizetip.height(), this.sizetip.remove()
      },
      setContent: function (t) {
        return t ? (this.getSize(t), this.tooltip.html(t).css({
          width: this.width,
          height: this.height,
          visibility: "visible"
        }), this.hidden && (this.hidden = !1, this.updatePosition()), void 0) : (this.tooltip.css("visibility", "hidden"), this.hidden = !0, void 0)
      },
      updatePosition: function (t, e) {
        if (t === i) {
          if (this.mousex === i)return;
          t = this.mousex - this.offsetLeft, e = this.mousey - this.offsetTop
        } else this.mousex = t -= this.offsetLeft, this.mousey = e -= this.offsetTop;
        this.height && this.width && !this.hidden && (e -= this.height + this.tooltipOffsetY, t += this.tooltipOffsetX, e < this.scrollTop && (e = this.scrollTop), t < this.scrollLeft ? t = this.scrollLeft : t + this.width > this.scrollRight && (t = this.scrollRight - this.width), this.tooltip.css({
          left: t,
          top: e
        }))
      },
      remove: function () {
        this.tooltip.remove(), this.sizetip.remove(), this.sizetip = this.tooltip = i, n(window).unbind("resize.jqs scroll.jqs")
      }
    }), F = function () {
      g(I)
    }, n(F), E = [], n.fn.sparkline = function (e, r) {
      return this.each(function () {
        var s, a, o = new n.fn.sparkline.options(this, r), l = n(this);
        if (s = function () {
            var r, s, a, h, u, c, d;
            return "html" === e || e === i ? (d = this.getAttribute(o.get("tagValuesAttribute")), (d === i || null === d) && (d = l.html()), r = d.replace(/(^\s*<!--)|(-->\s*$)|\s+/g, "").split(",")) : r = e, s = "auto" === o.get("width") ? r.length * o.get("defaultPixelsPerValue") : o.get("width"), "auto" === o.get("height") ? o.get("composite") && n.data(this, "_jqs_vcanvas") || (h = t.createElement("span"), h.innerHTML = "a", l.html(h), a = n(h).innerHeight() || n(h).height(), n(h).remove(), h = null) : a = o.get("height"), o.get("disableInteraction") ? u = !1 : (u = n.data(this, "_jqs_mhandler"), u ? o.get("composite") || u.reset() : (u = new b(this, o), n.data(this, "_jqs_mhandler", u))), o.get("composite") && !n.data(this, "_jqs_vcanvas") ? (n.data(this, "_jqs_errnotify") || (alert("Attempted to attach a composite sparkline to an element with no existing sparkline"), n.data(this, "_jqs_errnotify", !0)), void 0) : (c = new (n.fn.sparkline[o.get("type")])(this, r, o, s, a), c.render(), u && u.registerSparkline(c), void 0)
          }, n(this).html() && !o.get("disableHiddenCheck") && n(this).is(":hidden") || !n(this).parents("body").length) {
          if (!o.get("composite") && n.data(this, "_jqs_pending"))for (a = E.length; a; a--)E[a - 1][0] == this && E.splice(a - 1, 1);
          E.push([this, s]), n.data(this, "_jqs_pending", !0)
        } else s.call(this)
      })
    }, n.fn.sparkline.defaults = r(), n.sparkline_display_visible = function () {
      var t, e, i, r = [];
      for (e = 0, i = E.length; i > e; e++)t = E[e][0], n(t).is(":visible") && !n(t).parents().is(":hidden") ? (E[e][1].call(t), n.data(E[e][0], "_jqs_pending", !1), r.push(e)) : !n(t).closest("html").length && !n.data(t, "_jqs_pending") && (n.data(E[e][0], "_jqs_pending", !1), r.push(e));
      for (e = r.length; e; e--)E.splice(r[e - 1], 1)
    }, n.fn.sparkline.options = s({
      init: function (t, e) {
        var i, r, s, a;
        this.userOptions = e = e || {}, this.tag = t, this.tagValCache = {}, r = n.fn.sparkline.defaults, s = r.common, this.tagOptionsPrefix = e.enableTagOptions && (e.tagOptionsPrefix || s.tagOptionsPrefix), a = this.getTagSetting("type"), i = a === H ? r[e.type || s.type] : r[a], this.mergedOptions = n.extend({}, s, i, e)
      }, getTagSetting: function (t) {
        var e, n, r, s, a = this.tagOptionsPrefix;
        if (a === !1 || a === i)return H;
        if (this.tagValCache.hasOwnProperty(t))e = this.tagValCache.key; else {
          if (e = this.tag.getAttribute(a + t), e === i || null === e)e = H; else if ("[" === e.substr(0, 1))for (e = e.substr(1, e.length - 2).split(","), n = e.length; n--;)e[n] = h(e[n].replace(/(^\s*)|(\s*$)/g, "")); else if ("{" === e.substr(0, 1))for (r = e.substr(1, e.length - 2).split(","), e = {}, n = r.length; n--;)s = r[n].split(":", 2), e[s[0].replace(/(^\s*)|(\s*$)/g, "")] = h(s[1].replace(/(^\s*)|(\s*$)/g, "")); else e = h(e);
          this.tagValCache.key = e
        }
        return e
      }, get: function (t, e) {
        var n, r = this.getTagSetting(t);
        return r !== H ? r : (n = this.mergedOptions[t]) === i ? e : n
      }
    }), n.fn.sparkline._base = s({
      disabled: !1, init: function (t, e, r, s, a) {
        this.el = t, this.$el = n(t), this.values = e, this.options = r, this.width = s, this.height = a, this.currentRegion = i
      }, initTarget: function () {
        var t = !this.options.get("disableInteraction");
        (this.target = this.$el.simpledraw(this.width, this.height, this.options.get("composite"), t)) ? (this.canvasWidth = this.target.pixelWidth, this.canvasHeight = this.target.pixelHeight) : this.disabled = !0
      }, render: function () {
        return this.disabled ? (this.el.innerHTML = "", !1) : !0
      }, getRegion: function () {
      }, setRegionHighlight: function (t, e, n) {
        var r, s = this.currentRegion, a = !this.options.get("disableHighlight");
        return e > this.canvasWidth || n > this.canvasHeight || 0 > e || 0 > n ? null : (r = this.getRegion(t, e, n), s !== r ? (s !== i && a && this.removeHighlight(), this.currentRegion = r, r !== i && a && this.renderHighlight(), !0) : !1)
      }, clearRegionHighlight: function () {
        return this.currentRegion !== i ? (this.removeHighlight(), this.currentRegion = i, !0) : !1
      }, renderHighlight: function () {
        this.changeHighlight(!0)
      }, removeHighlight: function () {
        this.changeHighlight(!1)
      }, changeHighlight: function () {
      }, getCurrentRegionTooltip: function () {
        var t, e, r, s, o, l, h, u, c, d, f, p, g, v, m = this.options, y = "", b = [];
        if (this.currentRegion === i)return "";
        if (t = this.getCurrentRegionFields(), f = m.get("tooltipFormatter"))return f(this, m, t);
        if (m.get("tooltipChartTitle") && (y += '<div class="jqs jqstitle">' + m.get("tooltipChartTitle") + "</div>\n"), e = this.options.get("tooltipFormat"), !e)return "";
        if (n.isArray(e) || (e = [e]), n.isArray(t) || (t = [t]), h = this.options.get("tooltipFormatFieldlist"), u = this.options.get("tooltipFormatFieldlistKey"), h && u) {
          for (c = [], l = t.length; l--;)d = t[l][u], -1 != (v = n.inArray(d, h)) && (c[v] = t[l]);
          t = c
        }
        for (r = e.length, g = t.length, l = 0; r > l; l++)for (p = e[l], "string" == typeof p && (p = new a(p)), s = p.fclass || "jqsfield", v = 0; g > v; v++)t[v].isNull && m.get("tooltipSkipNull") || (n.extend(t[v], {
          prefix: m.get("tooltipPrefix"),
          suffix: m.get("tooltipSuffix")
        }), o = p.render(t[v], m.get("tooltipValueLookups"), m), b.push('<div class="' + s + '">' + o + "</div>"));
        return b.length ? y + b.join("\n") : ""
      }, getCurrentRegionFields: function () {
      }, calcHighlightColor: function (t, i) {
        var n, r, s, a, l = i.get("highlightColor"), h = i.get("highlightLighten");
        if (l)return l;
        if (h && (n = /^#([0-9a-f])([0-9a-f])([0-9a-f])$/i.exec(t) || /^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i.exec(t))) {
          for (s = [], r = 4 === t.length ? 16 : 1, a = 0; 3 > a; a++)s[a] = o(e.round(parseInt(n[a + 1], 16) * r * h), 0, 255);
          return "rgb(" + s.join(",") + ")"
        }
        return t
      }
    }), _ = {
      changeHighlight: function (t) {
        var e, i = this.currentRegion, r = this.target, s = this.regionShapes[i];
        s && (e = this.renderRegion(i, t), n.isArray(e) || n.isArray(s) ? (r.replaceWithShapes(s, e), this.regionShapes[i] = n.map(e, function (t) {
          return t.id
        })) : (r.replaceWithShape(s, e), this.regionShapes[i] = e.id))
      }, render: function () {
        var t, e, i, r, s = this.values, a = this.target, o = this.regionShapes;
        if (this.cls._super.render.call(this)) {
          for (i = s.length; i--;)if (t = this.renderRegion(i))if (n.isArray(t)) {
            for (e = [], r = t.length; r--;)t[r].append(), e.push(t[r].id);
            o[i] = e
          } else t.append(), o[i] = t.id; else o[i] = null;
          a.render()
        }
      }
    }, n.fn.sparkline.line = w = s(n.fn.sparkline._base, {
      type: "line", init: function (t, e, i, n, r) {
        w._super.init.call(this, t, e, i, n, r), this.vertices = [], this.regionMap = [], this.xvalues = [], this.yvalues = [], this.yminmax = [], this.hightlightSpotId = null, this.lastShapeId = null, this.initTarget()
      }, getRegion: function (t, e) {
        var n, r = this.regionMap;
        for (n = r.length; n--;)if (null !== r[n] && e >= r[n][0] && e <= r[n][1])return r[n][2];
        return i
      }, getCurrentRegionFields: function () {
        var t = this.currentRegion;
        return {
          isNull: null === this.yvalues[t],
          x: this.xvalues[t],
          y: this.yvalues[t],
          color: this.options.get("lineColor"),
          fillColor: this.options.get("fillColor"),
          offset: t
        }
      }, renderHighlight: function () {
        var t, e, n = this.currentRegion, r = this.target, s = this.vertices[n], a = this.options, o = a.get("spotRadius"), l = a.get("highlightSpotColor"), h = a.get("highlightLineColor");
        s && (o && l && (t = r.drawCircle(s[0], s[1], o, i, l), this.highlightSpotId = t.id, r.insertAfterShape(this.lastShapeId, t)), h && (e = r.drawLine(s[0], this.canvasTop, s[0], this.canvasTop + this.canvasHeight, h), this.highlightLineId = e.id, r.insertAfterShape(this.lastShapeId, e)))
      }, removeHighlight: function () {
        var t = this.target;
        this.highlightSpotId && (t.removeShapeId(this.highlightSpotId), this.highlightSpotId = null), this.highlightLineId && (t.removeShapeId(this.highlightLineId), this.highlightLineId = null)
      }, scanValues: function () {
        var t, i, n, r, s, a = this.values, o = a.length, l = this.xvalues, h = this.yvalues, u = this.yminmax;
        for (t = 0; o > t; t++)i = a[t], n = "string" == typeof a[t], r = "object" == typeof a[t] && a[t]instanceof Array, s = n && a[t].split(":"), n && 2 === s.length ? (l.push(Number(s[0])), h.push(Number(s[1])), u.push(Number(s[1]))) : r ? (l.push(i[0]), h.push(i[1]), u.push(i[1])) : (l.push(t), null === a[t] || "null" === a[t] ? h.push(null) : (h.push(Number(i)), u.push(Number(i))));
        this.options.get("xvalues") && (l = this.options.get("xvalues")), this.maxy = this.maxyorg = e.max.apply(e, u), this.miny = this.minyorg = e.min.apply(e, u), this.maxx = e.max.apply(e, l), this.minx = e.min.apply(e, l), this.xvalues = l, this.yvalues = h, this.yminmax = u
      }, processRangeOptions: function () {
        var t = this.options, e = t.get("normalRangeMin"), n = t.get("normalRangeMax");
        e !== i && (e < this.miny && (this.miny = e), n > this.maxy && (this.maxy = n)), t.get("chartRangeMin") !== i && (t.get("chartRangeClip") || t.get("chartRangeMin") < this.miny) && (this.miny = t.get("chartRangeMin")), t.get("chartRangeMax") !== i && (t.get("chartRangeClip") || t.get("chartRangeMax") > this.maxy) && (this.maxy = t.get("chartRangeMax")), t.get("chartRangeMinX") !== i && (t.get("chartRangeClipX") || t.get("chartRangeMinX") < this.minx) && (this.minx = t.get("chartRangeMinX")), t.get("chartRangeMaxX") !== i && (t.get("chartRangeClipX") || t.get("chartRangeMaxX") > this.maxx) && (this.maxx = t.get("chartRangeMaxX"))
      }, drawNormalRange: function (t, n, r, s, a) {
        var o = this.options.get("normalRangeMin"), l = this.options.get("normalRangeMax"), h = n + e.round(r - r * ((l - this.miny) / a)), u = e.round(r * (l - o) / a);
        this.target.drawRect(t, h, s, u, i, this.options.get("normalRangeColor")).append()
      }, render: function () {
        var t, r, s, a, o, l, h, u, c, d, f, p, g, v, m, b, x, _, C, S, D, T, k, M, I, F = this.options, A = this.target, R = this.canvasWidth, P = this.canvasHeight, L = this.vertices, E = F.get("spotRadius"), H = this.regionMap;
        if (w._super.render.call(this) && (this.scanValues(), this.processRangeOptions(), k = this.xvalues, M = this.yvalues, this.yminmax.length && !(this.yvalues.length < 2))) {
          for (a = o = 0, t = 0 === this.maxx - this.minx ? 1 : this.maxx - this.minx, r = 0 === this.maxy - this.miny ? 1 : this.maxy - this.miny, s = this.yvalues.length - 1, E && (4 * E > R || 4 * E > P) && (E = 0), E && (D = F.get("highlightSpotColor") && !F.get("disableInteraction"), (D || F.get("minSpotColor") || F.get("spotColor") && M[s] === this.miny) && (P -= e.ceil(E)), (D || F.get("maxSpotColor") || F.get("spotColor") && M[s] === this.maxy) && (P -= e.ceil(E), a += e.ceil(E)), (D || (F.get("minSpotColor") || F.get("maxSpotColor")) && (M[0] === this.miny || M[0] === this.maxy)) && (o += e.ceil(E), R -= e.ceil(E)), (D || F.get("spotColor") || F.get("minSpotColor") || F.get("maxSpotColor") && (M[s] === this.miny || M[s] === this.maxy)) && (R -= e.ceil(E))), P--, F.get("normalRangeMin") !== i && !F.get("drawNormalOnTop") && this.drawNormalRange(o, a, P, R, r), h = [], u = [h], v = m = null, b = M.length, I = 0; b > I; I++)c = k[I], f = k[I + 1], d = M[I], p = o + e.round((c - this.minx) * (R / t)), g = b - 1 > I ? o + e.round((f - this.minx) * (R / t)) : R, m = p + (g - p) / 2, H[I] = [v || 0, m, I], v = m, null === d ? I && (null !== M[I - 1] && (h = [], u.push(h)), L.push(null)) : (d < this.miny && (d = this.miny), d > this.maxy && (d = this.maxy), h.length || h.push([p, a + P]), l = [p, a + e.round(P - P * ((d - this.miny) / r))], h.push(l), L.push(l));
          for (x = [], _ = [], C = u.length, I = 0; C > I; I++)h = u[I], h.length && (F.get("fillColor") && (h.push([h[h.length - 1][0], a + P]), _.push(h.slice(0)), h.pop()), h.length > 2 && (h[0] = [h[0][0], h[1][1]]), x.push(h));
          for (C = _.length, I = 0; C > I; I++)A.drawShape(_[I], F.get("fillColor"), F.get("fillColor")).append();
          for (F.get("normalRangeMin") !== i && F.get("drawNormalOnTop") && this.drawNormalRange(o, a, P, R, r), C = x.length, I = 0; C > I; I++)A.drawShape(x[I], F.get("lineColor"), i, F.get("lineWidth")).append();
          if (E && F.get("valueSpots"))for (S = F.get("valueSpots"), S.get === i && (S = new y(S)), I = 0; b > I; I++)T = S.get(M[I]), T && A.drawCircle(o + e.round((k[I] - this.minx) * (R / t)), a + e.round(P - P * ((M[I] - this.miny) / r)), E, i, T).append();
          E && F.get("spotColor") && null !== M[s] && A.drawCircle(o + e.round((k[k.length - 1] - this.minx) * (R / t)), a + e.round(P - P * ((M[s] - this.miny) / r)), E, i, F.get("spotColor")).append(), this.maxy !== this.minyorg && (E && F.get("minSpotColor") && (c = k[n.inArray(this.minyorg, M)], A.drawCircle(o + e.round((c - this.minx) * (R / t)), a + e.round(P - P * ((this.minyorg - this.miny) / r)), E, i, F.get("minSpotColor")).append()), E && F.get("maxSpotColor") && (c = k[n.inArray(this.maxyorg, M)], A.drawCircle(o + e.round((c - this.minx) * (R / t)), a + e.round(P - P * ((this.maxyorg - this.miny) / r)), E, i, F.get("maxSpotColor")).append())), this.lastShapeId = A.getLastShapeId(), this.canvasTop = a, A.render()
        }
      }
    }), n.fn.sparkline.bar = C = s(n.fn.sparkline._base, _, {
      type: "bar", init: function (t, r, s, a, l) {
        var d, f, p, g, v, m, b, x, _, w, S, D, T, k, M, I, F, A, R, P, L, E, H = parseInt(s.get("barWidth"), 10), N = parseInt(s.get("barSpacing"), 10), B = s.get("chartRangeMin"), j = s.get("chartRangeMax"), W = s.get("chartRangeClip"), O = 1 / 0, $ = -1 / 0;
        for (C._super.init.call(this, t, r, s, a, l), m = 0, b = r.length; b > m; m++)P = r[m], d = "string" == typeof P && P.indexOf(":") > -1, (d || n.isArray(P)) && (M = !0, d && (P = r[m] = u(P.split(":"))), P = c(P, null), f = e.min.apply(e, P), p = e.max.apply(e, P), O > f && (O = f), p > $ && ($ = p));
        this.stacked = M, this.regionShapes = {}, this.barWidth = H, this.barSpacing = N, this.totalBarWidth = H + N, this.width = a = r.length * H + (r.length - 1) * N, this.initTarget(), W && (T = B === i ? -1 / 0 : B, k = j === i ? 1 / 0 : j), v = [], g = M ? [] : v;
        var q = [], z = [];
        for (m = 0, b = r.length; b > m; m++)if (M)for (I = r[m], r[m] = R = [], q[m] = 0, g[m] = z[m] = 0, F = 0, A = I.length; A > F; F++)P = R[F] = W ? o(I[F], T, k) : I[F], null !== P && (P > 0 && (q[m] += P), 0 > O && $ > 0 ? 0 > P ? z[m] += e.abs(P) : g[m] += P : g[m] += e.abs(P - (0 > P ? $ : O)), v.push(P)); else P = W ? o(r[m], T, k) : r[m], P = r[m] = h(P), null !== P && v.push(P);
        this.max = D = e.max.apply(e, v), this.min = S = e.min.apply(e, v), this.stackMax = $ = M ? e.max.apply(e, q) : D, this.stackMin = O = M ? e.min.apply(e, v) : S, s.get("chartRangeMin") !== i && (s.get("chartRangeClip") || s.get("chartRangeMin") < S) && (S = s.get("chartRangeMin")), s.get("chartRangeMax") !== i && (s.get("chartRangeClip") || s.get("chartRangeMax") > D) && (D = s.get("chartRangeMax")), this.zeroAxis = _ = s.get("zeroAxis", !0), w = 0 >= S && D >= 0 && _ ? 0 : 0 == _ ? S : S > 0 ? S : D, this.xaxisOffset = w, x = M ? e.max.apply(e, g) + e.max.apply(e, z) : D - S, this.canvasHeightEf = _ && 0 > S ? this.canvasHeight - 2 : this.canvasHeight - 1, w > S ? (E = M && D >= 0 ? $ : D, L = (E - w) / x * this.canvasHeight, L !== e.ceil(L) && (this.canvasHeightEf -= 2, L = e.ceil(L))) : L = this.canvasHeight, this.yoffset = L, n.isArray(s.get("colorMap")) ? (this.colorMapByIndex = s.get("colorMap"), this.colorMapByValue = null) : (this.colorMapByIndex = null, this.colorMapByValue = s.get("colorMap"), this.colorMapByValue && this.colorMapByValue.get === i && (this.colorMapByValue = new y(this.colorMapByValue))), this.range = x
      }, getRegion: function (t, n) {
        var r = e.floor(n / this.totalBarWidth);
        return 0 > r || r >= this.values.length ? i : r
      }, getCurrentRegionFields: function () {
        var t, e, i = this.currentRegion, n = v(this.values[i]), r = [];
        for (e = n.length; e--;)t = n[e], r.push({
          isNull: null === t,
          value: t,
          color: this.calcColor(e, t, i),
          offset: i
        });
        return r
      }, calcColor: function (t, e, r) {
        var s, a, o = this.colorMapByIndex, l = this.colorMapByValue, h = this.options;
        return s = this.stacked ? h.get("stackedBarColor") : 0 > e ? h.get("negBarColor") : h.get("barColor"), 0 === e && h.get("zeroColor") !== i && (s = h.get("zeroColor")), l && (a = l.get(e)) ? s = a : o && o.length > r && (s = o[r]), n.isArray(s) ? s[t % s.length] : s
      }, renderRegion: function (t, r) {
        var s, a, o, l, h, u, c, d, p, g, v = this.values[t], m = this.options, y = this.xaxisOffset, b = [], x = this.range, _ = this.stacked, w = this.target, C = t * this.totalBarWidth, S = this.canvasHeightEf, D = this.yoffset;
        if (v = n.isArray(v) ? v : [v], c = v.length, d = v[0], l = f(null, v), g = f(y, v, !0), l)return m.get("nullColor") ? (o = r ? m.get("nullColor") : this.calcHighlightColor(m.get("nullColor"), m), s = D > 0 ? D - 1 : D, w.drawRect(C, s, this.barWidth - 1, 0, o, o)) : i;
        for (h = D, u = 0; c > u; u++) {
          if (d = v[u], _ && d === y) {
            if (!g || p)continue;
            p = !0
          }
          a = x > 0 ? e.floor(S * (e.abs(d - y) / x)) + 1 : 1, y > d || d === y && 0 === D ? (s = h, h += a) : (s = D - a, D -= a), o = this.calcColor(u, d, t), r && (o = this.calcHighlightColor(o, m)), b.push(w.drawRect(C, s, this.barWidth - 1, a - 1, o, o))
        }
        return 1 === b.length ? b[0] : b
      }
    }), n.fn.sparkline.tristate = S = s(n.fn.sparkline._base, _, {
      type: "tristate", init: function (t, e, r, s, a) {
        var o = parseInt(r.get("barWidth"), 10), l = parseInt(r.get("barSpacing"), 10);
        S._super.init.call(this, t, e, r, s, a), this.regionShapes = {}, this.barWidth = o, this.barSpacing = l, this.totalBarWidth = o + l, this.values = n.map(e, Number), this.width = s = e.length * o + (e.length - 1) * l, n.isArray(r.get("colorMap")) ? (this.colorMapByIndex = r.get("colorMap"), this.colorMapByValue = null) : (this.colorMapByIndex = null, this.colorMapByValue = r.get("colorMap"), this.colorMapByValue && this.colorMapByValue.get === i && (this.colorMapByValue = new y(this.colorMapByValue))), this.initTarget()
      }, getRegion: function (t, i) {
        return e.floor(i / this.totalBarWidth)
      }, getCurrentRegionFields: function () {
        var t = this.currentRegion;
        return {
          isNull: this.values[t] === i,
          value: this.values[t],
          color: this.calcColor(this.values[t], t),
          offset: t
        }
      }, calcColor: function (t, e) {
        var i, n, r = this.values, s = this.options, a = this.colorMapByIndex, o = this.colorMapByValue;
        return i = o && (n = o.get(t)) ? n : a && a.length > e ? a[e] : r[e] < 0 ? s.get("negBarColor") : r[e] > 0 ? s.get("posBarColor") : s.get("zeroBarColor")
      }, renderRegion: function (t, i) {
        var n, r, s, a, o, l, h = this.values, u = this.options, c = this.target;
        return n = c.pixelHeight, s = e.round(n / 2), a = t * this.totalBarWidth, h[t] < 0 ? (o = s, r = s - 1) : h[t] > 0 ? (o = 0, r = s - 1) : (o = s - 1, r = 2), l = this.calcColor(h[t], t), null !== l ? (i && (l = this.calcHighlightColor(l, u)), c.drawRect(a, o, this.barWidth - 1, r - 1, l, l)) : void 0
      }
    }), n.fn.sparkline.discrete = D = s(n.fn.sparkline._base, _, {
      type: "discrete", init: function (t, r, s, a, o) {
        D._super.init.call(this, t, r, s, a, o), this.regionShapes = {}, this.values = r = n.map(r, Number), this.min = e.min.apply(e, r), this.max = e.max.apply(e, r), this.range = this.max - this.min, this.width = a = "auto" === s.get("width") ? 2 * r.length : this.width, this.interval = e.floor(a / r.length), this.itemWidth = a / r.length, s.get("chartRangeMin") !== i && (s.get("chartRangeClip") || s.get("chartRangeMin") < this.min) && (this.min = s.get("chartRangeMin")), s.get("chartRangeMax") !== i && (s.get("chartRangeClip") || s.get("chartRangeMax") > this.max) && (this.max = s.get("chartRangeMax")), this.initTarget(), this.target && (this.lineHeight = "auto" === s.get("lineHeight") ? e.round(.3 * this.canvasHeight) : s.get("lineHeight"))
      }, getRegion: function (t, i) {
        return e.floor(i / this.itemWidth)
      }, getCurrentRegionFields: function () {
        var t = this.currentRegion;
        return {isNull: this.values[t] === i, value: this.values[t], offset: t}
      }, renderRegion: function (t, i) {
        var n, r, s, a, l = this.values, h = this.options, u = this.min, c = this.max, d = this.range, f = this.interval, p = this.target, g = this.canvasHeight, v = this.lineHeight, m = g - v;
        return r = o(l[t], u, c), a = t * f, n = e.round(m - m * ((r - u) / d)), s = h.get("thresholdColor") && r < h.get("thresholdValue") ? h.get("thresholdColor") : h.get("lineColor"), i && (s = this.calcHighlightColor(s, h)), p.drawLine(a, n, a, n + v, s)
      }
    }), n.fn.sparkline.bullet = T = s(n.fn.sparkline._base, {
      type: "bullet", init: function (t, n, r, s, a) {
        var o, l, h;
        T._super.init.call(this, t, n, r, s, a), this.values = n = u(n), h = n.slice(), h[0] = null === h[0] ? h[2] : h[0], h[1] = null === n[1] ? h[2] : h[1], o = e.min.apply(e, n), l = e.max.apply(e, n), o = r.get("base") === i ? 0 > o ? o : 0 : r.get("base"), this.min = o, this.max = l, this.range = l - o, this.shapes = {}, this.valueShapes = {}, this.regiondata = {}, this.width = s = "auto" === r.get("width") ? "4.0em" : s, this.target = this.$el.simpledraw(s, a, r.get("composite")), n.length || (this.disabled = !0), this.initTarget()
      }, getRegion: function (t, e, n) {
        var r = this.target.getShapeAt(t, e, n);
        return r !== i && this.shapes[r] !== i ? this.shapes[r] : i
      }, getCurrentRegionFields: function () {
        var t = this.currentRegion;
        return {fieldkey: t.substr(0, 1), value: this.values[t.substr(1)], region: t}
      }, changeHighlight: function (t) {
        var e, i = this.currentRegion, n = this.valueShapes[i];
        switch (delete this.shapes[n], i.substr(0, 1)) {
          case"r":
            e = this.renderRange(i.substr(1), t);
            break;
          case"p":
            e = this.renderPerformance(t);
            break;
          case"t":
            e = this.renderTarget(t)
        }
        this.valueShapes[i] = e.id, this.shapes[e.id] = i, this.target.replaceWithShape(n, e)
      }, renderRange: function (t, i) {
        var n = this.values[t], r = e.round(this.canvasWidth * ((n - this.min) / this.range)), s = this.options.get("rangeColors")[t - 2];
        return i && (s = this.calcHighlightColor(s, this.options)), this.target.drawRect(0, 0, r - 1, this.canvasHeight - 1, s, s)
      }, renderPerformance: function (t) {
        var i = this.values[1], n = e.round(this.canvasWidth * ((i - this.min) / this.range)), r = this.options.get("performanceColor");
        return t && (r = this.calcHighlightColor(r, this.options)), this.target.drawRect(0, e.round(.3 * this.canvasHeight), n - 1, e.round(.4 * this.canvasHeight) - 1, r, r)
      }, renderTarget: function (t) {
        var i = this.values[0], n = e.round(this.canvasWidth * ((i - this.min) / this.range) - this.options.get("targetWidth") / 2), r = e.round(.1 * this.canvasHeight), s = this.canvasHeight - 2 * r, a = this.options.get("targetColor");
        return t && (a = this.calcHighlightColor(a, this.options)), this.target.drawRect(n, r, this.options.get("targetWidth") - 1, s - 1, a, a)
      }, render: function () {
        var t, e, i = this.values.length, n = this.target;
        if (T._super.render.call(this)) {
          for (t = 2; i > t; t++)e = this.renderRange(t).append(), this.shapes[e.id] = "r" + t, this.valueShapes["r" + t] = e.id;
          null !== this.values[1] && (e = this.renderPerformance().append(), this.shapes[e.id] = "p1", this.valueShapes.p1 = e.id), null !== this.values[0] && (e = this.renderTarget().append(), this.shapes[e.id] = "t0", this.valueShapes.t0 = e.id), n.render()
        }
      }
    }), n.fn.sparkline.pie = k = s(n.fn.sparkline._base, {
      type: "pie", init: function (t, i, r, s, a) {
        var o, l = 0;
        if (k._super.init.call(this, t, i, r, s, a), this.shapes = {}, this.valueShapes = {}, this.values = i = n.map(i, Number), "auto" === r.get("width") && (this.width = this.height), i.length > 0)for (o = i.length; o--;)l += i[o];
        this.total = l, this.initTarget(), this.radius = e.floor(e.min(this.canvasWidth, this.canvasHeight) / 2)
      }, getRegion: function (t, e, n) {
        var r = this.target.getShapeAt(t, e, n);
        return r !== i && this.shapes[r] !== i ? this.shapes[r] : i
      }, getCurrentRegionFields: function () {
        var t = this.currentRegion;
        return {
          isNull: this.values[t] === i,
          value: this.values[t],
          percent: 100 * (this.values[t] / this.total),
          color: this.options.get("sliceColors")[t % this.options.get("sliceColors").length],
          offset: t
        }
      }, changeHighlight: function (t) {
        var e = this.currentRegion, i = this.renderSlice(e, t), n = this.valueShapes[e];
        delete this.shapes[n], this.target.replaceWithShape(n, i), this.valueShapes[e] = i.id, this.shapes[i.id] = e
      }, renderSlice: function (t, n) {
        var r, s, a, o, l, h = this.target, u = this.options, c = this.radius, d = u.get("borderWidth"), f = u.get("offset"), p = 2 * e.PI, g = this.values, v = this.total, m = f ? 2 * e.PI * (f / 360) : 0;
        for (o = g.length, a = 0; o > a; a++) {
          if (r = m, s = m, v > 0 && (s = m + p * (g[a] / v)), t === a)return l = u.get("sliceColors")[a % u.get("sliceColors").length], n && (l = this.calcHighlightColor(l, u)), h.drawPieSlice(c, c, c - d, r, s, i, l);
          m = s
        }
      }, render: function () {
        var t, n, r = this.target, s = this.values, a = this.options, o = this.radius, l = a.get("borderWidth");
        if (k._super.render.call(this)) {
          for (l && r.drawCircle(o, o, e.floor(o - l / 2), a.get("borderColor"), i, l).append(), n = s.length; n--;)s[n] && (t = this.renderSlice(n).append(), this.valueShapes[n] = t.id, this.shapes[t.id] = n);
          r.render()
        }
      }
    }), n.fn.sparkline.box = M = s(n.fn.sparkline._base, {
      type: "box", init: function (t, e, i, r, s) {
        M._super.init.call(this, t, e, i, r, s), this.values = n.map(e, Number), this.width = "auto" === i.get("width") ? "4.0em" : r, this.initTarget(), this.values.length || (this.disabled = 1)
      }, getRegion: function () {
        return 1
      }, getCurrentRegionFields: function () {
        var t = [{field: "lq", value: this.quartiles[0]}, {field: "med", value: this.quartiles[1]}, {
          field: "uq",
          value: this.quartiles[2]
        }];
        return this.loutlier !== i && t.push({
          field: "lo",
          value: this.loutlier
        }), this.routlier !== i && t.push({
          field: "ro",
          value: this.routlier
        }), this.lwhisker !== i && t.push({
          field: "lw",
          value: this.lwhisker
        }), this.rwhisker !== i && t.push({field: "rw", value: this.rwhisker}), t
      }, render: function () {
        var t, n, r, s, a, o, h, u, c, d, f, p = this.target, g = this.values, v = g.length, m = this.options, y = this.canvasWidth, b = this.canvasHeight, x = m.get("chartRangeMin") === i ? e.min.apply(e, g) : m.get("chartRangeMin"), _ = m.get("chartRangeMax") === i ? e.max.apply(e, g) : m.get("chartRangeMax"), w = 0;
        if (M._super.render.call(this)) {
          if (m.get("raw"))m.get("showOutliers") && g.length > 5 ? (n = g[0], t = g[1], s = g[2], a = g[3], o = g[4], h = g[5], u = g[6]) : (t = g[0], s = g[1], a = g[2], o = g[3], h = g[4]); else if (g.sort(function (t, e) {
              return t - e
            }), s = l(g, 1), a = l(g, 2), o = l(g, 3), r = o - s, m.get("showOutliers")) {
            for (t = h = i, c = 0; v > c; c++)t === i && g[c] > s - r * m.get("outlierIQR") && (t = g[c]), g[c] < o + r * m.get("outlierIQR") && (h = g[c]);
            n = g[0], u = g[v - 1]
          } else t = g[0], h = g[v - 1];
          this.quartiles = [s, a, o], this.lwhisker = t, this.rwhisker = h, this.loutlier = n, this.routlier = u, f = y / (_ - x + 1), m.get("showOutliers") && (w = e.ceil(m.get("spotRadius")), y -= 2 * e.ceil(m.get("spotRadius")), f = y / (_ - x + 1), t > n && p.drawCircle((n - x) * f + w, b / 2, m.get("spotRadius"), m.get("outlierLineColor"), m.get("outlierFillColor")).append(), u > h && p.drawCircle((u - x) * f + w, b / 2, m.get("spotRadius"), m.get("outlierLineColor"), m.get("outlierFillColor")).append()), p.drawRect(e.round((s - x) * f + w), e.round(.1 * b), e.round((o - s) * f), e.round(.8 * b), m.get("boxLineColor"), m.get("boxFillColor")).append(), p.drawLine(e.round((t - x) * f + w), e.round(b / 2), e.round((s - x) * f + w), e.round(b / 2), m.get("lineColor")).append(), p.drawLine(e.round((t - x) * f + w), e.round(b / 4), e.round((t - x) * f + w), e.round(b - b / 4), m.get("whiskerColor")).append(), p.drawLine(e.round((h - x) * f + w), e.round(b / 2), e.round((o - x) * f + w), e.round(b / 2), m.get("lineColor")).append(), p.drawLine(e.round((h - x) * f + w), e.round(b / 4), e.round((h - x) * f + w), e.round(b - b / 4), m.get("whiskerColor")).append(), p.drawLine(e.round((a - x) * f + w), e.round(.1 * b), e.round((a - x) * f + w), e.round(.9 * b), m.get("medianColor")).append(), m.get("target") && (d = e.ceil(m.get("spotRadius")), p.drawLine(e.round((m.get("target") - x) * f + w), e.round(b / 2 - d), e.round((m.get("target") - x) * f + w), e.round(b / 2 + d), m.get("targetColor")).append(), p.drawLine(e.round((m.get("target") - x) * f + w - d), e.round(b / 2), e.round((m.get("target") - x) * f + w + d), e.round(b / 2), m.get("targetColor")).append()), p.render()
        }
      }
    }), A = s({
      init: function (t, e, i, n) {
        this.target = t, this.id = e, this.type = i, this.args = n
      }, append: function () {
        return this.target.appendShape(this), this
      }
    }), R = s({
      _pxregex: /(\d+)(px)?\s*$/i, init: function (t, e, i) {
        t && (this.width = t, this.height = e, this.target = i, this.lastShapeId = null, i[0] && (i = i[0]), n.data(i, "_jqs_vcanvas", this))
      }, drawLine: function (t, e, i, n, r, s) {
        return this.drawShape([[t, e], [i, n]], r, s)
      }, drawShape: function (t, e, i, n) {
        return this._genShape("Shape", [t, e, i, n])
      }, drawCircle: function (t, e, i, n, r, s) {
        return this._genShape("Circle", [t, e, i, n, r, s])
      }, drawPieSlice: function (t, e, i, n, r, s, a) {
        return this._genShape("PieSlice", [t, e, i, n, r, s, a])
      }, drawRect: function (t, e, i, n, r, s) {
        return this._genShape("Rect", [t, e, i, n, r, s])
      }, getElement: function () {
        return this.canvas
      }, getLastShapeId: function () {
        return this.lastShapeId
      }, reset: function () {
        alert("reset not implemented")
      }, _insert: function (t, e) {
        n(e).html(t)
      }, _calculatePixelDims: function (t, e, i) {
        var r;
        r = this._pxregex.exec(e), this.pixelHeight = r ? r[1] : n(i).height(), r = this._pxregex.exec(t), this.pixelWidth = r ? r[1] : n(i).width()
      }, _genShape: function (t, e) {
        var i = N++;
        return e.unshift(i), new A(this, i, t, e)
      }, appendShape: function () {
        alert("appendShape not implemented")
      }, replaceWithShape: function () {
        alert("replaceWithShape not implemented")
      }, insertAfterShape: function () {
        alert("insertAfterShape not implemented")
      }, removeShapeId: function () {
        alert("removeShapeId not implemented")
      }, getShapeAt: function () {
        alert("getShapeAt not implemented")
      }, render: function () {
        alert("render not implemented")
      }
    }), P = s(R, {
      init: function (e, r, s, a) {
        P._super.init.call(this, e, r, s), this.canvas = t.createElement("canvas"), s[0] && (s = s[0]), n.data(s, "_jqs_vcanvas", this), n(this.canvas).css({
          display: "inline-block",
          width: e,
          height: r,
          verticalAlign: "top"
        }), this._insert(this.canvas, s), this._calculatePixelDims(e, r, this.canvas), this.canvas.width = this.pixelWidth, this.canvas.height = this.pixelHeight, this.interact = a, this.shapes = {}, this.shapeseq = [], this.currentTargetShapeId = i, n(this.canvas).css({
          width: this.pixelWidth,
          height: this.pixelHeight
        })
      }, _getContext: function (t, e, n) {
        var r = this.canvas.getContext("2d");
        return t !== i && (r.strokeStyle = t), r.lineWidth = n === i ? 1 : n, e !== i && (r.fillStyle = e), r
      }, reset: function () {
        var t = this._getContext();
        t.clearRect(0, 0, this.pixelWidth, this.pixelHeight), this.shapes = {}, this.shapeseq = [], this.currentTargetShapeId = i
      }, _drawShape: function (t, e, n, r, s) {
        var a, o, l = this._getContext(n, r, s);
        for (l.beginPath(), l.moveTo(e[0][0] + .5, e[0][1] + .5), a = 1, o = e.length; o > a; a++)l.lineTo(e[a][0] + .5, e[a][1] + .5);
        n !== i && l.stroke(), r !== i && l.fill(), this.targetX !== i && this.targetY !== i && l.isPointInPath(this.targetX, this.targetY) && (this.currentTargetShapeId = t)
      }, _drawCircle: function (t, n, r, s, a, o, l) {
        var h = this._getContext(a, o, l);
        h.beginPath(), h.arc(n, r, s, 0, 2 * e.PI, !1), this.targetX !== i && this.targetY !== i && h.isPointInPath(this.targetX, this.targetY) && (this.currentTargetShapeId = t), a !== i && h.stroke(), o !== i && h.fill()
      }, _drawPieSlice: function (t, e, n, r, s, a, o, l) {
        var h = this._getContext(o, l);
        h.beginPath(), h.moveTo(e, n), h.arc(e, n, r, s, a, !1), h.lineTo(e, n), h.closePath(), o !== i && h.stroke(), l && h.fill(), this.targetX !== i && this.targetY !== i && h.isPointInPath(this.targetX, this.targetY) && (this.currentTargetShapeId = t)
      }, _drawRect: function (t, e, i, n, r, s, a) {
        return this._drawShape(t, [[e, i], [e + n, i], [e + n, i + r], [e, i + r], [e, i]], s, a)
      }, appendShape: function (t) {
        return this.shapes[t.id] = t, this.shapeseq.push(t.id), this.lastShapeId = t.id, t.id
      }, replaceWithShape: function (t, e) {
        var i, n = this.shapeseq;
        for (this.shapes[e.id] = e, i = n.length; i--;)n[i] == t && (n[i] = e.id);
        delete this.shapes[t]
      }, replaceWithShapes: function (t, e) {
        var i, n, r, s = this.shapeseq, a = {};
        for (n = t.length; n--;)a[t[n]] = !0;
        for (n = s.length; n--;)i = s[n], a[i] && (s.splice(n, 1), delete this.shapes[i], r = n);
        for (n = e.length; n--;)s.splice(r, 0, e[n].id), this.shapes[e[n].id] = e[n]
      }, insertAfterShape: function (t, e) {
        var i, n = this.shapeseq;
        for (i = n.length; i--;)if (n[i] === t)return n.splice(i + 1, 0, e.id), this.shapes[e.id] = e, void 0
      }, removeShapeId: function (t) {
        var e, i = this.shapeseq;
        for (e = i.length; e--;)if (i[e] === t) {
          i.splice(e, 1);
          break
        }
        delete this.shapes[t]
      }, getShapeAt: function (t, e, i) {
        return this.targetX = e, this.targetY = i, this.render(), this.currentTargetShapeId
      }, render: function () {
        var t, e, i, n = this.shapeseq, r = this.shapes, s = n.length, a = this._getContext();
        for (a.clearRect(0, 0, this.pixelWidth, this.pixelHeight), i = 0; s > i; i++)t = n[i], e = r[t], this["_draw" + e.type].apply(this, e.args);
        this.interact || (this.shapes = {}, this.shapeseq = [])
      }
    }), L = s(R, {
      init: function (e, i, r) {
        var s;
        L._super.init.call(this, e, i, r), r[0] && (r = r[0]), n.data(r, "_jqs_vcanvas", this), this.canvas = t.createElement("span"), n(this.canvas).css({
          display: "inline-block",
          position: "relative",
          overflow: "hidden",
          width: e,
          height: i,
          margin: "0px",
          padding: "0px",
          verticalAlign: "top"
        }), this._insert(this.canvas, r), this._calculatePixelDims(e, i, this.canvas), this.canvas.width = this.pixelWidth, this.canvas.height = this.pixelHeight, s = '<v:group coordorigin="0 0" coordsize="' + this.pixelWidth + " " + this.pixelHeight + '"' + ' style="position:absolute;top:0;left:0;width:' + this.pixelWidth + "px;height=" + this.pixelHeight + 'px;"></v:group>', this.canvas.insertAdjacentHTML("beforeEnd", s), this.group = n(this.canvas).children()[0], this.rendered = !1, this.prerender = ""
      }, _drawShape: function (t, e, n, r, s) {
        var a, o, l, h, u, c, d, f = [];
        for (d = 0, c = e.length; c > d; d++)f[d] = "" + e[d][0] + "," + e[d][1];
        return a = f.splice(0, 1), s = s === i ? 1 : s, o = n === i ? ' stroked="false" ' : ' strokeWeight="' + s + 'px" strokeColor="' + n + '" ', l = r === i ? ' filled="false"' : ' fillColor="' + r + '" filled="true" ', h = f[0] === f[f.length - 1] ? "x " : "", u = '<v:shape coordorigin="0 0" coordsize="' + this.pixelWidth + " " + this.pixelHeight + '" ' + ' id="jqsshape' + t + '" ' + o + l + ' style="position:absolute;left:0px;top:0px;height:' + this.pixelHeight + "px;width:" + this.pixelWidth + 'px;padding:0px;margin:0px;" ' + ' path="m ' + a + " l " + f.join(", ") + " " + h + 'e">' + " </v:shape>"
      }, _drawCircle: function (t, e, n, r, s, a, o) {
        var l, h, u;
        return e -= r, n -= r, l = s === i ? ' stroked="false" ' : ' strokeWeight="' + o + 'px" strokeColor="' + s + '" ', h = a === i ? ' filled="false"' : ' fillColor="' + a + '" filled="true" ', u = '<v:oval  id="jqsshape' + t + '" ' + l + h + ' style="position:absolute;top:' + n + "px; left:" + e + "px; width:" + 2 * r + "px; height:" + 2 * r + 'px"></v:oval>'
      }, _drawPieSlice: function (t, n, r, s, a, o, l, h) {
        var u, c, d, f, p, g, v, m;
        if (a === o)return "";
        if (o - a === 2 * e.PI && (a = 0, o = 2 * e.PI), c = n + e.round(e.cos(a) * s), d = r + e.round(e.sin(a) * s), f = n + e.round(e.cos(o) * s), p = r + e.round(e.sin(o) * s), c === f && d === p) {
          if (o - a < e.PI)return "";
          c = f = n + s, d = p = r
        }
        return c === f && d === p && o - a < e.PI ? "" : (u = [n - s, r - s, n + s, r + s, c, d, f, p], g = l === i ? ' stroked="false" ' : ' strokeWeight="1px" strokeColor="' + l + '" ', v = h === i ? ' filled="false"' : ' fillColor="' + h + '" filled="true" ', m = '<v:shape coordorigin="0 0" coordsize="' + this.pixelWidth + " " + this.pixelHeight + '" ' + ' id="jqsshape' + t + '" ' + g + v + ' style="position:absolute;left:0px;top:0px;height:' + this.pixelHeight + "px;width:" + this.pixelWidth + 'px;padding:0px;margin:0px;" ' + ' path="m ' + n + "," + r + " wa " + u.join(", ") + ' x e">' + " </v:shape>")
      }, _drawRect: function (t, e, i, n, r, s, a) {
        return this._drawShape(t, [[e, i], [e, i + r], [e + n, i + r], [e + n, i], [e, i]], s, a)
      }, reset: function () {
        this.group.innerHTML = ""
      }, appendShape: function (t) {
        var e = this["_draw" + t.type].apply(this, t.args);
        return this.rendered ? this.group.insertAdjacentHTML("beforeEnd", e) : this.prerender += e, this.lastShapeId = t.id, t.id
      }, replaceWithShape: function (t, e) {
        var i = n("#jqsshape" + t), r = this["_draw" + e.type].apply(this, e.args);
        i[0].outerHTML = r
      }, replaceWithShapes: function (t, e) {
        var i, r = n("#jqsshape" + t[0]), s = "", a = e.length;
        for (i = 0; a > i; i++)s += this["_draw" + e[i].type].apply(this, e[i].args);
        for (r[0].outerHTML = s, i = 1; i < t.length; i++)n("#jqsshape" + t[i]).remove()
      }, insertAfterShape: function (t, e) {
        var i = n("#jqsshape" + t), r = this["_draw" + e.type].apply(this, e.args);
        i[0].insertAdjacentHTML("afterEnd", r)
      }, removeShapeId: function (t) {
        var e = n("#jqsshape" + t);
        this.group.removeChild(e[0])
      }, getShapeAt: function (t) {
        var e = t.id.substr(8);
        return e
      }, render: function () {
        this.rendered || (this.group.innerHTML = this.prerender, this.rendered = !0)
      }
    })
  })
}(document, Math), /* ========================================================================
 * Bootstrap: tab.js v3.0.0
 * http://twbs.github.com/bootstrap/javascript.html#tabs
 * ========================================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */
  +function (t) {
    "use strict";
    var e = function (e) {
      this.element = t(e)
    };
    e.prototype.show = function () {
      var e = this.element, i = e.closest("ul:not(.dropdown-menu)"), n = e.attr("data-target");
      if (n || (n = e.attr("href"), n = n && n.replace(/.*(?=#[^\s]*$)/, "")), !e.parent("li").hasClass("active")) {
        var r = i.find(".active:last a")[0], s = t.Event("show.bs.tab", {relatedTarget: r});
        if (e.trigger(s), !s.isDefaultPrevented()) {
          var a = t(n);
          this.activate(e.parent("li"), i), this.activate(a, a.parent(), function () {
            e.trigger({type: "shown.bs.tab", relatedTarget: r})
          })
        }
      }
    }, e.prototype.activate = function (e, i, n) {
      function r() {
        s.removeClass("active").find("> .dropdown-menu > .active").removeClass("active"), e.addClass("active"), a ? (e[0].offsetWidth, e.addClass("in")) : e.removeClass("fade"), e.parent(".dropdown-menu") && e.closest("li.dropdown").addClass("active"), n && n()
      }

      var s = i.find("> .active"), a = n && t.support.transition && s.hasClass("fade");
      a ? s.one(t.support.transition.end, r).emulateTransitionEnd(150) : r(), s.removeClass("in")
    };
    var i = t.fn.tab;
    t.fn.tab = function (i) {
      return this.each(function () {
        var n = t(this), r = n.data("bs.tab");
        r || n.data("bs.tab", r = new e(this)), "string" == typeof i && r[i]()
      })
    }, t.fn.tab.Constructor = e, t.fn.tab.noConflict = function () {
      return t.fn.tab = i, this
    }, t(document).on("click.bs.tab.data-api", '[data-toggle="tab"], [data-toggle="pill"]', function (e) {
      e.preventDefault(), t(this).tab("show")
    })
  }(window.jQuery), /* ========================================================================
 * Bootstrap: dropdown.js v3.0.0
 * http://twbs.github.com/bootstrap/javascript.html#dropdowns
 * ========================================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */
  +function (t) {
    "use strict";
    function e() {
      t(n).remove(), t(r).each(function (e) {
        var n = i(t(this));
        n.hasClass("open") && (n.trigger(e = t.Event("hide.bs.dropdown")), e.isDefaultPrevented() || n.removeClass("open").trigger("hidden.bs.dropdown"))
      })
    }

    function i(e) {
      var i = e.attr("data-target");
      i || (i = e.attr("href"), i = i && /#/.test(i) && i.replace(/.*(?=#[^\s]*$)/, ""));
      var n = i && t(i);
      return n && n.length ? n : e.parent()
    }

    var n = ".dropdown-backdrop", r = "[data-toggle=dropdown]", s = function (e) {
      t(e).on("click.bs.dropdown", this.toggle)
    };
    s.prototype.toggle = function (n) {
      var r = t(this);
      if (!r.is(".disabled, :disabled")) {
        var s = i(r), a = s.hasClass("open");
        if (e(), !a) {
          if ("ontouchstart"in document.documentElement && !s.closest(".navbar-nav").length && t('<div class="dropdown-backdrop"/>').insertAfter(t(this)).on("click", e), s.trigger(n = t.Event("show.bs.dropdown")), n.isDefaultPrevented())return;
          s.toggleClass("open").trigger("shown.bs.dropdown"), r.focus()
        }
        return !1
      }
    }, s.prototype.keydown = function (e) {
      if (/(38|40|27)/.test(e.keyCode)) {
        var n = t(this);
        if (e.preventDefault(), e.stopPropagation(), !n.is(".disabled, :disabled")) {
          var s = i(n), a = s.hasClass("open");
          if (!a || a && 27 == e.keyCode)return 27 == e.which && s.find(r).focus(), n.click();
          var o = t("[role=menu] li:not(.divider):visible a", s);
          if (o.length) {
            var l = o.index(o.filter(":focus"));
            38 == e.keyCode && l > 0 && l--, 40 == e.keyCode && l < o.length - 1 && l++, ~l || (l = 0), o.eq(l).focus()
          }
        }
      }
    };
    var a = t.fn.dropdown;
    t.fn.dropdown = function (e) {
      return this.each(function () {
        var i = t(this), n = i.data("dropdown");
        n || i.data("dropdown", n = new s(this)), "string" == typeof e && n[e].call(i)
      })
    }, t.fn.dropdown.Constructor = s, t.fn.dropdown.noConflict = function () {
      return t.fn.dropdown = a, this
    }, t(document).on("click.bs.dropdown.data-api", e).on("click.bs.dropdown.data-api", ".dropdown form", function (t) {
      t.stopPropagation()
    }).on("click.bs.dropdown.data-api", r, s.prototype.toggle).on("keydown.bs.dropdown.data-api", r + ", [role=menu]", s.prototype.keydown)
  }(window.jQuery), /* ========================================================================
 * Bootstrap: collapse.js v3.0.0
 * http://twbs.github.com/bootstrap/javascript.html#collapse
 * ========================================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */
  +function (t) {
    "use strict";
    var e = function (i, n) {
      this.$element = t(i), this.options = t.extend({}, e.DEFAULTS, n), this.transitioning = null, this.options.parent && (this.$parent = t(this.options.parent)), this.options.toggle && this.toggle()
    };
    e.DEFAULTS = {toggle: !0}, e.prototype.dimension = function () {
      var t = this.$element.hasClass("width");
      return t ? "width" : "height"
    }, e.prototype.show = function () {
      if (!this.transitioning && !this.$element.hasClass("in")) {
        var e = t.Event("show.bs.collapse");
        if (this.$element.trigger(e), !e.isDefaultPrevented()) {
          var i = this.$parent && this.$parent.find("> .panel > .in");
          if (i && i.length) {
            var n = i.data("bs.collapse");
            if (n && n.transitioning)return;
            i.collapse("hide"), n || i.data("bs.collapse", null)
          }
          var r = this.dimension();
          this.$element.removeClass("collapse").addClass("collapsing")[r](0), this.transitioning = 1;
          var s = function () {
            this.$element.removeClass("collapsing").addClass("in")[r]("auto"), this.transitioning = 0, this.$element.trigger("shown.bs.collapse")
          };
          if (!t.support.transition)return s.call(this);
          var a = t.camelCase(["scroll", r].join("-"));
          this.$element.one(t.support.transition.end, t.proxy(s, this)).emulateTransitionEnd(350)[r](this.$element[0][a])
        }
      }
    }, e.prototype.hide = function () {
      if (!this.transitioning && this.$element.hasClass("in")) {
        var e = t.Event("hide.bs.collapse");
        if (this.$element.trigger(e), !e.isDefaultPrevented()) {
          var i = this.dimension();
          this.$element[i](this.$element[i]())[0].offsetHeight, this.$element.addClass("collapsing").removeClass("collapse").removeClass("in"), this.transitioning = 1;
          var n = function () {
            this.transitioning = 0, this.$element.trigger("hidden.bs.collapse").removeClass("collapsing").addClass("collapse")
          };
          return t.support.transition ? (this.$element[i](0).one(t.support.transition.end, t.proxy(n, this)).emulateTransitionEnd(350), void 0) : n.call(this)
        }
      }
    }, e.prototype.toggle = function () {
      this[this.$element.hasClass("in") ? "hide" : "show"]()
    };
    var i = t.fn.collapse;
    t.fn.collapse = function (i) {
      return this.each(function () {
        var n = t(this), r = n.data("bs.collapse"), s = t.extend({}, e.DEFAULTS, n.data(), "object" == typeof i && i);
        r || n.data("bs.collapse", r = new e(this, s)), "string" == typeof i && r[i]()
      })
    }, t.fn.collapse.Constructor = e, t.fn.collapse.noConflict = function () {
      return t.fn.collapse = i, this
    }, t(document).on("click.bs.collapse.data-api", "[data-toggle=collapse]", function (e) {
      var i, n = t(this), r = n.attr("data-target") || e.preventDefault() || (i = n.attr("href")) && i.replace(/.*(?=#[^\s]+$)/, ""), s = t(r), a = s.data("bs.collapse"), o = a ? "toggle" : n.data(), l = n.attr("data-parent"), h = l && t(l);
      a && a.transitioning || (h && h.find('[data-toggle=collapse][data-parent="' + l + '"]').not(n).addClass("collapsed"), n[s.hasClass("in") ? "addClass" : "removeClass"]("collapsed")), s.collapse(o)
    })
  }(window.jQuery), /* ========================================================================
 * Bootstrap: alert.js v3.0.0
 * http://twbs.github.com/bootstrap/javascript.html#alerts
 * ========================================================================
 * Copyright 2013 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */
  +function (t) {
    "use strict";
    var e = '[data-dismiss="alert"]', i = function (i) {
      t(i).on("click", e, this.close)
    };
    i.prototype.close = function (e) {
      function i() {
        s.trigger("closed.bs.alert").remove()
      }

      var n = t(this), r = n.attr("data-target");
      r || (r = n.attr("href"), r = r && r.replace(/.*(?=#[^\s]*$)/, ""));
      var s = t(r);
      e && e.preventDefault(), s.length || (s = n.hasClass("alert") ? n : n.parent()), s.trigger(e = t.Event("close.bs.alert")), e.isDefaultPrevented() || (s.removeClass("in"), t.support.transition && s.hasClass("fade") ? s.one(t.support.transition.end, i).emulateTransitionEnd(150) : i())
    };
    var n = t.fn.alert;
    t.fn.alert = function (e) {
      return this.each(function () {
        var n = t(this), r = n.data("bs.alert");
        r || n.data("bs.alert", r = new i(this)), "string" == typeof e && r[e].call(n)
      })
    }, t.fn.alert.Constructor = i, t.fn.alert.noConflict = function () {
      return t.fn.alert = n, this
    }, t(document).on("click.bs.alert.data-api", e, i.prototype.close)
  }(window.jQuery), /* ========================================================================
 * Bootstrap: transition.js v3.0.0
 * http://twbs.github.com/bootstrap/javascript.html#transitions
 * ========================================================================
 * Copyright 2013 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */
  +function (t) {
    "use strict";
    function e() {
      var t = document.createElement("bootstrap"), e = {
        WebkitTransition: "webkitTransitionEnd",
        MozTransition: "transitionend",
        OTransition: "oTransitionEnd otransitionend",
        transition: "transitionend"
      };
      for (var i in e)if (void 0 !== t.style[i])return {end: e[i]}
    }

    t.fn.emulateTransitionEnd = function (e) {
      var i = !1, n = this;
      t(this).one(t.support.transition.end, function () {
        i = !0
      });
      var r = function () {
        i || t(n).trigger(t.support.transition.end)
      };
      return setTimeout(r, e), this
    }, t(function () {
      t.support.transition = e()
    })
  }(window.jQuery), /* ========================================================================
 * Bootstrap: tooltip.js v3.0.0
 * http://twbs.github.com/bootstrap/javascript.html#tooltip
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ========================================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */
  +function (t) {
    "use strict";
    var e = function (t, e) {
      this.type = this.options = this.enabled = this.timeout = this.hoverState = this.$element = null, this.init("tooltip", t, e)
    };
    e.DEFAULTS = {
      animation: !0,
      placement: "top",
      selector: !1,
      template: '<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
      trigger: "hover focus",
      title: "",
      delay: 0,
      html: !1,
      container: !1
    }, e.prototype.init = function (e, i, n) {
      this.enabled = !0, this.type = e, this.$element = t(i), this.options = this.getOptions(n);
      for (var r = this.options.trigger.split(" "), s = r.length; s--;) {
        var a = r[s];
        if ("click" == a)this.$element.on("click." + this.type, this.options.selector, t.proxy(this.toggle, this)); else if ("manual" != a) {
          var o = "hover" == a ? "mouseenter" : "focus", l = "hover" == a ? "mouseleave" : "blur";
          this.$element.on(o + "." + this.type, this.options.selector, t.proxy(this.enter, this)), this.$element.on(l + "." + this.type, this.options.selector, t.proxy(this.leave, this))
        }
      }
      this.options.selector ? this._options = t.extend({}, this.options, {
        trigger: "manual",
        selector: ""
      }) : this.fixTitle()
    }, e.prototype.getDefaults = function () {
      return e.DEFAULTS
    }, e.prototype.getOptions = function (e) {
      return e = t.extend({}, this.getDefaults(), this.$element.data(), e), e.delay && "number" == typeof e.delay && (e.delay = {
        show: e.delay,
        hide: e.delay
      }), e
    }, e.prototype.getDelegateOptions = function () {
      var e = {}, i = this.getDefaults();
      return this._options && t.each(this._options, function (t, n) {
        i[t] != n && (e[t] = n)
      }), e
    }, e.prototype.enter = function (e) {
      var i = e instanceof this.constructor ? e : t(e.currentTarget)[this.type](this.getDelegateOptions()).data("bs." + this.type);
      return clearTimeout(i.timeout), i.hoverState = "in", i.options.delay && i.options.delay.show ? (i.timeout = setTimeout(function () {
        "in" == i.hoverState && i.show()
      }, i.options.delay.show), void 0) : i.show()
    }, e.prototype.leave = function (e) {
      var i = e instanceof this.constructor ? e : t(e.currentTarget)[this.type](this.getDelegateOptions()).data("bs." + this.type);
      return clearTimeout(i.timeout), i.hoverState = "out", i.options.delay && i.options.delay.hide ? (i.timeout = setTimeout(function () {
        "out" == i.hoverState && i.hide()
      }, i.options.delay.hide), void 0) : i.hide()
    }, e.prototype.show = function () {
      var e = t.Event("show.bs." + this.type);
      if (this.hasContent() && this.enabled) {
        if (this.$element.trigger(e), e.isDefaultPrevented())return;
        var i = this.tip();
        this.setContent(), this.options.animation && i.addClass("fade");
        var n = "function" == typeof this.options.placement ? this.options.placement.call(this, i[0], this.$element[0]) : this.options.placement, r = /\s?auto?\s?/i, s = r.test(n);
        s && (n = n.replace(r, "") || "top"), i.detach().css({
          top: 0,
          left: 0,
          display: "block"
        }).addClass(n), this.options.container ? i.appendTo(this.options.container) : i.insertAfter(this.$element);
        var a = this.getPosition(), o = i[0].offsetWidth, l = i[0].offsetHeight;
        if (s) {
          var h = this.$element.parent(), u = n, c = document.documentElement.scrollTop || document.body.scrollTop, d = "body" == this.options.container ? window.innerWidth : h.outerWidth(), f = "body" == this.options.container ? window.innerHeight : h.outerHeight(), p = "body" == this.options.container ? 0 : h.offset().left;
          n = "bottom" == n && a.top + a.height + l - c > f ? "top" : "top" == n && a.top - c - l < 0 ? "bottom" : "right" == n && a.right + o > d ? "left" : "left" == n && a.left - o < p ? "right" : n, i.removeClass(u).addClass(n)
        }
        var g = this.getCalculatedOffset(n, a, o, l);
        this.applyPlacement(g, n), this.$element.trigger("shown.bs." + this.type)
      }
    }, e.prototype.applyPlacement = function (t, e) {
      var i, n = this.tip(), r = n[0].offsetWidth, s = n[0].offsetHeight, a = parseInt(n.css("margin-top"), 10), o = parseInt(n.css("margin-left"), 10);
      isNaN(a) && (a = 0), isNaN(o) && (o = 0), t.top = t.top + a, t.left = t.left + o, n.offset(t).addClass("in");
      var l = n[0].offsetWidth, h = n[0].offsetHeight;
      if ("top" == e && h != s && (i = !0, t.top = t.top + s - h), /bottom|top/.test(e)) {
        var u = 0;
        t.left < 0 && (u = -2 * t.left, t.left = 0, n.offset(t), l = n[0].offsetWidth, h = n[0].offsetHeight), this.replaceArrow(u - r + l, l, "left")
      } else this.replaceArrow(h - s, h, "top");
      i && n.offset(t)
    }, e.prototype.replaceArrow = function (t, e, i) {
      this.arrow().css(i, t ? 50 * (1 - t / e) + "%" : "")
    }, e.prototype.setContent = function () {
      var t = this.tip(), e = this.getTitle();
      t.find(".tooltip-inner")[this.options.html ? "html" : "text"](e), t.removeClass("fade in top bottom left right")
    }, e.prototype.hide = function () {
      function e() {
        "in" != i.hoverState && n.detach()
      }

      var i = this, n = this.tip(), r = t.Event("hide.bs." + this.type);
      return this.$element.trigger(r), r.isDefaultPrevented() ? void 0 : (n.removeClass("in"), t.support.transition && this.$tip.hasClass("fade") ? n.one(t.support.transition.end, e).emulateTransitionEnd(150) : e(), this.$element.trigger("hidden.bs." + this.type), this)
    }, e.prototype.fixTitle = function () {
      var t = this.$element;
      (t.attr("title") || "string" != typeof t.attr("data-original-title")) && t.attr("data-original-title", t.attr("title") || "").attr("title", "")
    }, e.prototype.hasContent = function () {
      return this.getTitle()
    }, e.prototype.getPosition = function () {
      var e = this.$element[0];
      return t.extend({}, "function" == typeof e.getBoundingClientRect ? e.getBoundingClientRect() : {
        width: e.offsetWidth,
        height: e.offsetHeight
      }, this.$element.offset())
    }, e.prototype.getCalculatedOffset = function (t, e, i, n) {
      return "bottom" == t ? {top: e.top + e.height, left: e.left + e.width / 2 - i / 2} : "top" == t ? {
        top: e.top - n,
        left: e.left + e.width / 2 - i / 2
      } : "left" == t ? {top: e.top + e.height / 2 - n / 2, left: e.left - i} : {
        top: e.top + e.height / 2 - n / 2,
        left: e.left + e.width
      }
    }, e.prototype.getTitle = function () {
      var t, e = this.$element, i = this.options;
      return t = e.attr("data-original-title") || ("function" == typeof i.title ? i.title.call(e[0]) : i.title)
    }, e.prototype.tip = function () {
      return this.$tip = this.$tip || t(this.options.template)
    }, e.prototype.arrow = function () {
      return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow")
    }, e.prototype.validate = function () {
      this.$element[0].parentNode || (this.hide(), this.$element = null, this.options = null)
    }, e.prototype.enable = function () {
      this.enabled = !0
    }, e.prototype.disable = function () {
      this.enabled = !1
    }, e.prototype.toggleEnabled = function () {
      this.enabled = !this.enabled
    }, e.prototype.toggle = function (e) {
      var i = e ? t(e.currentTarget)[this.type](this.getDelegateOptions()).data("bs." + this.type) : this;
      i.tip().hasClass("in") ? i.leave(i) : i.enter(i)
    }, e.prototype.destroy = function () {
      this.hide().$element.off("." + this.type).removeData("bs." + this.type)
    };
    var i = t.fn.tooltip;
    t.fn.tooltip = function (i) {
      return this.each(function () {
        var n = t(this), r = n.data("bs.tooltip"), s = "object" == typeof i && i;
        r || n.data("bs.tooltip", r = new e(this, s)), "string" == typeof i && r[i]()
      })
    }, t.fn.tooltip.Constructor = e, t.fn.tooltip.noConflict = function () {
      return t.fn.tooltip = i, this
    }
  }(window.jQuery), /**
 * Downward compatible, touchable dial
 *
 * Version: 1.2.0 (15/07/2012)
 * Requires: jQuery v1.7+
 *
 * Copyright (c) 2012 Anthony Terrien
 * Under MIT and GPL licenses:
 *  http://www.opensource.org/licenses/mit-license.php
 *  http://www.gnu.org/licenses/gpl.html
 *
 * Thanks to vor, eskimoblood, spiffistan, FabrizioC
 */
  function (t) {
    "use strict";
    var e = {}, i = Math.max, n = Math.min;
    e.c = {}, e.c.d = t(document), e.c.t = function (t) {
      return t.originalEvent.touches.length - 1
    }, e.o = function () {
      var i = this;
      this.o = null, this.$ = null, this.i = null, this.g = null, this.v = null, this.cv = null, this.x = 0, this.y = 0, this.$c = null, this.c = null, this.t = 0, this.isInit = !1, this.fgColor = null, this.pColor = null, this.dH = null, this.cH = null, this.eH = null, this.rH = null, this.scale = 1, this.run = function () {
        var e = function (t, e) {
          var n;
          for (n in e)i.o[n] = e[n];
          i.init(), i._configure()._draw()
        };
        if (!this.$.data("kontroled"))return this.$.data("kontroled", !0), this.extend(), this.o = t.extend({
          min: this.$.data("min") || 0,
          max: this.$.data("max") || 100,
          stopper: !0,
          readOnly: this.$.data("readonly"),
          cursor: this.$.data("cursor") === !0 && 30 || this.$.data("cursor") || 0,
          thickness: this.$.data("thickness") || .35,
          lineCap: this.$.data("linecap") || "butt",
          width: this.$.data("width") || 200,
          height: this.$.data("height") || 200,
          displayInput: null == this.$.data("displayinput") || this.$.data("displayinput"),
          displayPrevious: this.$.data("displayprevious"),
          fgColor: this.$.data("fgcolor") || "#87CEEB",
          inputColor: this.$.data("inputcolor") || this.$.data("fgcolor") || "#87CEEB",
          font: this.$.data("font") || "Arial",
          fontWeight: this.$.data("font-weight") || "bold",
          inline: !1,
          step: this.$.data("step") || 1,
          draw: null,
          change: null,
          cancel: null,
          release: null,
          error: null
        }, this.o), this.$.is("fieldset") ? (this.v = {}, this.i = this.$.find("input"), this.i.each(function (e) {
          var n = t(this);
          i.i[e] = n, i.v[e] = n.val(), n.bind("change", function () {
            var t = {};
            t[e] = n.val(), i.val(t)
          })
        }), this.$.find("legend").remove()) : (this.i = this.$, this.v = this.$.val(), "" == this.v && (this.v = this.o.min), this.$.bind("change", function () {
          i.val(i._validate(i.$.val()))
        })), !this.o.displayInput && this.$.hide(), this.$c = t(document.createElement("canvas")).attr({
          width: this.o.width,
          height: this.o.height
        }), "undefined" != typeof G_vmlCanvasManager && G_vmlCanvasManager.initElement(this.$c[0]), this.c = this.$c[0].getContext ? this.$c[0].getContext("2d") : null, this.c ? (this.$.wrap(t('<div style="' + (this.o.inline ? "display:inline;" : "") + "width:" + this.o.width + "px;height:" + this.o.height + 'px;"></div>')).before(this.$c), this.scale = (window.devicePixelRatio || 1) / (this.c.webkitBackingStorePixelRatio || this.c.mozBackingStorePixelRatio || this.c.msBackingStorePixelRatio || this.c.oBackingStorePixelRatio || this.c.backingStorePixelRatio || 1), 1 !== this.scale && (this.$c[0].width = this.$c[0].width * this.scale, this.$c[0].height = this.$c[0].height * this.scale, this.$c.width(this.o.width), this.$c.height(this.o.height)), this.v instanceof Object ? (this.cv = {}, this.copy(this.v, this.cv)) : this.cv = this.v, this.$.bind("configure", e).parent().bind("configure", e), this._listen()._configure()._xy().init(), this.isInit = !0, this._draw(), this) : (this.o.error && this.o.error(), void 0)
      }, this._draw = function () {
        var t = !0;
        i.g = i.c, i.clear(), i.dH && (t = i.dH()), t !== !1 && i.draw()
      }, this._touch = function (t) {
        var n = function (t) {
          var e = i.xy2val(t.originalEvent.touches[i.t].pageX, t.originalEvent.touches[i.t].pageY);
          e != i.cv && (i.cH && i.cH(e) === !1 || (i.change(i._validate(e)), i._draw()))
        };
        return this.t = e.c.t(t), n(t), e.c.d.bind("touchmove.k", n).bind("touchend.k", function () {
          e.c.d.unbind("touchmove.k touchend.k"), i.rH && i.rH(i.cv) === !1 || i.val(i.cv)
        }), this
      }, this._mouse = function (t) {
        var n = function (t) {
          var e = i.xy2val(t.pageX, t.pageY);
          e != i.cv && (i.cH && i.cH(e) === !1 || (i.change(i._validate(e)), i._draw()))
        };
        return n(t), e.c.d.bind("mousemove.k", n).bind("keyup.k", function (t) {
          if (27 === t.keyCode) {
            if (e.c.d.unbind("mouseup.k mousemove.k keyup.k"), i.eH && i.eH() === !1)return;
            i.cancel()
          }
        }).bind("mouseup.k", function () {
          e.c.d.unbind("mousemove.k mouseup.k keyup.k"), i.rH && i.rH(i.cv) === !1 || i.val(i.cv)
        }), this
      }, this._xy = function () {
        var t = this.$c.offset();
        return this.x = t.left, this.y = t.top, this
      }, this._listen = function () {
        return this.o.readOnly ? this.$.attr("readonly", "readonly") : (this.$c.bind("mousedown", function (t) {
          t.preventDefault(), i._xy()._mouse(t)
        }).bind("touchstart", function (t) {
          t.preventDefault(), i._xy()._touch(t)
        }), this.listen()), this
      }, this._configure = function () {
        return this.o.draw && (this.dH = this.o.draw), this.o.change && (this.cH = this.o.change), this.o.cancel && (this.eH = this.o.cancel), this.o.release && (this.rH = this.o.release), this.o.displayPrevious ? (this.pColor = this.h2rgba(this.o.fgColor, "0.4"), this.fgColor = this.h2rgba(this.o.fgColor, "0.6")) : this.fgColor = this.o.fgColor, this
      }, this._clear = function () {
        this.$c[0].width = this.$c[0].width
      }, this._validate = function (t) {
        return ~~((0 > t ? -.5 : .5) + t / this.o.step) * this.o.step
      }, this.listen = function () {
      }, this.extend = function () {
      }, this.init = function () {
      }, this.change = function () {
      }, this.val = function () {
      }, this.xy2val = function () {
      }, this.draw = function () {
      }, this.clear = function () {
        this._clear()
      }, this.h2rgba = function (t, e) {
        var i;
        return t = t.substring(1, 7), i = [parseInt(t.substring(0, 2), 16), parseInt(t.substring(2, 4), 16), parseInt(t.substring(4, 6), 16)], "rgba(" + i[0] + "," + i[1] + "," + i[2] + "," + e + ")"
      }, this.copy = function (t, e) {
        for (var i in t)e[i] = t[i]
      }
    }, e.Dial = function () {
      e.o.call(this), this.startAngle = null, this.xy = null, this.radius = null, this.lineWidth = null, this.cursorExt = null, this.w2 = null, this.PI2 = 2 * Math.PI, this.extend = function () {
        this.o = t.extend({
          bgColor: this.$.data("bgcolor") || "#EEEEEE",
          angleOffset: this.$.data("angleoffset") || 0,
          angleArc: this.$.data("anglearc") || 360,
          inline: !0
        }, this.o)
      }, this.val = function (t) {
        return null == t ? this.v : (this.cv = this.o.stopper ? i(n(t, this.o.max), this.o.min) : t, this.v = this.cv, this.$.val(this.v), this._draw(), void 0)
      }, this.xy2val = function (t, e) {
        var r, s;
        return r = Math.atan2(t - (this.x + this.w2), -(e - this.y - this.w2)) - this.angleOffset, this.angleArc != this.PI2 && 0 > r && r > -.5 ? r = 0 : 0 > r && (r += this.PI2), s = ~~(.5 + r * (this.o.max - this.o.min) / this.angleArc) + this.o.min, this.o.stopper && (s = i(n(s, this.o.max), this.o.min)), s
      }, this.listen = function () {
        var e, r, s = this, a = function (t) {
          t.preventDefault();
          var e = t.originalEvent, i = e.detail || e.wheelDeltaX, n = e.detail || e.wheelDeltaY, r = parseInt(s.$.val()) + (i > 0 || n > 0 ? s.o.step : 0 > i || 0 > n ? -s.o.step : 0);
          s.cH && s.cH(r) === !1 || s.val(r)
        }, o = 1, l = {37: -s.o.step, 38: s.o.step, 39: s.o.step, 40: -s.o.step};
        this.$.bind("keydown", function (a) {
          var h = a.keyCode;
          if (h >= 96 && 105 >= h && (h = a.keyCode = h - 48), e = parseInt(String.fromCharCode(h)), isNaN(e) && (13 !== h && 8 !== h && 9 !== h && 189 !== h && a.preventDefault(), t.inArray(h, [37, 38, 39, 40]) > -1)) {
            a.preventDefault();
            var u = parseInt(s.$.val()) + l[h] * o;
            s.o.stopper && (u = i(n(u, s.o.max), s.o.min)), s.change(u), s._draw(), r = window.setTimeout(function () {
              o *= 2
            }, 30)
          }
        }).bind("keyup", function () {
          isNaN(e) ? r && (window.clearTimeout(r), r = null, o = 1, s.val(s.$.val())) : s.$.val() > s.o.max && s.$.val(s.o.max) || s.$.val() < s.o.min && s.$.val(s.o.min)
        }), this.$c.bind("mousewheel DOMMouseScroll", a), this.$.bind("mousewheel DOMMouseScroll", a)
      }, this.init = function () {
        (this.v < this.o.min || this.v > this.o.max) && (this.v = this.o.min), this.$.val(this.v), this.w2 = this.o.width / 2, this.cursorExt = this.o.cursor / 100, this.xy = this.w2 * this.scale, this.lineWidth = this.xy * this.o.thickness, this.lineCap = this.o.lineCap, this.radius = this.xy - this.lineWidth / 2, this.o.angleOffset && (this.o.angleOffset = isNaN(this.o.angleOffset) ? 0 : this.o.angleOffset), this.o.angleArc && (this.o.angleArc = isNaN(this.o.angleArc) ? this.PI2 : this.o.angleArc), this.angleOffset = this.o.angleOffset * Math.PI / 180, this.angleArc = this.o.angleArc * Math.PI / 180, this.startAngle = 1.5 * Math.PI + this.angleOffset, this.endAngle = 1.5 * Math.PI + this.angleOffset + this.angleArc;
        var t = i(String(Math.abs(this.o.max)).length, String(Math.abs(this.o.min)).length, 2) + 2;
        this.o.displayInput && this.i.css({
          width: (this.o.width / 2 + 4 >> 0) + "px",
          height: (this.o.width / 3 >> 0) + "px",
          position: "absolute",
          "vertical-align": "middle",
          "margin-top": (this.o.width / 3 >> 0) + "px",
          "margin-left": "-" + (3 * this.o.width / 4 + 2 >> 0) + "px",
          border: 0,
          background: "none",
          font: this.o.fontWeight + " " + (this.o.width / t >> 0) + "px " + this.o.font,
          "text-align": "center",
          color: this.o.inputColor || this.o.fgColor,
          padding: "0px",
          "-webkit-appearance": "none"
        }) || this.i.css({width: "0px", visibility: "hidden"})
      }, this.change = function (t) {
        this.cv = t, this.$.val(t)
      }, this.angle = function (t) {
        return (t - this.o.min) * this.angleArc / (this.o.max - this.o.min)
      }, this.draw = function () {
        var t, e, i = this.g, n = this.angle(this.cv), r = this.startAngle, s = r + n, a = 1;
        i.lineWidth = this.lineWidth, i.lineCap = this.lineCap, this.o.cursor && (r = s - this.cursorExt) && (s += this.cursorExt), i.beginPath(), i.strokeStyle = this.o.bgColor, i.arc(this.xy, this.xy, this.radius, this.endAngle, this.startAngle, !0), i.stroke(), this.o.displayPrevious && (e = this.startAngle + this.angle(this.v), t = this.startAngle, this.o.cursor && (t = e - this.cursorExt) && (e += this.cursorExt), i.beginPath(), i.strokeStyle = this.pColor, i.arc(this.xy, this.xy, this.radius, t, e, !1), i.stroke(), a = this.cv == this.v), i.beginPath(), i.strokeStyle = a ? this.o.fgColor : this.fgColor, i.arc(this.xy, this.xy, this.radius, r, s, !1), i.stroke()
      }, this.cancel = function () {
        this.val(this.v)
      }
    }, t.fn.dial = t.fn.knob = function (i) {
      return this.each(function () {
        var n = new e.Dial;
        n.o = i, n.$ = t(this), n.run()
      }).parent()
    }
  }(jQuery), function (t, e) {
  function i(e) {
    t.extend(!0, we, e)
  }

  function n(i, n, h) {
    function u(t) {
      re ? v() && (D(), C(t)) : c()
    }

    function c() {
      se = n.theme ? "ui" : "fc", i.addClass("fc"), n.isRTL ? i.addClass("fc-rtl") : i.addClass("fc-ltr"), n.theme && i.addClass("ui-widget"), re = t("<div class='fc-content' style='position:relative'/>").prependTo(i), ie = new r(ee, n), ne = ie.render(), ne && i.prepend(ne), y(n.defaultView), n.handleWindowResize && t(window).resize(k), m() || f()
    }

    function f() {
      setTimeout(function () {
        !ae.start && m() && w()
      }, 0)
    }

    function p() {
      ae && (te("viewDestroy", ae, ae, ae.element), ae.triggerEventDestroy()), t(window).unbind("resize", k), ie.destroy(), re.remove(), i.removeClass("fc fc-rtl ui-widget")
    }

    function v() {
      return i.is(":visible")
    }

    function m() {
      return t("body").is(":visible")
    }

    function y(t) {
      ae && t == ae.name || _(t)
    }

    function _(e) {
      pe++, ae && (te("viewDestroy", ae, ae, ae.element), O(), ae.triggerEventDestroy(), J(), ae.element.remove(), ie.deactivateButton(ae.name)), ie.activateButton(e), ae = new De[e](t("<div class='fc-view fc-view-" + e + "' style='position:relative'/>").appendTo(re), ee), w(), Q(), pe--
    }

    function w(t) {
      (!ae.start || t || ae.start > ge || ge >= ae.end) && v() && C(t)
    }

    function C(t) {
      pe++, ae.start && (te("viewDestroy", ae, ae, ae.element), O(), R()), J(), ae.render(ge, t || 0), T(), Q(), (ae.afterRender || E)(), B(), j(), te("viewRender", ae, ae, ae.element), ae.trigger("viewDisplay", de), pe--, P()
    }

    function S() {
      v() && (O(), R(), D(), T(), F())
    }

    function D() {
      le = n.contentHeight ? n.contentHeight : n.height ? n.height - (ne ? ne.height() : 0) - A(re) : Math.round(re.width() / Math.max(n.aspectRatio, .5))
    }

    function T() {
      le === e && D(), pe++, ae.setHeight(le), ae.setWidth(re.width()), pe--, oe = i.outerWidth()
    }

    function k() {
      if (!pe)if (ae.start) {
        var t = ++fe;
        setTimeout(function () {
          t == fe && !pe && v() && oe != (oe = i.outerWidth()) && (pe++, S(), ae.trigger("windowResize", de), pe--)
        }, 200)
      } else f()
    }

    function M() {
      R(), L()
    }

    function I(t) {
      R(), F(t)
    }

    function F(t) {
      v() && (ae.setEventData(ve), ae.renderEvents(ve, t), ae.trigger("eventAfterAllRender"))
    }

    function R() {
      ae.triggerEventDestroy(), ae.clearEvents(), ae.clearEventData()
    }

    function P() {
      !n.lazyFetching || ue(ae.visStart, ae.visEnd) ? L() : F()
    }

    function L() {
      ce(ae.visStart, ae.visEnd)
    }

    function H(t) {
      ve = t, F()
    }

    function N(t) {
      I(t)
    }

    function B() {
      ie.updateTitle(ae.title)
    }

    function j() {
      var t = new Date;
      t >= ae.start && ae.end > t ? ie.disableButton("today") : ie.enableButton("today")
    }

    function W(t, i, n) {
      ae.select(t, i, n === e ? !0 : n)
    }

    function O() {
      ae && ae.unselect()
    }

    function $() {
      w(-1)
    }

    function q() {
      w(1)
    }

    function z() {
      a(ge, -1), w()
    }

    function U() {
      a(ge, 1), w()
    }

    function X() {
      ge = new Date, w()
    }

    function V(t, e, i) {
      t instanceof Date ? ge = d(t) : g(ge, t, e, i), w()
    }

    function Y(t, i, n) {
      t !== e && a(ge, t), i !== e && o(ge, i), n !== e && l(ge, n), w()
    }

    function G() {
      return d(ge)
    }

    function J() {
      re.css({width: "100%", height: re.height(), overflow: "hidden"})
    }

    function Q() {
      re.css({width: "", height: "", overflow: ""})
    }

    function Z() {
      return ae
    }

    function K(t, i) {
      return i === e ? n[t] : (("height" == t || "contentHeight" == t || "aspectRatio" == t) && (n[t] = i, S()), e)
    }

    function te(t, i) {
      return n[t] ? n[t].apply(i || de, Array.prototype.slice.call(arguments, 2)) : e
    }

    var ee = this;
    ee.options = n, ee.render = u, ee.destroy = p, ee.refetchEvents = M, ee.reportEvents = H, ee.reportEventChange = N, ee.rerenderEvents = I, ee.changeView = y, ee.select = W, ee.unselect = O, ee.prev = $, ee.next = q, ee.prevYear = z, ee.nextYear = U, ee.today = X, ee.gotoDate = V, ee.incrementDate = Y, ee.formatDate = function (t, e) {
      return b(t, e, n)
    }, ee.formatDates = function (t, e, i) {
      return x(t, e, i, n)
    }, ee.getDate = G, ee.getView = Z, ee.option = K, ee.trigger = te, s.call(ee, n, h);
    var ie, ne, re, se, ae, oe, le, he, ue = ee.isFetchNeeded, ce = ee.fetchEvents, de = i[0], fe = 0, pe = 0, ge = new Date, ve = [];
    g(ge, n.year, n.month, n.date), n.droppable && t(document).bind("dragstart", function (e, i) {
      var r = e.target, s = t(r);
      if (!s.parents(".fc").length) {
        var a = n.dropAccept;
        (t.isFunction(a) ? a.call(r, s) : s.is(a)) && (he = r, ae.dragStart(he, e, i))
      }
    }).bind("dragstop", function (t, e) {
      he && (ae.dragStop(he, t, e), he = null)
    })
  }

  function r(i, n) {
    function r() {
      f = n.theme ? "ui" : "fc";
      var i = n.header;
      return i ? p = t("<table class='fc-header' style='width:100%'/>").append(t("<tr/>").append(a("left")).append(a("center")).append(a("right"))) : e
    }

    function s() {
      p.remove()
    }

    function a(e) {
      var r = t("<td class='fc-header-" + e + "'/>"), s = n.header[e];
      return s && t.each(s.split(" "), function (e) {
        e > 0 && r.append("<span class='fc-header-space'/>");
        var s;
        t.each(this.split(","), function (e, a) {
          if ("title" == a)r.append("<span class='fc-header-title'><h2>&nbsp;</h2></span>"), s && s.addClass(f + "-corner-right"), s = null; else {
            var o;
            if (i[a] ? o = i[a] : De[a] && (o = function () {
                u.removeClass(f + "-state-hover"), i.changeView(a)
              }), o) {
              var l = n.theme ? j(n.buttonIcons, a) : null, h = j(n.buttonText, a), u = t("<span class='fc-button fc-button-" + a + " " + f + "-state-default'>" + (l ? "<span class='fc-icon-wrap'><span class='ui-icon ui-icon-" + l + "'/>" + "</span>" : h) + "</span>").click(function () {
                u.hasClass(f + "-state-disabled") || o()
              }).mousedown(function () {
                u.not("." + f + "-state-active").not("." + f + "-state-disabled").addClass(f + "-state-down")
              }).mouseup(function () {
                u.removeClass(f + "-state-down")
              }).hover(function () {
                u.not("." + f + "-state-active").not("." + f + "-state-disabled").addClass(f + "-state-hover")
              }, function () {
                u.removeClass(f + "-state-hover").removeClass(f + "-state-down")
              }).appendTo(r);
              O(u), s || u.addClass(f + "-corner-left"), s = u
            }
          }
        }), s && s.addClass(f + "-corner-right")
      }), r
    }

    function o(t) {
      p.find("h2").html(t)
    }

    function l(t) {
      p.find("span.fc-button-" + t).addClass(f + "-state-active")
    }

    function h(t) {
      p.find("span.fc-button-" + t).removeClass(f + "-state-active")
    }

    function u(t) {
      p.find("span.fc-button-" + t).addClass(f + "-state-disabled")
    }

    function c(t) {
      p.find("span.fc-button-" + t).removeClass(f + "-state-disabled")
    }

    var d = this;
    d.render = r, d.destroy = s, d.updateTitle = o, d.activateButton = l, d.deactivateButton = h, d.disableButton = u, d.enableButton = c;
    var f, p = t([])
  }

  function s(i, n) {
    function r(t, e) {
      return !S || S > t || e > D
    }

    function s(t, e) {
      S = t, D = e, L = [];
      var i = ++A, n = F.length;
      R = n;
      for (var r = 0; n > r; r++)a(F[r], i)
    }

    function a(e, n) {
      o(e, function (r) {
        if (n == A) {
          if (r) {
            i.eventDataTransform && (r = t.map(r, i.eventDataTransform)), e.eventDataTransform && (r = t.map(r, e.eventDataTransform));
            for (var s = 0; r.length > s; s++)r[s].source = e, b(r[s]);
            L = L.concat(r)
          }
          R--, R || M(L)
        }
      })
    }

    function o(n, r) {
      var s, a, l = Se.sourceFetchers;
      for (s = 0; l.length > s; s++) {
        if (a = l[s](n, S, D, r), a === !0)return;
        if ("object" == typeof a)return o(a, r), e
      }
      var h = n.events;
      if (h)t.isFunction(h) ? (m(), h(d(S), d(D), function (t) {
        r(t), y()
      })) : t.isArray(h) ? r(h) : r(); else {
        var u = n.url;
        if (u) {
          var c, f = n.success, p = n.error, g = n.complete;
          c = t.isFunction(n.data) ? n.data() : n.data;
          var v = t.extend({}, c || {}), b = U(n.startParam, i.startParam), x = U(n.endParam, i.endParam);
          b && (v[b] = Math.round(+S / 1e3)), x && (v[x] = Math.round(+D / 1e3)), m(), t.ajax(t.extend({}, Te, n, {
            data: v,
            success: function (e) {
              e = e || [];
              var i = z(f, this, arguments);
              t.isArray(i) && (e = i), r(e)
            },
            error: function () {
              z(p, this, arguments), r()
            },
            complete: function () {
              z(g, this, arguments), y()
            }
          }))
        } else r()
      }
    }

    function l(t) {
      t = h(t), t && (R++, a(t, A))
    }

    function h(i) {
      return t.isFunction(i) || t.isArray(i) ? i = {events: i} : "string" == typeof i && (i = {url: i}), "object" == typeof i ? (x(i), F.push(i), i) : e
    }

    function u(e) {
      F = t.grep(F, function (t) {
        return !_(t, e)
      }), L = t.grep(L, function (t) {
        return !_(t.source, e)
      }), M(L)
    }

    function c(t) {
      var e, i, n = L.length, r = k().defaultEventEnd, s = t.start - t._start, a = t.end ? t.end - (t._end || r(t)) : 0;
      for (e = 0; n > e; e++)i = L[e], i._id == t._id && i != t && (i.start = new Date(+i.start + s), i.end = t.end ? i.end ? new Date(+i.end + a) : new Date(+r(i) + a) : null, i.title = t.title, i.url = t.url, i.allDay = t.allDay, i.className = t.className, i.editable = t.editable, i.color = t.color, i.backgroundColor = t.backgroundColor, i.borderColor = t.borderColor, i.textColor = t.textColor, b(i));
      b(t), M(L)
    }

    function f(t, e) {
      b(t), t.source || (e && (I.events.push(t), t.source = I), L.push(t)), M(L)
    }

    function p(e) {
      if (e) {
        if (!t.isFunction(e)) {
          var i = e + "";
          e = function (t) {
            return t._id == i
          }
        }
        L = t.grep(L, e, !0);
        for (var n = 0; F.length > n; n++)t.isArray(F[n].events) && (F[n].events = t.grep(F[n].events, e, !0))
      } else {
        L = [];
        for (var n = 0; F.length > n; n++)t.isArray(F[n].events) && (F[n].events = [])
      }
      M(L)
    }

    function g(e) {
      return t.isFunction(e) ? t.grep(L, e) : e ? (e += "", t.grep(L, function (t) {
        return t._id == e
      })) : L
    }

    function m() {
      P++ || T("loading", null, !0, k())
    }

    function y() {
      --P || T("loading", null, !1, k())
    }

    function b(t) {
      var n = t.source || {}, r = U(n.ignoreTimezone, i.ignoreTimezone);
      t._id = t._id || (t.id === e ? "_fc" + ke++ : t.id + ""), t.date && (t.start || (t.start = t.date), delete t.date), t._start = d(t.start = v(t.start, r)), t.end = v(t.end, r), t.end && t.end <= t.start && (t.end = null), t._end = t.end ? d(t.end) : null, t.allDay === e && (t.allDay = U(n.allDayDefault, i.allDayDefault)), t.className ? "string" == typeof t.className && (t.className = t.className.split(/\s+/)) : t.className = []
    }

    function x(t) {
      t.className ? "string" == typeof t.className && (t.className = t.className.split(/\s+/)) : t.className = [];
      for (var e = Se.sourceNormalizers, i = 0; e.length > i; i++)e[i](t)
    }

    function _(t, e) {
      return t && e && w(t) == w(e)
    }

    function w(t) {
      return ("object" == typeof t ? t.events || t.url : "") || t
    }

    var C = this;
    C.isFetchNeeded = r, C.fetchEvents = s, C.addEventSource = l, C.removeEventSource = u, C.updateEvent = c, C.renderEvent = f, C.removeEvents = p, C.clientEvents = g, C.normalizeEvent = b;
    for (var S, D, T = C.trigger, k = C.getView, M = C.reportEvents, I = {events: []}, F = [I], A = 0, R = 0, P = 0, L = [], E = 0; n.length > E; E++)h(n[E])
  }

  function a(t, e, i) {
    return t.setFullYear(t.getFullYear() + e), i || c(t), t
  }

  function o(t, e, i) {
    if (+t) {
      var n = t.getMonth() + e, r = d(t);
      for (r.setDate(1), r.setMonth(n), t.setMonth(n), i || c(t); t.getMonth() != r.getMonth();)t.setDate(t.getDate() + (r > t ? 1 : -1))
    }
    return t
  }

  function l(t, e, i) {
    if (+t) {
      var n = t.getDate() + e, r = d(t);
      r.setHours(9), r.setDate(n), t.setDate(n), i || c(t), h(t, r)
    }
    return t
  }

  function h(t, e) {
    if (+t)for (; t.getDate() != e.getDate();)t.setTime(+t + (e > t ? 1 : -1) * Fe)
  }

  function u(t, e) {
    return t.setMinutes(t.getMinutes() + e), t
  }

  function c(t) {
    return t.setHours(0), t.setMinutes(0), t.setSeconds(0), t.setMilliseconds(0), t
  }

  function d(t, e) {
    return e ? c(new Date(+t)) : new Date(+t)
  }

  function f() {
    var t, e = 0;
    do t = new Date(1970, e++, 1); while (t.getHours());
    return t
  }

  function p(t, e) {
    return Math.round((d(t, !0) - d(e, !0)) / Ie)
  }

  function g(t, i, n, r) {
    i !== e && i != t.getFullYear() && (t.setDate(1), t.setMonth(0), t.setFullYear(i)), n !== e && n != t.getMonth() && (t.setDate(1), t.setMonth(n)), r !== e && t.setDate(r)
  }

  function v(t, i) {
    return "object" == typeof t ? t : "number" == typeof t ? new Date(1e3 * t) : "string" == typeof t ? t.match(/^\d+(\.\d+)?$/) ? new Date(1e3 * parseFloat(t)) : (i === e && (i = !0), m(t, i) || (t ? new Date(t) : null)) : null
  }

  function m(t, e) {
    var i = t.match(/^([0-9]{4})(-([0-9]{2})(-([0-9]{2})([T ]([0-9]{2}):([0-9]{2})(:([0-9]{2})(\.([0-9]+))?)?(Z|(([-+])([0-9]{2})(:?([0-9]{2}))?))?)?)?)?$/);
    if (!i)return null;
    var n = new Date(i[1], 0, 1);
    if (e || !i[13]) {
      var r = new Date(i[1], 0, 1, 9, 0);
      i[3] && (n.setMonth(i[3] - 1), r.setMonth(i[3] - 1)), i[5] && (n.setDate(i[5]), r.setDate(i[5])), h(n, r), i[7] && n.setHours(i[7]), i[8] && n.setMinutes(i[8]), i[10] && n.setSeconds(i[10]), i[12] && n.setMilliseconds(1e3 * Number("0." + i[12])), h(n, r)
    } else if (n.setUTCFullYear(i[1], i[3] ? i[3] - 1 : 0, i[5] || 1), n.setUTCHours(i[7] || 0, i[8] || 0, i[10] || 0, i[12] ? 1e3 * Number("0." + i[12]) : 0), i[14]) {
      var s = 60 * Number(i[16]) + (i[18] ? Number(i[18]) : 0);
      s *= "-" == i[15] ? 1 : -1, n = new Date(+n + 6e4 * s)
    }
    return n
  }

  function y(t) {
    if ("number" == typeof t)return 60 * t;
    if ("object" == typeof t)return 60 * t.getHours() + t.getMinutes();
    var e = t.match(/(\d+)(?::(\d+))?\s*(\w+)?/);
    if (e) {
      var i = parseInt(e[1], 10);
      return e[3] && (i %= 12, "p" == e[3].toLowerCase().charAt(0) && (i += 12)), 60 * i + (e[2] ? parseInt(e[2], 10) : 0)
    }
  }

  function b(t, e, i) {
    return x(t, null, e, i)
  }

  function x(t, e, i, n) {
    n = n || we;
    var r, s, a, o, l = t, h = e, u = i.length, c = "";
    for (r = 0; u > r; r++)if (s = i.charAt(r), "'" == s) {
      for (a = r + 1; u > a; a++)if ("'" == i.charAt(a)) {
        l && (c += a == r + 1 ? "'" : i.substring(r + 1, a), r = a);
        break
      }
    } else if ("(" == s) {
      for (a = r + 1; u > a; a++)if (")" == i.charAt(a)) {
        var d = b(l, i.substring(r + 1, a), n);
        parseInt(d.replace(/\D/, ""), 10) && (c += d), r = a;
        break
      }
    } else if ("[" == s) {
      for (a = r + 1; u > a; a++)if ("]" == i.charAt(a)) {
        var f = i.substring(r + 1, a), d = b(l, f, n);
        d != b(h, f, n) && (c += d), r = a;
        break
      }
    } else if ("{" == s)l = e, h = t; else if ("}" == s)l = t, h = e; else {
      for (a = u; a > r; a--)if (o = Re[i.substring(r, a)]) {
        l && (c += o(l, n)), r = a - 1;
        break
      }
      a == r && l && (c += s)
    }
    return c
  }

  function _(t) {
    var e, i = new Date(t.getTime());
    return i.setDate(i.getDate() + 4 - (i.getDay() || 7)), e = i.getTime(), i.setMonth(0), i.setDate(1), Math.floor(Math.round((e - i) / 864e5) / 7) + 1
  }

  function w(t) {
    return t.end ? C(t.end, t.allDay) : l(d(t.start), 1)
  }

  function C(t, e) {
    return t = d(t), e || t.getHours() || t.getMinutes() ? l(t, 1) : c(t)
  }

  function S(i, n, r) {
    i.unbind("mouseover").mouseover(function (i) {
      for (var s, a, o, l = i.target; l != this;)s = l, l = l.parentNode;
      (a = s._fci) !== e && (s._fci = e, o = n[a], r(o.event, o.element, o), t(i.target).trigger(i)), i.stopPropagation()
    })
  }

  function D(e, i, n) {
    for (var r, s = 0; e.length > s; s++)r = t(e[s]), r.width(Math.max(0, i - k(r, n)))
  }

  function T(e, i, n) {
    for (var r, s = 0; e.length > s; s++)r = t(e[s]), r.height(Math.max(0, i - A(r, n)))
  }

  function k(t, e) {
    return M(t) + F(t) + (e ? I(t) : 0)
  }

  function M(e) {
    return (parseFloat(t.css(e[0], "paddingLeft", !0)) || 0) + (parseFloat(t.css(e[0], "paddingRight", !0)) || 0)
  }

  function I(e) {
    return (parseFloat(t.css(e[0], "marginLeft", !0)) || 0) + (parseFloat(t.css(e[0], "marginRight", !0)) || 0)
  }

  function F(e) {
    return (parseFloat(t.css(e[0], "borderLeftWidth", !0)) || 0) + (parseFloat(t.css(e[0], "borderRightWidth", !0)) || 0)
  }

  function A(t, e) {
    return R(t) + L(t) + (e ? P(t) : 0)
  }

  function R(e) {
    return (parseFloat(t.css(e[0], "paddingTop", !0)) || 0) + (parseFloat(t.css(e[0], "paddingBottom", !0)) || 0)
  }

  function P(e) {
    return (parseFloat(t.css(e[0], "marginTop", !0)) || 0) + (parseFloat(t.css(e[0], "marginBottom", !0)) || 0)
  }

  function L(e) {
    return (parseFloat(t.css(e[0], "borderTopWidth", !0)) || 0) + (parseFloat(t.css(e[0], "borderBottomWidth", !0)) || 0)
  }

  function E() {
  }

  function H(t, e) {
    return t - e
  }

  function N(t) {
    return Math.max.apply(Math, t)
  }

  function B(t) {
    return (10 > t ? "0" : "") + t
  }

  function j(t, i) {
    if (t[i] !== e)return t[i];
    for (var n, r = i.split(/(?=[A-Z])/), s = r.length - 1; s >= 0; s--)if (n = t[r[s].toLowerCase()], n !== e)return n;
    return t[""]
  }

  function W(t) {
    return t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#039;").replace(/"/g, "&quot;").replace(/\n/g, "<br />")
  }

  function O(t) {
    t.attr("unselectable", "on").css("MozUserSelect", "none").bind("selectstart.ui", function () {
      return !1
    })
  }

  function $(t) {
    t.children().removeClass("fc-first fc-last").filter(":first-child").addClass("fc-first").end().filter(":last-child").addClass("fc-last")
  }

  function q(t, e) {
    var i = t.source || {}, n = t.color, r = i.color, s = e("eventColor"), a = t.backgroundColor || n || i.backgroundColor || r || e("eventBackgroundColor") || s, o = t.borderColor || n || i.borderColor || r || e("eventBorderColor") || s, l = t.textColor || i.textColor || e("eventTextColor"), h = [];
    return a && h.push("background-color:" + a), o && h.push("border-color:" + o), l && h.push("color:" + l), h.join(";")
  }

  function z(e, i, n) {
    if (t.isFunction(e) && (e = [e]), e) {
      var r, s;
      for (r = 0; e.length > r; r++)s = e[r].apply(i, n) || s;
      return s
    }
  }

  function U() {
    for (var t = 0; arguments.length > t; t++)if (arguments[t] !== e)return arguments[t]
  }

  function X(t, e) {
    function i(t, e) {
      e && (o(t, e), t.setDate(1));
      var i = r("firstDay"), c = d(t, !0);
      c.setDate(1);
      var f = o(d(c), 1), g = d(c);
      l(g, -((g.getDay() - i + 7) % 7)), a(g);
      var v = d(f);
      l(v, (7 - v.getDay() + i) % 7), a(v, -1, !0);
      var m = h(), y = Math.round(p(v, g) / 7);
      "fixed" == r("weekMode") && (l(v, 7 * (6 - y)), y = 6), n.title = u(c, r("titleFormat")), n.start = c, n.end = f, n.visStart = g, n.visEnd = v, s(y, m, !0)
    }

    var n = this;
    n.render = i, G.call(n, t, e, "month");
    var r = n.opt, s = n.renderBasic, a = n.skipHiddenDays, h = n.getCellsPerWeek, u = e.formatDate
  }

  function V(t, e) {
    function i(t, e) {
      e && l(t, 7 * e);
      var i = l(d(t), -((t.getDay() - r("firstDay") + 7) % 7)), u = l(d(i), 7), c = d(i);
      a(c);
      var f = d(u);
      a(f, -1, !0);
      var p = o();
      n.start = i, n.end = u, n.visStart = c, n.visEnd = f, n.title = h(c, l(d(f), -1), r("titleFormat")), s(1, p, !1)
    }

    var n = this;
    n.render = i, G.call(n, t, e, "basicWeek");
    var r = n.opt, s = n.renderBasic, a = n.skipHiddenDays, o = n.getCellsPerWeek, h = e.formatDates
  }

  function Y(t, e) {
    function i(t, e) {
      e && l(t, e), a(t, 0 > e ? -1 : 1);
      var i = d(t, !0), h = l(d(i), 1);
      n.title = o(t, r("titleFormat")), n.start = n.visStart = i, n.end = n.visEnd = h, s(1, 1, !1)
    }

    var n = this;
    n.render = i, G.call(n, t, e, "basicDay");
    var r = n.opt, s = n.renderBasic, a = n.skipHiddenDays, o = e.formatDate
  }

  function G(e, i, n) {
    function r(t, e, i) {
      ee = t, ie = e, ne = i, s(), q || a(), o()
    }

    function s() {
      le = pe("theme") ? "ui" : "fc", he = pe("columnFormat"), ue = pe("weekNumbers"), de = pe("weekNumberTitle"), fe = "iso" != pe("weekNumberCalculation") ? "w" : "W"
    }

    function a() {
      G = t("<div class='fc-event-container' style='position:absolute;z-index:8;top:0;left:0'/>").appendTo(e)
    }

    function o() {
      var i = h();
      N && N.remove(), N = t(i).appendTo(e), B = N.find("thead"), j = B.find(".fc-day-header"), q = N.find("tbody"), z = q.find("tr"), U = q.find(".fc-day"), X = z.find("td:first-child"), V = z.eq(0).find(".fc-day > div"), Y = z.eq(0).find(".fc-day-content > div"), $(B.add(B.find("tr"))), $(z), z.eq(0).addClass("fc-first"), z.filter(":last").addClass("fc-last"), U.each(function (e, i) {
        var n = Se(Math.floor(e / ie), e % ie);
        ge("dayRender", H, n, t(i))
      }), y(U)
    }

    function h() {
      var t = "<table class='fc-border-separate' style='width:100%' cellspacing='0'>" + u() + f() + "</table>";
      return t
    }

    function u() {
      var t, e, i = le + "-widget-header", n = "";
      for (n += "<thead><tr>", ue && (n += "<th class='fc-week-number " + i + "'>" + W(de) + "</th>"), t = 0; ie > t; t++)e = Se(0, t), n += "<th class='fc-day-header fc-" + Me[e.getDay()] + " " + i + "'>" + W(ke(e, he)) + "</th>";
      return n += "</tr></thead>"
    }

    function f() {
      var t, e, i, n = le + "-widget-content", r = "";
      for (r += "<tbody>", t = 0; ee > t; t++) {
        for (r += "<tr class='fc-week'>", ue && (i = Se(t, 0), r += "<td class='fc-week-number " + n + "'>" + "<div>" + W(ke(i, fe)) + "</div>" + "</td>"), e = 0; ie > e; e++)i = Se(t, e), r += p(i);
        r += "</tr>"
      }
      return r += "</tbody>"
    }

    function p(t) {
      var e = le + "-widget-content", i = H.start.getMonth(), n = c(new Date), r = "", s = ["fc-day", "fc-" + Me[t.getDay()], e];
      return t.getMonth() != i && s.push("fc-other-month"), +t == +n ? s.push("fc-today", le + "-state-highlight") : n > t ? s.push("fc-past") : s.push("fc-future"), r += "<td class='" + s.join(" ") + "'" + " data-date='" + ke(t, "yyyy-MM-dd") + "'" + ">" + "<div>", ne && (r += "<div class='fc-day-number'>" + t.getDate() + "</div>"), r += "<div class='fc-day-content'><div style='position:relative'>&nbsp;</div></div></div></td>"
    }

    function g(e) {
      Z = e;
      var i, n, r, s = Z - B.height();
      "variable" == pe("weekMode") ? i = n = Math.floor(s / (1 == ee ? 2 : 6)) : (i = Math.floor(s / ee), n = s - i * (ee - 1)), X.each(function (e, s) {
        ee > e && (r = t(s), r.find("> div").css("min-height", (e == ee - 1 ? n : i) - A(r)))
      })
    }

    function v(t) {
      Q = t, ae.clear(), oe.clear(), te = 0, ue && (te = B.find("th.fc-week-number").outerWidth()), K = Math.floor((Q - te) / ie), D(j.slice(0, -1), K)
    }

    function y(t) {
      t.click(b).mousedown(Ce)
    }

    function b(e) {
      if (!pe("selectable")) {
        var i = m(t(this).data("date"));
        ge("dayClick", this, i, !0, e)
      }
    }

    function x(t, e, i) {
      i && re.build();
      for (var n = Te(t, e), r = 0; n.length > r; r++) {
        var s = n[r];
        y(_(s.row, s.leftCol, s.row, s.rightCol))
      }
    }

    function _(t, i, n, r) {
      var s = re.rect(t, i, n, r, e);
      return xe(s, e)
    }

    function w(t) {
      return d(t)
    }

    function C(t, e) {
      x(t, l(d(e), 1), !0)
    }

    function S() {
      we()
    }

    function T(t, e, i) {
      var n = De(t), r = U[n.row * ie + n.col];
      ge("dayClick", r, t, e, i)
    }

    function k(t, e) {
      se.start(function (t) {
        we(), t && _(t.row, t.col, t.row, t.col)
      }, e)
    }

    function M(t, e, i) {
      var n = se.stop();
      if (we(), n) {
        var r = Se(n);
        ge("drop", t, r, !0, e, i)
      }
    }

    function I(t) {
      return d(t.start)
    }

    function F(t) {
      return ae.left(t)
    }

    function R(t) {
      return ae.right(t)
    }

    function P(t) {
      return oe.left(t)
    }

    function L(t) {
      return oe.right(t)
    }

    function E(t) {
      return z.eq(t)
    }

    var H = this;
    H.renderBasic = r, H.setHeight = g, H.setWidth = v, H.renderDayOverlay = x, H.defaultSelectionEnd = w, H.renderSelection = C, H.clearSelection = S, H.reportDayClick = T, H.dragStart = k, H.dragStop = M, H.defaultEventEnd = I, H.getHoverListener = function () {
      return se
    }, H.colLeft = F, H.colRight = R, H.colContentLeft = P, H.colContentRight = L, H.getIsCellAllDay = function () {
      return !0
    }, H.allDayRow = E, H.getRowCnt = function () {
      return ee
    }, H.getColCnt = function () {
      return ie
    }, H.getColWidth = function () {
      return K
    }, H.getDaySegmentContainer = function () {
      return G
    }, ce.call(H, e, i, n), me.call(H), ve.call(H), J.call(H);
    var N, B, j, q, z, U, X, V, Y, G, Q, Z, K, te, ee, ie, ne, re, se, ae, oe, le, he, ue, de, fe, pe = H.opt, ge = H.trigger, xe = H.renderOverlay, we = H.clearOverlays, Ce = H.daySelectionMousedown, Se = H.cellToDate, De = H.dateToCell, Te = H.rangeToSegments, ke = i.formatDate;
    O(e.addClass("fc-grid")), re = new ye(function (e, i) {
      var n, r, s;
      j.each(function (e, a) {
        n = t(a), r = n.offset().left, e && (s[1] = r), s = [r], i[e] = s
      }), s[1] = r + n.outerWidth(), z.each(function (i, a) {
        ee > i && (n = t(a), r = n.offset().top, i && (s[1] = r), s = [r], e[i] = s)
      }), s[1] = r + n.outerHeight()
    }), se = new be(re), ae = new _e(function (t) {
      return V.eq(t)
    }), oe = new _e(function (t) {
      return Y.eq(t)
    })
  }

  function J() {
    function t(t, e) {
      i.renderDayEvents(t, e)
    }

    function e() {
      i.getDaySegmentContainer().empty()
    }

    var i = this;
    i.renderEvents = t, i.clearEvents = e, de.call(i)
  }

  function Q(t, e) {
    function i(t, e) {
      e && l(t, 7 * e);
      var i = l(d(t), -((t.getDay() - r("firstDay") + 7) % 7)), u = l(d(i), 7), c = d(i);
      a(c);
      var f = d(u);
      a(f, -1, !0);
      var p = o();
      n.title = h(c, l(d(f), -1), r("titleFormat")), n.start = i, n.end = u, n.visStart = c, n.visEnd = f, s(p)
    }

    var n = this;
    n.render = i, K.call(n, t, e, "agendaWeek");
    var r = n.opt, s = n.renderAgenda, a = n.skipHiddenDays, o = n.getCellsPerWeek, h = e.formatDates
  }

  function Z(t, e) {
    function i(t, e) {
      e && l(t, e), a(t, 0 > e ? -1 : 1);
      var i = d(t, !0), h = l(d(i), 1);
      n.title = o(t, r("titleFormat")), n.start = n.visStart = i, n.end = n.visEnd = h, s(1)
    }

    var n = this;
    n.render = i, K.call(n, t, e, "agendaDay");
    var r = n.opt, s = n.renderAgenda, a = n.skipHiddenDays, o = e.formatDate
  }

  function K(i, n, r) {
    function s(t) {
      Le = t, a(), K ? h() : o()
    }

    function a() {
      We = Ye("theme") ? "ui" : "fc", Oe = Ye("isRTL"), $e = y(Ye("minTime")), qe = y(Ye("maxTime")), ze = Ye("columnFormat"), Ue = Ye("weekNumbers"), Xe = Ye("weekNumberTitle"), Ve = "iso" != Ye("weekNumberCalculation") ? "w" : "W", Ae = Ye("snapMinutes") || Ye("slotMinutes")
    }

    function o() {
      var e, n, r, s, a, o = We + "-widget-header", l = We + "-widget-content", c = 0 == Ye("slotMinutes") % 15;
      for (h(), he = t("<div style='position:absolute;z-index:2;left:0;width:100%'/>").appendTo(i), Ye("allDaySlot") ? (ue = t("<div class='fc-event-container' style='position:absolute;z-index:8;top:0;left:0'/>").appendTo(he), e = "<table style='width:100%' class='fc-agenda-allday' cellspacing='0'><tr><th class='" + o + " fc-agenda-axis'>" + Ye("allDayText") + "</th>" + "<td>" + "<div class='fc-day-content'><div style='position:relative'/></div>" + "</td>" + "<th class='" + o + " fc-agenda-gutter'>&nbsp;</th>" + "</tr>" + "</table>", de = t(e).appendTo(he), fe = de.find("tr"), w(fe.find("td")), he.append("<div class='fc-agenda-divider " + o + "'>" + "<div class='fc-agenda-divider-inner'/>" + "</div>")) : ue = t([]), pe = t("<div style='position:absolute;width:100%;overflow-x:hidden;overflow-y:auto'/>").appendTo(he), ge = t("<div style='position:relative;width:100%;overflow:hidden'/>").appendTo(pe), xe = t("<div class='fc-event-container' style='position:absolute;z-index:8;top:0;left:0'/>").appendTo(ge), e = "<table class='fc-agenda-slots' style='width:100%' cellspacing='0'><tbody>", n = f(), s = u(d(n), qe), u(n, $e), Ee = 0, r = 0; s > n; r++)a = n.getMinutes(), e += "<tr class='fc-slot" + r + " " + (a ? "fc-minor" : "") + "'>" + "<th class='fc-agenda-axis " + o + "'>" + (c && a ? "&nbsp;" : si(n, Ye("axisFormat"))) + "</th>" + "<td class='" + l + "'>" + "<div style='position:relative'>&nbsp;</div>" + "</td>" + "</tr>", u(n, Ye("slotMinutes")), Ee++;
      e += "</tbody></table>", we = t(e).appendTo(ge), C(we.find("td"))
    }

    function h() {
      var e = p();
      K && K.remove(), K = t(e).appendTo(i), ee = K.find("thead"), ie = ee.find("th").slice(1, -1), ne = K.find("tbody"), re = ne.find("td").slice(0, -1), se = re.find("> div"), ae = re.find(".fc-day-content > div"), oe = re.eq(0), le = se.eq(0), $(ee.add(ee.find("tr"))), $(ne.add(ne.find("tr")))
    }

    function p() {
      var t = "<table style='width:100%' class='fc-agenda-days fc-border-separate' cellspacing='0'>" + g() + v() + "</table>";
      return t
    }

    function g() {
      var t, e, i, n = We + "-widget-header", r = "";
      for (r += "<thead><tr>", Ue ? (t = ii(0, 0), e = si(t, Ve), Oe ? e += Xe : e = Xe + e, r += "<th class='fc-agenda-axis fc-week-number " + n + "'>" + W(e) + "</th>") : r += "<th class='fc-agenda-axis " + n + "'>&nbsp;</th>", i = 0; Le > i; i++)t = ii(0, i), r += "<th class='fc-" + Me[t.getDay()] + " fc-col" + i + " " + n + "'>" + W(si(t, ze)) + "</th>";
      return r += "<th class='fc-agenda-gutter " + n + "'>&nbsp;</th>" + "</tr>" + "</thead>"
    }

    function v() {
      var t, e, i, n, r, s = We + "-widget-header", a = We + "-widget-content", o = c(new Date), l = "";
      for (l += "<tbody><tr><th class='fc-agenda-axis " + s + "'>&nbsp;</th>", i = "", e = 0; Le > e; e++)t = ii(0, e), r = ["fc-col" + e, "fc-" + Me[t.getDay()], a], +t == +o ? r.push(We + "-state-highlight", "fc-today") : o > t ? r.push("fc-past") : r.push("fc-future"), n = "<td class='" + r.join(" ") + "'>" + "<div>" + "<div class='fc-day-content'>" + "<div style='position:relative'>&nbsp;</div>" + "</div>" + "</div>" + "</td>", i += n;
      return l += i, l += "<td class='fc-agenda-gutter " + a + "'>&nbsp;</td>" + "</tr>" + "</tbody>"
    }

    function m(t) {
      t === e && (t = De), De = t, ai = {};
      var i = ne.position().top, n = pe.position().top, r = Math.min(t - i, we.height() + n + 1);
      le.height(r - A(oe)), he.css("top", i), pe.height(r - n - 1), Fe = we.find("tr:first").height() + 1, Re = Ye("slotMinutes") / Ae, Pe = Fe / Re
    }

    function b(e) {
      Se = e, Be.clear(), je.clear();
      var i = ee.find("th:first");
      de && (i = i.add(de.find("th:first"))), i = i.add(we.find("th:first")), Te = 0, D(i.width("").each(function (e, i) {
        Te = Math.max(Te, t(i).outerWidth())
      }), Te);
      var n = K.find(".fc-agenda-gutter");
      de && (n = n.add(de.find("th.fc-agenda-gutter")));
      var r = pe[0].clientWidth;
      Ie = pe.width() - r, Ie ? (D(n, Ie), n.show().prev().removeClass("fc-last")) : n.hide().prev().addClass("fc-last"), ke = Math.floor((r - Te) / Le), D(ie.slice(0, -1), ke)
    }

    function x() {
      function t() {
        pe.scrollTop(n)
      }

      var e = f(), i = d(e);
      i.setHours(Ye("firstHour"));
      var n = B(e, i) + 1;
      t(), setTimeout(t, 0)
    }

    function _() {
      x()
    }

    function w(t) {
      t.click(S).mousedown(ti)
    }

    function C(t) {
      t.click(S).mousedown(Y)
    }

    function S(t) {
      if (!Ye("selectable")) {
        var e = Math.min(Le - 1, Math.floor((t.pageX - K.offset().left - Te) / ke)), i = ii(0, e), n = this.parentNode.className.match(/fc-slot(\d+)/);
        if (n) {
          var r = parseInt(n[1]) * Ye("slotMinutes"), s = Math.floor(r / 60);
          i.setHours(s), i.setMinutes(r % 60 + $e), Ge("dayClick", re[e], i, !1, t)
        } else Ge("dayClick", re[e], i, !0, t)
      }
    }

    function k(t, e, i) {
      i && He.build();
      for (var n = ri(t, e), r = 0; n.length > r; r++) {
        var s = n[r];
        w(M(s.row, s.leftCol, s.row, s.rightCol))
      }
    }

    function M(t, e, i, n) {
      var r = He.rect(t, e, i, n, he);
      return Je(r, he)
    }

    function I(t, e) {
      for (var i = 0; Le > i; i++) {
        var n = ii(0, i), r = l(d(n), 1), s = new Date(Math.max(n, t)), a = new Date(Math.min(r, e));
        if (a > s) {
          var o = He.rect(0, i, 0, i, ge), h = B(n, s), u = B(n, a);
          o.top = h, o.height = u - h, C(Je(o, ge))
        }
      }
    }

    function F(t) {
      return Be.left(t)
    }

    function R(t) {
      return je.left(t)
    }

    function P(t) {
      return Be.right(t)
    }

    function L(t) {
      return je.right(t)
    }

    function E(t) {
      return Ye("allDaySlot") && !t.row
    }

    function N(t) {
      var e = ii(0, t.col), i = t.row;
      return Ye("allDaySlot") && i--, i >= 0 && u(e, $e + i * Ae), e
    }

    function B(t, i) {
      if (t = d(t, !0), u(d(t), $e) > i)return 0;
      if (i >= u(d(t), qe))return we.height();
      var n = Ye("slotMinutes"), r = 60 * i.getHours() + i.getMinutes() - $e, s = Math.floor(r / n), a = ai[s];
      return a === e && (a = ai[s] = we.find("tr").eq(s).find("td div")[0].offsetTop), Math.max(0, Math.round(a - 1 + Fe * (r % n / n)))
    }

    function j() {
      return fe
    }

    function q(t) {
      var e = d(t.start);
      return t.allDay ? e : u(e, Ye("defaultEventMinutes"))
    }

    function z(t, e) {
      return e ? d(t) : u(d(t), Ye("slotMinutes"))
    }

    function U(t, e, i) {
      i ? Ye("allDaySlot") && k(t, l(d(e), 1), !0) : X(t, e)
    }

    function X(e, i) {
      var n = Ye("selectHelper");
      if (He.build(), n) {
        var r = ni(e).col;
        if (r >= 0 && Le > r) {
          var s = He.rect(0, r, 0, r, ge), a = B(e, e), o = B(e, i);
          if (o > a) {
            if (s.top = a, s.height = o - a, s.left += 2, s.width -= 5, t.isFunction(n)) {
              var l = n(e, i);
              l && (s.position = "absolute", Ce = t(l).css(s).appendTo(ge))
            } else s.isStart = !0, s.isEnd = !0, Ce = t(ei({
              title: "",
              start: e,
              end: i,
              className: ["fc-select-helper"],
              editable: !1
            }, s)), Ce.css("opacity", Ye("dragOpacity"));
            Ce && (C(Ce), ge.append(Ce), D(Ce, s.width, !0), T(Ce, s.height, !0))
          }
        }
      } else I(e, i)
    }

    function V() {
      Qe(), Ce && (Ce.remove(), Ce = null)
    }

    function Y(e) {
      if (1 == e.which && Ye("selectable")) {
        Ke(e);
        var i;
        Ne.start(function (t, e) {
          if (V(), t && t.col == e.col && !E(t)) {
            var n = N(e), r = N(t);
            i = [n, u(d(n), Ae), r, u(d(r), Ae)].sort(H), X(i[0], i[3])
          } else i = null
        }, e), t(document).one("mouseup", function (t) {
          Ne.stop(), i && (+i[0] == +i[1] && G(i[0], !1, t), Ze(i[0], i[3], !1, t))
        })
      }
    }

    function G(t, e, i) {
      Ge("dayClick", re[ni(t).col], t, e, i)
    }

    function J(t, e) {
      Ne.start(function (t) {
        if (Qe(), t)if (E(t))M(t.row, t.col, t.row, t.col); else {
          var e = N(t), i = u(d(e), Ye("defaultEventMinutes"));
          I(e, i)
        }
      }, e)
    }

    function Q(t, e, i) {
      var n = Ne.stop();
      Qe(), n && Ge("drop", t, N(n), E(n), e, i)
    }

    var Z = this;
    Z.renderAgenda = s, Z.setWidth = b, Z.setHeight = m, Z.afterRender = _, Z.defaultEventEnd = q, Z.timePosition = B, Z.getIsCellAllDay = E, Z.allDayRow = j, Z.getCoordinateGrid = function () {
      return He
    }, Z.getHoverListener = function () {
      return Ne
    }, Z.colLeft = F, Z.colRight = P, Z.colContentLeft = R, Z.colContentRight = L, Z.getDaySegmentContainer = function () {
      return ue
    }, Z.getSlotSegmentContainer = function () {
      return xe
    }, Z.getMinMinute = function () {
      return $e
    }, Z.getMaxMinute = function () {
      return qe
    }, Z.getSlotContainer = function () {
      return ge
    }, Z.getRowCnt = function () {
      return 1
    }, Z.getColCnt = function () {
      return Le
    }, Z.getColWidth = function () {
      return ke
    }, Z.getSnapHeight = function () {
      return Pe
    }, Z.getSnapMinutes = function () {
      return Ae
    }, Z.defaultSelectionEnd = z, Z.renderDayOverlay = k, Z.renderSelection = U, Z.clearSelection = V, Z.reportDayClick = G, Z.dragStart = J, Z.dragStop = Q, ce.call(Z, i, n, r), me.call(Z), ve.call(Z), te.call(Z);
    var K, ee, ie, ne, re, se, ae, oe, le, he, ue, de, fe, pe, ge, xe, we, Ce, Se, De, Te, ke, Ie, Fe, Ae, Re, Pe, Le, Ee, He, Ne, Be, je, We, Oe, $e, qe, ze, Ue, Xe, Ve, Ye = Z.opt, Ge = Z.trigger, Je = Z.renderOverlay, Qe = Z.clearOverlays, Ze = Z.reportSelection, Ke = Z.unselect, ti = Z.daySelectionMousedown, ei = Z.slotSegHtml, ii = Z.cellToDate, ni = Z.dateToCell, ri = Z.rangeToSegments, si = n.formatDate, ai = {};
    O(i.addClass("fc-agenda")), He = new ye(function (e, i) {
      function n(t) {
        return Math.max(l, Math.min(h, t))
      }

      var r, s, a;
      ie.each(function (e, n) {
        r = t(n), s = r.offset().left, e && (a[1] = s), a = [s], i[e] = a
      }), a[1] = s + r.outerWidth(), Ye("allDaySlot") && (r = fe, s = r.offset().top, e[0] = [s, s + r.outerHeight()]);
      for (var o = ge.offset().top, l = pe.offset().top, h = l + pe.outerHeight(), u = 0; Ee * Re > u; u++)e.push([n(o + Pe * u), n(o + Pe * (u + 1))])
    }), Ne = new be(He), Be = new _e(function (t) {
      return se.eq(t)
    }), je = new _e(function (t) {
      return ae.eq(t)
    })
  }

  function te() {
    function i(t, e) {
      var i, n = t.length, s = [], a = [];
      for (i = 0; n > i; i++)t[i].allDay ? s.push(t[i]) : a.push(t[i]);
      y("allDaySlot") && (te(s, e), M()), o(r(a), e)
    }

    function n() {
      I().empty(), F().empty()
    }

    function r(e) {
      var i, n, r, o, l, h = O(), c = L(), f = P(), p = t.map(e, a), g = [];
      for (n = 0; h > n; n++)for (i = j(0, n), u(i, c), l = s(e, p, i, u(d(i), f - c)), l = ee(l), r = 0; l.length > r; r++)o = l[r], o.col = n, g.push(o);
      return g
    }

    function s(t, e, i, n) {
      var r, s, a, o, l, h, u, c, f = [], p = t.length;
      for (r = 0; p > r; r++)s = t[r], a = s.start, o = e[r], o > i && n > a && (i > a ? (l = d(i), u = !1) : (l = a, u = !0), o > n ? (h = d(n), c = !1) : (h = o, c = !0), f.push({
        event: s,
        start: l,
        end: h,
        isStart: u,
        isEnd: c
      }));
      return f.sort(ue)
    }

    function a(t) {
      return t.end ? d(t.end) : u(d(t.start), y("defaultEventMinutes"))
    }

    function o(i, n) {
      var r, s, a, o, l, u, d, f, p, g, v, m, x, _, w, C, D = i.length, T = "", M = F(), I = y("isRTL");
      for (r = 0; D > r; r++)s = i[r], a = s.event, o = E(s.start, s.start), l = E(s.start, s.end), u = N(s.col), d = B(s.col), f = d - u, d -= .025 * f, f = d - u, p = f * (s.forwardCoord - s.backwardCoord), y("slotEventOverlap") && (p = Math.max(2 * (p - 10), p)), I ? (v = d - s.backwardCoord * f, g = v - p) : (g = u + s.backwardCoord * f, v = g + p), g = Math.max(g, u), v = Math.min(v, d), p = v - g, s.top = o, s.left = g, s.outerWidth = p, s.outerHeight = l - o, T += h(a, s);
      for (M[0].innerHTML = T, m = M.children(), r = 0; D > r; r++)s = i[r], a = s.event, x = t(m[r]), _ = b("eventRender", a, a, x), _ === !1 ? x.remove() : (_ && _ !== !0 && (x.remove(), x = t(_).css({
        position: "absolute",
        top: s.top,
        left: s.left
      }).appendTo(M)), s.element = x, a._id === n ? c(a, x, s) : x[0]._fci = r, V(a, x));
      for (S(M, i, c), r = 0; D > r; r++)s = i[r], (x = s.element) && (s.vsides = A(x, !0), s.hsides = k(x, !0), w = x.find(".fc-event-title"), w.length && (s.contentTop = w[0].offsetTop));
      for (r = 0; D > r; r++)s = i[r], (x = s.element) && (x[0].style.width = Math.max(0, s.outerWidth - s.hsides) + "px", C = Math.max(0, s.outerHeight - s.vsides), x[0].style.height = C + "px", a = s.event, s.contentTop !== e && 10 > C - s.contentTop && (x.find("div.fc-event-time").text(ne(a.start, y("timeFormat")) + " - " + a.title), x.find("div.fc-event-title").remove()), b("eventAfterRender", a, a, x))
    }

    function h(t, e) {
      var i = "<", n = t.url, r = q(t, y), s = ["fc-event", "fc-event-vert"];
      return x(t) && s.push("fc-event-draggable"), e.isStart && s.push("fc-event-start"), e.isEnd && s.push("fc-event-end"), s = s.concat(t.className), t.source && (s = s.concat(t.source.className || [])), i += n ? "a href='" + W(t.url) + "'" : "div", i += " class='" + s.join(" ") + "'" + " style=" + "'" + "position:absolute;" + "top:" + e.top + "px;" + "left:" + e.left + "px;" + r + "'" + ">" + "<div class='fc-event-inner'>" + "<div class='fc-event-time'>" + W(re(t.start, t.end, y("timeFormat"))) + "</div>" + "<div class='fc-event-title'>" + W(t.title || "") + "</div>" + "</div>" + "<div class='fc-event-bg'></div>", e.isEnd && _(t) && (i += "<div class='ui-resizable-handle ui-resizable-s'>=</div>"), i += "</" + (n ? "a" : "div") + ">"
    }

    function c(t, e, i) {
      var n = e.find("div.fc-event-time");
      x(t) && g(t, e, n), i.isEnd && _(t) && v(t, e, n), D(t, e)
    }

    function f(t, e, i) {
      function n() {
        h || (e.width(r).height("").draggable("option", "grid", null), h = !0)
      }

      var r, s, a, o = i.isStart, h = !0, u = R(), c = $(), f = z(), g = U(), v = L();
      e.draggable({
        opacity: y("dragOpacity", "month"), revertDuration: y("dragRevertDuration"), start: function (i, v) {
          b("eventDragStart", e, t, i, v), G(t, e), r = e.width(), u.start(function (i, r) {
            if (K(), i) {
              s = !1;
              var u = j(0, r.col), v = j(0, i.col);
              a = p(v, u), i.row ? o ? h && (e.width(c - 10), T(e, f * Math.round((t.end ? (t.end - t.start) / Ae : y("defaultEventMinutes")) / g)), e.draggable("option", "grid", [c, 1]), h = !1) : s = !0 : (Z(l(d(t.start), a), l(w(t), a)), n()), s = s || h && !a
            } else n(), s = !0;
            e.draggable("option", "revert", s)
          }, i, "drag")
        }, stop: function (i, r) {
          if (u.stop(), K(), b("eventDragStop", e, t, i, r), s)n(), e.css("filter", ""), Y(t, e); else {
            var o = 0;
            h || (o = Math.round((e.offset().top - X().offset().top) / f) * g + v - (60 * t.start.getHours() + t.start.getMinutes())), J(this, t, a, o, h, i, r)
          }
        }
      })
    }

    function g(t, e, i) {
      function n() {
        K(), o && (c ? (i.hide(), e.draggable("option", "grid", null), Z(l(d(t.start), x), l(w(t), x))) : (r(_), i.css("display", ""), e.draggable("option", "grid", [T, k])))
      }

      function r(e) {
        var n, r = u(d(t.start), e);
        t.end && (n = u(d(t.end), e)), i.text(re(r, n, y("timeFormat")))
      }

      var s, a, o, h, c, f, g, v, x, _, C, S = m.getCoordinateGrid(), D = O(), T = $(), k = z(), M = U();
      e.draggable({
        scroll: !1,
        grid: [T, k],
        axis: 1 == D ? "y" : !1,
        opacity: y("dragOpacity"),
        revertDuration: y("dragRevertDuration"),
        start: function (i, n) {
          b("eventDragStart", e, t, i, n), G(t, e), S.build(), s = e.position(), a = S.cell(i.pageX, i.pageY), o = h = !0, c = f = H(a), g = v = 0, x = 0, _ = C = 0
        },
        drag: function (t, i) {
          var r = S.cell(t.pageX, t.pageY);
          if (o = !!r) {
            if (c = H(r), g = Math.round((i.position.left - s.left) / T), g != v) {
              var l = j(0, a.col), u = a.col + g;
              u = Math.max(0, u), u = Math.min(D - 1, u);
              var d = j(0, u);
              x = p(d, l)
            }
            c || (_ = Math.round((i.position.top - s.top) / k) * M)
          }
          (o != h || c != f || g != v || _ != C) && (n(), h = o, f = c, v = g, C = _), e.draggable("option", "revert", !o)
        },
        stop: function (i, r) {
          K(), b("eventDragStop", e, t, i, r), o && (c || x || _) ? J(this, t, x, c ? 0 : _, c, i, r) : (o = !0, c = !1, g = 0, x = 0, _ = 0, n(), e.css("filter", ""), e.css(s), Y(t, e))
        }
      })
    }

    function v(t, e, i) {
      var n, r, s = z(), a = U();
      e.resizable({
        handles: {s: ".ui-resizable-handle"}, grid: s, start: function (i, s) {
          n = r = 0, G(t, e), b("eventResizeStart", this, t, i, s)
        }, resize: function (o, l) {
          n = Math.round((Math.max(s, e.height()) - l.originalSize.height) / s), n != r && (i.text(re(t.start, n || t.end ? u(C(t), a * n) : null, y("timeFormat"))), r = n)
        }, stop: function (i, r) {
          b("eventResizeStop", this, t, i, r), n ? Q(this, t, 0, a * n, i, r) : Y(t, e)
        }
      })
    }

    var m = this;
    m.renderEvents = i, m.clearEvents = n, m.slotSegHtml = h, de.call(m);
    var y = m.opt, b = m.trigger, x = m.isEventDraggable, _ = m.isEventResizable, C = m.eventEnd, D = m.eventElementHandlers, M = m.setHeight, I = m.getDaySegmentContainer, F = m.getSlotSegmentContainer, R = m.getHoverListener, P = m.getMaxMinute, L = m.getMinMinute, E = m.timePosition, H = m.getIsCellAllDay, N = m.colContentLeft, B = m.colContentRight, j = m.cellToDate, O = m.getColCnt, $ = m.getColWidth, z = m.getSnapHeight, U = m.getSnapMinutes, X = m.getSlotContainer, V = m.reportEventElement, Y = m.showEvents, G = m.hideEvents, J = m.eventDrop, Q = m.eventResize, Z = m.renderDayOverlay, K = m.clearOverlays, te = m.renderDayEvents, ie = m.calendar, ne = ie.formatDate, re = ie.formatDates;
    m.draggableDayEvent = f
  }

  function ee(t) {
    var e, i = ie(t), n = i[0];
    if (ne(i), n) {
      for (e = 0; n.length > e; e++)re(n[e]);
      for (e = 0; n.length > e; e++)se(n[e], 0, 0)
    }
    return ae(i)
  }

  function ie(t) {
    var e, i, n, r = [];
    for (e = 0; t.length > e; e++) {
      for (i = t[e], n = 0; r.length > n && oe(i, r[n]).length; n++);
      (r[n] || (r[n] = [])).push(i)
    }
    return r
  }

  function ne(t) {
    var e, i, n, r, s;
    for (e = 0; t.length > e; e++)for (i = t[e], n = 0; i.length > n; n++)for (r = i[n], r.forwardSegs = [], s = e + 1; t.length > s; s++)oe(r, t[s], r.forwardSegs)
  }

  function re(t) {
    var i, n, r = t.forwardSegs, s = 0;
    if (t.forwardPressure === e) {
      for (i = 0; r.length > i; i++)n = r[i], re(n), s = Math.max(s, 1 + n.forwardPressure);
      t.forwardPressure = s
    }
  }

  function se(t, i, n) {
    var r, s = t.forwardSegs;
    if (t.forwardCoord === e)for (s.length ? (s.sort(he), se(s[0], i + 1, n), t.forwardCoord = s[0].backwardCoord) : t.forwardCoord = 1, t.backwardCoord = t.forwardCoord - (t.forwardCoord - n) / (i + 1), r = 0; s.length > r; r++)se(s[r], 0, t.forwardCoord)
  }

  function ae(t) {
    var e, i, n, r = [];
    for (e = 0; t.length > e; e++)for (i = t[e], n = 0; i.length > n; n++)r.push(i[n]);
    return r
  }

  function oe(t, e, i) {
    i = i || [];
    for (var n = 0; e.length > n; n++)le(t, e[n]) && i.push(e[n]);
    return i
  }

  function le(t, e) {
    return t.end > e.start && t.start < e.end
  }

  function he(t, e) {
    return e.forwardPressure - t.forwardPressure || (t.backwardCoord || 0) - (e.backwardCoord || 0) || ue(t, e)
  }

  function ue(t, e) {
    return t.start - e.start || e.end - e.start - (t.end - t.start) || (t.event.title || "").localeCompare(e.event.title)
  }

  function ce(i, n, r) {
    function s(e, i) {
      var n = V[e];
      return t.isPlainObject(n) ? j(n, i || r) : n
    }

    function a(t, e) {
      return n.trigger.apply(n, [t, e || B].concat(Array.prototype.slice.call(arguments, 2), [B]))
    }

    function o(t) {
      var e = t.source || {};
      return U(t.startEditable, e.startEditable, s("eventStartEditable"), t.editable, e.editable, s("editable")) && !s("disableDragging")
    }

    function h(t) {
      var e = t.source || {};
      return U(t.durationEditable, e.durationEditable, s("eventDurationEditable"), t.editable, e.editable, s("editable")) && !s("disableResizing")
    }

    function c(t) {
      q = {};
      var e, i, n = t.length;
      for (e = 0; n > e; e++)i = t[e], q[i._id] ? q[i._id].push(i) : q[i._id] = [i]
    }

    function f() {
      q = {}, z = {}, X = []
    }

    function g(t) {
      return t.end ? d(t.end) : W(t)
    }

    function v(t, e) {
      X.push({event: t, element: e}), z[t._id] ? z[t._id].push(e) : z[t._id] = [e]
    }

    function m() {
      t.each(X, function (t, e) {
        B.trigger("eventDestroy", e.event, e.event, e.element)
      })
    }

    function y(t, i) {
      i.click(function (n) {
        return i.hasClass("ui-draggable-dragging") || i.hasClass("ui-resizable-resizing") ? e : a("eventClick", this, t, n)
      }).hover(function (e) {
        a("eventMouseover", this, t, e)
      }, function (e) {
        a("eventMouseout", this, t, e)
      })
    }

    function b(t, e) {
      _(t, e, "show")
    }

    function x(t, e) {
      _(t, e, "hide")
    }

    function _(t, e, i) {
      var n, r = z[t._id], s = r.length;
      for (n = 0; s > n; n++)e && r[n][0] == e[0] || r[n][i]()
    }

    function w(t, e, i, n, r, s, o) {
      var l = e.allDay, h = e._id;
      S(q[h], i, n, r), a("eventDrop", t, e, i, n, r, function () {
        S(q[h], -i, -n, l), $(h)
      }, s, o), $(h)
    }

    function C(t, e, i, n, r, s) {
      var o = e._id;
      D(q[o], i, n), a("eventResize", t, e, i, n, function () {
        D(q[o], -i, -n), $(o)
      }, r, s), $(o)
    }

    function S(t, i, n, r) {
      n = n || 0;
      for (var s, a = t.length, o = 0; a > o; o++)s = t[o], r !== e && (s.allDay = r), u(l(s.start, i, !0), n), s.end && (s.end = u(l(s.end, i, !0), n)), O(s, V)
    }

    function D(t, e, i) {
      i = i || 0;
      for (var n, r = t.length, s = 0; r > s; s++)n = t[s], n.end = u(l(g(n), e, !0), i), O(n, V)
    }

    function T(t) {
      return "object" == typeof t && (t = t.getDay()), J[t]
    }

    function k() {
      return Y
    }

    function M(t, e, i) {
      for (e = e || 1; J[(t.getDay() + (i ? e : 0) + 7) % 7];)l(t, e)
    }

    function I() {
      var t = F.apply(null, arguments), e = A(t), i = R(e);
      return i
    }

    function F(t, e) {
      var i = B.getColCnt(), n = K ? -1 : 1, r = K ? i - 1 : 0;
      "object" == typeof t && (e = t.col, t = t.row);
      var s = t * i + (e * n + r);
      return s
    }

    function A(t) {
      var e = B.visStart.getDay();
      return t += Q[e], 7 * Math.floor(t / Y) + Z[(t % Y + Y) % Y] - e
    }

    function R(t) {
      var e = d(B.visStart);
      return l(e, t), e
    }

    function P(t) {
      var e = L(t), i = E(e), n = H(i);
      return n
    }

    function L(t) {
      return p(t, B.visStart)
    }

    function E(t) {
      var e = B.visStart.getDay();
      return t += e, Math.floor(t / 7) * Y + Q[(t % 7 + 7) % 7] - Q[e]
    }

    function H(t) {
      var e = B.getColCnt(), i = K ? -1 : 1, n = K ? e - 1 : 0, r = Math.floor(t / e), s = (t % e + e) % e * i + n;
      return {row: r, col: s}
    }

    function N(t, e) {
      for (var i = B.getRowCnt(), n = B.getColCnt(), r = [], s = L(t), a = L(e), o = E(s), l = E(a) - 1, h = 0; i > h; h++) {
        var u = h * n, c = u + n - 1, d = Math.max(o, u), f = Math.min(l, c);
        if (f >= d) {
          var p = H(d), g = H(f), v = [p.col, g.col].sort(), m = A(d) == s, y = A(f) + 1 == a;
          r.push({row: h, leftCol: v[0], rightCol: v[1], isStart: m, isEnd: y})
        }
      }
      return r
    }

    var B = this;
    B.element = i, B.calendar = n, B.name = r, B.opt = s, B.trigger = a, B.isEventDraggable = o, B.isEventResizable = h, B.setEventData = c, B.clearEventData = f, B.eventEnd = g, B.reportEventElement = v, B.triggerEventDestroy = m, B.eventElementHandlers = y, B.showEvents = b, B.hideEvents = x, B.eventDrop = w, B.eventResize = C;
    var W = B.defaultEventEnd, O = n.normalizeEvent, $ = n.reportEventChange, q = {}, z = {}, X = [], V = n.options;
    B.isHiddenDay = T, B.skipHiddenDays = M, B.getCellsPerWeek = k, B.dateToCell = P, B.dateToDayOffset = L, B.dayOffsetToCellOffset = E, B.cellOffsetToCell = H, B.cellToDate = I, B.cellToCellOffset = F, B.cellOffsetToDayOffset = A, B.dayOffsetToDate = R, B.rangeToSegments = N;
    var Y, G = s("hiddenDays") || [], J = [], Q = [], Z = [], K = s("isRTL");
    !function () {
      s("weekends") === !1 && G.push(0, 6);
      for (var e = 0, i = 0; 7 > e; e++)Q[e] = i, J[e] = -1 != t.inArray(e, G), J[e] || (Z[i] = e, i++);
      if (Y = i, !Y)throw"invalid hiddenDays"
    }()
  }

  function de() {
    function e(t, e) {
      var i = n(t, !1, !0);
      pe(i, function (t, e) {
        R(t.event, e)
      }), b(i, e), pe(i, function (t, e) {
        M("eventAfterRender", t.event, t.event, e)
      })
    }

    function i(t, e, i) {
      var r = n([t], !0, !1), s = [];
      return pe(r, function (t, n) {
        t.row === e && n.css("top", i), s.push(n[0])
      }), s
    }

    function n(e, i, n) {
      var s, l, h = G(), d = i ? t("<div/>") : h, f = r(e);
      return a(f), s = o(f), d[0].innerHTML = s, l = d.children(), i && h.append(l), u(f, l), pe(f, function (t, e) {
        t.hsides = k(e, !0)
      }), pe(f, function (t, e) {
        e.width(Math.max(0, t.outerWidth - t.hsides))
      }), pe(f, function (t, e) {
        t.outerHeight = e.outerHeight(!0)
      }), c(f, n), f
    }

    function r(t) {
      for (var e = [], i = 0; t.length > i; i++) {
        var n = s(t[i]);
        e.push.apply(e, n)
      }
      return e
    }

    function s(t) {
      for (var e = t.start, i = w(t), n = ee(e, i), r = 0; n.length > r; r++)n[r].event = t;
      return n
    }

    function a(t) {
      for (var e = T("isRTL"), i = 0; t.length > i; i++) {
        var n = t[i], r = (e ? n.isEnd : n.isStart) ? V : U, s = (e ? n.isStart : n.isEnd) ? Y : X, a = r(n.leftCol), o = s(n.rightCol);
        n.left = a, n.outerWidth = o - a
      }
    }

    function o(t) {
      for (var e = "", i = 0; t.length > i; i++)e += h(t[i]);
      return e
    }

    function h(t) {
      var e = "", i = T("isRTL"), n = t.event, r = n.url, s = ["fc-event", "fc-event-hori"];
      I(n) && s.push("fc-event-draggable"), t.isStart && s.push("fc-event-start"), t.isEnd && s.push("fc-event-end"), s = s.concat(n.className), n.source && (s = s.concat(n.source.className || []));
      var a = q(n, T);
      return e += r ? "<a href='" + W(r) + "'" : "<div", e += " class='" + s.join(" ") + "'" + " style=" + "'" + "position:absolute;" + "left:" + t.left + "px;" + a + "'" + ">" + "<div class='fc-event-inner'>", !n.allDay && t.isStart && (e += "<span class='fc-event-time'>" + W(J(n.start, n.end, T("timeFormat"))) + "</span>"), e += "<span class='fc-event-title'>" + W(n.title || "") + "</span>" + "</div>", t.isEnd && F(n) && (e += "<div class='ui-resizable-handle ui-resizable-" + (i ? "w" : "e") + "'>" + "&nbsp;&nbsp;&nbsp;" + "</div>"), e += "</" + (r ? "a" : "div") + ">"
    }

    function u(e, i) {
      for (var n = 0; e.length > n; n++) {
        var r = e[n], s = r.event, a = i.eq(n), o = M("eventRender", s, s, a);
        o === !1 ? a.remove() : (o && o !== !0 && (o = t(o).css({
          position: "absolute",
          left: r.left
        }), a.replaceWith(o), a = o), r.element = a)
      }
    }

    function c(t, e) {
      var i = f(t), n = y(), r = [];
      if (e)for (var s = 0; n.length > s; s++)n[s].height(i[s]);
      for (var s = 0; n.length > s; s++)r.push(n[s].position().top);
      pe(t, function (t, e) {
        e.css("top", r[t.row] + t.top)
      })
    }

    function f(t) {
      for (var e = j(), i = $(), n = [], r = g(t), s = 0; e > s; s++) {
        for (var a = r[s], o = [], l = 0; i > l; l++)o.push(0);
        for (var h = 0; a.length > h; h++) {
          var u = a[h];
          u.top = N(o.slice(u.leftCol, u.rightCol + 1));
          for (var l = u.leftCol; u.rightCol >= l; l++)o[l] = u.top + u.outerHeight
        }
        n.push(N(o))
      }
      return n
    }

    function g(t) {
      var e, i, n, r = j(), s = [];
      for (e = 0; t.length > e; e++)i = t[e], n = i.row, i.element && (s[n] ? s[n].push(i) : s[n] = [i]);
      for (n = 0; r > n; n++)s[n] = v(s[n] || []);
      return s
    }

    function v(t) {
      for (var e = [], i = m(t), n = 0; i.length > n; n++)e.push.apply(e, i[n]);
      return e
    }

    function m(t) {
      t.sort(ge);
      for (var e = [], i = 0; t.length > i; i++) {
        for (var n = t[i], r = 0; e.length > r && fe(n, e[r]); r++);
        e[r] ? e[r].push(n) : e[r] = [n]
      }
      return e
    }

    function y() {
      var t, e = j(), i = [];
      for (t = 0; e > t; t++)i[t] = z(t).find("div.fc-day-content > div");
      return i
    }

    function b(t, e) {
      var i = G();
      pe(t, function (t, i, n) {
        var r = t.event;
        r._id === e ? x(r, i, t) : i[0]._fci = n
      }), S(i, t, x)
    }

    function x(t, e, i) {
      I(t) && D.draggableDayEvent(t, e, i), i.isEnd && F(t) && D.resizableDayEvent(t, e, i), P(t, e)
    }

    function _(t, e) {
      var i, n = te();
      e.draggable({
        delay: 50,
        opacity: T("dragOpacity"),
        revertDuration: T("dragRevertDuration"),
        start: function (r, s) {
          M("eventDragStart", e, t, r, s), E(t, e), n.start(function (n, r, s, a) {
            if (e.draggable("option", "revert", !n || !s && !a), Z(), n) {
              var o = ie(r), h = ie(n);
              i = p(h, o), Q(l(d(t.start), i), l(w(t), i))
            } else i = 0
          }, r, "drag")
        },
        stop: function (r, s) {
          n.stop(), Z(), M("eventDragStop", e, t, r, s), i ? H(this, t, i, 0, t.allDay, r, s) : (e.css("filter", ""), L(t, e))
        }
      })
    }

    function C(e, n, r) {
      var s = T("isRTL"), a = s ? "w" : "e", o = n.find(".ui-resizable-" + a), h = !1;
      O(n), n.mousedown(function (t) {
        t.preventDefault()
      }).click(function (t) {
        h && (t.preventDefault(), t.stopImmediatePropagation())
      }), o.mousedown(function (s) {
        function o(i) {
          M("eventResizeStop", this, e, i), t("body").css("cursor", ""), u.stop(), Z(), c && B(this, e, c, 0, i), setTimeout(function () {
            h = !1
          }, 0)
        }

        if (1 == s.which) {
          h = !0;
          var u = te();
          j(), $();
          var c, d, f = n.css("top"), p = t.extend({}, e), g = ae(se(e.start));
          K(), t("body").css("cursor", a + "-resize").one("mouseup", o), M("eventResizeStart", this, e, s), u.start(function (n, s) {
            if (n) {
              var o = ne(s), h = ne(n);
              if (h = Math.max(h, g), c = re(h) - re(o)) {
                p.end = l(A(e), c, !0);
                var u = d;
                d = i(p, r.row, f), d = t(d), d.find("*").css("cursor", a + "-resize"), u && u.remove(), E(e)
              } else d && (L(e), d.remove(), d = null);
              Z(), Q(e.start, l(w(e), c))
            }
          }, s)
        }
      })
    }

    var D = this;
    D.renderDayEvents = e, D.draggableDayEvent = _, D.resizableDayEvent = C;
    var T = D.opt, M = D.trigger, I = D.isEventDraggable, F = D.isEventResizable, A = D.eventEnd, R = D.reportEventElement, P = D.eventElementHandlers, L = D.showEvents, E = D.hideEvents, H = D.eventDrop, B = D.eventResize, j = D.getRowCnt, $ = D.getColCnt;
    D.getColWidth;
    var z = D.allDayRow, U = D.colLeft, X = D.colRight, V = D.colContentLeft, Y = D.colContentRight;
    D.dateToCell;
    var G = D.getDaySegmentContainer, J = D.calendar.formatDates, Q = D.renderDayOverlay, Z = D.clearOverlays, K = D.clearSelection, te = D.getHoverListener, ee = D.rangeToSegments, ie = D.cellToDate, ne = D.cellToCellOffset, re = D.cellOffsetToDayOffset, se = D.dateToDayOffset, ae = D.dayOffsetToCellOffset
  }

  function fe(t, e) {
    for (var i = 0; e.length > i; i++) {
      var n = e[i];
      if (n.leftCol <= t.rightCol && n.rightCol >= t.leftCol)return !0
    }
    return !1
  }

  function pe(t, e) {
    for (var i = 0; t.length > i; i++) {
      var n = t[i], r = n.element;
      r && e(n, r, i)
    }
  }

  function ge(t, e) {
    return e.rightCol - e.leftCol - (t.rightCol - t.leftCol) || e.event.allDay - t.event.allDay || t.event.start - e.event.start || (t.event.title || "").localeCompare(e.event.title)
  }

  function ve() {
    function e(t, e, r) {
      i(), e || (e = l(t, r)), h(t, e, r), n(t, e, r)
    }

    function i(t) {
      c && (c = !1, u(), o("unselect", null, t))
    }

    function n(t, e, i, n) {
      c = !0, o("select", null, t, e, i, n)
    }

    function r(e) {
      var r = s.cellToDate, o = s.getIsCellAllDay, l = s.getHoverListener(), c = s.reportDayClick;
      if (1 == e.which && a("selectable")) {
        i(e);
        var d;
        l.start(function (t, e) {
          u(), t && o(t) ? (d = [r(e), r(t)].sort(H), h(d[0], d[1], !0)) : d = null
        }, e), t(document).one("mouseup", function (t) {
          l.stop(), d && (+d[0] == +d[1] && c(d[0], !0, t), n(d[0], d[1], !0, t))
        })
      }
    }

    var s = this;
    s.select = e, s.unselect = i, s.reportSelection = n, s.daySelectionMousedown = r;
    var a = s.opt, o = s.trigger, l = s.defaultSelectionEnd, h = s.renderSelection, u = s.clearSelection, c = !1;
    a("selectable") && a("unselectAuto") && t(document).mousedown(function (e) {
      var n = a("unselectCancel");
      n && t(e.target).parents(n).length || i(e)
    })
  }

  function me() {
    function e(e, i) {
      var n = s.shift();
      return n || (n = t("<div class='fc-cell-overlay' style='position:absolute;z-index:3'/>")), n[0].parentNode != i[0] && n.appendTo(i), r.push(n.css(e).show()), n
    }

    function i() {
      for (var t; t = r.shift();)s.push(t.hide().unbind())
    }

    var n = this;
    n.renderOverlay = e, n.clearOverlays = i;
    var r = [], s = []
  }

  function ye(t) {
    var e, i, n = this;
    n.build = function () {
      e = [], i = [], t(e, i)
    }, n.cell = function (t, n) {
      var r, s = e.length, a = i.length, o = -1, l = -1;
      for (r = 0; s > r; r++)if (n >= e[r][0] && e[r][1] > n) {
        o = r;
        break
      }
      for (r = 0; a > r; r++)if (t >= i[r][0] && i[r][1] > t) {
        l = r;
        break
      }
      return o >= 0 && l >= 0 ? {row: o, col: l} : null
    }, n.rect = function (t, n, r, s, a) {
      var o = a.offset();
      return {top: e[t][0] - o.top, left: i[n][0] - o.left, width: i[s][1] - i[n][0], height: e[r][1] - e[t][0]}
    }
  }

  function be(e) {
    function i(t) {
      xe(t);
      var i = e.cell(t.pageX, t.pageY);
      (!i != !a || i && (i.row != a.row || i.col != a.col)) && (i ? (s || (s = i), r(i, s, i.row - s.row, i.col - s.col)) : r(i, s), a = i)
    }

    var n, r, s, a, o = this;
    o.start = function (o, l, h) {
      r = o, s = a = null, e.build(), i(l), n = h || "mousemove", t(document).bind(n, i)
    }, o.stop = function () {
      return t(document).unbind(n, i), a
    }
  }

  function xe(t) {
    t.pageX === e && (t.pageX = t.originalEvent.pageX, t.pageY = t.originalEvent.pageY)
  }

  function _e(t) {
    function i(e) {
      return r[e] = r[e] || t(e)
    }

    var n = this, r = {}, s = {}, a = {};
    n.left = function (t) {
      return s[t] = s[t] === e ? i(t).position().left : s[t]
    }, n.right = function (t) {
      return a[t] = a[t] === e ? n.left(t) + i(t).width() : a[t]
    }, n.clear = function () {
      r = {}, s = {}, a = {}
    }
  }

  var we = {
    defaultView: "month",
    aspectRatio: 1.35,
    header: {left: "title", center: "", right: "today prev,next"},
    weekends: !0,
    weekNumbers: !1,
    weekNumberCalculation: "iso",
    weekNumberTitle: "W",
    allDayDefault: !0,
    ignoreTimezone: !0,
    lazyFetching: !0,
    startParam: "start",
    endParam: "end",
    titleFormat: {month: "MMMM yyyy", week: "MMM d[ yyyy]{ '&#8212;'[ MMM] d yyyy}", day: "dddd, MMM d, yyyy"},
    columnFormat: {month: "ddd", week: "ddd M/d", day: "dddd M/d"},
    timeFormat: {"": "h(:mm)t"},
    isRTL: !1,
    firstDay: 0,
    monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    buttonText: {
      prev: "<span class='fc-text-arrow'>&lsaquo;</span>",
      next: "<span class='fc-text-arrow'>&rsaquo;</span>",
      prevYear: "<span class='fc-text-arrow'>&laquo;</span>",
      nextYear: "<span class='fc-text-arrow'>&raquo;</span>",
      today: "today",
      month: "month",
      week: "week",
      day: "day"
    },
    theme: !1,
    buttonIcons: {prev: "circle-triangle-w", next: "circle-triangle-e"},
    unselectAuto: !0,
    dropAccept: "*",
    handleWindowResize: !0
  }, Ce = {
    header: {left: "next,prev today", center: "", right: "title"},
    buttonText: {
      prev: "<span class='fc-text-arrow'>&rsaquo;</span>",
      next: "<span class='fc-text-arrow'>&lsaquo;</span>",
      prevYear: "<span class='fc-text-arrow'>&raquo;</span>",
      nextYear: "<span class='fc-text-arrow'>&laquo;</span>"
    },
    buttonIcons: {prev: "circle-triangle-e", next: "circle-triangle-w"}
  }, Se = t.fullCalendar = {version: "1.6.4"}, De = Se.views = {};
  t.fn.fullCalendar = function (i) {
    if ("string" == typeof i) {
      var r, s = Array.prototype.slice.call(arguments, 1);
      return this.each(function () {
        var n = t.data(this, "fullCalendar");
        if (n && t.isFunction(n[i])) {
          var a = n[i].apply(n, s);
          r === e && (r = a), "destroy" == i && t.removeData(this, "fullCalendar")
        }
      }), r !== e ? r : this
    }
    i = i || {};
    var a = i.eventSources || [];
    return delete i.eventSources, i.events && (a.push(i.events), delete i.events), i = t.extend(!0, {}, we, i.isRTL || i.isRTL === e && we.isRTL ? Ce : {}, i), this.each(function (e, r) {
      var s = t(r), o = new n(s, i, a);
      s.data("fullCalendar", o), o.render()
    }), this
  }, Se.sourceNormalizers = [], Se.sourceFetchers = [];
  var Te = {dataType: "json", cache: !1}, ke = 1;
  Se.addDays = l, Se.cloneDate = d, Se.parseDate = v, Se.parseISO8601 = m, Se.parseTime = y, Se.formatDate = b, Se.formatDates = x;
  var Me = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"], Ie = 864e5, Fe = 36e5, Ae = 6e4, Re = {
    s: function (t) {
      return t.getSeconds()
    }, ss: function (t) {
      return B(t.getSeconds())
    }, m: function (t) {
      return t.getMinutes()
    }, mm: function (t) {
      return B(t.getMinutes())
    }, h: function (t) {
      return t.getHours() % 12 || 12
    }, hh: function (t) {
      return B(t.getHours() % 12 || 12)
    }, H: function (t) {
      return t.getHours()
    }, HH: function (t) {
      return B(t.getHours())
    }, d: function (t) {
      return t.getDate()
    }, dd: function (t) {
      return B(t.getDate())
    }, ddd: function (t, e) {
      return e.dayNamesShort[t.getDay()]
    }, dddd: function (t, e) {
      return e.dayNames[t.getDay()]
    }, M: function (t) {
      return t.getMonth() + 1
    }, MM: function (t) {
      return B(t.getMonth() + 1)
    }, MMM: function (t, e) {
      return e.monthNamesShort[t.getMonth()]
    }, MMMM: function (t, e) {
      return e.monthNames[t.getMonth()]
    }, yy: function (t) {
      return (t.getFullYear() + "").substring(2)
    }, yyyy: function (t) {
      return t.getFullYear()
    }, t: function (t) {
      return 12 > t.getHours() ? "a" : "p"
    }, tt: function (t) {
      return 12 > t.getHours() ? "am" : "pm"
    }, T: function (t) {
      return 12 > t.getHours() ? "A" : "P"
    }, TT: function (t) {
      return 12 > t.getHours() ? "AM" : "PM"
    }, u: function (t) {
      return b(t, "yyyy-MM-dd'T'HH:mm:ss'Z'")
    }, S: function (t) {
      var e = t.getDate();
      return e > 10 && 20 > e ? "th" : ["st", "nd", "rd"][e % 10 - 1] || "th"
    }, w: function (t, e) {
      return e.weekNumberCalculation(t)
    }, W: function (t) {
      return _(t)
    }
  };
  Se.dateFormatters = Re, Se.applyAll = z, De.month = X, De.basicWeek = V, De.basicDay = Y, i({weekMode: "fixed"}), De.agendaWeek = Q, De.agendaDay = Z, i({
    allDaySlot: !0,
    allDayText: "all-day",
    firstHour: 6,
    slotMinutes: 30,
    defaultEventMinutes: 120,
    axisFormat: "h(:mm)tt",
    timeFormat: {agenda: "h:mm{ - h:mm}"},
    dragOpacity: {agenda: .5},
    minTime: 0,
    maxTime: 24,
    slotEventOverlap: !0
  })
}(jQuery), /*
 * File:        jquery.dataTables.min.js
 * Version:     1.9.4
 * Author:      Allan Jardine (www.sprymedia.co.uk)
 * Info:        www.datatables.net
 * 
 * Copyright 2008-2012 Allan Jardine, all rights reserved.
 *
 * This source file is free software, under either the GPL v2 license or a
 * BSD style license, available at:
 *   http://datatables.net/license_gpl2
 *   http://datatables.net/license_bsd
 * 
 * This source file is distributed in the hope that it will be useful, but 
 * WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY 
 * or FITNESS FOR A PARTICULAR PURPOSE. See the license files for details.
 */
  function (X, l, n) {
    var L = function (h) {
      var j = function (e) {
        function o(t, e) {
          var i = j.defaults.columns, r = t.aoColumns.length, i = h.extend({}, j.models.oColumn, i, {
            sSortingClass: t.oClasses.sSortable,
            sSortingClassJUI: t.oClasses.sSortJUI,
            nTh: e ? e : l.createElement("th"),
            sTitle: i.sTitle ? i.sTitle : e ? e.innerHTML : "",
            aDataSort: i.aDataSort ? i.aDataSort : [r],
            mData: i.mData ? i.oDefaults : r
          });
          t.aoColumns.push(i), t.aoPreSearchCols[r] === n || null === t.aoPreSearchCols[r] ? t.aoPreSearchCols[r] = h.extend({}, j.models.oSearch) : (i = t.aoPreSearchCols[r], i.bRegex === n && (i.bRegex = !0), i.bSmart === n && (i.bSmart = !0), i.bCaseInsensitive === n && (i.bCaseInsensitive = !0)), m(t, r, null)
        }

        function m(t, e, i) {
          var r = t.aoColumns[e];
          i !== n && null !== i && (i.mDataProp && !i.mData && (i.mData = i.mDataProp), i.sType !== n && (r.sType = i.sType, r._bAutoType = !1), h.extend(r, i), p(r, i, "sWidth", "sWidthOrig"), i.iDataSort !== n && (r.aDataSort = [i.iDataSort]), p(r, i, "aDataSort"));
          var s = r.mRender ? Q(r.mRender) : null, a = Q(r.mData);
          r.fnGetData = function (t, e) {
            var i = a(t, e);
            return r.mRender && e && "" !== e ? s(i, e, t) : i
          }, r.fnSetData = L(r.mData), t.oFeatures.bSort || (r.bSortable = !1), !r.bSortable || -1 == h.inArray("asc", r.asSorting) && -1 == h.inArray("desc", r.asSorting) ? (r.sSortingClass = t.oClasses.sSortableNone, r.sSortingClassJUI = "") : -1 == h.inArray("asc", r.asSorting) && -1 == h.inArray("desc", r.asSorting) ? (r.sSortingClass = t.oClasses.sSortable, r.sSortingClassJUI = t.oClasses.sSortJUI) : -1 != h.inArray("asc", r.asSorting) && -1 == h.inArray("desc", r.asSorting) ? (r.sSortingClass = t.oClasses.sSortableAsc, r.sSortingClassJUI = t.oClasses.sSortJUIAscAllowed) : -1 == h.inArray("asc", r.asSorting) && -1 != h.inArray("desc", r.asSorting) && (r.sSortingClass = t.oClasses.sSortableDesc, r.sSortingClassJUI = t.oClasses.sSortJUIDescAllowed)
        }

        function k(t) {
          if (!1 === t.oFeatures.bAutoWidth)return !1;
          da(t);
          for (var e = 0, i = t.aoColumns.length; i > e; e++)t.aoColumns[e].nTh.style.width = t.aoColumns[e].sWidth
        }

        function G(t, e) {
          var i = r(t, "bVisible");
          return "number" == typeof i[e] ? i[e] : null
        }

        function R(t, e) {
          var i = r(t, "bVisible"), i = h.inArray(e, i);
          return -1 !== i ? i : null
        }

        function t(t) {
          return r(t, "bVisible").length
        }

        function r(t, e) {
          var i = [];
          return h.map(t.aoColumns, function (t, n) {
            t[e] && i.push(n)
          }), i
        }

        function B(t) {
          for (var e = j.ext.aTypes, i = e.length, n = 0; i > n; n++) {
            var r = e[n](t);
            if (null !== r)return r
          }
          return "string"
        }

        function u(t, e) {
          for (var i = e.split(","), n = [], r = 0, s = t.aoColumns.length; s > r; r++)for (var a = 0; s > a; a++)if (t.aoColumns[r].sName == i[a]) {
            n.push(a);
            break
          }
          return n
        }

        function M(t) {
          for (var e = "", i = 0, n = t.aoColumns.length; n > i; i++)e += t.aoColumns[i].sName + ",";
          return e.length == n ? "" : e.slice(0, -1)
        }

        function ta(t, e, i, n) {
          var r, s, a, l, u;
          if (e)for (r = e.length - 1; r >= 0; r--) {
            var c = e[r].aTargets;
            for (h.isArray(c) || D(t, 1, "aTargets must be an array of targets, not a " + typeof c), s = 0, a = c.length; a > s; s++)if ("number" == typeof c[s] && 0 <= c[s]) {
              for (; t.aoColumns.length <= c[s];)o(t);
              n(c[s], e[r])
            } else if ("number" == typeof c[s] && 0 > c[s])n(t.aoColumns.length + c[s], e[r]); else if ("string" == typeof c[s])for (l = 0, u = t.aoColumns.length; u > l; l++)("_all" == c[s] || h(t.aoColumns[l].nTh).hasClass(c[s])) && n(l, e[r])
          }
          if (i)for (r = 0, t = i.length; t > r; r++)n(r, i[r])
        }

        function H(t, e) {
          var i;
          i = h.isArray(e) ? e.slice() : h.extend(!0, {}, e);
          var n = t.aoData.length, r = h.extend(!0, {}, j.models.oRow);
          r._aData = i, t.aoData.push(r);
          for (var s, r = 0, a = t.aoColumns.length; a > r; r++)i = t.aoColumns[r], "function" == typeof i.fnRender && i.bUseRendered && null !== i.mData ? F(t, n, r, S(t, n, r)) : F(t, n, r, v(t, n, r)), i._bAutoType && "string" != i.sType && (s = v(t, n, r, "type"), null !== s && "" !== s && (s = B(s), null === i.sType ? i.sType = s : i.sType != s && "html" != i.sType && (i.sType = "string")));
          return t.aiDisplayMaster.push(n), t.oFeatures.bDeferRender || ea(t, n), n
        }

        function ua(t) {
          var e, i, n, r, s, a, o;
          if (t.bDeferLoading || null === t.sAjaxSource)for (e = t.nTBody.firstChild; e;) {
            if ("TR" == e.nodeName.toUpperCase())for (i = t.aoData.length, e._DT_RowIndex = i, t.aoData.push(h.extend(!0, {}, j.models.oRow, {nTr: e})), t.aiDisplayMaster.push(i), s = e.firstChild, n = 0; s;)a = s.nodeName.toUpperCase(), ("TD" == a || "TH" == a) && (F(t, i, n, h.trim(s.innerHTML)), n++), s = s.nextSibling;
            e = e.nextSibling
          }
          for (r = T(t), n = [], e = 0, i = r.length; i > e; e++)for (s = r[e].firstChild; s;)a = s.nodeName.toUpperCase(), ("TD" == a || "TH" == a) && n.push(s), s = s.nextSibling;
          for (i = 0, r = t.aoColumns.length; r > i; i++) {
            o = t.aoColumns[i], null === o.sTitle && (o.sTitle = o.nTh.innerHTML);
            var l, u, c = o._bAutoType, d = "function" == typeof o.fnRender, f = null !== o.sClass, p = o.bVisible;
            if (c || d || f || !p)for (a = 0, e = t.aoData.length; e > a; a++)s = t.aoData[a], l = n[a * r + i], c && "string" != o.sType && (u = v(t, a, i, "type"), "" !== u && (u = B(u), null === o.sType ? o.sType = u : o.sType != u && "html" != o.sType && (o.sType = "string"))), o.mRender ? l.innerHTML = v(t, a, i, "display") : o.mData !== i && (l.innerHTML = v(t, a, i, "display")), d && (u = S(t, a, i), l.innerHTML = u, o.bUseRendered && F(t, a, i, u)), f && (l.className += " " + o.sClass), p ? s._anHidden[i] = null : (s._anHidden[i] = l, l.parentNode.removeChild(l)), o.fnCreatedCell && o.fnCreatedCell.call(t.oInstance, l, v(t, a, i, "display"), s._aData, a, i)
          }
          if (0 !== t.aoRowCreatedCallback.length)for (e = 0, i = t.aoData.length; i > e; e++)s = t.aoData[e], A(t, "aoRowCreatedCallback", null, [s.nTr, s._aData, e])
        }

        function I(t, e) {
          return e._DT_RowIndex !== n ? e._DT_RowIndex : null
        }

        function fa(t, e, i) {
          for (var e = J(t, e), n = 0, t = t.aoColumns.length; t > n; n++)if (e[n] === i)return n;
          return -1
        }

        function Y(t, e, i, n) {
          for (var r = [], s = 0, a = n.length; a > s; s++)r.push(v(t, e, n[s], i));
          return r
        }

        function v(t, e, i, r) {
          var s = t.aoColumns[i];
          if ((i = s.fnGetData(t.aoData[e]._aData, r)) === n)return t.iDrawError != t.iDraw && null === s.sDefaultContent && (D(t, 0, "Requested unknown parameter " + ("function" == typeof s.mData ? "{mData function}" : "'" + s.mData + "'") + " from the data source for row " + e), t.iDrawError = t.iDraw), s.sDefaultContent;
          if (null === i && null !== s.sDefaultContent)i = s.sDefaultContent; else if ("function" == typeof i)return i();
          return "display" == r && null === i ? "" : i
        }

        function F(t, e, i, n) {
          t.aoColumns[i].fnSetData(t.aoData[e]._aData, n)
        }

        function Q(t) {
          if (null === t)return function () {
            return null
          };
          if ("function" == typeof t)return function (e, i, n) {
            return t(e, i, n)
          };
          if ("string" == typeof t && (-1 !== t.indexOf(".") || -1 !== t.indexOf("["))) {
            var e = function (t, i, r) {
              var s, a = r.split(".");
              if ("" !== r) {
                var o = 0;
                for (s = a.length; s > o; o++) {
                  if (r = a[o].match(U)) {
                    a[o] = a[o].replace(U, ""), "" !== a[o] && (t = t[a[o]]), s = [], a.splice(0, o + 1);
                    for (var a = a.join("."), o = 0, l = t.length; l > o; o++)s.push(e(t[o], i, a));
                    t = r[0].substring(1, r[0].length - 1), t = "" === t ? s : s.join(t);
                    break
                  }
                  if (null === t || t[a[o]] === n)return n;
                  t = t[a[o]]
                }
              }
              return t
            };
            return function (i, n) {
              return e(i, n, t)
            }
          }
          return function (e) {
            return e[t]
          }
        }

        function L(t) {
          if (null === t)return function () {
          };
          if ("function" == typeof t)return function (e, i) {
            t(e, "set", i)
          };
          if ("string" == typeof t && (-1 !== t.indexOf(".") || -1 !== t.indexOf("["))) {
            var e = function (t, i, r) {
              var s, a, r = r.split("."), o = 0;
              for (a = r.length - 1; a > o; o++) {
                if (s = r[o].match(U)) {
                  r[o] = r[o].replace(U, ""), t[r[o]] = [], s = r.slice(), s.splice(0, o + 1), a = s.join(".");
                  for (var l = 0, h = i.length; h > l; l++)s = {}, e(s, i[l], a), t[r[o]].push(s);
                  return
                }
                (null === t[r[o]] || t[r[o]] === n) && (t[r[o]] = {}), t = t[r[o]]
              }
              t[r[r.length - 1].replace(U, "")] = i
            };
            return function (i, n) {
              return e(i, n, t)
            }
          }
          return function (e, i) {
            e[t] = i
          }
        }

        function Z(t) {
          for (var e = [], i = t.aoData.length, n = 0; i > n; n++)e.push(t.aoData[n]._aData);
          return e
        }

        function ga(t) {
          t.aoData.splice(0, t.aoData.length), t.aiDisplayMaster.splice(0, t.aiDisplayMaster.length), t.aiDisplay.splice(0, t.aiDisplay.length), y(t)
        }

        function ha(t, e) {
          for (var i = -1, n = 0, r = t.length; r > n; n++)t[n] == e ? i = n : t[n] > e && t[n]--;
          -1 != i && t.splice(i, 1)
        }

        function S(t, e, i) {
          var n = t.aoColumns[i];
          return n.fnRender({
            iDataRow: e,
            iDataColumn: i,
            oSettings: t,
            aData: t.aoData[e]._aData,
            mDataProp: n.mData
          }, v(t, e, i, "display"))
        }

        function ea(t, e) {
          var i, n = t.aoData[e];
          if (null === n.nTr) {
            n.nTr = l.createElement("tr"), n.nTr._DT_RowIndex = e, n._aData.DT_RowId && (n.nTr.id = n._aData.DT_RowId), n._aData.DT_RowClass && (n.nTr.className = n._aData.DT_RowClass);
            for (var r = 0, s = t.aoColumns.length; s > r; r++) {
              var a = t.aoColumns[r];
              i = l.createElement(a.sCellType), i.innerHTML = "function" != typeof a.fnRender || a.bUseRendered && null !== a.mData ? v(t, e, r, "display") : S(t, e, r), null !== a.sClass && (i.className = a.sClass), a.bVisible ? (n.nTr.appendChild(i), n._anHidden[r] = null) : n._anHidden[r] = i, a.fnCreatedCell && a.fnCreatedCell.call(t.oInstance, i, v(t, e, r, "display"), n._aData, e, r)
            }
            A(t, "aoRowCreatedCallback", null, [n.nTr, n._aData, e])
          }
        }

        function va(t) {
          var e, i, n;
          if (0 !== h("th, td", t.nTHead).length)for (e = 0, n = t.aoColumns.length; n > e; e++)i = t.aoColumns[e].nTh, i.setAttribute("role", "columnheader"), t.aoColumns[e].bSortable && (i.setAttribute("tabindex", t.iTabIndex), i.setAttribute("aria-controls", t.sTableId)), null !== t.aoColumns[e].sClass && h(i).addClass(t.aoColumns[e].sClass), t.aoColumns[e].sTitle != i.innerHTML && (i.innerHTML = t.aoColumns[e].sTitle); else {
            var r = l.createElement("tr");
            for (e = 0, n = t.aoColumns.length; n > e; e++)i = t.aoColumns[e].nTh, i.innerHTML = t.aoColumns[e].sTitle, i.setAttribute("tabindex", "0"), null !== t.aoColumns[e].sClass && h(i).addClass(t.aoColumns[e].sClass), r.appendChild(i);
            h(t.nTHead).html("")[0].appendChild(r), V(t.aoHeader, t.nTHead)
          }
          if (h(t.nTHead).children("tr").attr("role", "row"), t.bJUI)for (e = 0, n = t.aoColumns.length; n > e; e++) {
            i = t.aoColumns[e].nTh, r = l.createElement("div"), r.className = t.oClasses.sSortJUIWrapper, h(i).contents().appendTo(r);
            var s = l.createElement("span");
            s.className = t.oClasses.sSortIcon, r.appendChild(s), i.appendChild(r)
          }
          if (t.oFeatures.bSort)for (e = 0; e < t.aoColumns.length; e++)!1 !== t.aoColumns[e].bSortable ? ia(t, t.aoColumns[e].nTh, e) : h(t.aoColumns[e].nTh).addClass(t.oClasses.sSortableNone);
          if ("" !== t.oClasses.sFooterTH && h(t.nTFoot).children("tr").children("th").addClass(t.oClasses.sFooterTH), null !== t.nTFoot)for (i = N(t, null, t.aoFooter), e = 0, n = t.aoColumns.length; n > e; e++)i[e] && (t.aoColumns[e].nTf = i[e], t.aoColumns[e].sClass && h(i[e]).addClass(t.aoColumns[e].sClass))
        }

        function W(t, e, i) {
          var r, s, a, o, l = [], h = [], u = t.aoColumns.length;
          for (i === n && (i = !1), r = 0, s = e.length; s > r; r++) {
            for (l[r] = e[r].slice(), l[r].nTr = e[r].nTr, a = u - 1; a >= 0; a--)!t.aoColumns[a].bVisible && !i && l[r].splice(a, 1);
            h.push([])
          }
          for (r = 0, s = l.length; s > r; r++) {
            if (t = l[r].nTr)for (; a = t.firstChild;)t.removeChild(a);
            for (a = 0, e = l[r].length; e > a; a++)if (o = u = 1, h[r][a] === n) {
              for (t.appendChild(l[r][a].cell), h[r][a] = 1; l[r + u] !== n && l[r][a].cell == l[r + u][a].cell;)h[r + u][a] = 1, u++;
              for (; l[r][a + o] !== n && l[r][a].cell == l[r][a + o].cell;) {
                for (i = 0; u > i; i++)h[r + i][a + o] = 1;
                o++
              }
              l[r][a].cell.rowSpan = u, l[r][a].cell.colSpan = o
            }
          }
        }

        function x(e) {
          var i = A(e, "aoPreDrawCallback", "preDraw", [e]);
          if (-1 !== h.inArray(!1, i))E(e, !1); else {
            var r, s, i = [], a = 0, o = e.asStripeClasses.length;
            if (r = e.aoOpenRows.length, e.bDrawing = !0, e.iInitDisplayStart !== n && -1 != e.iInitDisplayStart && (e._iDisplayStart = e.oFeatures.bServerSide ? e.iInitDisplayStart : e.iInitDisplayStart >= e.fnRecordsDisplay() ? 0 : e.iInitDisplayStart, e.iInitDisplayStart = -1, y(e)), e.bDeferLoading)e.bDeferLoading = !1, e.iDraw++; else if (e.oFeatures.bServerSide) {
              if (!e.bDestroying && !wa(e))return
            } else e.iDraw++;
            if (0 !== e.aiDisplay.length) {
              var u = e._iDisplayStart;
              for (s = e._iDisplayEnd, e.oFeatures.bServerSide && (u = 0, s = e.aoData.length); s > u; u++) {
                var c = e.aoData[e.aiDisplay[u]];
                null === c.nTr && ea(e, e.aiDisplay[u]);
                var d = c.nTr;
                if (0 !== o) {
                  var f = e.asStripeClasses[a % o];
                  c._sRowStripe != f && (h(d).removeClass(c._sRowStripe).addClass(f), c._sRowStripe = f)
                }
                if (A(e, "aoRowCallback", null, [d, e.aoData[e.aiDisplay[u]]._aData, a, u]), i.push(d), a++, 0 !== r)for (c = 0; r > c; c++)if (d == e.aoOpenRows[c].nParent) {
                  i.push(e.aoOpenRows[c].nTr);
                  break
                }
              }
            } else i[0] = l.createElement("tr"), e.asStripeClasses[0] && (i[0].className = e.asStripeClasses[0]), r = e.oLanguage, o = r.sZeroRecords, 1 != e.iDraw || null === e.sAjaxSource || e.oFeatures.bServerSide ? r.sEmptyTable && 0 === e.fnRecordsTotal() && (o = r.sEmptyTable) : o = r.sLoadingRecords, r = l.createElement("td"), r.setAttribute("valign", "top"), r.colSpan = t(e), r.className = e.oClasses.sRowEmpty, r.innerHTML = ja(e, o), i[a].appendChild(r);
            if (A(e, "aoHeaderCallback", "header", [h(e.nTHead).children("tr")[0], Z(e), e._iDisplayStart, e.fnDisplayEnd(), e.aiDisplay]), A(e, "aoFooterCallback", "footer", [h(e.nTFoot).children("tr")[0], Z(e), e._iDisplayStart, e.fnDisplayEnd(), e.aiDisplay]), a = l.createDocumentFragment(), r = l.createDocumentFragment(), e.nTBody) {
              if (o = e.nTBody.parentNode, r.appendChild(e.nTBody), !e.oScroll.bInfinite || !e._bInitComplete || e.bSorted || e.bFiltered)for (; r = e.nTBody.firstChild;)e.nTBody.removeChild(r);
              for (r = 0, s = i.length; s > r; r++)a.appendChild(i[r]);
              e.nTBody.appendChild(a), null !== o && o.appendChild(e.nTBody)
            }
            A(e, "aoDrawCallback", "draw", [e]), e.bSorted = !1, e.bFiltered = !1, e.bDrawing = !1, e.oFeatures.bServerSide && (E(e, !1), e._bInitComplete || $(e))
          }
        }

        function aa(t) {
          t.oFeatures.bSort ? O(t, t.oPreviousSearch) : t.oFeatures.bFilter ? K(t, t.oPreviousSearch) : (y(t), x(t))
        }

        function xa(t) {
          var e = h("<div></div>")[0];
          t.nTable.parentNode.insertBefore(e, t.nTable), t.nTableWrapper = h('<div id="' + t.sTableId + '_wrapper" class="' + t.oClasses.sWrapper + '" role="grid"></div>')[0], t.nTableReinsertBefore = t.nTable.nextSibling;
          for (var i, n, r, s, a, o, l, u = t.nTableWrapper, c = t.sDom.split(""), d = 0; d < c.length; d++) {
            if (n = 0, r = c[d], "<" == r) {
              if (s = h("<div></div>")[0], a = c[d + 1], "'" == a || '"' == a) {
                for (o = "", l = 2; c[d + l] != a;)o += c[d + l], l++;
                "H" == o ? o = t.oClasses.sJUIHeader : "F" == o && (o = t.oClasses.sJUIFooter), -1 != o.indexOf(".") ? (a = o.split("."), s.id = a[0].substr(1, a[0].length - 1), s.className = a[1]) : "#" == o.charAt(0) ? s.id = o.substr(1, o.length - 1) : s.className = o, d += l
              }
              u.appendChild(s), u = s
            } else if (">" == r)u = u.parentNode; else if ("l" == r && t.oFeatures.bPaginate && t.oFeatures.bLengthChange)i = ya(t), n = 1; else if ("f" == r && t.oFeatures.bFilter)i = za(t), n = 1; else if ("r" == r && t.oFeatures.bProcessing)i = Aa(t), n = 1; else if ("t" == r)i = Ba(t), n = 1; else if ("i" == r && t.oFeatures.bInfo)i = Ca(t), n = 1; else if ("p" == r && t.oFeatures.bPaginate)i = Da(t), n = 1; else if (0 !== j.ext.aoFeatures.length)for (s = j.ext.aoFeatures, l = 0, a = s.length; a > l; l++)if (r == s[l].cFeature) {
              (i = s[l].fnInit(t)) && (n = 1);
              break
            }
            1 == n && null !== i && ("object" != typeof t.aanFeatures[r] && (t.aanFeatures[r] = []), t.aanFeatures[r].push(i), u.appendChild(i))
          }
          e.parentNode.replaceChild(t.nTableWrapper, e)
        }

        function V(t, e) {
          var i, n, r, s, a, o, l, u, c, d, f = h(e).children("tr");
          for (t.splice(0, t.length), r = 0, o = f.length; o > r; r++)t.push([]);
          for (r = 0, o = f.length; o > r; r++)for (i = f[r], n = i.firstChild; n;) {
            if ("TD" == n.nodeName.toUpperCase() || "TH" == n.nodeName.toUpperCase()) {
              for (u = 1 * n.getAttribute("colspan"), c = 1 * n.getAttribute("rowspan"), u = u && 0 !== u && 1 !== u ? u : 1, c = c && 0 !== c && 1 !== c ? c : 1, s = 0, a = t[r]; a[s];)s++;
              for (l = s, d = 1 === u ? !0 : !1, a = 0; u > a; a++)for (s = 0; c > s; s++)t[r + s][l + a] = {
                cell: n,
                unique: d
              }, t[r + s].nTr = i
            }
            n = n.nextSibling
          }
        }

        function N(t, e, i) {
          var n = [];
          i || (i = t.aoHeader, e && (i = [], V(i, e)));
          for (var e = 0, r = i.length; r > e; e++)for (var s = 0, a = i[e].length; a > s; s++)!i[e][s].unique || n[s] && t.bSortCellsTop || (n[s] = i[e][s].cell);
          return n
        }

        function wa(t) {
          if (t.bAjaxDataGet) {
            t.iDraw++, E(t, !0);
            var e = Ea(t);
            return ka(t, e), t.fnServerData.call(t.oInstance, t.sAjaxSource, e, function (e) {
              Fa(t, e)
            }, t), !1
          }
          return !0
        }

        function Ea(t) {
          var e, i, n, r, s = t.aoColumns.length, a = [];
          for (a.push({name: "sEcho", value: t.iDraw}), a.push({name: "iColumns", value: s}), a.push({
            name: "sColumns",
            value: M(t)
          }), a.push({name: "iDisplayStart", value: t._iDisplayStart}), a.push({
            name: "iDisplayLength",
            value: !1 !== t.oFeatures.bPaginate ? t._iDisplayLength : -1
          }), n = 0; s > n; n++)e = t.aoColumns[n].mData, a.push({
            name: "mDataProp_" + n,
            value: "function" == typeof e ? "function" : e
          });
          if (!1 !== t.oFeatures.bFilter)for (a.push({
            name: "sSearch",
            value: t.oPreviousSearch.sSearch
          }), a.push({name: "bRegex", value: t.oPreviousSearch.bRegex}), n = 0; s > n; n++)a.push({
            name: "sSearch_" + n,
            value: t.aoPreSearchCols[n].sSearch
          }), a.push({name: "bRegex_" + n, value: t.aoPreSearchCols[n].bRegex}), a.push({
            name: "bSearchable_" + n,
            value: t.aoColumns[n].bSearchable
          });
          if (!1 !== t.oFeatures.bSort) {
            var o = 0;
            for (e = null !== t.aaSortingFixed ? t.aaSortingFixed.concat(t.aaSorting) : t.aaSorting.slice(), n = 0; n < e.length; n++)for (i = t.aoColumns[e[n][0]].aDataSort, r = 0; r < i.length; r++)a.push({
              name: "iSortCol_" + o,
              value: i[r]
            }), a.push({name: "sSortDir_" + o, value: e[n][1]}), o++;
            for (a.push({name: "iSortingCols", value: o}), n = 0; s > n; n++)a.push({
              name: "bSortable_" + n,
              value: t.aoColumns[n].bSortable
            })
          }
          return a
        }

        function ka(t, e) {
          A(t, "aoServerParams", "serverParams", [e])
        }

        function Fa(t, e) {
          if (e.sEcho !== n) {
            if (1 * e.sEcho < t.iDraw)return;
            t.iDraw = 1 * e.sEcho
          }
          (!t.oScroll.bInfinite || t.oScroll.bInfinite && (t.bSorted || t.bFiltered)) && ga(t), t._iRecordsTotal = parseInt(e.iTotalRecords, 10), t._iRecordsDisplay = parseInt(e.iTotalDisplayRecords, 10);
          var i, r = M(t), r = e.sColumns !== n && "" !== r && e.sColumns != r;
          r && (i = u(t, e.sColumns));
          for (var s = Q(t.sAjaxDataProp)(e), a = 0, o = s.length; o > a; a++)if (r) {
            for (var l = [], h = 0, c = t.aoColumns.length; c > h; h++)l.push(s[a][i[h]]);
            H(t, l)
          } else H(t, s[a]);
          t.aiDisplay = t.aiDisplayMaster.slice(), t.bAjaxDataGet = !1, x(t), t.bAjaxDataGet = !0, E(t, !1)
        }

        function za(t) {
          var e = t.oPreviousSearch, i = t.oLanguage.sSearch, i = -1 !== i.indexOf("_INPUT_") ? i.replace("_INPUT_", '<input type="text" />') : "" === i ? '<input type="text" />' : i + ' <input type="text" />', n = l.createElement("div");
          return n.className = t.oClasses.sFilter, n.innerHTML = "<label>" + i + "</label>", t.aanFeatures.f || (n.id = t.sTableId + "_filter"), i = h('input[type="text"]', n), n._DT_Input = i[0], i.val(e.sSearch.replace('"', "&quot;")), i.bind("keyup.DT", function () {
            for (var i = t.aanFeatures.f, n = "" === this.value ? "" : this.value, r = 0, s = i.length; s > r; r++)i[r] != h(this).parents("div.dataTables_filter")[0] && h(i[r]._DT_Input).val(n);
            n != e.sSearch && K(t, {
              sSearch: n,
              bRegex: e.bRegex,
              bSmart: e.bSmart,
              bCaseInsensitive: e.bCaseInsensitive
            })
          }), i.attr("aria-controls", t.sTableId).bind("keypress.DT", function (t) {
            return 13 == t.keyCode ? !1 : void 0
          }), n
        }

        function K(t, e, i) {
          var n = t.oPreviousSearch, r = t.aoPreSearchCols, s = function (t) {
            n.sSearch = t.sSearch, n.bRegex = t.bRegex, n.bSmart = t.bSmart, n.bCaseInsensitive = t.bCaseInsensitive
          };
          if (t.oFeatures.bServerSide)s(e); else {
            for (Ga(t, e.sSearch, i, e.bRegex, e.bSmart, e.bCaseInsensitive), s(e), e = 0; e < t.aoPreSearchCols.length; e++)Ha(t, r[e].sSearch, e, r[e].bRegex, r[e].bSmart, r[e].bCaseInsensitive);
            Ia(t)
          }
          t.bFiltered = !0, h(t.oInstance).trigger("filter", t), t._iDisplayStart = 0, y(t), x(t), la(t, 0)
        }

        function Ia(t) {
          for (var e = j.ext.afnFiltering, i = r(t, "bSearchable"), n = 0, s = e.length; s > n; n++)for (var a = 0, o = 0, l = t.aiDisplay.length; l > o; o++) {
            var h = t.aiDisplay[o - a];
            e[n](t, Y(t, h, "filter", i), h) || (t.aiDisplay.splice(o - a, 1), a++)
          }
        }

        function Ha(t, e, i, n, r, s) {
          if ("" !== e)for (var a = 0, e = ma(e, n, r, s), n = t.aiDisplay.length - 1; n >= 0; n--)r = Ja(v(t, t.aiDisplay[n], i, "filter"), t.aoColumns[i].sType), e.test(r) || (t.aiDisplay.splice(n, 1), a++)
        }

        function Ga(t, e, i, n, r, s) {
          if (n = ma(e, n, r, s), r = t.oPreviousSearch, i || (i = 0), 0 !== j.ext.afnFiltering.length && (i = 1), 0 >= e.length)t.aiDisplay.splice(0, t.aiDisplay.length), t.aiDisplay = t.aiDisplayMaster.slice(); else if (t.aiDisplay.length == t.aiDisplayMaster.length || r.sSearch.length > e.length || 1 == i || 0 !== e.indexOf(r.sSearch))for (t.aiDisplay.splice(0, t.aiDisplay.length), la(t, 1), e = 0; e < t.aiDisplayMaster.length; e++)n.test(t.asDataSearch[e]) && t.aiDisplay.push(t.aiDisplayMaster[e]); else for (e = i = 0; e < t.asDataSearch.length; e++)n.test(t.asDataSearch[e]) || (t.aiDisplay.splice(e - i, 1), i++)
        }

        function la(t, e) {
          if (!t.oFeatures.bServerSide) {
            t.asDataSearch = [];
            for (var i = r(t, "bSearchable"), n = 1 === e ? t.aiDisplayMaster : t.aiDisplay, s = 0, a = n.length; a > s; s++)t.asDataSearch[s] = na(t, Y(t, n[s], "filter", i))
          }
        }

        function na(t, e) {
          var i = e.join("  ");
          return -1 !== i.indexOf("&") && (i = h("<div>").html(i).text()), i.replace(/[\n\r]/g, " ")
        }

        function ma(t, e, i, n) {
          return i ? (t = e ? t.split(" ") : oa(t).split(" "), t = "^(?=.*?" + t.join(")(?=.*?") + ").*$", RegExp(t, n ? "i" : "")) : (t = e ? t : oa(t), RegExp(t, n ? "i" : ""))
        }

        function Ja(t, e) {
          return "function" == typeof j.ext.ofnSearch[e] ? j.ext.ofnSearch[e](t) : null === t ? "" : "html" == e ? t.replace(/[\r\n]/g, " ").replace(/<.*?>/g, "") : "string" == typeof t ? t.replace(/[\r\n]/g, " ") : t
        }

        function oa(t) {
          return t.replace(RegExp("(\\/|\\.|\\*|\\+|\\?|\\||\\(|\\)|\\[|\\]|\\{|\\}|\\\\|\\$|\\^|\\-)", "g"), "\\$1")
        }

        function Ca(t) {
          var e = l.createElement("div");
          return e.className = t.oClasses.sInfo, t.aanFeatures.i || (t.aoDrawCallback.push({
            fn: Ka,
            sName: "information"
          }), e.id = t.sTableId + "_info"), t.nTable.setAttribute("aria-describedby", t.sTableId + "_info"), e
        }

        function Ka(t) {
          if (t.oFeatures.bInfo && 0 !== t.aanFeatures.i.length) {
            var e, i = t.oLanguage, n = t._iDisplayStart + 1, r = t.fnDisplayEnd(), s = t.fnRecordsTotal(), a = t.fnRecordsDisplay();
            for (e = 0 === a ? i.sInfoEmpty : i.sInfo, a != s && (e += " " + i.sInfoFiltered), e += i.sInfoPostFix, e = ja(t, e), null !== i.fnInfoCallback && (e = i.fnInfoCallback.call(t.oInstance, t, n, r, s, a, e)), t = t.aanFeatures.i, i = 0, n = t.length; n > i; i++)h(t[i]).html(e)
          }
        }

        function ja(t, e) {
          var i = t.fnFormatNumber(t._iDisplayStart + 1), n = t.fnDisplayEnd(), n = t.fnFormatNumber(n), r = t.fnRecordsDisplay(), r = t.fnFormatNumber(r), s = t.fnRecordsTotal(), s = t.fnFormatNumber(s);
          return t.oScroll.bInfinite && (i = t.fnFormatNumber(1)), e.replace(/_START_/g, i).replace(/_END_/g, n).replace(/_TOTAL_/g, r).replace(/_MAX_/g, s)
        }

        function ba(t) {
          var e, i, n = t.iInitDisplayStart;
          if (!1 === t.bInitialised)setTimeout(function () {
            ba(t)
          }, 200); else {
            for (xa(t), va(t), W(t, t.aoHeader), t.nTFoot && W(t, t.aoFooter), E(t, !0), t.oFeatures.bAutoWidth && da(t), e = 0, i = t.aoColumns.length; i > e; e++)null !== t.aoColumns[e].sWidth && (t.aoColumns[e].nTh.style.width = q(t.aoColumns[e].sWidth));
            t.oFeatures.bSort ? O(t) : t.oFeatures.bFilter ? K(t, t.oPreviousSearch) : (t.aiDisplay = t.aiDisplayMaster.slice(), y(t), x(t)), null === t.sAjaxSource || t.oFeatures.bServerSide ? t.oFeatures.bServerSide || (E(t, !1), $(t)) : (i = [], ka(t, i), t.fnServerData.call(t.oInstance, t.sAjaxSource, i, function (i) {
              var r = "" !== t.sAjaxDataProp ? Q(t.sAjaxDataProp)(i) : i;
              for (e = 0; e < r.length; e++)H(t, r[e]);
              t.iInitDisplayStart = n, t.oFeatures.bSort ? O(t) : (t.aiDisplay = t.aiDisplayMaster.slice(), y(t), x(t)), E(t, !1), $(t, i)
            }, t))
          }
        }

        function $(t, e) {
          t._bInitComplete = !0, A(t, "aoInitComplete", "init", [t, e])
        }

        function pa(t) {
          var e = j.defaults.oLanguage;
          !t.sEmptyTable && t.sZeroRecords && "No data available in table" === e.sEmptyTable && p(t, t, "sZeroRecords", "sEmptyTable"), !t.sLoadingRecords && t.sZeroRecords && "Loading..." === e.sLoadingRecords && p(t, t, "sZeroRecords", "sLoadingRecords")
        }

        function ya(t) {
          if (t.oScroll.bInfinite)return null;
          var e, i, n = '<select size="1" ' + ('name="' + t.sTableId + '_length"') + ">", r = t.aLengthMenu;
          if (2 == r.length && "object" == typeof r[0] && "object" == typeof r[1])for (e = 0, i = r[0].length; i > e; e++)n += '<option value="' + r[0][e] + '">' + r[1][e] + "</option>"; else for (e = 0, i = r.length; i > e; e++)n += '<option value="' + r[e] + '">' + r[e] + "</option>";
          return n += "</select>", r = l.createElement("div"), t.aanFeatures.l || (r.id = t.sTableId + "_length"), r.className = t.oClasses.sLength, r.innerHTML = "<label>" + t.oLanguage.sLengthMenu.replace("_MENU_", n) + "</label>", h('select option[value="' + t._iDisplayLength + '"]', r).attr("selected", !0), h("select", r).bind("change.DT", function () {
            var n = h(this).val(), r = t.aanFeatures.l;
            for (e = 0, i = r.length; i > e; e++)r[e] != this.parentNode && h("select", r[e]).val(n);
            t._iDisplayLength = parseInt(n, 10), y(t), t.fnDisplayEnd() == t.fnRecordsDisplay() && (t._iDisplayStart = t.fnDisplayEnd() - t._iDisplayLength, t._iDisplayStart < 0 && (t._iDisplayStart = 0)), -1 == t._iDisplayLength && (t._iDisplayStart = 0), x(t)
          }), h("select", r).attr("aria-controls", t.sTableId), r
        }

        function y(t) {
          t._iDisplayEnd = !1 === t.oFeatures.bPaginate ? t.aiDisplay.length : t._iDisplayStart + t._iDisplayLength > t.aiDisplay.length || -1 == t._iDisplayLength ? t.aiDisplay.length : t._iDisplayStart + t._iDisplayLength
        }

        function Da(t) {
          if (t.oScroll.bInfinite)return null;
          var e = l.createElement("div");
          return e.className = t.oClasses.sPaging + t.sPaginationType, j.ext.oPagination[t.sPaginationType].fnInit(t, e, function (t) {
            y(t), x(t)
          }), t.aanFeatures.p || t.aoDrawCallback.push({
            fn: function (t) {
              j.ext.oPagination[t.sPaginationType].fnUpdate(t, function (t) {
                y(t), x(t)
              })
            }, sName: "pagination"
          }), e
        }

        function qa(t, e) {
          var i = t._iDisplayStart;
          if ("number" == typeof e)t._iDisplayStart = e * t._iDisplayLength, t._iDisplayStart > t.fnRecordsDisplay() && (t._iDisplayStart = 0); else if ("first" == e)t._iDisplayStart = 0; else if ("previous" == e)t._iDisplayStart = 0 <= t._iDisplayLength ? t._iDisplayStart - t._iDisplayLength : 0, 0 > t._iDisplayStart && (t._iDisplayStart = 0); else if ("next" == e)0 <= t._iDisplayLength ? t._iDisplayStart + t._iDisplayLength < t.fnRecordsDisplay() && (t._iDisplayStart += t._iDisplayLength) : t._iDisplayStart = 0; else if ("last" == e)if (0 <= t._iDisplayLength) {
            var n = parseInt((t.fnRecordsDisplay() - 1) / t._iDisplayLength, 10) + 1;
            t._iDisplayStart = (n - 1) * t._iDisplayLength
          } else t._iDisplayStart = 0; else D(t, 0, "Unknown paging action: " + e);
          return h(t.oInstance).trigger("page", t), i != t._iDisplayStart
        }

        function Aa(t) {
          var e = l.createElement("div");
          return t.aanFeatures.r || (e.id = t.sTableId + "_processing"), e.innerHTML = t.oLanguage.sProcessing, e.className = t.oClasses.sProcessing, t.nTable.parentNode.insertBefore(e, t.nTable), e
        }

        function E(t, e) {
          if (t.oFeatures.bProcessing)for (var i = t.aanFeatures.r, n = 0, r = i.length; r > n; n++)i[n].style.visibility = e ? "visible" : "hidden";
          h(t.oInstance).trigger("processing", [t, e])
        }

        function Ba(t) {
          if ("" === t.oScroll.sX && "" === t.oScroll.sY)return t.nTable;
          var e = l.createElement("div"), i = l.createElement("div"), n = l.createElement("div"), r = l.createElement("div"), s = l.createElement("div"), a = l.createElement("div"), o = t.nTable.cloneNode(!1), u = t.nTable.cloneNode(!1), c = t.nTable.getElementsByTagName("thead")[0], d = 0 === t.nTable.getElementsByTagName("tfoot").length ? null : t.nTable.getElementsByTagName("tfoot")[0], f = t.oClasses;
          return i.appendChild(n), s.appendChild(a), r.appendChild(t.nTable), e.appendChild(i), e.appendChild(r), n.appendChild(o), o.appendChild(c), null !== d && (e.appendChild(s), a.appendChild(u), u.appendChild(d)), e.className = f.sScrollWrapper, i.className = f.sScrollHead, n.className = f.sScrollHeadInner, r.className = f.sScrollBody, s.className = f.sScrollFoot, a.className = f.sScrollFootInner, t.oScroll.bAutoCss && (i.style.overflow = "hidden", i.style.position = "relative", s.style.overflow = "hidden", r.style.overflow = "auto"), i.style.border = "0", i.style.width = "100%", s.style.border = "0", n.style.width = "" !== t.oScroll.sXInner ? t.oScroll.sXInner : "100%", o.removeAttribute("id"), o.style.marginLeft = "0", t.nTable.style.marginLeft = "0", null !== d && (u.removeAttribute("id"), u.style.marginLeft = "0"), n = h(t.nTable).children("caption"), 0 < n.length && (n = n[0], "top" === n._captionSide ? o.appendChild(n) : "bottom" === n._captionSide && d && u.appendChild(n)), "" !== t.oScroll.sX && (i.style.width = q(t.oScroll.sX), r.style.width = q(t.oScroll.sX), null !== d && (s.style.width = q(t.oScroll.sX)), h(r).scroll(function () {
            i.scrollLeft = this.scrollLeft, null !== d && (s.scrollLeft = this.scrollLeft)
          })), "" !== t.oScroll.sY && (r.style.height = q(t.oScroll.sY)), t.aoDrawCallback.push({
            fn: La,
            sName: "scrolling"
          }), t.oScroll.bInfinite && h(r).scroll(function () {
            !t.bDrawing && 0 !== h(this).scrollTop() && h(this).scrollTop() + h(this).height() > h(t.nTable).height() - t.oScroll.iLoadGap && t.fnDisplayEnd() < t.fnRecordsDisplay() && (qa(t, "next"), y(t), x(t))
          }), t.nScrollHead = i, t.nScrollFoot = s, e
        }

        function La(t) {
          var e, i, n, r, s, a, o, l, u = t.nScrollHead.getElementsByTagName("div")[0], c = u.getElementsByTagName("table")[0], d = t.nTable.parentNode, f = [], p = [], g = null !== t.nTFoot ? t.nScrollFoot.getElementsByTagName("div")[0] : null, v = null !== t.nTFoot ? g.getElementsByTagName("table")[0] : null, m = t.oBrowser.bScrollOversize, y = function (t) {
            o = t.style, o.paddingTop = "0", o.paddingBottom = "0", o.borderTopWidth = "0", o.borderBottomWidth = "0", o.height = 0
          };
          h(t.nTable).children("thead, tfoot").remove(), e = h(t.nTHead).clone()[0], t.nTable.insertBefore(e, t.nTable.childNodes[0]), n = t.nTHead.getElementsByTagName("tr"), r = e.getElementsByTagName("tr"), null !== t.nTFoot && (s = h(t.nTFoot).clone()[0], t.nTable.insertBefore(s, t.nTable.childNodes[1]), a = t.nTFoot.getElementsByTagName("tr"), s = s.getElementsByTagName("tr")), "" === t.oScroll.sX && (d.style.width = "100%", u.parentNode.style.width = "100%");
          var b = N(t, e);
          for (e = 0, i = b.length; i > e; e++)l = G(t, e), b[e].style.width = t.aoColumns[l].sWidth;
          null !== t.nTFoot && C(function (t) {
            t.style.width = ""
          }, s), t.oScroll.bCollapse && "" !== t.oScroll.sY && (d.style.height = d.offsetHeight + t.nTHead.offsetHeight + "px"), e = h(t.nTable).outerWidth(), "" === t.oScroll.sX ? (t.nTable.style.width = "100%", m && (h("tbody", d).height() > d.offsetHeight || "scroll" == h(d).css("overflow-y")) && (t.nTable.style.width = q(h(t.nTable).outerWidth() - t.oScroll.iBarWidth))) : "" !== t.oScroll.sXInner ? t.nTable.style.width = q(t.oScroll.sXInner) : e == h(d).width() && h(d).height() < h(t.nTable).height() ? (t.nTable.style.width = q(e - t.oScroll.iBarWidth), h(t.nTable).outerWidth() > e - t.oScroll.iBarWidth && (t.nTable.style.width = q(e))) : t.nTable.style.width = q(e), e = h(t.nTable).outerWidth(), C(y, r), C(function (t) {
            f.push(q(h(t).width()))
          }, r), C(function (t, e) {
            t.style.width = f[e]
          }, n), h(r).height(0), null !== t.nTFoot && (C(y, s), C(function (t) {
            p.push(q(h(t).width()))
          }, s), C(function (t, e) {
            t.style.width = p[e]
          }, a), h(s).height(0)), C(function (t, e) {
            t.innerHTML = "", t.style.width = f[e]
          }, r), null !== t.nTFoot && C(function (t, e) {
            t.innerHTML = "", t.style.width = p[e]
          }, s), h(t.nTable).outerWidth() < e ? (n = d.scrollHeight > d.offsetHeight || "scroll" == h(d).css("overflow-y") ? e + t.oScroll.iBarWidth : e, m && (d.scrollHeight > d.offsetHeight || "scroll" == h(d).css("overflow-y")) && (t.nTable.style.width = q(n - t.oScroll.iBarWidth)), d.style.width = q(n), t.nScrollHead.style.width = q(n), null !== t.nTFoot && (t.nScrollFoot.style.width = q(n)), "" === t.oScroll.sX ? D(t, 1, "The table cannot fit into the current element which will cause column misalignment. The table has been drawn at its minimum possible width.") : "" !== t.oScroll.sXInner && D(t, 1, "The table cannot fit into the current element which will cause column misalignment. Increase the sScrollXInner value or remove it to allow automatic calculation")) : (d.style.width = q("100%"), t.nScrollHead.style.width = q("100%"), null !== t.nTFoot && (t.nScrollFoot.style.width = q("100%"))), "" === t.oScroll.sY && m && (d.style.height = q(t.nTable.offsetHeight + t.oScroll.iBarWidth)), "" !== t.oScroll.sY && t.oScroll.bCollapse && (d.style.height = q(t.oScroll.sY), m = "" !== t.oScroll.sX && t.nTable.offsetWidth > d.offsetWidth ? t.oScroll.iBarWidth : 0, t.nTable.offsetHeight < d.offsetHeight && (d.style.height = q(t.nTable.offsetHeight + m))), m = h(t.nTable).outerWidth(), c.style.width = q(m), u.style.width = q(m), c = h(t.nTable).height() > d.clientHeight || "scroll" == h(d).css("overflow-y"), u.style.paddingRight = c ? t.oScroll.iBarWidth + "px" : "0px", null !== t.nTFoot && (v.style.width = q(m), g.style.width = q(m), g.style.paddingRight = c ? t.oScroll.iBarWidth + "px" : "0px"), h(d).scroll(), (t.bSorted || t.bFiltered) && (d.scrollTop = 0)
        }

        function C(t, e, i) {
          for (var n, r, s = 0, a = 0, o = e.length; o > a;) {
            for (n = e[a].firstChild, r = i ? i[a].firstChild : null; n;)1 === n.nodeType && (i ? t(n, r, s) : t(n, s), s++), n = n.nextSibling, r = i ? r.nextSibling : null;
            a++
          }
        }

        function Ma(t, e) {
          if (!t || null === t || "" === t)return 0;
          e || (e = l.body);
          var i, n = l.createElement("div");
          return n.style.width = q(t), e.appendChild(n), i = n.offsetWidth, e.removeChild(n), i
        }

        function da(t) {
          var e, i, n, r = 0, s = 0, a = t.aoColumns.length, o = h("th", t.nTHead), u = t.nTable.getAttribute("width");
          for (n = t.nTable.parentNode, i = 0; a > i; i++)t.aoColumns[i].bVisible && (s++, null !== t.aoColumns[i].sWidth && (e = Ma(t.aoColumns[i].sWidthOrig, n), null !== e && (t.aoColumns[i].sWidth = q(e)), r++));
          if (a == o.length && 0 === r && s == a && "" === t.oScroll.sX && "" === t.oScroll.sY)for (i = 0; i < t.aoColumns.length; i++)e = h(o[i]).width(), null !== e && (t.aoColumns[i].sWidth = q(e)); else {
            for (r = t.nTable.cloneNode(!1), i = t.nTHead.cloneNode(!0), s = l.createElement("tbody"), e = l.createElement("tr"), r.removeAttribute("id"), r.appendChild(i), null !== t.nTFoot && (r.appendChild(t.nTFoot.cloneNode(!0)), C(function (t) {
              t.style.width = ""
            }, r.getElementsByTagName("tr"))), r.appendChild(s), s.appendChild(e), s = h("thead th", r), 0 === s.length && (s = h("tbody tr:eq(0)>td", r)), o = N(t, i), i = s = 0; a > i; i++) {
              var c = t.aoColumns[i];
              c.bVisible && null !== c.sWidthOrig && "" !== c.sWidthOrig ? o[i - s].style.width = q(c.sWidthOrig) : c.bVisible ? o[i - s].style.width = "" : s++
            }
            for (i = 0; a > i; i++)t.aoColumns[i].bVisible && (s = Na(t, i), null !== s && (s = s.cloneNode(!0), "" !== t.aoColumns[i].sContentPadding && (s.innerHTML += t.aoColumns[i].sContentPadding), e.appendChild(s)));
            if (n.appendChild(r), "" !== t.oScroll.sX && "" !== t.oScroll.sXInner ? r.style.width = q(t.oScroll.sXInner) : "" !== t.oScroll.sX ? (r.style.width = "", h(r).width() < n.offsetWidth && (r.style.width = q(n.offsetWidth))) : "" !== t.oScroll.sY ? r.style.width = q(n.offsetWidth) : u && (r.style.width = q(u)), r.style.visibility = "hidden", Oa(t, r), a = h("tbody tr:eq(0)", r).children(), 0 === a.length && (a = N(t, h("thead", r)[0])), "" !== t.oScroll.sX) {
              for (i = s = n = 0; i < t.aoColumns.length; i++)t.aoColumns[i].bVisible && (n = null === t.aoColumns[i].sWidthOrig ? n + h(a[s]).outerWidth() : n + (parseInt(t.aoColumns[i].sWidth.replace("px", ""), 10) + (h(a[s]).outerWidth() - h(a[s]).width())), s++);
              r.style.width = q(n), t.nTable.style.width = q(n)
            }
            for (i = s = 0; i < t.aoColumns.length; i++)t.aoColumns[i].bVisible && (n = h(a[s]).width(), null !== n && n > 0 && (t.aoColumns[i].sWidth = q(n)), s++);
            a = h(r).css("width"), t.nTable.style.width = -1 !== a.indexOf("%") ? a : q(h(r).outerWidth()), r.parentNode.removeChild(r)
          }
          u && (t.nTable.style.width = q(u))
        }

        function Oa(t, e) {
          "" === t.oScroll.sX && "" !== t.oScroll.sY ? (h(e).width(), e.style.width = q(h(e).outerWidth() - t.oScroll.iBarWidth)) : "" !== t.oScroll.sX && (e.style.width = q(h(e).outerWidth()))
        }

        function Na(t, e) {
          var i = Pa(t, e);
          if (0 > i)return null;
          if (null === t.aoData[i].nTr) {
            var n = l.createElement("td");
            return n.innerHTML = v(t, i, e, ""), n
          }
          return J(t, i)[e]
        }

        function Pa(t, e) {
          for (var i = -1, n = -1, r = 0; r < t.aoData.length; r++) {
            var s = v(t, r, e, "display") + "", s = s.replace(/<.*?>/g, "");
            s.length > i && (i = s.length, n = r)
          }
          return n
        }

        function q(t) {
          if (null === t)return "0px";
          if ("number" == typeof t)return 0 > t ? "0px" : t + "px";
          var e = t.charCodeAt(t.length - 1);
          return 48 > e || e > 57 ? t : t + "px"
        }

        function Qa() {
          var t = l.createElement("p"), e = t.style;
          e.width = "100%", e.height = "200px", e.padding = "0px";
          var i = l.createElement("div"), e = i.style;
          return e.position = "absolute", e.top = "0px", e.left = "0px", e.visibility = "hidden", e.width = "200px", e.height = "150px", e.padding = "0px", e.overflow = "hidden", i.appendChild(t), l.body.appendChild(i), e = t.offsetWidth, i.style.overflow = "scroll", t = t.offsetWidth, e == t && (t = i.clientWidth), l.body.removeChild(i), e - t
        }

        function O(t, e) {
          var i, r, s, a, o, l, u = [], c = [], d = j.ext.oSort, f = t.aoData, p = t.aoColumns, g = t.oLanguage.oAria;
          if (!t.oFeatures.bServerSide && (0 !== t.aaSorting.length || null !== t.aaSortingFixed)) {
            for (u = null !== t.aaSortingFixed ? t.aaSortingFixed.concat(t.aaSorting) : t.aaSorting.slice(), i = 0; i < u.length; i++)if (r = u[i][0], s = R(t, r), a = t.aoColumns[r].sSortDataType, j.ext.afnSortData[a])if (o = j.ext.afnSortData[a].call(t.oInstance, t, r, s), o.length === f.length)for (s = 0, a = f.length; a > s; s++)F(t, s, r, o[s]); else D(t, 0, "Returned data sort array (col " + r + ") is the wrong length");
            for (i = 0, r = t.aiDisplayMaster.length; r > i; i++)c[t.aiDisplayMaster[i]] = i;
            var m, b = u.length;
            for (i = 0, r = f.length; r > i; i++)for (s = 0; b > s; s++)for (m = p[u[s][0]].aDataSort, o = 0, l = m.length; l > o; o++)a = p[m[o]].sType, a = d[(a ? a : "string") + "-pre"], f[i]._aSortData[m[o]] = a ? a(v(t, i, m[o], "sort")) : v(t, i, m[o], "sort");
            t.aiDisplayMaster.sort(function (t, e) {
              var i, n, r, s, a;
              for (i = 0; b > i; i++)for (a = p[u[i][0]].aDataSort, n = 0, r = a.length; r > n; n++)if (s = p[a[n]].sType, s = d[(s ? s : "string") + "-" + u[i][1]](f[t]._aSortData[a[n]], f[e]._aSortData[a[n]]), 0 !== s)return s;
              return d["numeric-asc"](c[t], c[e])
            })
          }
          for ((e === n || e) && !t.oFeatures.bDeferRender && P(t), i = 0, r = t.aoColumns.length; r > i; i++)a = p[i].sTitle.replace(/<.*?>/g, ""), s = p[i].nTh, s.removeAttribute("aria-sort"), s.removeAttribute("aria-label"), p[i].bSortable ? 0 < u.length && u[0][0] == i ? (s.setAttribute("aria-sort", "asc" == u[0][1] ? "ascending" : "descending"), s.setAttribute("aria-label", a + ("asc" == (p[i].asSorting[u[0][2] + 1] ? p[i].asSorting[u[0][2] + 1] : p[i].asSorting[0]) ? g.sSortAscending : g.sSortDescending))) : s.setAttribute("aria-label", a + ("asc" == p[i].asSorting[0] ? g.sSortAscending : g.sSortDescending)) : s.setAttribute("aria-label", a);
          t.bSorted = !0, h(t.oInstance).trigger("sort", t), t.oFeatures.bFilter ? K(t, t.oPreviousSearch, 1) : (t.aiDisplay = t.aiDisplayMaster.slice(), t._iDisplayStart = 0, y(t), x(t))
        }

        function ia(t, e, i, n) {
          Ra(e, {}, function (e) {
            if (!1 !== t.aoColumns[i].bSortable) {
              var r = function () {
                var n, r;
                if (e.shiftKey) {
                  for (var s = !1, a = 0; a < t.aaSorting.length; a++)if (t.aaSorting[a][0] == i) {
                    s = !0, n = t.aaSorting[a][0], r = t.aaSorting[a][2] + 1, t.aoColumns[n].asSorting[r] ? (t.aaSorting[a][1] = t.aoColumns[n].asSorting[r], t.aaSorting[a][2] = r) : t.aaSorting.splice(a, 1);
                    break
                  }
                  !1 === s && t.aaSorting.push([i, t.aoColumns[i].asSorting[0], 0])
                } else 1 == t.aaSorting.length && t.aaSorting[0][0] == i ? (n = t.aaSorting[0][0], r = t.aaSorting[0][2] + 1, t.aoColumns[n].asSorting[r] || (r = 0), t.aaSorting[0][1] = t.aoColumns[n].asSorting[r], t.aaSorting[0][2] = r) : (t.aaSorting.splice(0, t.aaSorting.length), t.aaSorting.push([i, t.aoColumns[i].asSorting[0], 0]));
                O(t)
              };
              t.oFeatures.bProcessing ? (E(t, !0), setTimeout(function () {
                r(), t.oFeatures.bServerSide || E(t, !1)
              }, 0)) : r(), "function" == typeof n && n(t)
            }
          })
        }

        function P(t) {
          var e, i, n, r, s, a = t.aoColumns.length, o = t.oClasses;
          for (e = 0; a > e; e++)t.aoColumns[e].bSortable && h(t.aoColumns[e].nTh).removeClass(o.sSortAsc + " " + o.sSortDesc + " " + t.aoColumns[e].sSortingClass);
          for (i = null !== t.aaSortingFixed ? t.aaSortingFixed.concat(t.aaSorting) : t.aaSorting.slice(), e = 0; e < t.aoColumns.length; e++)if (t.aoColumns[e].bSortable) {
            for (s = t.aoColumns[e].sSortingClass, r = -1, n = 0; n < i.length; n++)if (i[n][0] == e) {
              s = "asc" == i[n][1] ? o.sSortAsc : o.sSortDesc, r = n;
              break
            }
            h(t.aoColumns[e].nTh).addClass(s), t.bJUI && (s = h("span." + o.sSortIcon, t.aoColumns[e].nTh), s.removeClass(o.sSortJUIAsc + " " + o.sSortJUIDesc + " " + o.sSortJUI + " " + o.sSortJUIAscAllowed + " " + o.sSortJUIDescAllowed), s.addClass(-1 == r ? t.aoColumns[e].sSortingClassJUI : "asc" == i[r][1] ? o.sSortJUIAsc : o.sSortJUIDesc))
          } else h(t.aoColumns[e].nTh).addClass(t.aoColumns[e].sSortingClass);
          if (s = o.sSortColumn, t.oFeatures.bSort && t.oFeatures.bSortClasses) {
            for (t = J(t), r = [], e = 0; a > e; e++)r.push("");
            for (e = 0, n = 1; e < i.length; e++)o = parseInt(i[e][0], 10), r[o] = s + n, 3 > n && n++;
            s = RegExp(s + "[123]");
            var l;
            for (e = 0, i = t.length; i > e; e++)o = e % a, n = t[e].className, l = r[o], o = n.replace(s, l), o != n ? t[e].className = h.trim(o) : 0 < l.length && -1 == n.indexOf(l) && (t[e].className = n + " " + l)
          }
        }

        function ra(t) {
          if (t.oFeatures.bStateSave && !t.bDestroying) {
            var e, i;
            e = t.oScroll.bInfinite;
            var n = {
              iCreate: (new Date).getTime(),
              iStart: e ? 0 : t._iDisplayStart,
              iEnd: e ? t._iDisplayLength : t._iDisplayEnd,
              iLength: t._iDisplayLength,
              aaSorting: h.extend(!0, [], t.aaSorting),
              oSearch: h.extend(!0, {}, t.oPreviousSearch),
              aoSearchCols: h.extend(!0, [], t.aoPreSearchCols),
              abVisCols: []
            };
            for (e = 0, i = t.aoColumns.length; i > e; e++)n.abVisCols.push(t.aoColumns[e].bVisible);
            A(t, "aoStateSaveParams", "stateSaveParams", [t, n]), t.fnStateSave.call(t.oInstance, t, n)
          }
        }

        function Sa(t, e) {
          if (t.oFeatures.bStateSave) {
            var i = t.fnStateLoad.call(t.oInstance, t);
            if (i) {
              var n = A(t, "aoStateLoadParams", "stateLoadParams", [t, i]);
              if (-1 === h.inArray(!1, n)) {
                for (t.oLoadedState = h.extend(!0, {}, i), t._iDisplayStart = i.iStart, t.iInitDisplayStart = i.iStart, t._iDisplayEnd = i.iEnd, t._iDisplayLength = i.iLength, t.aaSorting = i.aaSorting.slice(), t.saved_aaSorting = i.aaSorting.slice(), h.extend(t.oPreviousSearch, i.oSearch), h.extend(!0, t.aoPreSearchCols, i.aoSearchCols), e.saved_aoColumns = [], n = 0; n < i.abVisCols.length; n++)e.saved_aoColumns[n] = {}, e.saved_aoColumns[n].bVisible = i.abVisCols[n];
                A(t, "aoStateLoaded", "stateLoaded", [t, i])
              }
            }
          }
        }

        function s(t) {
          for (var e = 0; e < j.settings.length; e++)if (j.settings[e].nTable === t)return j.settings[e];
          return null
        }

        function T(t) {
          for (var e = [], t = t.aoData, i = 0, n = t.length; n > i; i++)null !== t[i].nTr && e.push(t[i].nTr);
          return e
        }

        function J(t, e) {
          var i, r, s, a, o, l, h = [];
          r = 0;
          var u = t.aoData.length;
          for (e !== n && (r = e, u = e + 1), s = r; u > s; s++)if (l = t.aoData[s], null !== l.nTr) {
            for (r = [], i = l.nTr.firstChild; i;)a = i.nodeName.toLowerCase(), ("td" == a || "th" == a) && r.push(i), i = i.nextSibling;
            for (a = i = 0, o = t.aoColumns.length; o > a; a++)t.aoColumns[a].bVisible ? h.push(r[a - i]) : (h.push(l._anHidden[a]), i++)
          }
          return h
        }

        function D(t, e, i) {
          if (t = null === t ? "DataTables warning: " + i : "DataTables warning (table id = '" + t.sTableId + "'): " + i, 0 === e) {
            if ("alert" != j.ext.sErrMode)throw Error(t);
            alert(t)
          } else X.console && console.log && console.log(t)
        }

        function p(t, e, i, r) {
          r === n && (r = i), e[i] !== n && (t[r] = e[i])
        }

        function Ta(t, i) {
          var n, r;
          for (r in i)i.hasOwnProperty(r) && (n = i[r], "object" == typeof e[r] && null !== n && !1 === h.isArray(n) ? h.extend(!0, t[r], n) : t[r] = n);
          return t
        }

        function Ra(t, e, i) {
          h(t).bind("click.DT", e, function (e) {
            t.blur(), i(e)
          }).bind("keypress.DT", e, function (t) {
            13 === t.which && i(t)
          }).bind("selectstart.DT", function () {
            return !1
          })
        }

        function z(t, e, i, n) {
          i && t[e].push({fn: i, sName: n})
        }

        function A(t, e, i, n) {
          for (var e = t[e], r = [], s = e.length - 1; s >= 0; s--)r.push(e[s].fn.apply(t.oInstance, n));
          return null !== i && h(t.oInstance).trigger(i, n), r
        }

        function Ua(t) {
          var e = h('<div style="position:absolute; top:0; left:0; height:1px; width:1px; overflow:hidden"><div style="position:absolute; top:1px; left:1px; width:100px; overflow:scroll;"><div id="DT_BrowserTest" style="width:100%; height:10px;"></div></div></div>')[0];
          l.body.appendChild(e), t.oBrowser.bScrollOversize = 100 === h("#DT_BrowserTest", e)[0].offsetWidth ? !0 : !1, l.body.removeChild(e)
        }

        function Va(t) {
          return function () {
            var e = [s(this[j.ext.iApiIndex])].concat(Array.prototype.slice.call(arguments));
            return j.ext.oApi[t].apply(this, e)
          }
        }

        var U = /\[.*?\]$/, Wa = X.JSON ? JSON.stringify : function (t) {
          var e = typeof t;
          if ("object" !== e || null === t)return "string" === e && (t = '"' + t + '"'), t + "";
          var i, n, r = [], s = h.isArray(t);
          for (i in t)n = t[i], e = typeof n, "string" === e ? n = '"' + n + '"' : "object" === e && null !== n && (n = Wa(n)), r.push((s ? "" : '"' + i + '":') + n);
          return (s ? "[" : "{") + r + (s ? "]" : "}")
        };
        this.$ = function (t, e) {
          var i, n, r, a = [];
          n = s(this[j.ext.iApiIndex]);
          var o = n.aoData, l = n.aiDisplay, u = n.aiDisplayMaster;
          if (e || (e = {}), e = h.extend({}, {
              filter: "none",
              order: "current",
              page: "all"
            }, e), "current" == e.page)for (i = n._iDisplayStart, n = n.fnDisplayEnd(); n > i; i++)(r = o[l[i]].nTr) && a.push(r); else if ("current" == e.order && "none" == e.filter)for (i = 0, n = u.length; n > i; i++)(r = o[u[i]].nTr) && a.push(r); else if ("current" == e.order && "applied" == e.filter)for (i = 0, n = l.length; n > i; i++)(r = o[l[i]].nTr) && a.push(r); else if ("original" == e.order && "none" == e.filter)for (i = 0, n = o.length; n > i; i++)(r = o[i].nTr) && a.push(r); else if ("original" == e.order && "applied" == e.filter)for (i = 0, n = o.length; n > i; i++)r = o[i].nTr, -1 !== h.inArray(i, l) && r && a.push(r); else D(n, 1, "Unknown selection options");
          return a = h(a), i = a.filter(t), a = a.find(t), h([].concat(h.makeArray(i), h.makeArray(a)))
        }, this._ = function (t, e) {
          var i, n, r = [], s = this.$(t, e);
          for (i = 0, n = s.length; n > i; i++)r.push(this.fnGetData(s[i]));
          return r
        }, this.fnAddData = function (t, e) {
          if (0 === t.length)return [];
          var i, r = [], a = s(this[j.ext.iApiIndex]);
          if ("object" == typeof t[0] && null !== t[0])for (var o = 0; o < t.length; o++) {
            if (i = H(a, t[o]), -1 == i)return r;
            r.push(i)
          } else {
            if (i = H(a, t), -1 == i)return r;
            r.push(i)
          }
          return a.aiDisplay = a.aiDisplayMaster.slice(), (e === n || e) && aa(a), r
        }, this.fnAdjustColumnSizing = function (t) {
          var e = s(this[j.ext.iApiIndex]);
          k(e), t === n || t ? this.fnDraw(!1) : ("" !== e.oScroll.sX || "" !== e.oScroll.sY) && this.oApi._fnScrollDraw(e)
        }, this.fnClearTable = function (t) {
          var e = s(this[j.ext.iApiIndex]);
          ga(e), (t === n || t) && x(e)
        }, this.fnClose = function (t) {
          for (var e = s(this[j.ext.iApiIndex]), i = 0; i < e.aoOpenRows.length; i++)if (e.aoOpenRows[i].nParent == t)return (t = e.aoOpenRows[i].nTr.parentNode) && t.removeChild(e.aoOpenRows[i].nTr), e.aoOpenRows.splice(i, 1), 0;
          return 1
        }, this.fnDeleteRow = function (t, e, i) {
          var r, a, o = s(this[j.ext.iApiIndex]), t = "object" == typeof t ? I(o, t) : t, l = o.aoData.splice(t, 1);
          for (r = 0, a = o.aoData.length; a > r; r++)null !== o.aoData[r].nTr && (o.aoData[r].nTr._DT_RowIndex = r);
          return r = h.inArray(t, o.aiDisplay), o.asDataSearch.splice(r, 1), ha(o.aiDisplayMaster, t), ha(o.aiDisplay, t), "function" == typeof e && e.call(this, o, l), o._iDisplayStart >= o.fnRecordsDisplay() && (o._iDisplayStart -= o._iDisplayLength, 0 > o._iDisplayStart && (o._iDisplayStart = 0)), (i === n || i) && (y(o), x(o)), l
        }, this.fnDestroy = function (t) {
          var i, r, a = s(this[j.ext.iApiIndex]), o = a.nTableWrapper.parentNode, l = a.nTBody, t = t === n ? !1 : t;
          if (a.bDestroying = !0, A(a, "aoDestroyCallback", "destroy", [a]), !t)for (i = 0, r = a.aoColumns.length; r > i; i++)!1 === a.aoColumns[i].bVisible && this.fnSetColumnVis(i, !0);
          for (h(a.nTableWrapper).find("*").andSelf().unbind(".DT"), h("tbody>tr>td." + a.oClasses.sRowEmpty, a.nTable).parent().remove(), a.nTable != a.nTHead.parentNode && (h(a.nTable).children("thead").remove(), a.nTable.appendChild(a.nTHead)), a.nTFoot && a.nTable != a.nTFoot.parentNode && (h(a.nTable).children("tfoot").remove(), a.nTable.appendChild(a.nTFoot)), a.nTable.parentNode.removeChild(a.nTable), h(a.nTableWrapper).remove(), a.aaSorting = [], a.aaSortingFixed = [], P(a), h(T(a)).removeClass(a.asStripeClasses.join(" ")), h("th, td", a.nTHead).removeClass([a.oClasses.sSortable, a.oClasses.sSortableAsc, a.oClasses.sSortableDesc, a.oClasses.sSortableNone].join(" ")), a.bJUI && (h("th span." + a.oClasses.sSortIcon + ", td span." + a.oClasses.sSortIcon, a.nTHead).remove(), h("th, td", a.nTHead).each(function () {
            var t = h("div." + a.oClasses.sSortJUIWrapper, this), e = t.contents();
            h(this).append(e), t.remove()
          })), !t && a.nTableReinsertBefore ? o.insertBefore(a.nTable, a.nTableReinsertBefore) : t || o.appendChild(a.nTable), i = 0, r = a.aoData.length; r > i; i++)null !== a.aoData[i].nTr && l.appendChild(a.aoData[i].nTr);
          if (!0 === a.oFeatures.bAutoWidth && (a.nTable.style.width = q(a.sDestroyWidth)), r = a.asDestroyStripes.length)for (t = h(l).children("tr"), i = 0; r > i; i++)t.filter(":nth-child(" + r + "n + " + i + ")").addClass(a.asDestroyStripes[i]);
          for (i = 0, r = j.settings.length; r > i; i++)j.settings[i] == a && j.settings.splice(i, 1);
          e = a = null
        }, this.fnDraw = function (t) {
          var e = s(this[j.ext.iApiIndex]);
          !1 === t ? (y(e), x(e)) : aa(e)
        }, this.fnFilter = function (t, e, i, r, a, o) {
          var u = s(this[j.ext.iApiIndex]);
          if (u.oFeatures.bFilter)if ((i === n || null === i) && (i = !1), (r === n || null === r) && (r = !0), (a === n || null === a) && (a = !0), (o === n || null === o) && (o = !0), e === n || null === e) {
            if (K(u, {
                sSearch: t + "",
                bRegex: i,
                bSmart: r,
                bCaseInsensitive: o
              }, 1), a && u.aanFeatures.f)for (e = u.aanFeatures.f, i = 0, r = e.length; r > i; i++)try {
              e[i]._DT_Input != l.activeElement && h(e[i]._DT_Input).val(t)
            } catch (c) {
              h(e[i]._DT_Input).val(t)
            }
          } else h.extend(u.aoPreSearchCols[e], {
            sSearch: t + "",
            bRegex: i,
            bSmart: r,
            bCaseInsensitive: o
          }), K(u, u.oPreviousSearch, 1)
        }, this.fnGetData = function (t, e) {
          var i = s(this[j.ext.iApiIndex]);
          if (t !== n) {
            var r = t;
            if ("object" == typeof t) {
              var a = t.nodeName.toLowerCase();
              "tr" === a ? r = I(i, t) : "td" === a && (r = I(i, t.parentNode), e = fa(i, r, t))
            }
            return e !== n ? v(i, r, e, "") : i.aoData[r] !== n ? i.aoData[r]._aData : null
          }
          return Z(i)
        }, this.fnGetNodes = function (t) {
          var e = s(this[j.ext.iApiIndex]);
          return t !== n ? e.aoData[t] !== n ? e.aoData[t].nTr : null : T(e)
        }, this.fnGetPosition = function (t) {
          var e = s(this[j.ext.iApiIndex]), i = t.nodeName.toUpperCase();
          return "TR" == i ? I(e, t) : "TD" == i || "TH" == i ? (i = I(e, t.parentNode), t = fa(e, i, t), [i, R(e, t), t]) : null
        }, this.fnIsOpen = function (t) {
          for (var e = s(this[j.ext.iApiIndex]), i = 0; i < e.aoOpenRows.length; i++)if (e.aoOpenRows[i].nParent == t)return !0;
          return !1
        }, this.fnOpen = function (e, i, n) {
          var r = s(this[j.ext.iApiIndex]), a = T(r);
          if (-1 !== h.inArray(e, a)) {
            this.fnClose(e);
            var a = l.createElement("tr"), o = l.createElement("td");
            return a.appendChild(o), o.className = n, o.colSpan = t(r), "string" == typeof i ? o.innerHTML = i : h(o).html(i), i = h("tr", r.nTBody), -1 != h.inArray(e, i) && h(a).insertAfter(e), r.aoOpenRows.push({
              nTr: a,
              nParent: e
            }), a
          }
        }, this.fnPageChange = function (t, e) {
          var i = s(this[j.ext.iApiIndex]);
          qa(i, t), y(i), (e === n || e) && x(i)
        }, this.fnSetColumnVis = function (e, i, r) {
          var a, o, l, h, u = s(this[j.ext.iApiIndex]), c = u.aoColumns, d = u.aoData;
          if (c[e].bVisible != i) {
            if (i) {
              for (a = o = 0; e > a; a++)c[a].bVisible && o++;
              if (h = o >= t(u), !h)for (a = e; a < c.length; a++)if (c[a].bVisible) {
                l = a;
                break
              }
              for (a = 0, o = d.length; o > a; a++)null !== d[a].nTr && (h ? d[a].nTr.appendChild(d[a]._anHidden[e]) : d[a].nTr.insertBefore(d[a]._anHidden[e], J(u, a)[l]))
            } else for (a = 0, o = d.length; o > a; a++)null !== d[a].nTr && (l = J(u, a)[e], d[a]._anHidden[e] = l, l.parentNode.removeChild(l));
            for (c[e].bVisible = i, W(u, u.aoHeader), u.nTFoot && W(u, u.aoFooter), a = 0, o = u.aoOpenRows.length; o > a; a++)u.aoOpenRows[a].nTr.colSpan = t(u);
            (r === n || r) && (k(u), x(u)), ra(u)
          }
        }, this.fnSettings = function () {
          return s(this[j.ext.iApiIndex])
        }, this.fnSort = function (t) {
          var e = s(this[j.ext.iApiIndex]);
          e.aaSorting = t, O(e)
        }, this.fnSortListener = function (t, e, i) {
          ia(s(this[j.ext.iApiIndex]), t, e, i)
        }, this.fnUpdate = function (t, e, i, a, o) {
          var l = s(this[j.ext.iApiIndex]), e = "object" == typeof e ? I(l, e) : e;
          if (h.isArray(t) && i === n)for (l.aoData[e]._aData = t.slice(), i = 0; i < l.aoColumns.length; i++)this.fnUpdate(v(l, e, i), e, i, !1, !1); else if (h.isPlainObject(t) && i === n)for (l.aoData[e]._aData = h.extend(!0, {}, t), i = 0; i < l.aoColumns.length; i++)this.fnUpdate(v(l, e, i), e, i, !1, !1); else {
            F(l, e, i, t);
            var t = v(l, e, i, "display"), u = l.aoColumns[i];
            null !== u.fnRender && (t = S(l, e, i), u.bUseRendered && F(l, e, i, t)), null !== l.aoData[e].nTr && (J(l, e)[i].innerHTML = t)
          }
          return i = h.inArray(e, l.aiDisplay), l.asDataSearch[i] = na(l, Y(l, e, "filter", r(l, "bSearchable"))), (o === n || o) && k(l), (a === n || a) && aa(l), 0
        }, this.fnVersionCheck = j.ext.fnVersionCheck, this.oApi = {
          _fnExternApiFunc: Va,
          _fnInitialise: ba,
          _fnInitComplete: $,
          _fnLanguageCompat: pa,
          _fnAddColumn: o,
          _fnColumnOptions: m,
          _fnAddData: H,
          _fnCreateTr: ea,
          _fnGatherData: ua,
          _fnBuildHead: va,
          _fnDrawHead: W,
          _fnDraw: x,
          _fnReDraw: aa,
          _fnAjaxUpdate: wa,
          _fnAjaxParameters: Ea,
          _fnAjaxUpdateDraw: Fa,
          _fnServerParams: ka,
          _fnAddOptionsHtml: xa,
          _fnFeatureHtmlTable: Ba,
          _fnScrollDraw: La,
          _fnAdjustColumnSizing: k,
          _fnFeatureHtmlFilter: za,
          _fnFilterComplete: K,
          _fnFilterCustom: Ia,
          _fnFilterColumn: Ha,
          _fnFilter: Ga,
          _fnBuildSearchArray: la,
          _fnBuildSearchRow: na,
          _fnFilterCreateSearch: ma,
          _fnDataToSearch: Ja,
          _fnSort: O,
          _fnSortAttachListener: ia,
          _fnSortingClasses: P,
          _fnFeatureHtmlPaginate: Da,
          _fnPageChange: qa,
          _fnFeatureHtmlInfo: Ca,
          _fnUpdateInfo: Ka,
          _fnFeatureHtmlLength: ya,
          _fnFeatureHtmlProcessing: Aa,
          _fnProcessingDisplay: E,
          _fnVisibleToColumnIndex: G,
          _fnColumnIndexToVisible: R,
          _fnNodeToDataIndex: I,
          _fnVisbleColumns: t,
          _fnCalculateEnd: y,
          _fnConvertToWidth: Ma,
          _fnCalculateColumnWidths: da,
          _fnScrollingWidthAdjust: Oa,
          _fnGetWidestNode: Na,
          _fnGetMaxLenString: Pa,
          _fnStringToCss: q,
          _fnDetectType: B,
          _fnSettingsFromNode: s,
          _fnGetDataMaster: Z,
          _fnGetTrNodes: T,
          _fnGetTdNodes: J,
          _fnEscapeRegex: oa,
          _fnDeleteIndex: ha,
          _fnReOrderIndex: u,
          _fnColumnOrdering: M,
          _fnLog: D,
          _fnClearTable: ga,
          _fnSaveState: ra,
          _fnLoadState: Sa,
          _fnCreateCookie: function (a, b, c, d, e) {
            var f = new Date;
            f.setTime(f.getTime() + 1e3 * c);
            var c = X.location.pathname.split("/"), a = a + "_" + c.pop().replace(/[\/:]/g, "").toLowerCase(), g;
            if (null !== e ? (g = "function" == typeof h.parseJSON ? h.parseJSON(b) : eval("(" + b + ")"), b = e(a, g, f.toGMTString(), c.join("/") + "/")) : b = a + "=" + encodeURIComponent(b) + "; expires=" + f.toGMTString() + "; path=" + c.join("/") + "/", a = l.cookie.split(";"), e = b.split(";")[0].length, f = [], 4096 < e + l.cookie.length + 10) {
              for (var j = 0, o = a.length; o > j; j++)if (-1 != a[j].indexOf(d)) {
                var k = a[j].split("=");
                try {
                  (g = eval("(" + decodeURIComponent(k[1]) + ")")) && g.iCreate && f.push({name: k[0], time: g.iCreate})
                } catch (m) {
                }
              }
              for (f.sort(function (t, e) {
                return e.time - t.time
              }); 4096 < e + l.cookie.length + 10;) {
                if (0 === f.length)return;
                d = f.pop(), l.cookie = d.name + "=; expires=Thu, 01-Jan-1970 00:00:01 GMT; path=" + c.join("/") + "/"
              }
            }
            l.cookie = b
          },
          _fnReadCookie: function (t) {
            for (var e = X.location.pathname.split("/"), t = t + "_" + e[e.length - 1].replace(/[\/:]/g, "").toLowerCase() + "=", e = l.cookie.split(";"), i = 0; i < e.length; i++) {
              for (var n = e[i]; " " == n.charAt(0);)n = n.substring(1, n.length);
              if (0 === n.indexOf(t))return decodeURIComponent(n.substring(t.length, n.length))
            }
            return null
          },
          _fnDetectHeader: V,
          _fnGetUniqueThs: N,
          _fnScrollBarWidth: Qa,
          _fnApplyToChildren: C,
          _fnMap: p,
          _fnGetRowData: Y,
          _fnGetCellData: v,
          _fnSetCellData: F,
          _fnGetObjectDataFn: Q,
          _fnSetObjectDataFn: L,
          _fnApplyColumnDefs: ta,
          _fnBindAction: Ra,
          _fnExtend: Ta,
          _fnCallbackReg: z,
          _fnCallbackFire: A,
          _fnJsonString: Wa,
          _fnRender: S,
          _fnNodeToColumnIndex: fa,
          _fnInfoMacros: ja,
          _fnBrowserDetect: Ua,
          _fnGetColumns: r
        }, h.extend(j.ext.oApi, this.oApi);
        for (var sa in j.ext.oApi)sa && (this[sa] = Va(sa));
        var ca = this;
        return this.each(function () {
          var t, i, r, s = 0;
          i = this.getAttribute("id");
          var a = !1, u = !1;
          if ("table" != this.nodeName.toLowerCase())D(null, 0, "Attempted to initialise DataTables on a node which is not a table: " + this.nodeName); else {
            for (s = 0, t = j.settings.length; t > s; s++) {
              if (j.settings[s].nTable == this) {
                if (e === n || e.bRetrieve)return j.settings[s].oInstance;
                if (e.bDestroy) {
                  j.settings[s].oInstance.fnDestroy();
                  break
                }
                return D(j.settings[s], 0, "Cannot reinitialise DataTable.\n\nTo retrieve the DataTables object for this table, pass no arguments or see the docs for bRetrieve and bDestroy"), void 0
              }
              if (j.settings[s].sTableId == this.id) {
                j.settings.splice(s, 1);
                break
              }
            }
            (null === i || "" === i) && (this.id = i = "DataTables_Table_" + j.ext._oExternConfig.iNextUnique++);
            var c = h.extend(!0, {}, j.models.oSettings, {
              nTable: this,
              oApi: ca.oApi,
              oInit: e,
              sDestroyWidth: h(this).width(),
              sInstance: i,
              sTableId: i
            });
            if (j.settings.push(c), c.oInstance = 1 === ca.length ? ca : h(this).dataTable(), e || (e = {}), e.oLanguage && pa(e.oLanguage), e = Ta(h.extend(!0, {}, j.defaults), e), p(c.oFeatures, e, "bPaginate"), p(c.oFeatures, e, "bLengthChange"), p(c.oFeatures, e, "bFilter"), p(c.oFeatures, e, "bSort"), p(c.oFeatures, e, "bInfo"), p(c.oFeatures, e, "bProcessing"), p(c.oFeatures, e, "bAutoWidth"), p(c.oFeatures, e, "bSortClasses"), p(c.oFeatures, e, "bServerSide"), p(c.oFeatures, e, "bDeferRender"), p(c.oScroll, e, "sScrollX", "sX"), p(c.oScroll, e, "sScrollXInner", "sXInner"), p(c.oScroll, e, "sScrollY", "sY"), p(c.oScroll, e, "bScrollCollapse", "bCollapse"), p(c.oScroll, e, "bScrollInfinite", "bInfinite"), p(c.oScroll, e, "iScrollLoadGap", "iLoadGap"), p(c.oScroll, e, "bScrollAutoCss", "bAutoCss"), p(c, e, "asStripeClasses"), p(c, e, "asStripClasses", "asStripeClasses"), p(c, e, "fnServerData"), p(c, e, "fnFormatNumber"), p(c, e, "sServerMethod"), p(c, e, "aaSorting"), p(c, e, "aaSortingFixed"), p(c, e, "aLengthMenu"), p(c, e, "sPaginationType"), p(c, e, "sAjaxSource"), p(c, e, "sAjaxDataProp"), p(c, e, "iCookieDuration"), p(c, e, "sCookiePrefix"), p(c, e, "sDom"), p(c, e, "bSortCellsTop"), p(c, e, "iTabIndex"), p(c, e, "oSearch", "oPreviousSearch"), p(c, e, "aoSearchCols", "aoPreSearchCols"), p(c, e, "iDisplayLength", "_iDisplayLength"), p(c, e, "bJQueryUI", "bJUI"), p(c, e, "fnCookieCallback"), p(c, e, "fnStateLoad"), p(c, e, "fnStateSave"), p(c.oLanguage, e, "fnInfoCallback"), z(c, "aoDrawCallback", e.fnDrawCallback, "user"), z(c, "aoServerParams", e.fnServerParams, "user"), z(c, "aoStateSaveParams", e.fnStateSaveParams, "user"), z(c, "aoStateLoadParams", e.fnStateLoadParams, "user"), z(c, "aoStateLoaded", e.fnStateLoaded, "user"), z(c, "aoRowCallback", e.fnRowCallback, "user"), z(c, "aoRowCreatedCallback", e.fnCreatedRow, "user"), z(c, "aoHeaderCallback", e.fnHeaderCallback, "user"), z(c, "aoFooterCallback", e.fnFooterCallback, "user"), z(c, "aoInitComplete", e.fnInitComplete, "user"), z(c, "aoPreDrawCallback", e.fnPreDrawCallback, "user"), c.oFeatures.bServerSide && c.oFeatures.bSort && c.oFeatures.bSortClasses ? z(c, "aoDrawCallback", P, "server_side_sort_classes") : c.oFeatures.bDeferRender && z(c, "aoDrawCallback", P, "defer_sort_classes"), e.bJQueryUI ? (h.extend(c.oClasses, j.ext.oJUIClasses), e.sDom === j.defaults.sDom && "lfrtip" === j.defaults.sDom && (c.sDom = '<"H"lfr>t<"F"ip>')) : h.extend(c.oClasses, j.ext.oStdClasses), h(this).addClass(c.oClasses.sTable), ("" !== c.oScroll.sX || "" !== c.oScroll.sY) && (c.oScroll.iBarWidth = Qa()), c.iInitDisplayStart === n && (c.iInitDisplayStart = e.iDisplayStart, c._iDisplayStart = e.iDisplayStart), e.bStateSave && (c.oFeatures.bStateSave = !0, Sa(c, e), z(c, "aoDrawCallback", ra, "state_save")), null !== e.iDeferLoading && (c.bDeferLoading = !0, s = h.isArray(e.iDeferLoading), c._iRecordsDisplay = s ? e.iDeferLoading[0] : e.iDeferLoading, c._iRecordsTotal = s ? e.iDeferLoading[1] : e.iDeferLoading), null !== e.aaData && (u = !0), "" !== e.oLanguage.sUrl ? (c.oLanguage.sUrl = e.oLanguage.sUrl, h.getJSON(c.oLanguage.sUrl, null, function (t) {
                pa(t), h.extend(!0, c.oLanguage, e.oLanguage, t), ba(c)
              }), a = !0) : h.extend(!0, c.oLanguage, e.oLanguage), null === e.asStripeClasses && (c.asStripeClasses = [c.oClasses.sStripeOdd, c.oClasses.sStripeEven]), t = c.asStripeClasses.length, c.asDestroyStripes = [], t) {
              for (i = !1, r = h(this).children("tbody").children("tr:lt(" + t + ")"), s = 0; t > s; s++)r.hasClass(c.asStripeClasses[s]) && (i = !0, c.asDestroyStripes.push(c.asStripeClasses[s]));
              i && r.removeClass(c.asStripeClasses.join(" "))
            }
            if (i = [], s = this.getElementsByTagName("thead"), 0 !== s.length && (V(c.aoHeader, s[0]), i = N(c)), null === e.aoColumns)for (r = [], s = 0, t = i.length; t > s; s++)r.push(null); else r = e.aoColumns;
            for (s = 0, t = r.length; t > s; s++)e.saved_aoColumns !== n && e.saved_aoColumns.length == t && (null === r[s] && (r[s] = {}), r[s].bVisible = e.saved_aoColumns[s].bVisible), o(c, i ? i[s] : null);
            for (ta(c, e.aoColumnDefs, r, function (t, e) {
              m(c, t, e)
            }), s = 0, t = c.aaSorting.length; t > s; s++) {
              c.aaSorting[s][0] >= c.aoColumns.length && (c.aaSorting[s][0] = 0);
              var d = c.aoColumns[c.aaSorting[s][0]];
              for (c.aaSorting[s][2] === n && (c.aaSorting[s][2] = 0), e.aaSorting === n && c.saved_aaSorting === n && (c.aaSorting[s][1] = d.asSorting[0]), i = 0, r = d.asSorting.length; r > i; i++)if (c.aaSorting[s][1] == d.asSorting[i]) {
                c.aaSorting[s][2] = i;
                break
              }
            }
            if (P(c), Ua(c), s = h(this).children("caption").each(function () {
                this._captionSide = h(this).css("caption-side")
              }), t = h(this).children("thead"), 0 === t.length && (t = [l.createElement("thead")], this.appendChild(t[0])), c.nTHead = t[0], t = h(this).children("tbody"), 0 === t.length && (t = [l.createElement("tbody")], this.appendChild(t[0])), c.nTBody = t[0], c.nTBody.setAttribute("role", "alert"), c.nTBody.setAttribute("aria-live", "polite"), c.nTBody.setAttribute("aria-relevant", "all"), t = h(this).children("tfoot"), 0 === t.length && 0 < s.length && ("" !== c.oScroll.sX || "" !== c.oScroll.sY) && (t = [l.createElement("tfoot")], this.appendChild(t[0])), 0 < t.length && (c.nTFoot = t[0], V(c.aoFooter, c.nTFoot)), u)for (s = 0; s < e.aaData.length; s++)H(c, e.aaData[s]); else ua(c);
            c.aiDisplay = c.aiDisplayMaster.slice(), c.bInitialised = !0, !1 === a && ba(c)
          }
        }), ca = null, this
      };
      j.fnVersionCheck = function (t) {
        for (var e = function (t, e) {
          for (; t.length < e;)t += "0";
          return t
        }, i = j.ext.sVersion.split("."), t = t.split("."), n = "", r = "", s = 0, a = t.length; a > s; s++)n += e(i[s], 3), r += e(t[s], 3);
        return parseInt(n, 10) >= parseInt(r, 10)
      }, j.fnIsDataTable = function (t) {
        for (var e = j.settings, i = 0; i < e.length; i++)if (e[i].nTable === t || e[i].nScrollHead === t || e[i].nScrollFoot === t)return !0;
        return !1
      }, j.fnTables = function (t) {
        var e = [];
        return jQuery.each(j.settings, function (i, n) {
          (!t || !0 === t && h(n.nTable).is(":visible")) && e.push(n.nTable)
        }), e
      }, j.version = "1.9.4", j.settings = [], j.models = {}, j.models.ext = {
        afnFiltering: [],
        afnSortData: [],
        aoFeatures: [],
        aTypes: [],
        fnVersionCheck: j.fnVersionCheck,
        iApiIndex: 0,
        ofnSearch: {},
        oApi: {},
        oStdClasses: {},
        oJUIClasses: {},
        oPagination: {},
        oSort: {},
        sVersion: j.version,
        sErrMode: "alert",
        _oExternConfig: {iNextUnique: 0}
      }, j.models.oSearch = {bCaseInsensitive: !0, sSearch: "", bRegex: !1, bSmart: !0}, j.models.oRow = {
        nTr: null,
        _aData: [],
        _aSortData: [],
        _anHidden: [],
        _sRowStripe: ""
      }, j.models.oColumn = {
        aDataSort: null,
        asSorting: null,
        bSearchable: null,
        bSortable: null,
        bUseRendered: null,
        bVisible: null,
        _bAutoType: !0,
        fnCreatedCell: null,
        fnGetData: null,
        fnRender: null,
        fnSetData: null,
        mData: null,
        mRender: null,
        nTh: null,
        nTf: null,
        sClass: null,
        sContentPadding: null,
        sDefaultContent: null,
        sName: null,
        sSortDataType: "std",
        sSortingClass: null,
        sSortingClassJUI: null,
        sTitle: null,
        sType: null,
        sWidth: null,
        sWidthOrig: null
      }, j.defaults = {
        aaData: null,
        aaSorting: [[0, "asc"]],
        aaSortingFixed: null,
        aLengthMenu: [10, 25, 50, 100],
        aoColumns: null,
        aoColumnDefs: null,
        aoSearchCols: [],
        asStripeClasses: null,
        bAutoWidth: !0,
        bDeferRender: !1,
        bDestroy: !1,
        bFilter: !0,
        bInfo: !0,
        bJQueryUI: !1,
        bLengthChange: !0,
        bPaginate: !0,
        bProcessing: !1,
        bRetrieve: !1,
        bScrollAutoCss: !0,
        bScrollCollapse: !1,
        bScrollInfinite: !1,
        bServerSide: !1,
        bSort: !0,
        bSortCellsTop: !1,
        bSortClasses: !0,
        bStateSave: !1,
        fnCookieCallback: null,
        fnCreatedRow: null,
        fnDrawCallback: null,
        fnFooterCallback: null,
        fnFormatNumber: function (t) {
          if (1e3 > t)return t;
          for (var e = t + "", t = e.split(""), i = "", e = e.length, n = 0; e > n; n++)0 === n % 3 && 0 !== n && (i = this.oLanguage.sInfoThousands + i), i = t[e - n - 1] + i;
          return i
        },
        fnHeaderCallback: null,
        fnInfoCallback: null,
        fnInitComplete: null,
        fnPreDrawCallback: null,
        fnRowCallback: null,
        fnServerData: function (t, e, i, n) {
          n.jqXHR = h.ajax({
            url: t, data: e, success: function (t) {
              t.sError && n.oApi._fnLog(n, 0, t.sError), h(n.oInstance).trigger("xhr", [n, t]), i(t)
            }, dataType: "json", cache: !1, type: n.sServerMethod, error: function (t, e) {
              "parsererror" == e && n.oApi._fnLog(n, 0, "DataTables warning: JSON data from server could not be parsed. This is caused by a JSON formatting error.")
            }
          })
        },
        fnServerParams: null,
        fnStateLoad: function (e) {
          var e = this.oApi._fnReadCookie(e.sCookiePrefix + e.sInstance), j;
          try {
            j = "function" == typeof h.parseJSON ? h.parseJSON(e) : eval("(" + e + ")")
          } catch (m) {
            j = null
          }
          return j
        },
        fnStateLoadParams: null,
        fnStateLoaded: null,
        fnStateSave: function (t, e) {
          this.oApi._fnCreateCookie(t.sCookiePrefix + t.sInstance, this.oApi._fnJsonString(e), t.iCookieDuration, t.sCookiePrefix, t.fnCookieCallback)
        },
        fnStateSaveParams: null,
        iCookieDuration: 7200,
        iDeferLoading: null,
        iDisplayLength: 10,
        iDisplayStart: 0,
        iScrollLoadGap: 100,
        iTabIndex: 0,
        oLanguage: {
          oAria: {
            sSortAscending: ": activate to sort column ascending",
            sSortDescending: ": activate to sort column descending"
          },
          oPaginate: {sFirst: "First", sLast: "Last", sNext: "Next", sPrevious: "Previous"},
          sEmptyTable: "No data available in table",
          sInfo: "Showing _START_ to _END_ of _TOTAL_ entries",
          sInfoEmpty: "Showing 0 to 0 of 0 entries",
          sInfoFiltered: "(filtered from _MAX_ total entries)",
          sInfoPostFix: "",
          sInfoThousands: ",",
          sLengthMenu: "Show _MENU_ entries",
          sLoadingRecords: "Loading...",
          sProcessing: "Processing...",
          sSearch: "Search:",
          sUrl: "",
          sZeroRecords: "No matching records found"
        },
        oSearch: h.extend({}, j.models.oSearch),
        sAjaxDataProp: "aaData",
        sAjaxSource: null,
        sCookiePrefix: "SpryMedia_DataTables_",
        sDom: "lfrtip",
        sPaginationType: "two_button",
        sScrollX: "",
        sScrollXInner: "",
        sScrollY: "",
        sServerMethod: "GET"
      }, j.defaults.columns = {
        aDataSort: null,
        asSorting: ["asc", "desc"],
        bSearchable: !0,
        bSortable: !0,
        bUseRendered: !0,
        bVisible: !0,
        fnCreatedCell: null,
        fnRender: null,
        iDataSort: -1,
        mData: null,
        mRender: null,
        sCellType: "td",
        sClass: "",
        sContentPadding: "",
        sDefaultContent: null,
        sName: "",
        sSortDataType: "std",
        sTitle: null,
        sType: null,
        sWidth: null
      }, j.models.oSettings = {
        oFeatures: {
          bAutoWidth: null,
          bDeferRender: null,
          bFilter: null,
          bInfo: null,
          bLengthChange: null,
          bPaginate: null,
          bProcessing: null,
          bServerSide: null,
          bSort: null,
          bSortClasses: null,
          bStateSave: null
        },
        oScroll: {
          bAutoCss: null,
          bCollapse: null,
          bInfinite: null,
          iBarWidth: 0,
          iLoadGap: null,
          sX: null,
          sXInner: null,
          sY: null
        },
        oLanguage: {fnInfoCallback: null},
        oBrowser: {bScrollOversize: !1},
        aanFeatures: [],
        aoData: [],
        aiDisplay: [],
        aiDisplayMaster: [],
        aoColumns: [],
        aoHeader: [],
        aoFooter: [],
        asDataSearch: [],
        oPreviousSearch: {},
        aoPreSearchCols: [],
        aaSorting: null,
        aaSortingFixed: null,
        asStripeClasses: null,
        asDestroyStripes: [],
        sDestroyWidth: 0,
        aoRowCallback: [],
        aoHeaderCallback: [],
        aoFooterCallback: [],
        aoDrawCallback: [],
        aoRowCreatedCallback: [],
        aoPreDrawCallback: [],
        aoInitComplete: [],
        aoStateSaveParams: [],
        aoStateLoadParams: [],
        aoStateLoaded: [],
        sTableId: "",
        nTable: null,
        nTHead: null,
        nTFoot: null,
        nTBody: null,
        nTableWrapper: null,
        bDeferLoading: !1,
        bInitialised: !1,
        aoOpenRows: [],
        sDom: null,
        sPaginationType: "two_button",
        iCookieDuration: 0,
        sCookiePrefix: "",
        fnCookieCallback: null,
        aoStateSave: [],
        aoStateLoad: [],
        oLoadedState: null,
        sAjaxSource: null,
        sAjaxDataProp: null,
        bAjaxDataGet: !0,
        jqXHR: null,
        fnServerData: null,
        aoServerParams: [],
        sServerMethod: null,
        fnFormatNumber: null,
        aLengthMenu: null,
        iDraw: 0,
        bDrawing: !1,
        iDrawError: -1,
        _iDisplayLength: 10,
        _iDisplayStart: 0,
        _iDisplayEnd: 10,
        _iRecordsTotal: 0,
        _iRecordsDisplay: 0,
        bJUI: null,
        oClasses: {},
        bFiltered: !1,
        bSorted: !1,
        bSortCellsTop: null,
        oInit: null,
        aoDestroyCallback: [],
        fnRecordsTotal: function () {
          return this.oFeatures.bServerSide ? parseInt(this._iRecordsTotal, 10) : this.aiDisplayMaster.length
        },
        fnRecordsDisplay: function () {
          return this.oFeatures.bServerSide ? parseInt(this._iRecordsDisplay, 10) : this.aiDisplay.length
        },
        fnDisplayEnd: function () {
          return this.oFeatures.bServerSide ? !1 === this.oFeatures.bPaginate || -1 == this._iDisplayLength ? this._iDisplayStart + this.aiDisplay.length : Math.min(this._iDisplayStart + this._iDisplayLength, this._iRecordsDisplay) : this._iDisplayEnd
        },
        oInstance: null,
        sInstance: null,
        iTabIndex: 0,
        nScrollHead: null,
        nScrollFoot: null
      }, j.ext = h.extend(!0, {}, j.models.ext), h.extend(j.ext.oStdClasses, {
        sTable: "dataTable",
        sPagePrevEnabled: "paginate_enabled_previous",
        sPagePrevDisabled: "paginate_disabled_previous",
        sPageNextEnabled: "paginate_enabled_next",
        sPageNextDisabled: "paginate_disabled_next",
        sPageJUINext: "",
        sPageJUIPrev: "",
        sPageButton: "paginate_button",
        sPageButtonActive: "paginate_active",
        sPageButtonStaticDisabled: "paginate_button paginate_button_disabled",
        sPageFirst: "first",
        sPagePrevious: "previous",
        sPageNext: "next",
        sPageLast: "last",
        sStripeOdd: "odd",
        sStripeEven: "even",
        sRowEmpty: "dataTables_empty",
        sWrapper: "dataTables_wrapper",
        sFilter: "dataTables_filter",
        sInfo: "dataTables_info",
        sPaging: "dataTables_paginate paging_",
        sLength: "dataTables_length",
        sProcessing: "dataTables_processing",
        sSortAsc: "sorting_asc",
        sSortDesc: "sorting_desc",
        sSortable: "sorting",
        sSortableAsc: "sorting_asc_disabled",
        sSortableDesc: "sorting_desc_disabled",
        sSortableNone: "sorting_disabled",
        sSortColumn: "sorting_",
        sSortJUIAsc: "",
        sSortJUIDesc: "",
        sSortJUI: "",
        sSortJUIAscAllowed: "",
        sSortJUIDescAllowed: "",
        sSortJUIWrapper: "",
        sSortIcon: "",
        sScrollWrapper: "dataTables_scroll",
        sScrollHead: "dataTables_scrollHead",
        sScrollHeadInner: "dataTables_scrollHeadInner",
        sScrollBody: "dataTables_scrollBody",
        sScrollFoot: "dataTables_scrollFoot",
        sScrollFootInner: "dataTables_scrollFootInner",
        sFooterTH: "",
        sJUIHeader: "",
        sJUIFooter: ""
      }), h.extend(j.ext.oJUIClasses, j.ext.oStdClasses, {
        sPagePrevEnabled: "fg-button ui-button ui-state-default ui-corner-left",
        sPagePrevDisabled: "fg-button ui-button ui-state-default ui-corner-left ui-state-disabled",
        sPageNextEnabled: "fg-button ui-button ui-state-default ui-corner-right",
        sPageNextDisabled: "fg-button ui-button ui-state-default ui-corner-right ui-state-disabled",
        sPageJUINext: "ui-icon ui-icon-circle-arrow-e",
        sPageJUIPrev: "ui-icon ui-icon-circle-arrow-w",
        sPageButton: "fg-button ui-button ui-state-default",
        sPageButtonActive: "fg-button ui-button ui-state-default ui-state-disabled",
        sPageButtonStaticDisabled: "fg-button ui-button ui-state-default ui-state-disabled",
        sPageFirst: "first ui-corner-tl ui-corner-bl",
        sPageLast: "last ui-corner-tr ui-corner-br",
        sPaging: "dataTables_paginate fg-buttonset ui-buttonset fg-buttonset-multi ui-buttonset-multi paging_",
        sSortAsc: "ui-state-default",
        sSortDesc: "ui-state-default",
        sSortable: "ui-state-default",
        sSortableAsc: "ui-state-default",
        sSortableDesc: "ui-state-default",
        sSortableNone: "ui-state-default",
        sSortJUIAsc: "css_right ui-icon ui-icon-triangle-1-n",
        sSortJUIDesc: "css_right ui-icon ui-icon-triangle-1-s",
        sSortJUI: "css_right ui-icon ui-icon-carat-2-n-s",
        sSortJUIAscAllowed: "css_right ui-icon ui-icon-carat-1-n",
        sSortJUIDescAllowed: "css_right ui-icon ui-icon-carat-1-s",
        sSortJUIWrapper: "DataTables_sort_wrapper",
        sSortIcon: "DataTables_sort_icon",
        sScrollHead: "dataTables_scrollHead ui-state-default",
        sScrollFoot: "dataTables_scrollFoot ui-state-default",
        sFooterTH: "ui-state-default",
        sJUIHeader: "fg-toolbar ui-toolbar ui-widget-header ui-corner-tl ui-corner-tr ui-helper-clearfix",
        sJUIFooter: "fg-toolbar ui-toolbar ui-widget-header ui-corner-bl ui-corner-br ui-helper-clearfix"
      }), h.extend(j.ext.oPagination, {
        two_button: {
          fnInit: function (t, e, i) {
            var n = t.oLanguage.oPaginate, r = function (e) {
              t.oApi._fnPageChange(t, e.data.action) && i(t)
            }, n = t.bJUI ? '<a class="' + t.oClasses.sPagePrevDisabled + '" tabindex="' + t.iTabIndex + '" role="button"><span class="' + t.oClasses.sPageJUIPrev + '"></span></a><a class="' + t.oClasses.sPageNextDisabled + '" tabindex="' + t.iTabIndex + '" role="button"><span class="' + t.oClasses.sPageJUINext + '"></span></a>' : '<a class="' + t.oClasses.sPagePrevDisabled + '" tabindex="' + t.iTabIndex + '" role="button">' + n.sPrevious + '</a><a class="' + t.oClasses.sPageNextDisabled + '" tabindex="' + t.iTabIndex + '" role="button">' + n.sNext + "</a>";
            h(e).append(n);
            var s = h("a", e), n = s[0], s = s[1];
            t.oApi._fnBindAction(n, {action: "previous"}, r), t.oApi._fnBindAction(s, {action: "next"}, r), t.aanFeatures.p || (e.id = t.sTableId + "_paginate", n.id = t.sTableId + "_previous", s.id = t.sTableId + "_next", n.setAttribute("aria-controls", t.sTableId), s.setAttribute("aria-controls", t.sTableId))
          }, fnUpdate: function (t) {
            if (t.aanFeatures.p)for (var e, i = t.oClasses, n = t.aanFeatures.p, r = 0, s = n.length; s > r; r++)(e = n[r].firstChild) && (e.className = 0 === t._iDisplayStart ? i.sPagePrevDisabled : i.sPagePrevEnabled, e = e.nextSibling, e.className = t.fnDisplayEnd() == t.fnRecordsDisplay() ? i.sPageNextDisabled : i.sPageNextEnabled)
          }
        }, iFullNumbersShowPages: 5, full_numbers: {
          fnInit: function (t, e, i) {
            var n = t.oLanguage.oPaginate, r = t.oClasses, s = function (e) {
              t.oApi._fnPageChange(t, e.data.action) && i(t)
            };
            h(e).append('<a  tabindex="' + t.iTabIndex + '" class="' + r.sPageButton + " " + r.sPageFirst + '">' + n.sFirst + '</a><a  tabindex="' + t.iTabIndex + '" class="' + r.sPageButton + " " + r.sPagePrevious + '">' + n.sPrevious + '</a><span></span><a tabindex="' + t.iTabIndex + '" class="' + r.sPageButton + " " + r.sPageNext + '">' + n.sNext + '</a><a tabindex="' + t.iTabIndex + '" class="' + r.sPageButton + " " + r.sPageLast + '">' + n.sLast + "</a>");
            var a = h("a", e), n = a[0], r = a[1], o = a[2], a = a[3];
            t.oApi._fnBindAction(n, {action: "first"}, s), t.oApi._fnBindAction(r, {action: "previous"}, s), t.oApi._fnBindAction(o, {action: "next"}, s), t.oApi._fnBindAction(a, {action: "last"}, s), t.aanFeatures.p || (e.id = t.sTableId + "_paginate", n.id = t.sTableId + "_first", r.id = t.sTableId + "_previous", o.id = t.sTableId + "_next", a.id = t.sTableId + "_last")
          }, fnUpdate: function (t, e) {
            if (t.aanFeatures.p) {
              var i, n, r = j.ext.oPagination.iFullNumbersShowPages, s = Math.floor(r / 2), a = Math.ceil(t.fnRecordsDisplay() / t._iDisplayLength), o = Math.ceil(t._iDisplayStart / t._iDisplayLength) + 1, l = "", u = t.oClasses, c = t.aanFeatures.p, d = function (n) {
                t.oApi._fnBindAction(this, {page: n + i - 1}, function (i) {
                  t.oApi._fnPageChange(t, i.data.page), e(t), i.preventDefault()
                })
              };
              for (-1 === t._iDisplayLength ? o = s = i = 1 : r > a ? (i = 1, s = a) : s >= o ? (i = 1, s = r) : o >= a - s ? (i = a - r + 1, s = a) : (i = o - Math.ceil(r / 2) + 1, s = i + r - 1), r = i; s >= r; r++)l += o !== r ? '<a tabindex="' + t.iTabIndex + '" class="' + u.sPageButton + '">' + t.fnFormatNumber(r) + "</a>" : '<a tabindex="' + t.iTabIndex + '" class="' + u.sPageButtonActive + '">' + t.fnFormatNumber(r) + "</a>";
              for (r = 0, s = c.length; s > r; r++)n = c[r], n.hasChildNodes() && (h("span:eq(0)", n).html(l).children("a").each(d), n = n.getElementsByTagName("a"), n = [n[0], n[1], n[n.length - 2], n[n.length - 1]], h(n).removeClass(u.sPageButton + " " + u.sPageButtonActive + " " + u.sPageButtonStaticDisabled), h([n[0], n[1]]).addClass(1 == o ? u.sPageButtonStaticDisabled : u.sPageButton), h([n[2], n[3]]).addClass(0 === a || o === a || -1 === t._iDisplayLength ? u.sPageButtonStaticDisabled : u.sPageButton))
            }
          }
        }
      }), h.extend(j.ext.oSort, {
        "string-pre": function (t) {
          return "string" != typeof t && (t = null !== t && t.toString ? t.toString() : ""), t.toLowerCase()
        }, "string-asc": function (t, e) {
          return e > t ? -1 : t > e ? 1 : 0
        }, "string-desc": function (t, e) {
          return e > t ? 1 : t > e ? -1 : 0
        }, "html-pre": function (t) {
          return t.replace(/<.*?>/g, "").toLowerCase()
        }, "html-asc": function (t, e) {
          return e > t ? -1 : t > e ? 1 : 0
        }, "html-desc": function (t, e) {
          return e > t ? 1 : t > e ? -1 : 0
        }, "date-pre": function (t) {
          return t = Date.parse(t), (isNaN(t) || "" === t) && (t = Date.parse("01/01/1970 00:00:00")), t
        }, "date-asc": function (t, e) {
          return t - e
        }, "date-desc": function (t, e) {
          return e - t
        }, "numeric-pre": function (t) {
          return "-" == t || "" === t ? 0 : 1 * t
        }, "numeric-asc": function (t, e) {
          return t - e
        }, "numeric-desc": function (t, e) {
          return e - t
        }
      }), h.extend(j.ext.aTypes, [function (t) {
        if ("number" == typeof t)return "numeric";
        if ("string" != typeof t)return null;
        var e, i = !1;
        if (e = t.charAt(0), -1 == "0123456789-".indexOf(e))return null;
        for (var n = 1; n < t.length; n++) {
          if (e = t.charAt(n), -1 == "0123456789.".indexOf(e))return null;
          if ("." == e) {
            if (i)return null;
            i = !0
          }
        }
        return "numeric"
      }, function (t) {
        var e = Date.parse(t);
        return null !== e && !isNaN(e) || "string" == typeof t && 0 === t.length ? "date" : null
      }, function (t) {
        return "string" == typeof t && -1 != t.indexOf("<") && -1 != t.indexOf(">") ? "html" : null
      }]), h.fn.DataTable = j, h.fn.dataTable = j, h.fn.dataTableSettings = j.settings, h.fn.dataTableExt = j.ext
    };
    "function" == typeof define && define.amd ? define(["jquery"], L) : jQuery && !jQuery.fn.dataTable && L(jQuery)
  }(window, document), !function () {
  var t, e, i, n, r, s = {}.hasOwnProperty, a = function (t, e) {
    function i() {
      this.constructor = t
    }

    for (var n in e)s.call(e, n) && (t[n] = e[n]);
    return i.prototype = e.prototype, t.prototype = new i, t.__super__ = e.prototype, t
  };
  n = function () {
    function t() {
      this.options_index = 0, this.parsed = []
    }

    return t.prototype.add_node = function (t) {
      return "OPTGROUP" === t.nodeName.toUpperCase() ? this.add_group(t) : this.add_option(t)
    }, t.prototype.add_group = function (t) {
      var e, i, n, r, s, a;
      for (e = this.parsed.length, this.parsed.push({
        array_index: e,
        group: !0,
        label: this.escapeExpression(t.label),
        children: 0,
        disabled: t.disabled
      }), s = t.childNodes, a = [], n = 0, r = s.length; r > n; n++)i = s[n], a.push(this.add_option(i, e, t.disabled));
      return a
    }, t.prototype.add_option = function (t, e, i) {
      return "OPTION" === t.nodeName.toUpperCase() ? ("" !== t.text ? (null != e && (this.parsed[e].children += 1), this.parsed.push({
        array_index: this.parsed.length,
        options_index: this.options_index,
        value: t.value,
        text: t.text,
        html: t.innerHTML,
        selected: t.selected,
        disabled: i === !0 ? i : t.disabled,
        group_array_index: e,
        classes: t.className,
        style: t.style.cssText
      })) : this.parsed.push({
        array_index: this.parsed.length,
        options_index: this.options_index,
        empty: !0
      }), this.options_index += 1) : void 0
    }, t.prototype.escapeExpression = function (t) {
      var e, i;
      return null == t || t === !1 ? "" : /[\&\<\>\"\'\`]/.test(t) ? (e = {
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#x27;",
        "`": "&#x60;"
      }, i = /&(?!\w+;)|[\<\>\"\'\`]/g, t.replace(i, function (t) {
        return e[t] || "&amp;"
      })) : t
    }, t
  }(), n.select_to_array = function (t) {
    var e, i, r, s, a;
    for (i = new n, a = t.childNodes, r = 0, s = a.length; s > r; r++)e = a[r], i.add_node(e);
    return i.parsed
  }, e = function () {
    function t(e, i) {
      this.form_field = e, this.options = null != i ? i : {}, t.browser_is_supported() && (this.is_multiple = this.form_field.multiple, this.set_default_text(), this.set_default_values(), this.setup(), this.set_up_html(), this.register_observers())
    }

    return t.prototype.set_default_values = function () {
      var t = this;
      return this.click_test_action = function (e) {
        return t.test_active_click(e)
      }, this.activate_action = function (e) {
        return t.activate_field(e)
      }, this.active_field = !1, this.mouse_on_container = !1, this.results_showing = !1, this.result_highlighted = null, this.result_single_selected = null, this.allow_single_deselect = null != this.options.allow_single_deselect && null != this.form_field.options[0] && "" === this.form_field.options[0].text ? this.options.allow_single_deselect : !1, this.disable_search_threshold = this.options.disable_search_threshold || 0, this.disable_search = this.options.disable_search || !1, this.enable_split_word_search = null != this.options.enable_split_word_search ? this.options.enable_split_word_search : !0, this.group_search = null != this.options.group_search ? this.options.group_search : !0, this.search_contains = this.options.search_contains || !1, this.single_backstroke_delete = null != this.options.single_backstroke_delete ? this.options.single_backstroke_delete : !0, this.max_selected_options = this.options.max_selected_options || 1 / 0, this.inherit_select_classes = this.options.inherit_select_classes || !1, this.display_selected_options = null != this.options.display_selected_options ? this.options.display_selected_options : !0, this.display_disabled_options = null != this.options.display_disabled_options ? this.options.display_disabled_options : !0
    }, t.prototype.set_default_text = function () {
      return this.default_text = this.form_field.getAttribute("data-placeholder") ? this.form_field.getAttribute("data-placeholder") : this.is_multiple ? this.options.placeholder_text_multiple || this.options.placeholder_text || t.default_multiple_text : this.options.placeholder_text_single || this.options.placeholder_text || t.default_single_text, this.results_none_found = this.form_field.getAttribute("data-no_results_text") || this.options.no_results_text || t.default_no_result_text
    }, t.prototype.mouse_enter = function () {
      return this.mouse_on_container = !0
    }, t.prototype.mouse_leave = function () {
      return this.mouse_on_container = !1
    }, t.prototype.input_focus = function () {
      var t = this;
      if (this.is_multiple) {
        if (!this.active_field)return setTimeout(function () {
          return t.container_mousedown()
        }, 50)
      } else if (!this.active_field)return this.activate_field()
    }, t.prototype.input_blur = function () {
      var t = this;
      return this.mouse_on_container ? void 0 : (this.active_field = !1, setTimeout(function () {
        return t.blur_test()
      }, 100))
    }, t.prototype.results_option_build = function (t) {
      var e, i, n, r, s;
      for (e = "", s = this.results_data, n = 0, r = s.length; r > n; n++)i = s[n], e += i.group ? this.result_add_group(i) : this.result_add_option(i), (null != t ? t.first : void 0) && (i.selected && this.is_multiple ? this.choice_build(i) : i.selected && !this.is_multiple && this.single_set_selected_text(i.text));
      return e
    }, t.prototype.result_add_option = function (t) {
      var e, i;
      return t.search_match ? this.include_option_in_results(t) ? (e = [], t.disabled || t.selected && this.is_multiple || e.push("active-result"), !t.disabled || t.selected && this.is_multiple || e.push("disabled-result"), t.selected && e.push("result-selected"), null != t.group_array_index && e.push("group-option"), "" !== t.classes && e.push(t.classes), i = "" !== t.style.cssText ? ' style="' + t.style + '"' : "", '<li class="' + e.join(" ") + '"' + i + ' data-option-array-index="' + t.array_index + '">' + t.search_text + "</li>") : "" : ""
    }, t.prototype.result_add_group = function (t) {
      return t.search_match || t.group_match ? t.active_options > 0 ? '<li class="group-result">' + t.search_text + "</li>" : "" : ""
    }, t.prototype.results_update_field = function () {
      return this.set_default_text(), this.is_multiple || this.results_reset_cleanup(), this.result_clear_highlight(), this.result_single_selected = null, this.results_build(), this.results_showing ? this.winnow_results() : void 0
    }, t.prototype.results_toggle = function () {
      return this.results_showing ? this.results_hide() : this.results_show()
    }, t.prototype.results_search = function () {
      return this.results_showing ? this.winnow_results() : this.results_show()
    }, t.prototype.winnow_results = function () {
      var t, e, i, n, r, s, a, o, l, h, u, c, d;
      for (this.no_results_clear(), r = 0, a = this.get_search_text(), t = a.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"), n = this.search_contains ? "" : "^", i = new RegExp(n + t, "i"), h = new RegExp(t, "i"), d = this.results_data, u = 0, c = d.length; c > u; u++)e = d[u], e.search_match = !1, s = null, this.include_option_in_results(e) && (e.group && (e.group_match = !1, e.active_options = 0), null != e.group_array_index && this.results_data[e.group_array_index] && (s = this.results_data[e.group_array_index], 0 === s.active_options && s.search_match && (r += 1), s.active_options += 1), (!e.group || this.group_search) && (e.search_text = e.group ? e.label : e.html, e.search_match = this.search_string_match(e.search_text, i), e.search_match && !e.group && (r += 1), e.search_match ? (a.length && (o = e.search_text.search(h), l = e.search_text.substr(0, o + a.length) + "</em>" + e.search_text.substr(o + a.length), e.search_text = l.substr(0, o) + "<em>" + l.substr(o)), null != s && (s.group_match = !0)) : null != e.group_array_index && this.results_data[e.group_array_index].search_match && (e.search_match = !0)));
      return this.result_clear_highlight(), 1 > r && a.length ? (this.update_results_content(""), this.no_results(a)) : (this.update_results_content(this.results_option_build()), this.winnow_results_set_highlight())
    }, t.prototype.search_string_match = function (t, e) {
      var i, n, r, s;
      if (e.test(t))return !0;
      if (this.enable_split_word_search && (t.indexOf(" ") >= 0 || 0 === t.indexOf("[")) && (n = t.replace(/\[|\]/g, "").split(" "), n.length))for (r = 0, s = n.length; s > r; r++)if (i = n[r], e.test(i))return !0
    }, t.prototype.choices_count = function () {
      var t, e, i, n;
      if (null != this.selected_option_count)return this.selected_option_count;
      for (this.selected_option_count = 0, n = this.form_field.options, e = 0, i = n.length; i > e; e++)t = n[e], t.selected && (this.selected_option_count += 1);
      return this.selected_option_count
    }, t.prototype.choices_click = function (t) {
      return t.preventDefault(), this.results_showing || this.is_disabled ? void 0 : this.results_show()
    }, t.prototype.keyup_checker = function (t) {
      var e, i;
      switch (e = null != (i = t.which) ? i : t.keyCode, this.search_field_scale(), e) {
        case 8:
          if (this.is_multiple && this.backstroke_length < 1 && this.choices_count() > 0)return this.keydown_backstroke();
          if (!this.pending_backstroke)return this.result_clear_highlight(), this.results_search();
          break;
        case 13:
          if (t.preventDefault(), this.results_showing)return this.result_select(t);
          break;
        case 27:
          return this.results_showing && this.results_hide(), !0;
        case 9:
        case 38:
        case 40:
        case 16:
        case 91:
        case 17:
          break;
        default:
          return this.results_search()
      }
    }, t.prototype.container_width = function () {
      return null != this.options.width ? this.options.width : "" + this.form_field.offsetWidth + "px"
    }, t.prototype.include_option_in_results = function (t) {
      return this.is_multiple && !this.display_selected_options && t.selected ? !1 : !this.display_disabled_options && t.disabled ? !1 : t.empty ? !1 : !0
    }, t.browser_is_supported = function () {
      return "Microsoft Internet Explorer" === window.navigator.appName ? document.documentMode >= 8 : /iP(od|hone)/i.test(window.navigator.userAgent) ? !1 : /Android/i.test(window.navigator.userAgent) && /Mobile/i.test(window.navigator.userAgent) ? !1 : !0
    }, t.default_multiple_text = "Select Some Options", t.default_single_text = "Select an Option", t.default_no_result_text = "No results match", t
  }(), t = jQuery, t.fn.extend({
    chosen: function (n) {
      return e.browser_is_supported() ? this.each(function () {
        var e, r;
        e = t(this), r = e.data("chosen"), "destroy" === n && r ? r.destroy() : r || e.data("chosen", new i(this, n))
      }) : this
    }
  }), i = function (e) {
    function i() {
      return r = i.__super__.constructor.apply(this, arguments)
    }

    return a(i, e), i.prototype.setup = function () {
      return this.form_field_jq = t(this.form_field), this.current_selectedIndex = this.form_field.selectedIndex, this.is_rtl = this.form_field_jq.hasClass("chosen-rtl")
    }, i.prototype.set_up_html = function () {
      var e, i;
      return e = ["chosen-container"], e.push("chosen-container-" + (this.is_multiple ? "multi" : "single")), this.inherit_select_classes && this.form_field.className && e.push(this.form_field.className), this.is_rtl && e.push("chosen-rtl"), i = {
        "class": e.join(" "),
        style: "width: " + this.container_width() + ";",
        title: this.form_field.title
      }, this.form_field.id.length && (i.id = this.form_field.id.replace(/[^\w]/g, "_") + "_chosen"), this.container = t("<div />", i), this.is_multiple ? this.container.html('<ul class="chosen-choices"><li class="search-field"><input type="text" value="' + this.default_text + '" class="default" autocomplete="off" style="width:25px;" /></li></ul><div class="chosen-drop"><ul class="chosen-results"></ul></div>') : this.container.html('<a class="chosen-single chosen-default" tabindex="-1"><span>' + this.default_text + '</span><div><b></b></div></a><div class="chosen-drop"><div class="chosen-search"><input type="text" autocomplete="off" /></div><ul class="chosen-results"></ul></div>'), this.form_field_jq.hide().after(this.container), this.dropdown = this.container.find("div.chosen-drop").first(), this.search_field = this.container.find("input").first(), this.search_results = this.container.find("ul.chosen-results").first(), this.search_field_scale(), this.search_no_results = this.container.find("li.no-results").first(), this.is_multiple ? (this.search_choices = this.container.find("ul.chosen-choices").first(), this.search_container = this.container.find("li.search-field").first()) : (this.search_container = this.container.find("div.chosen-search").first(), this.selected_item = this.container.find(".chosen-single").first()), this.results_build(), this.set_tab_index(), this.set_label_behavior(), this.form_field_jq.trigger("chosen:ready", {chosen: this})
    }, i.prototype.register_observers = function () {
      var t = this;
      return this.container.bind("mousedown.chosen", function (e) {
        t.container_mousedown(e)
      }), this.container.bind("mouseup.chosen", function (e) {
        t.container_mouseup(e)
      }), this.container.bind("mouseenter.chosen", function (e) {
        t.mouse_enter(e)
      }), this.container.bind("mouseleave.chosen", function (e) {
        t.mouse_leave(e)
      }), this.search_results.bind("mouseup.chosen", function (e) {
        t.search_results_mouseup(e)
      }), this.search_results.bind("mouseover.chosen", function (e) {
        t.search_results_mouseover(e)
      }), this.search_results.bind("mouseout.chosen", function (e) {
        t.search_results_mouseout(e)
      }), this.search_results.bind("mousewheel.chosen DOMMouseScroll.chosen", function (e) {
        t.search_results_mousewheel(e)
      }), this.form_field_jq.bind("chosen:updated.chosen", function (e) {
        t.results_update_field(e)
      }), this.form_field_jq.bind("chosen:activate.chosen", function (e) {
        t.activate_field(e)
      }), this.form_field_jq.bind("chosen:open.chosen", function (e) {
        t.container_mousedown(e)
      }), this.search_field.bind("blur.chosen", function (e) {
        t.input_blur(e)
      }), this.search_field.bind("keyup.chosen", function (e) {
        t.keyup_checker(e)
      }), this.search_field.bind("keydown.chosen", function (e) {
        t.keydown_checker(e)
      }), this.search_field.bind("focus.chosen", function (e) {
        t.input_focus(e)
      }), this.is_multiple ? this.search_choices.bind("click.chosen", function (e) {
        t.choices_click(e)
      }) : this.container.bind("click.chosen", function (t) {
        t.preventDefault()
      })
    }, i.prototype.destroy = function () {
      return t(document).unbind("click.chosen", this.click_test_action), this.search_field[0].tabIndex && (this.form_field_jq[0].tabIndex = this.search_field[0].tabIndex), this.container.remove(), this.form_field_jq.removeData("chosen"), this.form_field_jq.show()
    }, i.prototype.search_field_disabled = function () {
      return this.is_disabled = this.form_field_jq[0].disabled, this.is_disabled ? (this.container.addClass("chosen-disabled"), this.search_field[0].disabled = !0, this.is_multiple || this.selected_item.unbind("focus.chosen", this.activate_action), this.close_field()) : (this.container.removeClass("chosen-disabled"), this.search_field[0].disabled = !1, this.is_multiple ? void 0 : this.selected_item.bind("focus.chosen", this.activate_action))
    }, i.prototype.container_mousedown = function (e) {
      return this.is_disabled || (e && "mousedown" === e.type && !this.results_showing && e.preventDefault(), null != e && t(e.target).hasClass("search-choice-close")) ? void 0 : (this.active_field ? this.is_multiple || !e || t(e.target)[0] !== this.selected_item[0] && !t(e.target).parents("a.chosen-single").length || (e.preventDefault(), this.results_toggle()) : (this.is_multiple && this.search_field.val(""), t(document).bind("click.chosen", this.click_test_action), this.results_show()), this.activate_field())
    }, i.prototype.container_mouseup = function (t) {
      return "ABBR" !== t.target.nodeName || this.is_disabled ? void 0 : this.results_reset(t)
    }, i.prototype.search_results_mousewheel = function (t) {
      var e, i, n;
      return e = -(null != (i = t.originalEvent) ? i.wheelDelta : void 0) || (null != (n = t.originialEvent) ? n.detail : void 0), null != e ? (t.preventDefault(), "DOMMouseScroll" === t.type && (e = 40 * e), this.search_results.scrollTop(e + this.search_results.scrollTop())) : void 0
    }, i.prototype.blur_test = function () {
      return !this.active_field && this.container.hasClass("chosen-container-active") ? this.close_field() : void 0
    }, i.prototype.close_field = function () {
      return t(document).unbind("click.chosen", this.click_test_action), this.active_field = !1, this.results_hide(), this.container.removeClass("chosen-container-active"), this.clear_backstroke(), this.show_search_field_default(), this.search_field_scale()
    }, i.prototype.activate_field = function () {
      return this.container.addClass("chosen-container-active"), this.active_field = !0, this.search_field.val(this.search_field.val()), this.search_field.focus()
    }, i.prototype.test_active_click = function (e) {
      return this.container.is(t(e.target).closest(".chosen-container")) ? this.active_field = !0 : this.close_field()
    }, i.prototype.results_build = function () {
      return this.parsing = !0, this.selected_option_count = null, this.results_data = n.select_to_array(this.form_field), this.is_multiple ? this.search_choices.find("li.search-choice").remove() : this.is_multiple || (this.single_set_selected_text(), this.disable_search || this.form_field.options.length <= this.disable_search_threshold ? (this.search_field[0].readOnly = !0, this.container.addClass("chosen-container-single-nosearch")) : (this.search_field[0].readOnly = !1, this.container.removeClass("chosen-container-single-nosearch"))), this.update_results_content(this.results_option_build({first: !0})), this.search_field_disabled(), this.show_search_field_default(), this.search_field_scale(), this.parsing = !1
    }, i.prototype.result_do_highlight = function (t) {
      var e, i, n, r, s;
      if (t.length) {
        if (this.result_clear_highlight(), this.result_highlight = t, this.result_highlight.addClass("highlighted"), n = parseInt(this.search_results.css("maxHeight"), 10), s = this.search_results.scrollTop(), r = n + s, i = this.result_highlight.position().top + this.search_results.scrollTop(), e = i + this.result_highlight.outerHeight(), e >= r)return this.search_results.scrollTop(e - n > 0 ? e - n : 0);
        if (s > i)return this.search_results.scrollTop(i)
      }
    }, i.prototype.result_clear_highlight = function () {
      return this.result_highlight && this.result_highlight.removeClass("highlighted"), this.result_highlight = null
    }, i.prototype.results_show = function () {
      return this.is_multiple && this.max_selected_options <= this.choices_count() ? (this.form_field_jq.trigger("chosen:maxselected", {chosen: this}), !1) : (this.container.addClass("chosen-with-drop"), this.form_field_jq.trigger("chosen:showing_dropdown", {chosen: this}), this.results_showing = !0, this.search_field.focus(), this.search_field.val(this.search_field.val()), this.winnow_results())
    }, i.prototype.update_results_content = function (t) {
      return this.search_results.html(t)
    }, i.prototype.results_hide = function () {
      return this.results_showing && (this.result_clear_highlight(), this.container.removeClass("chosen-with-drop"), this.form_field_jq.trigger("chosen:hiding_dropdown", {chosen: this})), this.results_showing = !1
    }, i.prototype.set_tab_index = function () {
      var t;
      return this.form_field.tabIndex ? (t = this.form_field.tabIndex, this.form_field.tabIndex = -1, this.search_field[0].tabIndex = t) : void 0
    }, i.prototype.set_label_behavior = function () {
      var e = this;
      return this.form_field_label = this.form_field_jq.parents("label"), !this.form_field_label.length && this.form_field.id.length && (this.form_field_label = t("label[for='" + this.form_field.id + "']")), this.form_field_label.length > 0 ? this.form_field_label.bind("click.chosen", function (t) {
        return e.is_multiple ? e.container_mousedown(t) : e.activate_field()
      }) : void 0
    }, i.prototype.show_search_field_default = function () {
      return this.is_multiple && this.choices_count() < 1 && !this.active_field ? (this.search_field.val(this.default_text), this.search_field.addClass("default")) : (this.search_field.val(""), this.search_field.removeClass("default"))
    }, i.prototype.search_results_mouseup = function (e) {
      var i;
      return i = t(e.target).hasClass("active-result") ? t(e.target) : t(e.target).parents(".active-result").first(), i.length ? (this.result_highlight = i, this.result_select(e), this.search_field.focus()) : void 0
    }, i.prototype.search_results_mouseover = function (e) {
      var i;
      return i = t(e.target).hasClass("active-result") ? t(e.target) : t(e.target).parents(".active-result").first(), i ? this.result_do_highlight(i) : void 0
    }, i.prototype.search_results_mouseout = function (e) {
      return t(e.target).hasClass("active-result") ? this.result_clear_highlight() : void 0
    }, i.prototype.choice_build = function (e) {
      var i, n, r = this;
      return i = t("<li />", {"class": "search-choice"}).html("<span>" + e.html + "</span>"), e.disabled ? i.addClass("search-choice-disabled") : (n = t("<a />", {
        "class": "search-choice-close",
        "data-option-array-index": e.array_index
      }), n.bind("click.chosen", function (t) {
        return r.choice_destroy_link_click(t)
      }), i.append(n)), this.search_container.before(i)
    }, i.prototype.choice_destroy_link_click = function (e) {
      return e.preventDefault(), e.stopPropagation(), this.is_disabled ? void 0 : this.choice_destroy(t(e.target))
    }, i.prototype.choice_destroy = function (t) {
      return this.result_deselect(t[0].getAttribute("data-option-array-index")) ? (this.show_search_field_default(), this.is_multiple && this.choices_count() > 0 && this.search_field.val().length < 1 && this.results_hide(), t.parents("li").first().remove(), this.search_field_scale()) : void 0
    }, i.prototype.results_reset = function () {
      return this.form_field.options[0].selected = !0, this.selected_option_count = null, this.single_set_selected_text(), this.show_search_field_default(), this.results_reset_cleanup(), this.form_field_jq.trigger("change"), this.active_field ? this.results_hide() : void 0
    }, i.prototype.results_reset_cleanup = function () {
      return this.current_selectedIndex = this.form_field.selectedIndex, this.selected_item.find("abbr").remove()
    }, i.prototype.result_select = function (t) {
      var e, i, n;
      return this.result_highlight ? (e = this.result_highlight, this.result_clear_highlight(), this.is_multiple && this.max_selected_options <= this.choices_count() ? (this.form_field_jq.trigger("chosen:maxselected", {chosen: this}), !1) : (this.is_multiple ? e.removeClass("active-result") : (this.result_single_selected && (this.result_single_selected.removeClass("result-selected"), n = this.result_single_selected[0].getAttribute("data-option-array-index"), this.results_data[n].selected = !1), this.result_single_selected = e), e.addClass("result-selected"), i = this.results_data[e[0].getAttribute("data-option-array-index")], i.selected = !0, this.form_field.options[i.options_index].selected = !0, this.selected_option_count = null, this.is_multiple ? this.choice_build(i) : this.single_set_selected_text(i.text), (t.metaKey || t.ctrlKey) && this.is_multiple || this.results_hide(), this.search_field.val(""), (this.is_multiple || this.form_field.selectedIndex !== this.current_selectedIndex) && this.form_field_jq.trigger("change", {selected: this.form_field.options[i.options_index].value}), this.current_selectedIndex = this.form_field.selectedIndex, this.search_field_scale())) : void 0
    }, i.prototype.single_set_selected_text = function (t) {
      return null == t && (t = this.default_text), t === this.default_text ? this.selected_item.addClass("chosen-default") : (this.single_deselect_control_build(), this.selected_item.removeClass("chosen-default")), this.selected_item.find("span").text(t)
    }, i.prototype.result_deselect = function (t) {
      var e;
      return e = this.results_data[t], this.form_field.options[e.options_index].disabled ? !1 : (e.selected = !1, this.form_field.options[e.options_index].selected = !1, this.selected_option_count = null, this.result_clear_highlight(), this.results_showing && this.winnow_results(), this.form_field_jq.trigger("change", {deselected: this.form_field.options[e.options_index].value}), this.search_field_scale(), !0)
    }, i.prototype.single_deselect_control_build = function () {
      return this.allow_single_deselect ? (this.selected_item.find("abbr").length || this.selected_item.find("span").first().after('<abbr class="search-choice-close"></abbr>'), this.selected_item.addClass("chosen-single-with-deselect")) : void 0
    }, i.prototype.get_search_text = function () {
      return this.search_field.val() === this.default_text ? "" : t("<div/>").text(t.trim(this.search_field.val())).html()
    }, i.prototype.winnow_results_set_highlight = function () {
      var t, e;
      return e = this.is_multiple ? [] : this.search_results.find(".result-selected.active-result"), t = e.length ? e.first() : this.search_results.find(".active-result").first(), null != t ? this.result_do_highlight(t) : void 0
    }, i.prototype.no_results = function (e) {
      var i;
      return i = t('<li class="no-results">' + this.results_none_found + ' "<span></span>"</li>'), i.find("span").first().html(e), this.search_results.append(i)
    }, i.prototype.no_results_clear = function () {
      return this.search_results.find(".no-results").remove()
    }, i.prototype.keydown_arrow = function () {
      var t;
      return this.results_showing && this.result_highlight ? (t = this.result_highlight.nextAll("li.active-result").first()) ? this.result_do_highlight(t) : void 0 : this.results_show()
    }, i.prototype.keyup_arrow = function () {
      var t;
      return this.results_showing || this.is_multiple ? this.result_highlight ? (t = this.result_highlight.prevAll("li.active-result"), t.length ? this.result_do_highlight(t.first()) : (this.choices_count() > 0 && this.results_hide(), this.result_clear_highlight())) : void 0 : this.results_show()
    }, i.prototype.keydown_backstroke = function () {
      var t;
      return this.pending_backstroke ? (this.choice_destroy(this.pending_backstroke.find("a").first()), this.clear_backstroke()) : (t = this.search_container.siblings("li.search-choice").last(), t.length && !t.hasClass("search-choice-disabled") ? (this.pending_backstroke = t, this.single_backstroke_delete ? this.keydown_backstroke() : this.pending_backstroke.addClass("search-choice-focus")) : void 0)
    }, i.prototype.clear_backstroke = function () {
      return this.pending_backstroke && this.pending_backstroke.removeClass("search-choice-focus"), this.pending_backstroke = null
    }, i.prototype.keydown_checker = function (t) {
      var e, i;
      switch (e = null != (i = t.which) ? i : t.keyCode, this.search_field_scale(), 8 !== e && this.pending_backstroke && this.clear_backstroke(), e) {
        case 8:
          this.backstroke_length = this.search_field.val().length;
          break;
        case 9:
          this.results_showing && !this.is_multiple && this.result_select(t), this.mouse_on_container = !1;
          break;
        case 13:
          t.preventDefault();
          break;
        case 38:
          t.preventDefault(), this.keyup_arrow();
          break;
        case 40:
          t.preventDefault(), this.keydown_arrow()
      }
    }, i.prototype.search_field_scale = function () {
      var e, i, n, r, s, a, o, l, h;
      if (this.is_multiple) {
        for (n = 0, o = 0, s = "position:absolute; left: -1000px; top: -1000px; display:none;", a = ["font-size", "font-style", "font-weight", "font-family", "line-height", "text-transform", "letter-spacing"], l = 0, h = a.length; h > l; l++)r = a[l], s += r + ":" + this.search_field.css(r) + ";";
        return e = t("<div />", {style: s}), e.text(this.search_field.val()), t("body").append(e), o = e.width() + 25, e.remove(), i = this.container.outerWidth(), o > i - 10 && (o = i - 10), this.search_field.css({width: o + "px"})
      }
    }, i
  }(e)
}.call(this), $.extend(!0, $.fn.dataTable.defaults, {
  sDom: "<'row'<'col-sm-12'<'pull-right'f><'pull-left'l>r<'clearfix'>>>t<'row'<'col-sm-12'<'pull-left'i><'pull-right'p><'clearfix'>>>",
  sPaginationType: "bootstrap",
  oLanguage: {sLengthMenu: "Show _MENU_ Rows", sSearch: ""}
}), $.extend($.fn.dataTableExt.oStdClasses, {sWrapper: "dataTables_wrapper form-inline"}), $.fn.dataTableExt.oApi.fnPagingInfo = function (t) {
  return {
    iStart: t._iDisplayStart,
    iEnd: t.fnDisplayEnd(),
    iLength: t._iDisplayLength,
    iTotal: t.fnRecordsTotal(),
    iFilteredTotal: t.fnRecordsDisplay(),
    iPage: -1 === t._iDisplayLength ? 0 : Math.ceil(t._iDisplayStart / t._iDisplayLength),
    iTotalPages: -1 === t._iDisplayLength ? 0 : Math.ceil(t.fnRecordsDisplay() / t._iDisplayLength)
  }
}, $.extend($.fn.dataTableExt.oPagination, {
  bootstrap: {
    fnInit: function (t, e, i) {
      var n = t.oLanguage.oPaginate, r = function (e) {
        e.preventDefault(), t.oApi._fnPageChange(t, e.data.action) && i(t)
      };
      $(e).append('<ul class="pagination pagination-sm"><li class="prev disabled"><a href="#"><i class="icon-double-angle-left"></i> ' + n.sPrevious + "</a></li>" + '<li class="next disabled"><a href="#">' + n.sNext + ' <i class="icon-double-angle-right"></i></a></li>' + "</ul>");
      var s = $("a", e);
      $(s[0]).bind("click.DT", {action: "previous"}, r), $(s[1]).bind("click.DT", {action: "next"}, r)
    }, fnUpdate: function (t, e) {
      var i, n, r, s, a, o, l = 5, h = t.oInstance.fnPagingInfo(), u = t.aanFeatures.p, c = Math.floor(l / 2);
      for (h.iTotalPages < l ? (a = 1, o = h.iTotalPages) : h.iPage <= c ? (a = 1, o = l) : h.iPage >= h.iTotalPages - c ? (a = h.iTotalPages - l + 1, o = h.iTotalPages) : (a = h.iPage - c + 1, o = a + l - 1), i = 0, n = u.length; n > i; i++) {
        for ($("li:gt(0)", u[i]).filter(":not(:last)").remove(), r = a; o >= r; r++)s = r == h.iPage + 1 ? 'class="active"' : "", $("<li " + s + '><a href="#">' + r + "</a></li>").insertBefore($("li:last", u[i])[0]).bind("click", function (i) {
          i.preventDefault(), t._iDisplayStart = (parseInt($("a", this).text(), 10) - 1) * h.iLength, e(t)
        });
        0 === h.iPage ? $("li:first", u[i]).addClass("disabled") : $("li:first", u[i]).removeClass("disabled"), h.iPage === h.iTotalPages - 1 || 0 === h.iTotalPages ? $("li:last", u[i]).addClass("disabled") : $("li:last", u[i]).removeClass("disabled")
      }
    }
  }
}), $.fn.DataTable.TableTools && ($.extend(!0, $.fn.DataTable.TableTools.classes, {
  container: "DTTT btn-group",
  buttons: {normal: "btn", disabled: "disabled"},
  collection: {container: "DTTT_dropdown dropdown-menu", buttons: {normal: "", disabled: "disabled"}},
  print: {info: "DTTT_print_info modal"},
  select: {row: "active"}
}), $.extend(!0, $.fn.DataTable.TableTools.DEFAULTS.oTags, {collection: {container: "ul", button: "li", liner: "a"}})),// │ Copyright © 2008-2012 Dmitry Baranovskiy (http://raphaeljs.com)    │ \\
// │ Copyright © 2008-2012 Sencha Labs (http://sencha.com)              │ \\
  function (t) {
    var e, i, n = "0.3.4", r = "hasOwnProperty", s = /[\.\/]/, a = "*", o = function () {
    }, l = function (t, e) {
      return t - e
    }, h = {n: {}}, u = function (t, n) {
      var r, s = i, a = Array.prototype.slice.call(arguments, 2), o = u.listeners(t), h = 0, c = [], d = {}, f = [], p = e;
      e = t, i = 0;
      for (var g = 0, v = o.length; v > g; g++)"zIndex"in o[g] && (c.push(o[g].zIndex), o[g].zIndex < 0 && (d[o[g].zIndex] = o[g]));
      for (c.sort(l); c[h] < 0;)if (r = d[c[h++]], f.push(r.apply(n, a)), i)return i = s, f;
      for (g = 0; v > g; g++)if (r = o[g], "zIndex"in r)if (r.zIndex == c[h]) {
        if (f.push(r.apply(n, a)), i)break;
        do if (h++, r = d[c[h]], r && f.push(r.apply(n, a)), i)break; while (r)
      } else d[r.zIndex] = r; else if (f.push(r.apply(n, a)), i)break;
      return i = s, e = p, f.length ? f : null
    };
    u.listeners = function (t) {
      var e, i, n, r, o, l, u, c, d = t.split(s), f = h, p = [f], g = [];
      for (r = 0, o = d.length; o > r; r++) {
        for (c = [], l = 0, u = p.length; u > l; l++)for (f = p[l].n, i = [f[d[r]], f[a]], n = 2; n--;)e = i[n], e && (c.push(e), g = g.concat(e.f || []));
        p = c
      }
      return g
    }, u.on = function (t, e) {
      for (var i = t.split(s), n = h, r = 0, a = i.length; a > r; r++)n = n.n, !n[i[r]] && (n[i[r]] = {n: {}}), n = n[i[r]];
      for (n.f = n.f || [], r = 0, a = n.f.length; a > r; r++)if (n.f[r] == e)return o;
      return n.f.push(e), function (t) {
        +t == +t && (e.zIndex = +t)
      }
    }, u.stop = function () {
      i = 1
    }, u.nt = function (t) {
      return t ? new RegExp("(?:\\.|\\/|^)" + t + "(?:\\.|\\/|$)").test(e) : e
    }, u.off = u.unbind = function (t, e) {
      var i, n, o, l, u, c, d, f = t.split(s), p = [h];
      for (l = 0, u = f.length; u > l; l++)for (c = 0; c < p.length; c += o.length - 2) {
        if (o = [c, 1], i = p[c].n, f[l] != a)i[f[l]] && o.push(i[f[l]]); else for (n in i)i[r](n) && o.push(i[n]);
        p.splice.apply(p, o)
      }
      for (l = 0, u = p.length; u > l; l++)for (i = p[l]; i.n;) {
        if (e) {
          if (i.f) {
            for (c = 0, d = i.f.length; d > c; c++)if (i.f[c] == e) {
              i.f.splice(c, 1);
              break
            }
            !i.f.length && delete i.f
          }
          for (n in i.n)if (i.n[r](n) && i.n[n].f) {
            var g = i.n[n].f;
            for (c = 0, d = g.length; d > c; c++)if (g[c] == e) {
              g.splice(c, 1);
              break
            }
            !g.length && delete i.n[n].f
          }
        } else {
          delete i.f;
          for (n in i.n)i.n[r](n) && i.n[n].f && delete i.n[n].f
        }
        i = i.n
      }
    }, u.once = function (t, e) {
      var i = function () {
        var n = e.apply(this, arguments);
        return u.unbind(t, i), n
      };
      return u.on(t, i)
    }, u.version = n, u.toString = function () {
      return "You are running Eve " + n
    }, "undefined" != typeof module && module.exports ? module.exports = u : "undefined" != typeof define ? define("eve", [], function () {
      return u
    }) : t.eve = u
  }(this), function () {
  function t(t) {
    for (var e = 0; e < si.length; e++)si[e].el.paper == t && si.splice(e--, 1)
  }

  function e(t, e, i, r, a, o) {
    i = Q(i);
    var l, h, u, c, d, f, p = t.ms, g = {}, v = {}, y = {};
    if (r)for (_ = 0, w = si.length; w > _; _++) {
      var b = si[_];
      if (b.el.id == e.id && b.anim == t) {
        b.percent != i ? (si.splice(_, 1), u = 1) : h = b, e.attr(b.totalOrigin);
        break
      }
    } else r = +v;
    for (var _ = 0, w = t.percents.length; w > _; _++) {
      if (t.percents[_] == i || t.percents[_] > r * t.top) {
        i = t.percents[_], d = t.percents[_ - 1] || 0, p = p / t.top * (i - d), c = t.percents[_ + 1], l = t.anim[i];
        break
      }
      r && e.attr(t.anim[t.percents[_]])
    }
    if (l) {
      if (h)h.initstatus = r, h.start = new Date - h.ms * r; else {
        for (var S in l)if (l[C](S) && (ee[C](S) || e.paper.customAttributes[C](S)))switch (g[S] = e.attr(S), null == g[S] && (g[S] = te[S]), v[S] = l[S], ee[S]) {
          case q:
            y[S] = (v[S] - g[S]) / p;
            break;
          case"colour":
            g[S] = m.getRGB(g[S]);
            var D = m.getRGB(v[S]);
            y[S] = {r: (D.r - g[S].r) / p, g: (D.g - g[S].g) / p, b: (D.b - g[S].b) / p};
            break;
          case"path":
            var T = Le(g[S], v[S]), k = T[1];
            for (g[S] = T[0], y[S] = [], _ = 0, w = g[S].length; w > _; _++) {
              y[S][_] = [0];
              for (var I = 1, F = g[S][_].length; F > I; I++)y[S][_][I] = (k[_][I] - g[S][_][I]) / p
            }
            break;
          case"transform":
            var A = e._, L = je(A[S], v[S]);
            if (L)for (g[S] = L.from, v[S] = L.to, y[S] = [], y[S].real = !0, _ = 0, w = g[S].length; w > _; _++)for (y[S][_] = [g[S][_][0]], I = 1, F = g[S][_].length; F > I; I++)y[S][_][I] = (v[S][_][I] - g[S][_][I]) / p; else {
              var E = e.matrix || new s, H = {
                _: {transform: A.transform}, getBBox: function () {
                  return e.getBBox(1)
                }
              };
              g[S] = [E.a, E.b, E.c, E.d, E.e, E.f], Ne(H, v[S]), v[S] = H._.transform, y[S] = [(H.matrix.a - E.a) / p, (H.matrix.b - E.b) / p, (H.matrix.c - E.c) / p, (H.matrix.d - E.d) / p, (H.matrix.e - E.e) / p, (H.matrix.f - E.f) / p]
            }
            break;
          case"csv":
            var N = R(l[S])[P](x), B = R(g[S])[P](x);
            if ("clip-rect" == S)for (g[S] = B, y[S] = [], _ = B.length; _--;)y[S][_] = (N[_] - g[S][_]) / p;
            v[S] = N;
            break;
          default:
            for (N = [][M](l[S]), B = [][M](g[S]), y[S] = [], _ = e.paper.customAttributes[S].length; _--;)y[S][_] = ((N[_] || 0) - (B[_] || 0)) / p
        }
        var j = l.easing, W = m.easing_formulas[j];
        if (!W)if (W = R(j).match(G), W && 5 == W.length) {
          var O = W;
          W = function (t) {
            return n(t, +O[1], +O[2], +O[3], +O[4], p)
          }
        } else W = ce;
        if (f = l.start || t.start || +new Date, b = {
            anim: t,
            percent: i,
            timestamp: f,
            start: f + (t.del || 0),
            status: 0,
            initstatus: r || 0,
            stop: !1,
            ms: p,
            easing: W,
            from: g,
            diff: y,
            to: v,
            el: e,
            callback: l.callback,
            prev: d,
            next: c,
            repeat: o || t.times,
            origin: e.attr(),
            totalOrigin: a
          }, si.push(b), r && !h && !u && (b.stop = !0, b.start = new Date - p * r, 1 == si.length))return oi();
        u && (b.start = new Date - b.ms * r), 1 == si.length && ai(oi)
      }
      eve("raphael.anim.start." + e.id, e, t)
    }
  }

  function i(t, e) {
    var i = [], n = {};
    if (this.ms = e, this.times = 1, t) {
      for (var r in t)t[C](r) && (n[Q(r)] = t[r], i.push(Q(r)));
      i.sort(he)
    }
    this.anim = n, this.top = i[i.length - 1], this.percents = i
  }

  function n(t, e, i, n, r, s) {
    function a(t, e) {
      var i, n, r, s, a, o;
      for (r = t, o = 0; 8 > o; o++) {
        if (s = l(r) - t, W(s) < e)return r;
        if (a = (3 * c * r + 2 * u) * r + h, W(a) < 1e-6)break;
        r -= s / a
      }
      if (i = 0, n = 1, r = t, i > r)return i;
      if (r > n)return n;
      for (; n > i;) {
        if (s = l(r), W(s - t) < e)return r;
        t > s ? i = r : n = r, r = (n - i) / 2 + i
      }
      return r
    }

    function o(t, e) {
      var i = a(t, e);
      return ((p * i + f) * i + d) * i
    }

    function l(t) {
      return ((c * t + u) * t + h) * t
    }

    var h = 3 * e, u = 3 * (n - e) - h, c = 1 - h - u, d = 3 * i, f = 3 * (r - i) - d, p = 1 - d - f;
    return o(t, 1 / (200 * s))
  }

  function r() {
    return this.x + A + this.y + A + this.width + " × " + this.height
  }

  function s(t, e, i, n, r, s) {
    null != t ? (this.a = +t, this.b = +e, this.c = +i, this.d = +n, this.e = +r, this.f = +s) : (this.a = 1, this.b = 0, this.c = 0, this.d = 1, this.e = 0, this.f = 0)
  }

  function a(t, e, i) {
    t = m._path2curve(t), e = m._path2curve(e);
    for (var n, r, s, a, l, h, u, c, d, f, p = i ? 0 : [], g = 0, v = t.length; v > g; g++) {
      var y = t[g];
      if ("M" == y[0])n = l = y[1], r = h = y[2]; else {
        "C" == y[0] ? (d = [n, r].concat(y.slice(1)), n = d[6], r = d[7]) : (d = [n, r, n, r, l, h, l, h], n = l, r = h);
        for (var b = 0, x = e.length; x > b; b++) {
          var _ = e[b];
          if ("M" == _[0])s = u = _[1], a = c = _[2]; else {
            "C" == _[0] ? (f = [s, a].concat(_.slice(1)), s = f[6], a = f[7]) : (f = [s, a, s, a, u, c, u, c], s = u, a = c);
            var w = o(d, f, i);
            if (i)p += w; else {
              for (var C = 0, S = w.length; S > C; C++)w[C].segment1 = g, w[C].segment2 = b, w[C].bez1 = d, w[C].bez2 = f;
              p = p.concat(w)
            }
          }
        }
      }
    }
    return p
  }

  function o(t, e, i) {
    var n = m.bezierBBox(t), r = m.bezierBBox(e);
    if (!m.isBBoxIntersect(n, r))return i ? 0 : [];
    for (var s = u.apply(0, t), a = u.apply(0, e), o = ~~(s / 5), h = ~~(a / 5), c = [], d = [], f = {}, p = i ? 0 : [], g = 0; o + 1 > g; g++) {
      var v = m.findDotsAtSegment.apply(m, t.concat(g / o));
      c.push({x: v.x, y: v.y, t: g / o})
    }
    for (g = 0; h + 1 > g; g++)v = m.findDotsAtSegment.apply(m, e.concat(g / h)), d.push({x: v.x, y: v.y, t: g / h});
    for (g = 0; o > g; g++)for (var y = 0; h > y; y++) {
      var b = c[g], x = c[g + 1], _ = d[y], w = d[y + 1], C = W(x.x - b.x) < .001 ? "y" : "x", S = W(w.x - _.x) < .001 ? "y" : "x", D = l(b.x, b.y, x.x, x.y, _.x, _.y, w.x, w.y);
      if (D) {
        if (f[D.x.toFixed(4)] == D.y.toFixed(4))continue;
        f[D.x.toFixed(4)] = D.y.toFixed(4);
        var T = b.t + W((D[C] - b[C]) / (x[C] - b[C])) * (x.t - b.t), k = _.t + W((D[S] - _[S]) / (w[S] - _[S])) * (w.t - _.t);
        T >= 0 && 1 >= T && k >= 0 && 1 >= k && (i ? p++ : p.push({x: D.x, y: D.y, t1: T, t2: k}))
      }
    }
    return p
  }

  function l(t, e, i, n, r, s, a, o) {
    if (!(B(t, i) < j(r, a) || j(t, i) > B(r, a) || B(e, n) < j(s, o) || j(e, n) > B(s, o))) {
      var l = (t * n - e * i) * (r - a) - (t - i) * (r * o - s * a), h = (t * n - e * i) * (s - o) - (e - n) * (r * o - s * a), u = (t - i) * (s - o) - (e - n) * (r - a);
      if (!u)return;
      var c = l / u, d = h / u, f = +c.toFixed(2), p = +d.toFixed(2);
      if (f < +j(t, i).toFixed(2) || f > +B(t, i).toFixed(2) || f < +j(r, a).toFixed(2) || f > +B(r, a).toFixed(2) || p < +j(e, n).toFixed(2) || p > +B(e, n).toFixed(2) || p < +j(s, o).toFixed(2) || p > +B(s, o).toFixed(2))return;
      return {x: c, y: d}
    }
  }

  function h(t, e, i, n, r, s, a, o, l) {
    if (!(0 > l || u(t, e, i, n, r, s, a, o) < l)) {
      var h, c = 1, d = c / 2, f = c - d, p = .01;
      for (h = u(t, e, i, n, r, s, a, o, f); W(h - l) > p;)d /= 2, f += (l > h ? 1 : -1) * d, h = u(t, e, i, n, r, s, a, o, f);
      return f
    }
  }

  function u(t, e, i, n, r, s, a, o, l) {
    null == l && (l = 1), l = l > 1 ? 1 : 0 > l ? 0 : l;
    for (var h = l / 2, u = 12, d = [-.1252, .1252, -.3678, .3678, -.5873, .5873, -.7699, .7699, -.9041, .9041, -.9816, .9816], f = [.2491, .2491, .2335, .2335, .2032, .2032, .1601, .1601, .1069, .1069, .0472, .0472], p = 0, g = 0; u > g; g++) {
      var v = h * d[g] + h, m = c(v, t, i, r, a), y = c(v, e, n, s, o), b = m * m + y * y;
      p += f[g] * N.sqrt(b)
    }
    return h * p
  }

  function c(t, e, i, n, r) {
    var s = -3 * e + 9 * i - 9 * n + 3 * r, a = t * s + 6 * e - 12 * i + 6 * n;
    return t * a - 3 * e + 3 * i
  }

  function d(t, e) {
    for (var i = [], n = 0, r = t.length; r - 2 * !e > n; n += 2) {
      var s = [{x: +t[n - 2], y: +t[n - 1]}, {x: +t[n], y: +t[n + 1]}, {x: +t[n + 2], y: +t[n + 3]}, {
        x: +t[n + 4],
        y: +t[n + 5]
      }];
      e ? n ? r - 4 == n ? s[3] = {x: +t[0], y: +t[1]} : r - 2 == n && (s[2] = {x: +t[0], y: +t[1]}, s[3] = {
        x: +t[2],
        y: +t[3]
      }) : s[0] = {x: +t[r - 2], y: +t[r - 1]} : r - 4 == n ? s[3] = s[2] : n || (s[0] = {
        x: +t[n],
        y: +t[n + 1]
      }), i.push(["C", (-s[0].x + 6 * s[1].x + s[2].x) / 6, (-s[0].y + 6 * s[1].y + s[2].y) / 6, (s[1].x + 6 * s[2].x - s[3].x) / 6, (s[1].y + 6 * s[2].y - s[3].y) / 6, s[2].x, s[2].y])
    }
    return i
  }

  function f() {
    return this.hex
  }

  function p(t, e, i) {
    function n() {
      var r = Array.prototype.slice.call(arguments, 0), s = r.join("␀"), a = n.cache = n.cache || {}, o = n.count = n.count || [];
      return a[C](s) ? (g(o, s), i ? i(a[s]) : a[s]) : (o.length >= 1e3 && delete a[o.shift()], o.push(s), a[s] = t[k](e, r), i ? i(a[s]) : a[s])
    }

    return n
  }

  function g(t, e) {
    for (var i = 0, n = t.length; n > i; i++)if (t[i] === e)return t.push(t.splice(i, 1)[0])
  }

  function v(t) {
    if (Object(t) !== t)return t;
    var e = new t.constructor;
    for (var i in t)t[C](i) && (e[i] = v(t[i]));
    return e
  }

  function m(t) {
    if (m.is(t, "function"))return y ? t() : eve.on("raphael.DOMload", t);
    if (m.is(t, U))return m._engine.create[k](m, t.splice(0, 3 + m.is(t[0], q))).add(t);
    var e = Array.prototype.slice.call(arguments, 0);
    if (m.is(e[e.length - 1], "function")) {
      var i = e.pop();
      return y ? i.call(m._engine.create[k](m, e)) : eve.on("raphael.DOMload", function () {
        i.call(m._engine.create[k](m, e))
      })
    }
    return m._engine.create[k](m, arguments)
  }

  m.version = "2.1.0", m.eve = eve;
  var y, b, x = /[, ]+/, _ = {
    circle: 1,
    rect: 1,
    path: 1,
    ellipse: 1,
    text: 1,
    image: 1
  }, w = /\{(\d+)\}/g, C = "hasOwnProperty", S = {
    doc: document,
    win: window
  }, D = {was: Object.prototype[C].call(S.win, "Raphael"), is: S.win.Raphael}, T = function () {
    this.ca = this.customAttributes = {}
  }, k = "apply", M = "concat", I = "createTouch"in S.doc, F = "", A = " ", R = String, P = "split", L = "click dblclick mousedown mousemove mouseout mouseover mouseup touchstart touchmove touchend touchcancel"[P](A), E = {
    mousedown: "touchstart",
    mousemove: "touchmove",
    mouseup: "touchend"
  }, H = R.prototype.toLowerCase, N = Math, B = N.max, j = N.min, W = N.abs, O = N.pow, $ = N.PI, q = "number", z = "string", U = "array", X = Object.prototype.toString, V = (m._ISURL = /^url\(['"]?([^\)]+?)['"]?\)$/i, /^\s*((#[a-f\d]{6})|(#[a-f\d]{3})|rgba?\(\s*([\d\.]+%?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+%?(?:\s*,\s*[\d\.]+%?)?)\s*\)|hsba?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?)%?\s*\)|hsla?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?)%?\s*\))\s*$/i), Y = {
    NaN: 1,
    Infinity: 1,
    "-Infinity": 1
  }, G = /^(?:cubic-)?bezier\(([^,]+),([^,]+),([^,]+),([^\)]+)\)/, J = N.round, Q = parseFloat, Z = parseInt, K = R.prototype.toUpperCase, te = m._availableAttrs = {
    "arrow-end": "none",
    "arrow-start": "none",
    blur: 0,
    "clip-rect": "0 0 1e9 1e9",
    cursor: "default",
    cx: 0,
    cy: 0,
    fill: "#fff",
    "fill-opacity": 1,
    font: '10px "Arial"',
    "font-family": '"Arial"',
    "font-size": "10",
    "font-style": "normal",
    "font-weight": 400,
    gradient: 0,
    height: 0,
    href: "http://raphaeljs.com/",
    "letter-spacing": 0,
    opacity: 1,
    path: "M0,0",
    r: 0,
    rx: 0,
    ry: 0,
    src: "",
    stroke: "#000",
    "stroke-dasharray": "",
    "stroke-linecap": "butt",
    "stroke-linejoin": "butt",
    "stroke-miterlimit": 0,
    "stroke-opacity": 1,
    "stroke-width": 1,
    target: "_blank",
    "text-anchor": "middle",
    title: "Raphael",
    transform: "",
    width: 0,
    x: 0,
    y: 0
  }, ee = m._availableAnimAttrs = {
    blur: q,
    "clip-rect": "csv",
    cx: q,
    cy: q,
    fill: "colour",
    "fill-opacity": q,
    "font-size": q,
    height: q,
    opacity: q,
    path: "path",
    r: q,
    rx: q,
    ry: q,
    stroke: "colour",
    "stroke-opacity": q,
    "stroke-width": q,
    transform: "transform",
    width: q,
    x: q,
    y: q
  }, ie = /[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*/, ne = {
    hs: 1,
    rg: 1
  }, re = /,?([achlmqrstvxz]),?/gi, se = /([achlmrqstvz])[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029,]*((-?\d*\.?\d*(?:e[\-+]?\d+)?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*)+)/gi, ae = /([rstm])[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029,]*((-?\d*\.?\d*(?:e[\-+]?\d+)?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*)+)/gi, oe = /(-?\d*\.?\d*(?:e[\-+]?\d+)?)[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*/gi, le = (m._radial_gradient = /^r(?:\(([^,]+?)[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*([^\)]+?)\))?/, {}), he = function (t, e) {
    return Q(t) - Q(e)
  }, ue = function () {
  }, ce = function (t) {
    return t
  }, de = m._rectPath = function (t, e, i, n, r) {
    return r ? [["M", t + r, e], ["l", i - 2 * r, 0], ["a", r, r, 0, 0, 1, r, r], ["l", 0, n - 2 * r], ["a", r, r, 0, 0, 1, -r, r], ["l", 2 * r - i, 0], ["a", r, r, 0, 0, 1, -r, -r], ["l", 0, 2 * r - n], ["a", r, r, 0, 0, 1, r, -r], ["z"]] : [["M", t, e], ["l", i, 0], ["l", 0, n], ["l", -i, 0], ["z"]]
  }, fe = function (t, e, i, n) {
    return null == n && (n = i), [["M", t, e], ["m", 0, -n], ["a", i, n, 0, 1, 1, 0, 2 * n], ["a", i, n, 0, 1, 1, 0, -2 * n], ["z"]]
  }, pe = m._getPath = {
    path: function (t) {
      return t.attr("path")
    }, circle: function (t) {
      var e = t.attrs;
      return fe(e.cx, e.cy, e.r)
    }, ellipse: function (t) {
      var e = t.attrs;
      return fe(e.cx, e.cy, e.rx, e.ry)
    }, rect: function (t) {
      var e = t.attrs;
      return de(e.x, e.y, e.width, e.height, e.r)
    }, image: function (t) {
      var e = t.attrs;
      return de(e.x, e.y, e.width, e.height)
    }, text: function (t) {
      var e = t._getBBox();
      return de(e.x, e.y, e.width, e.height)
    }
  }, ge = m.mapPath = function (t, e) {
    if (!e)return t;
    var i, n, r, s, a, o, l;
    for (t = Le(t), r = 0, a = t.length; a > r; r++)for (l = t[r], s = 1, o = l.length; o > s; s += 2)i = e.x(l[s], l[s + 1]), n = e.y(l[s], l[s + 1]), l[s] = i, l[s + 1] = n;
    return t
  };
  if (m._g = S, m.type = S.win.SVGAngle || S.doc.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1") ? "SVG" : "VML", "VML" == m.type) {
    var ve, me = S.doc.createElement("div");
    if (me.innerHTML = '<v:shape adj="1"/>', ve = me.firstChild, ve.style.behavior = "url(#default#VML)", !ve || "object" != typeof ve.adj)return m.type = F;
    me = null
  }
  m.svg = !(m.vml = "VML" == m.type), m._Paper = T, m.fn = b = T.prototype = m.prototype, m._id = 0, m._oid = 0, m.is = function (t, e) {
    return e = H.call(e), "finite" == e ? !Y[C](+t) : "array" == e ? t instanceof Array : "null" == e && null === t || e == typeof t && null !== t || "object" == e && t === Object(t) || "array" == e && Array.isArray && Array.isArray(t) || X.call(t).slice(8, -1).toLowerCase() == e
  }, m.angle = function (t, e, i, n, r, s) {
    if (null == r) {
      var a = t - i, o = e - n;
      return a || o ? (180 + 180 * N.atan2(-o, -a) / $ + 360) % 360 : 0
    }
    return m.angle(t, e, r, s) - m.angle(i, n, r, s)
  }, m.rad = function (t) {
    return t % 360 * $ / 180
  }, m.deg = function (t) {
    return 180 * t / $ % 360
  }, m.snapTo = function (t, e, i) {
    if (i = m.is(i, "finite") ? i : 10, m.is(t, U)) {
      for (var n = t.length; n--;)if (W(t[n] - e) <= i)return t[n]
    } else {
      t = +t;
      var r = e % t;
      if (i > r)return e - r;
      if (r > t - i)return e - r + t
    }
    return e
  }, m.createUUID = function (t, e) {
    return function () {
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(t, e).toUpperCase()
    }
  }(/[xy]/g, function (t) {
    var e = 0 | 16 * N.random(), i = "x" == t ? e : 8 | 3 & e;
    return i.toString(16)
  }), m.setWindow = function (t) {
    eve("raphael.setWindow", m, S.win, t), S.win = t, S.doc = S.win.document, m._engine.initWin && m._engine.initWin(S.win)
  };
  var ye = function (t) {
    if (m.vml) {
      var e, i = /^\s+|\s+$/g;
      try {
        var n = new ActiveXObject("htmlfile");
        n.write("<body>"), n.close(), e = n.body
      } catch (r) {
        e = createPopup().document.body
      }
      var s = e.createTextRange();
      ye = p(function (t) {
        try {
          e.style.color = R(t).replace(i, F);
          var n = s.queryCommandValue("ForeColor");
          return n = (255 & n) << 16 | 65280 & n | (16711680 & n) >>> 16, "#" + ("000000" + n.toString(16)).slice(-6)
        } catch (r) {
          return "none"
        }
      })
    } else {
      var a = S.doc.createElement("i");
      a.title = "Raphaël Colour Picker", a.style.display = "none", S.doc.body.appendChild(a), ye = p(function (t) {
        return a.style.color = t, S.doc.defaultView.getComputedStyle(a, F).getPropertyValue("color")
      })
    }
    return ye(t)
  }, be = function () {
    return "hsb(" + [this.h, this.s, this.b] + ")"
  }, xe = function () {
    return "hsl(" + [this.h, this.s, this.l] + ")"
  }, _e = function () {
    return this.hex
  }, we = function (t, e, i) {
    if (null == e && m.is(t, "object") && "r"in t && "g"in t && "b"in t && (i = t.b, e = t.g, t = t.r), null == e && m.is(t, z)) {
      var n = m.getRGB(t);
      t = n.r, e = n.g, i = n.b
    }
    return (t > 1 || e > 1 || i > 1) && (t /= 255, e /= 255, i /= 255), [t, e, i]
  }, Ce = function (t, e, i, n) {
    t *= 255, e *= 255, i *= 255;
    var r = {r: t, g: e, b: i, hex: m.rgb(t, e, i), toString: _e};
    return m.is(n, "finite") && (r.opacity = n), r
  };
  m.color = function (t) {
    var e;
    return m.is(t, "object") && "h"in t && "s"in t && "b"in t ? (e = m.hsb2rgb(t), t.r = e.r, t.g = e.g, t.b = e.b, t.hex = e.hex) : m.is(t, "object") && "h"in t && "s"in t && "l"in t ? (e = m.hsl2rgb(t), t.r = e.r, t.g = e.g, t.b = e.b, t.hex = e.hex) : (m.is(t, "string") && (t = m.getRGB(t)), m.is(t, "object") && "r"in t && "g"in t && "b"in t ? (e = m.rgb2hsl(t), t.h = e.h, t.s = e.s, t.l = e.l, e = m.rgb2hsb(t), t.v = e.b) : (t = {hex: "none"}, t.r = t.g = t.b = t.h = t.s = t.v = t.l = -1)), t.toString = _e, t
  }, m.hsb2rgb = function (t, e, i, n) {
    this.is(t, "object") && "h"in t && "s"in t && "b"in t && (i = t.b, e = t.s, t = t.h, n = t.o), t *= 360;
    var r, s, a, o, l;
    return t = t % 360 / 60, l = i * e, o = l * (1 - W(t % 2 - 1)), r = s = a = i - l, t = ~~t, r += [l, o, 0, 0, o, l][t], s += [o, l, l, o, 0, 0][t], a += [0, 0, o, l, l, o][t], Ce(r, s, a, n)
  }, m.hsl2rgb = function (t, e, i, n) {
    this.is(t, "object") && "h"in t && "s"in t && "l"in t && (i = t.l, e = t.s, t = t.h), (t > 1 || e > 1 || i > 1) && (t /= 360, e /= 100, i /= 100), t *= 360;
    var r, s, a, o, l;
    return t = t % 360 / 60, l = 2 * e * (.5 > i ? i : 1 - i), o = l * (1 - W(t % 2 - 1)), r = s = a = i - l / 2, t = ~~t, r += [l, o, 0, 0, o, l][t], s += [o, l, l, o, 0, 0][t], a += [0, 0, o, l, l, o][t], Ce(r, s, a, n)
  }, m.rgb2hsb = function (t, e, i) {
    i = we(t, e, i), t = i[0], e = i[1], i = i[2];
    var n, r, s, a;
    return s = B(t, e, i), a = s - j(t, e, i), n = 0 == a ? null : s == t ? (e - i) / a : s == e ? (i - t) / a + 2 : (t - e) / a + 4, n = 60 * ((n + 360) % 6) / 360, r = 0 == a ? 0 : a / s, {
      h: n,
      s: r,
      b: s,
      toString: be
    }
  }, m.rgb2hsl = function (t, e, i) {
    i = we(t, e, i), t = i[0], e = i[1], i = i[2];
    var n, r, s, a, o, l;
    return a = B(t, e, i), o = j(t, e, i), l = a - o, n = 0 == l ? null : a == t ? (e - i) / l : a == e ? (i - t) / l + 2 : (t - e) / l + 4, n = 60 * ((n + 360) % 6) / 360, s = (a + o) / 2, r = 0 == l ? 0 : .5 > s ? l / (2 * s) : l / (2 - 2 * s), {
      h: n,
      s: r,
      l: s,
      toString: xe
    }
  }, m._path2string = function () {
    return this.join(",").replace(re, "$1")
  }, m._preload = function (t, e) {
    var i = S.doc.createElement("img");
    i.style.cssText = "position:absolute;left:-9999em;top:-9999em", i.onload = function () {
      e.call(this), this.onload = null, S.doc.body.removeChild(this)
    }, i.onerror = function () {
      S.doc.body.removeChild(this)
    }, S.doc.body.appendChild(i), i.src = t
  }, m.getRGB = p(function (t) {
    if (!t || (t = R(t)).indexOf("-") + 1)return {r: -1, g: -1, b: -1, hex: "none", error: 1, toString: f};
    if ("none" == t)return {r: -1, g: -1, b: -1, hex: "none", toString: f};
    !ne[C](t.toLowerCase().substring(0, 2)) && "#" != t.charAt() && (t = ye(t));
    var e, i, n, r, s, a, o = t.match(V);
    return o ? (o[2] && (n = Z(o[2].substring(5), 16), i = Z(o[2].substring(3, 5), 16), e = Z(o[2].substring(1, 3), 16)), o[3] && (n = Z((s = o[3].charAt(3)) + s, 16), i = Z((s = o[3].charAt(2)) + s, 16), e = Z((s = o[3].charAt(1)) + s, 16)), o[4] && (a = o[4][P](ie), e = Q(a[0]), "%" == a[0].slice(-1) && (e *= 2.55), i = Q(a[1]), "%" == a[1].slice(-1) && (i *= 2.55), n = Q(a[2]), "%" == a[2].slice(-1) && (n *= 2.55), "rgba" == o[1].toLowerCase().slice(0, 4) && (r = Q(a[3])), a[3] && "%" == a[3].slice(-1) && (r /= 100)), o[5] ? (a = o[5][P](ie), e = Q(a[0]), "%" == a[0].slice(-1) && (e *= 2.55), i = Q(a[1]), "%" == a[1].slice(-1) && (i *= 2.55), n = Q(a[2]), "%" == a[2].slice(-1) && (n *= 2.55), ("deg" == a[0].slice(-3) || "°" == a[0].slice(-1)) && (e /= 360), "hsba" == o[1].toLowerCase().slice(0, 4) && (r = Q(a[3])), a[3] && "%" == a[3].slice(-1) && (r /= 100), m.hsb2rgb(e, i, n, r)) : o[6] ? (a = o[6][P](ie), e = Q(a[0]), "%" == a[0].slice(-1) && (e *= 2.55), i = Q(a[1]), "%" == a[1].slice(-1) && (i *= 2.55), n = Q(a[2]), "%" == a[2].slice(-1) && (n *= 2.55), ("deg" == a[0].slice(-3) || "°" == a[0].slice(-1)) && (e /= 360), "hsla" == o[1].toLowerCase().slice(0, 4) && (r = Q(a[3])), a[3] && "%" == a[3].slice(-1) && (r /= 100), m.hsl2rgb(e, i, n, r)) : (o = {
      r: e,
      g: i,
      b: n,
      toString: f
    }, o.hex = "#" + (16777216 | n | i << 8 | e << 16).toString(16).slice(1), m.is(r, "finite") && (o.opacity = r), o)) : {
      r: -1,
      g: -1,
      b: -1,
      hex: "none",
      error: 1,
      toString: f
    }
  }, m), m.hsb = p(function (t, e, i) {
    return m.hsb2rgb(t, e, i).hex
  }), m.hsl = p(function (t, e, i) {
    return m.hsl2rgb(t, e, i).hex
  }), m.rgb = p(function (t, e, i) {
    return "#" + (16777216 | i | e << 8 | t << 16).toString(16).slice(1)
  }), m.getColor = function (t) {
    var e = this.getColor.start = this.getColor.start || {h: 0, s: 1, b: t || .75}, i = this.hsb2rgb(e.h, e.s, e.b);
    return e.h += .075, e.h > 1 && (e.h = 0, e.s -= .2, e.s <= 0 && (this.getColor.start = {h: 0, s: 1, b: e.b})), i.hex
  }, m.getColor.reset = function () {
    delete this.start
  }, m.parsePathString = function (t) {
    if (!t)return null;
    var e = Se(t);
    if (e.arr)return Te(e.arr);
    var i = {a: 7, c: 6, h: 1, l: 2, m: 2, r: 4, q: 4, s: 4, t: 2, v: 1, z: 0}, n = [];
    return m.is(t, U) && m.is(t[0], U) && (n = Te(t)), n.length || R(t).replace(se, function (t, e, r) {
      var s = [], a = e.toLowerCase();
      if (r.replace(oe, function (t, e) {
          e && s.push(+e)
        }), "m" == a && s.length > 2 && (n.push([e][M](s.splice(0, 2))), a = "l", e = "m" == e ? "l" : "L"), "r" == a)n.push([e][M](s)); else for (; s.length >= i[a] && (n.push([e][M](s.splice(0, i[a]))), i[a]););
    }), n.toString = m._path2string, e.arr = Te(n), n
  }, m.parseTransformString = p(function (t) {
    if (!t)return null;
    var e = [];
    return m.is(t, U) && m.is(t[0], U) && (e = Te(t)), e.length || R(t).replace(ae, function (t, i, n) {
      var r = [];
      H.call(i), n.replace(oe, function (t, e) {
        e && r.push(+e)
      }), e.push([i][M](r))
    }), e.toString = m._path2string, e
  });
  var Se = function (t) {
    var e = Se.ps = Se.ps || {};
    return e[t] ? e[t].sleep = 100 : e[t] = {sleep: 100}, setTimeout(function () {
      for (var i in e)e[C](i) && i != t && (e[i].sleep--, !e[i].sleep && delete e[i])
    }), e[t]
  };
  m.findDotsAtSegment = function (t, e, i, n, r, s, a, o, l) {
    var h = 1 - l, u = O(h, 3), c = O(h, 2), d = l * l, f = d * l, p = u * t + 3 * c * l * i + 3 * h * l * l * r + f * a, g = u * e + 3 * c * l * n + 3 * h * l * l * s + f * o, v = t + 2 * l * (i - t) + d * (r - 2 * i + t), m = e + 2 * l * (n - e) + d * (s - 2 * n + e), y = i + 2 * l * (r - i) + d * (a - 2 * r + i), b = n + 2 * l * (s - n) + d * (o - 2 * s + n), x = h * t + l * i, _ = h * e + l * n, w = h * r + l * a, C = h * s + l * o, S = 90 - 180 * N.atan2(v - y, m - b) / $;
    return (v > y || b > m) && (S += 180), {
      x: p,
      y: g,
      m: {x: v, y: m},
      n: {x: y, y: b},
      start: {x: x, y: _},
      end: {x: w, y: C},
      alpha: S
    }
  }, m.bezierBBox = function (t, e, i, n, r, s, a, o) {
    m.is(t, "array") || (t = [t, e, i, n, r, s, a, o]);
    var l = Pe.apply(null, t);
    return {x: l.min.x, y: l.min.y, x2: l.max.x, y2: l.max.y, width: l.max.x - l.min.x, height: l.max.y - l.min.y}
  }, m.isPointInsideBBox = function (t, e, i) {
    return e >= t.x && e <= t.x2 && i >= t.y && i <= t.y2
  }, m.isBBoxIntersect = function (t, e) {
    var i = m.isPointInsideBBox;
    return i(e, t.x, t.y) || i(e, t.x2, t.y) || i(e, t.x, t.y2) || i(e, t.x2, t.y2) || i(t, e.x, e.y) || i(t, e.x2, e.y) || i(t, e.x, e.y2) || i(t, e.x2, e.y2) || (t.x < e.x2 && t.x > e.x || e.x < t.x2 && e.x > t.x) && (t.y < e.y2 && t.y > e.y || e.y < t.y2 && e.y > t.y)
  }, m.pathIntersection = function (t, e) {
    return a(t, e)
  }, m.pathIntersectionNumber = function (t, e) {
    return a(t, e, 1)
  }, m.isPointInsidePath = function (t, e, i) {
    var n = m.pathBBox(t);
    return m.isPointInsideBBox(n, e, i) && 1 == a(t, [["M", e, i], ["H", n.x2 + 10]], 1) % 2
  }, m._removedFactory = function (t) {
    return function () {
      eve("raphael.log", null, "Raphaël: you are calling to method “" + t + "” of removed object", t)
    }
  };
  var De = m.pathBBox = function (t) {
    var e = Se(t);
    if (e.bbox)return e.bbox;
    if (!t)return {x: 0, y: 0, width: 0, height: 0, x2: 0, y2: 0};
    t = Le(t);
    for (var i, n = 0, r = 0, s = [], a = [], o = 0, l = t.length; l > o; o++)if (i = t[o], "M" == i[0])n = i[1], r = i[2], s.push(n), a.push(r); else {
      var h = Pe(n, r, i[1], i[2], i[3], i[4], i[5], i[6]);
      s = s[M](h.min.x, h.max.x), a = a[M](h.min.y, h.max.y), n = i[5], r = i[6]
    }
    var u = j[k](0, s), c = j[k](0, a), d = B[k](0, s), f = B[k](0, a), p = {
      x: u,
      y: c,
      x2: d,
      y2: f,
      width: d - u,
      height: f - c
    };
    return e.bbox = v(p), p
  }, Te = function (t) {
    var e = v(t);
    return e.toString = m._path2string, e
  }, ke = m._pathToRelative = function (t) {
    var e = Se(t);
    if (e.rel)return Te(e.rel);
    m.is(t, U) && m.is(t && t[0], U) || (t = m.parsePathString(t));
    var i = [], n = 0, r = 0, s = 0, a = 0, o = 0;
    "M" == t[0][0] && (n = t[0][1], r = t[0][2], s = n, a = r, o++, i.push(["M", n, r]));
    for (var l = o, h = t.length; h > l; l++) {
      var u = i[l] = [], c = t[l];
      if (c[0] != H.call(c[0]))switch (u[0] = H.call(c[0]), u[0]) {
        case"a":
          u[1] = c[1], u[2] = c[2], u[3] = c[3], u[4] = c[4], u[5] = c[5], u[6] = +(c[6] - n).toFixed(3), u[7] = +(c[7] - r).toFixed(3);
          break;
        case"v":
          u[1] = +(c[1] - r).toFixed(3);
          break;
        case"m":
          s = c[1], a = c[2];
        default:
          for (var d = 1, f = c.length; f > d; d++)u[d] = +(c[d] - (d % 2 ? n : r)).toFixed(3)
      } else {
        u = i[l] = [], "m" == c[0] && (s = c[1] + n, a = c[2] + r);
        for (var p = 0, g = c.length; g > p; p++)i[l][p] = c[p]
      }
      var v = i[l].length;
      switch (i[l][0]) {
        case"z":
          n = s, r = a;
          break;
        case"h":
          n += +i[l][v - 1];
          break;
        case"v":
          r += +i[l][v - 1];
          break;
        default:
          n += +i[l][v - 2], r += +i[l][v - 1]
      }
    }
    return i.toString = m._path2string, e.rel = Te(i), i
  }, Me = m._pathToAbsolute = function (t) {
    var e = Se(t);
    if (e.abs)return Te(e.abs);
    if (m.is(t, U) && m.is(t && t[0], U) || (t = m.parsePathString(t)), !t || !t.length)return [["M", 0, 0]];
    var i = [], n = 0, r = 0, s = 0, a = 0, o = 0;
    "M" == t[0][0] && (n = +t[0][1], r = +t[0][2], s = n, a = r, o++, i[0] = ["M", n, r]);
    for (var l, h, u = 3 == t.length && "M" == t[0][0] && "R" == t[1][0].toUpperCase() && "Z" == t[2][0].toUpperCase(), c = o, f = t.length; f > c; c++) {
      if (i.push(l = []), h = t[c], h[0] != K.call(h[0]))switch (l[0] = K.call(h[0]), l[0]) {
        case"A":
          l[1] = h[1], l[2] = h[2], l[3] = h[3], l[4] = h[4], l[5] = h[5], l[6] = +(h[6] + n), l[7] = +(h[7] + r);
          break;
        case"V":
          l[1] = +h[1] + r;
          break;
        case"H":
          l[1] = +h[1] + n;
          break;
        case"R":
          for (var p = [n, r][M](h.slice(1)), g = 2, v = p.length; v > g; g++)p[g] = +p[g] + n, p[++g] = +p[g] + r;
          i.pop(), i = i[M](d(p, u));
          break;
        case"M":
          s = +h[1] + n, a = +h[2] + r;
        default:
          for (g = 1, v = h.length; v > g; g++)l[g] = +h[g] + (g % 2 ? n : r)
      } else if ("R" == h[0])p = [n, r][M](h.slice(1)), i.pop(), i = i[M](d(p, u)), l = ["R"][M](h.slice(-2)); else for (var y = 0, b = h.length; b > y; y++)l[y] = h[y];
      switch (l[0]) {
        case"Z":
          n = s, r = a;
          break;
        case"H":
          n = l[1];
          break;
        case"V":
          r = l[1];
          break;
        case"M":
          s = l[l.length - 2], a = l[l.length - 1];
        default:
          n = l[l.length - 2], r = l[l.length - 1]
      }
    }
    return i.toString = m._path2string, e.abs = Te(i), i
  }, Ie = function (t, e, i, n) {
    return [t, e, i, n, i, n]
  }, Fe = function (t, e, i, n, r, s) {
    var a = 1 / 3, o = 2 / 3;
    return [a * t + o * i, a * e + o * n, a * r + o * i, a * s + o * n, r, s]
  }, Ae = function (t, e, i, n, r, s, a, o, l, h) {
    var u, c = 120 * $ / 180, d = $ / 180 * (+r || 0), f = [], g = p(function (t, e, i) {
      var n = t * N.cos(i) - e * N.sin(i), r = t * N.sin(i) + e * N.cos(i);
      return {x: n, y: r}
    });
    if (h)S = h[0], D = h[1], w = h[2], C = h[3]; else {
      u = g(t, e, -d), t = u.x, e = u.y, u = g(o, l, -d), o = u.x, l = u.y;
      var v = (N.cos($ / 180 * r), N.sin($ / 180 * r), (t - o) / 2), m = (e - l) / 2, y = v * v / (i * i) + m * m / (n * n);
      y > 1 && (y = N.sqrt(y), i = y * i, n = y * n);
      var b = i * i, x = n * n, _ = (s == a ? -1 : 1) * N.sqrt(W((b * x - b * m * m - x * v * v) / (b * m * m + x * v * v))), w = _ * i * m / n + (t + o) / 2, C = _ * -n * v / i + (e + l) / 2, S = N.asin(((e - C) / n).toFixed(9)), D = N.asin(((l - C) / n).toFixed(9));
      S = w > t ? $ - S : S, D = w > o ? $ - D : D, 0 > S && (S = 2 * $ + S), 0 > D && (D = 2 * $ + D), a && S > D && (S -= 2 * $), !a && D > S && (D -= 2 * $)
    }
    var T = D - S;
    if (W(T) > c) {
      var k = D, I = o, F = l;
      D = S + c * (a && D > S ? 1 : -1), o = w + i * N.cos(D), l = C + n * N.sin(D), f = Ae(o, l, i, n, r, 0, a, I, F, [D, k, w, C])
    }
    T = D - S;
    var A = N.cos(S), R = N.sin(S), L = N.cos(D), E = N.sin(D), H = N.tan(T / 4), B = 4 / 3 * i * H, j = 4 / 3 * n * H, O = [t, e], q = [t + B * R, e - j * A], z = [o + B * E, l - j * L], U = [o, l];
    if (q[0] = 2 * O[0] - q[0], q[1] = 2 * O[1] - q[1], h)return [q, z, U][M](f);
    f = [q, z, U][M](f).join()[P](",");
    for (var X = [], V = 0, Y = f.length; Y > V; V++)X[V] = V % 2 ? g(f[V - 1], f[V], d).y : g(f[V], f[V + 1], d).x;
    return X
  }, Re = function (t, e, i, n, r, s, a, o, l) {
    var h = 1 - l;
    return {
      x: O(h, 3) * t + 3 * O(h, 2) * l * i + 3 * h * l * l * r + O(l, 3) * a,
      y: O(h, 3) * e + 3 * O(h, 2) * l * n + 3 * h * l * l * s + O(l, 3) * o
    }
  }, Pe = p(function (t, e, i, n, r, s, a, o) {
    var l, h = r - 2 * i + t - (a - 2 * r + i), u = 2 * (i - t) - 2 * (r - i), c = t - i, d = (-u + N.sqrt(u * u - 4 * h * c)) / 2 / h, f = (-u - N.sqrt(u * u - 4 * h * c)) / 2 / h, p = [e, o], g = [t, a];
    return W(d) > "1e12" && (d = .5), W(f) > "1e12" && (f = .5), d > 0 && 1 > d && (l = Re(t, e, i, n, r, s, a, o, d), g.push(l.x), p.push(l.y)), f > 0 && 1 > f && (l = Re(t, e, i, n, r, s, a, o, f), g.push(l.x), p.push(l.y)), h = s - 2 * n + e - (o - 2 * s + n), u = 2 * (n - e) - 2 * (s - n), c = e - n, d = (-u + N.sqrt(u * u - 4 * h * c)) / 2 / h, f = (-u - N.sqrt(u * u - 4 * h * c)) / 2 / h, W(d) > "1e12" && (d = .5), W(f) > "1e12" && (f = .5), d > 0 && 1 > d && (l = Re(t, e, i, n, r, s, a, o, d), g.push(l.x), p.push(l.y)), f > 0 && 1 > f && (l = Re(t, e, i, n, r, s, a, o, f), g.push(l.x), p.push(l.y)), {
      min: {
        x: j[k](0, g),
        y: j[k](0, p)
      }, max: {x: B[k](0, g), y: B[k](0, p)}
    }
  }), Le = m._path2curve = p(function (t, e) {
    var i = !e && Se(t);
    if (!e && i.curve)return Te(i.curve);
    for (var n = Me(t), r = e && Me(e), s = {x: 0, y: 0, bx: 0, by: 0, X: 0, Y: 0, qx: null, qy: null}, a = {
      x: 0,
      y: 0,
      bx: 0,
      by: 0,
      X: 0,
      Y: 0,
      qx: null,
      qy: null
    }, o = (function (t, e) {
      var i, n;
      if (!t)return ["C", e.x, e.y, e.x, e.y, e.x, e.y];
      switch (!(t[0]in{T: 1, Q: 1}) && (e.qx = e.qy = null), t[0]) {
        case"M":
          e.X = t[1], e.Y = t[2];
          break;
        case"A":
          t = ["C"][M](Ae[k](0, [e.x, e.y][M](t.slice(1))));
          break;
        case"S":
          i = e.x + (e.x - (e.bx || e.x)), n = e.y + (e.y - (e.by || e.y)), t = ["C", i, n][M](t.slice(1));
          break;
        case"T":
          e.qx = e.x + (e.x - (e.qx || e.x)), e.qy = e.y + (e.y - (e.qy || e.y)), t = ["C"][M](Fe(e.x, e.y, e.qx, e.qy, t[1], t[2]));
          break;
        case"Q":
          e.qx = t[1], e.qy = t[2], t = ["C"][M](Fe(e.x, e.y, t[1], t[2], t[3], t[4]));
          break;
        case"L":
          t = ["C"][M](Ie(e.x, e.y, t[1], t[2]));
          break;
        case"H":
          t = ["C"][M](Ie(e.x, e.y, t[1], e.y));
          break;
        case"V":
          t = ["C"][M](Ie(e.x, e.y, e.x, t[1]));
          break;
        case"Z":
          t = ["C"][M](Ie(e.x, e.y, e.X, e.Y))
      }
      return t
    }), l = function (t, e) {
      if (t[e].length > 7) {
        t[e].shift();
        for (var i = t[e]; i.length;)t.splice(e++, 0, ["C"][M](i.splice(0, 6)));
        t.splice(e, 1), c = B(n.length, r && r.length || 0)
      }
    }, h = function (t, e, i, s, a) {
      t && e && "M" == t[a][0] && "M" != e[a][0] && (e.splice(a, 0, ["M", s.x, s.y]), i.bx = 0, i.by = 0, i.x = t[a][1], i.y = t[a][2], c = B(n.length, r && r.length || 0))
    }, u = 0, c = B(n.length, r && r.length || 0); c > u; u++) {
      n[u] = o(n[u], s), l(n, u), r && (r[u] = o(r[u], a)), r && l(r, u), h(n, r, s, a, u), h(r, n, a, s, u);
      var d = n[u], f = r && r[u], p = d.length, g = r && f.length;
      s.x = d[p - 2], s.y = d[p - 1], s.bx = Q(d[p - 4]) || s.x, s.by = Q(d[p - 3]) || s.y, a.bx = r && (Q(f[g - 4]) || a.x), a.by = r && (Q(f[g - 3]) || a.y), a.x = r && f[g - 2], a.y = r && f[g - 1]
    }
    return r || (i.curve = Te(n)), r ? [n, r] : n
  }, null, Te), Ee = (m._parseDots = p(function (t) {
    for (var e = [], i = 0, n = t.length; n > i; i++) {
      var r = {}, s = t[i].match(/^([^:]*):?([\d\.]*)/);
      if (r.color = m.getRGB(s[1]), r.color.error)return null;
      r.color = r.color.hex, s[2] && (r.offset = s[2] + "%"), e.push(r)
    }
    for (i = 1, n = e.length - 1; n > i; i++)if (!e[i].offset) {
      for (var a = Q(e[i - 1].offset || 0), o = 0, l = i + 1; n > l; l++)if (e[l].offset) {
        o = e[l].offset;
        break
      }
      o || (o = 100, l = n), o = Q(o);
      for (var h = (o - a) / (l - i + 1); l > i; i++)a += h, e[i].offset = a + "%"
    }
    return e
  }), m._tear = function (t, e) {
    t == e.top && (e.top = t.prev), t == e.bottom && (e.bottom = t.next), t.next && (t.next.prev = t.prev), t.prev && (t.prev.next = t.next)
  }), He = (m._tofront = function (t, e) {
    e.top !== t && (Ee(t, e), t.next = null, t.prev = e.top, e.top.next = t, e.top = t)
  }, m._toback = function (t, e) {
    e.bottom !== t && (Ee(t, e), t.next = e.bottom, t.prev = null, e.bottom.prev = t, e.bottom = t)
  }, m._insertafter = function (t, e, i) {
    Ee(t, i), e == i.top && (i.top = t), e.next && (e.next.prev = t), t.next = e.next, t.prev = e, e.next = t
  }, m._insertbefore = function (t, e, i) {
    Ee(t, i), e == i.bottom && (i.bottom = t), e.prev && (e.prev.next = t), t.prev = e.prev, e.prev = t, t.next = e
  }, m.toMatrix = function (t, e) {
    var i = De(t), n = {
      _: {transform: F}, getBBox: function () {
        return i
      }
    };
    return Ne(n, e), n.matrix
  }), Ne = (m.transformPath = function (t, e) {
    return ge(t, He(t, e))
  }, m._extractTransform = function (t, e) {
    if (null == e)return t._.transform;
    e = R(e).replace(/\.{3}|\u2026/g, t._.transform || F);
    var i = m.parseTransformString(e), n = 0, r = 0, a = 0, o = 1, l = 1, h = t._, u = new s;
    if (h.transform = i || [], i)for (var c = 0, d = i.length; d > c; c++) {
      var f, p, g, v, y, b = i[c], x = b.length, _ = R(b[0]).toLowerCase(), w = b[0] != _, C = w ? u.invert() : 0;
      "t" == _ && 3 == x ? w ? (f = C.x(0, 0), p = C.y(0, 0), g = C.x(b[1], b[2]), v = C.y(b[1], b[2]), u.translate(g - f, v - p)) : u.translate(b[1], b[2]) : "r" == _ ? 2 == x ? (y = y || t.getBBox(1), u.rotate(b[1], y.x + y.width / 2, y.y + y.height / 2), n += b[1]) : 4 == x && (w ? (g = C.x(b[2], b[3]), v = C.y(b[2], b[3]), u.rotate(b[1], g, v)) : u.rotate(b[1], b[2], b[3]), n += b[1]) : "s" == _ ? 2 == x || 3 == x ? (y = y || t.getBBox(1), u.scale(b[1], b[x - 1], y.x + y.width / 2, y.y + y.height / 2), o *= b[1], l *= b[x - 1]) : 5 == x && (w ? (g = C.x(b[3], b[4]), v = C.y(b[3], b[4]), u.scale(b[1], b[2], g, v)) : u.scale(b[1], b[2], b[3], b[4]), o *= b[1], l *= b[2]) : "m" == _ && 7 == x && u.add(b[1], b[2], b[3], b[4], b[5], b[6]), h.dirtyT = 1, t.matrix = u
    }
    t.matrix = u, h.sx = o, h.sy = l, h.deg = n, h.dx = r = u.e, h.dy = a = u.f, 1 == o && 1 == l && !n && h.bbox ? (h.bbox.x += +r, h.bbox.y += +a) : h.dirtyT = 1
  }), Be = function (t) {
    var e = t[0];
    switch (e.toLowerCase()) {
      case"t":
        return [e, 0, 0];
      case"m":
        return [e, 1, 0, 0, 1, 0, 0];
      case"r":
        return 4 == t.length ? [e, 0, t[2], t[3]] : [e, 0];
      case"s":
        return 5 == t.length ? [e, 1, 1, t[3], t[4]] : 3 == t.length ? [e, 1, 1] : [e, 1]
    }
  }, je = m._equaliseTransform = function (t, e) {
    e = R(e).replace(/\.{3}|\u2026/g, t), t = m.parseTransformString(t) || [], e = m.parseTransformString(e) || [];
    for (var i, n, r, s, a = B(t.length, e.length), o = [], l = [], h = 0; a > h; h++) {
      if (r = t[h] || Be(e[h]), s = e[h] || Be(r), r[0] != s[0] || "r" == r[0].toLowerCase() && (r[2] != s[2] || r[3] != s[3]) || "s" == r[0].toLowerCase() && (r[3] != s[3] || r[4] != s[4]))return;
      for (o[h] = [], l[h] = [], i = 0, n = B(r.length, s.length); n > i; i++)i in r && (o[h][i] = r[i]), i in s && (l[h][i] = s[i])
    }
    return {from: o, to: l}
  };
  m._getContainer = function (t, e, i, n) {
    var r;
    return r = null != n || m.is(t, "object") ? t : S.doc.getElementById(t), null != r ? r.tagName ? null == e ? {
      container: r,
      width: r.style.pixelWidth || r.offsetWidth,
      height: r.style.pixelHeight || r.offsetHeight
    } : {container: r, width: e, height: i} : {container: 1, x: t, y: e, width: i, height: n} : void 0
  }, m.pathToRelative = ke, m._engine = {}, m.path2curve = Le, m.matrix = function (t, e, i, n, r, a) {
    return new s(t, e, i, n, r, a)
  }, function (t) {
    function e(t) {
      var e = N.sqrt(i(t));
      t[0] && (t[0] /= e), t[1] && (t[1] /= e)
    }

    function i(t) {
      return t[0] * t[0] + t[1] * t[1]
    }

    t.add = function (t, e, i, n, r, a) {
      var o, l, h, u, c = [[], [], []], d = [[this.a, this.c, this.e], [this.b, this.d, this.f], [0, 0, 1]], f = [[t, i, r], [e, n, a], [0, 0, 1]];
      for (t && t instanceof s && (f = [[t.a, t.c, t.e], [t.b, t.d, t.f], [0, 0, 1]]), o = 0; 3 > o; o++)for (l = 0; 3 > l; l++) {
        for (u = 0, h = 0; 3 > h; h++)u += d[o][h] * f[h][l];
        c[o][l] = u
      }
      this.a = c[0][0], this.b = c[1][0], this.c = c[0][1], this.d = c[1][1], this.e = c[0][2], this.f = c[1][2]
    }, t.invert = function () {
      var t = this, e = t.a * t.d - t.b * t.c;
      return new s(t.d / e, -t.b / e, -t.c / e, t.a / e, (t.c * t.f - t.d * t.e) / e, (t.b * t.e - t.a * t.f) / e)
    }, t.clone = function () {
      return new s(this.a, this.b, this.c, this.d, this.e, this.f)
    }, t.translate = function (t, e) {
      this.add(1, 0, 0, 1, t, e)
    }, t.scale = function (t, e, i, n) {
      null == e && (e = t), (i || n) && this.add(1, 0, 0, 1, i, n), this.add(t, 0, 0, e, 0, 0), (i || n) && this.add(1, 0, 0, 1, -i, -n)
    }, t.rotate = function (t, e, i) {
      t = m.rad(t), e = e || 0, i = i || 0;
      var n = +N.cos(t).toFixed(9), r = +N.sin(t).toFixed(9);
      this.add(n, r, -r, n, e, i), this.add(1, 0, 0, 1, -e, -i)
    }, t.x = function (t, e) {
      return t * this.a + e * this.c + this.e
    }, t.y = function (t, e) {
      return t * this.b + e * this.d + this.f
    }, t.get = function (t) {
      return +this[R.fromCharCode(97 + t)].toFixed(4)
    }, t.toString = function () {
      return m.svg ? "matrix(" + [this.get(0), this.get(1), this.get(2), this.get(3), this.get(4), this.get(5)].join() + ")" : [this.get(0), this.get(2), this.get(1), this.get(3), 0, 0].join()
    }, t.toFilter = function () {
      return "progid:DXImageTransform.Microsoft.Matrix(M11=" + this.get(0) + ", M12=" + this.get(2) + ", M21=" + this.get(1) + ", M22=" + this.get(3) + ", Dx=" + this.get(4) + ", Dy=" + this.get(5) + ", sizingmethod='auto expand')"
    }, t.offset = function () {
      return [this.e.toFixed(4), this.f.toFixed(4)]
    }, t.split = function () {
      var t = {};
      t.dx = this.e, t.dy = this.f;
      var n = [[this.a, this.c], [this.b, this.d]];
      t.scalex = N.sqrt(i(n[0])), e(n[0]), t.shear = n[0][0] * n[1][0] + n[0][1] * n[1][1], n[1] = [n[1][0] - n[0][0] * t.shear, n[1][1] - n[0][1] * t.shear], t.scaley = N.sqrt(i(n[1])), e(n[1]), t.shear /= t.scaley;
      var r = -n[0][1], s = n[1][1];
      return 0 > s ? (t.rotate = m.deg(N.acos(s)), 0 > r && (t.rotate = 360 - t.rotate)) : t.rotate = m.deg(N.asin(r)), t.isSimple = !(+t.shear.toFixed(9) || t.scalex.toFixed(9) != t.scaley.toFixed(9) && t.rotate), t.isSuperSimple = !+t.shear.toFixed(9) && t.scalex.toFixed(9) == t.scaley.toFixed(9) && !t.rotate, t.noRotation = !+t.shear.toFixed(9) && !t.rotate, t
    }, t.toTransformString = function (t) {
      var e = t || this[P]();
      return e.isSimple ? (e.scalex = +e.scalex.toFixed(4), e.scaley = +e.scaley.toFixed(4), e.rotate = +e.rotate.toFixed(4), (e.dx || e.dy ? "t" + [e.dx, e.dy] : F) + (1 != e.scalex || 1 != e.scaley ? "s" + [e.scalex, e.scaley, 0, 0] : F) + (e.rotate ? "r" + [e.rotate, 0, 0] : F)) : "m" + [this.get(0), this.get(1), this.get(2), this.get(3), this.get(4), this.get(5)]
    }
  }(s.prototype);
  var We = navigator.userAgent.match(/Version\/(.*?)\s/) || navigator.userAgent.match(/Chrome\/(\d+)/);
  b.safari = "Apple Computer, Inc." == navigator.vendor && (We && We[1] < 4 || "iP" == navigator.platform.slice(0, 2)) || "Google Inc." == navigator.vendor && We && We[1] < 8 ? function () {
    var t = this.rect(-99, -99, this.width + 99, this.height + 99).attr({stroke: "none"});
    setTimeout(function () {
      t.remove()
    })
  } : ue;
  for (var Oe = function () {
    this.returnValue = !1
  }, $e = function () {
    return this.originalEvent.preventDefault()
  }, qe = function () {
    this.cancelBubble = !0
  }, ze = function () {
    return this.originalEvent.stopPropagation()
  }, Ue = function () {
    return S.doc.addEventListener ? function (t, e, i, n) {
      var r = I && E[e] ? E[e] : e, s = function (r) {
        var s = S.doc.documentElement.scrollTop || S.doc.body.scrollTop, a = S.doc.documentElement.scrollLeft || S.doc.body.scrollLeft, o = r.clientX + a, l = r.clientY + s;
        if (I && E[C](e))for (var h = 0, u = r.targetTouches && r.targetTouches.length; u > h; h++)if (r.targetTouches[h].target == t) {
          var c = r;
          r = r.targetTouches[h], r.originalEvent = c, r.preventDefault = $e, r.stopPropagation = ze;
          break
        }
        return i.call(n, r, o, l)
      };
      return t.addEventListener(r, s, !1), function () {
        return t.removeEventListener(r, s, !1), !0
      }
    } : S.doc.attachEvent ? function (t, e, i, n) {
      var r = function (t) {
        t = t || S.win.event;
        var e = S.doc.documentElement.scrollTop || S.doc.body.scrollTop, r = S.doc.documentElement.scrollLeft || S.doc.body.scrollLeft, s = t.clientX + r, a = t.clientY + e;
        return t.preventDefault = t.preventDefault || Oe, t.stopPropagation = t.stopPropagation || qe, i.call(n, t, s, a)
      };
      t.attachEvent("on" + e, r);
      var s = function () {
        return t.detachEvent("on" + e, r), !0
      };
      return s
    } : void 0
  }(), Xe = [], Ve = function (t) {
    for (var e, i = t.clientX, n = t.clientY, r = S.doc.documentElement.scrollTop || S.doc.body.scrollTop, s = S.doc.documentElement.scrollLeft || S.doc.body.scrollLeft, a = Xe.length; a--;) {
      if (e = Xe[a], I) {
        for (var o, l = t.touches.length; l--;)if (o = t.touches[l], o.identifier == e.el._drag.id) {
          i = o.clientX, n = o.clientY, (t.originalEvent ? t.originalEvent : t).preventDefault();
          break
        }
      } else t.preventDefault();
      var h, u = e.el.node, c = u.nextSibling, d = u.parentNode, f = u.style.display;
      S.win.opera && d.removeChild(u), u.style.display = "none", h = e.el.paper.getElementByPoint(i, n), u.style.display = f, S.win.opera && (c ? d.insertBefore(u, c) : d.appendChild(u)), h && eve("raphael.drag.over." + e.el.id, e.el, h), i += s, n += r, eve("raphael.drag.move." + e.el.id, e.move_scope || e.el, i - e.el._drag.x, n - e.el._drag.y, i, n, t)
    }
  }, Ye = function (t) {
    m.unmousemove(Ve).unmouseup(Ye);
    for (var e, i = Xe.length; i--;)e = Xe[i], e.el._drag = {}, eve("raphael.drag.end." + e.el.id, e.end_scope || e.start_scope || e.move_scope || e.el, t);
    Xe = []
  }, Ge = m.el = {}, Je = L.length; Je--;)!function (t) {
    m[t] = Ge[t] = function (e, i) {
      return m.is(e, "function") && (this.events = this.events || [], this.events.push({
        name: t,
        f: e,
        unbind: Ue(this.shape || this.node || S.doc, t, e, i || this)
      })), this
    }, m["un" + t] = Ge["un" + t] = function (e) {
      for (var i = this.events || [], n = i.length; n--;)if (i[n].name == t && i[n].f == e)return i[n].unbind(), i.splice(n, 1), !i.length && delete this.events, this;
      return this
    }
  }(L[Je]);
  Ge.data = function (t, e) {
    var i = le[this.id] = le[this.id] || {};
    if (1 == arguments.length) {
      if (m.is(t, "object")) {
        for (var n in t)t[C](n) && this.data(n, t[n]);
        return this
      }
      return eve("raphael.data.get." + this.id, this, i[t], t), i[t]
    }
    return i[t] = e, eve("raphael.data.set." + this.id, this, e, t), this
  }, Ge.removeData = function (t) {
    return null == t ? le[this.id] = {} : le[this.id] && delete le[this.id][t], this
  }, Ge.hover = function (t, e, i, n) {
    return this.mouseover(t, i).mouseout(e, n || i)
  }, Ge.unhover = function (t, e) {
    return this.unmouseover(t).unmouseout(e)
  };
  var Qe = [];
  Ge.drag = function (t, e, i, n, r, s) {
    function a(a) {
      (a.originalEvent || a).preventDefault();
      var o = S.doc.documentElement.scrollTop || S.doc.body.scrollTop, l = S.doc.documentElement.scrollLeft || S.doc.body.scrollLeft;
      this._drag.x = a.clientX + l, this._drag.y = a.clientY + o, this._drag.id = a.identifier, !Xe.length && m.mousemove(Ve).mouseup(Ye), Xe.push({
        el: this,
        move_scope: n,
        start_scope: r,
        end_scope: s
      }), e && eve.on("raphael.drag.start." + this.id, e), t && eve.on("raphael.drag.move." + this.id, t), i && eve.on("raphael.drag.end." + this.id, i), eve("raphael.drag.start." + this.id, r || n || this, a.clientX + l, a.clientY + o, a)
    }

    return this._drag = {}, Qe.push({el: this, start: a}), this.mousedown(a), this
  }, Ge.onDragOver = function (t) {
    t ? eve.on("raphael.drag.over." + this.id, t) : eve.unbind("raphael.drag.over." + this.id)
  }, Ge.undrag = function () {
    for (var t = Qe.length; t--;)Qe[t].el == this && (this.unmousedown(Qe[t].start), Qe.splice(t, 1), eve.unbind("raphael.drag.*." + this.id));
    !Qe.length && m.unmousemove(Ve).unmouseup(Ye)
  }, b.circle = function (t, e, i) {
    var n = m._engine.circle(this, t || 0, e || 0, i || 0);
    return this.__set__ && this.__set__.push(n), n
  }, b.rect = function (t, e, i, n, r) {
    var s = m._engine.rect(this, t || 0, e || 0, i || 0, n || 0, r || 0);
    return this.__set__ && this.__set__.push(s), s
  }, b.ellipse = function (t, e, i, n) {
    var r = m._engine.ellipse(this, t || 0, e || 0, i || 0, n || 0);
    return this.__set__ && this.__set__.push(r), r
  }, b.path = function (t) {
    t && !m.is(t, z) && !m.is(t[0], U) && (t += F);
    var e = m._engine.path(m.format[k](m, arguments), this);
    return this.__set__ && this.__set__.push(e), e
  }, b.image = function (t, e, i, n, r) {
    var s = m._engine.image(this, t || "about:blank", e || 0, i || 0, n || 0, r || 0);
    return this.__set__ && this.__set__.push(s), s
  }, b.text = function (t, e, i) {
    var n = m._engine.text(this, t || 0, e || 0, R(i));
    return this.__set__ && this.__set__.push(n), n
  }, b.set = function (t) {
    !m.is(t, "array") && (t = Array.prototype.splice.call(arguments, 0, arguments.length));
    var e = new hi(t);
    return this.__set__ && this.__set__.push(e), e
  }, b.setStart = function (t) {
    this.__set__ = t || this.set()
  }, b.setFinish = function () {
    var t = this.__set__;
    return delete this.__set__, t
  }, b.setSize = function (t, e) {
    return m._engine.setSize.call(this, t, e)
  }, b.setViewBox = function (t, e, i, n, r) {
    return m._engine.setViewBox.call(this, t, e, i, n, r)
  }, b.top = b.bottom = null, b.raphael = m;
  var Ze = function (t) {
    var e = t.getBoundingClientRect(), i = t.ownerDocument, n = i.body, r = i.documentElement, s = r.clientTop || n.clientTop || 0, a = r.clientLeft || n.clientLeft || 0, o = e.top + (S.win.pageYOffset || r.scrollTop || n.scrollTop) - s, l = e.left + (S.win.pageXOffset || r.scrollLeft || n.scrollLeft) - a;
    return {y: o, x: l}
  };
  b.getElementByPoint = function (t, e) {
    var i = this, n = i.canvas, r = S.doc.elementFromPoint(t, e);
    if (S.win.opera && "svg" == r.tagName) {
      var s = Ze(n), a = n.createSVGRect();
      a.x = t - s.x, a.y = e - s.y, a.width = a.height = 1;
      var o = n.getIntersectionList(a, null);
      o.length && (r = o[o.length - 1])
    }
    if (!r)return null;
    for (; r.parentNode && r != n.parentNode && !r.raphael;)r = r.parentNode;
    return r == i.canvas.parentNode && (r = n), r = r && r.raphael ? i.getById(r.raphaelid) : null
  }, b.getById = function (t) {
    for (var e = this.bottom; e;) {
      if (e.id == t)return e;
      e = e.next
    }
    return null
  }, b.forEach = function (t, e) {
    for (var i = this.bottom; i;) {
      if (t.call(e, i) === !1)return this;
      i = i.next
    }
    return this
  }, b.getElementsByPoint = function (t, e) {
    var i = this.set();
    return this.forEach(function (n) {
      n.isPointInside(t, e) && i.push(n)
    }), i
  }, Ge.isPointInside = function (t, e) {
    var i = this.realPath = this.realPath || pe[this.type](this);
    return m.isPointInsidePath(i, t, e)
  }, Ge.getBBox = function (t) {
    if (this.removed)return {};
    var e = this._;
    return t ? ((e.dirty || !e.bboxwt) && (this.realPath = pe[this.type](this), e.bboxwt = De(this.realPath), e.bboxwt.toString = r, e.dirty = 0), e.bboxwt) : ((e.dirty || e.dirtyT || !e.bbox) && ((e.dirty || !this.realPath) && (e.bboxwt = 0, this.realPath = pe[this.type](this)), e.bbox = De(ge(this.realPath, this.matrix)), e.bbox.toString = r, e.dirty = e.dirtyT = 0), e.bbox)
  }, Ge.clone = function () {
    if (this.removed)return null;
    var t = this.paper[this.type]().attr(this.attr());
    return this.__set__ && this.__set__.push(t), t
  }, Ge.glow = function (t) {
    if ("text" == this.type)return null;
    t = t || {};
    var e = {
      width: (t.width || 10) + (+this.attr("stroke-width") || 1),
      fill: t.fill || !1,
      opacity: t.opacity || .5,
      offsetx: t.offsetx || 0,
      offsety: t.offsety || 0,
      color: t.color || "#000"
    }, i = e.width / 2, n = this.paper, r = n.set(), s = this.realPath || pe[this.type](this);
    s = this.matrix ? ge(s, this.matrix) : s;
    for (var a = 1; i + 1 > a; a++)r.push(n.path(s).attr({
      stroke: e.color,
      fill: e.fill ? e.color : "none",
      "stroke-linejoin": "round",
      "stroke-linecap": "round",
      "stroke-width": +(e.width / i * a).toFixed(3),
      opacity: +(e.opacity / i).toFixed(3)
    }));
    return r.insertBefore(this).translate(e.offsetx, e.offsety)
  };
  var Ke = function (t, e, i, n, r, s, a, o, l) {
    return null == l ? u(t, e, i, n, r, s, a, o) : m.findDotsAtSegment(t, e, i, n, r, s, a, o, h(t, e, i, n, r, s, a, o, l))
  }, ti = function (t, e) {
    return function (i, n, r) {
      i = Le(i);
      for (var s, a, o, l, h, u = "", c = {}, d = 0, f = 0, p = i.length; p > f; f++) {
        if (o = i[f], "M" == o[0])s = +o[1], a = +o[2]; else {
          if (l = Ke(s, a, o[1], o[2], o[3], o[4], o[5], o[6]), d + l > n) {
            if (e && !c.start) {
              if (h = Ke(s, a, o[1], o[2], o[3], o[4], o[5], o[6], n - d), u += ["C" + h.start.x, h.start.y, h.m.x, h.m.y, h.x, h.y], r)return u;
              c.start = u, u = ["M" + h.x, h.y + "C" + h.n.x, h.n.y, h.end.x, h.end.y, o[5], o[6]].join(), d += l, s = +o[5], a = +o[6];
              continue
            }
            if (!t && !e)return h = Ke(s, a, o[1], o[2], o[3], o[4], o[5], o[6], n - d), {
              x: h.x,
              y: h.y,
              alpha: h.alpha
            }
          }
          d += l, s = +o[5], a = +o[6]
        }
        u += o.shift() + o
      }
      return c.end = u, h = t ? d : e ? c : m.findDotsAtSegment(s, a, o[0], o[1], o[2], o[3], o[4], o[5], 1), h.alpha && (h = {
        x: h.x,
        y: h.y,
        alpha: h.alpha
      }), h
    }
  }, ei = ti(1), ii = ti(), ni = ti(0, 1);
  m.getTotalLength = ei, m.getPointAtLength = ii, m.getSubpath = function (t, e, i) {
    if (this.getTotalLength(t) - i < 1e-6)return ni(t, e).end;
    var n = ni(t, i, 1);
    return e ? ni(n, e).end : n
  }, Ge.getTotalLength = function () {
    return "path" == this.type ? this.node.getTotalLength ? this.node.getTotalLength() : ei(this.attrs.path) : void 0
  }, Ge.getPointAtLength = function (t) {
    return "path" == this.type ? ii(this.attrs.path, t) : void 0
  }, Ge.getSubpath = function (t, e) {
    return "path" == this.type ? m.getSubpath(this.attrs.path, t, e) : void 0
  };
  var ri = m.easing_formulas = {
    linear: function (t) {
      return t
    }, "<": function (t) {
      return O(t, 1.7)
    }, ">": function (t) {
      return O(t, .48)
    }, "<>": function (t) {
      var e = .48 - t / 1.04, i = N.sqrt(.1734 + e * e), n = i - e, r = O(W(n), 1 / 3) * (0 > n ? -1 : 1), s = -i - e, a = O(W(s), 1 / 3) * (0 > s ? -1 : 1), o = r + a + .5;
      return 3 * (1 - o) * o * o + o * o * o
    }, backIn: function (t) {
      var e = 1.70158;
      return t * t * ((e + 1) * t - e)
    }, backOut: function (t) {
      t -= 1;
      var e = 1.70158;
      return t * t * ((e + 1) * t + e) + 1
    }, elastic: function (t) {
      return t == !!t ? t : O(2, -10 * t) * N.sin(2 * (t - .075) * $ / .3) + 1
    }, bounce: function (t) {
      var e, i = 7.5625, n = 2.75;
      return 1 / n > t ? e = i * t * t : 2 / n > t ? (t -= 1.5 / n, e = i * t * t + .75) : 2.5 / n > t ? (t -= 2.25 / n, e = i * t * t + .9375) : (t -= 2.625 / n, e = i * t * t + .984375), e
    }
  };
  ri.easeIn = ri["ease-in"] = ri["<"], ri.easeOut = ri["ease-out"] = ri[">"], ri.easeInOut = ri["ease-in-out"] = ri["<>"], ri["back-in"] = ri.backIn, ri["back-out"] = ri.backOut;
  var si = [], ai = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (t) {
      setTimeout(t, 16)
    }, oi = function () {
    for (var t = +new Date, i = 0; i < si.length; i++) {
      var n = si[i];
      if (!n.el.removed && !n.paused) {
        var r, s, a = t - n.start, o = n.ms, l = n.easing, h = n.from, u = n.diff, c = n.to, d = (n.t, n.el), f = {}, p = {};
        if (n.initstatus ? (a = (n.initstatus * n.anim.top - n.prev) / (n.percent - n.prev) * o, n.status = n.initstatus, delete n.initstatus, n.stop && si.splice(i--, 1)) : n.status = (n.prev + (n.percent - n.prev) * (a / o)) / n.anim.top, !(0 > a))if (o > a) {
          var g = l(a / o);
          for (var v in h)if (h[C](v)) {
            switch (ee[v]) {
              case q:
                r = +h[v] + g * o * u[v];
                break;
              case"colour":
                r = "rgb(" + [li(J(h[v].r + g * o * u[v].r)), li(J(h[v].g + g * o * u[v].g)), li(J(h[v].b + g * o * u[v].b))].join(",") + ")";
                break;
              case"path":
                r = [];
                for (var y = 0, b = h[v].length; b > y; y++) {
                  r[y] = [h[v][y][0]];
                  for (var x = 1, _ = h[v][y].length; _ > x; x++)r[y][x] = +h[v][y][x] + g * o * u[v][y][x];
                  r[y] = r[y].join(A)
                }
                r = r.join(A);
                break;
              case"transform":
                if (u[v].real)for (r = [], y = 0, b = h[v].length; b > y; y++)for (r[y] = [h[v][y][0]], x = 1, _ = h[v][y].length; _ > x; x++)r[y][x] = h[v][y][x] + g * o * u[v][y][x]; else {
                  var w = function (t) {
                    return +h[v][t] + g * o * u[v][t]
                  };
                  r = [["m", w(0), w(1), w(2), w(3), w(4), w(5)]]
                }
                break;
              case"csv":
                if ("clip-rect" == v)for (r = [], y = 4; y--;)r[y] = +h[v][y] + g * o * u[v][y];
                break;
              default:
                var S = [][M](h[v]);
                for (r = [], y = d.paper.customAttributes[v].length; y--;)r[y] = +S[y] + g * o * u[v][y]
            }
            f[v] = r
          }
          d.attr(f), function (t, e, i) {
            setTimeout(function () {
              eve("raphael.anim.frame." + t, e, i)
            })
          }(d.id, d, n.anim)
        } else {
          if (function (t, e, i) {
              setTimeout(function () {
                eve("raphael.anim.frame." + e.id, e, i), eve("raphael.anim.finish." + e.id, e, i), m.is(t, "function") && t.call(e)
              })
            }(n.callback, d, n.anim), d.attr(c), si.splice(i--, 1), n.repeat > 1 && !n.next) {
            for (s in c)c[C](s) && (p[s] = n.totalOrigin[s]);
            n.el.attr(p), e(n.anim, n.el, n.anim.percents[0], null, n.totalOrigin, n.repeat - 1)
          }
          n.next && !n.stop && e(n.anim, n.el, n.next, null, n.totalOrigin, n.repeat)
        }
      }
    }
    m.svg && d && d.paper && d.paper.safari(), si.length && ai(oi)
  }, li = function (t) {
    return t > 255 ? 255 : 0 > t ? 0 : t
  };
  Ge.animateWith = function (t, n, r, s, a, o) {
    var l = this;
    if (l.removed)return o && o.call(l), l;
    var h = r instanceof i ? r : m.animation(r, s, a, o);
    e(h, l, h.percents[0], null, l.attr());
    for (var u = 0, c = si.length; c > u; u++)if (si[u].anim == n && si[u].el == t) {
      si[c - 1].start = si[u].start;
      break
    }
    return l
  }, Ge.onAnimation = function (t) {
    return t ? eve.on("raphael.anim.frame." + this.id, t) : eve.unbind("raphael.anim.frame." + this.id), this
  }, i.prototype.delay = function (t) {
    var e = new i(this.anim, this.ms);
    return e.times = this.times, e.del = +t || 0, e
  }, i.prototype.repeat = function (t) {
    var e = new i(this.anim, this.ms);
    return e.del = this.del, e.times = N.floor(B(t, 0)) || 1, e
  }, m.animation = function (t, e, n, r) {
    if (t instanceof i)return t;
    (m.is(n, "function") || !n) && (r = r || n || null, n = null), t = Object(t), e = +e || 0;
    var s, a, o = {};
    for (a in t)t[C](a) && Q(a) != a && Q(a) + "%" != a && (s = !0, o[a] = t[a]);
    return s ? (n && (o.easing = n), r && (o.callback = r), new i({100: o}, e)) : new i(t, e)
  }, Ge.animate = function (t, n, r, s) {
    var a = this;
    if (a.removed)return s && s.call(a), a;
    var o = t instanceof i ? t : m.animation(t, n, r, s);
    return e(o, a, o.percents[0], null, a.attr()), a
  }, Ge.setTime = function (t, e) {
    return t && null != e && this.status(t, j(e, t.ms) / t.ms), this
  }, Ge.status = function (t, i) {
    var n, r, s = [], a = 0;
    if (null != i)return e(t, this, -1, j(i, 1)), this;
    for (n = si.length; n > a; a++)if (r = si[a], r.el.id == this.id && (!t || r.anim == t)) {
      if (t)return r.status;
      s.push({anim: r.anim, status: r.status})
    }
    return t ? 0 : s
  }, Ge.pause = function (t) {
    for (var e = 0; e < si.length; e++)si[e].el.id == this.id && (!t || si[e].anim == t) && eve("raphael.anim.pause." + this.id, this, si[e].anim) !== !1 && (si[e].paused = !0);
    return this
  }, Ge.resume = function (t) {
    for (var e = 0; e < si.length; e++)if (si[e].el.id == this.id && (!t || si[e].anim == t)) {
      var i = si[e];
      eve("raphael.anim.resume." + this.id, this, i.anim) !== !1 && (delete i.paused, this.status(i.anim, i.status))
    }
    return this
  }, Ge.stop = function (t) {
    for (var e = 0; e < si.length; e++)si[e].el.id == this.id && (!t || si[e].anim == t) && eve("raphael.anim.stop." + this.id, this, si[e].anim) !== !1 && si.splice(e--, 1);
    return this
  }, eve.on("raphael.remove", t), eve.on("raphael.clear", t), Ge.toString = function () {
    return "Raphaël’s object"
  };
  var hi = function (t) {
    if (this.items = [], this.length = 0, this.type = "set", t)for (var e = 0, i = t.length; i > e; e++)t[e] && (t[e].constructor == Ge.constructor || t[e].constructor == hi) && (this[this.items.length] = this.items[this.items.length] = t[e], this.length++)
  }, ui = hi.prototype;
  ui.push = function () {
    for (var t, e, i = 0, n = arguments.length; n > i; i++)t = arguments[i], t && (t.constructor == Ge.constructor || t.constructor == hi) && (e = this.items.length, this[e] = this.items[e] = t, this.length++);
    return this
  }, ui.pop = function () {
    return this.length && delete this[this.length--], this.items.pop()
  }, ui.forEach = function (t, e) {
    for (var i = 0, n = this.items.length; n > i; i++)if (t.call(e, this.items[i], i) === !1)return this;
    return this
  };
  for (var ci in Ge)Ge[C](ci) && (ui[ci] = function (t) {
    return function () {
      var e = arguments;
      return this.forEach(function (i) {
        i[t][k](i, e)
      })
    }
  }(ci));
  ui.attr = function (t, e) {
    if (t && m.is(t, U) && m.is(t[0], "object"))for (var i = 0, n = t.length; n > i; i++)this.items[i].attr(t[i]); else for (var r = 0, s = this.items.length; s > r; r++)this.items[r].attr(t, e);
    return this
  }, ui.clear = function () {
    for (; this.length;)this.pop()
  }, ui.splice = function (t, e) {
    t = 0 > t ? B(this.length + t, 0) : t, e = B(0, j(this.length - t, e));
    var i, n = [], r = [], s = [];
    for (i = 2; i < arguments.length; i++)s.push(arguments[i]);
    for (i = 0; e > i; i++)r.push(this[t + i]);
    for (; i < this.length - t; i++)n.push(this[t + i]);
    var a = s.length;
    for (i = 0; i < a + n.length; i++)this.items[t + i] = this[t + i] = a > i ? s[i] : n[i - a];
    for (i = this.items.length = this.length -= e - a; this[i];)delete this[i++];
    return new hi(r)
  }, ui.exclude = function (t) {
    for (var e = 0, i = this.length; i > e; e++)if (this[e] == t)return this.splice(e, 1), !0
  }, ui.animate = function (t, e, i, n) {
    (m.is(i, "function") || !i) && (n = i || null);
    var r, s, a = this.items.length, o = a, l = this;
    if (!a)return this;
    n && (s = function () {
      !--a && n.call(l)
    }), i = m.is(i, z) ? i : s;
    var h = m.animation(t, e, i, s);
    for (r = this.items[--o].animate(h); o--;)this.items[o] && !this.items[o].removed && this.items[o].animateWith(r, h, h);
    return this
  }, ui.insertAfter = function (t) {
    for (var e = this.items.length; e--;)this.items[e].insertAfter(t);
    return this
  }, ui.getBBox = function () {
    for (var t = [], e = [], i = [], n = [], r = this.items.length; r--;)if (!this.items[r].removed) {
      var s = this.items[r].getBBox();
      t.push(s.x), e.push(s.y), i.push(s.x + s.width), n.push(s.y + s.height)
    }
    return t = j[k](0, t), e = j[k](0, e), i = B[k](0, i), n = B[k](0, n), {
      x: t,
      y: e,
      x2: i,
      y2: n,
      width: i - t,
      height: n - e
    }
  }, ui.clone = function (t) {
    t = new hi;
    for (var e = 0, i = this.items.length; i > e; e++)t.push(this.items[e].clone());
    return t
  }, ui.toString = function () {
    return "Raphaël‘s set"
  }, m.registerFont = function (t) {
    if (!t.face)return t;
    this.fonts = this.fonts || {};
    var e = {w: t.w, face: {}, glyphs: {}}, i = t.face["font-family"];
    for (var n in t.face)t.face[C](n) && (e.face[n] = t.face[n]);
    if (this.fonts[i] ? this.fonts[i].push(e) : this.fonts[i] = [e], !t.svg) {
      e.face["units-per-em"] = Z(t.face["units-per-em"], 10);
      for (var r in t.glyphs)if (t.glyphs[C](r)) {
        var s = t.glyphs[r];
        if (e.glyphs[r] = {
            w: s.w, k: {}, d: s.d && "M" + s.d.replace(/[mlcxtrv]/g, function (t) {
              return {l: "L", c: "C", x: "z", t: "m", r: "l", v: "c"}[t] || "M"
            }) + "z"
          }, s.k)for (var a in s.k)s[C](a) && (e.glyphs[r].k[a] = s.k[a])
      }
    }
    return t
  }, b.getFont = function (t, e, i, n) {
    if (n = n || "normal", i = i || "normal", e = +e || {
        normal: 400,
        bold: 700,
        lighter: 300,
        bolder: 800
      }[e] || 400, m.fonts) {
      var r = m.fonts[t];
      if (!r) {
        var s = new RegExp("(^|\\s)" + t.replace(/[^\w\d\s+!~.:_-]/g, F) + "(\\s|$)", "i");
        for (var a in m.fonts)if (m.fonts[C](a) && s.test(a)) {
          r = m.fonts[a];
          break
        }
      }
      var o;
      if (r)for (var l = 0, h = r.length; h > l && (o = r[l], o.face["font-weight"] != e || o.face["font-style"] != i && o.face["font-style"] || o.face["font-stretch"] != n); l++);
      return o
    }
  }, b.print = function (t, e, i, n, r, s, a) {
    s = s || "middle", a = B(j(a || 0, 1), -1);
    var o, l = R(i)[P](F), h = 0, u = 0, c = F;
    if (m.is(n, i) && (n = this.getFont(n)), n) {
      o = (r || 16) / n.face["units-per-em"];
      for (var d = n.face.bbox[P](x), f = +d[0], p = d[3] - d[1], g = 0, v = +d[1] + ("baseline" == s ? p + +n.face.descent : p / 2), y = 0, b = l.length; b > y; y++) {
        if ("\n" == l[y])h = 0, w = 0, u = 0, g += p; else {
          var _ = u && n.glyphs[l[y - 1]] || {}, w = n.glyphs[l[y]];
          h += u ? (_.w || n.w) + (_.k && _.k[l[y]] || 0) + n.w * a : 0, u = 1
        }
        w && w.d && (c += m.transformPath(w.d, ["t", h * o, g * o, "s", o, o, f, v, "t", (t - f) / o, (e - v) / o]))
      }
    }
    return this.path(c).attr({fill: "#000", stroke: "none"})
  }, b.add = function (t) {
    if (m.is(t, "array"))for (var e, i = this.set(), n = 0, r = t.length; r > n; n++)e = t[n] || {}, _[C](e.type) && i.push(this[e.type]().attr(e));
    return i
  }, m.format = function (t, e) {
    var i = m.is(e, U) ? [0][M](e) : arguments;
    return t && m.is(t, z) && i.length - 1 && (t = t.replace(w, function (t, e) {
      return null == i[++e] ? F : i[e]
    })), t || F
  }, m.fullfill = function () {
    var t = /\{([^\}]+)\}/g, e = /(?:(?:^|\.)(.+?)(?=\[|\.|$|\()|\[('|")(.+?)\2\])(\(\))?/g, i = function (t, i, n) {
      var r = n;
      return i.replace(e, function (t, e, i, n, s) {
        e = e || n, r && (e in r && (r = r[e]), "function" == typeof r && s && (r = r()))
      }), r = (null == r || r == n ? t : r) + ""
    };
    return function (e, n) {
      return String(e).replace(t, function (t, e) {
        return i(t, e, n)
      })
    }
  }(), m.ninja = function () {
    return D.was ? S.win.Raphael = D.is : delete Raphael, m
  }, m.st = ui, function (t, e, i) {
    function n() {
      /in/.test(t.readyState) ? setTimeout(n, 9) : m.eve("raphael.DOMload")
    }

    null == t.readyState && t.addEventListener && (t.addEventListener(e, i = function () {
      t.removeEventListener(e, i, !1), t.readyState = "complete"
    }, !1), t.readyState = "loading"), n()
  }(document, "DOMContentLoaded"), D.was ? S.win.Raphael = m : Raphael = m, eve.on("raphael.DOMload", function () {
    y = !0
  })
}(), window.Raphael.svg && function (t) {
  var e = "hasOwnProperty", i = String, n = parseFloat, r = parseInt, s = Math, a = s.max, o = s.abs, l = s.pow, h = /[, ]+/, u = t.eve, c = "", d = " ", f = "http://www.w3.org/1999/xlink", p = {
    block: "M5,0 0,2.5 5,5z",
    classic: "M5,0 0,2.5 5,5 3.5,3 3.5,2z",
    diamond: "M2.5,0 5,2.5 2.5,5 0,2.5z",
    open: "M6,1 1,3.5 6,6",
    oval: "M2.5,0A2.5,2.5,0,0,1,2.5,5 2.5,2.5,0,0,1,2.5,0z"
  }, g = {};
  t.toString = function () {
    return "Your browser supports SVG.\nYou are running Raphaël " + this.version
  };
  var v = function (n, r) {
    if (r) {
      "string" == typeof n && (n = v(n));
      for (var s in r)r[e](s) && ("xlink:" == s.substring(0, 6) ? n.setAttributeNS(f, s.substring(6), i(r[s])) : n.setAttribute(s, i(r[s])))
    } else n = t._g.doc.createElementNS("http://www.w3.org/2000/svg", n), n.style && (n.style.webkitTapHighlightColor = "rgba(0,0,0,0)");
    return n
  }, m = function (e, r) {
    var h = "linear", u = e.id + r, d = .5, f = .5, p = e.node, g = e.paper, m = p.style, y = t._g.doc.getElementById(u);
    if (!y) {
      if (r = i(r).replace(t._radial_gradient, function (t, e, i) {
          if (h = "radial", e && i) {
            d = n(e), f = n(i);
            var r = 2 * (f > .5) - 1;
            l(d - .5, 2) + l(f - .5, 2) > .25 && (f = s.sqrt(.25 - l(d - .5, 2)) * r + .5) && .5 != f && (f = f.toFixed(5) - 1e-5 * r)
          }
          return c
        }), r = r.split(/\s*\-\s*/), "linear" == h) {
        var b = r.shift();
        if (b = -n(b), isNaN(b))return null;
        var x = [0, 0, s.cos(t.rad(b)), s.sin(t.rad(b))], _ = 1 / (a(o(x[2]), o(x[3])) || 1);
        x[2] *= _, x[3] *= _, x[2] < 0 && (x[0] = -x[2], x[2] = 0), x[3] < 0 && (x[1] = -x[3], x[3] = 0)
      }
      var w = t._parseDots(r);
      if (!w)return null;
      if (u = u.replace(/[\(\)\s,\xb0#]/g, "_"), e.gradient && u != e.gradient.id && (g.defs.removeChild(e.gradient), delete e.gradient), !e.gradient) {
        y = v(h + "Gradient", {id: u}), e.gradient = y, v(y, "radial" == h ? {fx: d, fy: f} : {
          x1: x[0],
          y1: x[1],
          x2: x[2],
          y2: x[3],
          gradientTransform: e.matrix.invert()
        }), g.defs.appendChild(y);
        for (var C = 0, S = w.length; S > C; C++)y.appendChild(v("stop", {
          offset: w[C].offset ? w[C].offset : C ? "100%" : "0%",
          "stop-color": w[C].color || "#fff"
        }))
      }
    }
    return v(p, {
      fill: "url(#" + u + ")",
      opacity: 1,
      "fill-opacity": 1
    }), m.fill = c, m.opacity = 1, m.fillOpacity = 1, 1
  }, y = function (t) {
    var e = t.getBBox(1);
    v(t.pattern, {patternTransform: t.matrix.invert() + " translate(" + e.x + "," + e.y + ")"})
  }, b = function (n, r, s) {
    if ("path" == n.type) {
      for (var a, o, l, h, u, d = i(r).toLowerCase().split("-"), f = n.paper, m = s ? "end" : "start", y = n.node, b = n.attrs, x = b["stroke-width"], _ = d.length, w = "classic", C = 3, S = 3, D = 5; _--;)switch (d[_]) {
        case"block":
        case"classic":
        case"oval":
        case"diamond":
        case"open":
        case"none":
          w = d[_];
          break;
        case"wide":
          S = 5;
          break;
        case"narrow":
          S = 2;
          break;
        case"long":
          C = 5;
          break;
        case"short":
          C = 2
      }
      if ("open" == w ? (C += 2, S += 2, D += 2, l = 1, h = s ? 4 : 1, u = {
          fill: "none",
          stroke: b.stroke
        }) : (h = l = C / 2, u = {
          fill: b.stroke,
          stroke: "none"
        }), n._.arrows ? s ? (n._.arrows.endPath && g[n._.arrows.endPath]--, n._.arrows.endMarker && g[n._.arrows.endMarker]--) : (n._.arrows.startPath && g[n._.arrows.startPath]--, n._.arrows.startMarker && g[n._.arrows.startMarker]--) : n._.arrows = {}, "none" != w) {
        var T = "raphael-marker-" + w, k = "raphael-marker-" + m + w + C + S;
        t._g.doc.getElementById(T) ? g[T]++ : (f.defs.appendChild(v(v("path"), {
          "stroke-linecap": "round",
          d: p[w],
          id: T
        })), g[T] = 1);
        var M, I = t._g.doc.getElementById(k);
        I ? (g[k]++, M = I.getElementsByTagName("use")[0]) : (I = v(v("marker"), {
          id: k,
          markerHeight: S,
          markerWidth: C,
          orient: "auto",
          refX: h,
          refY: S / 2
        }), M = v(v("use"), {
          "xlink:href": "#" + T,
          transform: (s ? "rotate(180 " + C / 2 + " " + S / 2 + ") " : c) + "scale(" + C / D + "," + S / D + ")",
          "stroke-width": (1 / ((C / D + S / D) / 2)).toFixed(4)
        }), I.appendChild(M), f.defs.appendChild(I), g[k] = 1), v(M, u);
        var F = l * ("diamond" != w && "oval" != w);
        s ? (a = n._.arrows.startdx * x || 0, o = t.getTotalLength(b.path) - F * x) : (a = F * x, o = t.getTotalLength(b.path) - (n._.arrows.enddx * x || 0)), u = {}, u["marker-" + m] = "url(#" + k + ")", (o || a) && (u.d = Raphael.getSubpath(b.path, a, o)), v(y, u), n._.arrows[m + "Path"] = T, n._.arrows[m + "Marker"] = k, n._.arrows[m + "dx"] = F, n._.arrows[m + "Type"] = w, n._.arrows[m + "String"] = r
      } else s ? (a = n._.arrows.startdx * x || 0, o = t.getTotalLength(b.path) - a) : (a = 0, o = t.getTotalLength(b.path) - (n._.arrows.enddx * x || 0)), n._.arrows[m + "Path"] && v(y, {d: Raphael.getSubpath(b.path, a, o)}), delete n._.arrows[m + "Path"], delete n._.arrows[m + "Marker"], delete n._.arrows[m + "dx"], delete n._.arrows[m + "Type"], delete n._.arrows[m + "String"];
      for (u in g)if (g[e](u) && !g[u]) {
        var A = t._g.doc.getElementById(u);
        A && A.parentNode.removeChild(A)
      }
    }
  }, x = {
    "": [0],
    none: [0],
    "-": [3, 1],
    ".": [1, 1],
    "-.": [3, 1, 1, 1],
    "-..": [3, 1, 1, 1, 1, 1],
    ". ": [1, 3],
    "- ": [4, 3],
    "--": [8, 3],
    "- .": [4, 3, 1, 3],
    "--.": [8, 3, 1, 3],
    "--..": [8, 3, 1, 3, 1, 3]
  }, _ = function (t, e, n) {
    if (e = x[i(e).toLowerCase()]) {
      for (var r = t.attrs["stroke-width"] || "1", s = {
          round: r,
          square: r,
          butt: 0
        }[t.attrs["stroke-linecap"] || n["stroke-linecap"]] || 0, a = [], o = e.length; o--;)a[o] = e[o] * r + (o % 2 ? 1 : -1) * s;
      v(t.node, {"stroke-dasharray": a.join(",")})
    }
  }, w = function (n, s) {
    var l = n.node, u = n.attrs, d = l.style.visibility;
    l.style.visibility = "hidden";
    for (var p in s)if (s[e](p)) {
      if (!t._availableAttrs[e](p))continue;
      var g = s[p];
      switch (u[p] = g, p) {
        case"blur":
          n.blur(g);
          break;
        case"href":
        case"title":
        case"target":
          var x = l.parentNode;
          if ("a" != x.tagName.toLowerCase()) {
            var w = v("a");
            x.insertBefore(w, l), w.appendChild(l), x = w
          }
          "target" == p ? x.setAttributeNS(f, "show", "blank" == g ? "new" : g) : x.setAttributeNS(f, p, g);
          break;
        case"cursor":
          l.style.cursor = g;
          break;
        case"transform":
          n.transform(g);
          break;
        case"arrow-start":
          b(n, g);
          break;
        case"arrow-end":
          b(n, g, 1);
          break;
        case"clip-rect":
          var C = i(g).split(h);
          if (4 == C.length) {
            n.clip && n.clip.parentNode.parentNode.removeChild(n.clip.parentNode);
            var D = v("clipPath"), T = v("rect");
            D.id = t.createUUID(), v(T, {
              x: C[0],
              y: C[1],
              width: C[2],
              height: C[3]
            }), D.appendChild(T), n.paper.defs.appendChild(D), v(l, {"clip-path": "url(#" + D.id + ")"}), n.clip = T
          }
          if (!g) {
            var k = l.getAttribute("clip-path");
            if (k) {
              var M = t._g.doc.getElementById(k.replace(/(^url\(#|\)$)/g, c));
              M && M.parentNode.removeChild(M), v(l, {"clip-path": c}), delete n.clip
            }
          }
          break;
        case"path":
          "path" == n.type && (v(l, {d: g ? u.path = t._pathToAbsolute(g) : "M0,0"}), n._.dirty = 1, n._.arrows && ("startString"in n._.arrows && b(n, n._.arrows.startString), "endString"in n._.arrows && b(n, n._.arrows.endString, 1)));
          break;
        case"width":
          if (l.setAttribute(p, g), n._.dirty = 1, !u.fx)break;
          p = "x", g = u.x;
        case"x":
          u.fx && (g = -u.x - (u.width || 0));
        case"rx":
          if ("rx" == p && "rect" == n.type)break;
        case"cx":
          l.setAttribute(p, g), n.pattern && y(n), n._.dirty = 1;
          break;
        case"height":
          if (l.setAttribute(p, g), n._.dirty = 1, !u.fy)break;
          p = "y", g = u.y;
        case"y":
          u.fy && (g = -u.y - (u.height || 0));
        case"ry":
          if ("ry" == p && "rect" == n.type)break;
        case"cy":
          l.setAttribute(p, g), n.pattern && y(n), n._.dirty = 1;
          break;
        case"r":
          "rect" == n.type ? v(l, {rx: g, ry: g}) : l.setAttribute(p, g), n._.dirty = 1;
          break;
        case"src":
          "image" == n.type && l.setAttributeNS(f, "href", g);
          break;
        case"stroke-width":
          (1 != n._.sx || 1 != n._.sy) && (g /= a(o(n._.sx), o(n._.sy)) || 1), n.paper._vbSize && (g *= n.paper._vbSize), l.setAttribute(p, g), u["stroke-dasharray"] && _(n, u["stroke-dasharray"], s), n._.arrows && ("startString"in n._.arrows && b(n, n._.arrows.startString), "endString"in n._.arrows && b(n, n._.arrows.endString, 1));
          break;
        case"stroke-dasharray":
          _(n, g, s);
          break;
        case"fill":
          var I = i(g).match(t._ISURL);
          if (I) {
            D = v("pattern");
            var F = v("image");
            D.id = t.createUUID(), v(D, {x: 0, y: 0, patternUnits: "userSpaceOnUse", height: 1, width: 1}), v(F, {
              x: 0,
              y: 0,
              "xlink:href": I[1]
            }), D.appendChild(F), function (e) {
              t._preload(I[1], function () {
                var t = this.offsetWidth, i = this.offsetHeight;
                v(e, {width: t, height: i}), v(F, {width: t, height: i}), n.paper.safari()
              })
            }(D), n.paper.defs.appendChild(D), v(l, {fill: "url(#" + D.id + ")"}), n.pattern = D, n.pattern && y(n);
            break
          }
          var A = t.getRGB(g);
          if (A.error) {
            if (("circle" == n.type || "ellipse" == n.type || "r" != i(g).charAt()) && m(n, g)) {
              if ("opacity"in u || "fill-opacity"in u) {
                var R = t._g.doc.getElementById(l.getAttribute("fill").replace(/^url\(#|\)$/g, c));
                if (R) {
                  var P = R.getElementsByTagName("stop");
                  v(P[P.length - 1], {"stop-opacity": ("opacity"in u ? u.opacity : 1) * ("fill-opacity"in u ? u["fill-opacity"] : 1)})
                }
              }
              u.gradient = g, u.fill = "none";
              break
            }
          } else delete s.gradient, delete u.gradient, !t.is(u.opacity, "undefined") && t.is(s.opacity, "undefined") && v(l, {opacity: u.opacity}), !t.is(u["fill-opacity"], "undefined") && t.is(s["fill-opacity"], "undefined") && v(l, {"fill-opacity": u["fill-opacity"]});
          A[e]("opacity") && v(l, {"fill-opacity": A.opacity > 1 ? A.opacity / 100 : A.opacity});
        case"stroke":
          A = t.getRGB(g), l.setAttribute(p, A.hex), "stroke" == p && A[e]("opacity") && v(l, {"stroke-opacity": A.opacity > 1 ? A.opacity / 100 : A.opacity}), "stroke" == p && n._.arrows && ("startString"in n._.arrows && b(n, n._.arrows.startString), "endString"in n._.arrows && b(n, n._.arrows.endString, 1));
          break;
        case"gradient":
          ("circle" == n.type || "ellipse" == n.type || "r" != i(g).charAt()) && m(n, g);
          break;
        case"opacity":
          u.gradient && !u[e]("stroke-opacity") && v(l, {"stroke-opacity": g > 1 ? g / 100 : g});
        case"fill-opacity":
          if (u.gradient) {
            R = t._g.doc.getElementById(l.getAttribute("fill").replace(/^url\(#|\)$/g, c)), R && (P = R.getElementsByTagName("stop"), v(P[P.length - 1], {"stop-opacity": g}));
            break
          }
        default:
          "font-size" == p && (g = r(g, 10) + "px");
          var L = p.replace(/(\-.)/g, function (t) {
            return t.substring(1).toUpperCase()
          });
          l.style[L] = g, n._.dirty = 1, l.setAttribute(p, g)
      }
    }
    S(n, s), l.style.visibility = d
  }, C = 1.2, S = function (n, s) {
    if ("text" == n.type && (s[e]("text") || s[e]("font") || s[e]("font-size") || s[e]("x") || s[e]("y"))) {
      var a = n.attrs, o = n.node, l = o.firstChild ? r(t._g.doc.defaultView.getComputedStyle(o.firstChild, c).getPropertyValue("font-size"), 10) : 10;
      if (s[e]("text")) {
        for (a.text = s.text; o.firstChild;)o.removeChild(o.firstChild);
        for (var h, u = i(s.text).split("\n"), d = [], f = 0, p = u.length; p > f; f++)h = v("tspan"), f && v(h, {
          dy: l * C,
          x: a.x
        }), h.appendChild(t._g.doc.createTextNode(u[f])), o.appendChild(h), d[f] = h
      } else for (d = o.getElementsByTagName("tspan"), f = 0, p = d.length; p > f; f++)f ? v(d[f], {
        dy: l * C,
        x: a.x
      }) : v(d[0], {dy: 0});
      v(o, {x: a.x, y: a.y}), n._.dirty = 1;
      var g = n._getBBox(), m = a.y - (g.y + g.height / 2);
      m && t.is(m, "finite") && v(d[0], {dy: m})
    }
  }, D = function (e, i) {
    this[0] = this.node = e, e.raphael = !0, this.id = t._oid++, e.raphaelid = this.id, this.matrix = t.matrix(), this.realPath = null, this.paper = i, this.attrs = this.attrs || {}, this._ = {
      transform: [],
      sx: 1,
      sy: 1,
      deg: 0,
      dx: 0,
      dy: 0,
      dirty: 1
    }, !i.bottom && (i.bottom = this), this.prev = i.top, i.top && (i.top.next = this), i.top = this, this.next = null
  }, T = t.el;
  D.prototype = T, T.constructor = D, t._engine.path = function (t, e) {
    var i = v("path");
    e.canvas && e.canvas.appendChild(i);
    var n = new D(i, e);
    return n.type = "path", w(n, {fill: "none", stroke: "#000", path: t}), n
  }, T.rotate = function (t, e, r) {
    if (this.removed)return this;
    if (t = i(t).split(h), t.length - 1 && (e = n(t[1]), r = n(t[2])), t = n(t[0]), null == r && (e = r), null == e || null == r) {
      var s = this.getBBox(1);
      e = s.x + s.width / 2, r = s.y + s.height / 2
    }
    return this.transform(this._.transform.concat([["r", t, e, r]])), this
  }, T.scale = function (t, e, r, s) {
    if (this.removed)return this;
    if (t = i(t).split(h), t.length - 1 && (e = n(t[1]), r = n(t[2]), s = n(t[3])), t = n(t[0]), null == e && (e = t), null == s && (r = s), null == r || null == s)var a = this.getBBox(1);
    return r = null == r ? a.x + a.width / 2 : r, s = null == s ? a.y + a.height / 2 : s, this.transform(this._.transform.concat([["s", t, e, r, s]])), this
  }, T.translate = function (t, e) {
    return this.removed ? this : (t = i(t).split(h), t.length - 1 && (e = n(t[1])), t = n(t[0]) || 0, e = +e || 0, this.transform(this._.transform.concat([["t", t, e]])), this)
  }, T.transform = function (i) {
    var n = this._;
    if (null == i)return n.transform;
    if (t._extractTransform(this, i), this.clip && v(this.clip, {transform: this.matrix.invert()}), this.pattern && y(this), this.node && v(this.node, {transform: this.matrix}), 1 != n.sx || 1 != n.sy) {
      var r = this.attrs[e]("stroke-width") ? this.attrs["stroke-width"] : 1;
      this.attr({"stroke-width": r})
    }
    return this
  }, T.hide = function () {
    return !this.removed && this.paper.safari(this.node.style.display = "none"), this
  }, T.show = function () {
    return !this.removed && this.paper.safari(this.node.style.display = ""), this
  }, T.remove = function () {
    if (!this.removed && this.node.parentNode) {
      var e = this.paper;
      e.__set__ && e.__set__.exclude(this), u.unbind("raphael.*.*." + this.id), this.gradient && e.defs.removeChild(this.gradient), t._tear(this, e), "a" == this.node.parentNode.tagName.toLowerCase() ? this.node.parentNode.parentNode.removeChild(this.node.parentNode) : this.node.parentNode.removeChild(this.node);
      for (var i in this)this[i] = "function" == typeof this[i] ? t._removedFactory(i) : null;
      this.removed = !0
    }
  }, T._getBBox = function () {
    if ("none" == this.node.style.display) {
      this.show();
      var t = !0
    }
    var e = {};
    try {
      e = this.node.getBBox()
    } catch (i) {
    } finally {
      e = e || {}
    }
    return t && this.hide(), e
  }, T.attr = function (i, n) {
    if (this.removed)return this;
    if (null == i) {
      var r = {};
      for (var s in this.attrs)this.attrs[e](s) && (r[s] = this.attrs[s]);
      return r.gradient && "none" == r.fill && (r.fill = r.gradient) && delete r.gradient, r.transform = this._.transform, r
    }
    if (null == n && t.is(i, "string")) {
      if ("fill" == i && "none" == this.attrs.fill && this.attrs.gradient)return this.attrs.gradient;
      if ("transform" == i)return this._.transform;
      for (var a = i.split(h), o = {}, l = 0, c = a.length; c > l; l++)i = a[l], o[i] = i in this.attrs ? this.attrs[i] : t.is(this.paper.customAttributes[i], "function") ? this.paper.customAttributes[i].def : t._availableAttrs[i];
      return c - 1 ? o : o[a[0]]
    }
    if (null == n && t.is(i, "array")) {
      for (o = {}, l = 0, c = i.length; c > l; l++)o[i[l]] = this.attr(i[l]);
      return o
    }
    if (null != n) {
      var d = {};
      d[i] = n
    } else null != i && t.is(i, "object") && (d = i);
    for (var f in d)u("raphael.attr." + f + "." + this.id, this, d[f]);
    for (f in this.paper.customAttributes)if (this.paper.customAttributes[e](f) && d[e](f) && t.is(this.paper.customAttributes[f], "function")) {
      var p = this.paper.customAttributes[f].apply(this, [].concat(d[f]));
      this.attrs[f] = d[f];
      for (var g in p)p[e](g) && (d[g] = p[g])
    }
    return w(this, d), this
  }, T.toFront = function () {
    if (this.removed)return this;
    "a" == this.node.parentNode.tagName.toLowerCase() ? this.node.parentNode.parentNode.appendChild(this.node.parentNode) : this.node.parentNode.appendChild(this.node);
    var e = this.paper;
    return e.top != this && t._tofront(this, e), this
  }, T.toBack = function () {
    if (this.removed)return this;
    var e = this.node.parentNode;
    return "a" == e.tagName.toLowerCase() ? e.parentNode.insertBefore(this.node.parentNode, this.node.parentNode.parentNode.firstChild) : e.firstChild != this.node && e.insertBefore(this.node, this.node.parentNode.firstChild), t._toback(this, this.paper), this.paper, this
  }, T.insertAfter = function (e) {
    if (this.removed)return this;
    var i = e.node || e[e.length - 1].node;
    return i.nextSibling ? i.parentNode.insertBefore(this.node, i.nextSibling) : i.parentNode.appendChild(this.node), t._insertafter(this, e, this.paper), this
  }, T.insertBefore = function (e) {
    if (this.removed)return this;
    var i = e.node || e[0].node;
    return i.parentNode.insertBefore(this.node, i), t._insertbefore(this, e, this.paper), this
  }, T.blur = function (e) {
    var i = this;
    if (0 !== +e) {
      var n = v("filter"), r = v("feGaussianBlur");
      i.attrs.blur = e, n.id = t.createUUID(), v(r, {stdDeviation: +e || 1.5}), n.appendChild(r), i.paper.defs.appendChild(n), i._blur = n, v(i.node, {filter: "url(#" + n.id + ")"})
    } else i._blur && (i._blur.parentNode.removeChild(i._blur), delete i._blur, delete i.attrs.blur), i.node.removeAttribute("filter")
  }, t._engine.circle = function (t, e, i, n) {
    var r = v("circle");
    t.canvas && t.canvas.appendChild(r);
    var s = new D(r, t);
    return s.attrs = {cx: e, cy: i, r: n, fill: "none", stroke: "#000"}, s.type = "circle", v(r, s.attrs), s
  }, t._engine.rect = function (t, e, i, n, r, s) {
    var a = v("rect");
    t.canvas && t.canvas.appendChild(a);
    var o = new D(a, t);
    return o.attrs = {
      x: e,
      y: i,
      width: n,
      height: r,
      r: s || 0,
      rx: s || 0,
      ry: s || 0,
      fill: "none",
      stroke: "#000"
    }, o.type = "rect", v(a, o.attrs), o
  }, t._engine.ellipse = function (t, e, i, n, r) {
    var s = v("ellipse");
    t.canvas && t.canvas.appendChild(s);
    var a = new D(s, t);
    return a.attrs = {cx: e, cy: i, rx: n, ry: r, fill: "none", stroke: "#000"}, a.type = "ellipse", v(s, a.attrs), a
  }, t._engine.image = function (t, e, i, n, r, s) {
    var a = v("image");
    v(a, {
      x: i,
      y: n,
      width: r,
      height: s,
      preserveAspectRatio: "none"
    }), a.setAttributeNS(f, "href", e), t.canvas && t.canvas.appendChild(a);
    var o = new D(a, t);
    return o.attrs = {x: i, y: n, width: r, height: s, src: e}, o.type = "image", o
  }, t._engine.text = function (e, i, n, r) {
    var s = v("text");
    e.canvas && e.canvas.appendChild(s);
    var a = new D(s, e);
    return a.attrs = {
      x: i,
      y: n,
      "text-anchor": "middle",
      text: r,
      font: t._availableAttrs.font,
      stroke: "none",
      fill: "#000"
    }, a.type = "text", w(a, a.attrs), a
  }, t._engine.setSize = function (t, e) {
    return this.width = t || this.width, this.height = e || this.height, this.canvas.setAttribute("width", this.width), this.canvas.setAttribute("height", this.height), this._viewBox && this.setViewBox.apply(this, this._viewBox), this
  }, t._engine.create = function () {
    var e = t._getContainer.apply(0, arguments), i = e && e.container, n = e.x, r = e.y, s = e.width, a = e.height;
    if (!i)throw new Error("SVG container not found.");
    var o, l = v("svg"), h = "overflow:hidden;";
    return n = n || 0, r = r || 0, s = s || 512, a = a || 342, v(l, {
      height: a,
      version: 1.1,
      width: s,
      xmlns: "http://www.w3.org/2000/svg"
    }), 1 == i ? (l.style.cssText = h + "position:absolute;left:" + n + "px;top:" + r + "px", t._g.doc.body.appendChild(l), o = 1) : (l.style.cssText = h + "position:relative", i.firstChild ? i.insertBefore(l, i.firstChild) : i.appendChild(l)), i = new t._Paper, i.width = s, i.height = a, i.canvas = l, i.clear(), i._left = i._top = 0, o && (i.renderfix = function () {
    }), i.renderfix(), i
  }, t._engine.setViewBox = function (t, e, i, n, r) {
    u("raphael.setViewBox", this, this._viewBox, [t, e, i, n, r]);
    var s, o, l = a(i / this.width, n / this.height), h = this.top, c = r ? "meet" : "xMinYMin";
    for (null == t ? (this._vbSize && (l = 1), delete this._vbSize, s = "0 0 " + this.width + d + this.height) : (this._vbSize = l, s = t + d + e + d + i + d + n), v(this.canvas, {
      viewBox: s,
      preserveAspectRatio: c
    }); l && h;)o = "stroke-width"in h.attrs ? h.attrs["stroke-width"] : 1, h.attr({"stroke-width": o}), h._.dirty = 1, h._.dirtyT = 1, h = h.prev;
    return this._viewBox = [t, e, i, n, !!r], this
  }, t.prototype.renderfix = function () {
    var t, e = this.canvas, i = e.style;
    try {
      t = e.getScreenCTM() || e.createSVGMatrix()
    } catch (n) {
      t = e.createSVGMatrix()
    }
    var r = -t.e % 1, s = -t.f % 1;
    (r || s) && (r && (this._left = (this._left + r) % 1, i.left = this._left + "px"), s && (this._top = (this._top + s) % 1, i.top = this._top + "px"))
  }, t.prototype.clear = function () {
    t.eve("raphael.clear", this);
    for (var e = this.canvas; e.firstChild;)e.removeChild(e.firstChild);
    this.bottom = this.top = null, (this.desc = v("desc")).appendChild(t._g.doc.createTextNode("Created with Raphaël " + t.version)), e.appendChild(this.desc), e.appendChild(this.defs = v("defs"))
  }, t.prototype.remove = function () {
    u("raphael.remove", this), this.canvas.parentNode && this.canvas.parentNode.removeChild(this.canvas);
    for (var e in this)this[e] = "function" == typeof this[e] ? t._removedFactory(e) : null
  };
  var k = t.st;
  for (var M in T)T[e](M) && !k[e](M) && (k[M] = function (t) {
    return function () {
      var e = arguments;
      return this.forEach(function (i) {
        i[t].apply(i, e)
      })
    }
  }(M))
}(window.Raphael), window.Raphael.vml && function (t) {
  var e = "hasOwnProperty", i = String, n = parseFloat, r = Math, s = r.round, a = r.max, o = r.min, l = r.abs, h = "fill", u = /[, ]+/, c = t.eve, d = " progid:DXImageTransform.Microsoft", f = " ", p = "", g = {
    M: "m",
    L: "l",
    C: "c",
    Z: "x",
    m: "t",
    l: "r",
    c: "v",
    z: "x"
  }, v = /([clmz]),?([^clmz]*)/gi, m = / progid:\S+Blur\([^\)]+\)/g, y = /-?[^,\s-]+/g, b = "position:absolute;left:0;top:0;width:1px;height:1px", x = 21600, _ = {
    path: 1,
    rect: 1,
    image: 1
  }, w = {circle: 1, ellipse: 1}, C = function (e) {
    var n = /[ahqstv]/gi, r = t._pathToAbsolute;
    if (i(e).match(n) && (r = t._path2curve), n = /[clmz]/g, r == t._pathToAbsolute && !i(e).match(n)) {
      var a = i(e).replace(v, function (t, e, i) {
        var n = [], r = "m" == e.toLowerCase(), a = g[e];
        return i.replace(y, function (t) {
          r && 2 == n.length && (a += n + g["m" == e ? "l" : "L"], n = []), n.push(s(t * x))
        }), a + n
      });
      return a
    }
    var o, l, h = r(e);
    a = [];
    for (var u = 0, c = h.length; c > u; u++) {
      o = h[u], l = h[u][0].toLowerCase(), "z" == l && (l = "x");
      for (var d = 1, m = o.length; m > d; d++)l += s(o[d] * x) + (d != m - 1 ? "," : p);
      a.push(l)
    }
    return a.join(f)
  }, S = function (e, i, n) {
    var r = t.matrix();
    return r.rotate(-e, .5, .5), {dx: r.x(i, n), dy: r.y(i, n)}
  }, D = function (t, e, i, n, r, s) {
    var a = t._, o = t.matrix, u = a.fillpos, c = t.node, d = c.style, p = 1, g = "", v = x / e, m = x / i;
    if (d.visibility = "hidden", e && i) {
      if (c.coordsize = l(v) + f + l(m), d.rotation = s * (0 > e * i ? -1 : 1), s) {
        var y = S(s, n, r);
        n = y.dx, r = y.dy
      }
      if (0 > e && (g += "x"), 0 > i && (g += " y") && (p = -1), d.flip = g, c.coordorigin = n * -v + f + r * -m, u || a.fillsize) {
        var b = c.getElementsByTagName(h);
        b = b && b[0], c.removeChild(b), u && (y = S(s, o.x(u[0], u[1]), o.y(u[0], u[1])), b.position = y.dx * p + f + y.dy * p), a.fillsize && (b.size = a.fillsize[0] * l(e) + f + a.fillsize[1] * l(i)), c.appendChild(b)
      }
      d.visibility = "visible"
    }
  };
  t.toString = function () {
    return "Your browser doesn’t support SVG. Falling down to VML.\nYou are running Raphaël " + this.version
  };
  var T = function (t, e, n) {
    for (var r = i(e).toLowerCase().split("-"), s = n ? "end" : "start", a = r.length, o = "classic", l = "medium", h = "medium"; a--;)switch (r[a]) {
      case"block":
      case"classic":
      case"oval":
      case"diamond":
      case"open":
      case"none":
        o = r[a];
        break;
      case"wide":
      case"narrow":
        h = r[a];
        break;
      case"long":
      case"short":
        l = r[a]
    }
    var u = t.node.getElementsByTagName("stroke")[0];
    u[s + "arrow"] = o, u[s + "arrowlength"] = l, u[s + "arrowwidth"] = h
  }, k = function (r, l) {
    r.attrs = r.attrs || {};
    var c = r.node, d = r.attrs, g = c.style, v = _[r.type] && (l.x != d.x || l.y != d.y || l.width != d.width || l.height != d.height || l.cx != d.cx || l.cy != d.cy || l.rx != d.rx || l.ry != d.ry || l.r != d.r), m = w[r.type] && (d.cx != l.cx || d.cy != l.cy || d.r != l.r || d.rx != l.rx || d.ry != l.ry), y = r;
    for (var b in l)l[e](b) && (d[b] = l[b]);
    if (v && (d.path = t._getPath[r.type](r), r._.dirty = 1), l.href && (c.href = l.href), l.title && (c.title = l.title), l.target && (c.target = l.target), l.cursor && (g.cursor = l.cursor), "blur"in l && r.blur(l.blur), (l.path && "path" == r.type || v) && (c.path = C(~i(d.path).toLowerCase().indexOf("r") ? t._pathToAbsolute(d.path) : d.path), "image" == r.type && (r._.fillpos = [d.x, d.y], r._.fillsize = [d.width, d.height], D(r, 1, 1, 0, 0, 0))), "transform"in l && r.transform(l.transform), m) {
      var S = +d.cx, k = +d.cy, I = +d.rx || +d.r || 0, F = +d.ry || +d.r || 0;
      c.path = t.format("ar{0},{1},{2},{3},{4},{1},{4},{1}x", s((S - I) * x), s((k - F) * x), s((S + I) * x), s((k + F) * x), s(S * x))
    }
    if ("clip-rect"in l) {
      var R = i(l["clip-rect"]).split(u);
      if (4 == R.length) {
        R[2] = +R[2] + +R[0], R[3] = +R[3] + +R[1];
        var P = c.clipRect || t._g.doc.createElement("div"), L = P.style;
        L.clip = t.format("rect({1}px {2}px {3}px {0}px)", R), c.clipRect || (L.position = "absolute", L.top = 0, L.left = 0, L.width = r.paper.width + "px", L.height = r.paper.height + "px", c.parentNode.insertBefore(P, c), P.appendChild(c), c.clipRect = P)
      }
      l["clip-rect"] || c.clipRect && (c.clipRect.style.clip = "auto")
    }
    if (r.textpath) {
      var E = r.textpath.style;
      l.font && (E.font = l.font), l["font-family"] && (E.fontFamily = '"' + l["font-family"].split(",")[0].replace(/^['"]+|['"]+$/g, p) + '"'), l["font-size"] && (E.fontSize = l["font-size"]), l["font-weight"] && (E.fontWeight = l["font-weight"]), l["font-style"] && (E.fontStyle = l["font-style"])
    }
    if ("arrow-start"in l && T(y, l["arrow-start"]), "arrow-end"in l && T(y, l["arrow-end"], 1), null != l.opacity || null != l["stroke-width"] || null != l.fill || null != l.src || null != l.stroke || null != l["stroke-width"] || null != l["stroke-opacity"] || null != l["fill-opacity"] || null != l["stroke-dasharray"] || null != l["stroke-miterlimit"] || null != l["stroke-linejoin"] || null != l["stroke-linecap"]) {
      var H = c.getElementsByTagName(h), N = !1;
      if (H = H && H[0], !H && (N = H = A(h)), "image" == r.type && l.src && (H.src = l.src), l.fill && (H.on = !0), (null == H.on || "none" == l.fill || null === l.fill) && (H.on = !1), H.on && l.fill) {
        var B = i(l.fill).match(t._ISURL);
        if (B) {
          H.parentNode == c && c.removeChild(H), H.rotate = !0, H.src = B[1], H.type = "tile";
          var j = r.getBBox(1);
          H.position = j.x + f + j.y, r._.fillpos = [j.x, j.y], t._preload(B[1], function () {
            r._.fillsize = [this.offsetWidth, this.offsetHeight]
          })
        } else H.color = t.getRGB(l.fill).hex, H.src = p, H.type = "solid", t.getRGB(l.fill).error && (y.type in{
          circle: 1,
          ellipse: 1
        } || "r" != i(l.fill).charAt()) && M(y, l.fill, H) && (d.fill = "none", d.gradient = l.fill, H.rotate = !1)
      }
      if ("fill-opacity"in l || "opacity"in l) {
        var W = ((+d["fill-opacity"] + 1 || 2) - 1) * ((+d.opacity + 1 || 2) - 1) * ((+t.getRGB(l.fill).o + 1 || 2) - 1);
        W = o(a(W, 0), 1), H.opacity = W, H.src && (H.color = "none")
      }
      c.appendChild(H);
      var O = c.getElementsByTagName("stroke") && c.getElementsByTagName("stroke")[0], $ = !1;
      !O && ($ = O = A("stroke")), (l.stroke && "none" != l.stroke || l["stroke-width"] || null != l["stroke-opacity"] || l["stroke-dasharray"] || l["stroke-miterlimit"] || l["stroke-linejoin"] || l["stroke-linecap"]) && (O.on = !0), ("none" == l.stroke || null === l.stroke || null == O.on || 0 == l.stroke || 0 == l["stroke-width"]) && (O.on = !1);
      var q = t.getRGB(l.stroke);
      O.on && l.stroke && (O.color = q.hex), W = ((+d["stroke-opacity"] + 1 || 2) - 1) * ((+d.opacity + 1 || 2) - 1) * ((+q.o + 1 || 2) - 1);
      var z = .75 * (n(l["stroke-width"]) || 1);
      if (W = o(a(W, 0), 1), null == l["stroke-width"] && (z = d["stroke-width"]), l["stroke-width"] && (O.weight = z), z && 1 > z && (W *= z) && (O.weight = 1), O.opacity = W, l["stroke-linejoin"] && (O.joinstyle = l["stroke-linejoin"] || "miter"), O.miterlimit = l["stroke-miterlimit"] || 8, l["stroke-linecap"] && (O.endcap = "butt" == l["stroke-linecap"] ? "flat" : "square" == l["stroke-linecap"] ? "square" : "round"), l["stroke-dasharray"]) {
        var U = {
          "-": "shortdash",
          ".": "shortdot",
          "-.": "shortdashdot",
          "-..": "shortdashdotdot",
          ". ": "dot",
          "- ": "dash",
          "--": "longdash",
          "- .": "dashdot",
          "--.": "longdashdot",
          "--..": "longdashdotdot"
        };
        O.dashstyle = U[e](l["stroke-dasharray"]) ? U[l["stroke-dasharray"]] : p
      }
      $ && c.appendChild(O)
    }
    if ("text" == y.type) {
      y.paper.canvas.style.display = p;
      var X = y.paper.span, V = 100, Y = d.font && d.font.match(/\d+(?:\.\d*)?(?=px)/);
      g = X.style, d.font && (g.font = d.font), d["font-family"] && (g.fontFamily = d["font-family"]), d["font-weight"] && (g.fontWeight = d["font-weight"]), d["font-style"] && (g.fontStyle = d["font-style"]), Y = n(d["font-size"] || Y && Y[0]) || 10, g.fontSize = Y * V + "px", y.textpath.string && (X.innerHTML = i(y.textpath.string).replace(/</g, "&#60;").replace(/&/g, "&#38;").replace(/\n/g, "<br>"));
      var G = X.getBoundingClientRect();
      y.W = d.w = (G.right - G.left) / V, y.H = d.h = (G.bottom - G.top) / V, y.X = d.x, y.Y = d.y + y.H / 2, ("x"in l || "y"in l) && (y.path.v = t.format("m{0},{1}l{2},{1}", s(d.x * x), s(d.y * x), s(d.x * x) + 1));
      for (var J = ["x", "y", "text", "font", "font-family", "font-weight", "font-style", "font-size"], Q = 0, Z = J.length; Z > Q; Q++)if (J[Q]in l) {
        y._.dirty = 1;
        break
      }
      switch (d["text-anchor"]) {
        case"start":
          y.textpath.style["v-text-align"] = "left", y.bbx = y.W / 2;
          break;
        case"end":
          y.textpath.style["v-text-align"] = "right", y.bbx = -y.W / 2;
          break;
        default:
          y.textpath.style["v-text-align"] = "center", y.bbx = 0
      }
      y.textpath.style["v-text-kern"] = !0
    }
  }, M = function (e, s, a) {
    e.attrs = e.attrs || {};
    var o = (e.attrs, Math.pow), l = "linear", h = ".5 .5";
    if (e.attrs.gradient = s, s = i(s).replace(t._radial_gradient, function (t, e, i) {
        return l = "radial", e && i && (e = n(e), i = n(i), o(e - .5, 2) + o(i - .5, 2) > .25 && (i = r.sqrt(.25 - o(e - .5, 2)) * (2 * (i > .5) - 1) + .5), h = e + f + i), p
      }), s = s.split(/\s*\-\s*/), "linear" == l) {
      var u = s.shift();
      if (u = -n(u), isNaN(u))return null
    }
    var c = t._parseDots(s);
    if (!c)return null;
    if (e = e.shape || e.node, c.length) {
      e.removeChild(a), a.on = !0, a.method = "none", a.color = c[0].color, a.color2 = c[c.length - 1].color;
      for (var d = [], g = 0, v = c.length; v > g; g++)c[g].offset && d.push(c[g].offset + f + c[g].color);
      a.colors = d.length ? d.join() : "0% " + a.color, "radial" == l ? (a.type = "gradientTitle", a.focus = "100%", a.focussize = "0 0", a.focusposition = h, a.angle = 0) : (a.type = "gradient", a.angle = (270 - u) % 360), e.appendChild(a)
    }
    return 1
  }, I = function (e, i) {
    this[0] = this.node = e, e.raphael = !0, this.id = t._oid++, e.raphaelid = this.id, this.X = 0, this.Y = 0, this.attrs = {}, this.paper = i, this.matrix = t.matrix(), this._ = {
      transform: [],
      sx: 1,
      sy: 1,
      dx: 0,
      dy: 0,
      deg: 0,
      dirty: 1,
      dirtyT: 1
    }, !i.bottom && (i.bottom = this), this.prev = i.top, i.top && (i.top.next = this), i.top = this, this.next = null
  }, F = t.el;
  I.prototype = F, F.constructor = I, F.transform = function (e) {
    if (null == e)return this._.transform;
    var n, r = this.paper._viewBoxShift, s = r ? "s" + [r.scale, r.scale] + "-1-1t" + [r.dx, r.dy] : p;
    r && (n = e = i(e).replace(/\.{3}|\u2026/g, this._.transform || p)), t._extractTransform(this, s + e);
    var a, o = this.matrix.clone(), l = this.skew, h = this.node, u = ~i(this.attrs.fill).indexOf("-"), c = !i(this.attrs.fill).indexOf("url(");
    if (o.translate(-.5, -.5), c || u || "image" == this.type)if (l.matrix = "1 0 0 1", l.offset = "0 0", a = o.split(), u && a.noRotation || !a.isSimple) {
      h.style.filter = o.toFilter();
      var d = this.getBBox(), g = this.getBBox(1), v = d.x - g.x, m = d.y - g.y;
      h.coordorigin = v * -x + f + m * -x, D(this, 1, 1, v, m, 0)
    } else h.style.filter = p, D(this, a.scalex, a.scaley, a.dx, a.dy, a.rotate); else h.style.filter = p, l.matrix = i(o), l.offset = o.offset();
    return n && (this._.transform = n), this
  }, F.rotate = function (t, e, r) {
    if (this.removed)return this;
    if (null != t) {
      if (t = i(t).split(u), t.length - 1 && (e = n(t[1]), r = n(t[2])), t = n(t[0]), null == r && (e = r), null == e || null == r) {
        var s = this.getBBox(1);
        e = s.x + s.width / 2, r = s.y + s.height / 2
      }
      return this._.dirtyT = 1, this.transform(this._.transform.concat([["r", t, e, r]])), this
    }
  }, F.translate = function (t, e) {
    return this.removed ? this : (t = i(t).split(u), t.length - 1 && (e = n(t[1])), t = n(t[0]) || 0, e = +e || 0, this._.bbox && (this._.bbox.x += t, this._.bbox.y += e), this.transform(this._.transform.concat([["t", t, e]])), this)
  }, F.scale = function (t, e, r, s) {
    if (this.removed)return this;
    if (t = i(t).split(u), t.length - 1 && (e = n(t[1]), r = n(t[2]), s = n(t[3]), isNaN(r) && (r = null), isNaN(s) && (s = null)), t = n(t[0]), null == e && (e = t), null == s && (r = s), null == r || null == s)var a = this.getBBox(1);
    return r = null == r ? a.x + a.width / 2 : r, s = null == s ? a.y + a.height / 2 : s, this.transform(this._.transform.concat([["s", t, e, r, s]])), this._.dirtyT = 1, this
  }, F.hide = function () {
    return !this.removed && (this.node.style.display = "none"), this
  }, F.show = function () {
    return !this.removed && (this.node.style.display = p), this
  }, F._getBBox = function () {
    return this.removed ? {} : {
      x: this.X + (this.bbx || 0) - this.W / 2,
      y: this.Y - this.H,
      width: this.W,
      height: this.H
    }
  }, F.remove = function () {
    if (!this.removed && this.node.parentNode) {
      this.paper.__set__ && this.paper.__set__.exclude(this), t.eve.unbind("raphael.*.*." + this.id), t._tear(this, this.paper), this.node.parentNode.removeChild(this.node), this.shape && this.shape.parentNode.removeChild(this.shape);
      for (var e in this)this[e] = "function" == typeof this[e] ? t._removedFactory(e) : null;
      this.removed = !0
    }
  }, F.attr = function (i, n) {
    if (this.removed)return this;
    if (null == i) {
      var r = {};
      for (var s in this.attrs)this.attrs[e](s) && (r[s] = this.attrs[s]);
      return r.gradient && "none" == r.fill && (r.fill = r.gradient) && delete r.gradient, r.transform = this._.transform, r
    }
    if (null == n && t.is(i, "string")) {
      if (i == h && "none" == this.attrs.fill && this.attrs.gradient)return this.attrs.gradient;
      for (var a = i.split(u), o = {}, l = 0, d = a.length; d > l; l++)i = a[l], o[i] = i in this.attrs ? this.attrs[i] : t.is(this.paper.customAttributes[i], "function") ? this.paper.customAttributes[i].def : t._availableAttrs[i];
      return d - 1 ? o : o[a[0]]
    }
    if (this.attrs && null == n && t.is(i, "array")) {
      for (o = {}, l = 0, d = i.length; d > l; l++)o[i[l]] = this.attr(i[l]);
      return o
    }
    var f;
    null != n && (f = {}, f[i] = n), null == n && t.is(i, "object") && (f = i);
    for (var p in f)c("raphael.attr." + p + "." + this.id, this, f[p]);
    if (f) {
      for (p in this.paper.customAttributes)if (this.paper.customAttributes[e](p) && f[e](p) && t.is(this.paper.customAttributes[p], "function")) {
        var g = this.paper.customAttributes[p].apply(this, [].concat(f[p]));
        this.attrs[p] = f[p];
        for (var v in g)g[e](v) && (f[v] = g[v])
      }
      f.text && "text" == this.type && (this.textpath.string = f.text), k(this, f)
    }
    return this
  }, F.toFront = function () {
    return !this.removed && this.node.parentNode.appendChild(this.node), this.paper && this.paper.top != this && t._tofront(this, this.paper), this
  }, F.toBack = function () {
    return this.removed ? this : (this.node.parentNode.firstChild != this.node && (this.node.parentNode.insertBefore(this.node, this.node.parentNode.firstChild), t._toback(this, this.paper)), this)
  }, F.insertAfter = function (e) {
    return this.removed ? this : (e.constructor == t.st.constructor && (e = e[e.length - 1]), e.node.nextSibling ? e.node.parentNode.insertBefore(this.node, e.node.nextSibling) : e.node.parentNode.appendChild(this.node), t._insertafter(this, e, this.paper), this)
  }, F.insertBefore = function (e) {
    return this.removed ? this : (e.constructor == t.st.constructor && (e = e[0]), e.node.parentNode.insertBefore(this.node, e.node), t._insertbefore(this, e, this.paper), this)
  }, F.blur = function (e) {
    var i = this.node.runtimeStyle, n = i.filter;
    n = n.replace(m, p), 0 !== +e ? (this.attrs.blur = e, i.filter = n + f + d + ".Blur(pixelradius=" + (+e || 1.5) + ")", i.margin = t.format("-{0}px 0 0 -{0}px", s(+e || 1.5))) : (i.filter = n, i.margin = 0, delete this.attrs.blur)
  }, t._engine.path = function (t, e) {
    var i = A("shape");
    i.style.cssText = b, i.coordsize = x + f + x, i.coordorigin = e.coordorigin;
    var n = new I(i, e), r = {fill: "none", stroke: "#000"};
    t && (r.path = t), n.type = "path", n.path = [], n.Path = p, k(n, r), e.canvas.appendChild(i);
    var s = A("skew");
    return s.on = !0, i.appendChild(s), n.skew = s, n.transform(p), n
  }, t._engine.rect = function (e, i, n, r, s, a) {
    var o = t._rectPath(i, n, r, s, a), l = e.path(o), h = l.attrs;
    return l.X = h.x = i, l.Y = h.y = n, l.W = h.width = r, l.H = h.height = s, h.r = a, h.path = o, l.type = "rect", l
  }, t._engine.ellipse = function (t, e, i, n, r) {
    var s = t.path();
    return s.attrs, s.X = e - n, s.Y = i - r, s.W = 2 * n, s.H = 2 * r, s.type = "ellipse", k(s, {
      cx: e,
      cy: i,
      rx: n,
      ry: r
    }), s
  }, t._engine.circle = function (t, e, i, n) {
    var r = t.path();
    return r.attrs, r.X = e - n, r.Y = i - n, r.W = r.H = 2 * n, r.type = "circle", k(r, {cx: e, cy: i, r: n}), r
  }, t._engine.image = function (e, i, n, r, s, a) {
    var o = t._rectPath(n, r, s, a), l = e.path(o).attr({stroke: "none"}), u = l.attrs, c = l.node, d = c.getElementsByTagName(h)[0];
    return u.src = i, l.X = u.x = n, l.Y = u.y = r, l.W = u.width = s, l.H = u.height = a, u.path = o, l.type = "image", d.parentNode == c && c.removeChild(d), d.rotate = !0, d.src = i, d.type = "tile", l._.fillpos = [n, r], l._.fillsize = [s, a], c.appendChild(d), D(l, 1, 1, 0, 0, 0), l
  }, t._engine.text = function (e, n, r, a) {
    var o = A("shape"), l = A("path"), h = A("textpath");
    n = n || 0, r = r || 0, a = a || "", l.v = t.format("m{0},{1}l{2},{1}", s(n * x), s(r * x), s(n * x) + 1), l.textpathok = !0, h.string = i(a), h.on = !0, o.style.cssText = b, o.coordsize = x + f + x, o.coordorigin = "0 0";
    var u = new I(o, e), c = {fill: "#000", stroke: "none", font: t._availableAttrs.font, text: a};
    u.shape = o, u.path = l, u.textpath = h, u.type = "text", u.attrs.text = i(a), u.attrs.x = n, u.attrs.y = r, u.attrs.w = 1, u.attrs.h = 1, k(u, c), o.appendChild(h), o.appendChild(l), e.canvas.appendChild(o);
    var d = A("skew");
    return d.on = !0, o.appendChild(d), u.skew = d, u.transform(p), u
  }, t._engine.setSize = function (e, i) {
    var n = this.canvas.style;
    return this.width = e, this.height = i, e == +e && (e += "px"), i == +i && (i += "px"), n.width = e, n.height = i, n.clip = "rect(0 " + e + " " + i + " 0)", this._viewBox && t._engine.setViewBox.apply(this, this._viewBox), this
  }, t._engine.setViewBox = function (e, i, n, r, s) {
    t.eve("raphael.setViewBox", this, this._viewBox, [e, i, n, r, s]);
    var o, l, h = this.width, u = this.height, c = 1 / a(n / h, r / u);
    return s && (o = u / r, l = h / n, h > n * o && (e -= (h - n * o) / 2 / o), u > r * l && (i -= (u - r * l) / 2 / l)), this._viewBox = [e, i, n, r, !!s], this._viewBoxShift = {
      dx: -e,
      dy: -i,
      scale: c
    }, this.forEach(function (t) {
      t.transform("...")
    }), this
  };
  var A;
  t._engine.initWin = function (t) {
    var e = t.document;
    e.createStyleSheet().addRule(".rvml", "behavior:url(#default#VML)");
    try {
      !e.namespaces.rvml && e.namespaces.add("rvml", "urn:schemas-microsoft-com:vml"), A = function (t) {
        return e.createElement("<rvml:" + t + ' class="rvml">')
      }
    } catch (i) {
      A = function (t) {
        return e.createElement("<" + t + ' xmlns="urn:schemas-microsoft.com:vml" class="rvml">')
      }
    }
  }, t._engine.initWin(t._g.win), t._engine.create = function () {
    var e = t._getContainer.apply(0, arguments), i = e.container, n = e.height, r = e.width, s = e.x, a = e.y;
    if (!i)throw new Error("VML container not found.");
    var o = new t._Paper, l = o.canvas = t._g.doc.createElement("div"), h = l.style;
    return s = s || 0, a = a || 0, r = r || 512, n = n || 342, o.width = r, o.height = n, r == +r && (r += "px"), n == +n && (n += "px"), o.coordsize = 1e3 * x + f + 1e3 * x, o.coordorigin = "0 0", o.span = t._g.doc.createElement("span"), o.span.style.cssText = "position:absolute;left:-9999em;top:-9999em;padding:0;margin:0;line-height:1;", l.appendChild(o.span), h.cssText = t.format("top:0;left:0;width:{0};height:{1};display:inline-block;position:relative;clip:rect(0 {0} {1} 0);overflow:hidden", r, n), 1 == i ? (t._g.doc.body.appendChild(l), h.left = s + "px", h.top = a + "px", h.position = "absolute") : i.firstChild ? i.insertBefore(l, i.firstChild) : i.appendChild(l), o.renderfix = function () {
    }, o
  }, t.prototype.clear = function () {
    t.eve("raphael.clear", this), this.canvas.innerHTML = p, this.span = t._g.doc.createElement("span"), this.span.style.cssText = "position:absolute;left:-9999em;top:-9999em;padding:0;margin:0;line-height:1;display:inline;", this.canvas.appendChild(this.span), this.bottom = this.top = null
  }, t.prototype.remove = function () {
    t.eve("raphael.remove", this), this.canvas.parentNode.removeChild(this.canvas);
    for (var e in this)this[e] = "function" == typeof this[e] ? t._removedFactory(e) : null;
    return !0
  };
  var R = t.st;
  for (var P in F)F[e](P) && !R[e](P) && (R[P] = function (t) {
    return function () {
      var e = arguments;
      return this.forEach(function (i) {
        i[t].apply(i, e)
      })
    }
  }(P))
}(window.Raphael), function () {
  var t, e, i, n, r = [].slice, s = {}.hasOwnProperty, a = function (t, e) {
    function i() {
      this.constructor = t
    }

    for (var n in e)s.call(e, n) && (t[n] = e[n]);
    return i.prototype = e.prototype, t.prototype = new i, t.__super__ = e.prototype, t
  }, o = function (t, e) {
    return function () {
      return t.apply(e, arguments)
    }
  }, l = [].indexOf || function (t) {
      for (var e = 0, i = this.length; i > e; e++)if (e in this && this[e] === t)return e;
      return -1
    };
  e = window.Morris = {}, t = jQuery, e.EventEmitter = function () {
    function t() {
    }

    return t.prototype.on = function (t, e) {
      return null == this.handlers && (this.handlers = {}), null == this.handlers[t] && (this.handlers[t] = []), this.handlers[t].push(e), this
    }, t.prototype.fire = function () {
      var t, e, i, n, s, a, o;
      if (i = arguments[0], t = 2 <= arguments.length ? r.call(arguments, 1) : [], null != this.handlers && null != this.handlers[i]) {
        for (a = this.handlers[i], o = [], n = 0, s = a.length; s > n; n++)e = a[n], o.push(e.apply(null, t));
        return o
      }
    }, t
  }(), e.commas = function (t) {
    var e, i, n, r;
    return null != t ? (n = 0 > t ? "-" : "", e = Math.abs(t), i = Math.floor(e).toFixed(0), n += i.replace(/(?=(?:\d{3})+$)(?!^)/g, ","), r = e.toString(), r.length > i.length && (n += r.slice(i.length)), n) : "-"
  }, e.pad2 = function (t) {
    return (10 > t ? "0" : "") + t
  }, e.Grid = function (i) {
    function n(e) {
      var i = this;
      if (this.el = "string" == typeof e.element ? t(document.getElementById(e.element)) : t(e.element), null == this.el || 0 === this.el.length)throw new Error("Graph container element not found");
      "static" === this.el.css("position") && this.el.css("position", "relative"), this.options = t.extend({}, this.gridDefaults, this.defaults || {}, e), "string" == typeof this.options.units && (this.options.postUnits = e.units), this.raphael = new Raphael(this.el[0]), this.elementWidth = null, this.elementHeight = null, this.dirty = !1, this.init && this.init(), this.setData(this.options.data), this.el.bind("mousemove", function (t) {
        var e;
        return e = i.el.offset(), i.fire("hovermove", t.pageX - e.left, t.pageY - e.top)
      }), this.el.bind("mouseout", function () {
        return i.fire("hoverout")
      }), this.el.bind("touchstart touchmove touchend", function (t) {
        var e, n;
        return n = t.originalEvent.touches[0] || t.originalEvent.changedTouches[0], e = i.el.offset(), i.fire("hover", n.pageX - e.left, n.pageY - e.top), n
      }), this.el.bind("click", function (t) {
        var e;
        return e = i.el.offset(), i.fire("gridclick", t.pageX - e.left, t.pageY - e.top)
      }), this.postInit && this.postInit()
    }

    return a(n, i), n.prototype.gridDefaults = {
      dateFormat: null,
      axes: !0,
      grid: !0,
      gridLineColor: "#aaa",
      gridStrokeWidth: .5,
      gridTextColor: "#888",
      gridTextSize: 12,
      gridTextFamily: "sans-serif",
      gridTextWeight: "normal",
      hideHover: !1,
      yLabelFormat: null,
      xLabelAngle: 0,
      numLines: 5,
      padding: 25,
      parseTime: !0,
      postUnits: "",
      preUnits: "",
      ymax: "auto",
      ymin: "auto 0",
      goals: [],
      goalStrokeWidth: 1,
      goalLineColors: ["#666633", "#999966", "#cc6666", "#663333"],
      events: [],
      eventStrokeWidth: 1,
      eventLineColors: ["#005a04", "#ccffbb", "#3a5f0b", "#005502"]
    }, n.prototype.setData = function (t, i) {
      var n, r, s, a, o, l, h, u, c, d, f, p, g, v;
      return null == i && (i = !0), this.options.data = t, null == t || 0 === t.length ? (this.data = [], this.raphael.clear(), null != this.hover && this.hover.hide(), void 0) : (p = this.cumulative ? 0 : null, g = this.cumulative ? 0 : null, this.options.goals.length > 0 && (o = Math.min.apply(null, this.options.goals), a = Math.max.apply(null, this.options.goals), g = null != g ? Math.min(g, o) : o, p = null != p ? Math.max(p, a) : a), this.data = function () {
        var i, n, a;
        for (a = [], s = i = 0, n = t.length; n > i; s = ++i)h = t[s], l = {}, l.label = h[this.options.xkey], this.options.parseTime ? (l.x = e.parseDate(l.label), this.options.dateFormat ? l.label = this.options.dateFormat(l.x) : "number" == typeof l.label && (l.label = new Date(l.label).toString())) : (l.x = s, this.options.xLabelFormat && (l.label = this.options.xLabelFormat(l))), c = 0, l.y = function () {
          var t, e, i, n;
          for (i = this.options.ykeys, n = [], r = t = 0, e = i.length; e > t; r = ++t)f = i[r], v = h[f], "string" == typeof v && (v = parseFloat(v)), null != v && "number" != typeof v && (v = null), null != v && (this.cumulative ? c += v : null != p ? (p = Math.max(v, p), g = Math.min(v, g)) : p = g = v), this.cumulative && null != c && (p = Math.max(c, p), g = Math.min(c, g)), n.push(v);
          return n
        }.call(this), a.push(l);
        return a
      }.call(this), this.options.parseTime && (this.data = this.data.sort(function (t, e) {
        return (t.x > e.x) - (e.x > t.x)
      })), this.xmin = this.data[0].x, this.xmax = this.data[this.data.length - 1].x, this.events = [], this.options.parseTime && this.options.events.length > 0 && (this.events = function () {
        var t, i, r, s;
        for (r = this.options.events, s = [], t = 0, i = r.length; i > t; t++)n = r[t], s.push(e.parseDate(n));
        return s
      }.call(this), this.xmax = Math.max(this.xmax, Math.max.apply(null, this.events)), this.xmin = Math.min(this.xmin, Math.min.apply(null, this.events))), this.xmin === this.xmax && (this.xmin -= 1, this.xmax += 1), this.ymin = this.yboundary("min", g), this.ymax = this.yboundary("max", p), this.ymin === this.ymax && (g && (this.ymin -= 1), this.ymax += 1), (this.options.axes === !0 || this.options.grid === !0) && (this.options.ymax === this.gridDefaults.ymax && this.options.ymin === this.gridDefaults.ymin ? (this.grid = this.autoGridLines(this.ymin, this.ymax, this.options.numLines), this.ymin = Math.min(this.ymin, this.grid[0]), this.ymax = Math.max(this.ymax, this.grid[this.grid.length - 1])) : (u = (this.ymax - this.ymin) / (this.options.numLines - 1), this.grid = function () {
        var t, e, i, n;
        for (n = [], d = t = e = this.ymin, i = this.ymax; i >= e ? i >= t : t >= i; d = t += u)n.push(d);
        return n
      }.call(this))), this.dirty = !0, i ? this.redraw() : void 0)
    }, n.prototype.yboundary = function (t, e) {
      var i, n;
      return i = this.options["y" + t], "string" == typeof i ? "auto" === i.slice(0, 4) ? i.length > 5 ? (n = parseInt(i.slice(5), 10), null == e ? n : Math[t](e, n)) : null != e ? e : 0 : parseInt(i, 10) : i
    }, n.prototype.autoGridLines = function (t, e, i) {
      var n, r, s, a, o, l, h, u, c;
      return o = e - t, c = Math.floor(Math.log(o) / Math.log(10)), h = Math.pow(10, c), r = Math.floor(t / h) * h, n = Math.ceil(e / h) * h, l = (n - r) / (i - 1), 1 === h && l > 1 && Math.ceil(l) !== l && (l = Math.ceil(l), n = r + l * (i - 1)), 0 > r && n > 0 && (r = Math.floor(t / l) * l, n = Math.ceil(e / l) * l), 1 > l ? (a = Math.floor(Math.log(l) / Math.log(10)), s = function () {
        var t, e;
        for (e = [], u = t = r; n >= r ? n >= t : t >= n; u = t += l)e.push(parseFloat(u.toFixed(1 - a)));
        return e
      }()) : s = function () {
        var t, e;
        for (e = [], u = t = r; n >= r ? n >= t : t >= n; u = t += l)e.push(u);
        return e
      }(), s
    }, n.prototype._calc = function () {
      var t, e, i, n, r, s;
      return r = this.el.width(), i = this.el.height(), (this.elementWidth !== r || this.elementHeight !== i || this.dirty) && (this.elementWidth = r, this.elementHeight = i, this.dirty = !1, this.left = this.options.padding, this.right = this.elementWidth - this.options.padding, this.top = this.options.padding, this.bottom = this.elementHeight - this.options.padding, this.options.axes && (s = function () {
        var t, i, n, r;
        for (n = this.grid, r = [], t = 0, i = n.length; i > t; t++)e = n[t], r.push(this.measureText(this.yAxisFormat(e)).width);
        return r
      }.call(this), this.left += Math.max.apply(Math, s), t = function () {
        var t, e, i;
        for (i = [], n = t = 0, e = this.data.length; e >= 0 ? e > t : t > e; n = e >= 0 ? ++t : --t)i.push(this.measureText(this.data[n].text, -this.options.xLabelAngle).height);
        return i
      }.call(this), this.bottom -= Math.max.apply(Math, t)), this.width = Math.max(1, this.right - this.left), this.height = Math.max(1, this.bottom - this.top), this.dx = this.width / (this.xmax - this.xmin), this.dy = this.height / (this.ymax - this.ymin), this.calc) ? this.calc() : void 0
    }, n.prototype.transY = function (t) {
      return this.bottom - (t - this.ymin) * this.dy
    }, n.prototype.transX = function (t) {
      return 1 === this.data.length ? (this.left + this.right) / 2 : this.left + (t - this.xmin) * this.dx
    }, n.prototype.redraw = function () {
      return this.raphael.clear(), this._calc(), this.drawGrid(), this.drawGoals(), this.drawEvents(), this.draw ? this.draw() : void 0
    }, n.prototype.measureText = function (t, e) {
      var i, n;
      return null == e && (e = 0), n = this.raphael.text(100, 100, t).attr("font-size", this.options.gridTextSize).attr("font-family", this.options.gridTextFamily).attr("font-weight", this.options.gridTextWeight).rotate(e), i = n.getBBox(), n.remove(), i
    }, n.prototype.yAxisFormat = function (t) {
      return this.yLabelFormat(t)
    }, n.prototype.yLabelFormat = function (t) {
      return "function" == typeof this.options.yLabelFormat ? this.options.yLabelFormat(t) : "" + this.options.preUnits + e.commas(t) + this.options.postUnits
    }, n.prototype.updateHover = function (t, e) {
      var i, n;
      return i = this.hitTest(t, e), null != i ? (n = this.hover).update.apply(n, i) : void 0
    }, n.prototype.drawGrid = function () {
      var t, e, i, n, r, s;
      if (this.options.grid !== !1 || this.options.axes !== !1) {
        for (r = this.grid, s = [], i = 0, n = r.length; n > i; i++)t = r[i], e = this.transY(t), this.options.axes && this.drawYAxisLabel(this.left - this.options.padding / 2, e, this.yAxisFormat(t)), this.options.grid ? s.push(this.drawGridLine("M" + this.left + "," + e + "H" + (this.left + this.width))) : s.push(void 0);
        return s
      }
    }, n.prototype.drawGoals = function () {
      var t, e, i, n, r, s, a;
      for (s = this.options.goals, a = [], i = n = 0, r = s.length; r > n; i = ++n)e = s[i], t = this.options.goalLineColors[i % this.options.goalLineColors.length], a.push(this.drawGoal(e, t));
      return a
    }, n.prototype.drawEvents = function () {
      var t, e, i, n, r, s, a;
      for (s = this.events, a = [], i = n = 0, r = s.length; r > n; i = ++n)e = s[i], t = this.options.eventLineColors[i % this.options.eventLineColors.length], a.push(this.drawEvent(e, t));
      return a
    }, n.prototype.drawGoal = function (t, e) {
      return this.raphael.path("M" + this.left + "," + this.transY(t) + "H" + this.right).attr("stroke", e).attr("stroke-width", this.options.goalStrokeWidth)
    }, n.prototype.drawEvent = function (t, e) {
      return this.raphael.path("M" + this.transX(t) + "," + this.bottom + "V" + this.top).attr("stroke", e).attr("stroke-width", this.options.eventStrokeWidth)
    }, n.prototype.drawYAxisLabel = function (t, e, i) {
      return this.raphael.text(t, e, i).attr("font-size", this.options.gridTextSize).attr("font-family", this.options.gridTextFamily).attr("font-weight", this.options.gridTextWeight).attr("fill", this.options.gridTextColor).attr("text-anchor", "end")
    }, n.prototype.drawGridLine = function (t) {
      return this.raphael.path(t).attr("stroke", this.options.gridLineColor).attr("stroke-width", this.options.gridStrokeWidth)
    }, n
  }(e.EventEmitter), e.parseDate = function (t) {
    var e, i, n, r, s, a, o, l, h, u, c;
    return "number" == typeof t ? t : (i = t.match(/^(\d+) Q(\d)$/), r = t.match(/^(\d+)-(\d+)$/), s = t.match(/^(\d+)-(\d+)-(\d+)$/), o = t.match(/^(\d+) W(\d+)$/), l = t.match(/^(\d+)-(\d+)-(\d+)[ T](\d+):(\d+)(Z|([+-])(\d\d):?(\d\d))?$/), h = t.match(/^(\d+)-(\d+)-(\d+)[ T](\d+):(\d+):(\d+(\.\d+)?)(Z|([+-])(\d\d):?(\d\d))?$/), i ? new Date(parseInt(i[1], 10), 3 * parseInt(i[2], 10) - 1, 1).getTime() : r ? new Date(parseInt(r[1], 10), parseInt(r[2], 10) - 1, 1).getTime() : s ? new Date(parseInt(s[1], 10), parseInt(s[2], 10) - 1, parseInt(s[3], 10)).getTime() : o ? (u = new Date(parseInt(o[1], 10), 0, 1), 4 !== u.getDay() && u.setMonth(0, 1 + (4 - u.getDay() + 7) % 7), u.getTime() + 6048e5 * parseInt(o[2], 10)) : l ? l[6] ? (a = 0, "Z" !== l[6] && (a = 60 * parseInt(l[8], 10) + parseInt(l[9], 10), "+" === l[7] && (a = 0 - a)), Date.UTC(parseInt(l[1], 10), parseInt(l[2], 10) - 1, parseInt(l[3], 10), parseInt(l[4], 10), parseInt(l[5], 10) + a)) : new Date(parseInt(l[1], 10), parseInt(l[2], 10) - 1, parseInt(l[3], 10), parseInt(l[4], 10), parseInt(l[5], 10)).getTime() : h ? (c = parseFloat(h[6]), e = Math.floor(c), n = Math.round(1e3 * (c - e)), h[8] ? (a = 0, "Z" !== h[8] && (a = 60 * parseInt(h[10], 10) + parseInt(h[11], 10), "+" === h[9] && (a = 0 - a)), Date.UTC(parseInt(h[1], 10), parseInt(h[2], 10) - 1, parseInt(h[3], 10), parseInt(h[4], 10), parseInt(h[5], 10) + a, e, n)) : new Date(parseInt(h[1], 10), parseInt(h[2], 10) - 1, parseInt(h[3], 10), parseInt(h[4], 10), parseInt(h[5], 10), e, n).getTime()) : new Date(parseInt(t, 10), 0, 1).getTime())
  }, e.Hover = function () {
    function i(i) {
      null == i && (i = {}), this.options = t.extend({}, e.Hover.defaults, i), this.el = t("<div class='" + this.options["class"] + "'></div>"), this.el.hide(), this.options.parent.append(this.el)
    }

    return i.defaults = {"class": "morris-hover morris-default-style"}, i.prototype.update = function (t, e, i) {
      return this.html(t), this.show(), this.moveTo(e, i)
    }, i.prototype.html = function (t) {
      return this.el.html(t)
    }, i.prototype.moveTo = function (t, e) {
      var i, n, r, s, a, o;
      return a = this.options.parent.innerWidth(), s = this.options.parent.innerHeight(), n = this.el.outerWidth(), i = this.el.outerHeight(), r = Math.min(Math.max(0, t - n / 2), a - n), null != e ? (o = e - i - 10, 0 > o && (o = e + 10, o + i > s && (o = s / 2 - i / 2))) : o = s / 2 - i / 2, this.el.css({
        left: r + "px",
        top: parseInt(o) + "px"
      })
    }, i.prototype.show = function () {
      return this.el.show()
    }, i.prototype.hide = function () {
      return this.el.hide()
    }, i
  }(), e.Line = function (t) {
    function i(t) {
      return this.hilight = o(this.hilight, this), this.onHoverOut = o(this.onHoverOut, this), this.onHoverMove = o(this.onHoverMove, this), this.onGridClick = o(this.onGridClick, this), this instanceof e.Line ? (i.__super__.constructor.call(this, t), void 0) : new e.Line(t)
    }

    return a(i, t), i.prototype.init = function () {
      return this.pointGrow = Raphael.animation({r: this.options.pointSize + 3}, 25, "linear"), this.pointShrink = Raphael.animation({r: this.options.pointSize}, 25, "linear"), "always" !== this.options.hideHover ? (this.hover = new e.Hover({parent: this.el}), this.on("hovermove", this.onHoverMove), this.on("hoverout", this.onHoverOut), this.on("gridclick", this.onGridClick)) : void 0
    }, i.prototype.defaults = {
      lineWidth: 3,
      pointSize: 4,
      lineColors: ["#0b62a4", "#7A92A3", "#4da74d", "#afd8f8", "#edc240", "#cb4b4b", "#9440ed"],
      pointWidths: [1],
      pointStrokeColors: ["#ffffff"],
      pointFillColors: [],
      smooth: !0,
      xLabels: "auto",
      xLabelFormat: null,
      xLabelMargin: 24,
      continuousLine: !0,
      hideHover: !1
    }, i.prototype.calc = function () {
      return this.calcPoints(), this.generatePaths()
    }, i.prototype.calcPoints = function () {
      var t, e, i, n, r, s;
      for (r = this.data, s = [], i = 0, n = r.length; n > i; i++)t = r[i], t._x = this.transX(t.x), t._y = function () {
        var i, n, r, s;
        for (r = t.y, s = [], i = 0, n = r.length; n > i; i++)e = r[i], null != e ? s.push(this.transY(e)) : s.push(e);
        return s
      }.call(this), s.push(t._ymax = Math.min.apply(null, [this.bottom].concat(function () {
        var i, n, r, s;
        for (r = t._y, s = [], i = 0, n = r.length; n > i; i++)e = r[i], null != e && s.push(e);
        return s
      }())));
      return s
    }, i.prototype.hitTest = function (t) {
      var e, i, n, r, s;
      if (0 === this.data.length)return null;
      for (s = this.data.slice(1), e = n = 0, r = s.length; r > n && (i = s[e], !(t < (i._x + this.data[e]._x) / 2)); e = ++n);
      return e
    }, i.prototype.onGridClick = function (t, e) {
      var i;
      return i = this.hitTest(t, e), this.fire("click", i, this.options.data[i], t, e)
    }, i.prototype.onHoverMove = function (t, e) {
      var i;
      return i = this.hitTest(t, e), this.displayHoverForRow(i)
    }, i.prototype.onHoverOut = function () {
      return this.options.hideHover !== !1 ? this.displayHoverForRow(null) : void 0
    }, i.prototype.displayHoverForRow = function (t) {
      var e;
      return null != t ? ((e = this.hover).update.apply(e, this.hoverContentForRow(t)), this.hilight(t)) : (this.hover.hide(), this.hilight())
    }, i.prototype.hoverContentForRow = function (t) {
      var e, i, n, r, s, a, o;
      for (n = this.data[t], e = "<div class='morris-hover-row-label'>" + n.label + "</div>", o = n.y, i = s = 0, a = o.length; a > s; i = ++s)r = o[i], e += "<div class='morris-hover-point' style='color: " + this.colorFor(n, i, "label") + "'>\n  " + this.options.labels[i] + ":\n  " + this.yLabelFormat(r) + "\n</div>";
      return "function" == typeof this.options.hoverCallback && (e = this.options.hoverCallback(t, this.options, e)), [e, n._x, n._ymax]
    }, i.prototype.generatePaths = function () {
      var t, i, n, r, s;
      return this.paths = function () {
        var a, o, h, u;
        for (u = [], n = a = 0, o = this.options.ykeys.length; o >= 0 ? o > a : a > o; n = o >= 0 ? ++a : --a)s = this.options.smooth === !0 || (h = this.options.ykeys[n], l.call(this.options.smooth, h) >= 0), i = function () {
          var t, e, i, s;
          for (i = this.data, s = [], t = 0, e = i.length; e > t; t++)r = i[t], void 0 !== r._y[n] && s.push({
            x: r._x,
            y: r._y[n]
          });
          return s
        }.call(this), this.options.continuousLine && (i = function () {
          var e, n, r;
          for (r = [], e = 0, n = i.length; n > e; e++)t = i[e], null !== t.y && r.push(t);
          return r
        }()), i.length > 1 ? u.push(e.Line.createPath(i, s, this.bottom)) : u.push(null);
        return u
      }.call(this)
    }, i.prototype.draw = function () {
      return this.options.axes && this.drawXAxis(), this.drawSeries(), this.options.hideHover === !1 ? this.displayHoverForRow(this.data.length - 1) : void 0
    }, i.prototype.drawXAxis = function () {
      var t, i, n, r, s, a, o, l, h, u, c = this;
      for (o = this.bottom + this.options.padding / 2, s = null, r = null, t = function (t, e) {
        var i, n, a, l, h;
        return i = c.drawXAxisLabel(c.transX(e), o, t), h = i.getBBox(), i.transform("r" + -c.options.xLabelAngle), n = i.getBBox(), i.transform("t0," + n.height / 2 + "..."), 0 !== c.options.xLabelAngle && (l = -.5 * h.width * Math.cos(c.options.xLabelAngle * Math.PI / 180), i.transform("t" + l + ",0...")), n = i.getBBox(), (null == s || s >= n.x + n.width || null != r && r >= n.x) && n.x >= 0 && n.x + n.width < c.el.width() ? (0 !== c.options.xLabelAngle && (a = 1.25 * c.options.gridTextSize / Math.sin(c.options.xLabelAngle * Math.PI / 180), r = n.x - a), s = n.x - c.options.xLabelMargin) : i.remove()
      }, n = this.options.parseTime ? 1 === this.data.length && "auto" === this.options.xLabels ? [[this.data[0].label, this.data[0].x]] : e.labelSeries(this.xmin, this.xmax, this.width, this.options.xLabels, this.options.xLabelFormat) : function () {
        var t, e, i, n;
        for (i = this.data, n = [], t = 0, e = i.length; e > t; t++)a = i[t], n.push([a.label, a.x]);
        return n
      }.call(this), n.reverse(), u = [], l = 0, h = n.length; h > l; l++)i = n[l], u.push(t(i[0], i[1]));
      return u
    }, i.prototype.drawSeries = function () {
      var t, e, i, n, r, s;
      for (this.seriesPoints = [], t = e = n = this.options.ykeys.length - 1; 0 >= n ? 0 >= e : e >= 0; t = 0 >= n ? ++e : --e)this._drawLineFor(t);
      for (s = [], t = i = r = this.options.ykeys.length - 1; 0 >= r ? 0 >= i : i >= 0; t = 0 >= r ? ++i : --i)s.push(this._drawPointFor(t));
      return s
    }, i.prototype._drawPointFor = function (t) {
      var e, i, n, r, s, a;
      for (this.seriesPoints[t] = [], s = this.data, a = [], n = 0, r = s.length; r > n; n++)i = s[n], e = null, null != i._y[t] && (e = this.drawLinePoint(i._x, i._y[t], this.options.pointSize, this.colorFor(i, t, "point"), t)), a.push(this.seriesPoints[t].push(e));
      return a
    }, i.prototype._drawLineFor = function (t) {
      var e;
      return e = this.paths[t], null !== e ? this.drawLinePath(e, this.colorFor(null, t, "line")) : void 0
    }, i.createPath = function (t, i, n) {
      var r, s, a, o, l, h, u, c, d, f, p, g, v, m;
      for (u = "", i && (a = e.Line.gradients(t)), c = {y: null}, o = v = 0, m = t.length; m > v; o = ++v)r = t[o], null != r.y && (null != c.y ? i ? (s = a[o], h = a[o - 1], l = (r.x - c.x) / 4, d = c.x + l, p = Math.min(n, c.y + l * h), f = r.x - l, g = Math.min(n, r.y - l * s), u += "C" + d + "," + p + "," + f + "," + g + "," + r.x + "," + r.y) : u += "L" + r.x + "," + r.y : i && null == a[o] || (u += "M" + r.x + "," + r.y)), c = r;
      return u
    }, i.gradients = function (t) {
      var e, i, n, r, s, a, o, l;
      for (i = function (t, e) {
        return (t.y - e.y) / (t.x - e.x)
      }, l = [], n = a = 0, o = t.length; o > a; n = ++a)e = t[n], null != e.y ? (r = t[n + 1] || {y: null}, s = t[n - 1] || {y: null}, null != s.y && null != r.y ? l.push(i(s, r)) : null != s.y ? l.push(i(s, e)) : null != r.y ? l.push(i(e, r)) : l.push(null)) : l.push(null);
      return l
    }, i.prototype.hilight = function (t) {
      var e, i, n, r, s;
      if (null !== this.prevHilight && this.prevHilight !== t)for (e = i = 0, r = this.seriesPoints.length - 1; r >= 0 ? r >= i : i >= r; e = r >= 0 ? ++i : --i)this.seriesPoints[e][this.prevHilight] && this.seriesPoints[e][this.prevHilight].animate(this.pointShrink);
      if (null !== t && this.prevHilight !== t)for (e = n = 0, s = this.seriesPoints.length - 1; s >= 0 ? s >= n : n >= s; e = s >= 0 ? ++n : --n)this.seriesPoints[e][t] && this.seriesPoints[e][t].animate(this.pointGrow);
      return this.prevHilight = t
    }, i.prototype.colorFor = function (t, e, i) {
      return "function" == typeof this.options.lineColors ? this.options.lineColors.call(this, t, e, i) : "point" === i ? this.options.pointFillColors[e % this.options.pointFillColors.length] || this.options.lineColors[e % this.options.lineColors.length] : this.options.lineColors[e % this.options.lineColors.length]
    }, i.prototype.drawXAxisLabel = function (t, e, i) {
      return this.raphael.text(t, e, i).attr("font-size", this.options.gridTextSize).attr("font-family", this.options.gridTextFamily).attr("font-weight", this.options.gridTextWeight).attr("fill", this.options.gridTextColor)
    }, i.prototype.drawLinePath = function (t, e) {
      return this.raphael.path(t).attr("stroke", e).attr("stroke-width", this.options.lineWidth)
    }, i.prototype.drawLinePoint = function (t, e, i, n, r) {
      return this.raphael.circle(t, e, i).attr("fill", n).attr("stroke-width", this.strokeWidthForSeries(r)).attr("stroke", this.strokeForSeries(r))
    }, i.prototype.strokeWidthForSeries = function (t) {
      return this.options.pointWidths[t % this.options.pointWidths.length]
    }, i.prototype.strokeForSeries = function (t) {
      return this.options.pointStrokeColors[t % this.options.pointStrokeColors.length]
    }, i
  }(e.Grid), e.labelSeries = function (i, n, r, s, a) {
    var o, l, h, u, c, d, f, p, g, v, m;
    if (h = 200 * (n - i) / r, l = new Date(i), f = e.LABEL_SPECS[s], void 0 === f)for (m = e.AUTO_LABEL_ORDER, g = 0, v = m.length; v > g; g++)if (u = m[g], d = e.LABEL_SPECS[u], h >= d.span) {
      f = d;
      break
    }
    for (void 0 === f && (f = e.LABEL_SPECS.second), a && (f = t.extend({}, f, {fmt: a})), o = f.start(l), c = []; (p = o.getTime()) <= n;)p >= i && c.push([f.fmt(o), p]), f.incr(o);
    return c
  }, i = function (t) {
    return {
      span: 1e3 * 60 * t, start: function (t) {
        return new Date(t.getFullYear(), t.getMonth(), t.getDate(), t.getHours())
      }, fmt: function (t) {
        return "" + e.pad2(t.getHours()) + ":" + e.pad2(t.getMinutes())
      }, incr: function (e) {
        return e.setUTCMinutes(e.getUTCMinutes() + t)
      }
    }
  }, n = function (t) {
    return {
      span: 1e3 * t, start: function (t) {
        return new Date(t.getFullYear(), t.getMonth(), t.getDate(), t.getHours(), t.getMinutes())
      }, fmt: function (t) {
        return "" + e.pad2(t.getHours()) + ":" + e.pad2(t.getMinutes()) + ":" + e.pad2(t.getSeconds())
      }, incr: function (e) {
        return e.setUTCSeconds(e.getUTCSeconds() + t)
      }
    }
  }, e.LABEL_SPECS = {
    decade: {
      span: 1728e8, start: function (t) {
        return new Date(t.getFullYear() - t.getFullYear() % 10, 0, 1)
      }, fmt: function (t) {
        return "" + t.getFullYear()
      }, incr: function (t) {
        return t.setFullYear(t.getFullYear() + 10)
      }
    },
    year: {
      span: 1728e7, start: function (t) {
        return new Date(t.getFullYear(), 0, 1)
      }, fmt: function (t) {
        return "" + t.getFullYear()
      }, incr: function (t) {
        return t.setFullYear(t.getFullYear() + 1)
      }
    },
    month: {
      span: 24192e5, start: function (t) {
        return new Date(t.getFullYear(), t.getMonth(), 1)
      }, fmt: function (t) {
        return "" + t.getFullYear() + "-" + e.pad2(t.getMonth() + 1)
      }, incr: function (t) {
        return t.setMonth(t.getMonth() + 1)
      }
    },
    day: {
      span: 864e5, start: function (t) {
        return new Date(t.getFullYear(), t.getMonth(), t.getDate())
      }, fmt: function (t) {
        return "" + t.getFullYear() + "-" + e.pad2(t.getMonth() + 1) + "-" + e.pad2(t.getDate())
      }, incr: function (t) {
        return t.setDate(t.getDate() + 1)
      }
    },
    hour: i(60),
    "30min": i(30),
    "15min": i(15),
    "10min": i(10),
    "5min": i(5),
    minute: i(1),
    "30sec": n(30),
    "15sec": n(15),
    "10sec": n(10),
    "5sec": n(5),
    second: n(1)
  }, e.AUTO_LABEL_ORDER = ["decade", "year", "month", "day", "hour", "30min", "15min", "10min", "5min", "minute", "30sec", "15sec", "10sec", "5sec", "second"], e.Area = function (i) {
    function n(i) {
      var s;
      return this instanceof e.Area ? (s = t.extend({}, r, i), this.cumulative = !s.behaveLikeLine, "auto" === s.fillOpacity && (s.fillOpacity = s.behaveLikeLine ? .8 : 1), n.__super__.constructor.call(this, s), void 0) : new e.Area(i)
    }

    var r;
    return a(n, i), r = {fillOpacity: "auto", behaveLikeLine: !1}, n.prototype.calcPoints = function () {
      var t, e, i, n, r, s, a;
      for (s = this.data, a = [], n = 0, r = s.length; r > n; n++)t = s[n], t._x = this.transX(t.x), e = 0, t._y = function () {
        var n, r, s, a;
        for (s = t.y, a = [], n = 0, r = s.length; r > n; n++)i = s[n], this.options.behaveLikeLine ? a.push(this.transY(i)) : (e += i || 0, a.push(this.transY(e)));
        return a
      }.call(this), a.push(t._ymax = Math.max.apply(Math, t._y));
      return a
    }, n.prototype.drawSeries = function () {
      var t, e, i, n, r, s, a, o;
      for (this.seriesPoints = [], e = this.options.behaveLikeLine ? function () {
        s = [];
        for (var t = 0, e = this.options.ykeys.length - 1; e >= 0 ? e >= t : t >= e; e >= 0 ? t++ : t--)s.push(t);
        return s
      }.apply(this) : function () {
        a = [];
        for (var t = r = this.options.ykeys.length - 1; 0 >= r ? 0 >= t : t >= 0; 0 >= r ? t++ : t--)a.push(t);
        return a
      }.apply(this), o = [], i = 0, n = e.length; n > i; i++)t = e[i], this._drawFillFor(t), this._drawLineFor(t), o.push(this._drawPointFor(t));
      return o
    }, n.prototype._drawFillFor = function (t) {
      var e;
      return e = this.paths[t], null !== e ? (e += "L" + this.transX(this.xmax) + "," + this.bottom + "L" + this.transX(this.xmin) + "," + this.bottom + "Z", this.drawFilledPath(e, this.fillForSeries(t))) : void 0
    }, n.prototype.fillForSeries = function (t) {
      var e;
      return e = Raphael.rgb2hsl(this.colorFor(this.data[t], t, "line")), Raphael.hsl(e.h, this.options.behaveLikeLine ? .9 * e.s : .75 * e.s, Math.min(.98, this.options.behaveLikeLine ? 1.2 * e.l : 1.25 * e.l))
    }, n.prototype.drawFilledPath = function (t, e) {
      return this.raphael.path(t).attr("fill", e).attr("fill-opacity", this.options.fillOpacity).attr("stroke-width", 0)
    }, n
  }(e.Line), e.Bar = function (i) {
    function n(i) {
      return this.onHoverOut = o(this.onHoverOut, this), this.onHoverMove = o(this.onHoverMove, this), this.onGridClick = o(this.onGridClick, this), this instanceof e.Bar ? (n.__super__.constructor.call(this, t.extend({}, i, {parseTime: !1})), void 0) : new e.Bar(i)
    }

    return a(n, i), n.prototype.init = function () {
      return this.cumulative = this.options.stacked, "always" !== this.options.hideHover ? (this.hover = new e.Hover({parent: this.el}), this.on("hovermove", this.onHoverMove), this.on("hoverout", this.onHoverOut), this.on("gridclick", this.onGridClick)) : void 0
    }, n.prototype.defaults = {
      barSizeRatio: .75,
      barGap: 3,
      barColors: ["#0b62a4", "#7a92a3", "#4da74d", "#afd8f8", "#edc240", "#cb4b4b", "#9440ed"],
      xLabelMargin: 50
    }, n.prototype.calc = function () {
      var t;
      return this.calcBars(), this.options.hideHover === !1 ? (t = this.hover).update.apply(t, this.hoverContentForRow(this.data.length - 1)) : void 0
    }, n.prototype.calcBars = function () {
      var t, e, i, n, r, s, a;
      for (s = this.data, a = [], t = n = 0, r = s.length; r > n; t = ++n)e = s[t], e._x = this.left + this.width * (t + .5) / this.data.length, a.push(e._y = function () {
        var t, n, r, s;
        for (r = e.y, s = [], t = 0, n = r.length; n > t; t++)i = r[t], null != i ? s.push(this.transY(i)) : s.push(null);
        return s
      }.call(this));
      return a
    }, n.prototype.draw = function () {
      return this.options.axes && this.drawXAxis(), this.drawSeries()
    }, n.prototype.drawXAxis = function () {
      var t, e, i, n, r, s, a, o, l, h, u, c, d;
      for (h = this.bottom + this.options.padding / 2, a = null, s = null, d = [], t = u = 0, c = this.data.length; c >= 0 ? c > u : u > c; t = c >= 0 ? ++u : --u)o = this.data[this.data.length - 1 - t], e = this.drawXAxisLabel(o._x, h, o.label), l = e.getBBox(), e.transform("r" + -this.options.xLabelAngle), i = e.getBBox(), e.transform("t0," + i.height / 2 + "..."), 0 !== this.options.xLabelAngle && (r = -.5 * l.width * Math.cos(this.options.xLabelAngle * Math.PI / 180), e.transform("t" + r + ",0...")), (null == a || a >= i.x + i.width || null != s && s >= i.x) && i.x >= 0 && i.x + i.width < this.el.width() ? (0 !== this.options.xLabelAngle && (n = 1.25 * this.options.gridTextSize / Math.sin(this.options.xLabelAngle * Math.PI / 180), s = i.x - n), d.push(a = i.x - this.options.xLabelMargin)) : d.push(e.remove());
      return d
    }, n.prototype.drawSeries = function () {
      var t, e, i, n, r, s, a, o, l, h, u, c, d, f;
      return i = this.width / this.options.data.length, o = null != this.options.stacked ? 1 : this.options.ykeys.length, t = (i * this.options.barSizeRatio - this.options.barGap * (o - 1)) / o, a = i * (1 - this.options.barSizeRatio) / 2, f = this.ymin <= 0 && this.ymax >= 0 ? this.transY(0) : null, this.bars = function () {
        var o, p, g, v;
        for (g = this.data, v = [], n = o = 0, p = g.length; p > o; n = ++o)l = g[n], r = 0, v.push(function () {
          var o, p, g, v;
          for (g = l._y, v = [], h = o = 0, p = g.length; p > o; h = ++o)d = g[h], null !== d ? (f ? (c = Math.min(d, f), e = Math.max(d, f)) : (c = d, e = this.bottom), s = this.left + n * i + a, this.options.stacked || (s += h * (t + this.options.barGap)), u = e - c, this.options.stacked && (c -= r), this.drawBar(s, c, t, u, this.colorFor(l, h, "bar")), v.push(r += u)) : v.push(null);
          return v
        }.call(this));
        return v
      }.call(this)
    }, n.prototype.colorFor = function (t, e, i) {
      var n, r;
      return "function" == typeof this.options.barColors ? (n = {x: t.x, y: t.y[e], label: t.label}, r = {
        index: e,
        key: this.options.ykeys[e],
        label: this.options.labels[e]
      }, this.options.barColors.call(this, n, r, i)) : this.options.barColors[e % this.options.barColors.length]
    }, n.prototype.hitTest = function (t) {
      return 0 === this.data.length ? null : (t = Math.max(Math.min(t, this.right), this.left), Math.min(this.data.length - 1, Math.floor((t - this.left) / (this.width / this.data.length))))
    }, n.prototype.onGridClick = function (t, e) {
      var i;
      return i = this.hitTest(t, e), this.fire("click", i, this.options.data[i], t, e)
    }, n.prototype.onHoverMove = function (t, e) {
      var i, n;
      return i = this.hitTest(t, e), (n = this.hover).update.apply(n, this.hoverContentForRow(i))
    }, n.prototype.onHoverOut = function () {
      return this.options.hideHover !== !1 ? this.hover.hide() : void 0
    }, n.prototype.hoverContentForRow = function (t) {
      var e, i, n, r, s, a, o, l;
      for (n = this.data[t], e = "<div class='morris-hover-row-label'>" + n.label + "</div>", l = n.y, i = a = 0, o = l.length; o > a; i = ++a)s = l[i], e += "<div class='morris-hover-point' style='color: " + this.colorFor(n, i, "label") + "'>\n  " + this.options.labels[i] + ":\n  " + this.yLabelFormat(s) + "\n</div>";
      return "function" == typeof this.options.hoverCallback && (e = this.options.hoverCallback(t, this.options, e)), r = this.left + (t + .5) * this.width / this.data.length, [e, r]
    }, n.prototype.drawXAxisLabel = function (t, e, i) {
      var n;
      return n = this.raphael.text(t, e, i).attr("font-size", this.options.gridTextSize).attr("font-family", this.options.gridTextFamily).attr("font-weight", this.options.gridTextWeight).attr("fill", this.options.gridTextColor)
    }, n.prototype.drawBar = function (t, e, i, n, r) {
      return this.raphael.rect(t, e, i, n).attr("fill", r).attr("stroke-width", 0)
    }, n
  }(e.Grid), e.Donut = function (i) {
    function n(i) {
      this.select = o(this.select, this), this.click = o(this.click, this);
      var n;
      if (!(this instanceof e.Donut))return new e.Donut(i);
      if (this.el = "string" == typeof i.element ? t(document.getElementById(i.element)) : t(i.element), this.options = t.extend({}, this.defaults, i), null === this.el || 0 === this.el.length)throw new Error("Graph placeholder not found.");
      void 0 !== i.data && 0 !== i.data.length && (this.data = i.data, this.values = function () {
        var t, e, i, r;
        for (i = this.data, r = [], t = 0, e = i.length; e > t; t++)n = i[t], r.push(parseFloat(n.value));
        return r
      }.call(this), this.redraw())
    }

    return a(n, i), n.prototype.defaults = {
      colors: ["#0B62A4", "#3980B5", "#679DC6", "#95BBD7", "#B0CCE1", "#095791", "#095085", "#083E67", "#052C48", "#042135"],
      backgroundColor: "#FFFFFF",
      labelColor: "#000000",
      formatter: e.commas
    }, n.prototype.redraw = function () {
      var t, i, n, r, s, a, o, l, h, u, c, d, f, p, g, v, m, y, b, x, _, w, C;
      for (this.el.empty(), this.raphael = new Raphael(this.el[0]), i = this.el.width() / 2, n = this.el.height() / 2, f = (Math.min(i, n) - 10) / 3, c = 0, x = this.values, p = 0, m = x.length; m > p; p++)d = x[p], c += d;
      for (l = 5 / (2 * f), t = 1.9999 * Math.PI - l * this.data.length, a = 0, s = 0, this.segments = [], _ = this.values, r = g = 0, y = _.length; y > g; r = ++g)d = _[r], h = a + l + t * (d / c), u = new e.DonutSegment(i, n, 2 * f, f, a, h, this.options.colors[s % this.options.colors.length], this.options.backgroundColor, s, this.raphael), u.render(), this.segments.push(u), u.on("hover", this.select), u.on("click", this.click), a = h, s += 1;
      for (this.text1 = this.drawEmptyDonutLabel(i, n - 10, this.options.labelColor, 15, 800), this.text2 = this.drawEmptyDonutLabel(i, n + 10, this.options.labelColor, 14), o = Math.max.apply(null, function () {
        var t, e, i, n;
        for (i = this.values, n = [], t = 0, e = i.length; e > t; t++)d = i[t], n.push(d);
        return n
      }.call(this)), s = 0, w = this.values, C = [], v = 0, b = w.length; b > v; v++) {
        if (d = w[v], d === o) {
          this.select(s);
          break
        }
        C.push(s += 1)
      }
      return C
    }, n.prototype.click = function (t) {
      return this.fire("click", t, this.data[t])
    }, n.prototype.select = function (t) {
      var e, i, n, r, s, a;
      for (a = this.segments, r = 0, s = a.length; s > r; r++)i = a[r], i.deselect();
      return n = this.segments[t], n.select(), e = this.data[t], this.setLabels(e.label, this.options.formatter(e.value, e))
    }, n.prototype.setLabels = function (t, e) {
      var i, n, r, s, a, o, l, h;
      return i = 2 * (Math.min(this.el.width() / 2, this.el.height() / 2) - 10) / 3, s = 1.8 * i, r = i / 2, n = i / 3, this.text1.attr({
        text: t,
        transform: ""
      }), a = this.text1.getBBox(), o = Math.min(s / a.width, r / a.height), this.text1.attr({transform: "S" + o + "," + o + "," + (a.x + a.width / 2) + "," + (a.y + a.height)}), this.text2.attr({
        text: e,
        transform: ""
      }), l = this.text2.getBBox(), h = Math.min(s / l.width, n / l.height), this.text2.attr({transform: "S" + h + "," + h + "," + (l.x + l.width / 2) + "," + l.y})
    }, n.prototype.drawEmptyDonutLabel = function (t, e, i, n, r) {
      var s;
      return s = this.raphael.text(t, e, "").attr("font-size", n).attr("fill", i), null != r && s.attr("font-weight", r), s
    }, n
  }(e.EventEmitter), e.DonutSegment = function (t) {
    function e(t, e, i, n, r, s, a, l, h, u) {
      this.cx = t, this.cy = e, this.inner = i, this.outer = n, this.color = a, this.backgroundColor = l, this.index = h, this.raphael = u, this.deselect = o(this.deselect, this), this.select = o(this.select, this), this.sin_p0 = Math.sin(r), this.cos_p0 = Math.cos(r), this.sin_p1 = Math.sin(s), this.cos_p1 = Math.cos(s), this.is_long = s - r > Math.PI ? 1 : 0, this.path = this.calcSegment(this.inner + 3, this.inner + this.outer - 5), this.selectedPath = this.calcSegment(this.inner + 3, this.inner + this.outer), this.hilight = this.calcArc(this.inner)
    }

    return a(e, t), e.prototype.calcArcPoints = function (t) {
      return [this.cx + t * this.sin_p0, this.cy + t * this.cos_p0, this.cx + t * this.sin_p1, this.cy + t * this.cos_p1]
    }, e.prototype.calcSegment = function (t, e) {
      var i, n, r, s, a, o, l, h, u, c;
      return u = this.calcArcPoints(t), i = u[0], r = u[1], n = u[2], s = u[3], c = this.calcArcPoints(e), a = c[0], l = c[1], o = c[2], h = c[3], "M" + i + "," + r + ("A" + t + "," + t + ",0," + this.is_long + ",0," + n + "," + s) + ("L" + o + "," + h) + ("A" + e + "," + e + ",0," + this.is_long + ",1," + a + "," + l) + "Z"
    }, e.prototype.calcArc = function (t) {
      var e, i, n, r, s;
      return s = this.calcArcPoints(t), e = s[0], n = s[1], i = s[2], r = s[3], "M" + e + "," + n + ("A" + t + "," + t + ",0," + this.is_long + ",0," + i + "," + r)
    }, e.prototype.render = function () {
      var t = this;
      return this.arc = this.drawDonutArc(this.hilight, this.color), this.seg = this.drawDonutSegment(this.path, this.color, this.backgroundColor, function () {
        return t.fire("hover", t.index)
      }, function () {
        return t.fire("click", t.index)
      })
    }, e.prototype.drawDonutArc = function (t, e) {
      return this.raphael.path(t).attr({stroke: e, "stroke-width": 2, opacity: 0})
    }, e.prototype.drawDonutSegment = function (t, e, i, n, r) {
      return this.raphael.path(t).attr({fill: e, stroke: i, "stroke-width": 3}).hover(n).click(r)
    }, e.prototype.select = function () {
      return this.selected ? void 0 : (this.seg.animate({path: this.selectedPath}, 150, "<>"), this.arc.animate({opacity: 1}, 150, "<>"), this.selected = !0)
    }, e.prototype.deselect = function () {
      return this.selected ? (this.seg.animate({path: this.path}, 150, "<>"), this.arc.animate({opacity: 0}, 150, "<>"), this.selected = !1) : void 0
    }, e
  }(e.EventEmitter)
}.call(this), $(function () {
  $(".color_settings_box"), $(".content-wrapper").hasClass("wood-wrapper") && $("#wood-wrapper-checkbox").prop("checked", !0), $("#wood-wrapper-checkbox").on("change", function () {
    $(this).is(":checked") ? $(".content-wrapper").addClass("wood-wrapper") : $(".content-wrapper").removeClass("wood-wrapper")
  }), $(".toggle-color-settings").on("click", function () {
    return $(".color_settings_box").hasClass("active") ? ($(".color_settings_box").animate({right: "-200px"}, "fast").removeClass("active"), $(".toggle-color-settings span").text("теми")) : ($(".color_settings_box").animate({right: "0px"}, "slow").addClass("active"), $(".toggle-color-settings span").text("скрий")), !1
  }), $(".color-tooltip").tooltip(), $(".color-box").on("click", function () {
    $(this).closest(".color-settings-w").find(".color-box").removeClass("active"), $(this).addClass("active");
    var t = $(this).closest(".color-settings-w").data("replace-element"), e = $(this).closest(".color-settings-w").data("leave-class"), i = $(this).data("replace-with");
    return $(t).prop("class", e), $(t).addClass(i), $("#wood-wrapper-checkbox").prop("checked", !1), $(".content-wrapper").removeClass("wood-wrapper"), !1
  })
}), function () {
  $(function () {
    return $(".widget-link-remove").on("click", function () {
      return $(this).closest(".widget").slideUp("fast"), !1
    }), $(".is-dropdown-menu").on("click", function () {
      return $(this).next("ul").slideToggle("fast", function () {
        return $(this).closest("li").toggleClass("active")
      }), !1
    })
  })
}.call(this);
;