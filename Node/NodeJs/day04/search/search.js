/*
 * @Author: blueDange 672074694@qq.com
 * @Date: 2022-09-13 14:07:06
 * @LastEditors: blueDange 672074694@qq.com
 * @LastEditTime: 2022-09-13 17:11:34
 * @FilePath: \the two\js\NodeJs\day04\search.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const express = require('express');
const app = express();
app.listen(3000, () => {
    
}) 
// 响应search.html
app.get('/search', (req,res) => {
    res.sendFile(__dirname + '/search.html')
})

// 添加路由 监听按钮提交的请求
// 请求的方法get 请求的url: /mysearch
// 响应'搜索成功'
app.get('/mysearch', (req,res) => {
    // req 请求的对象
    
    // 请求的方法,请求的url
    
    // 获取传递的参数
    
    // 
    res.send('搜索成功')
})

// 添加路由 ,请求的方法: get  请求的url: /a   /b   /c
app.get('/login', (req,res) => {
    res.sendFile(__dirname+'/login.html')
})
app.get('/mylogin', (req,res) => {
    res.send('登录成功! 欢迎: '+req.query.user)

})