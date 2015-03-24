# eslint-myrules
Manager for your ESLint rules. The goal is to have your favorite rules in one place to use everywhere.
It copies your rules in your project and can be used to lint your project as well.
The goal of copying the rules is to allow IDE integration to find your rules, like SublimeLinter for instance.

## Configuration
- Fork this project.
- edit `lib/config.js` and `rules/*.eslintrc` however you like.
- `npm install` your git repo in the projects you want your rules.

## Installation

```bash
$ npm install cellule/eslint-myrules --save-dev
```

## Config file
You can configure the tool in your package.json or package.json5
Currently supported options

```js
{
  "eslint-myrules": {
    "targets": {
      "backend": String|String[], // List of backend folders to lint
      "frontend": String|String[], // List of frontend folders to lint
      "global": String|String[], // List of global folders to lint
    },
    "modifiers": {}
  }
}
```
- `eslint-myrules`: the name of this project. If you rename the project, make sure to change this
  - `targets`: list of different targets for your rules. Can be empty if you simply want 1 set of rules. However, very useful if you want to override some rules.
    - `backend` & `frontend`: personnal rule targets with matching [target].eslintrc in folder `rules`
  - `modifiers`: see [MODIFIERS](lib/modifiers/MODIFIERS.md)

## Linting
You can run this tool on your project to lint your sources. It uses ESLint for code style and error check. See [ESLint](http://eslint.org/docs/rules/) for details about the rules.
### Usage
```bash
$ eslint-myrules -h
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
  "lint": "eslint-myrules bin index.js"
}
```
```bash
$ npm run lint
```
This will copy the rules
- `rules/backend.eslintrc` to folders `app` and `lib`
- `rules/frontend.eslintrc` to folder `js`
- `rules/global.eslintrc` to the root of your project

This will execute the linter in
- backend folders `app` and `lib`
- frontend folder `js`
- folder `bin` and file `index.js`

