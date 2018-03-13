window.onload = () => {
    // WebSocketの生成
    var ws = new WebSocket("ws://localhost:8000/broadcast");

    // WebSocket接続イベント
    ws.onopen = function () {
        console.log("接続が開きました");
    };

    // WebSocketメッセージイベント
    ws.onmessage = function (e) {
        // HTML要素を生成
        var tr = document.createElement("tr");
        var td1 = document.createElement("td");
        var td2 = document.createElement("td");

        // wsサーバからの送信データの取得
        var data = JSON.parse(e.data);

        // 画面に表示
        td1.innerText = data.name;
        td2.innerText = data.message;
        tr.appendChild(td1);
        tr.appendChild(td2);
        document.getElementById("messageBody").appendChild(tr);
    };

    // WebSocket切断イベント
    ws.onclose = function () {
        console.log("切断しました");
    };

    var fm = document.getElementById("fm");
    fm.onsubmit = (e) => {
        e.preventDefault();
        var name = document.getElementById("nameTxt").value;
        var message = document.getElementById("messageTxt").value;

        if (name === "" || message === "") {
            alert("テキストボックスは必須入力です");
            return;
        }

        var data = JSON.stringify({name: name, message: message});
        // メッセージ送信
        ws.send(data);
    }
}

