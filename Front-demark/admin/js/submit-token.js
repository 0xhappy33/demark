import firebase from 'firebase';


let abi;
let byteCode;
let currentAccount;
let dataInstance = async (_data) => {
    return new Promise((resolve, reject) => {
        BrowserSolc.getVersions(function (soljsonSources, soljsonReleases) {
            BrowserSolc.loadVersion("soljson-v0.4.25+commit.59dbf8f1.js", function (compiler) {
                source = _data;
                optimize = 1;
                result = compiler.compile(source, optimize);
                resolve(result);
            });
        });
    });
}

//get data in DTUToken.sol
function getData(path) {
    return new Promise((resolve, reject) => {
        $.get(path, function (data) {
            // console.log(data);
            resolve(data);
        }, 'text');
    })
}

const getAccounts = async () => {
    return new Promise((resolve, reject) => {
        web3.eth.getAccounts((err, res) => {
            resolve(res[0]);
        });
    })

}
window.onload = async function () {
    if (typeof web3 !== 'undefined') {
        web3 = new Web3(web3.currentProvider);
    } else {
        web3 = new Web3(new Web3.providers.HttpProvider("https://rinkeby.infura.io/"));
    }
    if (typeof BrowserSolc == 'undefined') {
        console.log("You have to load browser-solc.js in the page.  We recommend using a <script> tag.");
        throw new Error();
    }
    currentAccount = await getAccounts();
    console.log(currentAccount);
    
    let fileContract = await getData('../contracts/DTUToken.sol');
    let contractCompile = await dataInstance(fileContract);
    abi = contractCompile.contracts[':Ballot'].interface;
    byteCode = contractCompile.contracts[':Ballot'].bytecode;
}

async function clickSubmit() {
    let _contractName = $('#contractName').val();
    let _contractSymbol = $('#contractSymbol').val();
    let _contractDecimals = $('#contractDecimals').val();
    let _contractRating = $('#contractRating').val();
    let _contractCashier = $('#contractCashier').val();
    let _contractDescription = $('#contractDescription').val();

    let contract = web3.eth.contract(JSON.parse(abi));

    contract.new(
        _contractName,
        _contractDecimals,
        _contractSymbol,
        _contractRating,
        _contractCashier,
        _contractDescription,
        {
            data: `0x${byteCode}`,
            from: currentAccount,
            gas: 4800000
        }, async (err, res) => {

            if (res.address) {
                var data ={
                    name:_contractName,
                    symbol:_contractSymbol,
                    rating:_contractRating,
                    decimals:_contractDecimals,
                    cashier:_contractCashier,
                    description:description,
                    address:res.address,
                    approve: true
                }
                firebase.initializeApp({          
                    apiKey: "AIzaSyDrssCstHJYF07bIF1DeIzYZN9SdCgA85U",
                    authDomain: "demark-dtbs.firebaseapp.com",
                    databaseURL: "https://demark-dtbs.firebaseio.com",
                    projectId: "demark-dtbs",
                    storageBucket: "demark-dtbs.appspot.com",
                    messagingSenderId: "518328352226"             
                });
                
            }
        });

}