  // Dependent on util of ESLint, watchout for new versions
var eslintMerge = require("eslint/lib/config/config-ops").merge;

module.exports = function(base, custom) {
  return eslintMerge(base, custom);
};
