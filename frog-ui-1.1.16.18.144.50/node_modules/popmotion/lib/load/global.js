'use strict';

var _popmotion = require('../popmotion');

var popmotion = _interopRequireWildcard(_popmotion);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var UIref = window.motion;

popmotion.noConflict = function () {
  window.motion = UIref;
};

window.motion = window.popmotion = popmotion;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9sb2FkL2dsb2JhbC5qcyJdLCJuYW1lcyI6WyJwb3Btb3Rpb24iLCJVSXJlZiIsIndpbmRvdyIsIm1vdGlvbiIsIm5vQ29uZmxpY3QiXSwibWFwcGluZ3MiOiI7O0FBQUE7O0lBQVlBLFM7Ozs7QUFFWixJQUFNQyxRQUFRQyxPQUFPQyxNQUFyQjs7QUFFQUgsVUFBVUksVUFBVixHQUF1QixZQUFZO0FBQ2pDRixTQUFPQyxNQUFQLEdBQWdCRixLQUFoQjtBQUNELENBRkQ7O0FBSUFDLE9BQU9DLE1BQVAsR0FBZ0JELE9BQU9GLFNBQVAsR0FBbUJBLFNBQW5DIiwiZmlsZSI6Imdsb2JhbC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIHBvcG1vdGlvbiBmcm9tICcuLi9wb3Btb3Rpb24nO1xuXG5jb25zdCBVSXJlZiA9IHdpbmRvdy5tb3Rpb247XG5cbnBvcG1vdGlvbi5ub0NvbmZsaWN0ID0gZnVuY3Rpb24gKCkge1xuICB3aW5kb3cubW90aW9uID0gVUlyZWY7XG59O1xuXG53aW5kb3cubW90aW9uID0gd2luZG93LnBvcG1vdGlvbiA9IHBvcG1vdGlvbjsiXX0=