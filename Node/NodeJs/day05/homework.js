const express = require("express");
const app = express();
app.listen(3000);
app.use(express.static("public"));
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.post("/myadd", (req, res) => {
  var obj = req.body;
  res.send("响应成功! 员工姓名: " + obj.cc);
});
