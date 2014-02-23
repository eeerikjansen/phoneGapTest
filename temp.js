
var strVar="";

strVar += "<div><div class=\"topcoat-tab-bar full\">";
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
strVar += "{{htmlBody}}";




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
	
    if (hash === "#page1") {
        page = merge(strVar, {htmlBody:  "<img src=\"http://83.83.3.214:1337/lastsnap.jpg\" alt=\"Laatste snapshot\"><\/img><p><button class=\"topcoat-button\" id=\"more\" >Meer foto's..<\/button><\/p><div id =\"content\"></div>", name: "Laatste foto", hashHome: "#"});
		if (oldUrl === "#page3"){
		slider.slidePageFrom($(page), "left");
		}else{		
        slider.slidePageFrom($(page), "right");
		}
		
	
		
    } else if (hash === "#page2") {
		oldUrl = hash;
        page = merge(strVar, {htmlBody: "<img src=\"http:\/\/192.168.1.101:8081\/\" alt=\"Dit werkt alleen via de Wifi van Ted Bafland.\"><\/img><p><button class=\"topcoat-button\" onClick=\"window.location.reload()\">Reload<\/button><\/p>", name: "Camera", hashHome: "#"});
        slider.slidePageFrom($(page), "right");
		
		
		
	
    }
	else{
	page = merge(strVar, {htmlBody: "<img src=\"http://83.83.3.214:1337/lastsnap.jpg\" alt=\"Laatste snapshot\"><\/img><p><button class=\"topcoat-button\" id=\"more\" >Meer foto's..<\/button><\/p><div id =\"content\"></div>", name: "Laatste foto", hashHome: "#"});
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




    