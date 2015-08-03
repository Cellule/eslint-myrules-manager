var path = require("path");
var pkg = require(path.join(__dirname, "../package.json"));

module.exports = {
  pkgConfigName: "eslint-myrules",
  version: pkg.version,
  configFilename: ".myrulesrc",
  extensions: [".js", ".jsx"],
  // List all the different types of rules you have, this is useful to
  // override configs in global.eslintrc
  defaultConfig: {
    targets: {
      global: []
    },
    modifiers: {
    },
    extraRules: {
      global: {}
    }
  }
};
