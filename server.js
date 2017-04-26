var express = require('express')
var bodyParser = require('body-parser')
var favicon = require('serve-favicon')
var app = express()
var route = require('./routes')
var session = require('express-session')
var allowCrossDomain = require('./routes/allowCross')

//set favicon
app.use(favicon('./webcommon/horse.ico'))

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())
// serve pure static assets
app.use('/webcommon', express.static('webcommon'))
// 上传图片位置
app.use('/upload', express.static('upload'))
//extended为false表示使用querystring来解析数据，这是URL-encoded解析器
app.use(bodyParser.urlencoded({
  extended: false
}))
// 添加json解析器  
app.use(bodyParser.json())

app.use(require('cookie-parser')())

app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: false,
  cookie: {
    maxAge: 2 * 24 * 60 * 60 * 60 * 1000 //过期时间设置(单位毫秒)
  }
}))

console.log(process.env.NODE_ENV)

if (process.env.NODE_ENV == 'development') {
  // 开启前端, webpack热刷新，在内存中生成文件。
  var dev_front = require('./config/dev.front')
  dev_front(app)
} else {
  // pro模式指向已经打包的目录
  app.use('/', express.static('./dist'))
}
//allow express cross 在允许跨域的时候开启
// app.use(allowCrossDomain)
//use app web server api 后台api接口接入
route(app)

var server = app.listen(8080, function () {
  var host = server.address().address
  var port = server.address().port
  console.log('Example app listening at http://%s:%s', host, port)
})
