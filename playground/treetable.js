
var DOMPLATE = require("domplate", "domplate");
var DEFAULT_REP = require("default-rep", "domplate");


with (DOMPLATE.tags) {

    exports.rep = DOMPLATE.domplate(DEFAULT_REP.extend({

        shortTag: DIV({"class": "__domplate_rep__"},
                       SPAN({"class": "php-object"},
                            "$object")),
    
      tag:
        DIV({"class": "__domplate_rep__"}, TABLE({"class": "php-object", "onclick": "$onClick"},
          TBODY(
            FOR("member", "$object|memberIterator",
              TAG("$row", {"member": "$member"}))
          )
        )),
    
      row:
        TR({"class": "treeRow", "$hasChildren": "$member.hasChildren",
            "_repObject": "$member", "level": "$member.level"},
          TD({"style": "padding-left: $member.indent\\px"},
            DIV({"class": "treeLabel"},
                "$member.name")
          ),
          TD(
            DIV("$member.label")
          )
        ),
    
      loop:
        FOR("member", "$members",
          TAG("$row", {"member": "$member"})),
    
    
      memberIterator: function(object)
      {
        return this.getMembers(object);
      },
    
      onClick: function(event)
      {
        if (!this.isLeftClick(event))
          return;
    
        var row = this.getAncestorByClass(event.target, "treeRow");
        var label = this.getAncestorByClass(event.target, "treeLabel");
        if (label && this.hasClass(row, "hasChildren"))
          this.toggleRow(row);
      },
    
      toggleRow: function(row)
      {
        var level = parseInt(row.getAttribute("level"));
    
        if (this.hasClass(row, "opened"))
        {
          this.removeClass(row, "opened");

          var tbody = row.parentNode;
          for (var firstRow = row.nextSibling; firstRow;
               firstRow = row.nextSibling)
          {
            if (parseInt(firstRow.getAttribute("level")) <= level)
              break;
            tbody.removeChild(firstRow);
          }
        }
        else
        {
          this.setClass(row, "opened");
    
          var repObject = row.repObject;
          if (repObject) {
            var members = this.getMembers(repObject.value, level+1);
            if (members)
              this.loop.insertRows({members: members}, row);
          }
        }
      },
    
      getMembers: function(object, level)
      {
        if (!level)
          level = 0;
    
        var members = [];
        for (var p in object)
          members.push(this.createMember(p, object[p], level));
    
        return members;
      },
    
      createMember: function(name, value, level)
      {
        var hasChildren = (typeof(value) == "object");
        return {
          name: name,
          label: hasChildren ? "" : value,
          value: value,
          level: level,
          indent: level*16,
          hasChildren: hasChildren
        };
      },
    
        supportsObject: function(object, type) {
            return type == "object";
        }
        
    }));

}


