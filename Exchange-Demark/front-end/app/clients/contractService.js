import web3 from './web3';
import readByteCode from '../components/tokens/readbytecode';
const DTUAbi = readByteCode.getAbiDTUToken();
const ICOAbi = readByteCode.getAbiContractICO();
const TokenICOAbi = readByteCode.getAbiTokenICO();

const _buyToken = async (_instance, _currentAcc, _amount,_value) => {
    return new Promise((resolve, reject) => {
        _instance.buyToken.sendTransaction(_amount,{
            from : _currentAcc,
            value : _value * 1000000000000000000
        }, (err, data) => {
            if (err) reject(err);
            resolve(data);
        });
    });
}

const _buyTokenForICO = async (_instance, _currentAcc, _amount,_value) => {
    return new Promise((resolve, reject) => {
        _instance.buyCoin.sendTransaction(_amount,{
            from : _currentAcc,
            value : _value * 1000000000000000000
        }, (err, data) => {
            if (err) reject(err);
            resolve(data);
        });
    });
}

const _safeWithdraw = async (_instance, _currentAcc) => {
    return new Promise((resolve, reject) => {
        _instance.safeWithdrawal.sendTransaction({
            from : _currentAcc
        }, (err, data) => {
            if (err) reject(err);
            resolve(data);
        });
    });
}

const _checkGoalReached = async (_instance, _currentAcc) => {
    return new Promise((resolve, reject) => {
        _instance.checkGoalReached.sendTransaction({
            from : _currentAcc
        }, (err, data) => {
            if (err) reject(err);
            resolve(data);
        });
    });
}


const _mint = async (_instance, _currentAcc, _to,_amount) => {
    return new Promise((resolve, reject) => {
        _instance.mint.sendTransaction( _to,_amount,{
            from : _currentAcc
        }, (err, data) => {
            if (err) reject(err);
            resolve(data);
        });
    });
}

//send token to a specific address
const _sendToken = async (_instance, _currentAcc, _to, _amount) => {
    return new Promise((resolve, reject) => {
        _instance.transfer.sendTransaction(_to,_amount, {
            from: _currentAcc
        }, (err, data) => {
            if (err) reject(err);
            resolve(data);
        });
    });
}
//burn token , get eth back
const _burn = async (_instance, _currentAcc, _amount) => {
    return new Promise((resolve, reject) => {
        _instance.burn.sendTransaction(_amount, {
            from: _currentAcc
        }, (err, data) => {
            if (err) reject(err);
            resolve(data);
        });
    });
}
//get bonus reward 
const _reward = async (_instance, _currentAcc) => {
    return new Promise((resolve, reject) => {
        _instance.reward.sendTransaction({
            from: _currentAcc
        }, (err, data) => {
            if (err) reject(err);
            resolve(data);
        });
    });
}
//server will call this automatically each 6 hour or sometime, check state of contract, if dont have enough eth, inform to user to deposit to it
const _getState = async (_instance) => {
    return new Promise((resolve, reject) => {
        _instance.getState.call((err, data) => {
            if (err) reject(err);
            resolve(data.c[0]);
        });
    });
}

//deposit eth to contract
const _deposit = async (_instance, _currentAcc, _amount) => {
    return new Promise((resolve, reject) => { 
        _instance.deposit.sendTransaction({
            from : _currentAcc,
            value : _amount * 1000000000000000000
        }, (err, data) => {
            if (err) reject(err);
            resolve(data);
        });
    });
}

const getMetaAccounts = async () => {
    return new Promise((resolve, reject) => {
        web3.eth.getAccounts((err, accounts) => {
            if (err) reject(err);
            resolve(accounts[0]);
        })
    });
}
const _getWalletBalance = async (address) => {
    return new Promise((resolve, reject) => {
        web3.eth.getBalance(address,(err, balance) => {
            if (err) reject(err);
            resolve(balance.toNumber()/1000000000000000000);
        })
    });
}

const _getNameTokenICO = async (_instance) => {
    return new Promise((resolve, reject) => {
        _instance.name.call((err, data) => {
            if (err) reject(err);
            resolve(data);
        });
    });
}

const _getSymbolTokenICO = async (_instance) => {
    return new Promise((resolve, reject) => {
        _instance.symbol.call((err, data) => {
            if (err) reject(err);
            resolve(data);
        });
    });
}

