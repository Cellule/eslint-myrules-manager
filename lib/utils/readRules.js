var parseRules = require("./parseRules");
var fs = require("fs");

module.exports = function(rulePath) {
  return parseRules(fs.readFileSync(rulePath, {encoding: "utf8"}));
};
