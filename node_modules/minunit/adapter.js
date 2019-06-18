FuncUnit.unit = {
  pauseTest:function(){
  },
  resumeTest: function(){
  },
  assertOK: function(assertion, message){
    MinUnit.ok(assertion, message)
  },
  equiv: function(expected, actual){
    return MinUnit.equal(expected, actual);
  }
};
