/*! jquery.touchwipe - v1.3.0 - 2015-01-08
 * Copyright (c) 2015 Josh Stafford; Licensed MIT */
! function(a) {
    a.fn.touchwipe = function(b) {
        var c = {
            min_move_x: 20,
            min_move_y: 20,
            wipeLeft: function() {},
            wipeRight: function() {},
            wipeUp: function() {},
            wipeDown: function() {},
            preventDefaultEvents: !1,
            preventDefaultEventsX: !0,
            preventDefaultEventsY: !1
        };
        return b && a.extend(c, b), this.each(function() {
            function a() {
                this.removeEventListener("touchmove", b), e = null, f = null, h = !1
            }

            function b(b) {
                var d, k;
                if (c.preventDefaultEvents && b.preventDefault(), h) {
                    var l = b.touches[0].pageX,
                        m = b.touches[0].pageY,
                        n = e - l,
                        o = f - m;
                    Math.abs(n) >= c.min_move_x ? (c.preventDefaultEventsX && b.preventDefault(), i.push(n), 1 === i.length && (g = setTimeout(function() {
                        a(), d = i.pop(), i = [], d > 0 ? c.wipeLeft(Math.abs(d)) : c.wipeRight(Math.abs(d))
                    }, 200))) : Math.abs(o) >= c.min_move_y && (c.preventDefaultEventsY && b.preventDefault(), j.push(o), 1 === j.length && (g = setTimeout(function() {
                        a(), k = j.pop(), j = [], k > 0 ? c.wipeDown(Math.abs(k)) : c.wipeUp(Math.abs(k))
                    }, 200)))
                }
            }

            function d(a) {
                1 === a.touches.length && (e = a.touches[0].pageX, f = a.touches[0].pageY, h = !0, this.addEventListener("touchmove", b, !1))
            }
            var e, f, g, h = !1,
                i = [],
                j = [];
            this.addEventListener("touchstart", d, !1)
        }), this
    }
}(jQuery);