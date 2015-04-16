var eslint = require("eslint");
var copyRules = require("./copyRules");
var config = require("./config");
var myrules = require("eslint-myrules");
var utils = require("./utils");
var debug = utils.debug;

var exports = module.exports = {};

exports.run = function(lintConfigs, globalTargets) {
  copyRules(process.cwd(), lintConfigs, function(err) {
    if(err) {
      return console.error(err);
    }
    debug("Starting linter");
    var args = process.argv.slice(0, 2);
    var options = myrules.eslintOptions || config.eslintOptions;
    if(lintConfigs.options) {
      debug("options:", JSON.stringify(lintConfigs.options));
      options += " " + lintConfigs.options;
    }
    args = args
      .concat(options.split(" "))
      .concat(globalTargets)
      .concat(lintConfigs.targets.global || []);

    Object.keys(lintConfigs.targets).forEach(function(target) {
      if(target !== "global") {
        args = args.concat(lintConfigs.targets[target]);
      }
    });

    eslint.cli.execute(args);
  });
};
