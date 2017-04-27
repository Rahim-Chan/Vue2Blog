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
      fs.accessSync(path, fs.F_OK);
    } catch (e) {
      return false;
    }
    return true;
  }
  if (!fsExistsSync('upload')) {
    fs.mkdirSync("upload");
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
  router.delete('/delete', delete_data(MongoClient, DB_CONN_STR))
  router.put('/update', cpUpload, update(MongoClient, DB_CONN_STR))
  router.get('/detailnew', detail(MongoClient, DB_CONN_STR))
  router.get('/news', datalist(MongoClient, DB_CONN_STR))
  //登陆session
  router.post('/session', session.post)
  router.get('/session', session.get)

  module.exports = function (app) {
    // 判断是否连接服务器
    app.use('/', function (req, res,next) {
      MongoClient.connect(DB_CONN_STR, function (err, db) {
        if (db == null) {
          // console.log("数据库连接成功！")
          res.status('500')
          return res.send('Please Start MongoDB')
        }else{
          next()
        }
      })
    })
    app.use(router)
    //end
  }
