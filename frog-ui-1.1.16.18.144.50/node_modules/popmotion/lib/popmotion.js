'use strict';

exports.__esModule = true;
exports.Action = exports.transformers = exports.valueType = exports.setGlobalDilation = exports.utils = exports.calc = exports.detectFlow = exports.easing = exports.svgPath = exports.svg = exports.object = exports.css = exports.attr = exports.createAdapter = exports.timeline = exports.stagger = exports.task = exports.input = exports.track = exports.physics = exports.tween = exports.flow = undefined;

var _timer = require('./task/timer');

Object.defineProperty(exports, 'setGlobalDilation', {
  enumerable: true,
  get: function () {
    return _timer.setGlobalDilation;
  }
});

var _Action = require('./actions/Action');

var _Action2 = _interopRequireDefault(_Action);

var _Flow = require('./actions/Flow');

var _Flow2 = _interopRequireDefault(_Flow);

var _Tween = require('./actions/Tween');

var _Tween2 = _interopRequireDefault(_Tween);

var _Physics = require('./actions/Physics');

var _Physics2 = _interopRequireDefault(_Physics);

var _Track = require('./actions/Track');

var _Track2 = _interopRequireDefault(_Track);

var _Task = require('./task/Task');

var _Task2 = _interopRequireDefault(_Task);

var _Input = require('./input/Input');

var _Input2 = _interopRequireDefault(_Input);

var _stagger2 = require('./inc/stagger');

var _stagger3 = _interopRequireDefault(_stagger2);

var _timeline2 = require('./inc/timeline');

var _timeline3 = _interopRequireDefault(_timeline2);

var _adapter = require('./adapter/adapter');

var _adapter2 = _interopRequireDefault(_adapter);

var _attrAdapter = require('./adapter/attr-adapter');

var _attrAdapter2 = _interopRequireDefault(_attrAdapter);

var _cssAdapter = require('./adapter/css-adapter');

var _cssAdapter2 = _interopRequireDefault(_cssAdapter);

var _objectAdapter = require('./adapter/object-adapter');

var _objectAdapter2 = _interopRequireDefault(_objectAdapter);

var _svgAdapter = require('./adapter/svg-adapter');

var _svgAdapter2 = _interopRequireDefault(_svgAdapter);

var _svgPathAdapter = require('./adapter/svg-path-adapter');

var _svgPathAdapter2 = _interopRequireDefault(_svgPathAdapter);

var _presetEasing = require('./actions/easing/preset-easing');

var _presetEasing2 = _interopRequireDefault(_presetEasing);

var _getFlow = require('./actions/flow/get-flow');

var _getFlow2 = _interopRequireDefault(_getFlow);

var _calc2 = require('./inc/calc');

var _calc = _interopRequireWildcard(_calc2);

var _utils2 = require('./inc/utils');

var _utils = _interopRequireWildcard(_utils2);

var _alpha = require('./value-types/alpha');

var _alpha2 = _interopRequireDefault(_alpha);

var _angle = require('./value-types/angle');

var _angle2 = _interopRequireDefault(_angle);

var _color = require('./value-types/color');

var _color2 = _interopRequireDefault(_color);

var _complex = require('./value-types/complex');

var _complex2 = _interopRequireDefault(_complex);

var _hex = require('./value-types/hex');

var _hex2 = _interopRequireDefault(_hex);

var _hsl = require('./value-types/hsl');

var _hsl2 = _interopRequireDefault(_hsl);

var _px = require('./value-types/px');

var _px2 = _interopRequireDefault(_px);

var _rgb = require('./value-types/rgb');

var _rgb2 = _interopRequireDefault(_rgb);

var _scale = require('./value-types/scale');

var _scale2 = _interopRequireDefault(_scale);

var _shadow = require('./value-types/shadow');

var _shadow2 = _interopRequireDefault(_shadow);

var _unit = require('./value-types/unit');

var _unit2 = _interopRequireDefault(_unit);

var _transformers2 = require('./inc/transformers');

var _transformers = _interopRequireWildcard(_transformers2);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Export factory functions
var flow = exports.flow = function () {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return new (Function.prototype.bind.apply(_Flow2.default, [null].concat(args)))();
}; // Import classes - long term goal to move towards composition
var tween = exports.tween = function (props) {
  return new _Tween2.default(props);
};
var physics = exports.physics = function (props) {
  return new _Physics2.default(props);
};
var track = exports.track = function () {
  for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    args[_key2] = arguments[_key2];
  }

  return new (Function.prototype.bind.apply(_Track2.default, [null].concat(args)))();
};
var input = exports.input = function () {
  for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
    args[_key3] = arguments[_key3];
  }

  return new (Function.prototype.bind.apply(_Input2.default, [null].concat(args)))();
};
var task = exports.task = function () {
  for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
    args[_key4] = arguments[_key4];
  }

  return new (Function.prototype.bind.apply(_Task2.default, [null].concat(args)))();
};
exports.stagger = _stagger3.default;
exports.timeline = _timeline3.default;