const _getDecimalsTokenICO = async (_instance) => {
    return new Promise((resolve, reject) => {
        _instance.decimals.call((err, data) => {
            if (err) reject(err);
            resolve(data);
        });
    });
}

const _getTotalSupplyTokenICO = async (_instance) => {
    return new Promise((resolve, reject) => {
        _instance.totalSupply.call((err, data) => {
            if (err) reject(err);
            resolve(data);
        });
    });
}

const _getStartPreOrder = async (_instance) => {
    return new Promise((resolve, reject) => {
        _instance.startPreOrder.call((err, data) => {
            if (err) reject(err);
            resolve(data);
        });
    });
}

const _getEndPreOrder = async (_instance) => {
    return new Promise((resolve, reject) => {
        _instance.endPreOrder.call((err, data) => {
            if (err) reject(err);
            resolve(data);
        });
    });
}

const _getStartOrder = async (_instance) => {
    return new Promise((resolve, reject) => {
        _instance.startOrder.call((err, data) => {
            if (err) reject(err);
            resolve(data);
        });
    });
}

const _getEndOrder = async (_instance) => {
    return new Promise((resolve, reject) => {
        _instance.endOrder.call((err, data) => {
            if (err) reject(err);
            resolve(data);
        });
    });
}

const _getAmountPreOrder = async (_instance) => {
    return new Promise((resolve, reject) => {
        _instance.amountPreOrder.call((err, data) => {
            if (err) reject(err);
            resolve(data);
        });
    });
}

const _getAmountOrder = async (_instance) => {
    return new Promise((resolve, reject) => {
        _instance.amountOrder.call((err, data) => {
            if (err) reject(err);
            resolve(data);
        });
    });
}

const _getLimitedPreOrderSize = async (_instance) => {
    return new Promise((resolve, reject) => {
        _instance.limitedPreOrderSize.call((err, data) => {
            if (err) reject(err);
            resolve(data);
        });
    });
}

const _getTokenConnected = async (_instance) => {
    return new Promise((resolve, reject) => {
        _instance.tokenConnected.call((err, data) => {
            if (err) reject(err);
            resolve(data);
        });
    });
}

const _getPreOrderBasePrice = async (_instance) => {
    return new Promise((resolve, reject) => {
        _instance.preOrderBasePrice.call((err, data) => {
            if (err) reject(err);
            resolve(data);
        });
    });
}

const _getOrderBasePrice = async (_instance) => {
    return new Promise((resolve, reject) => {
        _instance.orderBasePrice.call((err, data) => {
            if (err) reject(err);
            resolve(data);
        });
    });
}

const _getName = async (_instance) => {
    return new Promise((resolve, reject) => {
        _instance.name.call((err, data) => {
            if (err) reject(err);
            resolve(data);
        });
    });
}
const _getDecimals = async (_instance) => {
    return new Promise((resolve, reject) => {
        _instance.decimals.call((err, data) => {
            if (err) reject(err);
            resolve(data);
        });
    });
}
const _getSymbol = async (_instance) => {
    return new Promise((resolve, reject) => {
        _instance.symbol.call((err, data) => {
            if (err) reject(err);
            resolve(data);
        });
    });
}
const _getRating = async (_instance) => {
    return new Promise((resolve, reject) => {
        _instance.rating.call((err, data) => {
            if (err) reject(err);
            resolve(data.c[0]);
        });
    });
}
const _getTotalSupply = async (_instance) => {
    return new Promise((resolve, reject) => {
        _instance.totalSupply.call((err, data) => {
            if (err) reject(err);
            resolve(data.c[0]);
        });
    });
}
const _getCreator = async (_instance) => {
    return new Promise((resolve, reject) => {
        _instance.creator.call((err, data) => {
            if (err) reject(err);
            resolve(data);
        });
    });
}
const _getCashier = async (_instance) => {
    return new Promise((resolve, reject) => {
        _instance.cashier.call((err, data) => {
            if (err) reject(err);
            resolve(data);
        });
    });
}
const _getDescription = async (_instance) => {
    return new Promise((resolve, reject) => {
        _instance.contractDescription.call((err, data) => {
            if (err) reject(err);
            resolve(data);
        });
    });
}
const _getBonus = async (_instance) => {
    return new Promise((resolve, reject) => {
        _instance.bonus.call((err, data) => {
            if (err) reject(err);
            resolve(data);
        });
    });
}
const _getBalance = async (_instance, _address) => {
    return new Promise((resolve, reject) => {
        _instance.balanceOf.call(_address, (err, data) => {
            if (err) reject(err);
            resolve(data.c[0]);
        });
    });
}
const _getYourBonus = async (_instance, _address) => {
    return new Promise((resolve, reject) => {
        _instance.totalBonus.call(_address, (err, data) => {
            if (err) reject(err);
            resolve(data.c[0]);
        });
    });
}
const _getYourReward = async (_instance, _address) => {
    return new Promise((resolve, reject) => {
        _instance.totalBonus.call(_address, (err, data) => {
            if (err) reject(err);
            resolve(data);
        });
    });
}

