var yourvideo = document.querySelector('#yours');
var theirvideo = document.querySelector('#theire');
var yourConnection, theirConnection;
if(hasUserMedia()){

    navigator.getUserMedia({
        video:true,
        audio:false
    },function (stream) {
        yourvideo.src = window.URL.createObjectURL(stream);
        
        if(hasRTCPeerConnection()){
            startPeerConnection(stream);
        }else{
            alert("o no 不支持webrtc");
        }
    },function (error) {
        console.log("cuowu",error);
    });

}else{
    alert("对不起，你的浏览器不支持getUserMedia");
}

function startPeerConnection(stream){
    var configuration = {
        //"iceServers" : [{"url":"stun:127.0.0.1:9876"}]
    };
    yourConnection = new RTCPeerConnection(configuration);
    theirConnection = new RTCPeerConnection(configuration);

      // Setup stream listening
    yourConnection.addStream(stream);
    theirConnection.onaddstream = function (e) {
        theirVideo.src = window.URL.createObjectURL(e.stream);
    };

    yourConnection.onicecandidate= function (event) {
        if(event.candidate){
            theirConnection.addIceCandidate(new RTCIceCandidate(event.candidate));
        }
    }

    theirConnection.onicecandidate= function (event) {
        if(event.candidate){
            yourConnection.addIceCandidate(new RTCIceCandidate(event.candidate));
        }
    }

    yourConnection.createOffer(function (offer) {
        yourConnection.setLocalDescription(offer);
        theirConnection.setRemoteDescription(offer);

        theirConnection.createAnswer(function (offer) {
            theirConnection.setLocalDescription(offer);
            yourConnection.setRemoteDescription(offer);
        });
    });
}