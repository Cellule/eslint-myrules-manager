  // Dependent on util of ESLint, watchout for new versions
var eslintMerge = require("eslint/lib/util").mergeConfigs;


module.exports = function(base, custom) {
  return eslintMerge(base, custom);
};
