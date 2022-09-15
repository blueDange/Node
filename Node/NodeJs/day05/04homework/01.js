// 引入express模块
const express = require('express');
// 创建web服务器
const app = express();
// 设置端口
app.listen(3000, () => {
    console.log('服务器搭建成功');
})
// 添加路由响应文件01.html
// 获取网页
app.get('/ty', (req,res) => {
    res.sendFile(__dirname + '/01.html')
})
// 添加插件
app.use(express.urlencoded({
    extended: true
}))
// 添加路由 监听按钮post /mytj
app.post('/mytj', (req,res) => {
    var obj = req.body;
    console.log(obj);
    res.send(`推荐添加成功! 您的姓名:${obj.user}  联系电话:${obj.phone}  邮箱:${obj.email}`)

})
