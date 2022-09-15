const express = require("express");
const app = express();
app.listen(3000);

// 把静态资源托管到public目录,如果客户端要请求文件,就会自动往public目录下寻找文件
// 内置中间件
app.use(express.static("public"));

app.use(express.static("files"));
