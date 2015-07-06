export default function merge(){
    var res = {};
    for(var index in arguments){
        var obj = arguments[index];
        for(var key in obj){
            res[key] = obj[key];
        }
    }
    return res;
}