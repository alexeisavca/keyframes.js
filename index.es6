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

export function stream(duration, tween, cb){
    cb(tween(0));
    var start = new Date();
    var doFrame = () => {
        var now = new Date();
        var elapsed = now - start;
        var t = elapsed / duration;
        cb(tween(t <= duration ? t : 1));
        if(elapsed < duration){
            requestAnimationFrame(doFrame);
        }
    };
    requestAnimationFrame(doFrame);
}