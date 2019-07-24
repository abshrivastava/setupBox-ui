'use strict';

exports.__esModule = true;
exports.chain = exports.circularMotion = exports.createMapper = undefined;

var _calc = require('../inc/calc');

var createMapper = exports.createMapper = function (input, output) {
  var mapLength = input.length;
  var finalIndex = mapLength - 1;

  return function (value) {
    // If value outside minimum input range, quickly return
    if (value <= input[0]) {
      return output[0];
    }

    // If value outside maximum input range, quickly return
    if (value >= input[finalIndex]) {
      return output[finalIndex];
    }

    // If within overall input range, find specific range
    for (var i = 1; i < mapLength; i++) {
      if (value < input[i] || i === finalIndex) {
        var progressInRange = (0, _calc.getProgressFromValue)(value, input[i - 1], input[i]);
        return (0, _calc.getValueFromProgress)(progressInRange, output[i - 1], output[i]);
      }
    }
  };
};

var circularMotion = exports.circularMotion = function (v, key, _ref) {
  var values = _ref.values;

  var originX = values.originX ? values.originX.current : 0;
  var originY = values.originY ? values.originY.current : 0;

  return (0, _calc.pointFromAngleAndDistance)({
    x: originX,
    y: originY
  }, values.angle.current, values.distance.current)[key];
};

