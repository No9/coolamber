var fs = require("fs"),
	path = require('path'),
	httpProxy = require('http-proxy'),
	broadway = require('broadway'),
	httpServer = require('http-server');

var app = new broadway.App();
var menu = [];
var dir = "./apps";
var proxyoptions = {
  router: {}
};

function loadapps()
{
    fs.readdir(dir, function (err, list) {
        // Return the error if sometvar request = require('request');hing went wrong
        if (err)
          return action(err);
        
        // For every file in the list
        list.forEach(function (file) {
          var path = dir + "/" + file;
          fs.stat(path, function (err, stat) {
            console.log(file);
            // If the file is a directory
            if (stat && stat.isDirectory()) {
              console.log("using:" + path);
              
              //Read Package
              var config = require(path + '/config');
              if(config.name != undefined)
			  {
				var menuitem = {};
				  menuitem.id = config.name;
				  menuitem.displaytext = config.displaytext;
				  menu.push(menuitem);
			  }  

			  if(config.applicationtype == "static")
			  {
			  	//Create a web server and proxy to it.
				var port = config.port || 8080,
				    host = config.domain || '0.0.0.0',
				    log = console.log;

				var options = {
				  root: "./apps/" + config.name,
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

				if(config.name == "home"){
					proxyoptions.router["localhost/"] = config.domain + ":" + config.port;
				}
			  	proxyoptions.router["localhost/" + config.name] = config.domain + ":" + config.port;
			  	console.log("creating proxy")
				console.log(proxyoptions)
				var proxyServer = httpProxy.createServer(proxyoptions);
				proxyServer.listen(8080);

			   }else if (config.applicationtype == "managed"){
			   		app.use(require(path + '/app'));
			   }else if(config.applicationtype == "remote"){
			   		console.log("WARNING: remote not implemented");
			   }else{
			   		console.log("ERROR: Unknown applicationtype " + config.applicationtype + " in " + config.name)
			   }

				

			  	
			  
			  /**/
              app.init(function (err){
                if(err){
                    console.log(err);
                }
              });
            }
          });
        });
		
    });
}

loadapps();
		

