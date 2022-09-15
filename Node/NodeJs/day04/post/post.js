/*
 * @Author: blueDange 672074694@qq.com
 * @Date: 2022-09-13 16:27:51
 * @LastEditors: blueDange 672074694@qq.com
 * @LastEditTime: 2022-09-13 17:51:51
 * @FilePath: \the two\js\NodeJs\day04\post\post.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const express = require('express');
const app = express();
app.listen(3000, () => {
    
})
app.get('/post', (req,res) => {
    res.sendFile(__dirname + '/post.html')
})

// 使用插件,将所有post传参转为对象
app.use(express.urlencoded ({
    // 是否使用一个第三方模块为对象
    extended:true
}))

app.post('/mypost', (req,res) => {
    // 获取post传递的参数
    console.log(req.body);
    // console.log(req.query.user);
    // console.log(req.query.pwd);
    // console.log(req.query.email);
    // console.log(req.query.number);

    // res.send('登录成功 欢迎' + req.query.user)
})