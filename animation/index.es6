import merge from "../tools/merge";
export default class{
    constructor(){
        this.frames = 60;
        this.actors = [];
        this.addActor = this.actors.push.bind(this.actors);
    }

    getDuration(){
        return Math.max(...this.actors.map(actor => actor.getDuration()));
    }

    getState(t){
        return merge(...this.actors.map(actor => actor.getState(t)));
    }

    play(cb){
        var startedAt = new Date();
        var duration = this.getDuration();
        var renderFrame = () => {
            var now = new Date();
            var diff = now - startedAt;
            cb(this.getState(diff <= duration ? diff : duration));
            if(diff < duration){
                requestAnimationFrame(renderFrame);
            }
        };
        requestAnimationFrame(renderFrame);
    }
}