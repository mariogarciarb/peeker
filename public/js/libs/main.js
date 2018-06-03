
  'use strict';
 
  var isChannelReady = false;
  var isInitiator = false;
  var isStarted = false;
  var localStream;
  var pc;
  var remoteStream;
  var turnReady;
  var localVideo;
  var remoteVideo;
  var pcConfig = {
    'iceServers': [{
      'url': 'stun:stun.l.google.com:19302'
    }]
  };
  var username;
  var calleeUsername;
  
  //Callback functions
  var onRemoteHangUpCallback;
  var onToggleCallScreenCallback;
  var onToggleReceivedCallScreenCallback;
  
  // Set up audio and video regardless of what devices are present.
  var sdpConstraints = {
    'mandatory': {
      'OfferToReceiveAudio': true,
      'OfferToReceiveVideo': true
    }
  };
 var constraints = {
    video: true,
    audio: true
  };

  var room, callerId;
  // Could prompt for room name:
  // room = prompt('Enter room name:');

  var socket;
  
  function initClient(newToggleCallScreenCallback,
                      newToggleReceivedCallScreenCallback) {
    //Initializing variables                    
    socket                               = io.connect();
    username                             = localStorage.getItem('username');
    localVideo                           = document.querySelector('#localVideo');
    remoteVideo                          = document.querySelector('#remoteVideo');

    //Initializing callback functions                    
    onToggleCallScreenCallback           = newToggleCallScreenCallback;
    onToggleReceivedCallScreenCallback   = newToggleReceivedCallScreenCallback;
    
    //Initializing listeners
    listen();
    console.log('Making presentation. My name is: ' + username);

    //Telling the server who the user is
    socket.emit('presentation', username);
    // document.querySelector('.btn.call').addEventListener('click', call);
    // document.querySelector('.btn.pickup').addEventListener('click', pickUp);
  }

  function sendMessage(message) {
    console.log('Client sending message: ', message);
    socket.emit('message', message);
  }

  function call(newCalleeUsername) {
    isInitiator = true;
    calleeUsername = newCalleeUsername;
    getUserMedia(constraints, handleUserMedia, handleUserMediaError);
  }
