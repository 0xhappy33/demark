const contractCompile = require('../contracts/contractCompile.js');
const HDWalletProvider = require('truffle-hdwallet-provider')
const Web3 = require('web3');
//push your seed phases here
const seeds = "";
const rinkerby = "https://rinkeby.infura.io/";
const Contract = require('../models/contract_model');

const provider = new HDWalletProvider(seeds, rinkerby);
const web3 = new Web3(provider);


// cant use sync because web3 doesnt suport yet, have to use async 
const getAccount = () => {
    return new Promise((resolve, reject) => {
        web3.eth.getAccounts((err, result) => {
            if (err) resolve(err);
            // console.log(result[0]);
            resolve(result[0]);
        });
    });
}
const deployContract = (_tkContract, _name, _decimal, _symbol, _rating, _cashier,_description) => {
    return new Promise(async (resolve, reject) => {
        _tkContract.new(
            _name,
            _decimal,
            _symbol,
            _rating,
            _cashier,
            _description,
            {
                from: await getAccount(),
                data: `0x${contractCompile.bytecode}`,
                gas: 4800000
            }, (err, result) => {
                if (result.address) {
                    resolve(result.address);
                }
            }
        );

    });
}

//Simple version, without validation or sanitation
module.exports = {
    home: function (req, res) {
        res.send('Submit home page');
    },
    getContract: (req, res) => {
        Contract.findById(req.params.id, function (err, contract) {
            if (err) return next(err);
            res.send(contract);
        })
    },
    deleteContract: (req, res) => {
        Contract.findByIdAndRemove(req.params.id, function (err) {
            if (err) return next(err);
            res.send('Deleted successfully!');
        })
    },
    submitContract: async (req, res) => {
        let _approve;
        let _name;
        let _decimal;
        let _symbol;
        let _rating;
        let _cashier;
        let _address;
        let _description;
        let reqID = req.params.id;

        await Contract.findById(reqID, (err, contract) => {
            if (err) return next(err);
            _name = contract.name;
            _decimal = contract.decimal;
            _symbol = contract.symbol;
            _rating = contract.rating;
            _cashier = contract.cashier;
            _description = contract.description;
            _approve = contract.approve;
            // console.log(contract);     
        })
        if (_approve == true) {
            res.send('This contract have been deployed before ! ')
        }
        else {
            let dtutokenContract = await web3.eth.contract(JSON.parse(contractCompile.interface));
            _address = await deployContract(dtutokenContract, _name, _decimal, _symbol, _rating, _cashier,_description);

            Contract.findByIdAndUpdate(reqID, { $set: { approve: true, address: _address } }, (err, contract) => {
                if (err) return next(err);
                res.send(`Contract have been created, address :  ${_address}`);
            })
        }

    }
}