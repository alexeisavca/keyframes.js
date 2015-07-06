import Animation from "./index";
import OpacityActor from "../actor/opacity";
export default class extends Animation{
    constructor(from, to, duration, easing){
        super();
        this.addActor(new OpacityActor(from, to, duration, easing));
    }
}