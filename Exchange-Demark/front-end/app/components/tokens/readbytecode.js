module.exports = {
    getAbiContractICO(){
        return [
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "to",
                        "type": "address"
                    }
                ],
                "name": "destroy",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [
                    {
                        "name": "",
                        "type": "address"
                    }
                ],
                "name": "amountOf",
                "outputs": [
                    {
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [],
                "name": "checkGoalReached",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "amountPreOrder",
                "outputs": [
                    {
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "preOrderBasePrice",
                "outputs": [
                    {
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "tokenSoldInPreEther",
                "outputs": [
                    {
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "startPreOrder",
                "outputs": [
                    {
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "startOrder",
                "outputs": [
                    {
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "tokenSold",
                "outputs": [
                    {
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "isReachedGoal",
                "outputs": [
                    {
                        "name": "",
                        "type": "bool"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [
                    {
                        "name": "",
                        "type": "address"
                    }
                ],
                "name": "amountInEtherOf",
                "outputs": [
                    {
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "tokenRemaining",
                "outputs": [
                    {
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "amountOrder",
                "outputs": [
                    {
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "fundingGoal",
                "outputs": [
                    {
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "endOrder",
                "outputs": [
                    {
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "amountBuy",
                        "type": "uint256"
                    }
                ],
                "name": "buyCoin",
                "outputs": [],
                "payable": true,
                "stateMutability": "payable",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "orderBasePrice",
                "outputs": [
                    {
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "owner",
                "outputs": [
                    {
                        "name": "",
                        "type": "address"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "tokenSoldAfterPre",
                "outputs": [
                    {
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "tokenRemainingInPre",
                "outputs": [
                    {
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "inst",
                "outputs": [
                    {
                        "name": "",
                        "type": "address"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "isClosed",
                "outputs": [
                    {
                        "name": "",
                        "type": "bool"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "tokenConnected",
                "outputs": [
                    {
                        "name": "",
                        "type": "address"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "tokenSoldAfterPreEther",
                "outputs": [
                    {
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "tokenSoldInPre",
                "outputs": [
                    {
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "endPreOrder",
                "outputs": [
                    {
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "limitedPreOrderSize",
                "outputs": [
                    {
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "newOwner",
                        "type": "address"
                    }
                ],
                "name": "transferOwnership",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [],
                "name": "safeWithdrawal",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "name": "amountForSell",
                        "type": "uint256[]"
                    },
                    {
                        "name": "_timeLine",
                        "type": "uint256[]"
                    },
                    {
                        "name": "_price",
                        "type": "uint256[]"
                    },
                    {
                        "name": "addressOfTokenUsed",
                        "type": "address"
                    },
                    {
                        "name": "limited",
                        "type": "uint256"
                    }
                ],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "constructor"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "name": "owner",
                        "type": "address"
                    },
                    {
                        "indexed": true,
                        "name": "sold",
                        "type": "uint256"
                    }
                ],
                "name": "GoalReached",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "name": "sender",
                        "type": "address"
                    },
                    {
                        "indexed": true,
                        "name": "amount",
                        "type": "uint256"
                    },
                    {
                        "indexed": true,
                        "name": "isContribution",
                        "type": "bool"
                    }
                ],
                "name": "FinalizeICO",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "name": "previousOwner",
                        "type": "address"
                    },
                    {
                        "indexed": true,
                        "name": "newOwner",
                        "type": "address"
                    }
                ],
                "name": "OwnershipTransferred",
                "type": "event"
            }
        ]
    },

    getAbiTokenICO(){
        return [
            {
                "constant": true,
                "inputs": [],
                "name": "name",
                "outputs": [
                    {
                        "name": "",
                        "type": "string"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "_spender",
                        "type": "address"
                    },
                    {
                        "name": "_value",
                        "type": "uint256"
                    }
                ],
                "name": "approve",
                "outputs": [
                    {
                        "name": "success",
                        "type": "bool"
                    }
                ],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "totalSupply",
                "outputs": [
                    {
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "_from",
                        "type": "address"
                    },
                    {
                        "name": "_to",
                        "type": "address"
                    },
                    {
                        "name": "_value",
                        "type": "uint256"
                    }
                ],
                "name": "transferFrom",
                "outputs": [
                    {
                        "name": "success",
                        "type": "bool"
                    }
                ],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "decimals",
                "outputs": [
                    {
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "to",
                        "type": "address"
                    },
                    {
                        "name": "amount",
                        "type": "uint256"
                    }
                ],
                "name": "mint",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [
                    {
                        "name": "_owner",
                        "type": "address"
                    }
                ],
                "name": "balanceOf",
                "outputs": [
                    {
                        "name": "balance",
                        "type": "uint256"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "owner",
                "outputs": [
                    {
                        "name": "",
                        "type": "address"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "symbol",
                "outputs": [
                    {
                        "name": "",
                        "type": "string"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "_to",
                        "type": "address"
                    },
                    {
                        "name": "_value",
                        "type": "uint256"
                    }
                ],
                "name": "transfer",
                "outputs": [
                    {
                        "name": "success",
                        "type": "bool"
                    }
                ],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [
                    {
                        "name": "_owner",
                        "type": "address"
                    },
                    {
                        "name": "_spender",
                        "type": "address"
                    }
                ],
                "name": "allowance",
                "outputs": [
                    {
                        "name": "remaining",
                        "type": "uint256"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "newOwner",
                        "type": "address"
                    }
                ],
                "name": "transferOwnership",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "name": "_name",
                        "type": "string"
                    },
                    {
                        "name": "_decimals",
                        "type": "uint256"
                    },
                    {
                        "name": "_symbol",
                        "type": "string"
                    },
                    {
                        "name": "_totalSupply",
                        "type": "uint256"
                    }
                ],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "constructor"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "name": "to",
                        "type": "address"
                    },
                    {
                        "indexed": true,
                        "name": "amount",
                        "type": "uint256"
                    }
                ],
                "name": "Mint",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": false,
                        "name": "name",
                        "type": "string"
                    },
                    {
                        "indexed": false,
                        "name": "decimals",
                        "type": "uint256"
                    },
                    {
                        "indexed": false,
                        "name": "symbol",
                        "type": "string"
                    },
                    {
                        "indexed": false,
                        "name": "totalSupply",
                        "type": "uint256"
                    }
                ],
                "name": "Created",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "name": "previousOwner",
                        "type": "address"
                    },
                    {
                        "indexed": true,
                        "name": "newOwner",
                        "type": "address"
                    }
                ],
                "name": "OwnershipTransferred",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "name": "",
                        "type": "address"
                    },
                    {
                        "indexed": true,
                        "name": "",
                        "type": "address"
                    },
                    {
                        "indexed": true,
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "name": "Transfer",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "name": "",
                        "type": "address"
                    },
                    {
                        "indexed": true,
                        "name": "",
                        "type": "address"
                    },
                    {
                        "indexed": true,
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "name": "Approval",
                "type": "event"
            }
        ]
    },

    getBytecodeContractICO(){
        return "60806040523480156200001157600080fd5b5060405162001ed538038062001ed58339810180604052810190808051820192919060200180518201929190602001805182019291906020018051906020019092919080519060200190929190505050336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550846000815181101515620000b157fe5b90602001906020020151600e81905550846001815181101515620000d157fe5b90602001906020020151600f81905550836000815181101515620000f157fe5b90602001906020020151600a819055508360018151811015156200011157fe5b90602001906020020151600b819055508360028151811015156200013157fe5b90602001906020020151600c819055508360038151811015156200015157fe5b90602001906020020151600d81905550620001a5670de0b6b3a76400008460008151811015156200017e57fe5b90602001906020020151620003106401000000000262001ac6179091906401000000009004565b600181905550620001ef670de0b6b3a7640000846001815181101515620001c857fe5b90602001906020020151620003106401000000000262001ac6179091906401000000009004565b6002819055508060108190555081601560006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550620002ac62000268600254600f54620003106401000000000262001ac6179091906401000000009004565b6200028f600154600e54620003106401000000000262001ac6179091906401000000009004565b620003526401000000000262001aa5179091906401000000009004565b60098190555081601260016101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600e54600781905550600f54600881905550505050505062000374565b60008060008414156200032757600091506200034b565b82840290508284828115156200033957fe5b041415156200034757600080fd5b8091505b5092915050565b60008082840190508381101515156200036a57600080fd5b8091505092915050565b611b5180620003846000396000f300608060405260043610610174576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168062f55d9d1461017957806301608f5f146101bc57806301cb3b20146102135780630909a1061461022a57806328a539671461025557806328d8c964146102805780634c780bda146102ab578063513797e1146102d6578063519ee19e1461030157806352a2695c1461032c5780635d875a271461035b57806368646cf0146103b25780636e09e6e8146103dd5780637a3a0e841461040857806383d568ad14610433578063877925741461045e57806388a8ebf01461047e5780638da5cb5b146104a9578063994966d5146105005780639b716c891461052b578063bd6b222214610556578063c2b6b58c146105ad578063c4415ca3146105dc578063df5bf0e014610633578063e0cb9db41461065e578063e1115c5814610689578063edfa6a57146106b4578063f2fde38b146106df578063fd6b7ef814610722575b600080fd5b34801561018557600080fd5b506101ba600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610739565b005b3480156101c857600080fd5b506101fd600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610752565b6040518082815260200191505060405180910390f35b34801561021f57600080fd5b5061022861076a565b005b34801561023657600080fd5b5061023f61094d565b6040518082815260200191505060405180910390f35b34801561026157600080fd5b5061026a610953565b6040518082815260200191505060405180910390f35b34801561028c57600080fd5b50610295610959565b6040518082815260200191505060405180910390f35b3480156102b757600080fd5b506102c061095f565b6040518082815260200191505060405180910390f35b3480156102e257600080fd5b506102eb610965565b6040518082815260200191505060405180910390f35b34801561030d57600080fd5b5061031661096b565b6040518082815260200191505060405180910390f35b34801561033857600080fd5b50610341610971565b604051808215151515815260200191505060405180910390f35b34801561036757600080fd5b5061039c600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610984565b6040518082815260200191505060405180910390f35b3480156103be57600080fd5b506103c761099c565b6040518082815260200191505060405180910390f35b3480156103e957600080fd5b506103f26109a2565b6040518082815260200191505060405180910390f35b34801561041457600080fd5b5061041d6109a8565b6040518082815260200191505060405180910390f35b34801561043f57600080fd5b506104486109ae565b6040518082815260200191505060405180910390f35b61047c600480360381019080803590602001909291905050506109b4565b005b34801561048a57600080fd5b50610493611393565b6040518082815260200191505060405180910390f35b3480156104b557600080fd5b506104be611399565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34801561050c57600080fd5b506105156113be565b6040518082815260200191505060405180910390f35b34801561053757600080fd5b506105406113c4565b6040518082815260200191505060405180910390f35b34801561056257600080fd5b5061056b6113ca565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b3480156105b957600080fd5b506105c26113f0565b604051808215151515815260200191505060405180910390f35b3480156105e857600080fd5b506105f1611403565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34801561063f57600080fd5b50610648611429565b6040518082815260200191505060405180910390f35b34801561066a57600080fd5b5061067361142f565b6040518082815260200191505060405180910390f35b34801561069557600080fd5b5061069e611435565b6040518082815260200191505060405180910390f35b3480156106c057600080fd5b506106c961143b565b6040518082815260200191505060405180910390f35b3480156106eb57600080fd5b50610720600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050611441565b005b34801561072e57600080fd5b50610737611596565b005b8073ffffffffffffffffffffffffffffffffffffffff16ff5b60136020528060005260406000206000915090505481565b600d54421115156107e3576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252600d8152602001807f43616e742063616c6c206e6f770000000000000000000000000000000000000081525060200191505060405180910390fd5b601260179054906101000a900460ff16151515610868576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252600d8152602001807f43616e742063616c6c206e6f770000000000000000000000000000000000000081525060200191505060405180910390fd5b61087f600654600454611aa590919063ffffffff16565b601181905550600954601154101515610915576001601260166101000a81548160ff0219169083151502179055506011546000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167fec3f991caf7857d61663fd1bba1739e04abd4781238508cde554bb849d790c8560405160405180910390a35b6001601260176101000a81548160ff0219169083151502179055506001601260156101000a81548160ff021916908315150217905550565b600e5481565b60015481565b60045481565b600a5481565b600c5481565b60115481565b601260169054906101000a900460ff1681565b60146020528060005260406000206000915090505481565b60085481565b600f5481565b60095481565b600d5481565b600042600a54111580156109ca5750600b544211155b806109e5575042600c54111580156109e45750600d544211155b5b1515610a59576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252600d8152602001807f43616e742063616c6c206e6f770000000000000000000000000000000000000081525060200191505060405180910390fd5b601260159054906101000a900460ff16151515610ade576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252600d8152602001807f43616e742063616c6c206e6f770000000000000000000000000000000000000081525060200191505060405180910390fd5b34600081111515610b57576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252600d8152602001807f496e76616c69642076616c75650000000000000000000000000000000000000081525060200191505060405180910390fd5b34915042600a5411158015610b6e5750600b544211155b15610f74576010548310151515610bed576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252600a8152602001807f4e6f7420656e6f7567680000000000000000000000000000000000000000000081525060200191505060405180910390fd5b6007548311151515610c67576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252600d8152602001807f4f7574206f6620746f6b656e730000000000000000000000000000000000000081525060200191505060405180910390fd5b610c7c60015484611ac690919063ffffffff16565b8210151515610cf3576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252600a8152602001807f4e6f7420656e6f7567680000000000000000000000000000000000000000000081525060200191505060405180910390fd5b610d0883600754611b0490919063ffffffff16565b600781905550610d6083601360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054611aa590919063ffffffff16565b601360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550610df582601460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054611aa590919063ffffffff16565b601460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550610e4d83600354611aa590919063ffffffff16565b600381905550610e6882600454611aa590919063ffffffff16565b600481905550601560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663a9059cbb33856040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200182815260200192505050602060405180830381600087803b158015610f3357600080fd5b505af1158015610f47573d6000803e3d6000fd5b505050506040513d6020811015610f5d57600080fd5b810190808051906020019092919050505050611346565b601260009054906101000a900460ff161515610fc357610fa1600754600854611aa590919063ffffffff16565b6008819055506001601260006101000a81548160ff0219169083151502179055505b600854831115151561103d576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252600d8152602001807f4f7574206f6620746f6b656e730000000000000000000000000000000000000081525060200191505060405180910390fd5b61105260025484611ac690919063ffffffff16565b82101515156110c9576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252600a8152602001807f4e6f7420656e6f7567680000000000000000000000000000000000000000000081525060200191505060405180910390fd5b6110de83600854611b0490919063ffffffff16565b60088190555061113683601360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054611aa590919063ffffffff16565b601360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055506111cb82601460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054611aa590919063ffffffff16565b601460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208190555061122383600554611aa590919063ffffffff16565b60058190555061123e82600654611aa590919063ffffffff16565b600681905550601560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663a9059cbb33856040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200182815260200192505050602060405180830381600087803b15801561130957600080fd5b505af115801561131d573d6000803e3d6000fd5b505050506040513d602081101561133357600080fd5b8101908080519060200190929190505050505b60011515833373ffffffffffffffffffffffffffffffffffffffff167fc6256fb2ecd8d2f158a68a9262e6b66c4bf8f05c85f472ea17929c27d1d6ed4d60405160405180910390a4505050565b60025481565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60055481565b60075481565b601560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b601260159054906101000a900460ff1681565b601260019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60065481565b60035481565b600b5481565b60105481565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561149c57600080fd5b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16141515156114d857600080fd5b8073ffffffffffffffffffffffffffffffffffffffff166000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a3806000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b6000600d5442111515611611576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252600d8152602001807f43616e742063616c6c206e6f770000000000000000000000000000000000000081525060200191505060405180910390fd5b601260159054906101000a900460ff161515611695576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252600d8152602001807f43616e742063616c6c206e6f770000000000000000000000000000000000000081525060200191505060405180910390fd5b601360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905060008110151515611750576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260088152602001807f4e6f2076616c756500000000000000000000000000000000000000000000000081525060200191505060405180910390fd5b601260169054906101000a900460ff161515611900576000601360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208190555060008111156118ff573373ffffffffffffffffffffffffffffffffffffffff166108fc601460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549081150290604051600060405180830381858888f19350505050156118b95760001515601460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020543373ffffffffffffffffffffffffffffffffffffffff167fc6256fb2ecd8d2f158a68a9262e6b66c4bf8f05c85f472ea17929c27d1d6ed4d60405160405180910390a46118fe565b80601360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055505b5b5b601260169054906101000a900460ff1615611aa2576000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156119d9576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260178152602001807f43616e742063616c6c20746869732066756e6374696f6e00000000000000000081525060200191505060405180910390fd5b3373ffffffffffffffffffffffffffffffffffffffff166108fc6011549081150290604051600060405180830381858888f1935050505015611a8557600015156011546000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167fc6256fb2ecd8d2f158a68a9262e6b66c4bf8f05c85f472ea17929c27d1d6ed4d60405160405180910390a4611aa1565b6000601260166101000a81548160ff0219169083151502179055505b5b50565b6000808284019050838110151515611abc57600080fd5b8091505092915050565b6000806000841415611adb5760009150611afd565b8284029050828482811515611aec57fe5b04141515611af957600080fd5b8091505b5092915050565b600080838311151515611b1657600080fd5b828403905080915050929150505600a165627a7a72305820bcc1a35b15272bfd8c78368c9a2521d816f6dfb041db3b93ead7ac3f7202cfdd0029"
    },

    getBytecodeTokenICO(){
        return "60806040523480156200001157600080fd5b5060405162001493380380620014938339810180604052810190808051820192919060200180519060200190929190805182019291906020018051906020019092919050505033600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508360039080519060200190620000b092919062000201565b50826004819055508160059080519060200190620000d092919062000201565b50806006819055507f93658079481e20c5865eccecd193b0bdd8648bd50974260b4f1ba8c7f5b1595284848484604051808060200185815260200180602001848152602001838103835287818151815260200191508051906020019080838360005b838110156200014f57808201518184015260208101905062000132565b50505050905090810190601f1680156200017d5780820380516001836020036101000a031916815260200191505b50838103825285818151815260200191508051906020019080838360005b83811015620001b85780820151818401526020810190506200019b565b50505050905090810190601f168015620001e65780820380516001836020036101000a031916815260200191505b50965050505050505060405180910390a150505050620002b0565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106200024457805160ff191683800117855562000275565b8280016001018555821562000275579182015b828111156200027457825182559160200191906001019062000257565b5b50905062000284919062000288565b5090565b620002ad91905b80821115620002a95760008160009055506001016200028f565b5090565b90565b6111d380620002c06000396000f3006080604052600436106100ba576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806306fdde03146100bf578063095ea7b31461014f57806318160ddd146101b457806323b872dd146101df578063313ce5671461026457806340c10f191461028f57806370a08231146102dc5780638da5cb5b1461033357806395d89b411461038a578063a9059cbb1461041a578063dd62ed3e1461047f578063f2fde38b146104f6575b600080fd5b3480156100cb57600080fd5b506100d4610539565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156101145780820151818401526020810190506100f9565b50505050905090810190601f1680156101415780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34801561015b57600080fd5b5061019a600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803590602001909291905050506105d7565b604051808215151515815260200191505060405180910390f35b3480156101c057600080fd5b506101c96106bf565b6040518082815260200191505060405180910390f35b3480156101eb57600080fd5b5061024a600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803590602001909291905050506106c5565b604051808215151515815260200191505060405180910390f35b34801561027057600080fd5b50610279610a47565b6040518082815260200191505060405180910390f35b34801561029b57600080fd5b506102da600480360381019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610a4d565b005b3480156102e857600080fd5b5061031d600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610c90565b6040518082815260200191505060405180910390f35b34801561033f57600080fd5b50610348610cd8565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34801561039657600080fd5b5061039f610cfe565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156103df5780820151818401526020810190506103c4565b50505050905090810190601f16801561040c5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34801561042657600080fd5b50610465600480360381019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610d9c565b604051808215151515815260200191505060405180910390f35b34801561048b57600080fd5b506104e0600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610f86565b6040518082815260200191505060405180910390f35b34801561050257600080fd5b50610537600480360381019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919050505061100d565b005b60038054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156105cf5780601f106105a4576101008083540402835291602001916105cf565b820191906000526020600020905b8154815290600101906020018083116105b257829003601f168201915b505050505081565b600081600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550818373ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a46001905092915050565b60065481565b6000816000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205410158015610791575081600160008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205410155b801561079d5750600082115b15610a3b576107f3826000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205461116590919063ffffffff16565b6000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550610886826000808773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205461118690919063ffffffff16565b6000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208190555061095782600160008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205461118690919063ffffffff16565b600160008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550818373ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef60405160405180910390a460019050610a40565b600090505b9392505050565b60045481565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515610aa957600080fd5b80600654111515610b22576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252600d8152602001807f496e76616c69642076616c75650000000000000000000000000000000000000081525060200191505060405180910390fd5b600081111515610b9a576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252600d8152602001807f496e76616c69642076616c75650000000000000000000000000000000000000081525060200191505060405180910390fd5b610beb816000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205461116590919063ffffffff16565b6000808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550610c428160065461118690919063ffffffff16565b600681905550808273ffffffffffffffffffffffffffffffffffffffff167f0f6798a560793a54c3bcfe86a93cde1e73087d944c0ea20544137d412139688560405160405180910390a35050565b60008060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60058054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610d945780601f10610d6957610100808354040283529160200191610d94565b820191906000526020600020905b815481529060010190602001808311610d7757829003601f168201915b505050505081565b6000816000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205410158015610dec5750600082115b15610f7b57610e42826000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205461118690919063ffffffff16565b6000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550610ed5826000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205461116590919063ffffffff16565b6000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550818373ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef60405160405180910390a460019050610f80565b600090505b92915050565b6000600160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905092915050565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561106957600080fd5b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16141515156110a557600080fd5b8073ffffffffffffffffffffffffffffffffffffffff16600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a380600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b600080828401905083811015151561117c57600080fd5b8091505092915050565b60008083831115151561119857600080fd5b828403905080915050929150505600a165627a7a72305820f5bb663784aa27af8f780caf4b2cca9a5886340dad19c5a8bf6b17217c788d9a0029"
    },

    getAbiDTUToken(){
        return [ { "constant": false, "inputs": [ { "name": "_spender", "type": "address" }, { "name": "_value", "type": "uint256" } ], "name": "approve", "outputs": [ { "name": "success", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "_amount", "type": "uint256" } ], "name": "burn", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "_amount", "type": "uint256" } ], "name": "buyToken", "outputs": [ { "name": "", "type": "bool" } ], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": false, "inputs": [], "name": "deposit", "outputs": [ { "name": "", "type": "bool" } ], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": false, "inputs": [], "name": "reward", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "_to", "type": "address" }, { "name": "_value", "type": "uint256" } ], "name": "transfer", "outputs": [ { "name": "success", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "_from", "type": "address" }, { "name": "_to", "type": "address" }, { "name": "_value", "type": "uint256" } ], "name": "transferFrom", "outputs": [ { "name": "success", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "name": "_name", "type": "string" }, { "name": "_decimals", "type": "uint256" }, { "name": "_symbol", "type": "string" }, { "name": "_unitCan", "type": "uint256" }, { "name": "_cashier", "type": "address" }, { "name": "_description", "type": "string" } ], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [ { "indexed": true, "name": "_from", "type": "address" }, { "indexed": true, "name": "_valueSend", "type": "uint256" }, { "indexed": true, "name": "_exchange", "type": "uint256" } ], "name": "BuyToken", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "name": "_to", "type": "address" }, { "indexed": true, "name": "_valueSend", "type": "uint256" } ], "name": "FundTransfer", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "name": "_from", "type": "address" }, { "indexed": true, "name": "_valueSend", "type": "uint256" } ], "name": "Deposit", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "name": "", "type": "address" }, { "indexed": true, "name": "", "type": "address" }, { "indexed": true, "name": "", "type": "uint256" } ], "name": "Transfer", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "name": "", "type": "address" }, { "indexed": true, "name": "", "type": "address" }, { "indexed": true, "name": "", "type": "uint256" } ], "name": "Approval", "type": "event" }, { "constant": true, "inputs": [ { "name": "_owner", "type": "address" }, { "name": "_spender", "type": "address" } ], "name": "allowance", "outputs": [ { "name": "remaining", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "_owner", "type": "address" } ], "name": "balanceOf", "outputs": [ { "name": "balance", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "uint256" } ], "name": "bonus", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "cashier", "outputs": [ { "name": "", "type": "address" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "contractDescription", "outputs": [ { "name": "", "type": "string" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "creator", "outputs": [ { "name": "", "type": "address" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "decimals", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "getState", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "address" } ], "name": "isRegister", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "name", "outputs": [ { "name": "", "type": "string" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "rating", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "symbol", "outputs": [ { "name": "", "type": "string" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "address" } ], "name": "timeRegister", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "address" } ], "name": "totalBonus", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "totalSupply", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" } ]
    }
}