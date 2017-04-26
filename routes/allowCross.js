module.exports = function allowCrossDomain(req,res,next) {  
	res.header('Access-Control-Allow-Credentials', true)
    res.header('Access-Control-Allow-Origin', req.headers.origin)
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Content-Type,Accept,X-Requested-With')
    res.header('Access-Control-Expose-Headers', 'Content-Length,ETag,Last-Modified,Count,info')
	if (req.method!='OPTIONS') return next()

    res.send(204)
}   