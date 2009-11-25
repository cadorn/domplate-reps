
var TEMPLATE = require("template", "template-pack");
var template = exports.template = TEMPLATE.Template(module);

template.supportsNode = function(node) {
    return (node.type=="text");
};

template.onLoad = function(pack, tags){with(tags) {

    pack.addCss("common.css");

    return {

        tag: SPAN({"class": pack.getKey()+"text"},
                  "'",
                  FOR("line", "$node.value|lineIterator", "$line.value",
                      IF("$line.more", BR())),
                  "'"),
        
        shortTag: SPAN({"class": pack.getKey()+"text"},
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
        }
    }
}};
