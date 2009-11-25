
var TEMPLATE = require("template", "template-pack");
var template = exports.template = TEMPLATE.Template(module);

template.supportsNode = function(node) {
    return (node.type=="constant");
};

template.onLoad = function(pack, tags){with(tags) {

    pack.addCss("common.css");

    return {

        tag: SPAN({"class": pack.getKey()+"constant"},
                  "$node.value"),
        
        shortTag: SPAN({"class": pack.getKey()+"constant"},
                       "$node.value")
    }    
}};

