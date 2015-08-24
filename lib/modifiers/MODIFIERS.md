# Modifiers
Sometimes you want some rules for a project and not for another.
Without requiring the need for multiple version of this project.

Modifiers are specific to your rules and can be tedeious to implement. I suggest to use them mostly for add/remove rules and avoid multiple modifiers that can affect the same rule.

## Interface

Your modifiers must export a function with signature
```js
function(config, rules, target) {
  // run modifier
  return rules
}
```
See example [here](https://github.com/Cellule/eslint-myrules/blob/master/modifiers/react/index.js)

The way you export your modifiers reflect how to configurate them.
For instance your plugin can export
```js
function mod2(config, rules, target) {
  // run modifier2...
  target === "global" || target === "target1";
  return rules;
}
module.exports = {
  modifiers: {
    mod1: function(config, rules, target) {
      target === "target1";
      return rules;
    },
    mod2: mod2,
    globalMod: function(config, rules, target) {
      target === "global";
      return rules;
    },
  },
  defaultConfig: {
    modifiers: {
      target1: {
        mod1: true,
        mod2: {
          str: "string"
        }
      },
      global: {
        globalMod: "other Config".
        mod2: {
          str: "global string"
        }
      }
    }
  }
}
```
If you keep default config, `mod1` will have `true` in its config, `mod2` will have `{str: "string"}` and `globalMod` will have `"other Config"`