class ICOContract{
    constructor(_address) {
        this.address = _address;
        this.instance = web3.eth.contract(ICOAbi).at(_address);
    }

    getAddress() {
        return this.address;
    }

    getInstance() {
        return this.instance;
    }

    buyTokenForICO(_currentAcc, _amount,_value) {
        _buyTokenForICO(this.instance, _currentAcc, _amount,_value);
    }

    safeWithdraw(_currentAcc) {
        _safeWithdraw(this.instance, _currentAcc);
    }

    checkGoalReached(_currentAcc) {
        _checkGoalReached(this.instance, _currentAcc);
    }

    getPreOrderBasePrice() {
        return _getPreOrderBasePrice(this.instance);
    }

    getOrderBasePrice() {
        return _getOrderBasePrice(this.instance);
    }

    getTokenConnected() {
        return _getTokenConnected(this.instance);
    }

    getLimitedPreOrderSize() {
        return _getLimitedPreOrderSize(this.instance);
    } 

    getAmountPreOrder() {
        return _getAmountPreOrder(this.instance);
    }

    getAmountOrder() {
        return _getAmountOrder(this.instance);
    }

    getStartPreOrder() {
        return _getStartPreOrder(this.instance);
    }

    getStartOrder() {
        return _getStartOrder(this.instance);
    }

    getEndPreOrder() {
        return _getEndPreOrder(this.instance);
    }

    getEndOrder() {
        return _getEndOrder(this.instance);
    }

}

class TokenICOContract{
    constructor(_address) {
        this.address = _address;
        this.instance = web3.eth.contract(TokenICOAbi).at(_address);
    }

    getAddress() {
        return this.address;
    }

    getInstance() {
        return this.instance;
    }

    getName() {
        return _getNameTokenICO(this.instance);
    }

    getTotalSupply() {
        return _getTotalSupplyTokenICO(this.instance);
    }

    getDecimals() {
        return _getDecimalsTokenICO(this.instance);
    }

    getSymbol() {
        return _getSymbolTokenICO(this.instance);
    }

    mint(_currentAcc,_to, _amount) {
        _mint(this.instance, _currentAcc, _to,_amount);
    }
}

class DTUContract {
    constructor(_address) {
        this.address = _address;
        // this.instance = new web3.eth.Contract(DTUAbi, _address);
        this.instance = web3.eth.contract(DTUAbi).at(_address);
    }
    getAddress() {
        return this.address;
    }
    getInstance() {
        return this.instance;
    }
    buyToken(_currentAcc,_amount, _value) {
        _buyToken(this.instance, _currentAcc, _amount,_value);
    }
    sendToken(_currentAcc, _to, _amount) {
        _sendToken(this.instance, _currentAcc, _to, _amount);
    }
    burn(_currentAcc, _amount) {
        _burn(this.instance, _currentAcc, _amount);
    }
    reward(_currentAcc) {
        _reward(this.instance, _currentAcc);
    }
    getState() {
        return _getState(this.instance);
    }
    deposit(_currentAcc, _amount) {
        _deposit(this.instance, _currentAcc, _amount);
    }
    getYourReward(_currentAcc) {
        _getYourReward(this.instance, _currentAcc);
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
    getDescription() {
        return _getDescription(this.instance);
    }
    getBalance(_address) {
        return _getBalance(this.instance, _address);
    }
    getAccount() {
        return getMetaAccounts();
    }
    getWalletBalance(_address) {
        return _getWalletBalance(_address);
    }
    getYourBonus(_address) {
        return _getYourBonus(this.instance,_address);
    }
}

module.exports = {DTUContract,TokenICOContract,ICOContract};