'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _rgb = require('./rgb');

var _rgb2 = _interopRequireDefault(_rgb);

var _hsl = require('./hsl');

var _hsl2 = _interopRequireDefault(_hsl);

var _hex = require('./hex');

var _hex2 = _interopRequireDefault(_hex);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var colorTypes = [_rgb2.default, _hsl2.default, _hex2.default];
var numColorTypes = colorTypes.length;

exports.default = {
  defaultProps: _extends({}, _rgb2.default.defaultProps, _hsl2.default.defaultProps),

  test: function (value) {
    return _rgb2.default.test(value) || _hex2.default.test(value) || _hsl2.default.test(value);
  },

  split: function (value) {
    for (var i = 0; i < numColorTypes; i++) {
      if (colorTypes[i].test(value)) {
        return colorTypes[i].split(value);
      }
    }
  },

  combine: function (values) {
    return values.Red !== undefined ? _rgb2.default.combine(values) : _hsl2.default.combine(values);
  }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy92YWx1ZS10eXBlcy9jb2xvci5qcyJdLCJuYW1lcyI6WyJjb2xvclR5cGVzIiwibnVtQ29sb3JUeXBlcyIsImxlbmd0aCIsImRlZmF1bHRQcm9wcyIsInRlc3QiLCJ2YWx1ZSIsInNwbGl0IiwiaSIsImNvbWJpbmUiLCJ2YWx1ZXMiLCJSZWQiLCJ1bmRlZmluZWQiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRUEsSUFBTUEsYUFBYSw2Q0FBbkI7QUFDQSxJQUFNQyxnQkFBZ0JELFdBQVdFLE1BQWpDOztrQkFFZTtBQUNiQyw2QkFBbUIsY0FBSUEsWUFBdkIsRUFBd0MsY0FBSUEsWUFBNUMsQ0FEYTs7QUFHYkMsUUFBTSxVQUFDQyxLQUFEO0FBQUEsV0FBVyxjQUFJRCxJQUFKLENBQVNDLEtBQVQsS0FBbUIsY0FBSUQsSUFBSixDQUFTQyxLQUFULENBQW5CLElBQXNDLGNBQUlELElBQUosQ0FBU0MsS0FBVCxDQUFqRDtBQUFBLEdBSE87O0FBS2JDLFNBQU8sVUFBQ0QsS0FBRCxFQUFXO0FBQ2hCLFNBQUssSUFBSUUsSUFBSSxDQUFiLEVBQWdCQSxJQUFJTixhQUFwQixFQUFtQ00sR0FBbkMsRUFBd0M7QUFDdEMsVUFBSVAsV0FBV08sQ0FBWCxFQUFjSCxJQUFkLENBQW1CQyxLQUFuQixDQUFKLEVBQStCO0FBQzdCLGVBQU9MLFdBQVdPLENBQVgsRUFBY0QsS0FBZCxDQUFvQkQsS0FBcEIsQ0FBUDtBQUNEO0FBQ0Y7QUFDRixHQVhZOztBQWFiRyxXQUFTLFVBQUNDLE1BQUQ7QUFBQSxXQUFhQSxPQUFPQyxHQUFQLEtBQWVDLFNBQWhCLEdBQTZCLGNBQUlILE9BQUosQ0FBWUMsTUFBWixDQUE3QixHQUFtRCxjQUFJRCxPQUFKLENBQVlDLE1BQVosQ0FBL0Q7QUFBQTtBQWJJLEMiLCJmaWxlIjoiY29sb3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgcmdiIGZyb20gJy4vcmdiJztcbmltcG9ydCBoc2wgZnJvbSAnLi9oc2wnO1xuaW1wb3J0IGhleCBmcm9tICcuL2hleCc7XG5cbmNvbnN0IGNvbG9yVHlwZXMgPSBbcmdiLCBoc2wsIGhleF07XG5jb25zdCBudW1Db2xvclR5cGVzID0gY29sb3JUeXBlcy5sZW5ndGg7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgZGVmYXVsdFByb3BzOiB7IC4uLnJnYi5kZWZhdWx0UHJvcHMsIC4uLmhzbC5kZWZhdWx0UHJvcHMgfSxcblxuICB0ZXN0OiAodmFsdWUpID0+IHJnYi50ZXN0KHZhbHVlKSB8fCBoZXgudGVzdCh2YWx1ZSkgfHwgaHNsLnRlc3QodmFsdWUpLFxuXG4gIHNwbGl0OiAodmFsdWUpID0+IHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG51bUNvbG9yVHlwZXM7IGkrKykge1xuICAgICAgaWYgKGNvbG9yVHlwZXNbaV0udGVzdCh2YWx1ZSkpIHtcbiAgICAgICAgcmV0dXJuIGNvbG9yVHlwZXNbaV0uc3BsaXQodmFsdWUpO1xuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICBjb21iaW5lOiAodmFsdWVzKSA9PiAodmFsdWVzLlJlZCAhPT0gdW5kZWZpbmVkKSA/IHJnYi5jb21iaW5lKHZhbHVlcykgOiBoc2wuY29tYmluZSh2YWx1ZXMpXG59O1xuIl19