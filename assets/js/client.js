window.onload = function() {
	if (typeof XMLHttpRequest == "undefined")
  			XMLHttpRequest = function () {
    try { return new ActiveXObject("Msxml2.XMLHTTP.6.0"); }
      catch (e) {}
    try { return new ActiveXObject("Msxml2.XMLHTTP.3.0"); }
      catch (e) {}
    try { return new ActiveXObject("Microsoft.XMLHTTP"); }
      catch (e) {}
    //Microsoft.XMLHTTP points to Msxml2.XMLHTTP and is redundant
    throw new Error("This browser does not support XMLHttpRequest.");
  	};
		
		var httpmenu = new XMLHttpRequest();
		httpmenu.open("GET", "/menu", true);
		httpmenu.onreadystatechange = function() {
			if(httpmenu.readyState == 4 && httpmenu.status == 200) {
				//var html = '<div class="menuitem" id="/" onclick="menuclick(this)"></div>';
				var html = '<li class="single-link" id="/" onclick="menuclick(this)"></li>';
				
				var data = JSON.parse(httpmenu.responseText);
				var map = Plates.Map();
				map.cls('single-link').to('displaytext');
				map.where('id').is('/').insert('id');
				var output = Plates.bind(html, data, map);
				
				document.getElementById('menu').innerHTML = output;
			}
		}
		
		httpmenu.send();
		window.frames["appFrame"].document.location.href = "/home.html";		
}

function menuclick(obj) { 
	window.frames["appFrame"].document.location.href = "/" + obj.id.toLowerCase(); 
}