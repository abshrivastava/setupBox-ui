'use strict';

exports.__esModule = true;
/*
  Detect and load an appropriate clock setting for the environment
*/

var hasRAF = typeof window !== 'undefined' && window.requestAnimationFrame ? true : false;

var tick = void 0;

if (hasRAF) {
  tick = function (callback) {
    return window.requestAnimationFrame(callback);
  };
} else {
  (function () {
    /*
      requestAnimationFrame polyfill
      
      For IE8/9 Flinstones and non-browser environments
       Taken from Paul Irish. We've stripped out cancelAnimationFrame checks because we don't fox with that
      
      http://paulirish.com/2011/requestanimationframe-for-smart-animating/
      http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
       
      requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel
       
      MIT license
    */
    var lastTime = 0;

    tick = function (callback) {
      var currentTime = new Date().getTime();
      var timeToCall = Math.max(0, 16 - (currentTime - lastTime));

      lastTime = currentTime + timeToCall;

      setTimeout(function () {
        return callback(lastTime);
      }, timeToCall);
    };
  })();
}

exports.default = tick;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90YXNrL3RpY2suanMiXSwibmFtZXMiOlsiaGFzUkFGIiwid2luZG93IiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwidGljayIsImNhbGxiYWNrIiwibGFzdFRpbWUiLCJjdXJyZW50VGltZSIsIkRhdGUiLCJnZXRUaW1lIiwidGltZVRvQ2FsbCIsIk1hdGgiLCJtYXgiLCJzZXRUaW1lb3V0Il0sIm1hcHBpbmdzIjoiOzs7QUFBQTs7OztBQUlBLElBQU1BLFNBQVUsT0FBT0MsTUFBUCxLQUFrQixXQUFsQixJQUFpQ0EsT0FBT0MscUJBQXpDLEdBQWtFLElBQWxFLEdBQXlFLEtBQXhGOztBQUVBLElBQUlDLGFBQUo7O0FBRUEsSUFBSUgsTUFBSixFQUFZO0FBQ1ZHLFNBQU8sVUFBQ0MsUUFBRDtBQUFBLFdBQWNILE9BQU9DLHFCQUFQLENBQTZCRSxRQUE3QixDQUFkO0FBQUEsR0FBUDtBQUVELENBSEQsTUFHTztBQUFBO0FBQ0w7Ozs7Ozs7Ozs7Ozs7QUFjQSxRQUFJQyxXQUFXLENBQWY7O0FBRUFGLFdBQU8sVUFBQ0MsUUFBRCxFQUFjO0FBQ25CLFVBQU1FLGNBQWMsSUFBSUMsSUFBSixHQUFXQyxPQUFYLEVBQXBCO0FBQ0EsVUFBTUMsYUFBYUMsS0FBS0MsR0FBTCxDQUFTLENBQVQsRUFBWSxNQUFNTCxjQUFjRCxRQUFwQixDQUFaLENBQW5COztBQUVBQSxpQkFBV0MsY0FBY0csVUFBekI7O0FBRUFHLGlCQUFXO0FBQUEsZUFBTVIsU0FBU0MsUUFBVCxDQUFOO0FBQUEsT0FBWCxFQUFxQ0ksVUFBckM7QUFDRCxLQVBEO0FBakJLO0FBeUJOOztrQkFFY04sSSIsImZpbGUiOiJ0aWNrLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAgRGV0ZWN0IGFuZCBsb2FkIGFuIGFwcHJvcHJpYXRlIGNsb2NrIHNldHRpbmcgZm9yIHRoZSBlbnZpcm9ubWVudFxuKi9cblxuY29uc3QgaGFzUkFGID0gKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUpID8gdHJ1ZSA6IGZhbHNlO1xuXG5sZXQgdGljaztcblxuaWYgKGhhc1JBRikge1xuICB0aWNrID0gKGNhbGxiYWNrKSA9PiB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGNhbGxiYWNrKTtcblxufSBlbHNlIHtcbiAgLypcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUgcG9seWZpbGxcbiAgICBcbiAgICBGb3IgSUU4LzkgRmxpbnN0b25lcyBhbmQgbm9uLWJyb3dzZXIgZW52aXJvbm1lbnRzXG5cbiAgICBUYWtlbiBmcm9tIFBhdWwgSXJpc2guIFdlJ3ZlIHN0cmlwcGVkIG91dCBjYW5jZWxBbmltYXRpb25GcmFtZSBjaGVja3MgYmVjYXVzZSB3ZSBkb24ndCBmb3ggd2l0aCB0aGF0XG4gICAgXG4gICAgaHR0cDovL3BhdWxpcmlzaC5jb20vMjAxMS9yZXF1ZXN0YW5pbWF0aW9uZnJhbWUtZm9yLXNtYXJ0LWFuaW1hdGluZy9cbiAgICBodHRwOi8vbXkub3BlcmEuY29tL2Vtb2xsZXIvYmxvZy8yMDExLzEyLzIwL3JlcXVlc3RhbmltYXRpb25mcmFtZS1mb3Itc21hcnQtZXItYW5pbWF0aW5nXG4gICAgIFxuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSBwb2x5ZmlsbCBieSBFcmlrIE3DtmxsZXIuIGZpeGVzIGZyb20gUGF1bCBJcmlzaCBhbmQgVGlubyBaaWpkZWxcbiAgICAgXG4gICAgTUlUIGxpY2Vuc2VcbiAgKi9cbiAgbGV0IGxhc3RUaW1lID0gMDtcblxuICB0aWNrID0gKGNhbGxiYWNrKSA9PiB7XG4gICAgY29uc3QgY3VycmVudFRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICBjb25zdCB0aW1lVG9DYWxsID0gTWF0aC5tYXgoMCwgMTYgLSAoY3VycmVudFRpbWUgLSBsYXN0VGltZSkpO1xuXG4gICAgbGFzdFRpbWUgPSBjdXJyZW50VGltZSArIHRpbWVUb0NhbGw7XG5cbiAgICBzZXRUaW1lb3V0KCgpID0+IGNhbGxiYWNrKGxhc3RUaW1lKSwgdGltZVRvQ2FsbCk7XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IHRpY2s7Il19