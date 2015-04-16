var isArray = require("lodash.isarray");

module.exports = function(value) {
  if(value !== undefined) {
    if(!isArray(value)) {
      return [value];
    }
    return value;
  }
  return [];
};
