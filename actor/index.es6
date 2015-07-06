export default class{
    constructor(){
        this.keyframes = [];
    }

    addKeyframe(time, state, easing){
        this.keyframes.push({
            time: time,
            state: state,
            easing: easing || 'linear'
        })
    }

    getDuration(){
        return Math.max(...this.keyframes.map(keyframe => keyframe.time));
    }

    getState(t){
        //find all the keyframes whose time is before t,
        var prevKeyframe = this.keyframes.filter(keyframe => keyframe.time <= t)
            //then find the one with the greater time of all, thus finding the immediate predecessor frame of t
            .reduce((prev, next) => prev && (prev.time > next.time) ? prev : next);

        var prevState = prevKeyframe.state;

        //find all the keyframes whose time is after t,
        var nextKeyframe = this.keyframes.filter(keyframe => keyframe.time >= t)
            // then find the one with the smaller time of all, thus finding the immediate successor frame of t
            .reduce((prev, next) => prev && (prev.time < next.time) ? prev : next);

        var nextState = nextKeyframe.state;

        var state = {};
        Object.keys(prevState).forEach(key => {
            state[key] = prevState[key] + ((nextState[key] - prevState[key]) * (t/this.getDuration()))
        });
        return state;
    }
}