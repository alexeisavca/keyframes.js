module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.stream = stream;

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	var _easings = __webpack_require__(1);

	var easings = _interopRequireWildcard(_easings);

	var FRAMES = 60;
	exports.FRAMES = FRAMES;

	//given an initial start and end state...
	var tween = function tween(from, to) {
	    return (
	        //...return a function, that for any float 0<t<1...
	        function (t) {
	            return Object.keys(from).reduce(
	            //...for all the properties(width, height, opacity) of the initial state...
	            function (state, property) {
	                //...will compute the intermediary state at t
	                state[property] = from[property] + (to[property] - from[property]) * t;
	                return state;
	            }, {});
	        }
	    );
	};

	exports.tween = tween;
	var transition = function transition(property, from, to) {
	    return tween(_defineProperty({}, property, from), _defineProperty({}, property, to));
	};

	exports.transition = transition;
	var ensure = function ensure(state) {
	    return function () {
	        return state;
	    };
	};

	exports.ensure = ensure;
	var reverse = function reverse(tween) {
	    return function (t) {
	        return tween(1 - t);
	    };
	};

	exports.reverse = reverse;
	var toAndFrom = function toAndFrom(tween) {
	    return chain({
	        0: tween,
	        .5: reverse(tween)
	    });
	};

	exports.toAndFrom = toAndFrom;
	var repeat = function repeat(times, tween) {
	    var tweens = {};
	    for (var counter = 1; counter <= times; counter++) {
	        tweens[1 - counter / times] = tween;
	    }
	    return chain(tweens);
	};

	exports.repeat = repeat;
	var chain = function chain(tweens) {
	    return function (t) {
	        //get the keys(starting time) of all the tweens, ensure they're floats, then find all that precede t or start at t
	        //the tween with the max starting time of those will be current tween
	        var currentTweenIndex = Math.max.apply(null, Object.keys(tweens).map(parseFloat).filter(function (time) {
	            return time <= t;
	        }));
	        var currentTween = tweens[currentTweenIndex];
	        var tweenDuration =
	        /*
	         get the keys(starting time) of all the tweens, ensure they're all floats, then find all that succeed t
	         (but not those that start at t, because without that condition we might get the current tween itself)
	         Add 1(end of the chain) in case current tween is the last one. The lowest number of those will be the t
	         when current tween ends, we subtract the current tween's starting t to get its duration.
	        */
	        Math.min.apply(null, Object.keys(tweens).map(parseFloat).filter(function (time) {
	            return time > t;
	        }).concat(1.0)) - currentTweenIndex;

	        var relativeT = (t - currentTweenIndex) / tweenDuration;
	        return currentTween(relativeT);
	    };
	};

	exports.chain = chain;
	var prerender = function prerender(time, tween) {
	    var totalFrames = time / 1000 * FRAMES;
	    var frames = [];
	    for (var frame = 0; frame <= totalFrames; frame++) {
	        frames[frame] = tween(frame / totalFrames);
	    }
	    return function (t) {
	        return frames[Math.round(totalFrames * t)];
	    };
	};

	exports.prerender = prerender;

	function stream(duration, tween, cb) {
	    cb(tween(0));
	    var start = new Date();
	    var doFrame = function doFrame() {
	        var now = new Date();
	        var elapsed = now - start;
	        var t = elapsed / duration;
	        cb(tween(t <= 1 ? t : 1));
	        if (elapsed < duration) {
	            requestAnimationFrame(doFrame);
	        }
	    };
	    requestAnimationFrame(doFrame);
	}

	var intoDom = function intoDom(DOMElement) {
	    return function (state) {
	        return Object.keys(state).forEach(function (property) {
	            return DOMElement.style[property] = state[property];
	        });
	    };
	};

	exports.intoDom = intoDom;
	exports.easings = easings;

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var ease = function ease(func, tween) {
	    return function (t) {
	        var initialState = tween(0);
	        var currentState = tween(t);
	        var easedState = {};
	        Object.keys(initialState).forEach(function (property) {
	            easedState[property] = func(t, 1, t, initialState[property], currentState[property] - initialState[property]);
	        });
	        return easedState;
	    };
	};

	exports.ease = ease;
	//BEGIN Robert Penner's easing formulas, stolen from: http://gizma.com/easing/
	//CSS cubic bezier easings stolen from http://easings.net/

	// simple linear tweening - no easing, no acceleration
	var linear = function linear(tween) {
	    return tween;
	};

	exports.linear = linear;
	// quadratic easing in - accelerating from zero velocity
	var easeInQuad = ease.bind(null, function (currentTime, totalTime, progressRatio, value, change) {
	    return change * Math.pow(progressRatio, 2) + value;
	});

	exports.easeInQuad = easeInQuad;
	// quadratic easing out - decelerating to zero velocity
	var easeOutQuad = ease.bind(null, function (currentTime, totalTime, progressRatio, value, change) {
	    return -change * progressRatio * (progressRatio - 2) + value;
	});

	exports.easeOutQuad = easeOutQuad;
	// quadratic easing in/out - acceleration until halfway, then deceleration
	var easeInOutQuad = ease.bind(null, function (currentTime, totalTime, progressRatio, value, change) {
	    var t = currentTime / (totalTime / 2);
	    if (t < 1) return change / 2 * t * t + value;
	    t--;
	    return -change / 2 * (t * (t - 2) - 1) + value;
	});

	exports.easeInOutQuad = easeInOutQuad;
	// cubic easing in - accelerating from zero velocity
	var easeInCubic = ease.bind(null, function (currentTime, totalTime, progressRatio, value, change) {
	    return change * Math.pow(progressRatio, 3) + value;
	});

	exports.easeInCubic = easeInCubic;
	// cubic easing out - decelerating to zero velocity
	var easeOutCubic = ease.bind(null, function (currentTime, totalTime, progressRatio, value, change) {
	    return change * (Math.pow(progressRatio - 1, 3) + 1) + value;
	});

	exports.easeOutCubic = easeOutCubic;
	// cubic easing in/out - acceleration until halfway, then deceleration
	var easeInOutCubic = ease.bind(null, function (currentTime, totalTime, progressRatio, value, change) {
	    var t = currentTime / (totalTime / 2);
	    if (t < 1) return change / 2 * Math.pow(t, 3) + value;
	    t -= 2;
	    return change / 2 * (Math.pow(t, 3) + 2) + value;
	});

	exports.easeInOutCubic = easeInOutCubic;
	// quartic easing in - accelerating from zero velocity
	var easeInQuart = ease.bind(null, function (currentTime, totalTime, progressRatio, value, change) {
	    return change * Math.pow(progressRatio, 4) + value;
	});

	exports.easeInQuart = easeInQuart;
	// quartic easing out - decelerating to zero velocity
	var easeOutQuart = ease.bind(null, function (currentTime, totalTime, progressRatio, value, change) {
	    return -change * (Math.pow(progressRatio - 1, 4) - 1) + value;
	});

	exports.easeOutQuart = easeOutQuart;
	// quartic easing in/out - acceleration until halfway, then deceleration
	var easeInOutQuart = ease.bind(null, function (currentTime, totalTime, progressRatio, value, change) {
	    var t = currentTime / (totalTime / 2);
	    if (t < 1) return change / 2 * Math.pow(t, 4) + value;
	    t -= 2;
	    return -change / 2 * (Math.pow(t, 4) - 2) + value;
	});

	exports.easeInOutQuart = easeInOutQuart;
	// quintic easing in - accelerating from zero velocity
	var easeInQuint = ease.bind(null, function (currentTime, totalTime, progressRatio, value, change) {
	    return change * Math.pow(progressRatio, 5) + value;
	});

	exports.easeInQuint = easeInQuint;
	// quintic easing out - decelerating to zero velocity
	var easeOutQuint = ease.bind(null, function (currentTime, totalTime, progressRatio, value, change) {
	    return change * (Math.pow(progressRatio - 1, 5) + 1) + value;
	});

	exports.easeOutQuint = easeOutQuint;
	// quintic easing in/out - acceleration until halfway, then deceleration
	var easeInOutQuint = ease.bind(null, function (currentTime, totalTime, progressRatio, value, change) {
	    var t = currentTime / (totalTime / 2);
	    if (t < 1) return change / 2 * Math.pow(t, 5) + value;
	    t -= 2;
	    return change / 2 * (Math.pow(t, 5) + 2) + value;
	});

	exports.easeInOutQuint = easeInOutQuint;
	// sinusoidal easing in - accelerating from zero velocity
	var easeInSine = ease.bind(null, function (currentTime, totalTime, progressRatio, value, change) {
	    return -change * Math.cos(progressRatio * (Math.PI / 2)) + change + value;
	});

	exports.easeInSine = easeInSine;
	// sinusoidal easing out - decelerating to zero velocity
	var easeOutSine = ease.bind(null, function (currentTime, totalTime, progressRatio, value, change) {
	    return change * Math.sin(progressRatio * (Math.PI / 2)) + value;
	});

	exports.easeOutSine = easeOutSine;
	// sinusoidal easing in/out - accelerating until halfway, then decelerating
	var easeInOutSine = ease.bind(null, function (currentTime, totalTime, progressRatio, value, change) {
	    return -change / 2 * (Math.cos(Math.PI * progressRatio) - 1) + value;
	});

	exports.easeInOutSine = easeInOutSine;
	// exponential easing in - accelerating from zero velocity
	var easeInExpo = ease.bind(null, function (currentTime, totalTime, progressRatio, value, change) {
	    return change * Math.pow(2, 10 * (progressRatio - 1)) + value;
	});

	exports.easeInExpo = easeInExpo;
	// exponential easing out - decelerating to zero velocity
	var easeOutExpo = ease.bind(null, function (currentTime, totalTime, progressRatio, value, change) {
	    return change * (-Math.pow(2, -10 * progressRatio) + 1) + value;
	});

	exports.easeOutExpo = easeOutExpo;
	// exponential easing in/out - accelerating until halfway, then decelerating
	var easeInOutExpo = ease.bind(null, function (currentTime, totalTime, progressRatio, value, change) {
	    var t = currentTime / (totalTime / 2);
	    if (t < 1) return change / 2 * Math.pow(2, 10 * (t - 1)) + value;
	    t--;
	    return change / 2 * (-Math.pow(2, -10 * t) + 2) + value;
	});

	exports.easeInOutExpo = easeInOutExpo;
	// circular easing in - accelerating from zero velocity
	var easeInCirc = ease.bind(null, function (currentTime, totalTime, progressRatio, value, change) {
	    return -change * (Math.sqrt(1 - Math.pow(progressRatio, 2)) - 1) + value;
	});

	exports.easeInCirc = easeInCirc;
	// circular easing out - decelerating to zero velocity
	var easeOutCirc = ease.bind(null, function (currentTime, totalTime, progressRatio, value, change) {
	    return change * Math.sqrt(1 - Math.pow(progressRatio - 1, 2)) + value;
	});

	exports.easeOutCirc = easeOutCirc;
	// circular easing in/out - acceleration until halfway, then deceleration
	var easeInOutCirc = ease.bind(null, function (currentTime, totalTime, progressRatio, value, change) {
	    var t = currentTime / (totalTime / 2);
	    if (t < 1) return -change / 2 * (Math.sqrt(1 - Math.pow(t, 2)) - 1) + value;
	    t -= 2;
	    return change / 2 * (Math.sqrt(1 - Math.pow(t, 2)) + 1) + value;
	});
	//END Robert Penner's easing formulas
	exports.easeInOutCirc = easeInOutCirc;

/***/ }
/******/ ]);