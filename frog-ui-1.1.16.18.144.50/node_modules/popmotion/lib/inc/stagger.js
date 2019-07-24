'use strict';

exports.__esModule = true;

var _timeline = require('./timeline');

var _timeline2 = _interopRequireDefault(_timeline);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DEFAULT_INTERVAL = 100;

exports.default = function (tweens, props) {
  var propsIsDuration = (0, _utils.isNum)(props);
  var interval = propsIsDuration ? props : props ? props.interval || DEFAULT_INTERVAL : DEFAULT_INTERVAL;
  var at = 0;
  var timelineDefinition = tweens.map(function (tween) {
    var def = { tween: tween, at: at };
    at += interval;
    return def;
  });

  return (0, _timeline2.default)(timelineDefinition, props);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9pbmMvc3RhZ2dlci5qcyJdLCJuYW1lcyI6WyJERUZBVUxUX0lOVEVSVkFMIiwidHdlZW5zIiwicHJvcHMiLCJwcm9wc0lzRHVyYXRpb24iLCJpbnRlcnZhbCIsImF0IiwidGltZWxpbmVEZWZpbml0aW9uIiwibWFwIiwidHdlZW4iLCJkZWYiXSwibWFwcGluZ3MiOiI7Ozs7QUFBQTs7OztBQUNBOzs7O0FBRUEsSUFBTUEsbUJBQW1CLEdBQXpCOztrQkFFZSxVQUFDQyxNQUFELEVBQVNDLEtBQVQsRUFBbUI7QUFDaEMsTUFBTUMsa0JBQWtCLGtCQUFNRCxLQUFOLENBQXhCO0FBQ0EsTUFBTUUsV0FBV0Qsa0JBQWtCRCxLQUFsQixHQUEwQkEsUUFBUUEsTUFBTUUsUUFBTixJQUFrQkosZ0JBQTFCLEdBQTZDQSxnQkFBeEY7QUFDQSxNQUFJSyxLQUFLLENBQVQ7QUFDQSxNQUFNQyxxQkFBcUJMLE9BQU9NLEdBQVAsQ0FBVyxVQUFDQyxLQUFELEVBQVc7QUFDL0MsUUFBTUMsTUFBTSxFQUFFRCxZQUFGLEVBQVNILE1BQVQsRUFBWjtBQUNBQSxVQUFNRCxRQUFOO0FBQ0EsV0FBT0ssR0FBUDtBQUNELEdBSjBCLENBQTNCOztBQU1BLFNBQU8sd0JBQVNILGtCQUFULEVBQTZCSixLQUE3QixDQUFQO0FBQ0QsQyIsImZpbGUiOiJzdGFnZ2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHRpbWVsaW5lIGZyb20gJy4vdGltZWxpbmUnO1xuaW1wb3J0IHsgaXNOdW0gfSBmcm9tICcuL3V0aWxzJztcblxuY29uc3QgREVGQVVMVF9JTlRFUlZBTCA9IDEwMDtcblxuZXhwb3J0IGRlZmF1bHQgKHR3ZWVucywgcHJvcHMpID0+IHtcbiAgY29uc3QgcHJvcHNJc0R1cmF0aW9uID0gaXNOdW0ocHJvcHMpO1xuICBjb25zdCBpbnRlcnZhbCA9IHByb3BzSXNEdXJhdGlvbiA/IHByb3BzIDogcHJvcHMgPyBwcm9wcy5pbnRlcnZhbCB8fCBERUZBVUxUX0lOVEVSVkFMIDogREVGQVVMVF9JTlRFUlZBTDtcbiAgbGV0IGF0ID0gMDtcbiAgY29uc3QgdGltZWxpbmVEZWZpbml0aW9uID0gdHdlZW5zLm1hcCgodHdlZW4pID0+IHtcbiAgICBjb25zdCBkZWYgPSB7IHR3ZWVuLCBhdCB9O1xuICAgIGF0ICs9IGludGVydmFsO1xuICAgIHJldHVybiBkZWY7XG4gIH0pO1xuXG4gIHJldHVybiB0aW1lbGluZSh0aW1lbGluZURlZmluaXRpb24sIHByb3BzKTtcbn07Il19