var myrules = require("eslint-myrules");
var modifiers = myrules.modifiers;
var utils = require("./../utils");
var debug = utils.debug;

module.exports = function(rules, config, target) {
  if(!config.modifiers || typeof config.modifiers !== "object") {
    return rules;
  }
  target = target || "global";

  var targetModifiers = modifiers[target] || {};
  if(Object.keys(targetModifiers).length === 0) {
    debug("No modifier found for target %s", target);
    return rules;
  }

  for(var modifierKey in config.modifiers) {
    if(config.modifiers.hasOwnProperty(modifierKey)) {
      if(targetModifiers[modifierKey]) {
        debug("Running modifier [%s] for target %s", modifierKey, target);
        rules = targetModifiers[modifierKey](
          config.modifiers[modifierKey],
          rules,
          target
        ) || rules; // in case nothing is returned
      } else {
        debug("Unable to find modifier [%s] for target %s", modifierKey, target);
      }
    }
  }
  return rules;
};
