(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

(function () {
    var AJPEG = window.AJPEG = function (config) {
        var self = this;
        self.img = null;
        self.mask = null;

        self.load = function (src, cb) {
            function onAllLoaded() {
                if (!self.mask.loaded || !self.img.loaded) return;

                if (typeof cb == "function") cb.call(self);
            }

            self.img = loadImage(src, onAllLoaded.bind(self));
            self.mask = loadImage(src.replace('.jpg', "@mask.png"), onAllLoaded.bind(self));
        };

        self.toDataURL = function () {
            return self.toCanvas().toDataURL();
        };

        self.toCanvas = function (canvas) {
            var imagecanvas = canvas || document.createElement('canvas');
            var imagecontext = imagecanvas.getContext('2d');

            imagecanvas.width = self.img.width;
            imagecanvas.height = self.img.height;

            imagecontext.drawImage(self.mask, 0, 0, self.img.width, self.img.height);
            imagecontext.globalCompositeOperation = 'source-atop';
            imagecontext.drawImage(self.img, 0, 0);
            return imagecanvas;
        };
    };

    AJPEG.parse = function (attr) {
        if (typeof attr == "undefined" || !attr) attr = 'alpha-src';
        setTimeout(function () {
            var ims = document.querySelectorAll('img[' + attr + ']'),
                img;
            for (var i = 0; i < ims.length; i++) {
                img = ims[i];
                new AJPEG().load(ims[i].attributes[attr].value, function () {
                    img.src = this.toDataURL();
                });
            }
            var canvases = document.querySelectorAll('canvas[' + attr + ']'),
                canvas;
            for (var i = 0; i < canvases.length; i++) {
                canvas = canvases[i];
                new AJPEG().load(canvas.attributes[attr].value, function () {
                    this.toCanvas(canvas);
                });
            }
        });
    };

    function loadImage(src, cb) {
        var img = new Image();
        img.loaded = false;
        img.onload = function () {
            img.loaded = true;
            cb();
        };
        img.src = src;
        return img;
    }

    if (typeof module != "undefined") module.exports = AJPEG;
})();

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZWNvZGVyL2pzL01haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FDLGFBQVk7QUFDVCxRQUFJLFFBQVEsT0FBTyxLQUFQLEdBQWUsVUFBVSxNQUFWLEVBQWtCO0FBQ3pDLFlBQUksT0FBTyxJQUFYO0FBQ0EsYUFBSyxHQUFMLEdBQVcsSUFBWDtBQUNBLGFBQUssSUFBTCxHQUFZLElBQVo7O0FBRUEsYUFBSyxJQUFMLEdBQVksVUFBVSxHQUFWLEVBQWUsRUFBZixFQUFtQjtBQUMzQixxQkFBUyxXQUFULEdBQXVCO0FBQ25CLG9CQUFJLENBQUMsS0FBSyxJQUFMLENBQVUsTUFBWCxJQUFxQixDQUFDLEtBQUssR0FBTCxDQUFTLE1BQW5DLEVBQ0k7O0FBRUosb0JBQUksT0FBTyxFQUFQLElBQWEsVUFBakIsRUFDSSxHQUFHLElBQUgsQ0FBUSxJQUFSO0FBQ1A7O0FBRUQsaUJBQUssR0FBTCxHQUFXLFVBQVUsR0FBVixFQUFlLFlBQVksSUFBWixDQUFpQixJQUFqQixDQUFmLENBQVg7QUFDQSxpQkFBSyxJQUFMLEdBQVksVUFBVSxJQUFJLE9BQUosQ0FBWSxNQUFaLEVBQW9CLFdBQXBCLENBQVYsRUFBNEMsWUFBWSxJQUFaLENBQWlCLElBQWpCLENBQTVDLENBQVo7QUFDSCxTQVhEOztBQWFBLGFBQUssU0FBTCxHQUFpQixZQUFZO0FBQ3pCLG1CQUFPLEtBQUssUUFBTCxHQUFnQixTQUFoQixFQUFQO0FBQ0gsU0FGRDs7QUFJQSxhQUFLLFFBQUwsR0FBZ0IsVUFBVSxNQUFWLEVBQWtCO0FBQzlCLGdCQUFJLGNBQWMsVUFBVSxTQUFTLGFBQVQsQ0FBdUIsUUFBdkIsQ0FBNUI7QUFDQSxnQkFBSSxlQUFlLFlBQVksVUFBWixDQUF1QixJQUF2QixDQUFuQjs7QUFFQSx3QkFBWSxLQUFaLEdBQW9CLEtBQUssR0FBTCxDQUFTLEtBQTdCO0FBQ0Esd0JBQVksTUFBWixHQUFxQixLQUFLLEdBQUwsQ0FBUyxNQUE5Qjs7QUFFQSx5QkFBYSxTQUFiLENBQXVCLEtBQUssSUFBNUIsRUFBa0MsQ0FBbEMsRUFBcUMsQ0FBckMsRUFBd0MsS0FBSyxHQUFMLENBQVMsS0FBakQsRUFBd0QsS0FBSyxHQUFMLENBQVMsTUFBakU7QUFDQSx5QkFBYSx3QkFBYixHQUF3QyxhQUF4QztBQUNBLHlCQUFhLFNBQWIsQ0FBdUIsS0FBSyxHQUE1QixFQUFpQyxDQUFqQyxFQUFvQyxDQUFwQztBQUNBLG1CQUFPLFdBQVA7QUFDSCxTQVhEO0FBWUgsS0FsQ0Q7O0FBcUNBLFVBQU0sS0FBTixHQUFjLFVBQVUsSUFBVixFQUFnQjtBQUMxQixZQUFJLE9BQU8sSUFBUCxJQUFlLFdBQWYsSUFBOEIsQ0FBQyxJQUFuQyxFQUNJLE9BQU8sV0FBUDtBQUNKLG1CQUFXLFlBQVk7QUFDbkIsZ0JBQUksTUFBTSxTQUFTLGdCQUFULENBQTBCLFNBQVMsSUFBVCxHQUFnQixHQUExQyxDQUFWO0FBQUEsZ0JBQTBELEdBQTFEO0FBQ0EsaUJBQUssSUFBSSxJQUFJLENBQWIsRUFBZ0IsSUFBSSxJQUFJLE1BQXhCLEVBQWdDLEdBQWhDLEVBQXFDO0FBQ2pDLHNCQUFNLElBQUksQ0FBSixDQUFOO0FBQ0Esb0JBQUksS0FBSixHQUFZLElBQVosQ0FBaUIsSUFBSSxDQUFKLEVBQU8sVUFBUCxDQUFrQixJQUFsQixFQUF3QixLQUF6QyxFQUFnRCxZQUFZO0FBQ3hELHdCQUFJLEdBQUosR0FBVSxLQUFLLFNBQUwsRUFBVjtBQUNILGlCQUZEO0FBR0g7QUFDRCxnQkFBSSxXQUFXLFNBQVMsZ0JBQVQsQ0FBMEIsWUFBWSxJQUFaLEdBQW1CLEdBQTdDLENBQWY7QUFBQSxnQkFBa0UsTUFBbEU7QUFDQSxpQkFBSyxJQUFJLElBQUksQ0FBYixFQUFnQixJQUFJLFNBQVMsTUFBN0IsRUFBcUMsR0FBckMsRUFBMEM7QUFDdEMseUJBQVMsU0FBUyxDQUFULENBQVQ7QUFDQSxvQkFBSSxLQUFKLEdBQVksSUFBWixDQUFpQixPQUFPLFVBQVAsQ0FBa0IsSUFBbEIsRUFBd0IsS0FBekMsRUFBZ0QsWUFBVTtBQUN0RCx5QkFBSyxRQUFMLENBQWMsTUFBZDtBQUNILGlCQUZEO0FBR0g7QUFFSixTQWhCRDtBQWlCSCxLQXBCRDs7QUFzQkEsYUFBUyxTQUFULENBQW1CLEdBQW5CLEVBQXdCLEVBQXhCLEVBQTRCO0FBQ3hCLFlBQUksTUFBTSxJQUFJLEtBQUosRUFBVjtBQUNBLFlBQUksTUFBSixHQUFhLEtBQWI7QUFDQSxZQUFJLE1BQUosR0FBYSxZQUFZO0FBQ3JCLGdCQUFJLE1BQUosR0FBYSxJQUFiO0FBQ0E7QUFDSCxTQUhEO0FBSUEsWUFBSSxHQUFKLEdBQVUsR0FBVjtBQUNBLGVBQU8sR0FBUDtBQUNIOztBQUdELFFBQUksT0FBTyxNQUFQLElBQWlCLFdBQXJCLEVBQ0ksT0FBTyxPQUFQLEdBQWlCLEtBQWpCO0FBRVAsQ0EzRUEsR0FBRCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIoZnVuY3Rpb24gKCkge1xuICAgIHZhciBBSlBFRyA9IHdpbmRvdy5BSlBFRyA9IGZ1bmN0aW9uIChjb25maWcpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICBzZWxmLmltZyA9IG51bGw7XG4gICAgICAgIHNlbGYubWFzayA9IG51bGw7XG5cbiAgICAgICAgc2VsZi5sb2FkID0gZnVuY3Rpb24gKHNyYywgY2IpIHtcbiAgICAgICAgICAgIGZ1bmN0aW9uIG9uQWxsTG9hZGVkKCkge1xuICAgICAgICAgICAgICAgIGlmICghc2VsZi5tYXNrLmxvYWRlZCB8fCAhc2VsZi5pbWcubG9hZGVkKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGNiID09IFwiZnVuY3Rpb25cIilcbiAgICAgICAgICAgICAgICAgICAgY2IuY2FsbChzZWxmKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgc2VsZi5pbWcgPSBsb2FkSW1hZ2Uoc3JjLCBvbkFsbExvYWRlZC5iaW5kKHNlbGYpKTtcbiAgICAgICAgICAgIHNlbGYubWFzayA9IGxvYWRJbWFnZShzcmMucmVwbGFjZSgnLmpwZycsIFwiQG1hc2sucG5nXCIpLCBvbkFsbExvYWRlZC5iaW5kKHNlbGYpKTtcbiAgICAgICAgfTtcblxuICAgICAgICBzZWxmLnRvRGF0YVVSTCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBzZWxmLnRvQ2FudmFzKCkudG9EYXRhVVJMKCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgc2VsZi50b0NhbnZhcyA9IGZ1bmN0aW9uIChjYW52YXMpIHtcbiAgICAgICAgICAgIHZhciBpbWFnZWNhbnZhcyA9IGNhbnZhcyB8fCBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbiAgICAgICAgICAgIHZhciBpbWFnZWNvbnRleHQgPSBpbWFnZWNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuXG4gICAgICAgICAgICBpbWFnZWNhbnZhcy53aWR0aCA9IHNlbGYuaW1nLndpZHRoO1xuICAgICAgICAgICAgaW1hZ2VjYW52YXMuaGVpZ2h0ID0gc2VsZi5pbWcuaGVpZ2h0O1xuXG4gICAgICAgICAgICBpbWFnZWNvbnRleHQuZHJhd0ltYWdlKHNlbGYubWFzaywgMCwgMCwgc2VsZi5pbWcud2lkdGgsIHNlbGYuaW1nLmhlaWdodCk7XG4gICAgICAgICAgICBpbWFnZWNvbnRleHQuZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uID0gJ3NvdXJjZS1hdG9wJztcbiAgICAgICAgICAgIGltYWdlY29udGV4dC5kcmF3SW1hZ2Uoc2VsZi5pbWcsIDAsIDApO1xuICAgICAgICAgICAgcmV0dXJuIGltYWdlY2FudmFzO1xuICAgICAgICB9O1xuICAgIH07XG5cbiAgICAvL1NUQVRJQ1xuICAgIEFKUEVHLnBhcnNlID0gZnVuY3Rpb24gKGF0dHIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBhdHRyID09IFwidW5kZWZpbmVkXCIgfHwgIWF0dHIpXG4gICAgICAgICAgICBhdHRyID0gJ2FscGhhLXNyYyc7XG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGltcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2ltZ1snICsgYXR0ciArICddJyksIGltZztcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaW1zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaW1nID0gaW1zW2ldO1xuICAgICAgICAgICAgICAgIG5ldyBBSlBFRygpLmxvYWQoaW1zW2ldLmF0dHJpYnV0ZXNbYXR0cl0udmFsdWUsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgaW1nLnNyYyA9IHRoaXMudG9EYXRhVVJMKCk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBjYW52YXNlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2NhbnZhc1snICsgYXR0ciArICddJyksIGNhbnZhcztcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2FudmFzZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBjYW52YXMgPSBjYW52YXNlc1tpXTtcbiAgICAgICAgICAgICAgICBuZXcgQUpQRUcoKS5sb2FkKGNhbnZhcy5hdHRyaWJ1dGVzW2F0dHJdLnZhbHVlLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRvQ2FudmFzKGNhbnZhcyk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGxvYWRJbWFnZShzcmMsIGNiKSB7XG4gICAgICAgIHZhciBpbWcgPSBuZXcgSW1hZ2UoKTtcbiAgICAgICAgaW1nLmxvYWRlZCA9IGZhbHNlO1xuICAgICAgICBpbWcub25sb2FkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaW1nLmxvYWRlZCA9IHRydWU7XG4gICAgICAgICAgICBjYigpO1xuICAgICAgICB9XG4gICAgICAgIGltZy5zcmMgPSBzcmM7XG4gICAgICAgIHJldHVybiBpbWc7XG4gICAgfVxuXG5cbiAgICBpZiAodHlwZW9mIG1vZHVsZSAhPSBcInVuZGVmaW5lZFwiKVxuICAgICAgICBtb2R1bGUuZXhwb3J0cyA9IEFKUEVHO1xuXG59KCkpOyJdfQ==
