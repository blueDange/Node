// 创建路由器对象,添加路由(post /)传递参数(姓名,cname,手机phone,邮箱email,详情detail,推荐/投资 is_recommend),执行SQL命令
// 将传递的参数插入到数据表ht_cooperate,响应{code:200,msg:'提交成功'}; 暴露路由器对象
// 在主模块app.js中引入路由器co.js,挂在路由器,添加前缀 v1/co
const express = require('express');
const router = express.Router();
const pool = require('../pool');

// 添加接口
router.post('/coo', (req, res, next) => {
    var obj = req.body;
    console.log(obj);
    obj.ctime = Date.now();
    pool.query('insert into ht_cooperate set ?', [obj], (err, r) => {
        if (err) {
            return next(err);
        }
        console.log(r);
        res.send({ code: 200, msg: '提交成功' });
    });
});

router.delete('/coo/:cid', (req, res, next) => {
    var obj = req.params;
    console.log(obj);
    pool.query(
        'delete from ht_cooperate where cid = ?',
        [obj.cid],
        (err, r) => {
            if (err) {
                return next(err);
            }
            console.log(r);
            if (r.affectedRows === 0) {
                res.send({ code: 400, msg: '删除失败' });
            } else {
                res.send({ code: 200, msg: '删除成功' });
            }
        }
    );
});
// 暴露路由器
module.exports = router;
