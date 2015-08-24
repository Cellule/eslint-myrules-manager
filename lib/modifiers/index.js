var myRulesApi = require("./../myrules");
var utils = require("./../utils");
var debug = utils.debug;

module.exports = function(rules, config, target) {
  if(!config.modifiers || typeof config.modifiers !== "object") {
    return rules;
  }

  target = target || "global";
  var targetModifiers = config.modifiers[target];

  if(!targetModifiers) {
    return rules;
  }
  if(typeof targetModifiers !== "object") {
    console.warn("Modifiers config for target %s is invalid", target);
    return rules;
  }

  var modifiers = myRulesApi.getMyRules().modifiers || {};

  for(var modifierKey in targetModifiers) {
    if(targetModifiers.hasOwnProperty(modifierKey)) {
      if(modifiers[modifierKey]) {
        debug(
          "Running modifier [%s] for target %s with options [%j]",
          modifierKey,
          target,
          targetModifiers[modifierKey]
        );
        rules = modifiers[modifierKey](
          targetModifiers[modifierKey],
          rules,
          target
        ) || rules; // in case nothing is returned
      } else {
        debug(
          "Unable to find modifier [%s] for target %s",
          modifierKey,
          target
        );
      }
    }
  }
  return rules;
};
