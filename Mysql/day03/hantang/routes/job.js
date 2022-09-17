// 创建路由器对象,添加职位列表路由(get /list) 传递当前页面和每页数据量,执行分页查询,最后响应
// {code:200,msg:'职位列表',data:数据,total:总数据量,pages:总页码,pno:当前页码}
const express = require('express');
const pool = require('../pool');
const router = express.Router();

router.get('/job', (req, res, next) => {
    // res.send('成功');
    var obj = req.query;
    if (!obj.pno === 0) {
        obj.pno = 1;
    }
    if (!obj.count === 0) {
        obj.count = 5;
    }
    // 开始的值
    var start = (obj.pno - 1) * obj.count;
    // 将每页数据量转为数字
    var size = parseInt(obj.count);
    pool.query(
        'select jid,title,ctime from ht_job limit ? , ?; select count(*) as sum from ht_job',
        [start, size],
        (err, r) => {
            if (err) {
                return next(err);
            }
            console.log(r);
            // 获得一个二维数组
            // 获取总的数据量
            var t = r[1][0].sum;
            // 计算总页数=总数据量/每页显示的数据量,向上取整
            var p = Math.ceil(t / obj.count);
            // 响应
            res.send({
                code: 200,
                msg: '招贤纳士',
                data: r[0],
                total: t,
                pages: p,
                jid: obj.jid
            });
        }
    );
});

module.exports = router;
