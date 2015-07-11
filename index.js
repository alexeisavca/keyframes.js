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
	exports.chainEvenly = chainEvenly;
	exports.merge = merge;
	exports.stream = stream;
	exports.infiniteStream = infiniteStream;
	exports.toCss = toCss;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	var _easings = __webpack_require__(1);

	var easings = _interopRequireWildcard(_easings);

	var _toolsNumberInterpolation = __webpack_require__(2);

	var _toolsMerge = __webpack_require__(3);

	var _toolsMerge2 = _interopRequireDefault(_toolsMerge);

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
	                //...will extract numbers from the string("12px" => 12)
	                var strFrom = from[property] + "";
	                var numbersPlaceholder = (0, _toolsNumberInterpolation.placeholdNumbers)(strFrom);
	                var fromNumbers = (0, _toolsNumberInterpolation.extractNumbers)(strFrom);
	                var strTo = to[property] + "";
	                var toNumbers = (0, _toolsNumberInterpolation.extractNumbers)(strTo);
	                //...will compute the intermediary state of each number at t and will merge them into a CSS string again
	                state[property] = (0, _toolsNumberInterpolation.interpolateNumbers)(numbersPlaceholder, fromNumbers.map(function (number, index) {
	                    return number + (toNumbers[index] - number) * t;
	                }));
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
	var ensureProperty = function ensureProperty(property, value) {
	    return ensure(_defineProperty({}, property, value));
	};

	exports.ensureProperty = ensureProperty;
	var reverse = function reverse(animation) {
	    return function (t) {
	        return animation(1 - t);
	    };
	};

	exports.reverse = reverse;
	var linger = function linger(t, animation) {
	    return chain(_defineProperty({
	        0: animation
	    }, t, ensure(animation(1))));
	};

	exports.linger = linger;
	var foreshadow = function foreshadow(t, animation) {
	    return chain(_defineProperty({
	        0: ensure(animation(0))
	    }, t, animation));
	};

	exports.foreshadow = foreshadow;
	var imposePresence = function imposePresence(from, to, animation) {
	    var _chain3;

	    return chain((_chain3 = {
	        0: ensure(animation(0))
	    }, _defineProperty(_chain3, from, animation), _defineProperty(_chain3, to, ensure(animation(1))), _chain3));
	};

	exports.imposePresence = imposePresence;
	var toAndFrom = function toAndFrom(animation) {
	    return chain({
	        0: animation,
	        .5: reverse(animation)
	    });
	};

	exports.toAndFrom = toAndFrom;
	var repeat = function repeat(times, animation) {
	    var animations = {};
	    for (var counter = 1; counter <= times; counter++) {
	        animations[1 - counter / times] = animation;
	    }
	    return chain(animations);
	};

	exports.repeat = repeat;
	var chain = function chain(animations) {
	    return function (t) {
	        //get the keys(starting time) of all the animations, ensure they're floats, then find all that precede t or start at t
	        //the animation with the max starting time of those will be current animation
	        var currentanimationIndex = Math.max.apply(null, Object.keys(animations).map(parseFloat).filter(function (time) {
	            return time <= t;
	        }));
	        var currentanimation = animations[currentanimationIndex];
	        var animationDuration =
	        /*
	         get the keys(starting time) of all the animations, ensure they're all floats, then find all that succeed t
	         (but not those that start at t, because without that condition we might get the current animation itself)
	         Add 1(end of the chain) in case current animation is the last one. The lowest number of those will be the t
	         when current animation ends, we subtract the current animation's starting t to get its duration.
	        */
	        Math.min.apply(null, Object.keys(animations).map(parseFloat).filter(function (time) {
	            return time > t;
	        }).concat(1.0)) - currentanimationIndex;

	        var relativeT = (t - currentanimationIndex) / animationDuration;
	        return currentanimation(relativeT);
	    };
	};

	exports.chain = chain;

	function chainEvenly() {
	    var _arguments2 = arguments;

	    var timings = {};
	    Object.keys(arguments).forEach(function (index) {
	        timings[index / _arguments2.length] = _arguments2[index];
	    });
	    return chain(timings);
	}

	function merge() {
	    var _arguments = arguments;
	    return function (t) {
	        return _toolsMerge2["default"].apply(null, Object.keys(_arguments).map(function (key) {
	            return _arguments[key](t);
	        }));
	    };
	}

	var prerender = function prerender(time, animation) {
	    var totalFrames = time / 1000 * FRAMES;
	    var frames = [];
	    for (var frame = 0; frame <= totalFrames; frame++) {
	        frames[frame] = animation(frame / totalFrames);
	    }
	    return function (t) {
	        return frames[Math.round(totalFrames * t)];
	    };
	};

	exports.prerender = prerender;

	function stream(duration, animation, cb, onEnd) {
	    cb(animation(0));
	    var start = new Date();
	    var doFrame = function doFrame() {
	        var now = new Date();
	        var elapsed = now - start;
	        var t = elapsed / duration;
	        cb(animation(t <= 1 ? t : 1));
	        if (elapsed < duration) {
	            requestAnimationFrame(doFrame);
	        } else if ("function" == typeof onEnd) {
	            onEnd();
	        }
	    };
	    requestAnimationFrame(doFrame);
	}

	function infiniteStream(duration, animation, cb) {
	    var ended = false;
	    var restartLoop = function restartLoop() {
	        stream(duration, animation, cb, restartLoop);
	    };
	    stream(duration, animation, cb, restartLoop);
	    return function () {
	        ended = true;
	    };
	}

	function toCss(name, nrFrames, animation) {
	    var str = "@keyframes " + name + "{\n";
	    for (var frame = 0; frame <= nrFrames; frame++) {
	        var state = animation(frame / nrFrames);
	        var strState = Object.keys(state).map(function (key) {
	            return key + ":" + state[key];
	        }).join(";");
	        str += "\t" + frame / nrFrames * 100 + "%{" + strState + "}\n";
	    }
	    return str + "}";
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
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _toolsNumberInterpolation = __webpack_require__(2);

	var ease = function ease(func, tween) {
	    return function (t) {
	        var initialState = tween(0);
	        var currentState = tween(t);
	        var easedState = {};
	        Object.keys(initialState).forEach(function (property) {
	            var strInitial = initialState[property] + "";
	            var numbersPlaceholder = (0, _toolsNumberInterpolation.placeholdNumbers)(strInitial);
	            var initialNumbers = (0, _toolsNumberInterpolation.extractNumbers)(strInitial);
	            var strCurrent = currentState[property];
	            var currentNumbers = (0, _toolsNumberInterpolation.extractNumbers)(strCurrent);
	            easedState[property] = (0, _toolsNumberInterpolation.interpolateNumbers)(numbersPlaceholder, initialNumbers.map(function (number, index) {
	                return func(t, 1, t, number, currentNumbers[index] - number);
	            }));
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

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	var NUMBER_REGEXP = /[-]?(0|[1-9][0-9]*)(\.[0-9]+)?([eE][+-]?[0-9]+)?/g;
	var sanitizeProperties = function sanitizeProperties(property) {
	    return property.replace('3d', 'THREE_D');
	};
	exports.sanitizeProperties = sanitizeProperties;
	var unsanitizeProperties = function unsanitizeProperties(property) {
	    return property.replace('THREE_D', '3d');
	};
	exports.unsanitizeProperties = unsanitizeProperties;
	var placeholdNumbers = function placeholdNumbers(string) {
	    return sanitizeProperties(string).replace(NUMBER_REGEXP, '$');
	};
	exports.placeholdNumbers = placeholdNumbers;
	var extractNumbers = function extractNumbers(string) {
	    return string.match(NUMBER_REGEXP).map(parseFloat);
	};
	exports.extractNumbers = extractNumbers;
	var interpolateNumbers = function interpolateNumbers(string, numbers) {
	    return unsanitizeProperties(numbers.reduce(function (string, number) {
	        return string.replace('$', number);
	    }, string));
	};
	exports.interpolateNumbers = interpolateNumbers;

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports["default"] = merge;

	function merge() {
	    var res = {};
	    for (var index in arguments) {
	        var obj = arguments[index];
	        for (var key in obj) {
	            res[key] = obj[key];
	        }
	    }
	    return res;
	}

	module.exports = exports["default"];

/***/ }
/******/ ]);