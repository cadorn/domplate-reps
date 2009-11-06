
var DOMPLATE = require("domplate", "domplate");


with (DOMPLATE.tags) {

    exports.rep = DOMPLATE.domplate({

        tag: SPAN({"class": "__domrep__php-null"},
                      "$object"),
        
        shortTag: SPAN({"class": "__domrep__php-null"},
                            "$object"),

        supportsObject: function(object, type) {
            return (type=="object" && object==null);
        }
        
    });

}