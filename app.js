var	broadway = require('broadway');
var fs = require("fs");
var app = new broadway.App();
var nextavailableport = 8080;
var menu = [];
var dir = "./apps";
var proxyoptions = {
  router: {}
};
var proxyport = 9000;

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
            
            // If the file is a directory
            if (stat && stat.isDirectory()) {
              console.log(("using:" + path).yellow);
              
              //Read Package
              var config = require(path + '/config');
			  config.port = config.port || nextavailableport;
			  nextavailableport++;
			  
			  if(config.name != undefined){
				var menuitem = {};
				  menuitem.id = config.name;
				  menuitem.displaytext = config.displaytext;
				  menu.push(menuitem);
			  }else{
				return;
			  }

			  if(config.applicationtype == "static"){
					require('./lib/staticserver.js').generate(config);
			  }else if (config.applicationtype == "managed"){
			   		app.use(require(path + '/app'));
			   }else if(config.applicationtype == "remote"){
					
			   }else{
			   		console.log("ERROR: Unknown applicationtype " + config.applicationtype + " in " + config.name)
			   }
			   
			   if(config.name == "home"){
				 proxyoptions.router["localhost/"] = config.domain + ":" + config.port;
			   }
				proxyoptions.router["localhost/" + config.name] =  config.domain + ":" + config.port;
			   
			   
			  /**/
              app.init(function (err){
                if(err){
                    console.log(err);
                }
              });
            }
          });
        });
		require('./lib/proxyserver.js').generate(proxyoptions);
    });
}

loadapps();
		

