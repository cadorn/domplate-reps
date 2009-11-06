
var UTIL = require("util");
var DOMPLATE = require("domplate", "domplate");
var DEFAULT_REP = require("default-rep", "domplate");


with (DOMPLATE.tags) {

    exports.rep = DOMPLATE.domplate(DEFAULT_REP.extend({

        toString: function() {
            return "[lang-php/class]";
        },

        tag:
            SPAN({"class": "__domrep__lang-php-class"}, SPAN("$object|getClassName("),
                FOR("item", "$object|memberIterator",
                    DIV({"class": "member"},
                        SPAN({"class": "$item.nameObject|getMemberNameClasses"}, "$item.nameObject|getMemberNameValue"),
                        SPAN({"class":"delim"}, "="),
                        TAG("$item.valueTag", {"object": "$item.valueObject"})
                    )
                ),
            SPAN(")")),            

        getClassName: function(object) {
            return object['__className'];
        },
        
        getMemberNameClasses: function(object) {
            var parts = object.split(":");
            var classes = [parts[0]];
            return classes.join(" ");
        },
        
        getMemberNameValue: function(object) {
            return object.split(":").pop();
        },
        
        memberIterator: function(object) {
            var members = [];
            var self = this;
            UTIL.every(object, function(item) {
                if(item[0]=="__className") return;
                members.push({
                    "nameObject": item[0],
//                    "nameTag": self.getRepForObject(item[0]).tag,
                    "valueObject": item[1],
                    "valueTag": self.getRepForObject(item[1]).tag
                });
            });
            return members;
        },


      shortTag:
        DIV({"class": "__domplate_rep__"},
            SPAN({"class": "php-string"}, "$object|getClassName("),
            SPAN({"class": "props"},
            FOR("item", "$object|propIterator",
                TAG("$item.nameTag", {"object": "$item.nameObject"}),
                SPAN("=>"),
                TAG("$item.valueTag", {"object": "$item.valueObject"}),
                
                SPAN({"class": "arrayComma"}, "$item.delim")
            )
            ),
            SPAN(")")
        ),


    propIterator: function (object)
    {
        if (!object)
            return [];

        var props = [];
        var len = 0;

        try
        {
            var i = 0;
            for (var name in object)
            {
                if(name!='__className') {
                
                  var val;
                  try
                  {
                      val = object[name];
                  }
                  catch (exc)
                  {
                      continue;
                  }
  
                  var nameRep = this.getRepForObject(name);
                  var nameTag = nameRep.shortTag ? nameRep.shortTag : nameRep.tag;
      
                  var valueRep = this.getRepForObject(val);
/*
                  if(i>=2) {
                    valueRep = FirebugReps.FirePHPMore;
                  }
*/                  
                  var valueTag = valueRep.shortTag ? valueRep.shortTag : valueRep.tag;
      
                  var elementName = name;
                  var index  = elementName.lastIndexOf(':');
                  if(index!=-1) {
                    elementName = elementName.substr(index+1);
                  }      

                  props.push({nameObject: elementName, nameTag: nameTag,
                              valueObject: val, valueTag: valueTag, delim: ', '});
                      
                  if(i>=2) {
                    break;
                  }        
                  i++;
              }
            }
            
            props[props.length-1].delim = '';
        }
        catch (exc)
        {
            // Sometimes we get exceptions when trying to read from certain objects, like
            // StorageList, but don't let that gum up the works
            // XXXjjb also History.previous fails because object is a web-page object which does not have
            // permission to read the history
        }

        return props;
    },

    
        supportsObject: function(object, type)
        {
            if(type=="object" && object['__className']) return true;
        }
        
    }));

}


