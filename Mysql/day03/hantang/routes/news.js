// 引入express模块
const express = require('express');
// 添加路由器
const router = express.Router();
// 引入连接池模块
const pool = require('../pool');
// 添加路由(get /catlist) 查询处新闻分类表的数据ht_cat
router.get('/catlist', (req, res, next) => {
    // res.send('新闻模块');
    pool.query('select * from ht_cat order by cid asc', (err, r) => {
        if (err) {
            return next(err);
        }
        console.log(r);
        res.send({ code: 200, msg: '新闻模块', data: r });
    });
});

// 添加新闻列表接口(get /list), 传递分类的编号(cat_id),当前页码(pno),每页数据量(count)
// 执行分页查询(nid,title,cat_id),查询出这个类型下对应的数据,最后响应到前端
//{code:200,msg:'新闻列表',data:查询的数据,total:总数据量,pages:总页数,pno当前页码,cat_id:所属类别编号}
router.get('/list', (req, res, next) => {
    // 获取get传递的参数
    var obj = req.query;
    console.log(obj);
    // 判断各项是否为空
    if (!obj.pno) {
        obj.pno = 1;
    }
    if (!obj.count) {
        obj.count = 5;
    }
    // 如果所属类别编号为空 响应'cat_id'不能为空
    // 阻止往后执行
    if (!obj.cat_id) {
        return res.send({ code: 401, msg: 'cat_id不能为空' });
    }
    // 计算每页开始查询的值
    var start = (obj.pno - 1) * obj.count;
    // 将每页数据量转为数字
    var size = parseInt(obj.count);
    // 执行SQL命令
    pool.query(
        'select nid,title,ctime,cat_id from ht_news where cat_id = ? limit ? , ?;select count(nid) as sum from ht_news where cat_id = ?',
        [obj.cat_id, start, size, obj.cat_id],
        (err, r) => {
            if (err) {
                return next(err);
            }
            console.log(r);
            // 结果是一个二维数组
            // 获取总的数据量
            var t = r[1][0].sum;
            // 计算总页数=总数据量/每页显示的数据量,向上取整
            var p = Math.ceil(t / obj.count);
            // 响应
            res.send({
                code: 200,
                msg: '新闻列表',
                data: r[0],
                total: t,
                pages: p,
                pno: obj.pno,
                cat_id: obj.cat_id
            });
        }
    );
});

// 添加新闻详情的接口(get /detail),params传递新闻的编号,查询编号对应的这条新闻,最后响应{code:200,msg'查询成功',data:r}
router.get('/detail/:nid', (req, res, next) => {
    var obj = req.params;
    pool.query('select * from ht_news where nid = ?', [obj.nid], (err, r) => {
        if (err) {
            return next(err);
        }
        console.log(r);
        // 判断是否查询成功,如果结果的是空数组说明该员工不存在
        if (r.length === 0) {
            res.send({ code: 400, msg: '该员工不存在' });
        } else {
            res.send({ code: 200, msg: '查询成功', data: r });
        }
    });
});
// 暴露路由器对象
module.exports = router;
