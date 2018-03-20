var morgan = require('morgan');
var express = require('express');
var bodyParser = require('body-parser');
var apiRoutes = require('./router')
var app = express();
// =======================
// 配置 =========
// =======================
app.port = process.env.PORT || 8080; // 设置启动端口
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(morgan('dev'));// 使用 morgan 将请求日志打印到控制台

app.get('/', function(req, res) {
    res.send('Hello! The API is at http://localhost:' + app.port + '/api');
});
app.use('/api', apiRoutes)

app.run = function() {
    app.listen(app.port);
    console.log('Magic happens at http://localhost:' + app.port);
}

module.exports = app