'use strict';


exports.flattenTree = flattenTree;
exports.flattenLeafAncestors = flattenLeafAncestors;
exports.groupLeafs = groupLeafs;
exports.flattenArray = flattenArray;


function flattenLeafAncestors(tree) {
  var flattened = flattenTree(tree);
  var grouped = groupLeafs(flattened);
  return grouped;
}


function flattenTree(unflattened, flattened, prefix) {
  flattened = flattened || {};
  Object.keys(unflattened).forEach(function(key) {
    var path = prefix ? prefix + '.' + key : key,
        val = unflattened[key];
    if (isObject(val)) {
      flattenTree(val, flattened, path);
    }
    else {
      flattened[path] = val;
    }
  });
  return flattened;
}


function groupLeafs(flattened) {
  var grouped = {};
  Object.keys(flattened).forEach(function(key) {
    var parts = key.split('.'),
        leaf = parts.pop(),
        group = parts.join('.');
    grouped[group] = grouped[group] || {};
    grouped[group][leaf] = flattened[key];
  });
  return grouped;
}


function flattenArray(arr) {
  var flattened = [], i, len, val;
  if (Array.isArray(arr)) {
    for (i = 0, len = arr.length; i < len; i++) {
      val = arr[i];
      if (Array.isArray(val)) {
        flattened.push.apply(flattened, flattenArray(val));
      }
      else {
        flattened.push(val);
      }
    }
  }
  return flattened;
}


function isObject(o) {
  return o !== null && typeof o === 'object' && !Array.isArray(o);
}
