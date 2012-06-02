var httpProxy = require('http-proxy');
var fs = require('fs');

var proxy = {"router":{}};
var file = 'table.json';

exports.writeroute = writeroute;
exports.generate = generate;

function generate(proxyoptions, middleware){
	var proxyport = 9000;
	var proxyServer = httpProxy.createServer(proxyoptions, middleware).listen(proxyport);
}

function writeroute (from, to){
	proxy.router[from] = to;
	var output = JSON.stringify(proxy);
    fs.writeFileSync(file, output);
}