'use strict';

exports.__esModule = true;

var _adapter = require('./adapter');

var _adapter2 = _interopRequireDefault(_adapter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _adapter2.default)({
  getter: function (object, key) {
    return object[key];
  },
  setter: function (object, props) {
    for (var key in props) {
      if (props.hasOwnProperty(key)) {
        object[key] = props[key];
      }
    }
  }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hZGFwdGVyL29iamVjdC1hZGFwdGVyLmpzIl0sIm5hbWVzIjpbImdldHRlciIsIm9iamVjdCIsImtleSIsInNldHRlciIsInByb3BzIiwiaGFzT3duUHJvcGVydHkiXSwibWFwcGluZ3MiOiI7Ozs7QUFBQTs7Ozs7O2tCQUVlLHVCQUFjO0FBQzNCQSxVQUFRLFVBQUNDLE1BQUQsRUFBU0MsR0FBVDtBQUFBLFdBQWlCRCxPQUFPQyxHQUFQLENBQWpCO0FBQUEsR0FEbUI7QUFFM0JDLFVBQVEsVUFBQ0YsTUFBRCxFQUFTRyxLQUFULEVBQW1CO0FBQ3pCLFNBQUssSUFBSUYsR0FBVCxJQUFnQkUsS0FBaEIsRUFBdUI7QUFDckIsVUFBSUEsTUFBTUMsY0FBTixDQUFxQkgsR0FBckIsQ0FBSixFQUErQjtBQUM3QkQsZUFBT0MsR0FBUCxJQUFjRSxNQUFNRixHQUFOLENBQWQ7QUFDRDtBQUNGO0FBQ0Y7QUFSMEIsQ0FBZCxDIiwiZmlsZSI6Im9iamVjdC1hZGFwdGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNyZWF0ZUFkYXB0ZXIgZnJvbSAnLi9hZGFwdGVyJztcblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlQWRhcHRlcih7XG4gIGdldHRlcjogKG9iamVjdCwga2V5KSA9PiBvYmplY3Rba2V5XSxcbiAgc2V0dGVyOiAob2JqZWN0LCBwcm9wcykgPT4ge1xuICAgIGZvciAobGV0IGtleSBpbiBwcm9wcykge1xuICAgICAgaWYgKHByb3BzLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgb2JqZWN0W2tleV0gPSBwcm9wc1trZXldO1xuICAgICAgfVxuICAgIH1cbiAgfVxufSk7Il19