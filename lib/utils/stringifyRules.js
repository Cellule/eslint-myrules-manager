var beautify = require("js-beautify");

module.exports = function(rules) {
  return beautify(JSON.stringify(rules), {
    "indent_size": 2
  });
};
