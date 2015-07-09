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

export var reverse = (tween) =>
    t => tween(1 - t);

export var toAndFrom = tween => chain({
    0: tween,
    .5: reverse(tween)
});

export var repeat = (times, tween) => {
    var tweens = {};
    for(var counter = 1; counter <= times; counter++){
        tweens[1 - counter/times] = tween;
    }
    return chain(tweens);
};

export var chain = tweens =>
    t => {
        //get the keys(starting time) of all the tweens, ensure they're floats, then find all that precede t or start at t
        //the tween with the max starting time of those will be current tween
        var currentTweenIndex = Math.max.apply(null, Object.keys(tweens).map(parseFloat).filter(time => time <= t));
        var currentTween = tweens[currentTweenIndex];
        var tweenDuration =
            /*
             get the keys(starting time) of all the tweens, ensure they're all floats, then find all that succeed t
             (but not those that start at t, because without that condition we might get the current tween itself)
             Add 1(end of the chain) in case current tween is the last one. The lowest number of those will be the t
             when current tween ends, we subtract the current tween's starting t to get its duration.
            */
            Math.min.apply(null, Object.keys(tweens).map(parseFloat).filter(time => time > t).concat(1.0)) - currentTweenIndex;

        var relativeT = (t - currentTweenIndex) / tweenDuration;
        return currentTween(relativeT);
    };

export var prerender = (time, tween) => {
    var totalFrames = time / 1000 * FRAMES;
    var frames = [];
    for(var frame = 0; frame <= totalFrames; frame++){
        frames[frame] = tween(frame / totalFrames);
    }
    return t => frames[Math.round(totalFrames * t)];
};

export function stream(duration, tween, cb, onEnd){
    cb(tween(0));
    var start = new Date();
    var doFrame = () => {
        var now = new Date();
        var elapsed = now - start;
        var t = elapsed / duration;
        cb(tween(t <= 1 ? t : 1));
        if(elapsed < duration){
            requestAnimationFrame(doFrame);
        } else {
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