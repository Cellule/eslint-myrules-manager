# eslint-myrules-manager
Manager for your ESLint rules. The goal is to have your favorite rules in one place to use everywhere.
No rules are included in this module, you must provide your own. You can see an example at [eslint-myrules](https://github.com/Cellule/eslint-myrules).
It copies your rules in your project and can be used to lint your project as well.
The goal of copying the rules is to allow IDE integration to find your rules, like SublimeLinter for instance.

## Installation

```bash
$ npm install eslint-myrules-manager --save-dev
```

## Config file
You can configure the tool in your package.json or package.json5 or in a `.myrulesrc` file.
Currently supported options

```js
{
  "eslint-myrules": {
    "targets": {
      "global": String|String[], // List of backend folders to lint
      "yourTarget": String|String[]
    },
    "modifiers": {},
    "extraRules": {
      "global": {
        // any valid .eslintrc config
      }
    },
    "cliOptions": {
      "formatter": String,
      // All options to eslint cliEngine are available
      // see http://eslint.org/docs/developer-guide/nodejs-api.html#cliengine
    }
    "mergeGlobal": String|String[]
  }
}
```
- `eslint-myrules`: the name of this project. If you rename the project, make sure to change this
  - `targets`: list of different targets for your rules. Can be empty if you simply want 1 set of rules. However, very useful if you want to override some rules.
  - `modifiers`: see [MODIFIERS](lib/modifiers/MODIFIERS.md)
  - `extraRules`: Include any project specific configuration you want to pass to eslint.
  - `mergeGlobal`: list of targets you want to merge with global rules to be placed at the root of your project. Useful when your whole project needs to be lint with a specific target.
  - `cliOptions.formatter`: Name or path to formatter see [Formatter](http://eslint.org/docs/developer-guide/nodejs-api.html#getformatter)

You can see an example at [.myrulesrc](.myrulesrc)


## Linting
You can run this tool on your project to lint your sources. It uses ESLint for code style and error check. See [ESLint](http://eslint.org/docs/rules/) for details about the rules.

### Usage
No binary is provided with this library. You have to make your own, but the api comes with a command line parser.
See [cliWrapper](https://github.com/Cellule/eslint-myrules/blob/master/cliWrapper) for an example on how to correctly execute the cli.

```bash
$ eslint-myrules lint -h
  Usage: lint [options] [...global_folders]

  lint your project

  Options:

    -h, --help                                    output usage information
    -c, --config <config_path[.js|.json|.json5]>  Path to the config file
```
The tool first copies current rules into the root of your project and in every target folders.
It then runs the linter and outputs errors.

- `--config`: uses a different config file than package.json. It can be a normal js file exporting the config object.
- `global_folders`: space separated list of folder to run the linter on. It does not copy any extra linter rules. Can be used without any config file present.

### Example

```js
// Config in package.json
"eslint-myrules: {
  "targets": {
    "backend": ["app", "lib"],
    "frontend": ["js"]
  }
},
"scripts": {
  "lint": "eslint-myrules lint bin index.js"
}
```
```bash
$ npm run lint
```
This will copy the rules
- backend rules to folders `app` and `lib`
- frontend rules to folder `js`
- global rules to the root of your project

This will execute the linter in
- backend folders `app` and `lib`
- frontend folder `js`
- folder `bin` and file `index.js`

## Api

- `execute`: (myrules, argv) => void
  - `myrules`: Configuration of your rules, see below for example
  - `argv`: cli options, should come directly from `process.argv`
- `utils`: Object
  - `mergeConfigs`: (config1, config2) => config; Merge 2 eslint configuration object together and return the result.


### Configuration object
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
  // Extensions that ESLint will look for
  extensions: [".js", ".jsx"], //default value,
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
  extensions: [".js"],
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

