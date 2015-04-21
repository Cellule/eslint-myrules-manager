require("json5/lib/require");
var lint = require("./lint");
var copyRules = require("./copyRules");
var getLinterConfig = require("./getLinterConfig");
var config = require("./config");
var utils = require("./utils");
var myRulesApi = require("./myrules");

var program = require("commander");

program
  .version(config.version)
  .usage("lint your project")
  .option(
    "-c, --config <config_path[.js|.json|.json5]>",
    "Path to the config file"
  )
  .option("--debug", "show debug information");

function processGlobalOptions() {
  program.globalsParsed = true;
  utils.debug.active = program.debug;
  var linterConfig = getLinterConfig(program.config);
  return {
    linterConfig: linterConfig
  };
}

program
  .command("cp")
  .description("Copies all the ESLint rules to their destination")
  .action(function() {
    var globalOptions = processGlobalOptions();
    var linterConfig = globalOptions.linterConfig;
    copyRules(process.cwd(), linterConfig, function(err) {
      if(err) {
        return console.error(err);
      }
      console.log("Done");
    });
  });

program
  .command("lint")
  .usage("[options] [...global_folders]")
  .description("Runs the linter on your project")
  .action(function() {
    var globalOptions = processGlobalOptions();
    var linterConfig = globalOptions.linterConfig;
    lint.run(
      linterConfig,
      // pass all arguments except last which is the command
      Array.prototype.slice.call(arguments, 0, arguments.length - 1)
    );
  });

var exports = module.exports = {};

exports.execute = function(myRules, args) {
  if(!myRules) {
    console.error("Rules missing");
    return;
  }
  myRulesApi.setMyRules(myRules);

  program.parse(args);
  if(!program.globalsParsed) {
    program.help();
  }
};
