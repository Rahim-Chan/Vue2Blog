var mongo = require('mongodb')

var findData = function (db, data, callback) {
  //连接到表  
  var collection = db.collection('news');
  //查询数据
  var o_id = new mongo.ObjectID(data);
  var whereStr = {
    "_id": o_id
  };
  //find data width id
  collection.findOne(whereStr, function (err, result) {
    if (err) {
      console.log('Error:' + err);
      return;
    }
    callback(result);
  });
}
module.exports = function (MongoClient, DB_CONN_STR) {
  return function (req, res) {
    MongoClient.connect(DB_CONN_STR, function (err, db) {
      // console.log("连接成功！");
      findData(db, req.query.id, function (result) {
        res.send(result);
        db.close();
      });
    });
  }
}