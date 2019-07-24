'use strict';

exports.__esModule = true;

var _utils = require('../inc/utils');

var _dictionary = require('./settings/dictionary');

var _defaultProps = require('./settings/default-props');

exports.default = {
  defaultProps: {
    Red: _defaultProps.rgb,
    Green: _defaultProps.rgb,
    Blue: _defaultProps.rgb,
    Alpha: _defaultProps.opacity
  },

  test: function (value) {
    return value && value.indexOf('rgb') > -1;
  },

  split: function (value) {
    return (0, _utils.getColorValues)(value, _dictionary.rgb);
  },

  combine: function (values) {
    return (0, _utils.createFunctionString)((0, _utils.createDelimited)(values, _dictionary.rgb, ', ', 2), 'rgba');
  }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy92YWx1ZS10eXBlcy9yZ2IuanMiXSwibmFtZXMiOlsiZGVmYXVsdFByb3BzIiwiUmVkIiwiR3JlZW4iLCJCbHVlIiwiQWxwaGEiLCJ0ZXN0IiwidmFsdWUiLCJpbmRleE9mIiwic3BsaXQiLCJjb21iaW5lIiwidmFsdWVzIl0sIm1hcHBpbmdzIjoiOzs7O0FBQUE7O0FBQ0E7O0FBQ0E7O2tCQUVlO0FBQ2JBLGdCQUFjO0FBQ1pDLDBCQURZO0FBRVpDLDRCQUZZO0FBR1pDLDJCQUhZO0FBSVpDO0FBSlksR0FERDs7QUFRYkMsUUFBTSxVQUFDQyxLQUFEO0FBQUEsV0FBWUEsU0FBU0EsTUFBTUMsT0FBTixDQUFjLEtBQWQsSUFBdUIsQ0FBQyxDQUE3QztBQUFBLEdBUk87O0FBVWJDLFNBQU8sVUFBQ0YsS0FBRDtBQUFBLFdBQVcsMkJBQWVBLEtBQWYsa0JBQVg7QUFBQSxHQVZNOztBQVliRyxXQUFTLFVBQUNDLE1BQUQ7QUFBQSxXQUFZLGlDQUFxQiw0QkFBZ0JBLE1BQWhCLG1CQUFrQyxJQUFsQyxFQUF3QyxDQUF4QyxDQUFyQixFQUFpRSxNQUFqRSxDQUFaO0FBQUE7QUFaSSxDIiwiZmlsZSI6InJnYi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNyZWF0ZURlbGltaXRlZCwgY3JlYXRlRnVuY3Rpb25TdHJpbmcsIGdldENvbG9yVmFsdWVzIH0gZnJvbSAnLi4vaW5jL3V0aWxzJztcbmltcG9ydCB7IHJnYiBhcyByZ2JUZXJtcyB9IGZyb20gJy4vc2V0dGluZ3MvZGljdGlvbmFyeSc7XG5pbXBvcnQgeyByZ2IgYXMgZGVmYXVsdFJHQiwgb3BhY2l0eSBhcyBkZWZhdWx0T3BhY2l0eSB9IGZyb20gJy4vc2V0dGluZ3MvZGVmYXVsdC1wcm9wcyc7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgZGVmYXVsdFByb3BzOiB7XG4gICAgUmVkOiBkZWZhdWx0UkdCLFxuICAgIEdyZWVuOiBkZWZhdWx0UkdCLFxuICAgIEJsdWU6IGRlZmF1bHRSR0IsXG4gICAgQWxwaGE6IGRlZmF1bHRPcGFjaXR5XG4gIH0sXG5cbiAgdGVzdDogKHZhbHVlKSA9PiAodmFsdWUgJiYgdmFsdWUuaW5kZXhPZigncmdiJykgPiAtMSksXG5cbiAgc3BsaXQ6ICh2YWx1ZSkgPT4gZ2V0Q29sb3JWYWx1ZXModmFsdWUsIHJnYlRlcm1zKSxcblxuICBjb21iaW5lOiAodmFsdWVzKSA9PiBjcmVhdGVGdW5jdGlvblN0cmluZyhjcmVhdGVEZWxpbWl0ZWQodmFsdWVzLCByZ2JUZXJtcywgJywgJywgMiksICdyZ2JhJylcbn07Il19