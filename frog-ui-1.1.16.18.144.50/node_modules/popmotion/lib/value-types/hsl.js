'use strict';

exports.__esModule = true;

var _defaultProps = require('./settings/default-props');

var _dictionary = require('./settings/dictionary');

var _utils = require('../inc/utils');

exports.default = {
  defaultProps: {
    Hue: {
      min: 0,
      max: 360
    },
    Saturation: _defaultProps.percent,
    Lightness: _defaultProps.percent,
    Alpha: _defaultProps.opacity
  },

  test: function (value) {
    return value && value.indexOf('hsl') > -1;
  },

  split: function (value) {
    return (0, _utils.getColorValues)(value, _dictionary.hsl);
  },

  combine: function (values) {
    return (0, _utils.createFunctionString)((0, _utils.createDelimited)(values, _dictionary.hsl, ', ', 2), 'hsla');
  }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy92YWx1ZS10eXBlcy9oc2wuanMiXSwibmFtZXMiOlsiZGVmYXVsdFByb3BzIiwiSHVlIiwibWluIiwibWF4IiwiU2F0dXJhdGlvbiIsIkxpZ2h0bmVzcyIsIkFscGhhIiwidGVzdCIsInZhbHVlIiwiaW5kZXhPZiIsInNwbGl0IiwiY29tYmluZSIsInZhbHVlcyJdLCJtYXBwaW5ncyI6Ijs7OztBQUFBOztBQUNBOztBQUNBOztrQkFFZTtBQUNiQSxnQkFBYztBQUNaQyxTQUFLO0FBQ0hDLFdBQUssQ0FERjtBQUVIQyxXQUFLO0FBRkYsS0FETztBQUtaQyxxQ0FMWTtBQU1aQyxvQ0FOWTtBQU9aQztBQVBZLEdBREQ7O0FBV2JDLFFBQU0sVUFBQ0MsS0FBRDtBQUFBLFdBQVlBLFNBQVNBLE1BQU1DLE9BQU4sQ0FBYyxLQUFkLElBQXVCLENBQUMsQ0FBN0M7QUFBQSxHQVhPOztBQWFiQyxTQUFPLFVBQUNGLEtBQUQ7QUFBQSxXQUFXLDJCQUFlQSxLQUFmLGtCQUFYO0FBQUEsR0FiTTs7QUFlYkcsV0FBUyxVQUFDQyxNQUFEO0FBQUEsV0FBWSxpQ0FBcUIsNEJBQWdCQSxNQUFoQixtQkFBa0MsSUFBbEMsRUFBd0MsQ0FBeEMsQ0FBckIsRUFBaUUsTUFBakUsQ0FBWjtBQUFBO0FBZkksQyIsImZpbGUiOiJoc2wuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBwZXJjZW50LCBvcGFjaXR5IH0gZnJvbSAnLi9zZXR0aW5ncy9kZWZhdWx0LXByb3BzJztcbmltcG9ydCB7IGhzbCBhcyBoc2xUZXJtcyB9IGZyb20gJy4vc2V0dGluZ3MvZGljdGlvbmFyeSc7XG5pbXBvcnQgeyBjcmVhdGVEZWxpbWl0ZWQsIGNyZWF0ZUZ1bmN0aW9uU3RyaW5nLCBnZXRDb2xvclZhbHVlcyB9IGZyb20gJy4uL2luYy91dGlscyc7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgZGVmYXVsdFByb3BzOiB7XG4gICAgSHVlOiB7XG4gICAgICBtaW46IDAsXG4gICAgICBtYXg6IDM2MFxuICAgIH0sXG4gICAgU2F0dXJhdGlvbjogcGVyY2VudCxcbiAgICBMaWdodG5lc3M6IHBlcmNlbnQsXG4gICAgQWxwaGE6IG9wYWNpdHlcbiAgfSxcblxuICB0ZXN0OiAodmFsdWUpID0+ICh2YWx1ZSAmJiB2YWx1ZS5pbmRleE9mKCdoc2wnKSA+IC0xKSxcblxuICBzcGxpdDogKHZhbHVlKSA9PiBnZXRDb2xvclZhbHVlcyh2YWx1ZSwgaHNsVGVybXMpLFxuXG4gIGNvbWJpbmU6ICh2YWx1ZXMpID0+IGNyZWF0ZUZ1bmN0aW9uU3RyaW5nKGNyZWF0ZURlbGltaXRlZCh2YWx1ZXMsIGhzbFRlcm1zLCAnLCAnLCAyKSwgJ2hzbGEnKVxufTtcbiJdfQ==