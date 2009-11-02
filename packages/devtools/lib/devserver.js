
var JACKUP = require("jackup", "github.com/cadorn/narwhal/raw/experimental/catalogs/jack");
var SERVER = require("server", "github.com/cadorn/domplate-reps/raw/master/devtools");

exports.jackup = function(args) {
    args.shift();
    args.unshift(module.path);
    args.unshift("-r");         // reload application on each request
    args.unshift("jackup");

    JACKUP.main(args);
}

exports.app = function (env) {
    return SERVER.app(env);
}

