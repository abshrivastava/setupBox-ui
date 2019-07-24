'use strict';

exports.__esModule = true;
exports.setter = exports.getter = undefined;

var _adapter = require('./adapter');

var _adapter2 = _interopRequireDefault(_adapter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getter = exports.getter = function (element, key) {
  return element.getAttribute(key);
};
var setter = exports.setter = function (element, props) {
  for (var key in props) {
    if (props.hasOwnProperty(key)) {
      element.setAttribute(key, props[key]);
    }
  }
};

exports.default = (0, _adapter2.default)({ getter: getter, setter: setter });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hZGFwdGVyL2F0dHItYWRhcHRlci5qcyJdLCJuYW1lcyI6WyJnZXR0ZXIiLCJlbGVtZW50Iiwia2V5IiwiZ2V0QXR0cmlidXRlIiwic2V0dGVyIiwicHJvcHMiLCJoYXNPd25Qcm9wZXJ0eSIsInNldEF0dHJpYnV0ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQTs7Ozs7O0FBRU8sSUFBTUEsMEJBQVMsVUFBQ0MsT0FBRCxFQUFVQyxHQUFWO0FBQUEsU0FBa0JELFFBQVFFLFlBQVIsQ0FBcUJELEdBQXJCLENBQWxCO0FBQUEsQ0FBZjtBQUNBLElBQU1FLDBCQUFTLFVBQUNILE9BQUQsRUFBVUksS0FBVixFQUFvQjtBQUN4QyxPQUFLLElBQUlILEdBQVQsSUFBZ0JHLEtBQWhCLEVBQXVCO0FBQ3JCLFFBQUlBLE1BQU1DLGNBQU4sQ0FBcUJKLEdBQXJCLENBQUosRUFBK0I7QUFDN0JELGNBQVFNLFlBQVIsQ0FBcUJMLEdBQXJCLEVBQTBCRyxNQUFNSCxHQUFOLENBQTFCO0FBQ0Q7QUFDRjtBQUNGLENBTk07O2tCQVFRLHVCQUFjLEVBQUVGLGNBQUYsRUFBVUksY0FBVixFQUFkLEMiLCJmaWxlIjoiYXR0ci1hZGFwdGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNyZWF0ZUFkYXB0ZXIgZnJvbSAnLi9hZGFwdGVyJztcblxuZXhwb3J0IGNvbnN0IGdldHRlciA9IChlbGVtZW50LCBrZXkpID0+IGVsZW1lbnQuZ2V0QXR0cmlidXRlKGtleSk7XG5leHBvcnQgY29uc3Qgc2V0dGVyID0gKGVsZW1lbnQsIHByb3BzKSA9PiB7XG4gIGZvciAobGV0IGtleSBpbiBwcm9wcykge1xuICAgIGlmIChwcm9wcy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZShrZXksIHByb3BzW2tleV0pO1xuICAgIH1cbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlQWRhcHRlcih7IGdldHRlciwgc2V0dGVyIH0pO1xuIl19