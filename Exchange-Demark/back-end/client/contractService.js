
const DTUAbi = [ { "constant": true, "inputs": [], "name": "creator", "outputs": [ { "name": "", "type": "address" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "name", "outputs": [ { "name": "", "type": "string" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "_spender", "type": "address" }, { "name": "_value", "type": "uint256" } ], "name": "approve", "outputs": [ { "name": "success", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "totalSupply", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "getState", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [], "name": "reward", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "address" } ], "name": "isRegister", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "_from", "type": "address" }, { "name": "_to", "type": "address" }, { "name": "_value", "type": "uint256" } ], "name": "transferFrom", "outputs": [ { "name": "success", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "uint256" } ], "name": "bonus", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "_amount", "type": "uint256" } ], "name": "buyToken", "outputs": [ { "name": "", "type": "bool" } ], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": true, "inputs": [], "name": "decimals", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "_amount", "type": "uint256" } ], "name": "burn", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "name": "_owner", "type": "address" } ], "name": "balanceOf", "outputs": [ { "name": "balance", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "description", "outputs": [ { "name": "", "type": "string" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "rating", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "symbol", "outputs": [ { "name": "", "type": "string" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "_to", "type": "address" }, { "name": "_value", "type": "uint256" } ], "name": "transfer", "outputs": [ { "name": "success", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "address" } ], "name": "totalBonus", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "address" } ], "name": "timeRegister", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [], "name": "deposit", "outputs": [ { "name": "", "type": "bool" } ], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": true, "inputs": [ { "name": "_owner", "type": "address" }, { "name": "_spender", "type": "address" } ], "name": "allowance", "outputs": [ { "name": "remaining", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "cashier", "outputs": [ { "name": "", "type": "address" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "inputs": [ { "name": "_name", "type": "string" }, { "name": "_decimals", "type": "uint256" }, { "name": "_symbol", "type": "string" }, { "name": "_unitCan", "type": "uint256" }, { "name": "_cashier", "type": "address" }, { "name": "_description", "type": "string" } ], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [ { "indexed": true, "name": "_from", "type": "address" }, { "indexed": true, "name": "_valueSend", "type": "uint256" }, { "indexed": true, "name": "_exchange", "type": "uint256" } ], "name": "BuyToken", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "name": "_to", "type": "address" }, { "indexed": true, "name": "_valueSend", "type": "uint256" } ], "name": "FundTransfer", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "name": "_from", "type": "address" }, { "indexed": true, "name": "_valueSend", "type": "uint256" } ], "name": "Deposit", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "name": "", "type": "address" }, { "indexed": true, "name": "", "type": "address" }, { "indexed": true, "name": "", "type": "uint256" } ], "name": "Transfer", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "name": "", "type": "address" }, { "indexed": true, "name": "", "type": "address" }, { "indexed": true, "name": "", "type": "uint256" } ], "name": "Approval", "type": "event" } ];
//
//buy token from contract
const _buyToken = async (_instance, _amount) => {
    return new Promise((resolve, reject) => {
        _instance.buyToken.sendTransaction(_amount, (err, data) => {
            if (err) resolve(err);
            resolve(data);
        });
    });
}
//send token to a specific address
const _sendToken = async (_instance,_to, _amount) => {
    return new Promise((resolve, reject) => {
        _instance.transfer.sendTransaction(_to,_amount, (err, data) => {
            if (err) resolve(err);
            resolve(data);
        });
    });
}
//burn token , get eth back
const _burn = async (_instance, _amount) => {
    return new Promise((resolve, reject) => {
        _instance.burn.sendTransaction(_amount, (err, data) => {
            if (err) resolve(err);
            resolve(data);
        });
    });
}
//get bonus reward 
const _reward = async (_instance) => {
    return new Promise((resolve, reject) => {
        _instance.reward.sendTransaction((err, data) => {
            if (err) resolve(err);
            resolve(data);
        });
    });
}
//server will call this automatically each 6 hour or sometime, check state of contract, if dont have enough eth, inform to user to deposit to it
const _getState = async (_instance) => {
    return new Promise((resolve, reject) => {
        _instance.reward.call((err, data) => {
            if (err) resolve(err);
            resolve(data);
        });
    });
}
//deposit eth to contract
const _deposit = async (_instance,_amount) => {
    return new Promise((resolve, reject) => {
        _instance.deposit.sendTransaction(_amount,(err, data) => {
            if (err) resolve(err);
            resolve(data);
        });
    });
}
const _getDescription = async (_instance) => {
    return new Promise((resolve, reject) => {
        _instance.description.call((err, data) => {
            if (err) resolve(err);
            resolve(data);
        });
    });
}
const _getName = async (_instance) => {
    return new Promise((resolve, reject) => {
        _instance.name.call((err, data) => {
            if (err) resolve(err);
            resolve(data);
        });
    });
}
const _getDecimals = async (_instance) => {
    return new Promise((resolve, reject) => {
        _instance.decimals.call((err, data) => {
            if (err) resolve(err);
            resolve(data);
        });
    });
}
const _getSymbol = async (_instance) => {
    return new Promise((resolve, reject) => {
        _instance.symbol.call((err, data) => {
            if (err) resolve(err);
            resolve(data);
        });
    });
}
const _getRating = async (_instance) => {
    return new Promise((resolve, reject) => {
        _instance.rating.call((err, data) => {
            if (err) resolve(err);
            resolve(data);
        });
    });
}
const _getTotalSupply = async (_instance) => {
    return new Promise((resolve, reject) => {
        _instance.totalSupply.call((err, data) => {
            if (err) resolve(err);
            resolve(data);
        });
    });
}
const _getCreator = async (_instance) => {
    return new Promise((resolve, reject) => {
        _instance.creator.call((err, data) => {
            if (err) resolve(err);
            resolve(data);
        });
    });
}
const _getCashier = async (_instance) => {
    return new Promise((resolve, reject) => {
        _instance.cashier.call((err, data) => {
            if (err) resolve(err);
            resolve(data);
        });
    });
}
const _getBonus = async (_instance) => {
    return new Promise((resolve, reject) => {
        _instance.bonus.call((err, data) => {
            if (err) resolve(err);
            resolve(data);
        });
    });
}
const _getBalance = async (_instance,_address) => {
    return new Promise((resolve, reject) => {
        _instance.balanceOf.call(_address,(err, data) => {
            if (err) resolve(err);
            resolve(data);
        });
    });
}

