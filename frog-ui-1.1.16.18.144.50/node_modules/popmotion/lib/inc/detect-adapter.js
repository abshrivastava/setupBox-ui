'use strict';

exports.__esModule = true;

var _objectAdapter = require('../adapter/object-adapter');

var _objectAdapter2 = _interopRequireDefault(_objectAdapter);

var _cssAdapter = require('../adapter/css-adapter');

var _cssAdapter2 = _interopRequireDefault(_cssAdapter);

var _svgAdapter = require('../adapter/svg-adapter');

var _svgAdapter2 = _interopRequireDefault(_svgAdapter);

var _svgPathAdapter = require('../adapter/svg-path-adapter');

var _svgPathAdapter2 = _interopRequireDefault(_svgPathAdapter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (element) {
  var detectedAdapter = _objectAdapter2.default;

  // If HTMLElement load CSS
  if (element instanceof HTMLElement || element.tagName === 'svg') {
    detectedAdapter = _cssAdapter2.default;

    // Or SVG
  } else if (element instanceof SVGElement) {
    if (element.tagName === 'path') {
      detectedAdapter = _svgPathAdapter2.default;
    } else {
      detectedAdapter = _svgAdapter2.default;
    }
  }

  return detectedAdapter;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9pbmMvZGV0ZWN0LWFkYXB0ZXIuanMiXSwibmFtZXMiOlsiZWxlbWVudCIsImRldGVjdGVkQWRhcHRlciIsIkhUTUxFbGVtZW50IiwidGFnTmFtZSIsIlNWR0VsZW1lbnQiXSwibWFwcGluZ3MiOiI7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O2tCQUVlLFVBQUNBLE9BQUQsRUFBYTtBQUMxQixNQUFJQyx5Q0FBSjs7QUFFQTtBQUNBLE1BQUlELG1CQUFtQkUsV0FBbkIsSUFBa0NGLFFBQVFHLE9BQVIsS0FBb0IsS0FBMUQsRUFBaUU7QUFDL0RGOztBQUVGO0FBQ0MsR0FKRCxNQUlPLElBQUlELG1CQUFtQkksVUFBdkIsRUFBbUM7QUFDeEMsUUFBSUosUUFBUUcsT0FBUixLQUFvQixNQUF4QixFQUFnQztBQUM5QkY7QUFDRCxLQUZELE1BRU87QUFDTEE7QUFDRDtBQUNGOztBQUVELFNBQU9BLGVBQVA7QUFDRCxDIiwiZmlsZSI6ImRldGVjdC1hZGFwdGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG9iamVjdEFkYXB0ZXIgZnJvbSAnLi4vYWRhcHRlci9vYmplY3QtYWRhcHRlcic7XG5pbXBvcnQgY3NzQWRhcHRlciBmcm9tICcuLi9hZGFwdGVyL2Nzcy1hZGFwdGVyJztcbmltcG9ydCBzdmdBZGFwdGVyIGZyb20gJy4uL2FkYXB0ZXIvc3ZnLWFkYXB0ZXInO1xuaW1wb3J0IHN2Z1BhdGhBZGFwdGVyIGZyb20gJy4uL2FkYXB0ZXIvc3ZnLXBhdGgtYWRhcHRlcic7XG5cbmV4cG9ydCBkZWZhdWx0IChlbGVtZW50KSA9PiB7XG4gIGxldCBkZXRlY3RlZEFkYXB0ZXIgPSBvYmplY3RBZGFwdGVyO1xuXG4gIC8vIElmIEhUTUxFbGVtZW50IGxvYWQgQ1NTXG4gIGlmIChlbGVtZW50IGluc3RhbmNlb2YgSFRNTEVsZW1lbnQgfHwgZWxlbWVudC50YWdOYW1lID09PSAnc3ZnJykge1xuICAgIGRldGVjdGVkQWRhcHRlciA9IGNzc0FkYXB0ZXI7XG5cbiAgLy8gT3IgU1ZHXG4gIH0gZWxzZSBpZiAoZWxlbWVudCBpbnN0YW5jZW9mIFNWR0VsZW1lbnQpIHtcbiAgICBpZiAoZWxlbWVudC50YWdOYW1lID09PSAncGF0aCcpIHtcbiAgICAgIGRldGVjdGVkQWRhcHRlciA9IHN2Z1BhdGhBZGFwdGVyO1xuICAgIH0gZWxzZSB7XG4gICAgICBkZXRlY3RlZEFkYXB0ZXIgPSBzdmdBZGFwdGVyO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBkZXRlY3RlZEFkYXB0ZXI7XG59O1xuIl19