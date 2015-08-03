var eslint = require("eslint");
var copyRules = require("./copyRules");
var config = require("./config");
var myRulesApi = require("./myrules");
var utils = require("./utils");
var debug = utils.debug;

var exports = module.exports = {};

exports.run = function(lintConfigs, globalTargets) {
  var myrules = myRulesApi.getMyRules();
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

    var cli = new eslint.CLIEngine({
      extensions: myrules.extensions || config.extensions
    });
    var report = cli.executeOnFiles(targets);
    var formatter = cli.getFormatter();

    console.log(formatter(report.results));
  });
};
