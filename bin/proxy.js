#!/usr/bin/env node
var childProcess = require("child_process");
var path = require("path");

var nodePath = path.join(__dirname, "../../eslint-myrules/node_modules");
if(process.env.NODE_PATH) {
  var isWindows = process.platform === "win32";
  var splitter = isWindows ? ";" : ":";
  process.env.NODE_PATH = process.env.NODE_PATH + splitter + nodePath;
} else {
  process.env.NODE_PATH = nodePath;
}

// Hack because there is no way to change NODE_PATH at runtime
// changing it does nothing since it is used only when node bootstraps
childProcess.fork(
  path.join(__dirname, "eslint.js"),
  process.argv.slice(2, process.argv.length),
  {
    cwd: process.cwd(),
    env: process.env
  }
);
