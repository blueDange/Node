// 引入express模块
const express = require('express')
// 创建路由器对象
const router = express.Router();
//添加路由
// 删除商品(get /delete)
router.get('/delete', (req,res) => {
    res.send('商品删除成功')
})
// 暴露路由器对象
module.exports = router;