// var socketio = io.connect("192.168.0.201:1337");
 
var strVar="";
strVar += " <div><div class=\"header\"><div class=\"topcoat-navigation-bar\">";
strVar += "			<div class=\"topcoat-navigation-bar__item center full\">";
strVar += "		<h1 class=\"topcoat-navigation-bar__title\">Deurbel Asterstraat<\/h1>";
strVar += "<\/div><\/div><div id=\"btn\"><\/div><\/div>";

strVar += "<div class =\"scroller\"><div class=\"topcoat-tab-bar full\">";
strVar += "   <label class=\"topcoat-tab-bar__item\">";
strVar += "     <input type=\"radio\" name=\"topcoat\">";
strVar += "     <a class=\"topcoat-tab-bar__button full\" href=\"{{hashHome}}\">Foto<\/a>";
strVar += "   <\/label>";
strVar += "   <label class=\"topcoat-tab-bar__item\">";
strVar += "     <input type=\"radio\" name=\"topcoat\">";
strVar += "     <a class=\"topcoat-tab-bar__button full\" href=\"#page2\">Video<\/a>";
strVar += "   <\/label>";
strVar += "<\/div>";
strVar += "<header>";
strVar += "<h2>{{name}}<\/h2>";
strVar += "<\/header>";
strVar += "{{htmlBody}} <\/div><\/div>";




var homePage = ""
   homePage += "<div class=\"topcoat-list\">";
homePage += "  <h3 class=\"topcoat-list__header\">Aangebeld<\/h3>";
homePage += "  <ul class=\"topcoat-list__container\" id=\"lijst\">";
homePage += "   <\/ul>";
homePage += "<\/div>";



var slider = new PageSlider($("#container"));
$(window).on('hashchange', route);
var oldUrl;

// Basic page routing
function route(event) {
    var page,
        hash = window.location.hash;
	
    //if (hash === "#page1") {
       // page = merge(strVar, {htmlBody:  "<img src=\"http://83.83.3.214:1337/lastsnap.jpg\" alt=\"Laatste snapshot\"><\/img><p><\/p><div id =\"content\"><button class=\"topcoat-button\" id=\"more\" >Meer foto's..<\/button><\/p></div>", name: "Laatste foto", hashHome: "#"});
		//if (oldUrl === "#page3"){
		//slider.slidePageFrom($(page), "left");
		//}else{		
        //slider.slidePageFrom($(page), "right");
		//}
		
	
		
    if (hash === "#page2") {
		oldUrl = hash;
        page = merge(strVar, {htmlBody: "<img src=\"http:\/\/192.168.1.101:8081\/\" alt=\"Dit werkt alleen via de Wifi van Ted Bafland.\"><\/img><p><button class=\"topcoat-button\" onClick=\"window.location.reload()\">Reload<\/button><\/p>", name: "Camera", hashHome: "#"});
        slider.slidePageFrom($(page), "right");
		
		
		
	
    }
	else{
	 var foto2 = window.localStorage.getItem('foto2');
	 var foto3 = window.localStorage.getItem('foto3');
	 var foto4 = window.localStorage.getItem('foto4');
	
	page = merge(strVar, {htmlBody: "<button id=\"registratie\" class=\"topcoat-button\">Update<\/button><p><div id =\"content\"><div id=\"registratieTabel\"></div></div></div>", name: "Laatste Bel", hashHome: "#"});
	slider.slidePageFrom($(page), "left");
	oldUrl = hash;

	
	}


    //slider.slidePageFrom($(page), "left");

}

// Primitive template processing. In a real-life app, use Handlerbar.js, Mustache.js or another template engine
function merge(tpl, data) {
    return tpl.replace("{{htmlBody}}", data.htmlBody)
			.replace("{{name}}", data.name)
             .replace("{{hashHome}}", data.hashHome)
}

route();

//// socket io connectie
function onDeviceReady() {
//$( document ).ready(function() {
  // Handler for .ready() called.
console.log("Ready Doc");
var socket = io.connect('http://192.168.0.201:3000');
	console.log("connected");
	
socket.on("regidb", function(data) {
	
	if (typeof data[0] === "object"){	
		var content = "<div id=\"registratieTabel\"><table data-role=\"table\" class=\"ui-responsive table-stroke ui-shadow\"><thead>"
			content += "<tr><th data-priority=\"1\">Datum</th></tr></thead><tbody>"
			for(i=0; i<data.length; i++){
				content += '<tr><td>'+ data[i].Tijd + '</td></tr>';
			}
			content += "</tbody></table></div>"
	
		$( '#registratieTabel' ).replaceWith(content);
		}
	});
	

  socket.on('news', function (data) {
    console.log(data);
    socket.emit('my other event', { my: 'data' });
  });

  $('#registratie').click(function(){
	console.log("clicked");
	socket.emit("registratie", { "message" : "registratie"});
});

};

