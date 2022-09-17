// 引入express模块
const express = require('express');
// 创建路由器对象
const router = express.Router();
// 引入连接池模块
const pool = require('../pool');
// 添加路由
// 1. 公司简介和董事长致辞接口(get /info)
// 接口地址: http://127.0.0.1:3000/v1/about/info
// 请求方法: get
router.get('/info/:aid', (req, res, next) => {
    // 获取params传递的参数
    var obj = req.params;
    console.log(obj);
    pool.query('select * from ht_about where aid = ? ', [obj.aid], (err, r) => {
        if (err) {
            // 如果出现错误,把错误交给下一个中间件
            // 阻止往后执行
            return next(err);
        }
        console.log(r);
        res.send({ code: 200, msg: '查询成功', data: r });
    });
});

// 2. 添加公司大事件(get /event)
router.get('/event', (req, res, next) => {
    // 执行SQL 去查询所有的事件
    pool.query('select * from ht_event', (err, r) => {
        if (err) {
            return next(err); // 同时阻止往后执行性质
        }
        console.log(r);
        // 把查询结果响应
        res.send({ code: 200, msg: '公司大事件', data: r });
    });
});

// 3. 旗下成员(get /member)
router.get('/member', (req, res, next) => {
    // res.send('旗下成员');
    // 查询旗下成员数据
    pool.query('select * from ht_member order by mid asc', (err, r) => {
        if (err) {
            return next(err); // 如果sql有错误交给下一个中间件
        }
        res.send({ code: 200, mag: '旗下成员', data: r });
    });
});
// 暴露路由器对象
module.exports = router;
