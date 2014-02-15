 // Call onDeviceReady when PhoneGap is loaded.
    //
    // At this point, the document has loaded but phonegap-1.0.0.js has not.
    // When PhoneGap is loaded and talking with the native device,
    // it will call the event `deviceready`.
    // 
    document.addEventListener("deviceready", onDeviceReady, false);
	window.addEventListener('load', function () {
    new FastClick(document.body);
}, false);

    // PhoneGap is loaded and it is now safe to make calls PhoneGap methods
    //
	var devid;
	
           var pushNotification;
            
            function onDeviceReady() {
                //$("#app-status-ul").append('<li>deviceready event received</li>');
                
				var applaunchCount = window.localStorage.getItem('launchCount');
				
				if(applaunchCount){
					//This is a second time launch, and count = applaunchCount
					$( "#btn" ).hide();
				}else{
					//Local storage is not set, hence first time launch. set the local storage item
				window.localStorage.setItem('launchCount',1);

					//Do the other stuff related to first time launch
					}
				
				/* document.addEventListener("backbutton", function(e)
				{
                	//$("#app-status-ul").append('<li>backbutton event received</li>');
  					
      				if( $("#home").length > 0)
					{
						// call this to get a new token each time. don't call it to reuse existing token.
						//pushNotification.unregister(successHandler, errorHandler);
						e.preventDefault();
						navigator.app.exitApp();
					}
					else
					{
						navigator.app.backHistory();
					}
				}, false); */

				try 
				{ 
                	pushNotification = window.plugins.pushNotification;
                	if (device.platform == 'android' || device.platform == 'Android') {
						//$("#app-status-ul").append('<li>registering android</li>');
                    	pushNotification.register(successHandler, errorHandler, {"senderID":"583383190283","ecb":"onNotificationGCM"});		// required!
					} else {
						//$("#app-status-ul").append('<li>registering iOS</li>');
                    	pushNotification.register(tokenHandler, errorHandler, {"badge":"true","sound":"true","alert":"true","ecb":"onNotificationAPN"});	// required!
                	}
                }
				catch(err) 
				{ 
					txt="There was an error on this page.\n\n"; 
					txt+="Error description: " + err.message + "\n\n"; 
					alert(txt); 
				} 
            }
            
            // handle APNS notifications for iOS
            function onNotificationAPN(e) {
                if (e.alert) {
                     //$("#app-status-ul").append('<li>push-notification: ' + e.alert + '</li>');
                     navigator.notification.alert(e.alert);
                }
                    
                if (e.sound) {
                    var snd = new Media(e.sound);
                    snd.play();
                }
                
                if (e.badge) {
                    pushNotification.setApplicationIconBadgeNumber(successHandler, e.badge);
                }
            }
            
            // handle GCM notifications for Android
            function onNotificationGCM(e) {
                $("#app-status-ul").append('<li>EVENT -> RECEIVED:' + e.event + '</li>');
                
                switch( e.event )
                {
                    case 'registered':
					if ( e.regid.length > 0 )
					{
						$("#btn").append("<button class=\"topcoat-button\" onclick=\"window.plugins.socialsharing.share(\'"+ e.regid +"\')\">Registreren</button>");
						
						// Your GCM push server needs to know the regID before it can push to this device
						// here is where you might want to send it the regID for later use.
						console.log("regID = " + e.regid);
						
					}
                    break;
                    
                    case 'message':
                    	// if this flag is set, this notification happened while we were in the foreground.
                    	// you might want to play a sound to get the user's attention, throw up a dialog, etc.
                    	if (e.foreground)
                    	{
							//$("#app-status-ul").append('<li>--INLINE NOTIFICATION--' + '</li>');
							alert("Er is aangebeld!")
							// if the notification contains a soundname, play it.
							//var my_media = new Media("/android_asset/www/"+e.soundname);
							//my_media.play();
						}
						else
						{	// otherwise we were launched because the user touched a notification in the notification tray.
							if (e.coldstart){ alert("Op "+ e.payload.message + " is er aangebeld.")}
								//$("#app-status-ul").append('<li>--COLDSTART NOTIFICATION--' + '</li>');
							else{alert("Op "+ e.payload.message + " is er aangebeld.")}
							//$("#app-status-ul").append('<li>--BACKGROUND NOTIFICATION--' + '</li>');
						}
						
						$("#lijst").prepend('<li class="topcoat-list__item">'+ e.payload.message +'&nbsp;&nbsp;&nbsp;Er is aangebeld.'+' </li>');
						//$("#app-status-ul").append('<li>MESSAGE -> MSGCNT: ' + e.payload.msgcnt + '</li>');
                    break;
                    
                    case 'error':
						//$("#app-status-ul").append('<li>ERROR -> MSG:' + e.msg + '</li>');
                    break;
                    
                    default:
						//$("#app-status-ul").append('<li>EVENT -> Unknown, an event was received and we do not know what it is</li>');
                    break;
                }
            }
            
            function tokenHandler (result) {
                $("#app-status-ul").append('<li>token: '+ result +'</li>');
                // Your iOS push server needs to know the token before it can push to this device
                // here is where you might want to send it the token for later use.
            }

            function successHandler (result) {
                //$("#app-status-ul").append('<li>success:'+ result +'</li>');
            }
            
            function errorHandler (error) {
                //$("#app-status-ul").append('<li>error:'+ error +'</li>');
            }
			
			document.addEventListener('deviceready', onDeviceReady, true);

