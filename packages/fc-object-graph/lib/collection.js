
var COLLECTION = require("collection", "domplate");


var collection = COLLECTION.Collection();

// Load all reps

collection.addRep(require("./text"));
collection.addRep(require("./constant"));
collection.addRep(require("./array"));
collection.addRep(require("./map"));
collection.addRep(require("./reference"));
collection.addRep(require("./dictionary"));

// Load all css

collection.addCss(require.loader.resolve("../resources/collection.css", module.id), module["package"]);


exports.getCollection = function()
{
    return collection;
}
