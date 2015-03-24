# Modifiers
Sometimes you want some rules for a project and not for another.
Without requiring the need for multiple version of this project.

Modifiers are specific to your rules and can be tedeious to implement. I suggest to use them mostly for add/remove rules and avoid multiple modifiers that can affect the same rule.

## Available modifiers

```js
{
  "eslint-myrules": {
    "modifiers": {
      "react": Boolean, // Enable/Disable react plugin. Default: true
    }
  }
}
```