class DTUContract {
    constructor(_address) {
        this.address = _address;
        this.instance = web3.eth.contract(DTUAbi.at(_address));
    }
    getAddress() {
        return this.address;
    }
    getInstance() {
        return this.instance;
    }
    buyToken(_amount) {
        _buyToken(this.instance, _amount);
    }
    sendToken(_to,_amount){
        _sendToken(this.instance,_to,_amount);
    }
    burn(_amount) {
        _burn(this.instance, _amount);
    }
    reward() {
        _reward(this.instance);
    }
    getState() {
        return _getState(this.instance);
    }
    deposit(_amount) {
        _deposit(this.instance,_amount);
    }
    getDescription() {
        return _getDescription(this.instance);
    }
    getName() {
        return _getName(this.instance);
    }
    getDecimals() {
        return _getDecimals(this.instance);
    }
    getSymbol() {
        return _getSymbol(this.instance);
    }
    getRating() {
        return _getRating(this.instance);
    }
    getTotalSupply() {
        return _getTotalSupply(this.instance);
    }
    getCreator() {
        return _getCreator(this.instance);
    }
    getCashier() {
        return _getCashier(this.instance);
    }
    getBonus() {
        return _getBonus(this.instance);
    }
    getBalance(_address) {
        return _getBalance(this.instance,_address);
    }

}
module.exports = DTUContract;