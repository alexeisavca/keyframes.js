import Animation from "./index";
import OpacityActor from "../actor/opacity";
export default class extends Animation{
    constructor(from, to, duration){
        super();
        this.addActor(new OpacityActor(from, to, duration));
    }
}