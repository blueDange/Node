const mysql = require('mysql');
const express = require('express');
const app = express();
const pool = mysql.createPool({
    host: '127.0.0.1',
    port: '3306',
    user: 'root',
    password: '',
    database: 'tedu',
    connectionLimit: 15,
    multipleStatements: true // 开启一次执行多个SQL命令
});
app.listen(3000);
app.use(express.static('public'));
// 接口地址: http://127.0.0.1:3000/emp    路由的完整的地址
// 请求方法: get;
app.get('/v1/adds', (req, res, next) => {
    var obj = req.query;
    console.log(obj);
    pool.query('select * from emp where eid = ?', [obj.eid], (err, r) => {
        if (err) {
            throw err;
        }
        console.log(r);
        // 判断查询是否成功, 如果结果的是空数组说明该员工不存在, 否则查询成功;
        if (r.length === 0) {
            res.send({ code: 400, msg: '该员工不存在' });
        } else {
            // 接口规范,返回的结果是对象,包含有状态码(认为规定),消息说明,如果需要返回数据,添加查询的数据
            res.send({ code: 200, msg: '查询成功', data: r });
        }
    });
    // query属于异步操作,需要把相应的结果放入到回调函数的内部
});
app.use(
    express.urlencoded({
        //是否使用一个第三方模块转为对象
        extended: true
    })
);
app.post('/v1/adds', (req, res) => {
    var obj = req.body;
    console.log(obj);
    pool.query('insert into emp set ?', [obj], (err, r) => {
        if (err) {
            throw err;
        }
        console.log(r);
        //把成功结果响应
        res.send({ code: 200, msg: '员工添加成功' });
    });
});

// 添加删除员工的接口(delete /v1/adds), get传递员工的编号,执行sql命令,删除编号对应的员工
// 接口地址: http://127.0.0.1/v1/adds
// 请求方法: delete
app.delete('/v1/adds/:eid', (req, res) => {
    // 获取get传递的参数
    var obj = req.params;
    pool.query('delete from emp where eid =?', [obj.eid], (err, r) => {
        if (err) {
            throw err;
        }
        console.log(r);
        // 删除结果是对象,判断对象下的affectedRows值
        // 判断是否删除成功
        if (r.affectedRows === 0) {
            res.send({ code: 400, msg: '删除失败' });
        } else {
            res.send({ code: 200, msg: '删除成功' });
        }
    });
});
// 添加修改员工数据接口(put /v1/adds) post传递的值有编号(修改条件),姓名,性别,生日,工资,部门,获取post传递的参数,执行sql命令,修改编号对应的员工
//  如果修改失败响应{code:400,msg:'修改失败'},否则{code:200,msg:'修改成功'}
app.use(
    express.urlencoded({
        extended: true
    })
);
app.put('/v1/adds', (req, res) => {
    var obj = req.body;
    // console.log(obj);
    // res.send('修改成功');
    pool.query('update emp set ? where eid = ?', [obj, obj.eid], (err, r) => {
        if (err) {
            throw err;
        }
        console.log(r);
        if (r.changedRows === 0) {
            res.send({ code: 400, msg: '修改失败' });
        } else {
            res.send({ code: 200, msg: '修改成功' });
        }
    });
});

// 添加员工列表接口(get /v1/adds/list),get传递当前的页码pno和每页的数据量count,执行sql命令,
// 进行分页查询 最后响应查询成功
app.get('/v1/adds/list', (req, res) => {
    // 获取get传递的参数
    var obj = req.query;
    console.log(obj);
    // 如果页码为空,设置默认值为1
    if (!obj.pno) {
        obj.pno = 1;
    }

    // 如果每页数据量为空,设置默认值为5
    if (!obj.count) {
        obj.count = 5;
    }
    console.log(obj);
    // 计算每页开始查询的值
    var start = (obj.pno - 1) * obj.count;
    // 将每页数据量转为数字
    var size = parseInt(obj.count);
    // 执行SQL命令 1.分页查询 2.查询总数据量
    // 多个SQL命令之间用分号隔开
    pool.query(
        'select eid,ename from emp limit ? , ?;select count(eid) as sum from emp',
        [start, size],
        (err, r) => {
            if (err) {
                throw err;
            }
            console.log(r);
            // 1. 结果是个二维数组
            // 2. 存一个总数据量
            var t = r[1][0].sum;
            // 计算总页数 = 总数据亮/每页显示的数据量
            // 对结果向上取整
            var p = Math.ceil(t / obj.count);
            res.send({
                code: 200,
                mag: '查询成功',
                data: r[0],
                total: t,
                pages: p,
                pno: obj.pno
            });
        }
    );
});
