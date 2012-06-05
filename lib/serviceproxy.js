var httpProxy = require('http-proxy');
var fs = require('fs');

var proxy = {"router":{}};
var file = 'servicetable.json';

exports.writeroute = writeroute;
exports.generate = generate;

function generate(proxyoptions){
	var proxyport = 9001;
	var proxyServer = httpProxy.createServer(proxyoptions).listen(proxyport);
}

function writeroute (from, to){
	proxy.router[from] = to;
	var output = JSON.stringify(proxy);
    fs.writeFileSync(file, output);
}