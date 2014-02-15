
var strVar="";

strVar += "<div><div class=\"topcoat-tab-bar full\">";
strVar += "   <label class=\"topcoat-tab-bar__item\">";
strVar += "     <input type=\"radio\" name=\"topcoat\">";
strVar += "     <a class=\"topcoat-tab-bar__button full\" href=\"{{hashHome}}\">Lijst<\/a>";
strVar += "   <\/label>";
strVar += "   <label class=\"topcoat-tab-bar__item\">";
strVar += "     <input type=\"radio\" name=\"topcoat\">";
strVar += "     <a class=\"topcoat-tab-bar__button full\" href=\"#page2\">Foto<\/a>";
strVar += "   <\/label>";
strVar += "   <label class=\"topcoat-tab-bar__item\">";
strVar += "     <input type=\"radio\" name=\"topcoat\">";
strVar += "     <a class=\"topcoat-tab-bar__button full\" href=\"#page3\">Video<\/a>";
strVar += "   <\/label>";
strVar += "<\/div>";
strVar += "<header>";
strVar += "<h2>{{name}}<\/h2>";
strVar += "<\/header>";
strVar += "{{htmlBody}}";




var homePage = ""
   homePage += "<div class=\"topcoat-list\">";
homePage += "  <h3 class=\"topcoat-list__header\">Aangebeld<\/h3>";
homePage += "  <ul class=\"topcoat-list__container\" id=\"lijst\">";
homePage += "   <\/ul>";
homePage += "<\/div>";
homePage += "<p id=\"btn\"><\/p>";



var slider = new PageSlider($("#container"));
$(window).on('hashchange', route);
var oldUrl;
var hammertime = Hammer(document.body);
// Basic page routing
function route(event) {
    var page,
        hash = window.location.hash;
	
    if (hash === "#page2") {
        page = merge(strVar, {htmlBody:  "<img src=\"http://delisle.saskatooncatholic.ca/sites/delisle.saskatooncatholic.ca/files/sample-1.jpg\" alt=\"Laatste snapshot\"><\/img>", name: "Laatste foto", hashHome: "#"});
		if (oldUrl === "#page3"){
		slider.slidePageFrom($(page), "left");
		}else{		
        slider.slidePageFrom($(page), "right");
		}
		
		hammertime.on("swipeleft dragleft", function(ev) {
        location.href='#page3';
		
		});
		hammertime.on("swiperight dragright", function(ev) {
        location.href='#';
		
		});
		
    } else if (hash === "#page3") {
		oldUrl = hash;
        page = merge(strVar, {htmlBody: "<img src=\"http:\/\/192.168.1.100:8081\/\" alt=\"Dit werkt alleen via de Wifi van Ted Bafland.\"><\/img><button class=\"topcoat-button\" onClick=\"window.location.reload()\">Reload<\/button>", name: "Camera", hashHome: "#"});
        slider.slidePageFrom($(page), "right");
		
		
		hammertime.on("swiperight", function(ev) {
        location.href='#page2';
		
		});
		hammertime.on("swipeleft", function(ev) {
      
		
		});
	
    }
	else{
	page = merge(strVar, {htmlBody: homePage, name: "Bel-lijst", hashHome: ""});
	slider.slidePageFrom($(page), "left");
	oldUrl = hash;
	hammertime.on("swipeleft", function(ev) {
        location.href='#page2';
		
		});
	hammertime.on("swiperight", function(ev) {
        
		
		});
	
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




    