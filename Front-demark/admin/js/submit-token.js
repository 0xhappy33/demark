
let abi;
let byteCode;
let currentAccount;
let myContract;
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

    // console.log(currentAccount);

    let fileContract = await getData('../contracts/DTUToken.sol');
    let contractCompile = await dataInstance(fileContract);
    abi = contractCompile.contracts[':DTUToken'].interface;
    byteCode = contractCompile.contracts[':DTUToken'].bytecode;
    myContract = web3.eth.contract(JSON.parse(abi));
    var databaseRef = firebase.database().ref();
    var tokensRef = databaseRef.child('/tokens/{id}');
    var temp;
    tokensRef.on("child_added", snap => {
        temp = snap.val();
    });
    // console.log(tokensRef.key);
    // console.log(firebase.database().ref().child('tokens').push().key);


}

