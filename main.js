 // Call onDeviceReady when PhoneGap is loaded.
    //
    // At this point, the document has loaded but phonegap-1.0.0.js has not.
    // When PhoneGap is loaded and talking with the native device,
    // it will call the event `deviceready`.
    // 
    document.addEventListener("deviceready", onDeviceReady, false);

    // PhoneGap is loaded and it is now safe to make calls PhoneGap methods
    //
	var devid;
	
           var pushNotification;
            
            function onDeviceReady() {
                $("#app-status-ul").append('<li>deviceready event received</li>');
                
				document.addEventListener("backbutton", function(e)
				{
                	$("#app-status-ul").append('<li>backbutton event received</li>');
  					
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
				}, false);

				try 
				{ 
                	pushNotification = window.plugins.pushNotification;
                	if (device.platform == 'android' || device.platform == 'Android') {
						$("#app-status-ul").append('<li>registering android</li>');
                    	pushNotification.register(successHandler, errorHandler, {"senderID":"583383190283","ecb":"onNotificationGCM"});		// required!
					} else {
						$("#app-status-ul").append('<li>registering iOS</li>');
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
                     $("#app-status-ul").append('<li>push-notification: ' + e.alert + '</li>');
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
                window.plugin.notification.local.add({ message: 'Great app!' });
                switch( e.event )
                {
                    case 'registered':
					if ( e.regid.length > 0 )
					{
						$("#app-status-ul").append('<li>REGISTERED -> REGID:' + e.regid + "</li>");
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
							$("#app-status-ul").append('<li>--INLINE NOTIFICATION--' + '</li>');

							// if the notification contains a soundname, play it.
							var my_media = new Media("/android_asset/www/"+e.soundname);
							my_media.play();
							window.plugin.notification.local.add({ message: 'Deurbel!' });
						}
						else
						{	// otherwise we were launched because the user touched a notification in the notification tray.
							if (e.coldstart)
								$("#app-status-ul").append('<li>--COLDSTART NOTIFICATION--' + '</li>');
							else
							$("#app-status-ul").append('<li>--BACKGROUND NOTIFICATION--' + '</li>');
						}

						$("#app-status-ul").append('<li>MESSAGE -> MSG: ' + e.payload.message + '</li>');
						$("#app-status-ul").append('<li>MESSAGE -> MSGCNT: ' + e.payload.msgcnt + '</li>');
                    break;
                    
                    case 'error':
						$("#app-status-ul").append('<li>ERROR -> MSG:' + e.msg + '</li>');
                    break;
                    
                    default:
						$("#app-status-ul").append('<li>EVENT -> Unknown, an event was received and we do not know what it is</li>');
                    break;
                }
            }
            
            function tokenHandler (result) {
                $("#app-status-ul").append('<li>token: '+ result +'</li>');
                // Your iOS push server needs to know the token before it can push to this device
                // here is where you might want to send it the token for later use.
            }

            function successHandler (result) {
                $("#app-status-ul").append('<li>success:'+ result +'</li>');
            }
            
            function errorHandler (error) {
                $("#app-status-ul").append('<li>error:'+ error +'</li>');
            }
            
			document.addEventListener('deviceready', onDeviceReady, true);
//////////////////
	
	
	   function onResume() {
	   alert("hi daar");
	   socketio = io.connect("192.168.1.100:1337");
    }
	
	//window.plugin.notification.local.add({ message: 'Great app!' })
	
	////////////////
	
	  var connected = false;
  var connChanged = false;
  var inLogServer = devid +"=Erik";
  var socketio = io.connect("192.168.1.100:1337");
  
  
socketio.on('connect', function() {
	checkConn = function(){
	
	 if (socketio.socket.connected == !connected){
	 	 
		if (socketio.socket.connected){
			//$( "#noWebBar" ).empty();
			
		}
		else {
	 		//$('#pageone').prepend("<div id=noWebBar><h4 class=\"ui-bar ui-bar-b\" >Geen verbinding met de cocktailmachine! Er wordt automatisch opnieuw verbinding gemaakt.</h4></div>");
			}
		}
	 connected = socketio.socket.connected;
	}
	
  setInterval("checkConn()", 5000);
  
  
});


function sendMessage(val) {
    //var msg = document.getElementById("message_input").value;
    socketio.emit("message_to_server", { message : val});
}

socketio.on("message_to_client", function(data) {
    //document.getElementById("status1").innerHTML = (data['message']);
	var now = new Date(),
        now = now.getHours()+':'+now.getMinutes()+':'+now.getSeconds();
	//$( '.status1' ).replaceWith( "<div class = \"status1\">" + (data['message']) + "</div>" );
	//$( '.status' ).append(now +" "+ (data['message']) + "<br>" );
	console.log(data['message']);
});
	var now1 = new Date(),
        now1 = now1.getHours()+':'+now1.getMinutes()+':'+now1.getSeconds();
  
   //$( '.status' ).append(now1 +" Er is verbinding met de cocktailmachine" + "<br>");
   console.log('oi');
	/// als de verbinding faalt
	



	