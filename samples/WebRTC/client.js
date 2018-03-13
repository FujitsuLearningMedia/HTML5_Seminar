window.onload = () => {
    var webrtc = new SimpleWebRTC({
        localVideoEl: 'localVideo',
        remoteVideosEl: 'remotesVideos',
        autoRequestMedia: true,
        debug: true
    });

    webrtc.on('readyToCall', function () {
        webrtc.joinRoom('myroom');
    });
}