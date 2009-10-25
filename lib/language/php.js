
var REPS = require("reps", "domplate");


var collection = REPS.Collection();

// Load all reps

collection.addRep(require("./php/string"));


// Load all css

collection.addCss(require.loader.resolve("./php.css", module.id));


exports.getCollection = function()
{
    return collection;
}