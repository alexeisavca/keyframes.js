export class Easing{
    constructor(func, cssName){
        this.ease = func;
        this.cssName = cssName;
    }
}
//BEGIN Robert Penner's easing formulas, stolen from: http://gizma.com/easing/
//CSS cubic bezier easings stolen from http://easings.net/

// simple linear tweening - no easing, no acceleration
export const linear = new Easing((currentTime, totalTime, progressRatio, value, change) =>
    change * progressRatio + value, 'linear');

// quadratic easing in - accelerating from zero velocity
export const easeInQuad = new Easing((currentTime, totalTime, progressRatio, value, change) =>
    change * Math.pow(progressRatio, 2) + value, 'cubic-bezier(0.55, 0.085, 0.68, 0.53)');

// quadratic easing out - decelerating to zero velocity
export const easeOutQuad = new Easing((currentTime, totalTime, progressRatio, value, change) =>
    - change * progressRatio * (progressRatio - 2) + value, 'cubic-bezier(0.25, 0.46, 0.45, 0.94)');

// quadratic easing in/out - acceleration until halfway, then deceleration
export const easeInOutQuad = new Easing((currentTime, totalTime, progressRatio, value, change) => {
    var t = currentTime / ( totalTime / 2);
    if (t < 1) return change / 2 * t * t + value;
    t--;
    return - change / 2 * (t * (t - 2) - 1) + value;
}, 'cubic-bezier(0.455, 0.03, 0.515, 0.955)');

// cubic easing in - accelerating from zero velocity
export const easeInCubic = new Easing((currentTime, totalTime, progressRatio, value, change) =>
    change * Math.pow(progressRatio, 3) + value, 'cubic-bezier(0.55, 0.055, 0.675, 0.19)');

// cubic easing out - decelerating to zero velocity
export const easeOutCubic = new Easing((currentTime, totalTime, progressRatio, value, change) =>
    change * (Math.pow(progressRatio - 1, 3) + 1) + value, 'cubic-bezier(0.215, 0.61, 0.355, 1)');

// cubic easing in/out - acceleration until halfway, then deceleration
export const easeInOutCubic = new Easing((currentTime, totalTime, progressRatio, value, change) => {
    var t = currentTime / ( totalTime / 2);
    if (t < 1) return change / 2 * Math.pow(t, 3) + value;
    t -= 2;
    return change / 2 * (Math.pow(t, 3) + 2) + value;
}, 'cubic-bezier(0.645, 0.045, 0.355, 1)');

// quartic easing in - accelerating from zero velocity
export const easeInQuart = new Easing((currentTime, totalTime, progressRatio, value, change) =>
    change * Math.pow(progressRatio, 4) + value, 'cubic-bezier(0.895, 0.03, 0.685, 0.22)');

// quartic easing out - decelerating to zero velocity
export const easeOutQuart = new Easing((currentTime, totalTime, progressRatio, value, change) =>
    - change * (Math.pow(progressRatio - 1, 4) - 1) + value, 'cubic-bezier(0.165, 0.84, 0.44, 1)');

// quartic easing in/out - acceleration until halfway, then deceleration
export const easeInOutQuart = new Easing((currentTime, totalTime, progressRatio, value, change) => {
    var t = currentTime / ( totalTime / 2);
    if (t < 1) return change/2*Math.pow(t, 4) + value;
    t -= 2;
    return -change/2 * (Math.pow(t, 4) - 2) + value;
}, 'cubic-bezier(0.77, 0, 0.175, 1)');

// quintic easing in - accelerating from zero velocity
export const easeInQuint = new Easing((currentTime, totalTime, progressRatio, value, change) =>
    change * Math.pow(progressRatio, 5) + value, 'cubic-bezier(0.755, 0.05, 0.855, 0.06)');

// quintic easing out - decelerating to zero velocity
export const easeOutQuint = new Easing((currentTime, totalTime, progressRatio, value, change) =>
    change * (Math.pow(progressRatio - 1, 5) + 1) + value, 'cubic-bezier(0.23, 1, 0.32, 1)');

// quintic easing in/out - acceleration until halfway, then deceleration
export const easeInOutQuint = new Easing((currentTime, totalTime, progressRatio, value, change) => {
    var t = currentTime / ( totalTime / 2);
    if (t < 1) return change/2*Math.pow(t, 5) + value;
    t -= 2;
    return change/2*(Math.pow(t, 5) + 2) + value;
}, 'cubic-bezier(0.86, 0, 0.07, 1)');

// sinusoidal easing in - accelerating from zero velocity
export const easeInSine =  new Easing((currentTime, totalTime, progressRatio, value, change) =>
    - change * Math.cos(progressRatio * (Math.PI / 2)) + change + value, 'cubic-bezier(0.47, 0, 0.745, 0.715)');

// sinusoidal easing out - decelerating to zero velocity
export const easeOutSine = new Easing((currentTime, totalTime, progressRatio, value, change) =>
    change * Math.sin(progressRatio * (Math.PI/2)) + value, 'cubic-bezier(0.39, 0.575, 0.565, 1)');

// sinusoidal easing in/out - accelerating until halfway, then decelerating
export const easeInOutSine = new Easing((currentTime, totalTime, progressRatio, value, change) =>
    - change / 2 * (Math.cos(Math.PI * progressRatio) - 1) + value, 'cubic-bezier(0.445, 0.05, 0.55, 0.95)');

// exponential easing in - accelerating from zero velocity
export const easeInExpo = new Easing((currentTime, totalTime, progressRatio, value, change) =>
    change * Math.pow( 2, 10 * (progressRatio - 1) ) + value, 'cubic-bezier(0.95, 0.05, 0.795, 0.035)');

// exponential easing out - decelerating to zero velocity
export const easeOutExpo =  new Easing((currentTime, totalTime, progressRatio, value, change) =>
    change * (- Math.pow(2, -10 * progressRatio ) + 1 ) + value, 'cubic-bezier(0.19, 1, 0.22, 1)');

// exponential easing in/out - accelerating until halfway, then decelerating
export const easeInOutExpo = new Easing((currentTime, totalTime, progressRatio, value, change) => {
    var t = currentTime / ( totalTime / 2);
    if (t < 1) return change / 2 * Math.pow( 2, 10 * (t - 1) ) + value;
    t--;
    return change / 2 * (- Math.pow( 2, -10 * t) + 2 ) + value;
}, 'cubic-bezier(1, 0, 0, 1)');

// circular easing in - accelerating from zero velocity
export const easeInCirc = new Easing((currentTime, totalTime, progressRatio, value, change) =>
    - change * (Math.sqrt(1 - Math.pow(progressRatio, 2)) - 1) + value, 'cubic-bezier(0.6, 0.04, 0.98, 0.335)');

// circular easing out - decelerating to zero velocity
export const easeOutCirc = new Easing((currentTime, totalTime, progressRatio, value, change) =>
    change * Math.sqrt(1 - Math.pow(progressRatio - 1, 2)) + value, 'cubic-bezier(0.075, 0.82, 0.165, 1)');

// circular easing in/out - acceleration until halfway, then deceleration
export const easeInOutCirc = new Easing((currentTime, totalTime, progressRatio, value, change) => {
    var t = currentTime / ( totalTime / 2);
    if (t < 1) return - change / 2 * (Math.sqrt(1 - Math.pow(t, 2)) - 1) + value;
    t -= 2;
    return change / 2 * (Math.sqrt(1 - Math.pow(t, 2)) + 1) + value;
}, 'cubic-bezier(0.785, 0.135, 0.15, 0.86)');
//END Robert Penner's easing formulas