const DTU = require('../contracts/contractService')
const sha3 = require('../sha3')
const request = require('request');
let myAPI = 'NQNPZCN9E9X3BX5WEGISP84158T55AMW21';

module.exports = {
    viewToken: async function (req, res) {
        let tokenAddress = req.query.address;
        let tokenEvents = req.query.events;
        let _topic;
        let dtu = new DTU(tokenAddress);
        let _name = await dtu.getName();
        let _symbol = await dtu.getSymbol();
        let _decimals = parseInt(await dtu.getDecimals());
        let _rating = parseInt(await dtu.getRating());
        let _cashier = await dtu.getCashier();
        let _from = [];
        let _to = [];
        let _valueSend = [];
        let _exchange = [];

        if (tokenEvents == 'BuyToken') {
            _topic = sha3.topicBuyToken();
            let _option = { url: `https://api-rinkeby.etherscan.io/api?module=logs&action=getLogs&fromBlock=0&toBlock=latest&address=${tokenAddress}&topic0=${_topic}&apikey=${myAPI}` }
            function callbackBuyToken(error, response, body) {
                if (!error && response.statusCode == 200) {
                    let info = JSON.parse(body);
                    let results = info.result;
                    results.forEach(data => {
                        let tp = data.topics;
                        _from.push(`0x${tp[1].substring(26)}`);
                        _valueSend.push(parseInt(tp[2]));
                        _exchange.push(parseInt(tp[3]));
                    });
                }
                res.send({ name: _name, symbol: _symbol, decimals: _decimals, rating: _rating, cashier: _cashier, from: _from, _valueSend: _valueSend, exchange: _exchange });
            }
            request(_option, callbackBuyToken);

        }
        if (tokenEvents == 'FundTransfer') {
            _topic = sha3.topicFundTransfer();
            let _option = { url: `https://api-rinkeby.etherscan.io/api?module=logs&action=getLogs&fromBlock=0&toBlock=latest&address=${tokenAddress}&topic0=${_topic}&apikey=${myAPI}` }
            function callbackFundTransfer(error, response, body) {
                if (!error && response.statusCode == 200) {
                    let info = JSON.parse(body);
                    let results = info.result;
                    results.forEach(data => {
                        let tp = data.topics;
                        _to.push(`0x${tp[1].substring(26)}`);
                        _valueSend.push(parseInt(tp[2]));
                    });
                }
                res.send({ name: _name, symbol: _symbol, decimals: _decimals, rating: _rating, cashier: _cashier, to: _to, _valueSend: _valueSend });
            }
            request(_option, callbackFundTransfer);

        }
        if (tokenEvents == 'Deposit') {
            _topic = sha3.topicDeposit();
            let _option = { url: `https://api-rinkeby.etherscan.io/api?module=logs&action=getLogs&fromBlock=0&toBlock=latest&address=${tokenAddress}&topic0=${_topic}&apikey=${myAPI}` }
            function callbackDeposit(error, response, body) {
                if (!error && response.statusCode == 200) {
                    let info = JSON.parse(body);
                    let results = info.result;
                    results.forEach(data => {
                        let tp = data.topics;
                        _from.push(`0x${tp[1].substring(26)}`);
                        _valueSend.push(parseInt(tp[2]));
                    });
                }
                res.send({ name: _name, symbol: _symbol, decimals: _decimals, rating: _rating, cashier: _cashier, from: _from, _valueSend: _valueSend });
            }
            request(_option, callbackDeposit);
        }
    }
}