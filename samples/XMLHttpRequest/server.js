const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
app.use("/", express.static(__dirname));
app.use("/", express.static(__dirname + "\\..\\.."));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/factorial/:number", (req, res) => {
    res.header("Content-Type", "text/plain");
    const num = parseInt(req.params.number);
    const result = factorial(num);
    res.status(200).send(result.toString());

    function factorial(num)
    {
        let x = 0;
        if (num > 0) {
            x = num * factorial(num - 1);
        } else {
            x = 1;
        }
        return x;
    }
});


app.listen(8000, () => {
    console.log("サーバを起動しました。");
    console.log("http://localhost:8000");
});
