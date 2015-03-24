var myrules = require("eslint-myrules");
var modifiers = myrules.modifiers;

module.exports = function(rules, config, target) {
  if(!config.modifiers || typeof config.modifiers !== "object") {
    return rules;
  }
  target = target || "global";

  var targetModifiers = modifiers[target] || {};
  if(Object.keys(targetModifiers).length === 0) {
    return rules;
  }

  for(var modifierKey in config.modifiers) {
    if(config.modifiers.hasOwnProperty(modifierKey)) {
      if(targetModifiers[modifierKey]) {
        rules = targetModifiers[modifierKey](
          config.modifiers[modifierKey],
          rules,
          target
        ) || rules; // in case nothing is returned
      }
    }
  }
  return rules;
};
