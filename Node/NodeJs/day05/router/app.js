const express = require('express');
// 引入第二个模块 路由器
const proR = require('./03');
const userR = require('/user')
console.log(proR);
const app = express();
app.listen(3000, () => {
    console.log('服务器搭建成功');
})
// app.get('/delete/:product', (req,res) => {
//     var obj = req.params
//     res.send('商品' + obj.product)
// })
// app.get('/delete/:user', (req,res) => {
//     var obj = req.params
//     res.send('用户' + obj.user)
// })

// 添加路由
// 挂载路由器,可以应用外部路由
app.use('/pro', proR)
// 给多有路由的URl添加前缀/userSelect: 
app.use('/user', userR)