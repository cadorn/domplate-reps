
var TEMPLATE = require("template", "template-pack");
var template = exports.template = TEMPLATE.Template(module);

template.supportsNode = function(node) {
    return (node.type=="reference");
};

template.onLoad = function(pack, tags){with(tags) {

    pack.addCss("common.css");

    return {

        CONST_Normal: "tag",
        CONST_Short: "shortTag",
        CONST_Collapsed: "collapsedTag",

        tag:
            SPAN({"class": pack.getKey()+"reference"},
            TAG("$node,$CONST_Normal|getTag", {"node": "$node|getInstanceNode"})),
        
        shortTag:
            SPAN({"class": pack.getKey()+"reference"},
            TAG("$node,$CONST_Short|getTag", {"node": "$node|getInstanceNode"})),

        collapsedTag:
            SPAN({"class": pack.getKey()+"reference"},
            TAG("$node,$CONST_Collapsed|getTag", {"node": "$node|getInstanceNode"})),

            
        getTag: function(node, type) {
            return this.getRepForNode(this.getInstanceNode(node))[type];
        },
        
        getInstanceNode: function(node) {
            return node.getInstance();
        }
    }    
}};
