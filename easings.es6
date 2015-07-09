export var  ease = (func, tween) =>
    t => {
        var initialState = tween(0);
        var currentState = tween(t);
        var easedState = {};
        Object.keys(initialState).forEach(property => {
            easedState[property] = func(t, 1, t, initialState[property], currentState[property] - initialState[property]);
        });
        return easedState;
    };

//BEGIN Robert Penner's easing formulas, stolen from: http://gizma.com/easing/
//CSS cubic bezier easings stolen from http://easings.net/

// simple linear tweening - no easing, no acceleration
export var linear = tween => tween;

// quadratic easing in - accelerating from zero velocity
export var easeInQuad = ease.bind(null, (currentTime, totalTime, progressRatio, value, change) =>
    change * Math.pow(progressRatio, 2) + value);

// quadratic easing out - decelerating to zero velocity
export var easeOutQuad = ease.bind(null, (currentTime, totalTime, progressRatio, value, change) =>
    - change * progressRatio * (progressRatio - 2) + value);

// quadratic easing in/out - acceleration until halfway, then deceleration
export var easeInOutQuad = ease.bind(null, (currentTime, totalTime, progressRatio, value, change) => {
    var t = currentTime / ( totalTime / 2);
    if (t < 1) return change / 2 * t * t + value;
    t--;
    return - change / 2 * (t * (t - 2) - 1) + value;
});

// cubic easing in - accelerating from zero velocity
export var easeInCubic = ease.bind(null, (currentTime, totalTime, progressRatio, value, change) =>
    change * Math.pow(progressRatio, 3) + value);

// cubic easing out - decelerating to zero velocity
export var easeOutCubic = ease.bind(null, (currentTime, totalTime, progressRatio, value, change) =>
    change * (Math.pow(progressRatio - 1, 3) + 1) + value);

// cubic easing in/out - acceleration until halfway, then deceleration
export var easeInOutCubic = ease.bind(null, (currentTime, totalTime, progressRatio, value, change) => {
    var t = currentTime / ( totalTime / 2);
    if (t < 1) return change / 2 * Math.pow(t, 3) + value;
    t -= 2;
    return change / 2 * (Math.pow(t, 3) + 2) + value;
});

// quartic easing in - accelerating from zero velocity
export var easeInQuart = ease.bind(null, (currentTime, totalTime, progressRatio, value, change) =>
    change * Math.pow(progressRatio, 4) + value);

// quartic easing out - decelerating to zero velocity
export var easeOutQuart = ease.bind(null, (currentTime, totalTime, progressRatio, value, change) =>
    - change * (Math.pow(progressRatio - 1, 4) - 1) + value);

// quartic easing in/out - acceleration until halfway, then deceleration
export var easeInOutQuart = ease.bind(null, (currentTime, totalTime, progressRatio, value, change) => {
    var t = currentTime / ( totalTime / 2);
    if (t < 1) return change/2*Math.pow(t, 4) + value;
    t -= 2;
    return -change/2 * (Math.pow(t, 4) - 2) + value;
});

// quintic easing in - accelerating from zero velocity
export var easeInQuint = ease.bind(null, (currentTime, totalTime, progressRatio, value, change) =>
    change * Math.pow(progressRatio, 5) + value);

// quintic easing out - decelerating to zero velocity
export var easeOutQuint = ease.bind(null, (currentTime, totalTime, progressRatio, value, change) =>
    change * (Math.pow(progressRatio - 1, 5) + 1) + value);

// quintic easing in/out - acceleration until halfway, then deceleration
export var easeInOutQuint = ease.bind(null, (currentTime, totalTime, progressRatio, value, change) => {
    var t = currentTime / ( totalTime / 2);
    if (t < 1) return change/2*Math.pow(t, 5) + value;
    t -= 2;
    return change/2*(Math.pow(t, 5) + 2) + value;
});

// sinusoidal easing in - accelerating from zero velocity
export var easeInSine =  ease.bind(null, (currentTime, totalTime, progressRatio, value, change) =>
    - change * Math.cos(progressRatio * (Math.PI / 2)) + change + value);

// sinusoidal easing out - decelerating to zero velocity
export var easeOutSine = ease.bind(null, (currentTime, totalTime, progressRatio, value, change) =>
    change * Math.sin(progressRatio * (Math.PI/2)) + value);

// sinusoidal easing in/out - accelerating until halfway, then decelerating
export var easeInOutSine = ease.bind(null, (currentTime, totalTime, progressRatio, value, change) =>
    - change / 2 * (Math.cos(Math.PI * progressRatio) - 1) + value);

// exponential easing in - accelerating from zero velocity
export var easeInExpo = ease.bind(null, (currentTime, totalTime, progressRatio, value, change) =>
    change * Math.pow( 2, 10 * (progressRatio - 1) ) + value);

// exponential easing out - decelerating to zero velocity
export var easeOutExpo =  ease.bind(null, (currentTime, totalTime, progressRatio, value, change) =>
    change * (- Math.pow(2, -10 * progressRatio ) + 1 ) + value);

// exponential easing in/out - accelerating until halfway, then decelerating
export var easeInOutExpo = ease.bind(null, (currentTime, totalTime, progressRatio, value, change) => {
    var t = currentTime / ( totalTime / 2);
    if (t < 1) return change / 2 * Math.pow( 2, 10 * (t - 1) ) + value;
    t--;
    return change / 2 * (- Math.pow( 2, -10 * t) + 2 ) + value;
});

// circular easing in - accelerating from zero velocity
export var easeInCirc = ease.bind(null, (currentTime, totalTime, progressRatio, value, change) =>
    - change * (Math.sqrt(1 - Math.pow(progressRatio, 2)) - 1) + value);

// circular easing out - decelerating to zero velocity
export var easeOutCirc = ease.bind(null, (currentTime, totalTime, progressRatio, value, change) =>
    change * Math.sqrt(1 - Math.pow(progressRatio - 1, 2)) + value);

// circular easing in/out - acceleration until halfway, then deceleration
export var easeInOutCirc = ease.bind(null, (currentTime, totalTime, progressRatio, value, change) => {
    var t = currentTime / ( totalTime / 2);
    if (t < 1) return - change / 2 * (Math.sqrt(1 - Math.pow(t, 2)) - 1) + value;
    t -= 2;
    return change / 2 * (Math.sqrt(1 - Math.pow(t, 2)) + 1) + value;
});
//END Robert Penner's easing formulas