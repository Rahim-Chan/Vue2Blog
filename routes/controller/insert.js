var insertData = function(db, data, callback) {  
        //连接到表  
        var collection = db.collection('news');
        //插入数据
        // var data = [{"name":data.name,"age":21},{"name":'wilson002',"age":22}];

        collection.insert(data, function(err, result) { 
            if(err)
            {
                console.log('Error:'+ err);
                return;
            }
            let resData = result.ops[0]
            callback(resData);
        });
    }
module.exports = function(MongoClient, DB_CONN_STR){
    return function(req,res,next){
  if(req.files.cover){
    var img_path = '/' + req.files.cover[0].path
    MongoClient.connect(DB_CONN_STR, function(err, db) {
    // console.log("连接成功！");
    var data = {content:req.body.content,title:req.body.title,cover:img_path}
    insertData(db, data,function(result) {
        // console.log(result)
        var info = encodeURI('操作成功')
        res.header('info',info) 
        res.send(result);
        db.close();
      });
    });
  }else{
      var info = encodeURI('缺少图片文件')
      res.header('info',info) 
      res.statusCode = 400;
      res.send('Error 400: products properties missing');
  }
}
}    