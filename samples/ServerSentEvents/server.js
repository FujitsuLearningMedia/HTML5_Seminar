const express = require("express");
const path = require("path");

const app = express();
app.use("/", express.static(__dirname + "\\..\\.."));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/events", (req, res, next) => {
    if (req.headers.accept && req.headers.accept == "text/event-stream") {
        res.writeHead(200, {
            "Content-Type": "text/event-stream",
            "Cache-Control": "no-cache",
            "Connection": "keep-alive"
        });

        setInterval(() => {
            var now = new Date();
            res.write(`data: ${now.getMinutes()}分${now.getSeconds()}秒\n\n`);
            res.write("data: Server-Sent Events!\n\n");
        }, 5000);
    } else {
        next();
    }
});

app.use((req, res) => {
    res.status(404).send("URLが存在しません");
});

app.listen(8000, () => {
    console.log("サーバを起動しました。");
    console.log("http://localhost:8000");
});
