
var DOMPLATE = require("domplate", "domplate");


with (DOMPLATE.tags) {

    exports.rep = DOMPLATE.domplate({

        tag: SPAN({"class": "__domrep__php-boolean"},
                      "$object"),
        
        shortTag: SPAN({"class": "__domrep__php-boolean"},
                            "$object"),

        supportsObject: function(object, type) {
            return type == "boolean";
        }
        
    });

}