/////////////// render HTML ///////////

var strVar="";
strVar += "<div class=\"topcoat-navigation-bar\">";
strVar += "    <div class=\"topcoat-navigation-bar__item center full\">";
strVar += "        <h1 class=\"topcoat-navigation-bar__title\">Deurbel Asterstraat<\/h1>";
strVar += "	  <\/div>";
strVar += "	";
strVar += "<\/div>";
strVar += "";
strVar += "<div class=\"topcoat-tab-bar full\">";
strVar += "   <label class=\"topcoat-tab-bar__item\">";
strVar += "     <input type=\"radio\" name=\"topcoat\">";
strVar += "     <a href=\"#page1\"><\/a>";
strVar += "   <\/label>";
strVar += "   <label class=\"topcoat-tab-bar__item\">";
strVar += "     <input type=\"radio\" name=\"topcoat\">";
strVar += "     <a href=\"#page2\"><\/a>";
strVar += "   <\/label>";
strVar += "   <label class=\"topcoat-tab-bar__item\">";
strVar += "     <input type=\"radio\" name=\"topcoat\">";
strVar += "     <a href=\"#page3\"><\/a>";
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

// Basic page routing
function route(event) {
    var page,
        hash = window.location.hash;

    if (hash === "#page1") {
        page = merge(strVar, {htmlBody: homePage, name: "Bel-lijst"});
//        slider.slide($(page), "right");
    } else if (hash === "#page2") {
        page = merge(strVar, {htmlBody:  "<img class=\"decoded\" src=\"http://delisle.saskatooncatholic.ca/sites/delisle.saskatooncatholic.ca/files/sample-1.jpg\" alt=\"Laatste snapshot\"><\/img>", name: "Laatste foto"});
//        slider.slide($(page), "right");
    } else if (hash === "#page3") {
        page = merge(strVar, {htmlBody: "<img class=\"decoded\" src=\"http:\/\/192.168.1.100:8081\/\" alt=\"Dit werkt alleen via de Wifi van Ted Bafland.\"><\/img>", name: "Camera"});
//        slider.slide($(page), "right");
    }


    slider.slidePage($(page));

}

// Primitive template processing. In a real-life app, use Handlerbar.js, Mustache.js or another template engine
function merge(tpl, data) {
    return tpl.replace("{{htmlBody}}", data.htmlBody)
			.replace("{{name}}", data.name)
             
}

route();


	