/*
  Combine transformers into one function that calls every
  transformer in the array and returns the result

  @param [array]
  @return [function]
*/
var chain = exports.chain = function (transformers) {
  var numTransformers = transformers.length;
  var i = 0;

  /*
    @param [number]
    @param [string]
    @param [Action]
    @return [number]
  */
  return function (v, key, a) {
    for (i = 0; i < numTransformers; i++) {
      v = transformers[i](v, key, a);
    }

    return v;
  };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9pbmMvdHJhbnNmb3JtZXJzLmpzIl0sIm5hbWVzIjpbImNyZWF0ZU1hcHBlciIsImlucHV0Iiwib3V0cHV0IiwibWFwTGVuZ3RoIiwibGVuZ3RoIiwiZmluYWxJbmRleCIsInZhbHVlIiwiaSIsInByb2dyZXNzSW5SYW5nZSIsImNpcmN1bGFyTW90aW9uIiwidiIsImtleSIsInZhbHVlcyIsIm9yaWdpblgiLCJjdXJyZW50Iiwib3JpZ2luWSIsIngiLCJ5IiwiYW5nbGUiLCJkaXN0YW5jZSIsImNoYWluIiwidHJhbnNmb3JtZXJzIiwibnVtVHJhbnNmb3JtZXJzIiwiYSJdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQTs7QUFFTyxJQUFNQSxzQ0FBZSxVQUFDQyxLQUFELEVBQVFDLE1BQVIsRUFBbUI7QUFDN0MsTUFBTUMsWUFBWUYsTUFBTUcsTUFBeEI7QUFDQSxNQUFNQyxhQUFhRixZQUFZLENBQS9COztBQUVBLFNBQU8sVUFBQ0csS0FBRCxFQUFXO0FBQ2hCO0FBQ0EsUUFBSUEsU0FBU0wsTUFBTSxDQUFOLENBQWIsRUFBdUI7QUFDckIsYUFBT0MsT0FBTyxDQUFQLENBQVA7QUFDRDs7QUFFRDtBQUNBLFFBQUlJLFNBQVNMLE1BQU1JLFVBQU4sQ0FBYixFQUFnQztBQUM5QixhQUFPSCxPQUFPRyxVQUFQLENBQVA7QUFDRDs7QUFFRDtBQUNBLFNBQUssSUFBSUUsSUFBSSxDQUFiLEVBQWdCQSxJQUFJSixTQUFwQixFQUErQkksR0FBL0IsRUFBb0M7QUFDbEMsVUFBSUQsUUFBUUwsTUFBTU0sQ0FBTixDQUFSLElBQW9CQSxNQUFNRixVQUE5QixFQUEwQztBQUN4QyxZQUFNRyxrQkFBa0IsZ0NBQXFCRixLQUFyQixFQUE0QkwsTUFBTU0sSUFBSSxDQUFWLENBQTVCLEVBQTBDTixNQUFNTSxDQUFOLENBQTFDLENBQXhCO0FBQ0EsZUFBTyxnQ0FBcUJDLGVBQXJCLEVBQXNDTixPQUFPSyxJQUFJLENBQVgsQ0FBdEMsRUFBcURMLE9BQU9LLENBQVAsQ0FBckQsQ0FBUDtBQUNEO0FBQ0Y7QUFDRixHQWxCRDtBQW1CRCxDQXZCTTs7QUF5QkEsSUFBTUUsMENBQWlCLFVBQUNDLENBQUQsRUFBSUMsR0FBSixRQUF3QjtBQUFBLE1BQWJDLE1BQWEsUUFBYkEsTUFBYTs7QUFDcEQsTUFBTUMsVUFBV0QsT0FBT0MsT0FBUixHQUFtQkQsT0FBT0MsT0FBUCxDQUFlQyxPQUFsQyxHQUE0QyxDQUE1RDtBQUNBLE1BQU1DLFVBQVdILE9BQU9HLE9BQVIsR0FBbUJILE9BQU9HLE9BQVAsQ0FBZUQsT0FBbEMsR0FBNEMsQ0FBNUQ7O0FBRUEsU0FBTyxxQ0FBMEI7QUFDL0JFLE9BQUdILE9BRDRCO0FBRS9CSSxPQUFHRjtBQUY0QixHQUExQixFQUdKSCxPQUFPTSxLQUFQLENBQWFKLE9BSFQsRUFHa0JGLE9BQU9PLFFBQVAsQ0FBZ0JMLE9BSGxDLEVBRzJDSCxHQUgzQyxDQUFQO0FBSUQsQ0FSTTs7QUFVUDs7Ozs7OztBQU9PLElBQU1TLHdCQUFRLFVBQUNDLFlBQUQsRUFBa0I7QUFDckMsTUFBTUMsa0JBQWtCRCxhQUFhakIsTUFBckM7QUFDQSxNQUFJRyxJQUFJLENBQVI7O0FBRUE7Ozs7OztBQU1BLFNBQU8sVUFBQ0csQ0FBRCxFQUFJQyxHQUFKLEVBQVNZLENBQVQsRUFBZTtBQUNwQixTQUFLaEIsSUFBSSxDQUFULEVBQVlBLElBQUllLGVBQWhCLEVBQWlDZixHQUFqQyxFQUFzQztBQUNwQ0csVUFBSVcsYUFBYWQsQ0FBYixFQUFnQkcsQ0FBaEIsRUFBbUJDLEdBQW5CLEVBQXdCWSxDQUF4QixDQUFKO0FBQ0Q7O0FBRUQsV0FBT2IsQ0FBUDtBQUNELEdBTkQ7QUFPRCxDQWpCTSIsImZpbGUiOiJ0cmFuc2Zvcm1lcnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBnZXRQcm9ncmVzc0Zyb21WYWx1ZSwgZ2V0VmFsdWVGcm9tUHJvZ3Jlc3MsIHBvaW50RnJvbUFuZ2xlQW5kRGlzdGFuY2UgfSBmcm9tICcuLi9pbmMvY2FsYyc7XG5cbmV4cG9ydCBjb25zdCBjcmVhdGVNYXBwZXIgPSAoaW5wdXQsIG91dHB1dCkgPT4ge1xuICBjb25zdCBtYXBMZW5ndGggPSBpbnB1dC5sZW5ndGg7XG4gIGNvbnN0IGZpbmFsSW5kZXggPSBtYXBMZW5ndGggLSAxO1xuXG4gIHJldHVybiAodmFsdWUpID0+IHtcbiAgICAvLyBJZiB2YWx1ZSBvdXRzaWRlIG1pbmltdW0gaW5wdXQgcmFuZ2UsIHF1aWNrbHkgcmV0dXJuXG4gICAgaWYgKHZhbHVlIDw9IGlucHV0WzBdKSB7XG4gICAgICByZXR1cm4gb3V0cHV0WzBdO1xuICAgIH1cblxuICAgIC8vIElmIHZhbHVlIG91dHNpZGUgbWF4aW11bSBpbnB1dCByYW5nZSwgcXVpY2tseSByZXR1cm5cbiAgICBpZiAodmFsdWUgPj0gaW5wdXRbZmluYWxJbmRleF0pIHtcbiAgICAgIHJldHVybiBvdXRwdXRbZmluYWxJbmRleF07XG4gICAgfVxuXG4gICAgLy8gSWYgd2l0aGluIG92ZXJhbGwgaW5wdXQgcmFuZ2UsIGZpbmQgc3BlY2lmaWMgcmFuZ2VcbiAgICBmb3IgKGxldCBpID0gMTsgaSA8IG1hcExlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAodmFsdWUgPCBpbnB1dFtpXSB8fCBpID09PSBmaW5hbEluZGV4KSB7XG4gICAgICAgIGNvbnN0IHByb2dyZXNzSW5SYW5nZSA9IGdldFByb2dyZXNzRnJvbVZhbHVlKHZhbHVlLCBpbnB1dFtpIC0gMV0sIGlucHV0W2ldKTtcbiAgICAgICAgcmV0dXJuIGdldFZhbHVlRnJvbVByb2dyZXNzKHByb2dyZXNzSW5SYW5nZSwgb3V0cHV0W2kgLSAxXSwgb3V0cHV0W2ldKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG59O1xuXG5leHBvcnQgY29uc3QgY2lyY3VsYXJNb3Rpb24gPSAodiwga2V5LCB7IHZhbHVlcyB9KSA9PiB7XG4gIGNvbnN0IG9yaWdpblggPSAodmFsdWVzLm9yaWdpblgpID8gdmFsdWVzLm9yaWdpblguY3VycmVudCA6IDA7XG4gIGNvbnN0IG9yaWdpblkgPSAodmFsdWVzLm9yaWdpblkpID8gdmFsdWVzLm9yaWdpblkuY3VycmVudCA6IDA7XG5cbiAgcmV0dXJuIHBvaW50RnJvbUFuZ2xlQW5kRGlzdGFuY2Uoe1xuICAgIHg6IG9yaWdpblgsXG4gICAgeTogb3JpZ2luWSBcbiAgfSwgdmFsdWVzLmFuZ2xlLmN1cnJlbnQsIHZhbHVlcy5kaXN0YW5jZS5jdXJyZW50KVtrZXldO1xufTtcblxuLypcbiAgQ29tYmluZSB0cmFuc2Zvcm1lcnMgaW50byBvbmUgZnVuY3Rpb24gdGhhdCBjYWxscyBldmVyeVxuICB0cmFuc2Zvcm1lciBpbiB0aGUgYXJyYXkgYW5kIHJldHVybnMgdGhlIHJlc3VsdFxuXG4gIEBwYXJhbSBbYXJyYXldXG4gIEByZXR1cm4gW2Z1bmN0aW9uXVxuKi9cbmV4cG9ydCBjb25zdCBjaGFpbiA9ICh0cmFuc2Zvcm1lcnMpID0+IHtcbiAgY29uc3QgbnVtVHJhbnNmb3JtZXJzID0gdHJhbnNmb3JtZXJzLmxlbmd0aDtcbiAgbGV0IGkgPSAwO1xuXG4gIC8qXG4gICAgQHBhcmFtIFtudW1iZXJdXG4gICAgQHBhcmFtIFtzdHJpbmddXG4gICAgQHBhcmFtIFtBY3Rpb25dXG4gICAgQHJldHVybiBbbnVtYmVyXVxuICAqL1xuICByZXR1cm4gKHYsIGtleSwgYSkgPT4ge1xuICAgIGZvciAoaSA9IDA7IGkgPCBudW1UcmFuc2Zvcm1lcnM7IGkrKykge1xuICAgICAgdiA9IHRyYW5zZm9ybWVyc1tpXSh2LCBrZXksIGEpO1xuICAgIH1cblxuICAgIHJldHVybiB2O1xuICB9O1xufTsiXX0=