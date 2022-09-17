// 引入express模块
const express = require('express');
// 引入路由器模块
const aboutRouter = require('./routes/about');
// 引入new的路由器模块
const newsRouter = require('./routes/news');
// 引入co的路由器模块
const coRouter = require('./routes/co');
// 引入culture路由器模块
const cultureRouter = require('./routes/culture');
// 引入job路由器模块
const jobRouter = require('./routes/job');
// 创建web服务器
const app = express();
// 设置端口
app.listen(3000, () => {
    console.log('服务器搭建成功');
});

// 将所有post传参转为对象
app.use(
    express.urlencoded({
        extended: true
    })
);

// 挂载关于汉唐路由器,添加前缀/v1/about
app.use('/v1/about', aboutRouter);

// 挂载新闻路由器,添加前缀/v1/news
app.use('/v1/news', newsRouter);

// 挂载co路由器,添加前缀/v1/co
app.use('/v1/co', coRouter);

// 挂载culture路由,添加前缀/v1/culture
app.use('/v1/culture', cultureRouter);

// 挂载job路由,添加前缀v1/list
app.use('/v1/list', jobRouter);
// 在所有路由器的后边,添加错误处理的中间件,拦截所有路由中的错误
app.use((err, req, res, next) => {
    // err路由中传递过来的错误信息
    console.log(err);
    // 要响应服务器端错误
    res.send({ code: 500, msg: '服务器端错误' });
});
