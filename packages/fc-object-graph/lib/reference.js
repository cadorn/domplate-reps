
var DOMPLATE = require("domplate", "domplate");
var DEFAULT_REP = require("default-rep", "domplate");

with (DOMPLATE.tags) {

    exports.rep = DOMPLATE.domplate(DEFAULT_REP.extend({

        CONST_Normal: "tag",
        CONST_Short: "shortTag",

        tag: SPAN({"class": "__domrep__fc-object-graph-reference"},
                  TAG("$node,$CONST_Normal|getTag", {"node": "$node|getInstanceNode"})),
        
        shortTag: SPAN({"class": "__domrep__fc-object-graph-reference"},
                  TAG("$node,$CONST_Short|getTag", {"node": "$node|getInstanceNode"})),
                        

        getTag: function(node, type) {
            return this.getRepForNode(this.getInstanceNode(node))[type];
        },
        
        getInstanceNode: function(node) {
            return node.getInstance();
        },

        supportsNode: function(node) {
            return (node.type=="reference");
        }
        
    }));

}