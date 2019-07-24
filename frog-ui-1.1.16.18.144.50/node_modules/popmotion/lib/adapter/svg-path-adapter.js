'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _build = require('./svg-path/build');

var _build2 = _interopRequireDefault(_build);

var _stateMap = require('./css/state-map');

var _stateMap2 = _interopRequireDefault(_stateMap);

var _svgAdapter = require('./svg-adapter');

var _adapter = require('./adapter');

var _adapter2 = _interopRequireDefault(_adapter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _adapter2.default)({
  getter: _svgAdapter.getter,
  setter: function (element, props, opts) {
    var pathLength = opts ? opts.pathLength : 0;
    return (0, _svgAdapter.setter)(element, (0, _build2.default)(props, pathLength), opts);
  },
  stateMap: _stateMap2.default,
  getElementData: function (element) {
    return _extends({ pathLength: element.getTotalLength() }, (0, _svgAdapter.getElementData)(element));
  }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hZGFwdGVyL3N2Zy1wYXRoLWFkYXB0ZXIuanMiXSwibmFtZXMiOlsiZ2V0dGVyIiwic2V0dGVyIiwiZWxlbWVudCIsInByb3BzIiwib3B0cyIsInBhdGhMZW5ndGgiLCJzdGF0ZU1hcCIsImdldEVsZW1lbnREYXRhIiwiZ2V0VG90YWxMZW5ndGgiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7Ozs7O2tCQUVlLHVCQUFjO0FBQzNCQSw0QkFEMkI7QUFFM0JDLFVBQVEsVUFBQ0MsT0FBRCxFQUFVQyxLQUFWLEVBQWlCQyxJQUFqQixFQUEwQjtBQUNoQyxRQUFNQyxhQUFhRCxPQUFPQSxLQUFLQyxVQUFaLEdBQXlCLENBQTVDO0FBQ0EsV0FBTyx3QkFBT0gsT0FBUCxFQUFnQixxQkFBTUMsS0FBTixFQUFhRSxVQUFiLENBQWhCLEVBQTBDRCxJQUExQyxDQUFQO0FBQ0QsR0FMMEI7QUFNM0JFLDhCQU4yQjtBQU8zQkMsa0JBQWdCLFVBQUNMLE9BQUQ7QUFBQSxzQkFBZ0JHLFlBQVlILFFBQVFNLGNBQVIsRUFBNUIsSUFBeUQsZ0NBQWVOLE9BQWYsQ0FBekQ7QUFBQTtBQVBXLENBQWQsQyIsImZpbGUiOiJzdmctcGF0aC1hZGFwdGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGJ1aWxkIGZyb20gJy4vc3ZnLXBhdGgvYnVpbGQnO1xuaW1wb3J0IHN0YXRlTWFwIGZyb20gJy4vY3NzL3N0YXRlLW1hcCc7XG5pbXBvcnQgeyBnZXR0ZXIsIHNldHRlciwgZ2V0RWxlbWVudERhdGEgfSBmcm9tICcuL3N2Zy1hZGFwdGVyJztcbmltcG9ydCBjcmVhdGVBZGFwdGVyIGZyb20gJy4vYWRhcHRlcic7XG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUFkYXB0ZXIoe1xuICBnZXR0ZXIsXG4gIHNldHRlcjogKGVsZW1lbnQsIHByb3BzLCBvcHRzKSA9PiB7XG4gICAgY29uc3QgcGF0aExlbmd0aCA9IG9wdHMgPyBvcHRzLnBhdGhMZW5ndGggOiAwO1xuICAgIHJldHVybiBzZXR0ZXIoZWxlbWVudCwgYnVpbGQocHJvcHMsIHBhdGhMZW5ndGgpLCBvcHRzKTtcbiAgfSxcbiAgc3RhdGVNYXAsXG4gIGdldEVsZW1lbnREYXRhOiAoZWxlbWVudCkgPT4gKHsgcGF0aExlbmd0aDogZWxlbWVudC5nZXRUb3RhbExlbmd0aCgpLCAuLi5nZXRFbGVtZW50RGF0YShlbGVtZW50KSB9KVxufSk7XG4iXX0=