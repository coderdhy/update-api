var http = require('http');
var https = require('https');
var express = require('express');
var bodyParser = require('body-parser');
var apiRoutes = require('./router');
var path = require('path');
var fs = require('fs');

var privateKey  = fs.readFileSync(path.join(__dirname, '../certificate/private.pem'), 'utf8');
var certificate = fs.readFileSync(path.join(__dirname, '../certificate/file.crt'), 'utf8');
var credentials = { key: privateKey, cert: certificate };
var app = express();
// =======================
// 配置 =========
// =======================
app.port = process.env.PORT || 7080; // 设置启动端口
app.sslport = process.env.SSLPORT || 7081; // 设置启动端口
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


app.get('/', function(req, res) {
    if(req.protocol === 'https') {
        res.send('Hello! The API is at https://localhost:' + app.sslport + '/api');
    } else {
        res.send('Hello! The API is at http://localhost:' + app.port + '/api');
    }
});
app.use('/api', apiRoutes)

app.run = function() {

    http.createServer(app).listen(app.port, function() {
        console.log('HTTP Server is running on: http://localhost:%s', app.port);
    });
    https.createServer(credentials, app).listen(app.sslport, function() {
        console.log('HTTPS Server is running on: https://localhost:%s', app.sslport);
    });
}

module.exports = app