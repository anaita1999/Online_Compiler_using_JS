var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var compiler = require("compilex");

var app = express();
app.use(bodyParser());

var option = { stats: true };
compiler.init(option);
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/compilecode", function (req, res) {
    var code = req.body.code;
    var input = req.body.input;
    var inputRadio = req.body.inputRadio;
    var lang = req.body.lang;
    if (lang === "C/C++") {
        var envData = { OS: "windows", cmd: "g++", options: { timeout: 15000 } };

        compiler.compileCPPWithInput(envData, code, input, function (data) {
            if (data.error) {
                res.send(data.error);
            }
            else {
                res.send(data.output);
            }
        });
    }
    if (lang === "Python") {
        var envData = { OS: "windows", options: { timeout: 15000 } };

        compiler.compilePythonWithInput(envData, code, input, function (data) {
            if (data.error) {
                res.send(data.error);
            }
            else {
                res.send(data.output);
            }
        });

    }
    if (lang === "Java") {
        var envData = { OS: "windows", options: { timeout: 15000 } };

        compiler.compileJavaWithInput(envData, code, input, function (data) {
            if (data.error) {
                res.send(data.error);
            }
            else {
                res.send(data.output);
            }
        });

    }
});

app.get("/fullStat", function (req, res) {
    compiler.fullStat(function (data) {
        res.send(data);
    });
});


app.listen(5000);


compiler.flush(function () {
    console.log("All temp files flushed !");
});