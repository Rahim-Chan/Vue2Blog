### 前言
```
接触前端大半年，写过用过React.js，最后转用Vue.js。
突然想弄自己的博客，但是从没接触过后端,更没有搭建过Web服务器。
所以该项目重心在如何用Express，MongoDB，打造Api给页面调用。
（我想应该有刚接触前端的人跟我一样对后端的套路不了解吧）
```
### 安装步骤

Prerequisites: [Node.js](https://nodejs.org/en) (>=4.x, 6.x preferred), npm version 3+ and Git.
``` bash
# clone project and change directory /vue-blog
git clone https://github.com/ChanSun/vue-blog.git
cd /vue-blog
# install package
npm install
# production mode:packs the front-end file and web server will turn on which include Api but need start Mongodb server.
npm run start
# development mode:Hot refresh and web server which include Api but need start Mongodb server.
npm run dev
# only open the web server
npm run server
# development mode have Hot refresh.
npm run front-dev
# production mode have not open web server.
npm run front-build
# open the url
http://localhost:8080
```
### 前后端分离
 - [前端](/src/1.md)
    + [实时登陆，编写文章](/src/page/bgeditor.vue)
    + [获取文章列表](/src/page/main.vue)
    + [获取文章详情（markdown解析）](/src/page/detail.vue)
 - [Web服务器搭建（数据库）](/routes/server.md)
 - [后端](/routes/backend.md)
    + [实时登陆接口](/routes/controller/session.js)
    + [添加文章接口](/routes/controller/insert.js)
    + [删除文章接口](/routes/controller/delete.js)
    + [文章修改接口](/routes/controller/update.js)
    + [文章详情接口](/routes/controller/detail.js)
    + [文章列表接口](/routes/controller/datalist.js)
### 总结
运行npm run start or npm run dev 的情况下请启动MongoDB。  
前端：由于用了高清方案：注意浏览器窗口像素宽度不等于物理设备宽度。  
后端：登陆用session来set cookie，由于我在服务器上做Api，本地最后发现跨域下set cookie要做处理。