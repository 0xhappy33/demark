var web3 = require('web3');

console.log(web3.utils.sha3('BuyToken(address,uint256,uint256)'));


module.exports = {
    topicBuyToken : ()=>{
        return web3.utils.sha3('BuyToken(address,uint256,uint256)');
    },
    topicFundTransfer : ()=>{
        return web3.utils.sha3('FundTransfer(address,uint256)');
    },
    topicDeposit : ()=>{
        return web3.utils.sha3('Deposit(address,uint256)');
    },
    topicTransfer : ()=>{
        return web3.utils.sha3('Transfer(address,address,uint256)');
    }
}

