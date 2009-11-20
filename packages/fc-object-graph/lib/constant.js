
var DOMPLATE = require("domplate", "domplate");
var DEFAULT_REP = require("default-rep", "domplate");

with (DOMPLATE.tags) {

    exports.rep = DOMPLATE.domplate(DEFAULT_REP.extend({

        tag: SPAN({"class": "__domrep__fc-object-graph-constant"},
                  "$node.value"),
        
        shortTag: SPAN({"class": "__domrep__fc-object-graph-constant"},
                       "$node.value"),

        supportsNode: function(node) {
            return (node.type=="constant");
        }
        
    }));

}