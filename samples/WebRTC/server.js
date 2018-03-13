const express = require("express");
const path = require("path");

const app = express();
app.use("/", express.static(__dirname + "\\..\\.."));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.use((req, res) => {
    res.status(404).send("URLが存在しません");
});

app.listen(8000, () => {
    console.log("サーバを起動しました。");
    console.log("http://localhost:8000");
});
