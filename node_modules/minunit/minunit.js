MinUnit = {
  reset: function(){
    MinUnit.modules = [];
    MinUnit.dones = [];
    MinUnit.moduleIndex = -1;
    MinUnit.testIntex = -1;
  },

	module: function(name){
		var mod = this.cur = {
			name: name,
			tests: [],
			results: []
		};
		this.modules.push(mod);
	},

	test: function(name, fn){
		var cur = this.getModule();
		if(cur) {
			cur.tests.push({
				name: name,
				fn: fn.bind(null, MinUnit.next.bind(MinUnit)),
				results: []
			});
		}
	},

	next: function(){
		var test = this.getTest();
		if(test) {
			var mod = this.getModule();
			mod.results.push({ name: test.name, results: test.results });
			test.results = [];
			this.curTest = null;
		}

		test = this.getTest();
		if(test) {
			test.fn();
		} else {
			MinUnit.finish();
		}
	},

	getModule: function(){
		var cur = this.cur;
		if(!cur) {
			this.moduleIndex++;
			this.testIndex = -1;
			cur = this.cur = this.modules[this.moduleIndex];
		}
		return cur;
	},

	getTest: function(){
		var test = this.curTest;
		if(test) return test;

		var getTest = function(){
			var cur = this.getModule();
			if(cur) {
				this.testIndex++;
				this.curTest = cur.tests[this.testIndex];
				return this.curTest;
			}
		};
		test = getTest.call(this);
		if(!test) {
			this.cur = null;
			test = getTest.call(this);
		}
		return test;
	},

	ok: function(assertion, message){
		var test = this.curTest;
		if(test) {
			test.results.push({ message: message, assertion: assertion });
		}
    return assertion;
	},

	equal: function(expected, actual, message){
		return MinUnit.ok(expected === actual, message);
	},

	done: function(fn){
		this.dones.push(fn);
	},

	finish: function(){
		var dones = this.dones;

		var results = this.modules.map(function(mod){
			var r = mod.results;
			mod.results = [];
			return { module: mod.name, results: r };
		});
		this.dones = [];
		dones.forEach(function(fn){
			fn(results);
		});
	},

	load: function(){
		this.cur = null;
		var test = this.getTest();
		test.fn();
	}
};

MinUnit.reset();
