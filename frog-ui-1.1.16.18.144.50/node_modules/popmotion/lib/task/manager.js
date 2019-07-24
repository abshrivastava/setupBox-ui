"use strict";

exports.__esModule = true;
// [int]: Incremented for each new running task
var currentTaskId = 0;

// [int]: Number of all running taskes
var totalRunningCount = 0;

// [int]: Number of running taskes excluding background taskes
var nonBackgroundRunningCount = 0;

// [array]: Array of running task IDs
var runningIds = [];

// [object]: Map of running taskes
var activeTasks = {};

// [array]: Array of task IDs queued for activation
var activateQueue = [];

// [array]: Array of task IDs queued for deactivation
var deactivateQueue = [];

/*
  Update activate/deactivate queues

  @param [number]
  @param [array]
  @param [array]
*/
var updateQueues = function (id, inList, outList) {
  var inPosition = inList.indexOf(id);
  var outPosition = outList.indexOf(id);

  if (inPosition === -1) {
    inList.push(id);
  }

  if (outPosition > -1) {
    outList.splice(outPosition, 1);
  }
};

/*
  Update running

  [boolean]: `true` to add
  [boolean]: `true` if lazy
*/
var updateRunningCount = function (add, isLazy) {
  var modify = add ? 1 : -1;

  totalRunningCount += modify;

  if (!isLazy) {
    nonBackgroundRunningCount += modify;
  }
};

