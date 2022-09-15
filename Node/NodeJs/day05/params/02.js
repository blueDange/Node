// 引入express模块
const express = require('express')

// 创建web服务器

const app = express();

// 创建端口

app.listen(3000, () => {
    console.log('服务器搭建成功');
})

// 添加路由
app.get('/search/:kw', (req,res) => {
    var obj = req.params;
    res.send('搜索成功! 关键字: ' + obj.kw)
})

// 传递商品的编号和购买的数量 响应添加成功  商品编号xx 数量xx
app.get('/shopping/:kw/:number', (req,res) => {
    var obj = req.params
    console.log(obj);
    res.send('添加成功' + '商品编号' +obj.kw + '商品数量' + obj.number )
})