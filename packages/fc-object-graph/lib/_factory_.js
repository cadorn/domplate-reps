
var FACTORY = require("factory", "template-pack");


exports.Factory = function() {
    var Factory = function() {};
    Factory.prototype = FACTORY.Factory(module);
    var self = new Factory();

    self.registerTemplate("text");
    self.registerTemplate("constant");
    self.registerTemplate("array");
    self.registerTemplate("map");
    self.registerTemplate("reference");
    self.registerTemplate("dictionary");
    
    return self;
}
