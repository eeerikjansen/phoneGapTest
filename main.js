 // Call onDeviceReady when PhoneGap is loaded.
    //
    // At this point, the document has loaded but phonegap-1.0.0.js has not.
    // When PhoneGap is loaded and talking with the native device,
    // it will call the event `deviceready`.
    // 
    document.addEventListener("deviceready", onDeviceReady, false);
	document.addEventListener("resume", onResume, false);
/* 	window.addEventListener('load', function () {
    
}, false);  */

    // PhoneGap is loaded and it is now safe to make calls PhoneGap methods
    //
	var devid;
	
           var pushNotification;
            
            function onDeviceReady() {
                //$("#app-status-ul").append('<li>deviceready event received</li>');
                new FastClick(document.body);
				var applaunchCount = window.localStorage.getItem('launchCount');
				
				if(applaunchCount){
					//This is a second time launch, and count = applaunchCount
					$( "#btn" ).hide();
					alert("eerste keer");
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
			
			function onResume() {
			alert("welkom terug");
			window.location.reload();
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



	