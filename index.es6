export const FRAMES = 60;
import * as easings from "./easings";

//given an initial start and end state...
export var tween = (from, to) =>
    //...return a function, that for any float 0<t<1...
    t => Object.keys(from).reduce(
        //...for all the properties(width, height, opacity) of the initial state...
        (state, property) => {
            //...will compute the intermediary state at t
            state[property] = from[property] + (to[property] - from[property]) * t;
            return state;
    }, {});

export var transition = (property, from, to) => tween({ [property]: from }, { [property]: to });

export var ensure = (state) =>
    () => state;

export var reverse = (animation) =>
    t => animation(1 - t);

export var toAndFrom = animation => chain({
    0: animation,
    .5: reverse(animation)
});

export var repeat = (times, animation) => {
    var animations = {};
    for(var counter = 1; counter <= times; counter++){
        animations[1 - counter/times] = animation;
    }
    return chain(animations);
};

export var chain = animations =>
    t => {
        //get the keys(starting time) of all the animations, ensure they're floats, then find all that precede t or start at t
        //the animation with the max starting time of those will be current animation
        var currentanimationIndex = Math.max.apply(null, Object.keys(animations).map(parseFloat).filter(time => time <= t));
        var currentanimation = animations[currentanimationIndex];
        var animationDuration =
            /*
             get the keys(starting time) of all the animations, ensure they're all floats, then find all that succeed t
             (but not those that start at t, because without that condition we might get the current animation itself)
             Add 1(end of the chain) in case current animation is the last one. The lowest number of those will be the t
             when current animation ends, we subtract the current animation's starting t to get its duration.
            */
            Math.min.apply(null, Object.keys(animations).map(parseFloat).filter(time => time > t).concat(1.0)) - currentanimationIndex;

        var relativeT = (t - currentanimationIndex) / animationDuration;
        return currentanimation(relativeT);
    };

export var prerender = (time, animation) => {
    var totalFrames = time / 1000 * FRAMES;
    var frames = [];
    for(var frame = 0; frame <= totalFrames; frame++){
        frames[frame] = animation(frame / totalFrames);
    }
    return t => frames[Math.round(totalFrames * t)];
};

export function stream(duration, animation, cb, onEnd){
    cb(animation(0));
    var start = new Date();
    var doFrame = () => {
        var now = new Date();
        var elapsed = now - start;
        var t = elapsed / duration;
        cb(animation(t <= 1 ? t : 1));
        if(elapsed < duration){
            requestAnimationFrame(doFrame);
        } else if("function" == typeof onEnd){
            onEnd();
        }
    };
    requestAnimationFrame(doFrame);
}

export function infiniteStream(duration, animation, cb){
    var ended = false;
    var restartLoop = function(){
        stream(duration, animation, cb, restartLoop);
    };
    stream(duration, animation, cb, restartLoop);
    return function(){
        ended = true;
    }
}

export var intoDom = DOMElement =>
    state => Object.keys(state).forEach(property => DOMElement.style[property] = state[property]);

export {easings as easings};