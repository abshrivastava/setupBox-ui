'use strict';

exports.__esModule = true;

var _stateMap = require('./css/state-map');

var _stateMap2 = _interopRequireDefault(_stateMap);

var _valueTypeMap = require('./css/value-type-map');

var _valueTypeMap2 = _interopRequireDefault(_valueTypeMap);

var _build = require('./css/build');

var _build2 = _interopRequireDefault(_build);

var _prefixer = require('./css/prefixer');

var _prefixer2 = _interopRequireDefault(_prefixer);

var _transformProps = require('./css/transform-props');

var _transformProps2 = _interopRequireDefault(_transformProps);

var _adapter = require('./adapter');

var _adapter2 = _interopRequireDefault(_adapter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _adapter2.default)({
  getter: function (element, key) {
    return !_transformProps2.default[key] ? window.getComputedStyle(element, null)[(0, _prefixer2.default)(key)] : _valueTypeMap2.default[key].defaultProps.current || 0;
  },
  setter: function (element, props) {
    return element.style.cssText += (0, _build2.default)(props);
  },
  valueTypeMap: _valueTypeMap2.default,
  stateMap: _stateMap2.default
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hZGFwdGVyL2Nzcy1hZGFwdGVyLmpzIl0sIm5hbWVzIjpbImdldHRlciIsImVsZW1lbnQiLCJrZXkiLCJ3aW5kb3ciLCJnZXRDb21wdXRlZFN0eWxlIiwiZGVmYXVsdFByb3BzIiwiY3VycmVudCIsInNldHRlciIsInByb3BzIiwic3R5bGUiLCJjc3NUZXh0IiwidmFsdWVUeXBlTWFwIiwic3RhdGVNYXAiXSwibWFwcGluZ3MiOiI7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztrQkFFZSx1QkFBYztBQUMzQkEsVUFBUSxVQUFDQyxPQUFELEVBQVVDLEdBQVYsRUFBa0I7QUFDeEIsV0FBUSxDQUFDLHlCQUFlQSxHQUFmLENBQUYsR0FDTEMsT0FBT0MsZ0JBQVAsQ0FBd0JILE9BQXhCLEVBQWlDLElBQWpDLEVBQXVDLHdCQUFTQyxHQUFULENBQXZDLENBREssR0FFTCx1QkFBYUEsR0FBYixFQUFrQkcsWUFBbEIsQ0FBK0JDLE9BQS9CLElBQTBDLENBRjVDO0FBR0QsR0FMMEI7QUFNM0JDLFVBQVEsVUFBQ04sT0FBRCxFQUFVTyxLQUFWO0FBQUEsV0FBb0JQLFFBQVFRLEtBQVIsQ0FBY0MsT0FBZCxJQUF5QixxQkFBb0JGLEtBQXBCLENBQTdDO0FBQUEsR0FObUI7QUFPM0JHLHNDQVAyQjtBQVEzQkM7QUFSMkIsQ0FBZCxDIiwiZmlsZSI6ImNzcy1hZGFwdGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHN0YXRlTWFwIGZyb20gJy4vY3NzL3N0YXRlLW1hcCc7XG5pbXBvcnQgdmFsdWVUeXBlTWFwIGZyb20gJy4vY3NzL3ZhbHVlLXR5cGUtbWFwJztcbmltcG9ydCBidWlsZFByb3BlcnR5U3RyaW5nIGZyb20gJy4vY3NzL2J1aWxkJztcbmltcG9ydCBwcmVmaXhlciBmcm9tICcuL2Nzcy9wcmVmaXhlcic7XG5pbXBvcnQgdHJhbnNmb3JtUHJvcHMgZnJvbSAnLi9jc3MvdHJhbnNmb3JtLXByb3BzJztcbmltcG9ydCBjcmVhdGVBZGFwdGVyIGZyb20gJy4vYWRhcHRlcic7XG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUFkYXB0ZXIoe1xuICBnZXR0ZXI6IChlbGVtZW50LCBrZXkpID0+IHtcbiAgICByZXR1cm4gKCF0cmFuc2Zvcm1Qcm9wc1trZXldKSA/XG4gICAgICB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50LCBudWxsKVtwcmVmaXhlcihrZXkpXSA6XG4gICAgICB2YWx1ZVR5cGVNYXBba2V5XS5kZWZhdWx0UHJvcHMuY3VycmVudCB8fCAwO1xuICB9LFxuICBzZXR0ZXI6IChlbGVtZW50LCBwcm9wcykgPT4gZWxlbWVudC5zdHlsZS5jc3NUZXh0ICs9IGJ1aWxkUHJvcGVydHlTdHJpbmcocHJvcHMpLFxuICB2YWx1ZVR5cGVNYXAsXG4gIHN0YXRlTWFwXG59KTtcblxuIl19