
var DOMPLATE = require("domplate", "domplate");


with (DOMPLATE.tags) {

    exports.rep = DOMPLATE.domplate({

        tag: DIV({class: "__domplate_rep__"},
                 SPAN({class: "php-string"},
                      "'$object'")),
        
        shortTag: DIV({class: "__domplate_rep__"},
                       SPAN({class: "php-string"},
                            "'$object|cropString'")),

        
        supportsObject: function(object, type){
            return type == "string";
        },
        
        
        cropString: function(text, limit){
            text = text + "";
            
            if (!limit) 
                var halfLimit = 50;
            else 
                var halfLimit = limit / 2;
            
            if (text.length > limit) 
                return this.escapeNewLines(text.substr(0, halfLimit) + "..." + text.substr(text.length - halfLimit));
            else 
                return this.escapeNewLines(text);
        },
        
        escapeNewLines: function(value){
            return value.replace(/\r/g, "\\r").replace(/\n/g, "\\n");
        }
        
    });

}