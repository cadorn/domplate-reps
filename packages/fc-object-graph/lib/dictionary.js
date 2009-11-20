
var DOMPLATE = require("domplate", "domplate");
var DEFAULT_REP = require("default-rep", "domplate");

with (DOMPLATE.tags) {

    exports.rep = DOMPLATE.domplate(DEFAULT_REP.extend({
        
        CONST_Normal: "tag",
        CONST_Short: "shortTag",

        tag:
            SPAN({"class": "__domrep__fc-object-graph-dictionary"}, SPAN("dictionary("),
                FOR("member", "$node,$CONST_Normal|dictionaryIterator",
                    DIV({"class": "member"},
                        SPAN({"class": "name"}, "$member.name"),
                        SPAN({"class": "delimiter"}, ":"),
                        TAG("$member.value.tag", {"node": "$member.value.node"}),
                        IF("$member.more", SPAN({"class": "separator"}, ","))
                    )
                ),
            SPAN(")")),


        shortTag:
            SPAN({"class": "__domrep__fc-object-graph-dictionary"}, SPAN("dictionary("),
                FOR("member", "$node,$CONST_Short|dictionaryIterator",
                    SPAN({"class": "member"},
                        SPAN({"class": "name"}, "$member.name"),
                        SPAN({"class": "delimiter"}, ":"),
                        TAG("$member.value.tag", {"node": "$member.value.node"}),
                        IF("$member.more", SPAN({"class": "separator"}, ","))
                    )
                ),
            SPAN(")")),
        
        dictionaryIterator: function(node, type) {
            var members = [];
            for( var name in node.value ) {
                members.push({
                    "name": name,
                    "value": {
                        "tag": this.getRepForNode(node.value[name])[type],
                        "node": node.value[name]
                    },
                    "more": true
                });
            }
            if(members.length>0) {
                members[members.length-1]["more"] = false;
            }
            return members;
        },
             
        supportsNode: function(node) {
            return (node.type=="dictionary");
        }
        
    }));

}