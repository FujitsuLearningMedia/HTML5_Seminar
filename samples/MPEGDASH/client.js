window.onload = () => {
    var url = "url";
    var player = dashjs.MediaPlayer().create();
    player.initialize(document.querySelector("#videoplayer"), url);
}