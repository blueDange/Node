/* console.log(1); //打印日志
    console.info(2); // 打印消息
    console.warn(3) // 打印警告
    console.error(4) //打印错误



// 开始计时
console.time('hei');
for (var i = 1; i <= 10000; i++) {

}
// 结束计时
console.timeEnd('hei')
 */

console.time('while')
var j=1
while(j<100000){
    j++
}
console.timeEnd('while')

console.time('do-while')
var k=1
do{
    k++
    
}while(k<=100000)
console.timeEnd('do-while')