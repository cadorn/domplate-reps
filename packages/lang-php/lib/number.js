
var DOMPLATE = require("domplate", "domplate");


with (DOMPLATE.tags) {

    exports.rep = DOMPLATE.domplate({

        tag: DIV({class: "__domplate_rep__"},
                 SPAN({class: "php-number"},
                      "$object")),
        
        shortTag: DIV({class: "__domplate_rep__"},
                       SPAN({class: "php-number"},
                            "$object")),

        supportsObject: function(object, type) {
            return type == "number";
        }
        
    });

}