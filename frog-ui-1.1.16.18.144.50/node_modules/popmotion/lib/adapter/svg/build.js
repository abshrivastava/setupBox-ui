'use strict';

exports.__esModule = true;
exports.default = build;

var _utils = require('../../inc/utils');

var _transformProps = require('../css/transform-props');

var _transformProps2 = _interopRequireDefault(_transformProps);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ZERO_NOT_ZERO = 0.0001;

function build(state, data) {
  var hasTransform = false;
  var props = {};
  var scale = state.scale !== undefined ? state.scale || ZERO_NOT_ZERO : state.scaleX || 1;
  var scaleY = state.scaleY !== undefined ? state.scaleY || ZERO_NOT_ZERO : scale || 1;
  var transformOriginX = data.width * ((state.originX || 50) / 100) + data.x;
  var transformOriginY = data.height * ((state.originY || 50) / 100) + data.y;
  var scaleTransformX = -transformOriginX * (scale * 1);
  var scaleTransformY = -transformOriginY * (scaleY * 1);
  var scaleReplaceX = transformOriginX / scale;
  var scaleReplaceY = transformOriginY / scaleY;
  var transform = {
    translate: 'translate(' + state.translateX + ', ' + state.translateY + ') ',
    scale: 'translate(' + scaleTransformX + ', ' + scaleTransformY + ') scale(' + scale + ', ' + scaleY + ') translate(' + scaleReplaceX + ', ' + scaleReplaceY + ') ',
    rotate: 'rotate(' + state.rotate + ', ' + transformOriginX + ', ' + transformOriginY + ') ',
    skewX: 'skewX(' + state.skewX + ') ',
    skewY: 'skewY(' + state.skewY + ') '
  };

  for (var key in state) {
    if (state.hasOwnProperty(key)) {
      if (_transformProps2.default[key]) {
        hasTransform = true;
      } else {
        props[(0, _utils.camelToDash)(key)] = state[key];
      }
    }
  }

  if (hasTransform) {
    props.transform = '';

    for (var _key in transform) {
      if (transform.hasOwnProperty(_key)) {
        var defaultValue = _key === 'scale' ? '1' : '0';
        props.transform += transform[_key].replace(/undefined/g, defaultValue);
      }
    }
  }

  return props;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hZGFwdGVyL3N2Zy9idWlsZC5qcyJdLCJuYW1lcyI6WyJidWlsZCIsIlpFUk9fTk9UX1pFUk8iLCJzdGF0ZSIsImRhdGEiLCJoYXNUcmFuc2Zvcm0iLCJwcm9wcyIsInNjYWxlIiwidW5kZWZpbmVkIiwic2NhbGVYIiwic2NhbGVZIiwidHJhbnNmb3JtT3JpZ2luWCIsIndpZHRoIiwib3JpZ2luWCIsIngiLCJ0cmFuc2Zvcm1PcmlnaW5ZIiwiaGVpZ2h0Iiwib3JpZ2luWSIsInkiLCJzY2FsZVRyYW5zZm9ybVgiLCJzY2FsZVRyYW5zZm9ybVkiLCJzY2FsZVJlcGxhY2VYIiwic2NhbGVSZXBsYWNlWSIsInRyYW5zZm9ybSIsInRyYW5zbGF0ZSIsInRyYW5zbGF0ZVgiLCJ0cmFuc2xhdGVZIiwicm90YXRlIiwic2tld1giLCJza2V3WSIsImtleSIsImhhc093blByb3BlcnR5IiwiZGVmYXVsdFZhbHVlIiwicmVwbGFjZSJdLCJtYXBwaW5ncyI6Ijs7O2tCQUt3QkEsSzs7QUFMeEI7O0FBQ0E7Ozs7OztBQUVBLElBQU1DLGdCQUFnQixNQUF0Qjs7QUFFZSxTQUFTRCxLQUFULENBQWVFLEtBQWYsRUFBc0JDLElBQXRCLEVBQTRCO0FBQ3pDLE1BQUlDLGVBQWUsS0FBbkI7QUFDQSxNQUFNQyxRQUFRLEVBQWQ7QUFDQSxNQUFNQyxRQUFRSixNQUFNSSxLQUFOLEtBQWdCQyxTQUFoQixHQUE0QkwsTUFBTUksS0FBTixJQUFlTCxhQUEzQyxHQUEyREMsTUFBTU0sTUFBTixJQUFnQixDQUF6RjtBQUNBLE1BQU1DLFNBQVNQLE1BQU1PLE1BQU4sS0FBaUJGLFNBQWpCLEdBQTZCTCxNQUFNTyxNQUFOLElBQWdCUixhQUE3QyxHQUE2REssU0FBUyxDQUFyRjtBQUNBLE1BQU1JLG1CQUFtQlAsS0FBS1EsS0FBTCxJQUFjLENBQUNULE1BQU1VLE9BQU4sSUFBaUIsRUFBbEIsSUFBd0IsR0FBdEMsSUFBNkNULEtBQUtVLENBQTNFO0FBQ0EsTUFBTUMsbUJBQW1CWCxLQUFLWSxNQUFMLElBQWUsQ0FBQ2IsTUFBTWMsT0FBTixJQUFpQixFQUFsQixJQUF3QixHQUF2QyxJQUE4Q2IsS0FBS2MsQ0FBNUU7QUFDQSxNQUFNQyxrQkFBa0IsQ0FBRVIsZ0JBQUYsSUFBc0JKLFFBQVEsQ0FBOUIsQ0FBeEI7QUFDQSxNQUFNYSxrQkFBa0IsQ0FBRUwsZ0JBQUYsSUFBc0JMLFNBQVMsQ0FBL0IsQ0FBeEI7QUFDQSxNQUFNVyxnQkFBZ0JWLG1CQUFtQkosS0FBekM7QUFDQSxNQUFNZSxnQkFBZ0JQLG1CQUFtQkwsTUFBekM7QUFDQSxNQUFNYSxZQUFZO0FBQ2hCQyw4QkFBd0JyQixNQUFNc0IsVUFBOUIsVUFBNkN0QixNQUFNdUIsVUFBbkQsT0FEZ0I7QUFFaEJuQiwwQkFBb0JZLGVBQXBCLFVBQXdDQyxlQUF4QyxnQkFBa0ViLEtBQWxFLFVBQTRFRyxNQUE1RSxvQkFBaUdXLGFBQWpHLFVBQW1IQyxhQUFuSCxPQUZnQjtBQUdoQkssd0JBQWtCeEIsTUFBTXdCLE1BQXhCLFVBQW1DaEIsZ0JBQW5DLFVBQXdESSxnQkFBeEQsT0FIZ0I7QUFJaEJhLHNCQUFnQnpCLE1BQU15QixLQUF0QixPQUpnQjtBQUtoQkMsc0JBQWdCMUIsTUFBTTBCLEtBQXRCO0FBTGdCLEdBQWxCOztBQVFBLE9BQUssSUFBSUMsR0FBVCxJQUFnQjNCLEtBQWhCLEVBQXVCO0FBQ3JCLFFBQUlBLE1BQU00QixjQUFOLENBQXFCRCxHQUFyQixDQUFKLEVBQStCO0FBQzdCLFVBQUkseUJBQWVBLEdBQWYsQ0FBSixFQUF5QjtBQUN2QnpCLHVCQUFlLElBQWY7QUFDRCxPQUZELE1BRU87QUFDTEMsY0FBTSx3QkFBWXdCLEdBQVosQ0FBTixJQUEwQjNCLE1BQU0yQixHQUFOLENBQTFCO0FBQ0Q7QUFDRjtBQUNGOztBQUVELE1BQUl6QixZQUFKLEVBQWtCO0FBQ2hCQyxVQUFNaUIsU0FBTixHQUFrQixFQUFsQjs7QUFFQSxTQUFLLElBQUlPLElBQVQsSUFBZ0JQLFNBQWhCLEVBQTJCO0FBQ3pCLFVBQUlBLFVBQVVRLGNBQVYsQ0FBeUJELElBQXpCLENBQUosRUFBbUM7QUFDakMsWUFBTUUsZUFBZ0JGLFNBQVEsT0FBVCxHQUFvQixHQUFwQixHQUEwQixHQUEvQztBQUNBeEIsY0FBTWlCLFNBQU4sSUFBbUJBLFVBQVVPLElBQVYsRUFBZUcsT0FBZixDQUF1QixZQUF2QixFQUFxQ0QsWUFBckMsQ0FBbkI7QUFDRDtBQUNGO0FBQ0Y7O0FBRUQsU0FBTzFCLEtBQVA7QUFDRCIsImZpbGUiOiJidWlsZC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNhbWVsVG9EYXNoIH0gZnJvbSAnLi4vLi4vaW5jL3V0aWxzJztcbmltcG9ydCB0cmFuc2Zvcm1Qcm9wcyBmcm9tICcuLi9jc3MvdHJhbnNmb3JtLXByb3BzJztcblxuY29uc3QgWkVST19OT1RfWkVSTyA9IDAuMDAwMTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYnVpbGQoc3RhdGUsIGRhdGEpIHtcbiAgbGV0IGhhc1RyYW5zZm9ybSA9IGZhbHNlO1xuICBjb25zdCBwcm9wcyA9IHt9O1xuICBjb25zdCBzY2FsZSA9IHN0YXRlLnNjYWxlICE9PSB1bmRlZmluZWQgPyBzdGF0ZS5zY2FsZSB8fCBaRVJPX05PVF9aRVJPIDogc3RhdGUuc2NhbGVYIHx8IDE7XG4gIGNvbnN0IHNjYWxlWSA9IHN0YXRlLnNjYWxlWSAhPT0gdW5kZWZpbmVkID8gc3RhdGUuc2NhbGVZIHx8IFpFUk9fTk9UX1pFUk8gOiBzY2FsZSB8fCAxO1xuICBjb25zdCB0cmFuc2Zvcm1PcmlnaW5YID0gZGF0YS53aWR0aCAqICgoc3RhdGUub3JpZ2luWCB8fCA1MCkgLyAxMDApICsgZGF0YS54O1xuICBjb25zdCB0cmFuc2Zvcm1PcmlnaW5ZID0gZGF0YS5oZWlnaHQgKiAoKHN0YXRlLm9yaWdpblkgfHwgNTApIC8gMTAwKSArIGRhdGEueTtcbiAgY29uc3Qgc2NhbGVUcmFuc2Zvcm1YID0gLSB0cmFuc2Zvcm1PcmlnaW5YICogKHNjYWxlICogMSk7XG4gIGNvbnN0IHNjYWxlVHJhbnNmb3JtWSA9IC0gdHJhbnNmb3JtT3JpZ2luWSAqIChzY2FsZVkgKiAxKTtcbiAgY29uc3Qgc2NhbGVSZXBsYWNlWCA9IHRyYW5zZm9ybU9yaWdpblggLyBzY2FsZTtcbiAgY29uc3Qgc2NhbGVSZXBsYWNlWSA9IHRyYW5zZm9ybU9yaWdpblkgLyBzY2FsZVk7XG4gIGNvbnN0IHRyYW5zZm9ybSA9IHtcbiAgICB0cmFuc2xhdGU6IGB0cmFuc2xhdGUoJHtzdGF0ZS50cmFuc2xhdGVYfSwgJHtzdGF0ZS50cmFuc2xhdGVZfSkgYCxcbiAgICBzY2FsZTogYHRyYW5zbGF0ZSgke3NjYWxlVHJhbnNmb3JtWH0sICR7c2NhbGVUcmFuc2Zvcm1ZfSkgc2NhbGUoJHtzY2FsZX0sICR7c2NhbGVZfSkgdHJhbnNsYXRlKCR7c2NhbGVSZXBsYWNlWH0sICR7c2NhbGVSZXBsYWNlWX0pIGAsXG4gICAgcm90YXRlOiBgcm90YXRlKCR7c3RhdGUucm90YXRlfSwgJHt0cmFuc2Zvcm1PcmlnaW5YfSwgJHt0cmFuc2Zvcm1PcmlnaW5ZfSkgYCxcbiAgICBza2V3WDogYHNrZXdYKCR7c3RhdGUuc2tld1h9KSBgLFxuICAgIHNrZXdZOiBgc2tld1koJHtzdGF0ZS5za2V3WX0pIGBcbiAgfTtcblxuICBmb3IgKGxldCBrZXkgaW4gc3RhdGUpIHtcbiAgICBpZiAoc3RhdGUuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgaWYgKHRyYW5zZm9ybVByb3BzW2tleV0pIHtcbiAgICAgICAgaGFzVHJhbnNmb3JtID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHByb3BzW2NhbWVsVG9EYXNoKGtleSldID0gc3RhdGVba2V5XTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBpZiAoaGFzVHJhbnNmb3JtKSB7XG4gICAgcHJvcHMudHJhbnNmb3JtID0gJyc7XG5cbiAgICBmb3IgKGxldCBrZXkgaW4gdHJhbnNmb3JtKSB7XG4gICAgICBpZiAodHJhbnNmb3JtLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgY29uc3QgZGVmYXVsdFZhbHVlID0gKGtleSA9PT0gJ3NjYWxlJykgPyAnMScgOiAnMCc7XG4gICAgICAgIHByb3BzLnRyYW5zZm9ybSArPSB0cmFuc2Zvcm1ba2V5XS5yZXBsYWNlKC91bmRlZmluZWQvZywgZGVmYXVsdFZhbHVlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gcHJvcHM7XG59Il19