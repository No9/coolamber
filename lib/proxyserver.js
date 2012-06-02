var httpProxy = require('http-proxy');

exports.generate = function(proxyoptions){
	var proxyport = 9000;
	console.log('Creating proxy');
	console.log(proxyoptions);
	var proxyServer = httpProxy.createServer(proxyoptions);
	proxyServer.listen(proxyport);
}

exports.writeoptions(proxyoptions)
{
}