var streamWhen = require("stream-when");

exports = module.exports = function (child, streamName){
  var stream = child[streamName || "stdout"];
  var listeners = 0, max = 10;

  return function(tester, answer){
    listeners++;
    if(listeners + 1 > max) {
      max = listeners + 5;
      stream.setMaxListeners(max);
    }

    return streamWhen(stream, tester).then(function(){
      child.stdin.write(answer);
    });
  };
};
