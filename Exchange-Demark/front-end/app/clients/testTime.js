let blockNumber = '0x34976f'
let timeStamp = '0x5c04f31c'
let from = '0x000000000000000000000000a75b2d7b277919c224b198743c88efe608ba8c1e'
let send = '0x00000000000000000000000000000000000000000000000029a2241af62c0000'
let exchange = '0x00000000000000000000000000000000000000000000000006f05b59d3b20000'
// console.log("from ", '0x'+from.slice(from.length-40));
// console.log("blockNumber ", parseInt(blockNumber,16));
let intTime = parseInt(timeStamp, 16);
console.log("timeStamp ", intTime);

// console.log("send ", parseInt(send,16));
// console.log("exchange ", parseInt(exchange,16));
// let last = new Date(intTime).getTime()

let d = new Date(intTime * 1000);
// console.log(d);

console.log(d.getUTCHours()+'h'+d.getMinutes(),d.getDate()+"/"+(d.getMonth()+1)+"/"+d.getFullYear() );

