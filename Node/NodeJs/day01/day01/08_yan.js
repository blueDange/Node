// 功能模块
console.log('这是新哥的眼睛模块');
var a = 1
function fn(){
    return 2
}
// 每个模块都有一个暴露的对象，暴露的对象默认是一个空对象
// 如果想让外部得到什么，只需要放入到这个空对象
module.exports={
    // myA:a,
    myFn:fn,
    mySum:sum
}


function sum(a,b){
    return a+b
}
