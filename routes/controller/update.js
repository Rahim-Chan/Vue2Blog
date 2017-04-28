var mongo = require('mongodb')
var fs = require('fs')

var updateData = function (db, data, callback) {
	//连接到表
	var collection = db.collection('news')
	var o_id = new mongo.ObjectID(data.id)
	//插入数据
	// var data = [{"name":'newCs',"age":21},{"name":'wilson002',"age":22}];
	var update = {
		'content': data.content,
		'title': data.title,
		'cover': data.cover
	}
	collection.updateOne({
		'_id': o_id
	}, {
		$set: update
	}, function (err, result) {
		if (err) {
			// console.log('Error:' + err)
			return
		}
		callback(result)
	})
}
module.exports = function (MongoClient, DB_CONN_STR) {
	return function (req, res) {
		var img_path = ''
		var info = ''
		if (!req.session.user) {
			res.statusCode = 404
			info = encodeURI('登陆超时')
			res.header('info', info)
			return res.send('')
		}
		// 这里只判断是否有图片，title，content可以为空，由前端判断。因为再次编辑文件可以传递二进制，也可以传递已有的url地址
		if (req.files.cover) {
			// 获取二进制图片转化后的地址
			img_path = '/' + req.files.cover[0].path

		} else if (req.body.cover) {
			// 接受图片地址
			img_path = req.body.cover

		} else {
			info = encodeURI('缺少图片文件')
			res.header('info', info)
			res.statusCode = 400
			res.send('Error 400: products properties missing')
		}
		MongoClient.connect(DB_CONN_STR, function (err, db) {
			// console.log("连接成功！");
			var data = {
				content: req.body.content,
				title: req.body.title,
				cover: img_path,
				id: req.body.id
			}
			updateData(db, data, function (result) {
				// console.log(result)
				var info = encodeURI('操作成功')
				res.header('info', info)
				res.send(result)
				db.close()
			})
		})
		//end  
	}
}