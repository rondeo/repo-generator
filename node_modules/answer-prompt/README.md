[![Build Status](https://travis-ci.org/matthewp/answer-prompt.svg?branch=master)](https://travis-ci.org/matthewp/answer-prompt)
[![npm version](https://badge.fury.io/js/answer-prompt.svg)](http://badge.fury.io/js/answer-prompt)

# answer-prompt

Answer prompt questions for easier scripting and test automation.

## Install

```
npm install answer-prompt --save
```

## Usage

Create a [child process](https://nodejs.org/api/child_process.html) any way you which and pass it into answerPrompt. This will return a function that can be called to to answer questions.

```js
var spawn = require("child_process").spawn;
var answerPrompt = require("answer-prompt");

var child = spawn("some_script.js");
var answer = answerPrompt(child, "stdout"); // 'stderr' also accepted

answer(/first name/, "Matthew\n");
answer(function(str){
  return str.trim() === "last name";
}, "Phillips\n");
```

### answer(tester, response)

**tester** can be either a Function, a RegExp (probably most useful) or a String. answerPrompt will listen to stdout (default) or stderr and when a test passes write the **response** to stdin.

## License

BSD 2 Clause
