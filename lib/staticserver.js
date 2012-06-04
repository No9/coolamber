var httpServer = require('http-server');
var fs = require("fs");
var	path = require('path');
	

exports.generate = function(basedir, config, applog, cb)
	{
		//Create a web server and proxy to it.
		var port = config.port,
			host = config.domain || '0.0.0.0',
			log = applog || console.log;
		
		
		var options = {
		  root: basedir + config.name,
		  autoIndex: true,
		  cache: true
		}
		function onListening() {
		  log('Starting up http-server, serving '.yellow
			+ server.root.cyan
			+ ' on port: '.yellow
			+ port.toString().cyan);
		  log('Hit CTRL-C to stop the server');
		}

		var server = httpServer.createServer(options);
		server.listen(port, host, onListening);
	}
	