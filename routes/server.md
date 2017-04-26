Web服务器有几种：Apach、Nginx，NodeJs也能做，下面我们用NodeJs的框架Express来搭建Web服务器。
### 1. [Express](https://github.com/Expressjs/Express) 基于Nodejs 平台,快速、开放、极简的 web 开发框架搭。  
用Express搭建Web服务器的步骤很简单。    
`/server.js`
```javascript
var Express = require('Express')
var app = Express()
app.get('/', function (req, res) {
  res.send('Hello World')
})

app.listen(8000)
```   
### 2. 设置静态文件  
官方[Demo](http://Expressjs.com/en/starter/static-files.html)：用来访问静态文件，指向/dist目录（npm run build 生成打包文件的目录）。     
`/server.js`
```javascript
app.use(express.static('dist')
```  
运行```node server.js```开启web服务器，访问http://localhost:8000 （默认访问index.html）就能访问到index.html，大功告成！！！    
这样就完成了？并非事已愿为，当你进入子层路由后刷新页面，你会发现页面报错了提示：`Cannot GET /***/***`当前的路由地址。但是**根路由**刷新http://localhost:8000 却一切正常。这里提出一个web服务器的名词**路由重定向**，what is it ? 为什么会需要这个东西呢[文档](https://router.vuejs.org/zh-cn/essentials/history-mode.html)里也清楚解释到了，因为这里**不是**传统的多页面文件（一个路由对应一个html文件），**而是**SPA单页面模式，从头到尾都是有同一个html文件，路由跳转是通过**vue-router**的[H5模式](https://router.vuejs.org/zh-cn/essentials/history-mode.html)来完成。
### 3. 路由重定向  
利用Express的中间件[connect-history-api-fallback](https://github.com/bripkens/connect-history-api-fallback)   
`/server.js`
```javascript
var history = require('connect-history-api-fallback')
app.use(history())
app.use(Express.static('dist'))
```
！！！这里有个注意事项定义静态文件路由的时候要在```app.use(history()```**后声明**。这样就可以畅通的刷新页面了。 
### 4. 跨域
如果你跟我一样，页面在本地测试，Api接口在服务器上运行。相信在都接口的时候你会遇到跨域的问题。  
#### （1）Access-Control-Allow-Origin 
该字段是必须的。它的值要么是请求时Origin字段的值，要么是一个*，表示接受任意域名的请求。
#### （2）Access-Control-Allow-Credentials
该字段可选。它的值是一个布尔值，表示是否允许发送Cookie。默认情况下，Cookie不包括在CORS请求之中。设为true，即表示服务器明确许可，Cookie可以包含在请求中，一起发给服务器。这个值也只能设为true，如果服务器不要浏览器发送Cookie，删除该字段即可。
#### （3）Access-Control-Expose-Headers
该字段可选。CORS请求时，XMLHttpRequest对象的getResponseHeader()方法只能拿到6个基本字段：Cache-Control、Content-Language、Content-Type、Expires、Last-Modified、Pragma。如果想拿到其他字段，就必须在Access-Control-Expose-Headers里面指定。上面的例子指定，getResponseHeader('FooBar')可以返回FooBar字段的值。
```javascript
function allowCrossDomain(req,res,next) {  
    // 这个header的作用是在跨域set Cookie 的时候会用到，前端请求也要更改配合
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type,Accept,X-Requested-With');
    //跨域情况下只能拿到基本的header，暴露你想要的headers前端才能通过getHeader()拿到。
    res.header('Access-Control-Expose-Headers', 'Count,info')

    if (req.method!='OPTIONS') return next();

    res.send(204);
}                 
//while configuring express
app.use(allowCrossDomain)
```
引用它吧。。。（关于跨域setCookie[前端修改](https://github.com/ChanSun/vue-blog/blob/master/src/1.md#6-跨域保存cookie)）