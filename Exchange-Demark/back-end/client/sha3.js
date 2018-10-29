
module.exports = {
    topicBuyToken : ()=>{
        return web3.sha3('BuyToken(address,uint256,uint256)');
    },
    topicFundTransfer : ()=>{
        return web3.sha3('FundTransfer(address,uint256)');
    },
    topicDeposit : ()=>{
        return web3.sha3('Deposit(address,uint256)');
    },
    topicTransfer : ()=>{
        return web3.sha3('Transfer(address,address,uint256)');
    }
}

