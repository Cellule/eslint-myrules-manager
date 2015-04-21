var myRulesConfig = {
  setMyRules: function(myRules) {
    myRulesConfig.myRules = myRules;
  },
  getMyRules: function() {
    return myRulesConfig.myRules;
  },
  myRules: {}
};

module.exports = myRulesConfig;
