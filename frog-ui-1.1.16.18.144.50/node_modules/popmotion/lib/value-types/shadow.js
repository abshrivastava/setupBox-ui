'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _color = require('./color');

var _color2 = _interopRequireDefault(_color);

var _px = require('./px');

var _dictionary = require('./settings/dictionary');

var _utils = require('../inc/utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var shadowWithoutColorTerms = _dictionary.shadow.slice(0, 4);

exports.default = {
  defaultProps: _extends({}, _color2.default.defaultProps, {
    X: _px.defaultProps,
    Y: _px.defaultProps,
    Radius: _px.defaultProps,
    Spread: _px.defaultProps
  }),

  split: function (value) {
    var bits = (0, _utils.splitSpaceDelimited)(value);
    var hasReachedColor = false;
    var colorProp = '';
    var splitValue = {};

    bits.forEach(function (bit, i) {
      // If we've reached the color props, append to color string
      if (hasReachedColor || _color2.default.test(bit)) {
        hasReachedColor = true;
        colorProp += bit;

        // Else process shadow value
      } else {
        splitValue[_dictionary.shadow[i]] = bit;
      }
    });

    var splitColorProps = _color2.default.split(colorProp);

    return _extends({}, splitValue, { splitColorProps: splitColorProps });
  },

  combine: function (values) {
    return (0, _utils.createDelimited)(values, shadowWithoutColorTerms, ' ') + _color2.default.combine(values);
  }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy92YWx1ZS10eXBlcy9zaGFkb3cuanMiXSwibmFtZXMiOlsic2hhZG93V2l0aG91dENvbG9yVGVybXMiLCJzbGljZSIsImRlZmF1bHRQcm9wcyIsIlgiLCJZIiwiUmFkaXVzIiwiU3ByZWFkIiwic3BsaXQiLCJ2YWx1ZSIsImJpdHMiLCJoYXNSZWFjaGVkQ29sb3IiLCJjb2xvclByb3AiLCJzcGxpdFZhbHVlIiwiZm9yRWFjaCIsImJpdCIsImkiLCJ0ZXN0Iiwic3BsaXRDb2xvclByb3BzIiwiY29tYmluZSIsInZhbHVlcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7Ozs7QUFDQTs7QUFDQTs7QUFDQTs7OztBQUVBLElBQU1BLDBCQUEwQixtQkFBWUMsS0FBWixDQUFrQixDQUFsQixFQUFxQixDQUFyQixDQUFoQzs7a0JBRWU7QUFDYkMsNkJBQ0ssZ0JBQU1BLFlBRFg7QUFFRUMsdUJBRkY7QUFHRUMsdUJBSEY7QUFJRUMsNEJBSkY7QUFLRUM7QUFMRixJQURhOztBQVNiQyxTQUFPLFVBQUNDLEtBQUQsRUFBVztBQUNoQixRQUFNQyxPQUFPLGdDQUFvQkQsS0FBcEIsQ0FBYjtBQUNBLFFBQUlFLGtCQUFrQixLQUF0QjtBQUNBLFFBQUlDLFlBQVksRUFBaEI7QUFDQSxRQUFJQyxhQUFhLEVBQWpCOztBQUVBSCxTQUFLSSxPQUFMLENBQWEsVUFBQ0MsR0FBRCxFQUFNQyxDQUFOLEVBQVk7QUFDdkI7QUFDQSxVQUFJTCxtQkFBbUIsZ0JBQU1NLElBQU4sQ0FBV0YsR0FBWCxDQUF2QixFQUF3QztBQUN0Q0osMEJBQWtCLElBQWxCO0FBQ0FDLHFCQUFhRyxHQUFiOztBQUVGO0FBQ0MsT0FMRCxNQUtPO0FBQ0xGLG1CQUFXLG1CQUFZRyxDQUFaLENBQVgsSUFBNkJELEdBQTdCO0FBQ0Q7QUFDRixLQVZEOztBQVlBLFFBQU1HLGtCQUFrQixnQkFBTVYsS0FBTixDQUFZSSxTQUFaLENBQXhCOztBQUVBLHdCQUFZQyxVQUFaLElBQXdCSyxnQ0FBeEI7QUFDRCxHQTlCWTs7QUFnQ2JDLFdBQVMsVUFBQ0MsTUFBRDtBQUFBLFdBQVksNEJBQWdCQSxNQUFoQixFQUF3Qm5CLHVCQUF4QixFQUFpRCxHQUFqRCxJQUF3RCxnQkFBTWtCLE9BQU4sQ0FBY0MsTUFBZCxDQUFwRTtBQUFBO0FBaENJLEMiLCJmaWxlIjoic2hhZG93LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNvbG9yIGZyb20gJy4vY29sb3InO1xuaW1wb3J0IHsgZGVmYXVsdFByb3BzIGFzIHB4RGVmYXVsdFByb3BzIH0gZnJvbSAnLi9weCc7XG5pbXBvcnQgeyBzaGFkb3cgYXMgc2hhZG93VGVybXMgfSBmcm9tICcuL3NldHRpbmdzL2RpY3Rpb25hcnknO1xuaW1wb3J0IHsgc3BsaXRTcGFjZURlbGltaXRlZCwgY3JlYXRlRGVsaW1pdGVkIH0gZnJvbSAnLi4vaW5jL3V0aWxzJztcblxuY29uc3Qgc2hhZG93V2l0aG91dENvbG9yVGVybXMgPSBzaGFkb3dUZXJtcy5zbGljZSgwLCA0KTtcblxuZXhwb3J0IGRlZmF1bHQge1xuICBkZWZhdWx0UHJvcHM6IHtcbiAgICAuLi5jb2xvci5kZWZhdWx0UHJvcHMsXG4gICAgWDogcHhEZWZhdWx0UHJvcHMsXG4gICAgWTogcHhEZWZhdWx0UHJvcHMsXG4gICAgUmFkaXVzOiBweERlZmF1bHRQcm9wcyxcbiAgICBTcHJlYWQ6IHB4RGVmYXVsdFByb3BzXG4gIH0sXG5cbiAgc3BsaXQ6ICh2YWx1ZSkgPT4ge1xuICAgIGNvbnN0IGJpdHMgPSBzcGxpdFNwYWNlRGVsaW1pdGVkKHZhbHVlKTtcbiAgICBsZXQgaGFzUmVhY2hlZENvbG9yID0gZmFsc2U7XG4gICAgbGV0IGNvbG9yUHJvcCA9ICcnO1xuICAgIGxldCBzcGxpdFZhbHVlID0ge307XG5cbiAgICBiaXRzLmZvckVhY2goKGJpdCwgaSkgPT4ge1xuICAgICAgLy8gSWYgd2UndmUgcmVhY2hlZCB0aGUgY29sb3IgcHJvcHMsIGFwcGVuZCB0byBjb2xvciBzdHJpbmdcbiAgICAgIGlmIChoYXNSZWFjaGVkQ29sb3IgfHwgY29sb3IudGVzdChiaXQpKSB7XG4gICAgICAgIGhhc1JlYWNoZWRDb2xvciA9IHRydWU7XG4gICAgICAgIGNvbG9yUHJvcCArPSBiaXQ7XG5cbiAgICAgIC8vIEVsc2UgcHJvY2VzcyBzaGFkb3cgdmFsdWVcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNwbGl0VmFsdWVbc2hhZG93VGVybXNbaV1dID0gYml0O1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3Qgc3BsaXRDb2xvclByb3BzID0gY29sb3Iuc3BsaXQoY29sb3JQcm9wKTtcblxuICAgIHJldHVybiB7IC4uLnNwbGl0VmFsdWUsIHNwbGl0Q29sb3JQcm9wcyB9O1xuICB9LFxuXG4gIGNvbWJpbmU6ICh2YWx1ZXMpID0+IGNyZWF0ZURlbGltaXRlZCh2YWx1ZXMsIHNoYWRvd1dpdGhvdXRDb2xvclRlcm1zLCAnICcpICsgY29sb3IuY29tYmluZSh2YWx1ZXMpXG59O1xuIl19