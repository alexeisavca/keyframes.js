import Actor from "./index";
export default class extends Actor{
    constructor(from, to, duration){
        super();
        this.addKeyframe(0, {
            transform: `scale(${from})`
        });
        this.addKeyframe(duration, {
            transform: `scale(${to})`
        });
    }
}