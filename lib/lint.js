var eslint = require("eslint");
var copyRules = require("./copyRules");
var utils = require("./utils");
var debug = utils.debug;

var exports = module.exports = {};

exports.run = function(lintConfigs, globalTargets) {
  copyRules(process.cwd(), lintConfigs, function(err) {
    if(err) {
      return console.error(err);
    }
    debug("Starting linter");

    var targets = globalTargets.concat(lintConfigs.targets.global || []);
    Object.keys(lintConfigs.targets).forEach(function(target) {
      if(target !== "global") {
        targets = targets.concat(lintConfigs.targets[target]);
      }
    });

    var cli = new eslint.CLIEngine(lintConfigs.cliConfig);
    var report = cli.executeOnFiles(targets);
    var formatter = cli.getFormatter(lintConfigs.cliConfig.formatter);

    console.log(formatter(report.results));
  });
};
