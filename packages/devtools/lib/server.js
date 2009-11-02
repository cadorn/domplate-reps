

function dump(obj) { print(require('test/jsdump').jsDump.parse(obj)) };

var UTIL = require("util");
var FILE = require("file");
var JACK_UTIL = require("jack/utils", "jack");
var JACK = require("jack", "jack");

var PHP_LANGUAGE_REPS = require("collection", "reps-lang-php").getCollection();




var app = function (env) {

    var parts = env.PATH_INFO.split("/");
    if(parts[1]=="packages") {
        parts.shift();
        parts.shift();
        var file = FILE.Path(system.env.SEA).join("using").join(parts.join("/"));
        if(!file.exists()) {
            return JACK_UTIL.responseForStatus(404, env.PATH_INFO);
        } else {
            return JACK.ContentType(function(env) {
                return {
                    "status": 200,
                    "headers": {},
                    "body": [
                        file.read('b')
                    ]
                };
            })(env);
        }
    } else
    if(parts[1]=="event") {

//        var embed = getEmbed();

dump(JACK_UTIL.parseQuery(env.QUERY_STRING));

        return {
            "status": 200,
            "headers": {"Content-type": "text/html"},
            "body": [
                "This is the response"
            ]
        };

    } else {
        
        try {    
            
            var embed = getEmbed();

dump(embed);

            return {
                "status": 200,
                "headers": {"Content-type": "text/html"},
                "body": [
                    "<html><head><style>" + embed.style + "</style>" +
                    "<script>var rep = " + embed.html + ";</script>" +
                    "<script>window.onload = function() { rep(document.getElementById(\"canvas\")) }</script>" +
                    "</head><body><div id=\"canvas\"></div><br><br>"+
                    "<hr><br><br><pre>"+embed.html.replace(/</g, "&lt;")+"</pre>"+
                    "<hr><br><br><pre>"+embed.style.replace(/</g, "&lt;")+"</pre>"+
                    "</body></html>"
                ]
            };
        } catch(e) {
            print(e);
            throw e;
        }
    }

};

exports.app = JACK.ContentLength(app);



function getEmbed() {

    var data = getData(),
        css = PHP_LANGUAGE_REPS.getCss();

    var rep = PHP_LANGUAGE_REPS.getForObject(data);

    var embed = rep.tag.generateStaticEmbed({
        "object": data
    }, {
        "eventBaseURL": "/event/"
    });
    
    embed.style = "";
    
    css.forEach(function(item) {
        
        var code = item.getCode();
        
        embed.style += replaceTemplateVariables(code, item.getPackageId());
    })
    
    return embed;
}



function getData() {
    
    return {"k1": "v1", "k2": {"ss":"dsdsf"}, "k3":["sdfsdf",{"sdsdf":{"sdffee":"efefe"}}]};
    
}


function replaceTemplateVariables(code, pkgId) {
    code = code.replace(/__Package.ResourcesBaseURL__/g, "/packages/" + pkgId + "/resources/");
    return code;
}