exports.default = {
  activeTasks: activeTasks,

  // Activate a task
  activate: function (id, task) {
    activeTasks[id] = task;
    task.isActive = true;
    updateQueues(id, activateQueue, deactivateQueue);

    if (task.onActivate) {
      task.onActivate(task);
    }

    if (task.onActivateOnce) {
      task.onActivateOnce(task);
    }
  },

  // Deactivate a task
  deactivate: function (id) {
    var task = activeTasks[id];

    if (task) {
      updateQueues(id, deactivateQueue, activateQueue);
      task.isActive = false;

      if (task.onDeactivate) {
        task.onDeactivate(task);
      }
    }
  },

  // Number background taskes
  getNonBackgroundRunningCount: function () {
    return nonBackgroundRunningCount;
  },

  // Increment current task ID and return
  getTaskId: function () {
    return currentTaskId++;
  },

  // Resolve activate/deactivate taskes and return active ids
  getActiveIds: function () {
    /*
      task deactivate queue
    */
    var deactivateQueueLength = deactivateQueue.length;

    for (var i = 0; i < deactivateQueueLength; i++) {
      var id = deactivateQueue[i];
      var activeIdIndex = runningIds.indexOf(id);
      var task = activeTasks[id];

      // If this is a running task, deactivate
      if (activeIdIndex > -1) {
        runningIds.splice(activeIdIndex, 1);
        updateRunningCount(false, task.isLazy);
        delete activeTasks[id];
      }
    }

    /*
      Empty deactivate queue. We use `Array.splice` because it doesn't
      works on the original array so we don't have to garbage collect anything
    */
    deactivateQueue.splice(0, deactivateQueueLength);

    /*
      task activate queue
    */
    var activateQueueLength = activateQueue.length;

    for (var _i = 0; _i < activateQueueLength; _i++) {
      var _id = activateQueue[_i];
      var _activeIdIndex = runningIds.indexOf(_id);
      var _task = activeTasks[_id];

      if (_task && _task.onActivateLoop) {
        _task.onActivateLoop();
      }

      // If task isn't already running, activate
      if (_activeIdIndex === -1 && _task) {
        if (_task.isPriority) {
          runningIds.unshift(_id);
        } else {
          runningIds.push(_id);
        }

        updateRunningCount(true, _task.isLazy);
      }
    }

    activateQueue.splice(0, activateQueueLength);

    return runningIds;
  }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90YXNrL21hbmFnZXIuanMiXSwibmFtZXMiOlsiY3VycmVudFRhc2tJZCIsInRvdGFsUnVubmluZ0NvdW50Iiwibm9uQmFja2dyb3VuZFJ1bm5pbmdDb3VudCIsInJ1bm5pbmdJZHMiLCJhY3RpdmVUYXNrcyIsImFjdGl2YXRlUXVldWUiLCJkZWFjdGl2YXRlUXVldWUiLCJ1cGRhdGVRdWV1ZXMiLCJpZCIsImluTGlzdCIsIm91dExpc3QiLCJpblBvc2l0aW9uIiwiaW5kZXhPZiIsIm91dFBvc2l0aW9uIiwicHVzaCIsInNwbGljZSIsInVwZGF0ZVJ1bm5pbmdDb3VudCIsImFkZCIsImlzTGF6eSIsIm1vZGlmeSIsImFjdGl2YXRlIiwidGFzayIsImlzQWN0aXZlIiwib25BY3RpdmF0ZSIsIm9uQWN0aXZhdGVPbmNlIiwiZGVhY3RpdmF0ZSIsIm9uRGVhY3RpdmF0ZSIsImdldE5vbkJhY2tncm91bmRSdW5uaW5nQ291bnQiLCJnZXRUYXNrSWQiLCJnZXRBY3RpdmVJZHMiLCJkZWFjdGl2YXRlUXVldWVMZW5ndGgiLCJsZW5ndGgiLCJpIiwiYWN0aXZlSWRJbmRleCIsImFjdGl2YXRlUXVldWVMZW5ndGgiLCJvbkFjdGl2YXRlTG9vcCIsImlzUHJpb3JpdHkiLCJ1bnNoaWZ0Il0sIm1hcHBpbmdzIjoiOzs7QUFBQTtBQUNBLElBQUlBLGdCQUFnQixDQUFwQjs7QUFFQTtBQUNBLElBQUlDLG9CQUFvQixDQUF4Qjs7QUFFQTtBQUNBLElBQUlDLDRCQUE0QixDQUFoQzs7QUFFQTtBQUNBLElBQU1DLGFBQWEsRUFBbkI7O0FBRUE7QUFDQSxJQUFNQyxjQUFjLEVBQXBCOztBQUVBO0FBQ0EsSUFBTUMsZ0JBQWdCLEVBQXRCOztBQUVBO0FBQ0EsSUFBTUMsa0JBQWtCLEVBQXhCOztBQUVBOzs7Ozs7O0FBT0EsSUFBTUMsZUFBZSxVQUFDQyxFQUFELEVBQUtDLE1BQUwsRUFBYUMsT0FBYixFQUF5QjtBQUM1QyxNQUFNQyxhQUFhRixPQUFPRyxPQUFQ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QUFpQztBQUMvQmQsY0FBS2MsY0FBTDtBQUNEOztBQUVEO0FBQ0EsVUFBSUYsbUJBQWtCLENBQUMsQ0FBbkIsSUFBd0JaLEtBQTVCLEVBQWtDO0FBQ2hDLFlBQUlBLE1BQUtlLFVBQVQsRUFBcUI7QUFDbkJqQyxxQkFBV2tDLE9BQVgsQ0FBbUI3QixHQUFuQjtBQUNELFNBRkQsTUFFTztBQUNMTCxxQkFBV1csSUFBWCxDQUFnQk4sR0FBaEI7QUFDRDs7QUFFRFEsMkJBQW1CLElBQW5CLEVBQXlCSyxNQUFLSCxNQUE5QjtBQUNEO0FBQ0Y7O0FBRURiLGtCQUFjVSxNQUFkLENBQXFCLENBQXJCLEVBQXdCbUIsbUJBQXhCOztBQUVBLFdBQU8vQixVQUFQO0FBQ0Q7QUE3RlksQyIsImZpbGUiOiJtYW5hZ2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gW2ludF06IEluY3JlbWVudGVkIGZvciBlYWNoIG5ldyBydW5uaW5nIHRhc2tcbmxldCBjdXJyZW50VGFza0lkID0gMDtcblxuLy8gW2ludF06IE51bWJlciBvZiBhbGwgcnVubmluZyB0YXNrZXNcbmxldCB0b3RhbFJ1bm5pbmdDb3VudCA9IDA7XG5cbi8vIFtpbnRdOiBOdW1iZXIgb2YgcnVubmluZyB0YXNrZXMgZXhjbHVkaW5nIGJhY2tncm91bmQgdGFza2VzXG5sZXQgbm9uQmFja2dyb3VuZFJ1bm5pbmdDb3VudCA9IDA7XG5cbi8vIFthcnJheV06IEFycmF5IG9mIHJ1bm5pbmcgdGFzayBJRHNcbmNvbnN0IHJ1bm5pbmdJZHMgPSBbXTtcblxuLy8gW29iamVjdF06IE1hcCBvZiBydW5uaW5nIHRhc2tlc1xuY29uc3QgYWN0aXZlVGFza3MgPSB7fTtcblxuLy8gW2FycmF5XTogQXJyYXkgb2YgdGFzayBJRHMgcXVldWVkIGZvciBhY3RpdmF0aW9uXG5jb25zdCBhY3RpdmF0ZVF1ZXVlID0gW107XG5cbi8vIFthcnJheV06IEFycmF5IG9mIHRhc2sgSURzIHF1ZXVlZCBmb3IgZGVhY3RpdmF0aW9uXG5jb25zdCBkZWFjdGl2YXRlUXVldWUgPSBbXTtcblxuLypcbiAgVXBkYXRlIGFjdGl2YXRlL2RlYWN0aXZhdGUgcXVldWVzXG5cbiAgQHBhcmFtIFtudW1iZXJdXG4gIEBwYXJhbSBbYXJyYXldXG4gIEBwYXJhbSBbYXJyYXldXG4qL1xuY29uc3QgdXBkYXRlUXVldWVzID0gKGlkLCBpbkxpc3QsIG91dExpc3QpID0+IHtcbiAgY29uc3QgaW5Qb3NpdGlvbiA9IGluTGlzdC5pbmRleE9mKGlkKTtcbiAgY29uc3Qgb3V0UG9zaXRpb24gPSBvdXRMaXN0LmluZGV4T2YoaWQpO1xuXG4gIGlmIChpblBvc2l0aW9uID09PSAtMSkge1xuICAgIGluTGlzdC5wdXNoKGlkKTtcbiAgfVxuXG4gIGlmIChvdXRQb3NpdGlvbiA+IC0xKSB7XG4gICAgb3V0TGlzdC5zcGxpY2Uob3V0UG9zaXRpb24sIDEpO1xuICB9XG59O1xuXG4vKlxuICBVcGRhdGUgcnVubmluZ1xuXG4gIFtib29sZWFuXTogYHRydWVgIHRvIGFkZFxuICBbYm9vbGVhbl06IGB0cnVlYCBpZiBsYXp5XG4qL1xuY29uc3QgdXBkYXRlUnVubmluZ0NvdW50ID0gKGFkZCwgaXNMYXp5KSA9PiB7XG4gIGNvbnN0IG1vZGlmeSA9IGFkZCA/IDEgOiAtMTtcblxuICB0b3RhbFJ1bm5pbmdDb3VudCArPSBtb2RpZnk7XG5cbiAgaWYgKCFpc0xhenkpIHtcbiAgICBub25CYWNrZ3JvdW5kUnVubmluZ0NvdW50ICs9IG1vZGlmeTtcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQge1xuICBhY3RpdmVUYXNrcyxcblxuICAvLyBBY3RpdmF0ZSBhIHRhc2tcbiAgYWN0aXZhdGU6IChpZCwgdGFzaykgPT4ge1xuICAgIGFjdGl2ZVRhc2tzW2lkXSA9IHRhc2s7XG4gICAgdGFzay5pc0FjdGl2ZSA9IHRydWU7XG4gICAgdXBkYXRlUXVldWVzKGlkLCBhY3RpdmF0ZVF1ZXVlLCBkZWFjdGl2YXRlUXVldWUpO1xuXG4gICAgaWYgKHRhc2sub25BY3RpdmF0ZSkge1xuICAgICAgdGFzay5vbkFjdGl2YXRlKHRhc2spO1xuICAgIH1cblxuICAgIGlmICh0YXNrLm9uQWN0aXZhdGVPbmNlKSB7XG4gICAgICB0YXNrLm9uQWN0aXZhdGVPbmNlKHRhc2spO1xuICAgIH1cbiAgfSxcblxuICAvLyBEZWFjdGl2YXRlIGEgdGFza1xuICBkZWFjdGl2YXRlOiAoaWQpID0+IHtcbiAgICBjb25zdCB0YXNrID0gYWN0aXZlVGFza3NbaWRdO1xuXG4gICAgaWYgKHRhc2spIHtcbiAgICAgIHVwZGF0ZVF1ZXVlcyhpZCwgZGVhY3RpdmF0ZVF1ZXVlLCBhY3RpdmF0ZVF1ZXVlKTtcbiAgICAgIHRhc2suaXNBY3RpdmUgPSBmYWxzZTtcblxuICAgICAgaWYgKHRhc2sub25EZWFjdGl2YXRlKSB7XG4gICAgICAgIHRhc2sub25EZWFjdGl2YXRlKHRhc2spO1xuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICAvLyBOdW1iZXIgYmFja2dyb3VuZCB0YXNrZXNcbiAgZ2V0Tm9uQmFja2dyb3VuZFJ1bm5pbmdDb3VudDogKCkgPT4gbm9uQmFja2dyb3VuZFJ1bm5pbmdDb3VudCxcblxuICAvLyBJbmNyZW1lbnQgY3VycmVudCB0YXNrIElEIGFuZCByZXR1cm5cbiAgZ2V0VGFza0lkOiAoKSA9PiBjdXJyZW50VGFza0lkKyssXG5cbiAgLy8gUmVzb2x2ZSBhY3RpdmF0ZS9kZWFjdGl2YXRlIHRhc2tlcyBhbmQgcmV0dXJuIGFjdGl2ZSBpZHNcbiAgZ2V0QWN0aXZlSWRzOiAoKSA9PiB7XG4gICAgLypcbiAgICAgIHRhc2sgZGVhY3RpdmF0ZSBxdWV1ZVxuICAgICovXG4gICAgY29uc3QgZGVhY3RpdmF0ZVF1ZXVlTGVuZ3RoID0gZGVhY3RpdmF0ZVF1ZXVlLmxlbmd0aDtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGVhY3RpdmF0ZVF1ZXVlTGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IGlkID0gZGVhY3RpdmF0ZVF1ZXVlW2ldO1xuICAgICAgY29uc3QgYWN0aXZlSWRJbmRleCA9IHJ1bm5pbmdJZHMuaW5kZXhPZihpZCk7XG4gICAgICBjb25zdCB0YXNrID0gYWN0aXZlVGFza3NbaWRdO1xuXG4gICAgICAvLyBJZiB0aGlzIGlzIGEgcnVubmluZyB0YXNrLCBkZWFjdGl2YXRlXG4gICAgICBpZiAoYWN0aXZlSWRJbmRleCA+IC0xKSB7XG4gICAgICAgIHJ1bm5pbmdJZHMuc3BsaWNlKGFjdGl2ZUlkSW5kZXgsIDEpO1xuICAgICAgICB1cGRhdGVSdW5uaW5nQ291bnQoZmFsc2UsIHRhc2suaXNMYXp5KTtcbiAgICAgICAgZGVsZXRlIGFjdGl2ZVRhc2tzW2lkXTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvKlxuICAgICAgRW1wdHkgZGVhY3RpdmF0ZSBxdWV1ZS4gV2UgdXNlIGBBcnJheS5zcGxpY2VgIGJlY2F1c2UgaXQgZG9lc24ndFxuICAgICAgd29ya3Mgb24gdGhlIG9yaWdpbmFsIGFycmF5IHNvIHdlIGRvbid0IGhhdmUgdG8gZ2FyYmFnZSBjb2xsZWN0IGFueXRoaW5nXG4gICAgKi9cbiAgICBkZWFjdGl2YXRlUXVldWUuc3BsaWNlKDAsIGRlYWN0aXZhdGVRdWV1ZUxlbmd0aCk7XG5cbiAgICAvKlxuICAgICAgdGFzayBhY3RpdmF0ZSBxdWV1ZVxuICAgICovXG4gICAgY29uc3QgYWN0aXZhdGVRdWV1ZUxlbmd0aCA9IGFjdGl2YXRlUXVldWUubGVuZ3RoO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhY3RpdmF0ZVF1ZXVlTGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IGlkID0gYWN0aXZhdGVRdWV1ZVtpXTtcbiAgICAgIGNvbnN0IGFjdGl2ZUlkSW5kZXggPSBydW5uaW5nSWRzLmluZGV4T2YoaWQpO1xuICAgICAgY29uc3QgdGFzayA9IGFjdGl2ZVRhc2tzW2lkXTtcblxuICAgICAgaWYgKHRhc2sgJiYgdGFzay5vbkFjdGl2YXRlTG9vcCkge1xuICAgICAgICB0YXNrLm9uQWN0aXZhdGVMb29wKCk7XG4gICAgICB9XG5cbiAgICAgIC8vIElmIHRhc2sgaXNuJ3QgYWxyZWFkeSBydW5uaW5nLCBhY3RpdmF0ZVxuICAgICAgaWYgKGFjdGl2ZUlkSW5kZXggPT09IC0xICYmIHRhc2spIHtcbiAgICAgICAgaWYgKHRhc2suaXNQcmlvcml0eSkge1xuICAgICAgICAgIHJ1bm5pbmdJZHMudW5zaGlmdChpZCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcnVubmluZ0lkcy5wdXNoKGlkKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHVwZGF0ZVJ1bm5pbmdDb3VudCh0cnVlLCB0YXNrLmlzTGF6eSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgYWN0aXZhdGVRdWV1ZS5zcGxpY2UoMCwgYWN0aXZhdGVRdWV1ZUxlbmd0aCk7XG5cbiAgICByZXR1cm4gcnVubmluZ0lkcztcbiAgfVxufTtcbiJdfQ==