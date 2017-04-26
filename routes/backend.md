### 后端：     
- [数据库](#1-数据库)
  + [安装数据库](#安装数据库)
  + [创建数据库](#创建数据库)
  + [可视化工具](#可视化工具)
- [生成后端接口](#2-生成后端接口)
  + [利用中间件](#利用中间件)
- [接口文件模块化](#3-接口文件模块化)
  + [路由方法](#路由方法)
  + [数据库驱动+路由方法调用](#数据库驱动路由方法调用)
  + [调用接口](#调用接口)

### 1. 数据库
#### 安装数据库
[MongoDB](https://docs.mongodb.com/manual/installation)是一种非关系型数据库适用于web应用，官网中有各操作系统的安装步骤，就不一逐一赘述。（帮助理解的[中文教程](http://www.runoob.com/mongodb/mongodb-tutorial.html)）   
我们可以通过MongoDB shell 来连接Mongodb服务器，前提是你要启动你的MongoDB服务器(默认启动27017端口)（what？启动啥？证明你跳步了，乖乖去看一下[步骤](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-debian/)）   
#### 创建数据库
 ```javascript 
  use Cart
```
如没此库，将会自动创建有了数据库，通过[MongoDB shell](https://docs.mongodb.com/manual/mongo/#working-with-the-mongo-shell)的语句来执行增删改查，然而你会发现这些操作用起来也太抽象、繁琐了吧，请继续往下看。  

#### 可视化工具
<img src="https://robomongo.org/static/robomongo-128x128-129df2f1.png" width="50" height="50%">[robomongo](https://robomongo.org/)一个可视化工具。打开软件`左上角File>Connect>Create`添加数据库Ip地址（本地localhost、远端服务器地址）+端口号（默认27017）。    

#### 数据库驱动：     
要将数据库连接到 Express 应用程序，只需在该应用程序中为数据库装入相应的 Node.js 驱动程序，安装[mongodb](https://www.npmjs.com/package/mongodb)。  
`/routes/index.js`  
`npm install mongodb`
```javascript
var MongoClient = require('mongodb').MongoClient
 
// Connection URL  连接数据库中刚创建的库`Cart`
var url = 'mongodb://localhost:27017/Cart'
// Use connect method to connect to the Server 
MongoClient.connect(url, function(err, db) {
  console.log("Connected correctly to server")
  db.close()
})
```
这样Express连接到数据库！！  
### 2. 生成数据接口
 接下来我们通过**上传图片和文字**的案例来熟悉操作**mongodb**的流程。    

#### 利用中间件生成接口：    
我要借助中间件： [multer](https://github.com/expressjs/multer)解析客户端以formdata格式上传的文件，[body-parser](https://www.npmjs.com/package/body-parser)解析客户端body中的内容。
`/server.js`
##### 定义multer属性：
``` javascript
var bodyParser = require('body-parser')
app.use( bodyParser.json() )       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: false
})) 
var multer  = require('multer')
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'upload/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname.split('.')[0] + '-' + Date.now() + '.' + file.originalname.split('.')[1])
  }
})
var upload = multer({ storage: storage })
```
##### 定义数据库插入函数 
```javascript
var insertData = function (db, data, callback) {
  //连接到表  
  var collection = db.collection('crx')
  //插入数据
  collection.insert(data, function (err, result) {
    if (err) {
      console.log('Error:' + err)
      return
    }
    let resData = result.ops[0]
    callback(resData)
  })
}
```
##### 定义上传的类型和调用数据库插入函数
```javascript
var cpUpload = upload.fields([{
  name: 'title',
  maxCount: 1
}, {
  name: 'cover',
  maxCount: 1
}])
//upload type
app.post('/upload', cpUpload, function (req, res, next) {
  var img_path = '/' + req.files.cover[0].path
  //获取图片上传后的地址
  MongoClient.connect(DB_CONN_STR, function (err, db) {
    // console.log("连接成功！")
    let data = {
      content: req.body.content,
      title: req.body.title,
      cover: img_path
    }
    //格式化插入的数据类型
    insertData(db, data, function (result) {
      res.send(result)
      db.close()
    })
  })
})
```
接口就这样搞定了，快去请求接口试试把~（可利用postman直接调试）   

如无意外返回状态200调试成功！！
### 3. 接口文件模块化
上面这种写法就是：将服务器启动步骤+数据库驱动步骤+路由方法+查询方法，全部揉在一起。当方法多了就会变得很乱，下面将这些方法解耦开，便于管理，模块化管理。  
#### 路由方法
`file:///route/controller/insert.js`  
把查询方法（插入）+路由方法 放在insert.js文件
```javascript
var insertData = function (db, data, callback) {
  //连接到表  
  var collection = db.collection('news')
  //插入数据
  collection.insert(data, function (err, result) {
    if (err) {
      console.log('Error:' + err)
      return
    }
    let resData = result.ops[0]
    callback(resData)
  })
}
module.exports = function (MongoClient, DB_CONN_STR) {
  return function (req, res, next) {
    if (req.files.cover) {
      var img_path = '/' + req.files.cover[0].path
      MongoClient.connect(DB_CONN_STR, function (err, db) {
        // console.log("连接成功！")
        var data = {
          content: req.body.content,
          title: req.body.title,
          cover: img_path
        }
        insertData(db, data, function (result) {
          // console.log(result)
          var info = encodeURI('操作成功')
          res.header('info', info)
          res.send(result)
          db.close()
        })
      })
    } else {
      var info = encodeURI('缺少图片文件')
      res.header('info', info)
      res.statusCode = 400
      res.send('Error 400: products properties missing')
    }
  }
}
```
#### 数据库驱动+路由方法调用
利用express.Router 类创建模块化、可挂载的路由句柄。
`file:///routes/index.js` 
```javascript
var express = require('express')
var router = express.Router()
var insert = require('./controller/insert')
var delete_data = require('./controller/delete')
var update = require('./controller/update')
var detail = require('./controller/detail')
var datalist = require('./controller/datalist')
var session = require('./controller/session')
var multer = require('multer')
var fs = require('fs')
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'upload/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
})

//判断upload文件夹是否纯在
function fsExistsSync(path) {
  try {
    fs.accessSync(path, fs.F_OK)
  } catch (e) {
    return false
  }
  return true
}
if (!fsExistsSync('upload')) {
  fs.mkdirSync("upload")
}
var upload = multer({
  storage: storage
})
var cpUpload = upload.fields([{
  name: 'title',
  maxCount: 1
}, {
  name: 'content',
  maxCount: 1
}, {
  name: 'cover',
  maxCount: 1
}])
//定义数据库
var MongoClient = require('mongodb').MongoClient
var DB_CONN_STR = 'mongodb://localhost:27017/Cart'
router.post('/upload', cpUpload, insert(MongoClient, DB_CONN_STR))

module.exports = function (app) {
  // 判断是否连接服务器
  MongoClient.connect(DB_CONN_STR, function (err, db) {
    if (db !== null) {
      app.use(router)
    } else {
      console.log('please turn on the mongodb')
    }
  })
  //end
}

```
#### 引用路由文件
`file://server.js`   
通过调用`index.js`暴露的router 
```javascript
var express = require('express')
var history = require('connect-history-api-fallback')
var app = express()
var route = require('./routes')
  //引用route文件（默认调用index.js）
app.use(favicon('./webcommon/horse.ico')) //set favicon

app.use(history())

app.use(express.static('dist'))
app.use('/upload', express.static('upload'))
// 调用接口
route(app)

var server = app.listen(8080, function () {
  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)
})

```
