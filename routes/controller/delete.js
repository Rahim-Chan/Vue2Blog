var mongo = require('mongodb')

var delData = function(db,data,callback) {  
  //连接到表  
  var collection = db.collection('news');
  // console.log(data)
  var o_id = new mongo.ObjectID(data.id);
  var whereStr = {"_id":o_id};
  //find data width id
    collection.deleteOne(whereStr,function(err, result) {
    if(err){
      console.log('Error:'+ err);
      return;
    }     
    callback(result);
  });
}
module.exports = function(MongoClient, DB_CONN_STR, mongo){
  return function(req,res,next){
    if(!req.session.user) {
        res.statusCode = 404
        var info = encodeURI('登陆超时')
        res.header('info',info)
       return res.send('')
    }    
    var data = {}
    if(req.body){
      data = req.body
    }else if(req.query.id){
      data.id = req.query
    }else{
      // res.statusCode(400)
      return res.send(400)
    }
    // console.log(id)
    MongoClient.connect(DB_CONN_STR, function(err, db) {
    // console.log("连接成功！");
    delData(db, data, function(result) {
        // console.log(result)
        var info = encodeURI('操作成功')
        res.header('info',info) 
        res.send(result);
        db.close();
      });
    });
}
}