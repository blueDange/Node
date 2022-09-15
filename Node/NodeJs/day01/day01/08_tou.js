// 主模块
// 引入功能模块08_yan.js
// 注意事项：引入同一级目录下的模块，必须写路径./

// 引入成功就，得到的是该模块暴露的对象
var obj = require('./08_yan.js')
console.log(obj);
// 使用暴露的内容
console.log(global.a);
console.log(global.Math.PI);
console.log(obj.myA );
console.log(obj.myFn() );

// 在功能模块创意一个函数，传递任意两个数字，返回总和，暴露出去，最后在主模块下调用函数
console.log(obj.mySum(2,3));