

function dump(obj) { print(require('test/jsdump').jsDump.parse(obj)) };


var DOMPLATE = require("domplate", "domplate");
var DEFAULT_REP = require("default-rep", "domplate");

with (DOMPLATE.tags) {

    exports.rep = DOMPLATE.domplate(DEFAULT_REP.extend({
        
        CONST_Normal: "tag",
        CONST_Short: "shortTag",
        CONST_Collapsed: "collapsedTag",

        tag:
            SPAN({"class": "__domrep__fc-object-graph-dictionary"}, SPAN("dictionary("),
                FOR("member", "$node|dictionaryIterator",
                    DIV({"class": "member", "$expandable":"$member.expandable", "_memberObject": "$member", "onclick": "$onClick"},
                        SPAN({"class": "name"}, "$member.name"),
                        SPAN({"class": "delimiter"}, ":"),
                        SPAN({"class": "value"},
                            TAG("$member,$CONST_Normal|getTag", {"member": "$member", "node": "$member.node"})
                        ),
                        IF("$member.more", SPAN({"class": "separator"}, ","))
                    )
                ),
            SPAN(")")),

        shortTag:
            SPAN({"class": "__domrep__fc-object-graph-dictionary"}, SPAN("dictionary("),
                SPAN({"class": "member"}, "members: $node|getMemberCount"),
            SPAN(")")),

        collapsedTag:
            SPAN({"class": "__domrep__fc-object-graph-dictionary"}, SPAN("dictionary("),
                SPAN({"class": "collapsed"}, "... $node|getMemberCount ..."),
            SPAN(")")),
        
        expandableStub:
            TAG("$member,$CONST_Collapsed|getTag", {"node": "$member.node"}),
            
        expandedStub:
            TAG("$tag", {"node": "$node", "member": "$member"}),
        
        
        getMemberCount: function(node) {
            var count = 0;
            for( var name in node.value ) {
                count++;
            }
            return count;
        },
        
        getTag: function(member, type) {
            if(type===this.CONST_Short) {
                return this.getRepForNode(member.node).shortTag;
            } else
            if(type===this.CONST_Normal) {
                if(member.expandable) {
                    return this.expandableStub;
                } else {
                    return this.getRepForNode(member.node).tag;
                }
            } else
            if(type===this.CONST_Collapsed) {
                var rep = this.getRepForNode(member.node);
                if(!rep.collapsedTag) {
                    throw "no 'collapsedTag' property in rep: " + rep.toString();
                }
                return rep.collapsedTag;
            }
        },
        
        dictionaryIterator: function(node) {
            var members = [];
            for( var name in node.value ) {
                members.push({
                    "name": name,
                    "node": node.value[name],
                    "more": true,
                    "expandable": this.isExpandable(node.value[name])
                });
            }
            if(members.length>0) {
                members[members.length-1]["more"] = false;
            }
            
            return members;
        },
        
        isExpandable: function(node) {
            return (node.type=="reference" ||
                    node.type=="dictionary" ||
                    node.type=="map" ||
                    node.type=="array");
        },
        
        onClick: function(event) {
            if (!this.util.isLeftClick(event)) {
                return;
            }
            var row = this.util.getAncestorByClass(event.target, "member");
            if(this.util.hasClass(row, "expandable")) {
                this.toggleRow(row);
            }
            event.stopPropagation();
        },
        
        toggleRow: function(row)
        {
            var valueElement = this.util.getElementByClass(row, "value");
            if (this.util.hasClass(row, "expanded"))
            {
                this.util.removeClass(row, "expanded");
                this.expandedStub.replace({
                    "tag": this.expandableStub,
                    "member": row.memberObject,
                    "node": row.memberObject.node
                }, valueElement);
            } else {
              this.util.setClass(row, "expanded");
              this.expandedStub.replace({
                  "tag": this.getRepForNode(row.memberObject.node).tag,
                    "member": row.memberObject,
                  "node": row.memberObject.node
              }, valueElement);
            }
        },
                   
        supportsNode: function(node) {
            return (node.type=="dictionary");
        }
        
    }));

}