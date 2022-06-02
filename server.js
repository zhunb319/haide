var express = require('express')
var app = express()
app.all('*.html', (req, response, next) => {
  response.header('Content-Type', 'text/html; charset=UTF-8')
  next()
})

app.use(express.static(__dirname + '/dist'))

// app.all('*', function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "X-Requested-With");
//   res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
//   res.header("X-Powered-By", ' 3.2.1')
//   res.header("Content-Type", "application/json;charset=utf-8");
//   next();
// });

app.listen(9999, () => {
  console.log('服务已经启动, 9999 端口监听中....')
})
