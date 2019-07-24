'use strict';

exports.__esModule = true;
exports.deactivate = exports.getTaskId = undefined;
exports.activate = activate;

var _timer = require('./timer');

var _timer2 = _interopRequireDefault(_timer);

var _tick = require('./tick');

var _tick2 = _interopRequireDefault(_tick);

var _manager = require('./manager');

var _manager2 = _interopRequireDefault(_manager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var taskStepOrder = [{ name: 'onFrameStart' }, { name: 'onUpdate' }, { name: 'willRender', decideRender: true }, { name: 'onPreRender', isRender: true }, { name: 'onRender', isRender: true }, { name: 'onPostRender', isRender: true }, { name: 'onFrameEnd' }, { name: 'onCleanup' }]; /*
                                                                                                                                                                                                                                                                                            Core render loop
                                                                                                                                                                                                                                                                                          
                                                                                                                                                                                                                                                                                            Some decicisons here have been taken in the name of performance. All hail performance.
                                                                                                                                                                                                                                                                                            (It turns out microoptimisations do matter when you have 16ms)
                                                                                                                                                                                                                                                                                          */

var numTaskSteps = taskStepOrder.length;

// [boolean]: Is loop running?
var isRunning = false;

/*
  [timestamp]: Frame timestamp
  [int]: Time since last frame
*/
function fireAll(frameStamp, elapsed) {
  var activeIds = _manager2.default.getActiveIds();
  var activeTaskCount = activeIds.length;

  for (var i = 0; i < numTaskSteps; i++) {
    var step = taskStepOrder[i];

    for (var i2 = 0; i2 < activeTaskCount; i2++) {
      var task = _manager2.default.activeTasks[activeIds[i2]];
      var result = false;

      // Check if this task has this step, or if it's a render step that we're rendering this frame
      if (task && task[step.name] && (!step.isRender || step.isRender && task._renderThisFrame === true)) {
        result = task[step.name].call(task, task, frameStamp, elapsed);
      }

      // If this is a decide render step and it returns `false`, set willRender to false
      if (step.decideRender) {
        task._renderThisFrame = task[step.name] && result !== true ? false : true;
      }
    }
  }

  return _manager2.default.getNonBackgroundRunningCount();
}

// Function to fire every frame
function frame(frameStamp) {
  _timer2.default.update(frameStamp);
  isRunning = fireAll(frameStamp, _timer2.default.getElapsed());

  if (isRunning) {
    (0, _tick2.default)(frame);
  }
}

// Start loop
function start() {
  if (!isRunning) {
    _timer2.default.start();
    isRunning = true;
    (0, _tick2.default)(frame);
  }
}

// Exports
var getTaskId = exports.getTaskId = _manager2.default.getTaskId;

/*
  [int]: task ID to activate
  [task]: task to activate
*/
function activate(id, task) {
  _manager2.default.activate(id, task);

  if (!isRunning) {
    start();
  }
}

/*
  [int]: task ID to deactivate
*/
var deactivate = exports.deactivate = _manager2.default.deactivate;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90YXNrL2xvb3AuanMiXSwibmFtZXMiOlsiYWN0aXZhdGUiLCJ0YXNrU3RlcE9yZGVyIiwibmFtZSIsImRlY2lkZVJlbmRlciIsImlzUmVuZGVyIiwibnVtVGFza1N0ZXBzIiwibGVuZ3RoIiwiaXNSdW5uaW5nIiwiZmlyZUFsbCIsImZyYW1lU3RhbXAiLCJlbGFwc2VkIiwiYWN0aXZlSWRzIiwiZ2V0QWN0aXZlSWRzIiwiYWN0aXZlVGFza0NvdW50IiwiaSIsInN0ZXAiLCJpMiIsInRhc2siLCJhY3RpdmVUYXNrcyIsInJlc3VsdCIsIl9yZW5kZXJUaGlzRnJhbWUiLCJjYWxsIiwiZ2V0Tm9uQmFja2dyb3VuZFJ1bm5pbmdDb3VudCIsImZyYW1lIiwidXBkYXRlIiwiZ2V0RWxhcHNlZCIsInN0YXJ0IiwiZ2V0VGFza0lkIiwiaWQiLCJkZWFjdGl2YXRlIl0sIm1hcHBpbmdzIjoiOzs7O1FBaUZnQkEsUSxHQUFBQSxROztBQTNFaEI7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFFQSxJQUFNQyxnQkFBZ0IsQ0FDcEIsRUFBRUMsTUFBTSxjQUFSLEVBRG9CLEVBRXBCLEVBQUVBLE1BQU0sVUFBUixFQUZvQixFQUdwQixFQUFFQSxNQUFNLFlBQVIsRUFBc0JDLGNBQWMsSUFBcEMsRUFIb0IsRUFJcEIsRUFBRUQsTUFBTSxhQUFSLEVBQXVCRSxVQUFVLElBQWpDLEVBSm9CLEVBS3BCLEVBQUVGLE1BQU0sVUFBUixFQUFvQkUsVUFBVSxJQUE5QixFQUxvQixFQU1wQixFQUFFRixNQUFNLGNBQVIsRUFBd0JFLFVBQVUsSUFBbEMsRUFOb0IsRUFPcEIsRUFBRUYsTUFBTSxZQUFSLEVBUG9CLEVBUXBCLEVBQUVBLE1BQU0sV0FBUixFQVJvQixDQUF0QixDLENBVkE7Ozs7Ozs7QUFvQkEsSUFBTUcsZUFBZUosY0FBY0ssTUFBbkM7O0FBRUE7QUFDQSxJQUFJQyxZQUFZLEtBQWhCOztBQUVBOzs7O0FBSUEsU0FBU0MsT0FBVCxDQUFpQkMsVUFBakIsRUFBNkJDLE9BQTdCLEVBQXNDO0FBQ3BDLE1BQU1DLFlBQVksa0JBQVFDLFlBQVIsRUFBbEI7QUFDQSxNQUFNQyxrQkFBa0JGLFVBQVVMLE1BQWxDOztBQUVBLE9BQUssSUFBSVEsSUFBSSxDQUFiLEVBQWdCQSxJQUFJVCxZQUFwQixFQUFrQ1MsR0FBbEMsRUFBdUM7QUFDckMsUUFBTUMsT0FBT2QsY0FBY2EsQ0FBZCxDQUFiOztBQUVBLFNBQUssSUFBSUUsS0FBSyxDQUFkLEVBQWlCQSxLQUFLSCxlQUF0QixFQUF1Q0csSUFBdkMsRUFBNkM7QUFDM0MsVUFBTUMsT0FBTyxrQkFBUUMsV0FBUixDQUFvQlAsVUFBVUssRUFBVixDQUFwQixDQUFiO0FBQ0EsVUFBSUcsU0FBUyxLQUFiOztBQUVBO0FBQ0EsVUFBSUYsUUFBUUEsS0FBS0YsS0FBS2IsSUFBVixDQUFSLEtBQTRCLENBQUNhLEtBQUtYLFFBQU4sSUFBbUJXLEtBQUtYLFFBQUwsSUFBaUJhLEtBQUtHLGdCQUFMLEtBQTBCLElBQTFGLENBQUosRUFBc0c7QUFDcEdELGlCQUFTRixLQUFLRixLQUFLYixJQUFWLEVBQWdCbUIsSUFBaEIsQ0FBcUJKLElBQXJCLEVBQTJCQSxJQUEzQixFQUFpQ1IsVUFBakMsRUFBNkNDLE9BQTdDLENBQVQ7QUFDRDs7QUFFRDtBQUNBLFVBQUlLLEtBQUtaLFlBQVQsRUFBdUI7QUFDckJjLGFBQUtHLGdCQUFMLEdBQXlCSCxLQUFLRixLQUFLYixJQUFWLEtBQW1CaUIsV0FBVyxJQUEvQixHQUF1QyxLQUF2QyxHQUErQyxJQUF2RTtBQUNEO0FBQ0Y7QUFDRjs7QUFFRCxTQUFPLGtCQUFRRyw0QkFBUixFQUFQO0FBQ0Q7O0FBRUQ7QUFDQSxTQUFTQyxLQUFULENBQWVkLFVBQWYsRUFBMkI7QUFDekIsa0JBQU1lLE1BQU4sQ0FBYWYsVUFBYjtBQUNBRixjQUFZQyxRQUFRQyxVQUFSLEVBQW9CLGdCQUFNZ0IsVUFBTixFQUFwQixDQUFaOztBQUVBLE1BQUlsQixTQUFKLEVBQWU7QUFDYix3QkFBS2dCLEtBQUw7QUFDRDtBQUNGOztBQUVEO0FBQ0EsU0FBU0csS0FBVCxHQUFpQjtBQUNmLE1BQUksQ0FBQ25CLFNBQUwsRUFBZ0I7QUFDZCxvQkFBTW1CLEtBQU47QUFDQW5CLGdCQUFZLElBQVo7QUFDQSx3QkFBS2dCLEtBQUw7QUFDRDtBQUNGOztBQUVEO0FBQ08sSUFBTUksZ0NBQVksa0JBQVFBLFNBQTFCOztBQUVQOzs7O0FBSU8sU0FBUzNCLFFBQVQsQ0FBa0I0QixFQUFsQixFQUFzQlgsSUFBdEIsRUFBNEI7QUFDakMsb0JBQVFqQixRQUFSLENBQWlCNEIsRUFBakIsRUFBcUJYLElBQXJCOztBQUVBLE1BQUksQ0FBQ1YsU0FBTCxFQUFnQjtBQUNkbUI7QUFDRDtBQUNGOztBQUVEOzs7QUFHTyxJQUFNRyxrQ0FBYSxrQkFBUUEsVUFBM0IiLCJmaWxlIjoibG9vcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gIENvcmUgcmVuZGVyIGxvb3BcblxuICBTb21lIGRlY2ljaXNvbnMgaGVyZSBoYXZlIGJlZW4gdGFrZW4gaW4gdGhlIG5hbWUgb2YgcGVyZm9ybWFuY2UuIEFsbCBoYWlsIHBlcmZvcm1hbmNlLlxuICAoSXQgdHVybnMgb3V0IG1pY3Jvb3B0aW1pc2F0aW9ucyBkbyBtYXR0ZXIgd2hlbiB5b3UgaGF2ZSAxNm1zKVxuKi9cbmltcG9ydCB0aW1lciBmcm9tICcuL3RpbWVyJztcbmltcG9ydCB0aWNrIGZyb20gJy4vdGljayc7XG5pbXBvcnQgbWFuYWdlciBmcm9tICcuL21hbmFnZXInO1xuXG5jb25zdCB0YXNrU3RlcE9yZGVyID0gW1xuICB7IG5hbWU6ICdvbkZyYW1lU3RhcnQnIH0sXG4gIHsgbmFtZTogJ29uVXBkYXRlJyB9LFxuICB7IG5hbWU6ICd3aWxsUmVuZGVyJywgZGVjaWRlUmVuZGVyOiB0cnVlIH0sXG4gIHsgbmFtZTogJ29uUHJlUmVuZGVyJywgaXNSZW5kZXI6IHRydWUgfSxcbiAgeyBuYW1lOiAnb25SZW5kZXInLCBpc1JlbmRlcjogdHJ1ZSB9LFxuICB7IG5hbWU6ICdvblBvc3RSZW5kZXInLCBpc1JlbmRlcjogdHJ1ZSB9LFxuICB7IG5hbWU6ICdvbkZyYW1lRW5kJyB9LFxuICB7IG5hbWU6ICdvbkNsZWFudXAnIH1cbl07XG5jb25zdCBudW1UYXNrU3RlcHMgPSB0YXNrU3RlcE9yZGVyLmxlbmd0aDtcblxuLy8gW2Jvb2xlYW5dOiBJcyBsb29wIHJ1bm5pbmc/XG5sZXQgaXNSdW5uaW5nID0gZmFsc2U7XG5cbi8qXG4gIFt0aW1lc3RhbXBdOiBGcmFtZSB0aW1lc3RhbXBcbiAgW2ludF06IFRpbWUgc2luY2UgbGFzdCBmcmFtZVxuKi9cbmZ1bmN0aW9uIGZpcmVBbGwoZnJhbWVTdGFtcCwgZWxhcHNlZCkge1xuICBjb25zdCBhY3RpdmVJZHMgPSBtYW5hZ2VyLmdldEFjdGl2ZUlkcygpO1xuICBjb25zdCBhY3RpdmVUYXNrQ291bnQgPSBhY3RpdmVJZHMubGVuZ3RoO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbnVtVGFza1N0ZXBzOyBpKyspIHtcbiAgICBjb25zdCBzdGVwID0gdGFza1N0ZXBPcmRlcltpXTtcblxuICAgIGZvciAobGV0IGkyID0gMDsgaTIgPCBhY3RpdmVUYXNrQ291bnQ7IGkyKyspIHtcbiAgICAgIGNvbnN0IHRhc2sgPSBtYW5hZ2VyLmFjdGl2ZVRhc2tzW2FjdGl2ZUlkc1tpMl1dO1xuICAgICAgbGV0IHJlc3VsdCA9IGZhbHNlO1xuXG4gICAgICAvLyBDaGVjayBpZiB0aGlzIHRhc2sgaGFzIHRoaXMgc3RlcCwgb3IgaWYgaXQncyBhIHJlbmRlciBzdGVwIHRoYXQgd2UncmUgcmVuZGVyaW5nIHRoaXMgZnJhbWVcbiAgICAgIGlmICh0YXNrICYmIHRhc2tbc3RlcC5uYW1lXSAmJiAoIXN0ZXAuaXNSZW5kZXIgfHwgKHN0ZXAuaXNSZW5kZXIgJiYgdGFzay5fcmVuZGVyVGhpc0ZyYW1lID09PSB0cnVlKSkpIHtcbiAgICAgICAgcmVzdWx0ID0gdGFza1tzdGVwLm5hbWVdLmNhbGwodGFzaywgdGFzaywgZnJhbWVTdGFtcCwgZWxhcHNlZCk7XG4gICAgICB9XG5cbiAgICAgIC8vIElmIHRoaXMgaXMgYSBkZWNpZGUgcmVuZGVyIHN0ZXAgYW5kIGl0IHJldHVybnMgYGZhbHNlYCwgc2V0IHdpbGxSZW5kZXIgdG8gZmFsc2VcbiAgICAgIGlmIChzdGVwLmRlY2lkZVJlbmRlcikge1xuICAgICAgICB0YXNrLl9yZW5kZXJUaGlzRnJhbWUgPSAodGFza1tzdGVwLm5hbWVdICYmIHJlc3VsdCAhPT0gdHJ1ZSkgPyBmYWxzZSA6IHRydWU7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG1hbmFnZXIuZ2V0Tm9uQmFja2dyb3VuZFJ1bm5pbmdDb3VudCgpO1xufVxuXG4vLyBGdW5jdGlvbiB0byBmaXJlIGV2ZXJ5IGZyYW1lXG5mdW5jdGlvbiBmcmFtZShmcmFtZVN0YW1wKSB7XG4gIHRpbWVyLnVwZGF0ZShmcmFtZVN0YW1wKTtcbiAgaXNSdW5uaW5nID0gZmlyZUFsbChmcmFtZVN0YW1wLCB0aW1lci5nZXRFbGFwc2VkKCkpO1xuXG4gIGlmIChpc1J1bm5pbmcpIHtcbiAgICB0aWNrKGZyYW1lKTtcbiAgfVxufVxuXG4vLyBTdGFydCBsb29wXG5mdW5jdGlvbiBzdGFydCgpIHtcbiAgaWYgKCFpc1J1bm5pbmcpIHtcbiAgICB0aW1lci5zdGFydCgpO1xuICAgIGlzUnVubmluZyA9IHRydWU7XG4gICAgdGljayhmcmFtZSk7XG4gIH1cbn1cblxuLy8gRXhwb3J0c1xuZXhwb3J0IGNvbnN0IGdldFRhc2tJZCA9IG1hbmFnZXIuZ2V0VGFza0lkO1xuXG4vKlxuICBbaW50XTogdGFzayBJRCB0byBhY3RpdmF0ZVxuICBbdGFza106IHRhc2sgdG8gYWN0aXZhdGVcbiovXG5leHBvcnQgZnVuY3Rpb24gYWN0aXZhdGUoaWQsIHRhc2spIHtcbiAgbWFuYWdlci5hY3RpdmF0ZShpZCwgdGFzayk7XG5cbiAgaWYgKCFpc1J1bm5pbmcpIHtcbiAgICBzdGFydCgpO1xuICB9XG59XG5cbi8qXG4gIFtpbnRdOiB0YXNrIElEIHRvIGRlYWN0aXZhdGVcbiovXG5leHBvcnQgY29uc3QgZGVhY3RpdmF0ZSA9IG1hbmFnZXIuZGVhY3RpdmF0ZTsiXX0=