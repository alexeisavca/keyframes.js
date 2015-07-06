export default function merge(){
    var res = {};
    for(var obj in arguments){
        for(var key in obj){
            res[key] = obj[key];
        }
    }
    return res;
}