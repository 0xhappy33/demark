var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider('http://rinkeby.infura.io'));
console.log("Buy ", web3.utils.sha3('BuyToken(address,uint256,uint256)'));
console.log("Fund ", web3.utils.sha3('FundTransfer(address,uint256)'));
console.log("Depo ", web3.utils.sha3('Deposit(address,uint256)'));
console.log("Tra ", web3.utils.sha3('Transfer(address,address,uint256)'));

// module.exports = {
//     topicBuyToken : ()=>{
//         return web3.utils.sha3('BuyToken(address,uint256,uint256)');
//     },
//     topicFundTransfer : ()=>{
//         return web3.utils.sha3('FundTransfer(address,uint256)');
//     },
//     topicDeposit : ()=>{
//         return web3.utils.sha3('Deposit(address,uint256)');
//     },
//     topicTransfer : ()=>{
//         return web3.utils.sha3('Transfer(address,address,uint256)');
//     }
// }