const express = require("express");
const app = express();
app.listen(3000);
app.use(express.static("public"));
// 将post传递的参数转为对象
app.use(
  express.urlencoded({
    extended: true,
  })
);

// 添加路由(post /add) ,监听按钮提交的请求
app.post("/add", (req, res) => {
  // 获取post传递的参数
  var obj = req.body;
  console.log(obj);
  res.send("添加成功" + obj.uname);
});
