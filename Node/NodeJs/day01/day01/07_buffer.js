// 创建Buffer，存储字符串
// 分配内存空间（Buffer.alloc），单位是字节
var buf=Buffer.alloc(12,'abc黑子')
console.log(buf);
// 转字符串
console.log(buf.toString() );