function hasUserMedia() {
    navigator.getUserMedia = navigator.getUserMedia||navigator.webkitGetUserMedia||navigator.mozGetUserMedia||navigator.msGetUserMedia
    return !!navigator.getUserMedia;
}

function hasRTCPeerConnection() {
    window.RTCPeerConnection = window.RTCPeerConnection||window.webkitRTCPeerConnection||window.mozRTCPeerConnection;
    return !!window.RTCPeerConnection;
}