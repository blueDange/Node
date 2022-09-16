// 引入express模块
const express = require('express');
// 引入路由器模块
const aboutRouter = require('./routes/about');
// 创建web服务器
const app = express();
// 设置端口
app.listen(3000, () => {
    console.log('服务器搭建成功');
});

// 挂载关于汉唐路由器,添加前缀/v1/about
app.use('/v1/about', aboutRouter);

// 在所有路由器的后边,添加错误处理的中间件,拦截所有路由中的错误
app.use((err, req, res, next) => {
    // err路由中传递过来的错误信息
    console.log(err);
    // 要响应服务器端错误
    res.send({ code: 500, msg: '服务器端错误' });
});
