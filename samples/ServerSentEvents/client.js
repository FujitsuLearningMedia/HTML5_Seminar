window.onload = () => {
    // EventSourceの生成
    var source = new EventSource('/events');
    // EventSourceのメッセージイベント
    source.onmessage = function (e) {
        var p = document.createElement("p");
        p.innerText = e.data;
        document.getElementById("messageBody").appendChild(p);
    };
}