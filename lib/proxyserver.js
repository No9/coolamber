var httpProxy = require('http-proxy');
var fs = require('fs');

exports.generate = function(proxyoptions){
	var proxyport = 9000;
	/*console.log('Creating proxy');
	console.log(proxyoptions);*/
	var proxyServer = httpProxy.createServer(proxyoptions);
	proxyServer.listen(proxyport);
}

exports.writeroute = function(from, to){
	var file = 'table.json';

	fs.readFile(file, 'utf8', function (err, data) {
  		if (err) {
    			console.log('Error: ' + err);
    			return;
    		}

    	 proxy = JSON.parse(data); 
    	 proxy.router[from] = to;		
		 var output = JSON.stringify(proxy);

    	 fs.writeFile(file, output, function(err) {
			    if(err) {
			        console.log(err);
			    } else {
			        console.log("The file was saved! with" + output);
			    }
			});
    });
	
}