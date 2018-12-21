// var web3 = require('web3');
// import web3 from './web3'
// var web3 = new Web3(new Web3.providers.HttpProvider('https://rinkeby.infura.io'));

// console.log("Buy ", web3.utils.sha3('BuyToken(address,uint256,uint256)'));
// console.log("Fund ", web3.utils.sha3('FundTransfer(address,uint256)'));
// console.log("Depo ", web3.utils.sha3('Deposit(address,uint256)'));
// console.log("Tra ", web3.utils.sha3('Transfer(address,address,uint256)'));

module.exports = {
    topicBuyToken : ()=>{
        // return web3.utils.sha3('BuyToken(address,uint256,uint256)');
        return '0xf6f342132c7de5e5a1e99c8efae544c94731f3ff093f5c3c97c6973d9415cdfb';
    },
    topicFundTransfer : ()=>{
        // return web3.utils.sha3('FundTransfer(address,uint256)');
        return '0x97c35397cb6acebd9df368c206404479fc4c80dd6034d1b28943aaf582631870';
    },
    topicDeposit : ()=>{
        // return web3.utils.sha3('Deposit(address,uint256)');
        return '0xe1fffcc4923d04b559f4d29a8bfc6cda04eb5b0d3c460751c2402c5c5cc9109c';
    },
    topicTransfer : ()=>{
        // return web3.utils.sha3('Transfer(address,address,uint256)');
        return '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef';
    }
}
