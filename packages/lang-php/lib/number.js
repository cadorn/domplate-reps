
var DOMPLATE = require("domplate", "domplate");


with (DOMPLATE.tags) {

    exports.rep = DOMPLATE.domplate({

        tag: SPAN({"class": "__domrep__php-number"},
                      "$object"),
        
        shortTag: SPAN({"class": "__domrep__php-number"},
                            "$object"),

        supportsObject: function(object, type) {
            return type == "number";
        }
        
    });

}