// Adapters

exports.createAdapter = _adapter2.default;
exports.attr = _attrAdapter2.default;
exports.css = _cssAdapter2.default;
exports.object = _objectAdapter2.default;
exports.svg = _svgAdapter2.default;
exports.svgPath = _svgPathAdapter2.default;

// Easing

exports.easing = _presetEasing2.default;
var detectFlow = exports.detectFlow = _getFlow2.default;

// Utils
exports.calc = _calc;
exports.utils = _utils;

// Value types

var valueType = exports.valueType = { alpha: _alpha2.default, angle: _angle2.default, color: _color2.default, complex: _complex2.default, hex: _hex2.default, hsl: _hsl2.default, px: _px2.default, rgb: _rgb2.default, scale: _scale2.default, shadow: _shadow2.default, unit: _unit2.default };

// Transformers
exports.transformers = _transformers;

/*
  Returns a version of the Action bound to a Flow

  We're adding `on` here because Flow extends Action,
  otherwise creating a circular modular dependency. Future
  refactoring, ie moving to a compositional model will
  remove the need for us to do this here.
*/

_Action2.default.prototype.on = function (element) {
  if (!element.connect) {
    element = (0, _getFlow2.default)(element);
  }

  return element.connect(this);
};

exports.Action = _Action2.default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9wb3Btb3Rpb24uanMiXSwibmFtZXMiOlsic2V0R2xvYmFsRGlsYXRpb24iLCJmbG93IiwiYXJncyIsInR3ZWVuIiwicHJvcHMiLCJwaHlzaWNzIiwidHJhY2siLCJpbnB1dCIsInRhc2siLCJzdGFnZ2VyIiwidGltZWxpbmUiLCJjcmVhdGVBZGFwdGVyIiwiYXR0ciIsImNzcyIsIm9iamVjdCIsInN2ZyIsInN2Z1BhdGgiLCJlYXNpbmciLCJkZXRlY3RGbG93IiwiY2FsYyIsInV0aWxzIiwidmFsdWVUeXBlIiwiYWxwaGEiLCJhbmdsZSIsImNvbG9yIiwiY29tcGxleCIsImhleCIsImhzbCIsInB4IiwicmdiIiwic2NhbGUiLCJzaGFkb3ciLCJ1bml0IiwidHJhbnNmb3JtZXJzIiwicHJvdG90eXBlIiwib24iLCJlbGVtZW50IiwiY29ubmVjdCIsIkFjdGlvbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztrQkFtQ1NBLGlCOzs7O0FBbENUOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBc0JBOzs7Ozs7Ozs7Ozs7QUFTQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7QUF2Q0E7QUFDTyxJQUFNQyxzQkFBTztBQUFBLG9DQUFJQyxJQUFKO0FBQUlBLFFBQUo7QUFBQTs7QUFBQSwwRUFBeUJBLElBQXpCO0FBQUEsQ0FBYixDLENBVlA7QUFXTyxJQUFNQyx3QkFBUSxVQUFDQyxLQUFEO0FBQUEsU0FBVyxvQkFBVUEsS0FBVixDQUFYO0FBQUEsQ0FBZDtBQUNBLElBQU1DLDRCQUFVLFVBQUNELEtBQUQ7QUFBQSxTQUFXLHNCQUFZQSxLQUFaLENBQVg7QUFBQSxDQUFoQjtBQUNBLElBQU1FLHdCQUFRO0FBQUEscUNBQUlKLElBQUo7QUFBSUEsUUFBSjtBQUFBOztBQUFBLDJFQUEwQkEsSUFBMUI7QUFBQSxDQUFkO0FBQ0EsSUFBTUssd0JBQVE7QUFBQSxxQ0FBSUwsSUFBSjtBQUFJQSxRQUFKO0FBQUE7O0FBQUEsMkVBQTBCQSxJQUExQjtBQUFBLENBQWQ7QUFDQSxJQUFNTSxzQkFBTztBQUFBLHFDQUFJTixJQUFKO0FBQUlBLFFBQUo7QUFBQTs7QUFBQSwwRUFBeUJBLElBQXpCO0FBQUEsQ0FBYjtRQUNBTyxPO1FBQ0FDLFE7O0FBRVA7O1FBQ09DLGE7UUFDQUMsSTtRQUNBQyxHO1FBQ0FDLE07UUFDQUMsRztRQUNBQyxPOztBQUVQOztRQUNPQyxNO0FBRUEsSUFBTUMsbURBQU47O0FBRVA7UUFDWUMsSTtRQUNBQyxLOztBQUdaOztBQVlPLElBQU1DLGdDQUFZLEVBQUVDLHNCQUFGLEVBQVNDLHNCQUFULEVBQWdCQyxzQkFBaEIsRUFBdUJDLDBCQUF2QixFQUFnQ0Msa0JBQWhDLEVBQXFDQyxrQkFBckMsRUFBMENDLGdCQUExQyxFQUE4Q0Msa0JBQTlDLEVBQW1EQyxzQkFBbkQsRUFBMERDLHdCQUExRCxFQUFrRUMsb0JBQWxFLEVBQWxCOztBQUVQO1FBQ1lDLFk7O0FBRVo7Ozs7Ozs7OztBQVFBLGlCQUFPQyxTQUFQLENBQWlCQyxFQUFqQixHQUFzQixVQUFVQyxPQUFWLEVBQW1CO0FBQ3ZDLE1BQUksQ0FBQ0EsUUFBUUMsT0FBYixFQUFzQjtBQUNwQkQsY0FBVSx1QkFBUUEsT0FBUixDQUFWO0FBQ0Q7O0FBRUQsU0FBT0EsUUFBUUMsT0FBUixDQUFnQixJQUFoQixDQUFQO0FBQ0QsQ0FORDs7UUFRU0MsTSIsImZpbGUiOiJwb3Btb3Rpb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBJbXBvcnQgY2xhc3NlcyAtIGxvbmcgdGVybSBnb2FsIHRvIG1vdmUgdG93YXJkcyBjb21wb3NpdGlvblxuaW1wb3J0IEFjdGlvbiBmcm9tICcuL2FjdGlvbnMvQWN0aW9uJztcbmltcG9ydCBGbG93IGZyb20gJy4vYWN0aW9ucy9GbG93JztcbmltcG9ydCBUd2VlbiBmcm9tICcuL2FjdGlvbnMvVHdlZW4nO1xuaW1wb3J0IFBoeXNpY3MgZnJvbSAnLi9hY3Rpb25zL1BoeXNpY3MnO1xuaW1wb3J0IFRyYWNrIGZyb20gJy4vYWN0aW9ucy9UcmFjayc7XG5pbXBvcnQgVGFzayBmcm9tICcuL3Rhc2svVGFzayc7XG5pbXBvcnQgSW5wdXQgZnJvbSAnLi9pbnB1dC9JbnB1dCc7XG5cbi8vIEV4cG9ydCBmYWN0b3J5IGZ1bmN0aW9uc1xuZXhwb3J0IGNvbnN0IGZsb3cgPSAoLi4uYXJncykgPT4gbmV3IEZsb3coLi4uYXJncyk7XG5leHBvcnQgY29uc3QgdHdlZW4gPSAocHJvcHMpID0+IG5ldyBUd2Vlbihwcm9wcyk7XG5leHBvcnQgY29uc3QgcGh5c2ljcyA9IChwcm9wcykgPT4gbmV3IFBoeXNpY3MocHJvcHMpO1xuZXhwb3J0IGNvbnN0IHRyYWNrID0gKC4uLmFyZ3MpID0+IG5ldyBUcmFjayguLi5hcmdzKTtcbmV4cG9ydCBjb25zdCBpbnB1dCA9ICguLi5hcmdzKSA9PiBuZXcgSW5wdXQoLi4uYXJncyk7XG5leHBvcnQgY29uc3QgdGFzayA9ICguLi5hcmdzKSA9PiBuZXcgVGFzayguLi5hcmdzKTtcbmV4cG9ydCBzdGFnZ2VyIGZyb20gJy4vaW5jL3N0YWdnZXInO1xuZXhwb3J0IHRpbWVsaW5lIGZyb20gJy4vaW5jL3RpbWVsaW5lJztcblxuLy8gQWRhcHRlcnNcbmV4cG9ydCBjcmVhdGVBZGFwdGVyIGZyb20gJy4vYWRhcHRlci9hZGFwdGVyJztcbmV4cG9ydCBhdHRyIGZyb20gJy4vYWRhcHRlci9hdHRyLWFkYXB0ZXInO1xuZXhwb3J0IGNzcyBmcm9tICcuL2FkYXB0ZXIvY3NzLWFkYXB0ZXInO1xuZXhwb3J0IG9iamVjdCBmcm9tICcuL2FkYXB0ZXIvb2JqZWN0LWFkYXB0ZXInO1xuZXhwb3J0IHN2ZyBmcm9tICcuL2FkYXB0ZXIvc3ZnLWFkYXB0ZXInO1xuZXhwb3J0IHN2Z1BhdGggZnJvbSAnLi9hZGFwdGVyL3N2Zy1wYXRoLWFkYXB0ZXInO1xuXG4vLyBFYXNpbmdcbmV4cG9ydCBlYXNpbmcgZnJvbSAnLi9hY3Rpb25zL2Vhc2luZy9wcmVzZXQtZWFzaW5nJztcbmltcG9ydCBnZXRGbG93IGZyb20gJy4vYWN0aW9ucy9mbG93L2dldC1mbG93JztcbmV4cG9ydCBjb25zdCBkZXRlY3RGbG93ID0gZ2V0RmxvdztcblxuLy8gVXRpbHNcbmV4cG9ydCAqIGFzIGNhbGMgZnJvbSAnLi9pbmMvY2FsYyc7XG5leHBvcnQgKiBhcyB1dGlscyBmcm9tICcuL2luYy91dGlscyc7XG5leHBvcnQgeyBzZXRHbG9iYWxEaWxhdGlvbiB9IGZyb20gJy4vdGFzay90aW1lcic7XG5cbi8vIFZhbHVlIHR5cGVzXG5pbXBvcnQgYWxwaGEgZnJvbSAnLi92YWx1ZS10eXBlcy9hbHBoYSc7XG5pbXBvcnQgYW5nbGUgZnJvbSAnLi92YWx1ZS10eXBlcy9hbmdsZSc7XG5pbXBvcnQgY29sb3IgZnJvbSAnLi92YWx1ZS10eXBlcy9jb2xvcic7XG5pbXBvcnQgY29tcGxleCBmcm9tICcuL3ZhbHVlLXR5cGVzL2NvbXBsZXgnO1xuaW1wb3J0IGhleCBmcm9tICcuL3ZhbHVlLXR5cGVzL2hleCc7XG5pbXBvcnQgaHNsIGZyb20gJy4vdmFsdWUtdHlwZXMvaHNsJztcbmltcG9ydCBweCBmcm9tICcuL3ZhbHVlLXR5cGVzL3B4JztcbmltcG9ydCByZ2IgZnJvbSAnLi92YWx1ZS10eXBlcy9yZ2InO1xuaW1wb3J0IHNjYWxlIGZyb20gJy4vdmFsdWUtdHlwZXMvc2NhbGUnO1xuaW1wb3J0IHNoYWRvdyBmcm9tICcuL3ZhbHVlLXR5cGVzL3NoYWRvdyc7XG5pbXBvcnQgdW5pdCBmcm9tICcuL3ZhbHVlLXR5cGVzL3VuaXQnO1xuZXhwb3J0IGNvbnN0IHZhbHVlVHlwZSA9IHsgYWxwaGEsIGFuZ2xlLCBjb2xvciwgY29tcGxleCwgaGV4LCBoc2wsIHB4LCByZ2IsIHNjYWxlLCBzaGFkb3csIHVuaXQgfTtcblxuLy8gVHJhbnNmb3JtZXJzXG5leHBvcnQgKiBhcyB0cmFuc2Zvcm1lcnMgZnJvbSAnLi9pbmMvdHJhbnNmb3JtZXJzJztcblxuLypcbiAgUmV0dXJucyBhIHZlcnNpb24gb2YgdGhlIEFjdGlvbiBib3VuZCB0byBhIEZsb3dcblxuICBXZSdyZSBhZGRpbmcgYG9uYCBoZXJlIGJlY2F1c2UgRmxvdyBleHRlbmRzIEFjdGlvbixcbiAgb3RoZXJ3aXNlIGNyZWF0aW5nIGEgY2lyY3VsYXIgbW9kdWxhciBkZXBlbmRlbmN5LiBGdXR1cmVcbiAgcmVmYWN0b3JpbmcsIGllIG1vdmluZyB0byBhIGNvbXBvc2l0aW9uYWwgbW9kZWwgd2lsbFxuICByZW1vdmUgdGhlIG5lZWQgZm9yIHVzIHRvIGRvIHRoaXMgaGVyZS5cbiovXG5BY3Rpb24ucHJvdG90eXBlLm9uID0gZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgaWYgKCFlbGVtZW50LmNvbm5lY3QpIHtcbiAgICBlbGVtZW50ID0gZ2V0RmxvdyhlbGVtZW50KTtcbiAgfVxuXG4gIHJldHVybiBlbGVtZW50LmNvbm5lY3QodGhpcyk7XG59O1xuXG5leHBvcnQgeyBBY3Rpb24gfTsiXX0=