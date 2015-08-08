var config = require("./config");
var path = require("path");
var toArray = require("./utils/toArray");
var merge = require("lodash.merge");
var fs = require("fs");
var utils = require("./utils");
var debug = utils.debug;
var myRulesApi = require("./myrules");


function readConfig(configPath) {
  if(configPath) {
    debug("Loading config from %s", configPath);
    return require(path.resolve(configPath));
  }
  var myrulesConfigPath = path.resolve(config.configFilename);
  if(fs.existsSync(myrulesConfigPath)) {
    debug("Loading config from %s", myrulesConfigPath);
    return utils.readRules(myrulesConfigPath);
  }

  // Attempt to look in package file
  // extension omitted to allow .json and .json5
  var pkgPath = path.resolve("package");
  // This might throw if no package.json[5] file is present
  var projectConfig = {};
  try {
    debug("Loading config from %s", pkgPath);
    projectConfig = require(pkgPath);
  } catch(e) {
    console.warn("Unable to open package.json");
  }
  var lintConfigs = projectConfig[config.pkgConfigName] || {};
  return lintConfigs;
}

module.exports = function(configPath) {
  var myrules = myRulesApi.getMyRules();
  var lintConfigs = readConfig(configPath);
  debug("Config found %j", lintConfigs);

  lintConfigs.targets = lintConfigs.targets || {};
  // Convert targets to array so Strings are accepted
  Object.keys(lintConfigs.targets).forEach(function(target) {
    lintConfigs.targets[target] = toArray(lintConfigs.targets[target]);
  });

  // If an array is redefined, simply use the new one
  function customMerge(a, b) {
    if(Array.isArray(a)) {
      return b;
    }
  }
  // Merge (these config) <= (myrules config) <= (project config)
  lintConfigs = merge(
    merge(config.defaultConfig, myrules.defaultConfig, customMerge),
    lintConfigs,
    customMerge
  );
  if (lintConfigs.options) {
    console.warn(
      "{'eslint-myrules': {'options': String} } " +
      "has been deprecated.\nPlease use " +
      "{'eslint-myrules': {'cliConfig': Object} } instead.\n" +
      "Options available at " +
      "http://eslint.org/docs/developer-guide/nodejs-api.html#cliengine"
    );
  }
  debug("Effective config %j", lintConfigs);
  return lintConfigs;
};
