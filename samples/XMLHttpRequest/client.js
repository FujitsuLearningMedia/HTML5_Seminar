window.onload = () => {
    var client = new XMLHttpRequest();
    client.onload = function () {
        if (this.readyState === 4) {
            if (this.status === 200) {
                document.getElementById("result").innerText = this.responseText;
            }
        }
    };

    var fm = document.getElementById("fm");
    fm.onsubmit = (e) => {
        e.preventDefault();
        var number = document.getElementById("numberTxt").value;

        // 入力チェック
        var regex = RegExp('[0-9]*','g');
        if (number === "" | !regex.test(number)) {
            alert("テキストボックスは数値が必須入力です");
            return;
        }

        // メッセージ送信
        client.open("GET", "http://localhost:8000/factorial/" + number);
        client.send();
    }
}
