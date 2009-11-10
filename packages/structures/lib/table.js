
var UTIL = require("util");
var DOMPLATE = require("domplate", "domplate");
var DEFAULT_REP = require("default-rep", "domplate");


with (DOMPLATE.tags) {

    exports.rep = DOMPLATE.domplate(DEFAULT_REP.extend({

        toString: function() {
            return "[structures/table]";
        },

        tag:
            SPAN({"class": "__domrep__structures-table"},
                "table"
            ),            

        supportsObject: function(object, type, meta)
        {
            return (meta && meta.Type=="TABLE");
        }
        
    }));

}


