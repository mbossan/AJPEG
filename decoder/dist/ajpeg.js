(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

(function () {
    var AJPEG = window.AJPEG = function (config) {
        var self = this;
        self.img = null;
        self.mask = null;

        self.load = function (src, cb) {
            function onAllLoaded() {
                cb.call(self);
            }

            self.img = loadImage(src, onAllLoaded.bind(self));
        };

        self.toDataURL = function () {
            return self.toCanvas().toDataURL();
        };

        self.toCanvas = function () {
            var imagecanvas = document.createElement('canvas');
            var imagecontext = imagecanvas.getContext('2d');

            imagecanvas.width = self.img.width;
            imagecanvas.height = self.img.height / 2;

            imagecontext.drawImage(self.img, 0, self.img.height / 2, self.img.width, self.img.height / 2, 0, 0, self.img.width, self.img.height / 2);
            imagecontext.globalCompositeOperation = "lighter";
            imagecontext.drawImage(self.img, 0, 0, self.img.width, self.img.height / 2, 0, 0, self.img.width, self.img.height / 2);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZWNvZGVyL2pzL01haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FDLGFBQVk7QUFDVCxRQUFJLFFBQVEsT0FBTyxLQUFQLEdBQWUsVUFBVSxNQUFWLEVBQWtCO0FBQ3pDLFlBQUksT0FBTyxJQUFYO0FBQ0EsYUFBSyxHQUFMLEdBQVcsSUFBWDtBQUNBLGFBQUssSUFBTCxHQUFZLElBQVo7O0FBRUEsYUFBSyxJQUFMLEdBQVksVUFBVSxHQUFWLEVBQWUsRUFBZixFQUFtQjtBQUMzQixxQkFBUyxXQUFULEdBQXVCO0FBQ25CLG1CQUFHLElBQUgsQ0FBUSxJQUFSO0FBQ0g7O0FBRUQsaUJBQUssR0FBTCxHQUFXLFVBQVUsR0FBVixFQUFlLFlBQVksSUFBWixDQUFpQixJQUFqQixDQUFmLENBQVg7QUFDSCxTQU5EOztBQVFBLGFBQUssU0FBTCxHQUFpQixZQUFZO0FBQ3pCLG1CQUFPLEtBQUssUUFBTCxHQUFnQixTQUFoQixFQUFQO0FBQ0gsU0FGRDs7QUFJQSxhQUFLLFFBQUwsR0FBZ0IsWUFBWTtBQUN4QixnQkFBSSxjQUFjLFNBQVMsYUFBVCxDQUF1QixRQUF2QixDQUFsQjtBQUNBLGdCQUFJLGVBQWUsWUFBWSxVQUFaLENBQXVCLElBQXZCLENBQW5COztBQUVBLHdCQUFZLEtBQVosR0FBb0IsS0FBSyxHQUFMLENBQVMsS0FBN0I7QUFDQSx3QkFBWSxNQUFaLEdBQXFCLEtBQUssR0FBTCxDQUFTLE1BQVQsR0FBZ0IsQ0FBckM7O0FBRUEseUJBQWEsU0FBYixDQUF1QixLQUFLLEdBQTVCLEVBQWlDLENBQWpDLEVBQW9DLEtBQUssR0FBTCxDQUFTLE1BQVQsR0FBa0IsQ0FBdEQsRUFBeUQsS0FBSyxHQUFMLENBQVMsS0FBbEUsRUFBeUUsS0FBSyxHQUFMLENBQVMsTUFBVCxHQUFnQixDQUF6RixFQUEyRixDQUEzRixFQUE2RixDQUE3RixFQUErRixLQUFLLEdBQUwsQ0FBUyxLQUF4RyxFQUErRyxLQUFLLEdBQUwsQ0FBUyxNQUFULEdBQWdCLENBQS9IO0FBQ0EseUJBQWEsd0JBQWIsR0FBd0MsU0FBeEM7QUFDQSx5QkFBYSxTQUFiLENBQXVCLEtBQUssR0FBNUIsRUFBaUMsQ0FBakMsRUFBb0MsQ0FBcEMsRUFBdUMsS0FBSyxHQUFMLENBQVMsS0FBaEQsRUFBdUQsS0FBSyxHQUFMLENBQVMsTUFBVCxHQUFnQixDQUF2RSxFQUF5RSxDQUF6RSxFQUEyRSxDQUEzRSxFQUE2RSxLQUFLLEdBQUwsQ0FBUyxLQUF0RixFQUE2RixLQUFLLEdBQUwsQ0FBUyxNQUFULEdBQWdCLENBQTdHO0FBQ0EsbUJBQU8sV0FBUDtBQUNILFNBWEQ7QUFZSCxLQTdCRDs7QUFnQ0EsVUFBTSxLQUFOLEdBQWMsVUFBVSxJQUFWLEVBQWdCO0FBQzFCLFlBQUksT0FBTyxJQUFQLElBQWUsV0FBZixJQUE4QixDQUFDLElBQW5DLEVBQ0ksT0FBTyxXQUFQO0FBQ0osbUJBQVcsWUFBWTtBQUNuQixnQkFBSSxNQUFNLFNBQVMsZ0JBQVQsQ0FBMEIsU0FBUyxJQUFULEdBQWdCLEdBQTFDLENBQVY7QUFBQSxnQkFBMEQsR0FBMUQ7QUFDQSxpQkFBSyxJQUFJLElBQUksQ0FBYixFQUFnQixJQUFJLElBQUksTUFBeEIsRUFBZ0MsR0FBaEMsRUFBcUM7QUFDakMsc0JBQU0sSUFBSSxDQUFKLENBQU47QUFDQSxvQkFBSSxLQUFKLEdBQVksSUFBWixDQUFpQixJQUFJLENBQUosRUFBTyxVQUFQLENBQWtCLElBQWxCLEVBQXdCLEtBQXpDLEVBQWdELFlBQVk7QUFDeEQsd0JBQUksR0FBSixHQUFVLEtBQUssU0FBTCxFQUFWO0FBQ0gsaUJBRkQ7QUFHSDtBQUVKLFNBVEQ7QUFVSCxLQWJEOztBQWVBLGFBQVMsU0FBVCxDQUFtQixHQUFuQixFQUF3QixFQUF4QixFQUE0QjtBQUN4QixZQUFJLE1BQU0sSUFBSSxLQUFKLEVBQVY7QUFDQSxZQUFJLE1BQUosR0FBYSxLQUFiO0FBQ0EsWUFBSSxNQUFKLEdBQWEsWUFBWTtBQUNyQixnQkFBSSxNQUFKLEdBQWEsSUFBYjtBQUNBO0FBQ0gsU0FIRDtBQUlBLFlBQUksR0FBSixHQUFVLEdBQVY7QUFDQSxlQUFPLEdBQVA7QUFDSDs7QUFHRCxRQUFJLE9BQU8sTUFBUCxJQUFpQixXQUFyQixFQUNJLE9BQU8sT0FBUCxHQUFpQixLQUFqQjtBQUVQLENBL0RBLEdBQUQiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgQUpQRUcgPSB3aW5kb3cuQUpQRUcgPSBmdW5jdGlvbiAoY29uZmlnKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgc2VsZi5pbWcgPSBudWxsO1xuICAgICAgICBzZWxmLm1hc2sgPSBudWxsO1xuXG4gICAgICAgIHNlbGYubG9hZCA9IGZ1bmN0aW9uIChzcmMsIGNiKSB7XG4gICAgICAgICAgICBmdW5jdGlvbiBvbkFsbExvYWRlZCgpIHtcbiAgICAgICAgICAgICAgICBjYi5jYWxsKHNlbGYpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBzZWxmLmltZyA9IGxvYWRJbWFnZShzcmMsIG9uQWxsTG9hZGVkLmJpbmQoc2VsZikpO1xuICAgICAgICB9O1xuXG4gICAgICAgIHNlbGYudG9EYXRhVVJMID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHNlbGYudG9DYW52YXMoKS50b0RhdGFVUkwoKTtcbiAgICAgICAgfTtcblxuICAgICAgICBzZWxmLnRvQ2FudmFzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGltYWdlY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG4gICAgICAgICAgICB2YXIgaW1hZ2Vjb250ZXh0ID0gaW1hZ2VjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcblxuICAgICAgICAgICAgaW1hZ2VjYW52YXMud2lkdGggPSBzZWxmLmltZy53aWR0aDtcbiAgICAgICAgICAgIGltYWdlY2FudmFzLmhlaWdodCA9IHNlbGYuaW1nLmhlaWdodC8yO1xuXG4gICAgICAgICAgICBpbWFnZWNvbnRleHQuZHJhd0ltYWdlKHNlbGYuaW1nLCAwLCBzZWxmLmltZy5oZWlnaHQgLyAyLCBzZWxmLmltZy53aWR0aCwgc2VsZi5pbWcuaGVpZ2h0LzIsMCwwLHNlbGYuaW1nLndpZHRoLCBzZWxmLmltZy5oZWlnaHQvMik7XG4gICAgICAgICAgICBpbWFnZWNvbnRleHQuZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uID0gXCJsaWdodGVyXCI7XG4gICAgICAgICAgICBpbWFnZWNvbnRleHQuZHJhd0ltYWdlKHNlbGYuaW1nLCAwLCAwLCBzZWxmLmltZy53aWR0aCwgc2VsZi5pbWcuaGVpZ2h0LzIsMCwwLHNlbGYuaW1nLndpZHRoLCBzZWxmLmltZy5oZWlnaHQvMik7XG4gICAgICAgICAgICByZXR1cm4gaW1hZ2VjYW52YXM7XG4gICAgICAgIH07XG4gICAgfTtcblxuICAgIC8vU1RBVElDXG4gICAgQUpQRUcucGFyc2UgPSBmdW5jdGlvbiAoYXR0cikge1xuICAgICAgICBpZiAodHlwZW9mIGF0dHIgPT0gXCJ1bmRlZmluZWRcIiB8fCAhYXR0cilcbiAgICAgICAgICAgIGF0dHIgPSAnYWxwaGEtc3JjJztcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgaW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnaW1nWycgKyBhdHRyICsgJ10nKSwgaW1nO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBpbXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpbWcgPSBpbXNbaV07XG4gICAgICAgICAgICAgICAgbmV3IEFKUEVHKCkubG9hZChpbXNbaV0uYXR0cmlidXRlc1thdHRyXS52YWx1ZSwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBpbWcuc3JjID0gdGhpcy50b0RhdGFVUkwoKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBsb2FkSW1hZ2Uoc3JjLCBjYikge1xuICAgICAgICB2YXIgaW1nID0gbmV3IEltYWdlKCk7XG4gICAgICAgIGltZy5sb2FkZWQgPSBmYWxzZTtcbiAgICAgICAgaW1nLm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGltZy5sb2FkZWQgPSB0cnVlO1xuICAgICAgICAgICAgY2IoKTtcbiAgICAgICAgfVxuICAgICAgICBpbWcuc3JjID0gc3JjO1xuICAgICAgICByZXR1cm4gaW1nO1xuICAgIH1cblxuXG4gICAgaWYgKHR5cGVvZiBtb2R1bGUgIT0gXCJ1bmRlZmluZWRcIilcbiAgICAgICAgbW9kdWxlLmV4cG9ydHMgPSBBSlBFRztcblxufSgpKTsiXX0=
