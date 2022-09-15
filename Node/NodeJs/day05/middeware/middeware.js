const express = require("express");
const app = express();

app.listen(3000, () => {
  console.log("服务器搭建成功");
});

function fn(req, res, next) {
  var obj = req.query;
  console.log(obj);
  // 判断用户是否为管理员amin, 如果不是admin 响应'请提供管理员账户', 否则是管理员
  //  才允许往后执行
  if (obj.user !== "admin") {
    res.send("请提供管理员账户");
  } else {
    next(); // 往后执行,可能是下一个中间件或者是路由
  }
}

// 添加中间件,拦截对/index的请求,一旦拦截自动调用一个函数
app.use("/index", fn);
// 创建路由器
app.get("/index", (req, res) => {
  res.send("这是管理后台,只有管理员有权限");
});

app.get("/delete", fn);
app.set("/delete", (req, res) => {
  res.send("用户删除成功");
});

// 中间件函数
function discount(req, res, next) {
  // 获取get传递的参数
  var obj = req.query;

  console.log(obj);
  // 对接收的价格打折
  obj.price *= 0.9;
  // 往后执行
  next();
}
// 拦截对/shopping请求
app.use("/shopping", discount);

// 添加路由
app.get("/shopping", (req, res) => {
  var obj = req.query;
  console.log(obj);
  res.send("商品的价格" + obj.price);
});
