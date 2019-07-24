'use strict';

exports.__esModule = true;
exports.getElementData = exports.setter = exports.getter = undefined;

var _stateMap = require('./css/state-map');

var _stateMap2 = _interopRequireDefault(_stateMap);

var _valueTypeMap = require('./svg/value-type-map');

var _valueTypeMap2 = _interopRequireDefault(_valueTypeMap);

var _transformProps = require('./css/transform-props');

var _transformProps2 = _interopRequireDefault(_transformProps);

var _build = require('./svg/build');

var _build2 = _interopRequireDefault(_build);

var _attrAdapter = require('./attr-adapter');

var _adapter = require('./adapter');

var _adapter2 = _interopRequireDefault(_adapter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getter = exports.getter = function (element, key) {
  return !_transformProps2.default[key] ? (0, _attrAdapter.getter)(element, key) : _valueTypeMap2.default[key] && _valueTypeMap2.default[key].defaultProps ? _valueTypeMap2.default[key].defaultProps.current : 0;
};
var setter = exports.setter = function (element, props, data) {
  return (0, _attrAdapter.setter)(element, (0, _build2.default)(props, data));
};
var getElementData = exports.getElementData = function (element) {
  var bBox = element.getBBox();
  return {
    x: bBox.x,
    y: bBox.y,
    width: bBox.width,
    height: bBox.height
  };
};

exports.default = (0, _adapter2.default)({ getter: getter, setter: setter, stateMap: _stateMap2.default, valueTypeMap: _valueTypeMap2.default, getElementData: getElementData });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hZGFwdGVyL3N2Zy1hZGFwdGVyLmpzIl0sIm5hbWVzIjpbImdldHRlciIsImVsZW1lbnQiLCJrZXkiLCJkZWZhdWx0UHJvcHMiLCJjdXJyZW50Iiwic2V0dGVyIiwicHJvcHMiLCJkYXRhIiwiZ2V0RWxlbWVudERhdGEiLCJiQm94IiwiZ2V0QkJveCIsIngiLCJ5Iiwid2lkdGgiLCJoZWlnaHQiLCJzdGF0ZU1hcCIsInZhbHVlVHlwZU1hcCJdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOztBQUNBOzs7Ozs7QUFFTyxJQUFNQSwwQkFBUyxVQUFDQyxPQUFELEVBQVVDLEdBQVY7QUFBQSxTQUFtQixDQUFDLHlCQUFlQSxHQUFmLENBQUYsR0FBeUIseUJBQVdELE9BQVgsRUFBb0JDLEdBQXBCLENBQXpCLEdBQXFELHVCQUFhQSxHQUFiLEtBQXFCLHVCQUFhQSxHQUFiLEVBQWtCQyxZQUF4QyxHQUF3RCx1QkFBYUQsR0FBYixFQUFrQkMsWUFBbEIsQ0FBK0JDLE9BQXZGLEdBQWlHLENBQXZLO0FBQUEsQ0FBZjtBQUNBLElBQU1DLDBCQUFTLFVBQUNKLE9BQUQsRUFBVUssS0FBVixFQUFpQkMsSUFBakI7QUFBQSxTQUEwQix5QkFBV04sT0FBWCxFQUFvQixxQkFBTUssS0FBTixFQUFhQyxJQUFiLENBQXBCLENBQTFCO0FBQUEsQ0FBZjtBQUNBLElBQU1DLDBDQUFpQixVQUFDUCxPQUFELEVBQWE7QUFDekMsTUFBTVEsT0FBT1IsUUFBUVMsT0FBUixFQUFiO0FBQ0EsU0FBTztBQUNMQyxPQUFHRixLQUFLRSxDQURIO0FBRUxDLE9BQUdILEtBQUtHLENBRkg7QUFHTEMsV0FBT0osS0FBS0ksS0FIUDtBQUlMQyxZQUFRTCxLQUFLSztBQUpSLEdBQVA7QUFNRCxDQVJNOztrQkFVUSx1QkFBYyxFQUFFZCxjQUFGLEVBQVVLLGNBQVYsRUFBa0JVLDRCQUFsQixFQUE0QkMsb0NBQTVCLEVBQTBDUiw4QkFBMUMsRUFBZCxDIiwiZmlsZSI6InN2Zy1hZGFwdGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHN0YXRlTWFwIGZyb20gJy4vY3NzL3N0YXRlLW1hcCc7XG5pbXBvcnQgdmFsdWVUeXBlTWFwIGZyb20gJy4vc3ZnL3ZhbHVlLXR5cGUtbWFwJztcbmltcG9ydCB0cmFuc2Zvcm1Qcm9wcyBmcm9tICcuL2Nzcy90cmFuc2Zvcm0tcHJvcHMnO1xuaW1wb3J0IGJ1aWxkIGZyb20gJy4vc3ZnL2J1aWxkJztcbmltcG9ydCB7IGdldHRlciBhcyBhdHRyR2V0dGVyLCBzZXR0ZXIgYXMgYXR0clNldHRlciB9IGZyb20gJy4vYXR0ci1hZGFwdGVyJztcbmltcG9ydCBjcmVhdGVBZGFwdGVyIGZyb20gJy4vYWRhcHRlcic7XG5cbmV4cG9ydCBjb25zdCBnZXR0ZXIgPSAoZWxlbWVudCwga2V5KSA9PiAoIXRyYW5zZm9ybVByb3BzW2tleV0pID8gYXR0ckdldHRlcihlbGVtZW50LCBrZXkpIDogKHZhbHVlVHlwZU1hcFtrZXldICYmIHZhbHVlVHlwZU1hcFtrZXldLmRlZmF1bHRQcm9wcykgPyB2YWx1ZVR5cGVNYXBba2V5XS5kZWZhdWx0UHJvcHMuY3VycmVudCA6IDA7XG5leHBvcnQgY29uc3Qgc2V0dGVyID0gKGVsZW1lbnQsIHByb3BzLCBkYXRhKSA9PiBhdHRyU2V0dGVyKGVsZW1lbnQsIGJ1aWxkKHByb3BzLCBkYXRhKSk7XG5leHBvcnQgY29uc3QgZ2V0RWxlbWVudERhdGEgPSAoZWxlbWVudCkgPT4ge1xuICBjb25zdCBiQm94ID0gZWxlbWVudC5nZXRCQm94KCk7XG4gIHJldHVybiB7XG4gICAgeDogYkJveC54LFxuICAgIHk6IGJCb3gueSxcbiAgICB3aWR0aDogYkJveC53aWR0aCwgXG4gICAgaGVpZ2h0OiBiQm94LmhlaWdodFxuICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlQWRhcHRlcih7IGdldHRlciwgc2V0dGVyLCBzdGF0ZU1hcCwgdmFsdWVUeXBlTWFwLCBnZXRFbGVtZW50RGF0YSB9KTtcbiJdfQ==