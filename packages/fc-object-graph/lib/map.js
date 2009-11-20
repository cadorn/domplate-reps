
var DOMPLATE = require("domplate", "domplate");
var DEFAULT_REP = require("default-rep", "domplate");

with (DOMPLATE.tags) {

    exports.rep = DOMPLATE.domplate(DEFAULT_REP.extend({
        
        CONST_Normal: "tag",
        CONST_Short: "shortTag",

        tag:
            SPAN({"class": "__domrep__fc-object-graph-map"}, SPAN("map("),
                FOR("pair", "$node,$CONST_Normal|mapIterator",
                    DIV({"class": "pair"},
                        TAG("$pair.key.tag", {"node": "$pair.key.node"}),
                        SPAN({"class": "delimiter"}, "=>"),
                        TAG("$pair.value.tag", {"node": "$pair.value.node"}),
                        IF("$pair.more", SPAN({"class": "separator"}, ","))
                    )
                ),
            SPAN(")")),


        shortTag:
            SPAN({"class": "__domrep__fc-object-graph-map"}, SPAN("map("),
                FOR("pair", "$node,$CONST_Short|mapIterator",
                    SPAN({"class": "pair"},
                        TAG("$pair.key.tag", {"node": "$pair.key.node"}),
                        SPAN({"class": "delimiter"}, "=>"),
                        TAG("$pair.value.tag", {"node": "$pair.value.node"}),
                        IF("$pair.more", SPAN({"class": "separator"}, ","))
                    )
                ),
            SPAN(")")),
        
        mapIterator: function(node, type) {
            var pairs = [];
            for( var i=0 ; i<node.value.length ; i++ ) {
                pairs.push({
                    "key": {
                        "tag": this.getRepForNode(node.value[i][0])[type],
                        "node": node.value[i][0]
                    },
                    "value": {
                        "tag": this.getRepForNode(node.value[i][1])[type],
                        "node": node.value[i][1]
                    },
                    "more": (i<node.value.length-1)
                });
            }
            return pairs;
        },
             
        supportsNode: function(node) {
            return (node.type=="map");
        }
        
    }));

}