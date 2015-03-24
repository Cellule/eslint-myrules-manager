## Your dependency
You must install your plugin for your rule to interact with this module.
The module must be named `eslint-myrules` and must export

```js
{
  targetsPath: {
    // change path to actual location
    global: path.resolve(__dirname, "../rules/global.eslintrc"),
    // List all other targets and their respective rules file
    ...otherTarget: pathToYourRuleFile
  },
  modifiers: {
    // List all targets with modifiers
    targetName: {
      // list all possible modifiers
      modifierName: function(modifierConfig, rules, target) => updatedRules
    }
  },
  // Options to pass to ESLint
  eslintOptions: "--ext .js --ext .jsx" //default value,
  // Default configuration of your rules to be merged with given config
  defaultConfig: {}
}
```

#### Example

```js
{
  targetsPath: {
    global: path.resolve(__dirname, "../rules/global.eslintrc"),
    frontend: path.resolve(__dirname, "../rules/frontend.eslintrc"),
    backend: path.resolve(__dirname, "../rules/backend.eslintrc")
  },
  modifiers: {
    frontend: {
      react: require("./modifiers/react")
    }
  },
  eslintOptions: "--ext .js --no-color",
  defaultConfig: {
    targets: {
      global: ["lib"]
    },
    modifiers: {
      react: true // can be anything, will be passed directly to your function
    }
  }
}
```

