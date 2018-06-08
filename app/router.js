// 获取一个 express 的路由实例
var express = require('express');
var apiRoutes = express.Router();
var check = require('./routes/check')

apiRoutes.get('/', function(req, res) {
  res.json({ message: 'Welcome to the coolest API on earth!' });
});

apiRoutes.get('/app/version/getNewVersion', check.check);

module.exports = apiRoutes