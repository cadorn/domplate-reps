

function dump(obj) { print(require('test/jsdump').jsDump.parse(obj)) };


var UTIL = require("util");
var DOMPLATE = require("domplate", "domplate");
var DEFAULT_REP = require("default-rep", "domplate");


with (DOMPLATE.tags) {

    exports.rep = DOMPLATE.domplate(DEFAULT_REP.extend({

        toString: function() {
            return "[lang-php/array]";
        },

        tag:
            SPAN({"class": "__domrep__lang-php-array"}, SPAN("array("),
                FOR("item", "$object|memberIterator",
                    DIV({"class": "item"},
                        SPAN("["),
                        TAG("$item.nameTag", {"object": "$item.nameObject"}),
                        SPAN("]"),
                        SPAN({"class":"delim"}, "=>"),
                        TAG("$item.valueTag", {"object": "$item.valueObject"})
                    )
                ),
            SPAN(")")),

        memberIterator: function(object) {
            var members = [];
            var self = this;
            if(UTIL.isArrayLike(object)) {
                var index = 0;
                UTIL.forEach(object, function(item) {
                    members.push({
                        "nameObject": index,
                        "nameTag": self.getRepForObject(index).tag,
                        "valueObject": item,
                        "valueTag": self.getRepForObject(item).tag
                    });
                    index++;
                });
            } else {
                UTIL.every(object, function(item) {
                    members.push({
                        "nameObject": item[0],
                        "nameTag": self.getRepForObject(item[0]).tag,
                        "valueObject": item[1],
                        "valueTag": self.getRepForObject(item[1]).tag
                    });
                });
            }
            return members;
        },

        supportsObject: function(object, type)
        {
            return (type=="object" && UTIL.isArrayLike(object));
        }
        
    }));

}


