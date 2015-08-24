# Changelog

## v0.4.0
- Breaking: Modifiers configuration and definition structure were swapped. This allows to use already defined modifiers to custom targets at the project level.

## v0.3.0
- Breaking: Configuration `options` is no longer supported. Instead use `cliOptions` which is an Object matching eslint cli option object, plus formatter.
- Update: Update eslint to 1.0 and changed usage to the cli engine

## v0.2.2
- Fix: Modifiers were not applied at all.

## v0.2.1
- Fix: Fix bug in npm publish.

## v0.2.0
- Breaking: eslint-myrules is no longer a plugin. Instead, you have to make your own binary and call eslint-myrules-manager execute function by passing your rules. See https://github.com/Cellule/eslint-myrules for an example.
- Breaking: eslint is now a peerDependency. You need to install it in your project for it to be available for the manager.

## v0.1.5
- New: Added a config `mergeGlobal` to allow merging of other targets' rules into the global rules.

## v0.1.4
- Update: Updated ESLint version to 0.19.
- Fix: Fix issue when trying to lint a file directly instead of a folder in a target other than global.
