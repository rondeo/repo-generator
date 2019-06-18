[![Build Status](https://travis-ci.org/matthewp/stream-when.svg?branch=master)](https://travis-ci.org/matthewp/stream-when)

# stream-when

Create a Promise that will resolve when a [Stream](https://nodejs.org/api/stream.html)'s `data` event passes a condition.

## Install

```
npm install stream-when --save
```

## Use

### Function

Pass a callback function that will checked on each data event.

```js
var child = spawn("echo", ["hello"]);
child.stdout.setEncoding("utf8");
var promise = streamWhen(child.stdout, function(data){
  return data.trim() === "hello";
});

promise.then(function(){
  // All done
});
```

### RegExp

Pass a Regular Expression that will be used to test.

```js
var child = spawn("echo", ["hello"]);
child.stdout.setEncoding("utf8");
var promise = streamWhen(child.stdout, /hello/);

promise.then(function(){
  // All done!
});
```
### String

Pass a string value which will be converted into a RegExp.

```js
var child = spawn("echo", ["hello"]);
child.stdout.setEncoding("utf8");
var promise = streamWhen(child.stdout, "hello");

promise.then(function(){
  // All done@
});
```

## License

BSD 2 Clause
