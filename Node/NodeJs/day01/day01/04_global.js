
// 局部变量
var a=1
// 局部函数
function fn(){
    return 2
}
// 当前的作用域不是全局作用域
console.log(global.a); // undefined
console.log(global.fn); // undefined



