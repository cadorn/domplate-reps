
function dump(obj) { print(require('test/jsdump').jsDump.parse(obj)) };


var DOMPLATE = require("domplate", "domplate");

with (DOMPLATE.tags) {

    exports.rep = DOMPLATE.domplate({

        tag: SPAN({"class": "__domrep__php-trace"},
                      "trace: $object"),
        
        shortTag: SPAN({"class": "__domrep__php-trace"},
                            "trace: $object"),

        supportsObject: function(object, type, meta) {
            return (meta.Type=="TRACE");
        }
        
    });

}