//
  //Una vez nos llaman podemos pulsar el botón de coger la llamada
  function pickUp() {
    getUserMedia(constraints, handleUserMedia, handleUserMediaError);
  }

  function rejectCall() {
    alert('rejecting');
    socket.emit('rejectcall', callerId);
  }
  
  function cancelCall() {
    alert('canceling');
    socket.emit('cancelcall', calleeUsername);
  }
  
  function toggleMute() {
    var audioTracks = localStream.getAudioTracks();
    for (let audioTrack of audioTracks) {
      audioTrack.enabled = !audioTrack.enabled;
    }
  }

  function togglePause() {
    var videoTracks = localStream.getVideoTracks();
    for (let videoTrack of videoTracks) {
      videoTrack.enabled = !videoTrack.enabled;
    }
  }

  function listen() {
    //Handling on close
    socket.onclose('User left.');
    
    socket.on('calling', function(serverRoom, serverCallerId) {
      console.log('calling...');
    });

    socket.on('userdisconnected', function(calledUsername, strMessage) {
      onToggleCallScreenCallback();      
      hangup();
      alert(strMessage);
    });
    
    //Un usuario está llamando a este cliente, recibiendo por parámetro el string de la habitación
    socket.on('called', function(serverRoom, serverCallerId, callerUsername) {
      isInitiator = false;
      room = serverRoom;
      callerId = serverCallerId;      
      onToggleReceivedCallScreenCallback(callerUsername);

      //Executing callback function from chat component.
      //TODO: Pasar username
    });  

    //Una vez el otro usuario ha cogido la llamada
    socket.on('pickedup', function(room) {
      //Establecemos la variable isChannelReady como erdadera porque ya está listo para la comunicación
      isChannelReady = true;
    });  

    //Una vez el otro usuario ha rechazado la llamada
    socket.on('rejectedcall', function(room) {
      alert('user rejected the call');
      onToggleCallScreenCallback();
    });  
    
    //Una vez el otro usuario ha rechazado la llamada
    socket.on('canceledcall', function(room) {
      alert('user canceled the call');
      onToggleReceivedCallScreenCallback();
    });  

    socket.on('ready', function(room) {
      //Establecemos la variable isChannelReady como erdadera porque ya está listo para la comunicación
      isChannelReady = true;
      maybeStart();

      //Obtenemos el stream de datos para la conferencia.
    });  

    socket.on('log', function(array) {
      console.log.apply(console, array);
    });
  
    // This client receives a message
    socket.on('message', function(message) {
      console.log('Client received message:', message);
  
      if (message === 'got user media') {
        // alert('Got user media, executing maybestart');
      } else if (message.type === 'offer') {
        if (!isInitiator && !isStarted) {
          // alert('Got an offer, executing maybestart');
          maybeStart();
        }
        // alert('offer, setting remote description');
        console.log('onMessage(): offer, setting remote description xD');
        pc.setRemoteDescription(new RTCSessionDescription(message));
        // alert('offer, doAnswer()');
        doAnswer();
      } else if (message.type === 'answer' && isStarted) {
        // alert('answer, setting remote description');
        console.log('onMessage(): answer, setting remote description xD');
        pc.setRemoteDescription(new RTCSessionDescription(message));
      } else if (message.type === 'candidate' && isStarted) {
        
        // alert('candidate, creating candidate');
        var candidate = new RTCIceCandidate({
          sdpMLineIndex: message.label,
          candidate: message.candidate
        });
        // alert('candidate, adding candidate to peer connection');
        pc.addIceCandidate(candidate);
      } else if (message === 'call') {
      } else if (message === 'bye' && isStarted) {
        // Cuando el remoto cuelga. Usar para colgar llamada
        handleRemoteHangup();
      }
    });  
  
    if (location.hostname !== 'localhost') {
      requestTurn(
        'https://computeengineondemand.appspot.com/turn?username=41784574&key=4080218913'
      );
    }
    

    window.addEventListener("beforeunload", function (e) {      
      // sendMessage('disconnect');
      // socket.emit('disconnect', username);
    
      // (e || window.event).returnValue = null;
      
      return null;
    });
  }

  function handleUserMedia(stream) {
    console.log('Adding local stream.');

    const mediaSource = new MediaSource();
    
    try {
      localVideo.srcObject = stream;
    } catch (error) {
      localVideo.src = URL.createObjectURL(stream);
    }

    localStream = stream;
    if (isInitiator) {
      //Once we've got the user media, we can call the other user.
      socket.emit('call', calleeUsername, username);
    } else {      
      socket.emit('pickup', room, callerId);
    }
  }

  function handleUserMediaError(error) {
    console.log('getUserMedia error: ', error);
  }
  

  function maybeStart() {
    console.log('>>>>>>> maybeStart(): isStarted->' + isStarted + ', localStream->' + localStream + ', isChannelReady->' + isChannelReady);
    if (!isStarted && typeof localStream !== 'undefined' && isChannelReady) {
      console.log('>>>>>> creating peer connection');
      createPeerConnection();
      pc.addStream(localStream);
      isStarted = true;
      console.log('isInitiator', isInitiator);
      if (isInitiator) {
        doCall();
      }
    }
  }
