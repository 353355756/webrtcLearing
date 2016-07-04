function hasUserMedia() {
    return !!(navigator.getUserMedia||navigator.webkitGetUserMedia||navigator.mozGetUserMedia||navigator.msGetUserMedia);
}

if(hasUserMedia()){
    navigator.getUserMedia = navigator.getUserMedia||navigator.webkitGetUserMedia||navigator.mozGetUserMedia||navigator.msGetUserMedia;
    var video = document.querySelector('video'),
    canvas = document.querySelector('canvas'),
    streaming = false;

    navigator.getUserMedia({
        video:true,
        audio:false
    },function (stream) {
        video.src = window.URL.createObjectURL(stream);
        streaming = true;
    },function (error) {
        console.log("cuowu",error);
    });

    var filters = ['','grayscale','sepia','invert'];
    var correntFilter = 0;

    document.querySelector('#capture').addEventListener('click',function (event) {
        if(streaming){
            canvas.width = video.clientWidth;
            canvas.height = video.clientHeight;
            var context = canvas.getContext('2d');
            context.fillStyle = "while";
            context.fillText("Hello world!",10,10);
            context.drawImage(video,0,0);
            correntFilter++;
            if(correntFilter>filters.length -1) correntFilter = 0;
           // canvas.className = filters[correntFilter];
        }
    });
}else{
    alert("对不起，你的浏览器不支持getUserMedia");
}