


var DOMPLATE = require("domplate", "domplate");
var DEFAULT_REP = require("default-rep", "domplate");

with (DOMPLATE.tags) {

    exports.rep = DOMPLATE.domplate(DEFAULT_REP.extend({

        tag: SPAN({"class": "__domrep__fc-object-graph-text"},
                  "'",
                  FOR("line", "$node.value|lineIterator", "$line.value",
                      IF("$line.more", BR())),
                  "'"),
        
        shortTag: SPAN({"class": "__domrep__fc-object-graph-text"},
                            "'$node.value|cropString'"),
                
        cropString: function(text, limit){
            text = text + "";
            
            if (!limit) {
                var halfLimit = 50;
            } else {
                var halfLimit = limit / 2;
            }            
            if (text.length > limit) {
                return this.escapeNewLines(text.substr(0, halfLimit) + "..." + text.substr(text.length - halfLimit));
            } else {
                return this.escapeNewLines(text);
            }
        },
        
        escapeNewLines: function(value) {
            return value.replace(/\r/g, "\\r").replace(/\n/g, "\\n");
        },
        
        lineIterator: function(value) {
            var parts = value.replace(/\r/g, "\\r").split("\n");
            var lines = [];
            for( var i=0 ; i<parts.length ; i++ ) {
                lines.push({"value": parts[i], "more": (i<parts.length-1)});
            }
            return lines;
        },

        supportsNode: function(node) {
            return (node.type=="text");
        }
        
    }));

}