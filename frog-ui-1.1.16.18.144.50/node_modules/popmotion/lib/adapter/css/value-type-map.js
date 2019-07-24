'use strict';

exports.__esModule = true;

var _angle = require('../../value-types/angle');

var _angle2 = _interopRequireDefault(_angle);

var _alpha = require('../../value-types/alpha');

var _alpha2 = _interopRequireDefault(_alpha);

var _color = require('../../value-types/color');

var _color2 = _interopRequireDefault(_color);

var _scale = require('../../value-types/scale');

var _scale2 = _interopRequireDefault(_scale);

var _shadow = require('../../value-types/shadow');

var _shadow2 = _interopRequireDefault(_shadow);

var _px = require('../../value-types/px');

var _px2 = _interopRequireDefault(_px);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  // Color props
  color: _color2.default,
  backgroundColor: _color2.default,
  outlineColor: _color2.default,
  fill: _color2.default,
  stroke: _color2.default,

  // Border props
  borderColor: _color2.default,
  borderTopColor: _color2.default,
  borderRightColor: _color2.default,
  borderBottomColor: _color2.default,
  borderLeftColor: _color2.default,
  borderRadius: _px2.default,

  // Positioning
  width: _px2.default,
  height: _px2.default,

  // Shadows
  textShadow: _shadow2.default,
  boxShadow: _shadow2.default,

  // Transform properties
  rotate: _angle2.default,
  rotateX: _angle2.default,
  rotateY: _angle2.default,
  rotateZ: _angle2.default,
  scale: _scale2.default,
  scaleX: _scale2.default,
  scaleY: _scale2.default,
  scaleZ: _scale2.default,
  skewX: _angle2.default,
  skewY: _angle2.default,
  distance: _px2.default,
  translateX: _px2.default,
  translateY: _px2.default,
  translateZ: _px2.default,
  perspective: _px2.default,
  opacity: _alpha2.default
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hZGFwdGVyL2Nzcy92YWx1ZS10eXBlLW1hcC5qcyJdLCJuYW1lcyI6WyJjb2xvciIsImJhY2tncm91bmRDb2xvciIsIm91dGxpbmVDb2xvciIsImZpbGwiLCJzdHJva2UiLCJib3JkZXJDb2xvciIsImJvcmRlclRvcENvbG9yIiwiYm9yZGVyUmlnaHRDb2xvciIsImJvcmRlckJvdHRvbUNvbG9yIiwiYm9yZGVyTGVmdENvbG9yIiwiYm9yZGVyUmFkaXVzIiwid2lkdGgiLCJoZWlnaHQiLCJ0ZXh0U2hhZG93IiwiYm94U2hhZG93Iiwicm90YXRlIiwicm90YXRlWCIsInJvdGF0ZVkiLCJyb3RhdGVaIiwic2NhbGUiLCJzY2FsZVgiLCJzY2FsZVkiLCJzY2FsZVoiLCJza2V3WCIsInNrZXdZIiwiZGlzdGFuY2UiLCJ0cmFuc2xhdGVYIiwidHJhbnNsYXRlWSIsInRyYW5zbGF0ZVoiLCJwZXJzcGVjdGl2ZSIsIm9wYWNpdHkiXSwibWFwcGluZ3MiOiI7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztrQkFFZTtBQUNiO0FBQ0FBLHdCQUZhO0FBR2JDLGtDQUhhO0FBSWJDLCtCQUphO0FBS2JDLHVCQUxhO0FBTWJDLHlCQU5hOztBQVFiO0FBQ0FDLDhCQVRhO0FBVWJDLGlDQVZhO0FBV2JDLG1DQVhhO0FBWWJDLG9DQVphO0FBYWJDLGtDQWJhO0FBY2JDLDRCQWRhOztBQWdCYjtBQUNBQyxxQkFqQmE7QUFrQmJDLHNCQWxCYTs7QUFvQmI7QUFDQUMsOEJBckJhO0FBc0JiQyw2QkF0QmE7O0FBd0JiO0FBQ0FDLHlCQXpCYTtBQTBCYkMsMEJBMUJhO0FBMkJiQywwQkEzQmE7QUE0QmJDLDBCQTVCYTtBQTZCYkMsd0JBN0JhO0FBOEJiQyx5QkE5QmE7QUErQmJDLHlCQS9CYTtBQWdDYkMseUJBaENhO0FBaUNiQyx3QkFqQ2E7QUFrQ2JDLHdCQWxDYTtBQW1DYkMsd0JBbkNhO0FBb0NiQywwQkFwQ2E7QUFxQ2JDLDBCQXJDYTtBQXNDYkMsMEJBdENhO0FBdUNiQywyQkF2Q2E7QUF3Q2JDO0FBeENhLEMiLCJmaWxlIjoidmFsdWUtdHlwZS1tYXAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYW5nbGUgZnJvbSAnLi4vLi4vdmFsdWUtdHlwZXMvYW5nbGUnO1xuaW1wb3J0IGFscGhhIGZyb20gJy4uLy4uL3ZhbHVlLXR5cGVzL2FscGhhJztcbmltcG9ydCBjb2xvciBmcm9tICcuLi8uLi92YWx1ZS10eXBlcy9jb2xvcic7XG5pbXBvcnQgc2NhbGUgZnJvbSAnLi4vLi4vdmFsdWUtdHlwZXMvc2NhbGUnO1xuaW1wb3J0IHNoYWRvdyBmcm9tICcuLi8uLi92YWx1ZS10eXBlcy9zaGFkb3cnO1xuaW1wb3J0IHB4IGZyb20gJy4uLy4uL3ZhbHVlLXR5cGVzL3B4JztcblxuZXhwb3J0IGRlZmF1bHQge1xuICAvLyBDb2xvciBwcm9wc1xuICBjb2xvcjogY29sb3IsXG4gIGJhY2tncm91bmRDb2xvcjogY29sb3IsXG4gIG91dGxpbmVDb2xvcjogY29sb3IsXG4gIGZpbGw6IGNvbG9yLFxuICBzdHJva2U6IGNvbG9yLFxuXG4gIC8vIEJvcmRlciBwcm9wc1xuICBib3JkZXJDb2xvcjogY29sb3IsXG4gIGJvcmRlclRvcENvbG9yOiBjb2xvcixcbiAgYm9yZGVyUmlnaHRDb2xvcjogY29sb3IsXG4gIGJvcmRlckJvdHRvbUNvbG9yOiBjb2xvcixcbiAgYm9yZGVyTGVmdENvbG9yOiBjb2xvcixcbiAgYm9yZGVyUmFkaXVzOiBweCxcblxuICAvLyBQb3NpdGlvbmluZ1xuICB3aWR0aDogcHgsXG4gIGhlaWdodDogcHgsXG5cbiAgLy8gU2hhZG93c1xuICB0ZXh0U2hhZG93OiBzaGFkb3csXG4gIGJveFNoYWRvdzogc2hhZG93LCAgIFxuXG4gIC8vIFRyYW5zZm9ybSBwcm9wZXJ0aWVzXG4gIHJvdGF0ZTogYW5nbGUsXG4gIHJvdGF0ZVg6IGFuZ2xlLFxuICByb3RhdGVZOiBhbmdsZSxcbiAgcm90YXRlWjogYW5nbGUsXG4gIHNjYWxlOiBzY2FsZSxcbiAgc2NhbGVYOiBzY2FsZSxcbiAgc2NhbGVZOiBzY2FsZSxcbiAgc2NhbGVaOiBzY2FsZSxcbiAgc2tld1g6IGFuZ2xlLFxuICBza2V3WTogYW5nbGUsXG4gIGRpc3RhbmNlOiBweCxcbiAgdHJhbnNsYXRlWDogcHgsXG4gIHRyYW5zbGF0ZVk6IHB4LFxuICB0cmFuc2xhdGVaOiBweCxcbiAgcGVyc3BlY3RpdmU6IHB4LFxuICBvcGFjaXR5OiBhbHBoYVxufTsiXX0=