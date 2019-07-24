"use strict";

exports.__esModule = true;
/*
  Override `getter` and `setter` to reimplement the interface for new element types.

  Set `.stateMap` as an object key/value map to translate incoming keys to
  API-specific keys. For instance, { x: 'translateX' }. 

  Set `.valueTypeMap` as an object key/value map to return a value type with
  `getValueType(key)` (key will be mapped according to `stateMap`)
*/

var mapKey = function (key, map) {
  return map ? map[key] || key : key;
};

exports.default = function (options) {
  /*
    Adapter is setter function
     @param [object]: Object to set properties on
    @param [object]: Key/value properties to set
  */
  var adapter = function (element, props, data) {
    if (options.stateMap) {
      // Translate props
      for (var key in props) {
        if (props.hasOwnProperty(key)) {
          var mappedKey = mapKey(key, options.stateMap);

          if (mappedKey !== key) {
            props[mappedKey] = props[key];
            delete props[key];
          }
        }
      }
    }

    return options.setter(element, props, data);
  };

  adapter.get = function (element, key) {
    return options.getter(element, mapKey(key, options.stateMap));
  };
  adapter.checkValueType = function (key) {
    return options.valueTypeMap ? options.valueTypeMap[mapKey(key, options.stateMap)] : false;
  };
  adapter.getElementData = options.getElementData;

  return adapter;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hZGFwdGVyL2FkYXB0ZXIuanMiXSwibmFtZXMiOlsibWFwS2V5Iiwia2V5IiwibWFwIiwib3B0aW9ucyIsImFkYXB0ZXIiLCJlbGVtZW50IiwicHJvcHMiLCJkYXRhIiwic3RhdGVNYXAiLCJoYXNPd25Qcm9wZXJ0eSIsIm1hcHBlZEtleSIsInNldHRlciIsImdldCIsImdldHRlciIsImNoZWNrVmFsdWVUeXBlIiwidmFsdWVUeXBlTWFwIiwiZ2V0RWxlbWVudERhdGEiXSwibWFwcGluZ3MiOiI7OztBQUFBOzs7Ozs7Ozs7O0FBVUEsSUFBTUEsU0FBUyxVQUFDQyxHQUFELEVBQU1DLEdBQU47QUFBQSxTQUFjQSxNQUFNQSxJQUFJRCxHQUFKLEtBQVlBLEdBQWxCLEdBQXdCQSxHQUF0QztBQUFBLENBQWY7O2tCQUVlLFVBQUNFLE9BQUQsRUFBYTtBQUMxQjs7Ozs7QUFNQSxNQUFNQyxVQUFVLFVBQUNDLE9BQUQsRUFBVUMsS0FBVixFQUFpQkMsSUFBakIsRUFBMEI7QUFDeEMsUUFBSUosUUFBUUssUUFBWixFQUFzQjtBQUNwQjtBQUNBLFdBQUssSUFBSVAsR0FBVCxJQUFnQkssS0FBaEIsRUFBdUI7QUFDckIsWUFBSUEsTUFBTUcsY0FBTixDQUFxQlIsR0FBckIsQ0FBSixFQUErQjtBQUM3QixjQUFNUyxZQUFZVixPQUFPQyxHQUFQLEVBQVlFLFFBQVFLLFFBQXBCLENBQWxCOztBQUVBLGNBQUlFLGNBQWNULEdBQWxCLEVBQXVCO0FBQ3JCSyxrQkFBTUksU0FBTixJQUFtQkosTUFBTUwsR0FBTixDQUFuQjtBQUNBLG1CQUFPSyxNQUFNTCxHQUFOLENBQVA7QUFDRDtBQUNGO0FBQ0Y7QUFDRjs7QUFFRCxXQUFPRSxRQUFRUSxNQUFSLENBQWVOLE9BQWYsRUFBd0JDLEtBQXhCLEVBQStCQyxJQUEvQixDQUFQO0FBQ0QsR0FoQkQ7O0FBa0JBSCxVQUFRUSxHQUFSLEdBQWMsVUFBQ1AsT0FBRCxFQUFVSixHQUFWO0FBQUEsV0FBa0JFLFFBQVFVLE1BQVIsQ0FBZVIsT0FBZixFQUF3QkwsT0FBT0MsR0FBUCxFQUFZRSxRQUFRSyxRQUFwQixDQUF4QixDQUFsQjtBQUFBLEdBQWQ7QUFDQUosVUFBUVUsY0FBUixHQUF5QixVQUFDYixHQUFEO0FBQUEsV0FBU0UsUUFBUVksWUFBUixHQUF1QlosUUFBUVksWUFBUixDQUFxQmYsT0FBT0MsR0FBUCxFQUFZRSxRQUFRSyxRQUFwQixDQUFyQixDQUF2QixHQUE2RSxLQUF0RjtBQUFBLEdBQXpCO0FBQ0FKLFVBQVFZLGNBQVIsR0FBeUJiLFFBQVFhLGNBQWpDOztBQUVBLFNBQU9aLE9BQVA7QUFDRCxDIiwiZmlsZSI6ImFkYXB0ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICBPdmVycmlkZSBgZ2V0dGVyYCBhbmQgYHNldHRlcmAgdG8gcmVpbXBsZW1lbnQgdGhlIGludGVyZmFjZSBmb3IgbmV3IGVsZW1lbnQgdHlwZXMuXG5cbiAgU2V0IGAuc3RhdGVNYXBgIGFzIGFuIG9iamVjdCBrZXkvdmFsdWUgbWFwIHRvIHRyYW5zbGF0ZSBpbmNvbWluZyBrZXlzIHRvXG4gIEFQSS1zcGVjaWZpYyBrZXlzLiBGb3IgaW5zdGFuY2UsIHsgeDogJ3RyYW5zbGF0ZVgnIH0uIFxuXG4gIFNldCBgLnZhbHVlVHlwZU1hcGAgYXMgYW4gb2JqZWN0IGtleS92YWx1ZSBtYXAgdG8gcmV0dXJuIGEgdmFsdWUgdHlwZSB3aXRoXG4gIGBnZXRWYWx1ZVR5cGUoa2V5KWAgKGtleSB3aWxsIGJlIG1hcHBlZCBhY2NvcmRpbmcgdG8gYHN0YXRlTWFwYClcbiovXG5cbmNvbnN0IG1hcEtleSA9IChrZXksIG1hcCkgPT4gbWFwID8gbWFwW2tleV0gfHwga2V5IDoga2V5O1xuXG5leHBvcnQgZGVmYXVsdCAob3B0aW9ucykgPT4ge1xuICAvKlxuICAgIEFkYXB0ZXIgaXMgc2V0dGVyIGZ1bmN0aW9uXG5cbiAgICBAcGFyYW0gW29iamVjdF06IE9iamVjdCB0byBzZXQgcHJvcGVydGllcyBvblxuICAgIEBwYXJhbSBbb2JqZWN0XTogS2V5L3ZhbHVlIHByb3BlcnRpZXMgdG8gc2V0XG4gICovXG4gIGNvbnN0IGFkYXB0ZXIgPSAoZWxlbWVudCwgcHJvcHMsIGRhdGEpID0+IHtcbiAgICBpZiAob3B0aW9ucy5zdGF0ZU1hcCkge1xuICAgICAgLy8gVHJhbnNsYXRlIHByb3BzXG4gICAgICBmb3IgKGxldCBrZXkgaW4gcHJvcHMpIHtcbiAgICAgICAgaWYgKHByb3BzLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICBjb25zdCBtYXBwZWRLZXkgPSBtYXBLZXkoa2V5LCBvcHRpb25zLnN0YXRlTWFwKTtcbiAgICAgICAgICBcbiAgICAgICAgICBpZiAobWFwcGVkS2V5ICE9PSBrZXkpIHtcbiAgICAgICAgICAgIHByb3BzW21hcHBlZEtleV0gPSBwcm9wc1trZXldO1xuICAgICAgICAgICAgZGVsZXRlIHByb3BzW2tleV07XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG9wdGlvbnMuc2V0dGVyKGVsZW1lbnQsIHByb3BzLCBkYXRhKTtcbiAgfTtcblxuICBhZGFwdGVyLmdldCA9IChlbGVtZW50LCBrZXkpID0+IG9wdGlvbnMuZ2V0dGVyKGVsZW1lbnQsIG1hcEtleShrZXksIG9wdGlvbnMuc3RhdGVNYXApKTtcbiAgYWRhcHRlci5jaGVja1ZhbHVlVHlwZSA9IChrZXkpID0+IG9wdGlvbnMudmFsdWVUeXBlTWFwID8gb3B0aW9ucy52YWx1ZVR5cGVNYXBbbWFwS2V5KGtleSwgb3B0aW9ucy5zdGF0ZU1hcCldIDogZmFsc2U7XG4gIGFkYXB0ZXIuZ2V0RWxlbWVudERhdGEgPSBvcHRpb25zLmdldEVsZW1lbnREYXRhO1xuXG4gIHJldHVybiBhZGFwdGVyO1xufTsiXX0=