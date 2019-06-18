module.exports = streamWhen;

function streamWhen(stream, callback){
  var fn = convertToFunction(callback);

  if(!fn) {
    throw new Error("Must provide either function, string, or Regular Expression");
  }

  return new Promise(function(resolve){
    stream.on("data", function ondata(data){
      if(fn(data)) {
        stream.removeListener("data", ondata);
        resolve();
      }
    });
  });
}

function convertToFunction(thing) {
  var type = typeof thing;
  if(type === "function") {
    return thing;
  }
  else if(type === "string" ||
      (type === "object" && {}.toString.call(thing) === "[object RegExp]")) {
    var exp = thing;
    if(type === "string") {
      exp = new RegExp(thing);
    }

    return function(data){
      return exp.test(data.toString());
    };
  } else {
    return undefined;
  }
}
