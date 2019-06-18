var MinUnit = require("minunit");
var QUnit = require("steal-qunit");

QUnit.module("minunit basics", {
  setup: function(test){
    var mod = this;
    var done = test.async();

    MinUnit.reset();

    MinUnit.module("some module");

    MinUnit.test("some test", function(done){
      MinUnit.ok(true, "it worked");
      setTimeout(done);
    });

    MinUnit.test("some other test", function(done){
      MinUnit.ok(2 === 2, "they are equal");
      MinUnit.ok(false, "not ok");
      done();
    });

    MinUnit.module("another module");

    MinUnit.test("another test", function(done){
      MinUnit.ok(true, "yep");
      MinUnit.equal("one", "one", "they two strings match");
      setTimeout(done);
    });

    MinUnit.done(function(results){
      mod.results = results;
      done();
    });

    MinUnit.load();
  }
});

QUnit.test("has a result for each module", function(){
  var results = this.results;
  QUnit.equal(results.length, 2, "2 modules and 2 results");
});

QUnit.test("the first result matches the first module", function(){
  var results = this.results;
  var first = results[0];
  QUnit.equal(first.module, "some module", "module name is correct");
  QUnit.equal(first.results.length, 2, "There are 2 results for the first module");
});
