import Animation from "./index";
import ScaleActor from "../actor/scale";
export default class extends Animation{
    constructor(from, to, duration){
        super();
        this.addActor(new ScaleActor(from, to, duration));
    }
}