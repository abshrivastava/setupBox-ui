'use strict';

exports.__esModule = true;

var _color = require('../value-types/color');

var _color2 = _interopRequireDefault(_color);

var _complex = require('../value-types/complex');

var _complex2 = _interopRequireDefault(_complex);

var _unit = require('../value-types/unit');

var _unit2 = _interopRequireDefault(_unit);

var _utils = require('../inc/utils');

var _numericalValues = require('../inc/numerical-values');

var _numericalValues2 = _interopRequireDefault(_numericalValues);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NUM_NUMERICAL_VALUES = _numericalValues2.default.length;

exports.default = function (value) {
  for (var i = 0; i < NUM_NUMERICAL_VALUES; i++) {
    var valueProp = value[_numericalValues2.default[i]];
    if ((0, _utils.isString)(valueProp)) {
      if (_color2.default.test(valueProp)) {
        return _color2.default;
      } else if (_complex2.default.test(valueProp)) {
        return _complex2.default;
      } else if (_unit2.default.test(valueProp)) {
        return _unit2.default;
      }
    }
  }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy92YWx1ZS10eXBlcy9kZXRlY3QuanMiXSwibmFtZXMiOlsiTlVNX05VTUVSSUNBTF9WQUxVRVMiLCJsZW5ndGgiLCJ2YWx1ZSIsImkiLCJ2YWx1ZVByb3AiLCJ0ZXN0Il0sIm1hcHBpbmdzIjoiOzs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7OztBQUVBLElBQU1BLHVCQUF1QiwwQkFBaUJDLE1BQTlDOztrQkFFZSxVQUFDQyxLQUFELEVBQVc7QUFDeEIsT0FBSyxJQUFJQyxJQUFJLENBQWIsRUFBZ0JBLElBQUlILG9CQUFwQixFQUEwQ0csR0FBMUMsRUFBK0M7QUFDN0MsUUFBTUMsWUFBWUYsTUFBTSwwQkFBaUJDLENBQWpCLENBQU4sQ0FBbEI7QUFDQSxRQUFJLHFCQUFTQyxTQUFULENBQUosRUFBeUI7QUFDdkIsVUFBSSxnQkFBVUMsSUFBVixDQUFlRCxTQUFmLENBQUosRUFBK0I7QUFDN0I7QUFDRCxPQUZELE1BRU8sSUFBSSxrQkFBWUMsSUFBWixDQUFpQkQsU0FBakIsQ0FBSixFQUFpQztBQUN0QztBQUNELE9BRk0sTUFFQSxJQUFJLGVBQVNDLElBQVQsQ0FBY0QsU0FBZCxDQUFKLEVBQThCO0FBQ25DO0FBQ0Q7QUFDRjtBQUNGO0FBQ0YsQyIsImZpbGUiOiJkZXRlY3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgY29sb3JUeXBlIGZyb20gJy4uL3ZhbHVlLXR5cGVzL2NvbG9yJztcbmltcG9ydCBjb21wbGV4VHlwZSBmcm9tICcuLi92YWx1ZS10eXBlcy9jb21wbGV4JztcbmltcG9ydCB1bml0VHlwZSBmcm9tICcuLi92YWx1ZS10eXBlcy91bml0JztcbmltcG9ydCB7IGlzU3RyaW5nIH0gZnJvbSAnLi4vaW5jL3V0aWxzJztcbmltcG9ydCBOVU1FUklDQUxfVkFMVUVTIGZyb20gJy4uL2luYy9udW1lcmljYWwtdmFsdWVzJztcblxuY29uc3QgTlVNX05VTUVSSUNBTF9WQUxVRVMgPSBOVU1FUklDQUxfVkFMVUVTLmxlbmd0aDtcblxuZXhwb3J0IGRlZmF1bHQgKHZhbHVlKSA9PiB7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgTlVNX05VTUVSSUNBTF9WQUxVRVM7IGkrKykge1xuICAgIGNvbnN0IHZhbHVlUHJvcCA9IHZhbHVlW05VTUVSSUNBTF9WQUxVRVNbaV1dO1xuICAgIGlmIChpc1N0cmluZyh2YWx1ZVByb3ApKSB7XG4gICAgICBpZiAoY29sb3JUeXBlLnRlc3QodmFsdWVQcm9wKSkge1xuICAgICAgICByZXR1cm4gY29sb3JUeXBlO1xuICAgICAgfSBlbHNlIGlmIChjb21wbGV4VHlwZS50ZXN0KHZhbHVlUHJvcCkpIHtcbiAgICAgICAgcmV0dXJuIGNvbXBsZXhUeXBlO1xuICAgICAgfSBlbHNlIGlmICh1bml0VHlwZS50ZXN0KHZhbHVlUHJvcCkpIHtcbiAgICAgICAgcmV0dXJuIHVuaXRUeXBlO1xuICAgICAgfVxuICAgIH1cbiAgfVxufTsiXX0=