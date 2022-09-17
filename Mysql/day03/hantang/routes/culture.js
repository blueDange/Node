const express = require('express');
// 添加路由器对象
const router = express.Router();
// 引入pool连接池
const pool = require('../pool');
// 暴露路由器
router.get('/', (req, res, next) => {
    // res.send('成功');
    var obj = req.query;
    pool.query(
        'select * from ht_culture where cid = ?',
        [obj.cid],
        (err, r) => {
            if (err) {
                return next(err);
            }
            console.log(r);
            res.send({ code: 200, msg: '企业文化', data: r });
        }
    );
});
module.exports = router;
