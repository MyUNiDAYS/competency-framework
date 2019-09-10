var express = require('express');
var app = express();
var path = require('path');

// root
app.get('/', function(req, res) {
    console.log(req.path);
    res.sendFile(path.resolve(__dirname + '/build/index.html'));
});

// pages
app.get(/^[^.]+$/, function(req, res) {
    console.log(req.path);
    res.sendFile(path.resolve(__dirname + '/build/index.html'));
});

// assets
app.get('*', function(req, res) {
    console.log(req.path);
    res.sendFile(path.resolve(__dirname + '/build' + req.path));
});

//app.listen(3000, () => console.log(`Example app listening on port ${3000}!`))
module.exports = app;