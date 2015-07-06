export default class Actor{
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
}