#!/usr/bin/env node
var child_process = require("child_process");
var path = require("path");

process.env.NODE_PATH = path.resolve(__dirname, "../../eslint-myrules/node_modules");
// Hack because there is no way to change NODE_PATH at runtime
// changing it does nothing since it is used only when node bootstraps
child_process.fork(
  path.resolve(__dirname, "eslint.js"),
  process.argv.slice(2, process.argv.length),
  {
    cwd: process.cwd(),
    env: process.env
  }
);
