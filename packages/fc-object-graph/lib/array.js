
var DOMPLATE = require("domplate", "domplate");
var DEFAULT_REP = require("default-rep", "domplate");

with (DOMPLATE.tags) {

    exports.rep = DOMPLATE.domplate(DEFAULT_REP.extend({

        tag:
            SPAN({"class": "__domrep__fc-object-graph-array"}, SPAN("array("),
                FOR("element", "$node|elementIterator",
                    DIV({"class": "element"},
                        TAG("$element.tag", {"node": "$element.node"}),
                        IF("$element.more", SPAN({"class": "separator"}, ","))
                    )
                ),
            SPAN(")")),


        shortTag:
            SPAN({"class": "__domrep__fc-object-graph-array"}, SPAN("array("),
                FOR("element", "$node|elementIterator",
                    SPAN({"class": "element"},
                        TAG("$element.tag", {"node": "$element.node"}),
                        IF("$element.more", SPAN({"class": "separator"}, ","))
                    )
                ),
            SPAN(")")),
        
        elementIterator: function(node) {
            var elements = [];
            for( var i=0 ; i<node.value.length ; i++ ) {
                elements.push({
                    "tag": this.getRepTagForNode(node.value[i]),
                    "node": node.value[i],
                    "more": (i<node.value.length-1)
                });
            }
            return elements;
        },
             
        supportsNode: function(node) {
            return (node.type=="array");
        }
        
    }));

}