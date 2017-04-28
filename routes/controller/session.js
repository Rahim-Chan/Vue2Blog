var users = require('./users').items

var findUser = function (username, password) {
    return users.find(function (item) {
        return item.username === username && item.password === password
    })
}

var session = {
    post: function (req, res) {
        var user = findUser(req.body.username, req.body.password)
        //检查账号
        　　
        if (user) {
            req.session.user = user
            var info = encodeURI('登陆成功')
            res.header('info', info)
            res.statusCode = 200
            res.send('')　　
        } else {
            req.session.error = "用户名或密码不正确"
            var info = encodeURI('用户名或密码不正确')
            res.header('info', info)
            res.statusCode = 400
            res.send('')　　
        }
    },
    get: function (req, res) {
        // 如果存在表示已经登陆

        if (req.session.user) {
            res.statusCode = 200
            var info = encodeURI('登陆成功')
            res.header('info', info)
            res.send(req.session.user)
        } else {
            res.statusCode = 404
            var info = encodeURI('登陆超时')
            res.header('info', info)
            res.send('')
        }
    }
}

module.exports = session