var express = require('express');
var app = express();
var path = require('path');
var port = 1234;
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

app.listen(port, () => console.log(`App listening on port ${port}!`))
module.exports = app;