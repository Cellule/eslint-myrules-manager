var json5 = require("json5");

module.exports = function(rulesStr) {
  return json5.parse(rulesStr);
};
