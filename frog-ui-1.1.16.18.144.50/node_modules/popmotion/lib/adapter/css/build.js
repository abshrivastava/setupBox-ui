'use strict';

exports.__esModule = true;

var _transformProps = require('./transform-props');

var _transformProps2 = _interopRequireDefault(_transformProps);

var _prefixer = require('./prefixer');

var _prefixer2 = _interopRequireDefault(_prefixer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TRANSLATE_Z = 'translateZ';

exports.default = function (state, disableHardwareAcceleration) {
  var propertyString = '';
  var transformString = '';
  var transformHasZ = false;

  for (var key in state) {
    if (state.hasOwnProperty(key)) {
      var value = state[key];

      if (_transformProps2.default[key]) {
        transformString += key + '(' + value + ') ';
        transformHasZ = key === TRANSLATE_Z ? true : transformHasZ;
      } else {
        propertyString += ';' + (0, _prefixer2.default)(key, true) + ':' + value;
      }
    }
  }

  if (transformString !== '') {
    if (!transformHasZ && !disableHardwareAcceleration) {
      transformString += TRANSLATE_Z + '(0px)';
    }

    propertyString += ';' + (0, _prefixer2.default)('transform', true) + ':' + transformString;
  }

  return propertyString;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hZGFwdGVyL2Nzcy9idWlsZC5qcyJdLCJuYW1lcyI6WyJUUkFOU0xBVEVfWiIsInN0YXRlIiwiZGlzYWJsZUhhcmR3YXJlQWNjZWxlcmF0aW9uIiwicHJvcGVydHlTdHJpbmciLCJ0cmFuc2Zvcm1TdHJpbmciLCJ0cmFuc2Zvcm1IYXNaIiwia2V5IiwiaGFzT3duUHJvcGVydHkiLCJ2YWx1ZSJdLCJtYXBwaW5ncyI6Ijs7OztBQUFBOzs7O0FBQ0E7Ozs7OztBQUVBLElBQU1BLGNBQWMsWUFBcEI7O2tCQUVlLFVBQUNDLEtBQUQsRUFBUUMsMkJBQVIsRUFBd0M7QUFDckQsTUFBSUMsaUJBQWlCLEVBQXJCO0FBQ0EsTUFBSUMsa0JBQWtCLEVBQXRCO0FBQ0EsTUFBSUMsZ0JBQWdCLEtBQXBCOztBQUVBLE9BQUssSUFBSUMsR0FBVCxJQUFnQkwsS0FBaEIsRUFBdUI7QUFDckIsUUFBSUEsTUFBTU0sY0FBTixDQUFxQkQsR0FBckIsQ0FBSixFQUErQjtBQUM3QixVQUFNRSxRQUFRUCxNQUFNSyxHQUFOLENBQWQ7O0FBRUEsVUFBSSx5QkFBZUEsR0FBZixDQUFKLEVBQXlCO0FBQ3ZCRiwyQkFBbUJFLE1BQU0sR0FBTixHQUFZRSxLQUFaLEdBQW9CLElBQXZDO0FBQ0FILHdCQUFpQkMsUUFBUU4sV0FBVCxHQUF3QixJQUF4QixHQUErQkssYUFBL0M7QUFFRCxPQUpELE1BSU87QUFDTEYsMEJBQWtCLE1BQU0sd0JBQVNHLEdBQVQsRUFBYyxJQUFkLENBQU4sR0FBNEIsR0FBNUIsR0FBa0NFLEtBQXBEO0FBQ0Q7QUFDRjtBQUNGOztBQUVELE1BQUlKLG9CQUFvQixFQUF4QixFQUE0QjtBQUMxQixRQUFJLENBQUNDLGFBQUQsSUFBa0IsQ0FBQ0gsMkJBQXZCLEVBQW9EO0FBQ2xERSx5QkFBbUJKLGNBQWMsT0FBakM7QUFDRDs7QUFFREcsc0JBQWtCLE1BQU0sd0JBQVMsV0FBVCxFQUFzQixJQUF0QixDQUFOLEdBQW9DLEdBQXBDLEdBQTBDQyxlQUE1RDtBQUNEOztBQUVELFNBQU9ELGNBQVA7QUFDRCxDIiwiZmlsZSI6ImJ1aWxkLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHRyYW5zZm9ybVByb3BzIGZyb20gJy4vdHJhbnNmb3JtLXByb3BzJztcbmltcG9ydCBwcmVmaXhlciBmcm9tICcuL3ByZWZpeGVyJztcblxuY29uc3QgVFJBTlNMQVRFX1ogPSAndHJhbnNsYXRlWic7XG5cbmV4cG9ydCBkZWZhdWx0IChzdGF0ZSwgZGlzYWJsZUhhcmR3YXJlQWNjZWxlcmF0aW9uKSA9PiB7XG4gIGxldCBwcm9wZXJ0eVN0cmluZyA9ICcnO1xuICBsZXQgdHJhbnNmb3JtU3RyaW5nID0gJyc7XG4gIGxldCB0cmFuc2Zvcm1IYXNaID0gZmFsc2U7XG5cbiAgZm9yIChsZXQga2V5IGluIHN0YXRlKSB7XG4gICAgaWYgKHN0YXRlLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgIGNvbnN0IHZhbHVlID0gc3RhdGVba2V5XTtcblxuICAgICAgaWYgKHRyYW5zZm9ybVByb3BzW2tleV0pIHtcbiAgICAgICAgdHJhbnNmb3JtU3RyaW5nICs9IGtleSArICcoJyArIHZhbHVlICsgJykgJztcbiAgICAgICAgdHJhbnNmb3JtSGFzWiA9IChrZXkgPT09IFRSQU5TTEFURV9aKSA/IHRydWUgOiB0cmFuc2Zvcm1IYXNaO1xuXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwcm9wZXJ0eVN0cmluZyArPSAnOycgKyBwcmVmaXhlcihrZXksIHRydWUpICsgJzonICsgdmFsdWU7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaWYgKHRyYW5zZm9ybVN0cmluZyAhPT0gJycpIHtcbiAgICBpZiAoIXRyYW5zZm9ybUhhc1ogJiYgIWRpc2FibGVIYXJkd2FyZUFjY2VsZXJhdGlvbikge1xuICAgICAgdHJhbnNmb3JtU3RyaW5nICs9IFRSQU5TTEFURV9aICsgJygwcHgpJztcbiAgICB9XG5cbiAgICBwcm9wZXJ0eVN0cmluZyArPSAnOycgKyBwcmVmaXhlcigndHJhbnNmb3JtJywgdHJ1ZSkgKyAnOicgKyB0cmFuc2Zvcm1TdHJpbmc7XG4gIH1cblxuICByZXR1cm4gcHJvcGVydHlTdHJpbmc7XG59OyJdfQ==