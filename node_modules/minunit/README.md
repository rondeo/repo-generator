# minunit

A minimal testing library like QUnit but has no UI, doesn't report test results, only runs tests.

## Install

```js
npm install minunit --save
```

## Usage

Use it like QUnit, to get results call `MinUnit.done`.

```js
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
  // All done! Do what you want with results
});

MinUnit.load();
```

## License

BSD 2 Clause
