import * as K from "./index.es6";
window.K = K;
var ace = require('brace');
require('brace/mode/javascript');
require('brace/theme/monokai');

for(var counter = 1; counter <= 3; counter++){
    let editor = ace.edit(`editor-${counter}`);
    editor.getSession().setMode('ace/mode/javascript');
    editor.setTheme('ace/theme/monokai');
    document.getElementById(`launch-${counter}`).addEventListener("click", function(){
        eval(editor.getSession().getValue());
    })
}