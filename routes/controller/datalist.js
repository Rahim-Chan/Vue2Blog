var selectData = function (db, data, callback) {
  //连接到表  
  var collection = db.collection('news')
  //查询数据
  // var whereStr = {"title":'newCs'}
  var listRows = data.listRows
  var p = data.p
  var PAGE = ''
  if (p == 1) {
    PAGE = collection.find().limit(listRows)
  } else {
    PAGE = collection.find().skip(listRows * (p - 1)).limit(listRows)
  }

  collection.count({}, function (error, count) {
    var count = count
    PAGE.toArray(function (err, result) {
      if (err) {
        console.log('Error:' + err)
        return
      }
      var cb_result = {
        count: count,
        data: result
      }
      callback(cb_result)
    })
  })

}

module.exports = function (MongoClient, DB_CONN_STR) {
  return function (req, res) {
    // res.send(req.query.name)
    let data = {
      p: 1,
      listRows: 15
    }
    if (req.query.p != undefined) {
      data.p = parseInt(req.query.p)
    }
    if (req.query.listRows != undefined) {

      data.listRows = parseInt(req.query.listRows)
    }
    MongoClient.connect(DB_CONN_STR, function (err, db) {
      console.log("连接成功！")
      selectData(db, data, function (cb_result) {
        res.header('count', cb_result.count)
        res.send(cb_result.data)
        db.close()
      })
    })
  }
}