//Usamos esto para gestionar cuando la llamada se cuelgue porque cierra el usuario
//Podemos preguntarle antes de cerrarla.
  function createPeerConnection() {
    try {      
      pc = new RTCPeerConnection(null);
      pc.onicecandidate = handleIceCandidate;
      pc.ontrack = handleRemoteStreamAdded;
      pc.onremovestream = handleRemoteStreamRemoved;
      console.log('Created RTCPeerConnnection');
    } catch (e) {
      
      sendMessage('Failed to create PeerConnection, exception: ' + e.message);
      console.log('Failed to create PeerConnection, exception: ' + e.message);

      alert('Cannot create RTCPeerConnection object.');
      return;
    }
  }

  function handleIceCandidate(event) {
    console.log('icecandidate event: ', event);
    if (event.candidate) {
      sendMessage({
        type: 'candidate',
        label: event.candidate.sdpMLineIndex,
        id: event.candidate.sdpMid,
        candidate: event.candidate.candidate
      });
    } else {
      console.log('End of candidates.');
    }
  }

  function handleRemoteStreamAdded(event) {
    console.log('Remote stream added.');
    console.log(event);

    remoteStream = event.streams[0];
    try {
      remoteVideo.srcObject = remoteStream;
    } catch (error) {
      remoteVideo.src = URL.createObjectURL(remoteStream);
    }
  }

  function handleCreateOfferError(event) {
    console.log('createOffer() error: ', event);
  }

  function doCall() {
    console.log('Sending offer to peer');
    pc.createOffer(setLocalAndSendMessage, handleCreateOfferError);
  }

  function doAnswer() {
    console.log('Sending answer to peer.');
    pc.createAnswer(setLocalAndSendMessage, onAnswerFailure, sdpConstraints);
  }

  function setLocalAndSendMessage(sessionDescription) {
    // Set Opus as the preferred codec in SDP if Opus is present.
    sessionDescription.sdp = preferOpus(sessionDescription.sdp);
    pc.setLocalDescription(sessionDescription);
    console.log('setLocalAndSendMessage sending message', sessionDescription);
    sendMessage(sessionDescription);
  }

  function onAnswerFailure() {
    console.log('Something was wrong trying to answer the peeer.')
  }

  function requestTurn(turnURL) {
    var turnExists = false;
    for (var i in pcConfig.iceServers) {
      if (pcConfig.iceServers[i].url.substr(0, 5) === 'turn:') {
        turnExists = true;
        turnReady = true;
        break;
      }
    }
    if (!turnExists) {
      console.log('Getting TURN server from ', turnURL);
      // No TURN server. Get one from computeengineondemand.appspot.com:
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
          var turnServer = JSON.parse(xhr.responseText);
          console.log('Got TURN server: ', turnServer);
          pcConfig.iceServers.push({
            'url': 'turn:' + turnServer.username + '@' + turnServer.turn,
            'credential': turnServer.password
          });
          turnReady = true;
        }
      };
      xhr.open('GET', turnURL, true);
      xhr.send();
    }
  }

  function handleRemoteStreamRemoved(event) {
    console.log('Remote stream removed. Event: ', event);
  }

  function hangup() {
    console.log('Hanging up.');
    stop();
    sendMessage('bye');
  }

  function handleRemoteHangup() {
    alert('Me han colgado');
    stop();
    isInitiator = false;

    //Calling the callback from the component
    onToggleCallScreenCallback();

  }

  function stop() {
    isStarted = false;
    if (pc) {
      pc.close();
      pc = null;
    }
    stopUserMediaStream();
  }

  function stopUserMediaStream() {
    alert('stopping userMedia')
    if (!localStream) {
      return;
    }

    localStream.getTracks()
      .forEach(mediaTrack => mediaTrack.stop());
  }

  // Set Opus as the default audio codec if it's present.
  function preferOpus(sdp) {
    var sdpLines = sdp.split('\r\n');
    var mLineIndex;
    // Search for m line.
    for (var i = 0; i < sdpLines.length; i++) {
      if (sdpLines[i].search('m=audio') !== -1) {
        mLineIndex = i;
        break;
      }
    }
    if (mLineIndex === null) {
      return sdp;
    }

    // If Opus is available, set it as the default in m line.
    for (i = 0; i < sdpLines.length; i++) {
      if (sdpLines[i].search('opus/48000') !== -1) {
        var opusPayload = extractSdp(sdpLines[i], /:(\d+) opus\/48000/i);
        if (opusPayload) {
          sdpLines[mLineIndex] = setDefaultCodec(sdpLines[mLineIndex],
            opusPayload);
        }
        break;
      }
    }

    // Remove CN in m line and sdp.
    sdpLines = removeCN(sdpLines, mLineIndex);

    sdp = sdpLines.join('\r\n');
    return sdp;
  }

  function extractSdp(sdpLine, pattern) {
    var result = sdpLine.match(pattern);
    return result && result.length === 2 ? result[1] : null;
  }

  // Set the selected codec to the first in m line.
  function setDefaultCodec(mLine, payload) {
    var elements = mLine.split(' ');
    var newLine = [];
    var index = 0;
    for (var i = 0; i < elements.length; i++) {
      if (index === 3) { // Format of media starts from the fourth.
        newLine[index++] = payload; // Put target payload to the first.
      }
      if (elements[i] !== payload) {
        newLine[index++] = elements[i];
      }
    }
    return newLine.join(' ');
  }

  // Strip CN from sdp before CN constraints is ready.
  function removeCN(sdpLines, mLineIndex) {
    var mLineElements = sdpLines[mLineIndex].split(' ');
    // Scan from end for the convenience of removing an item.
    for (var i = sdpLines.length - 1; i >= 0; i--) {
      var payload = extractSdp(sdpLines[i], /a=rtpmap:(\d+) CN\/\d+/i);
      if (payload) {
        var cnPos = mLineElements.indexOf(payload);
        if (cnPos !== -1) {
          // Remove CN payload from m line.
          mLineElements.splice(cnPos, 1);
        }
        // Remove CN line in sdp
        sdpLines.splice(i, 1);
      }
    }

    sdpLines[mLineIndex] = mLineElements.join(' ');
    return sdpLines;
  }
