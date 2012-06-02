var	broadway = require('broadway');
var fs = require("fs");
var app = new broadway.App();
var nextavailableport = 8080;
var menu = [];
var dir = "./apps";
var actionsdir = "./assets/actions";
var actions = [];

var proxyoptions = {
  router: {}
};

var proxyport = 9000;
process.setMaxListeners(0);


loadhtmlactions()
loadapps()
function loadhtmlactions(){

	var actionslist = fs.readdirSync(actionsdir);
	for (var i = actionslist.length - 1; i >= 0; i--) {
		var filecontent = fs.readFileSync(actionsdir + "/" + actionslist[i], 'utf8').split("{{html}}");
		var removedext = actionslist[i].split(".");
		//var querylist = removedext[0].split("_"); 
		var simpleaction = {};
		simpleaction.query = removedext[0];

		simpleaction.func = function (node) {
			node.replace(function (html) {
				return filecontent[0] + html + filecontent[1]; 
			});
		};
		actions.push(simpleaction);
	}
}
	// fs.readdir(actionsdir, function (err, list) {
	// 	if (err)
 //          return action(err);
 //      list.forEach(function (file) {
 //          var path = actionsdir + "/" + file;
 //          fs.stat(path, function (err, stat) {
 //          		console.log(path);
	// 		    var simpleaction = {};
	// 			simpleaction.query = '.b';
	// 			simpleaction.func = function (node) {
	// 		    	node.replace(function (html) {
	// 		        	return '<div>+ Trumpet</div>';
	// 		        });
	// 		    } 
	// 			actions.push(simpleaction);
 //          });
 //      });
	// });


function loadapps()
{
	
	

	var harmon = require('harmon').harmon(actions) 
	proxyoptions = { router: 'table.json' };
	require('./lib/proxyserver.js').generate(proxyoptions, harmon);

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
			   
				require('./lib/proxyserver.js').writeroute("localhost/" + config.name, config.domain + ":" + config.port);
				
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