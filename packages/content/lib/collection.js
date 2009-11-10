
var COLLECTION = require("collection", "domplate");


var collection = COLLECTION.Collection();

// Load all reps

//collection.addRep(require("./trace"));


// Load all css

collection.addCss(require.loader.resolve("../resources/collection.css", module.id), module["package"]);


exports.getCollection = function()
{
    return collection;
}
