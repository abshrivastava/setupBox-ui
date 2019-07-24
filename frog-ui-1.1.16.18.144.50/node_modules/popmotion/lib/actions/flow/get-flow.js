'use strict';

exports.__esModule = true;

var _Flow = require('../Flow');

var _Flow2 = _interopRequireDefault(_Flow);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SAVE_PROP = '__pm_flow';

exports.default = function (element, adapter) {
  if (element[SAVE_PROP]) {
    return element[SAVE_PROP];
  } else {
    var flow = new _Flow2.default({ element: element, adapter: adapter });

    // Bind adapter to element
    Object.defineProperty(element, SAVE_PROP, {
      enumerable: false,
      writable: false,
      value: flow
    });

    return flow;
  }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hY3Rpb25zL2Zsb3cvZ2V0LWZsb3cuanMiXSwibmFtZXMiOlsiU0FWRV9QUk9QIiwiZWxlbWVudCIsImFkYXB0ZXIiLCJmbG93IiwiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJlbnVtZXJhYmxlIiwid3JpdGFibGUiLCJ2YWx1ZSJdLCJtYXBwaW5ncyI6Ijs7OztBQUFBOzs7Ozs7QUFFQSxJQUFNQSxZQUFZLFdBQWxCOztrQkFFZSxVQUFDQyxPQUFELEVBQVVDLE9BQVYsRUFBc0I7QUFDbkMsTUFBSUQsUUFBUUQsU0FBUixDQUFKLEVBQXdCO0FBQ3RCLFdBQU9DLFFBQVFELFNBQVIsQ0FBUDtBQUNELEdBRkQsTUFFTztBQUNMLFFBQU1HLE9BQU8sbUJBQVMsRUFBRUYsZ0JBQUYsRUFBV0MsZ0JBQVgsRUFBVCxDQUFiOztBQUVBO0FBQ0FFLFdBQU9DLGNBQVAsQ0FBc0JKLE9BQXRCLEVBQStCRCxTQUEvQixFQUEwQztBQUN4Q00sa0JBQVksS0FENEI7QUFFeENDLGdCQUFVLEtBRjhCO0FBR3hDQyxhQUFPTDtBQUhpQyxLQUExQzs7QUFNQSxXQUFPQSxJQUFQO0FBQ0Q7QUFDRixDIiwiZmlsZSI6ImdldC1mbG93LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEZsb3cgZnJvbSAnLi4vRmxvdyc7XG5cbmNvbnN0IFNBVkVfUFJPUCA9ICdfX3BtX2Zsb3cnO1xuXG5leHBvcnQgZGVmYXVsdCAoZWxlbWVudCwgYWRhcHRlcikgPT4ge1xuICBpZiAoZWxlbWVudFtTQVZFX1BST1BdKSB7XG4gICAgcmV0dXJuIGVsZW1lbnRbU0FWRV9QUk9QXTtcbiAgfSBlbHNlIHtcbiAgICBjb25zdCBmbG93ID0gbmV3IEZsb3coeyBlbGVtZW50LCBhZGFwdGVyIH0pO1xuXG4gICAgLy8gQmluZCBhZGFwdGVyIHRvIGVsZW1lbnRcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZWxlbWVudCwgU0FWRV9QUk9QLCB7XG4gICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgIHdyaXRhYmxlOiBmYWxzZSxcbiAgICAgIHZhbHVlOiBmbG93XG4gICAgfSk7XG5cbiAgICByZXR1cm4gZmxvdztcbiAgfVxufTtcblxuXG4iXX0=