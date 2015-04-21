
module.exports = {
  utils: require("./lib/utils"),
  execute: require("./lib/cli").execute,
  setMyRules: require("./lib/myrules").setMyRules,
  getMyRules: require("./lib/myrules").getMyRules,
};
