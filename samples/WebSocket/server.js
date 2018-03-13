const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const path = require("path");

const app = express();
app.use("/", express.static(__dirname + "\\..\\.."));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on("connection", (ws, req) => {
    ws.on("message", (message) => {
        // 接続している全ユーザーにメッセージをブロードキャスト
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });
});

server.listen(8000, () => {
    console.log("サーバを起動しました。");
    console.log("http://localhost:8000");
});