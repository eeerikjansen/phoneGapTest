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
	
    function onDeviceReady() {
	 document.addEventListener("resume", onResume, false);
       devid = device.uuid

	// administartor modus voor tim en erik's mobiel
	if (devid == "aab456fe57c15e2f" || "fa9390ad27a8053"){
	
	var now = new Date(),
        now = now.getHours()+':'+now.getMinutes()+':'+now.getSeconds();
   console.log('oi');
   $( '.status' ).append(now +" Ingelogd als administrator" + "<br>");
		$( ".hide" ).show();
	} else {
		
	}
	///// inlogscherm ///////
	
	var gNaam;
	if (window.localStorage.getItem("name") === null){
	// Dit moet beter kunnen
	setTimeout(function() {$('#popupLogin').popup('open');},500);
	}else{
	 gNaam = window.localStorage.getItem("name");
	 $( '.status' ).append(now +" Ingelogd als "+ gNaam + "<br>");
	 alert(gNaam);
	}
	
	
	}
	
	
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
	



	