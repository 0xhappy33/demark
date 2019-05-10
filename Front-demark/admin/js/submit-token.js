let dtuTokenAbi, dtuTokenByteCode, dtuContract;
let icoAbi, icoByteCode, icoContract;
let tokenICOAbi, tokenICOByteCode, tokenICOContract;


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
    // console.log("asas ",currentAccount);
    
    fileContract = await getData('../../contracts/DTUToken.sol');
    contractCompile = await dataInstance(fileContract);

    //==== token

    dtuTokenAbi = contractCompile.contracts[':DTUToken'].interface;
    dtuTokenByteCode = contractCompile.contracts[':DTUToken'].bytecode;
    dtuContract = web3.eth.contract(JSON.parse(dtuTokenAbi));

    ///===== token ico

    tokenICOAbi = contractCompile.contracts[':TokenICO'].interface;
    tokenICOByteCode = contractCompile.contracts[':TokenICO'].bytecode;
    tokenICOContract = web3.eth.contract(JSON.parse(tokenICOAbi));

    //======= contract ico

    icoAbi = contractCompile.contracts[':ICO'].interface;
    icoByteCode = contractCompile.contracts[':ICO'].bytecode;
    icoContract = web3.eth.contract(JSON.parse(icoAbi));

    //===========

    var refDB = await firebase.database().ref('/users/');
    refDB.once('value').then(function (snapshot) {
        snapshot.forEach(function (childData) {
            if (childData.key.toUpperCase() === currentAccount.toUpperCase()) {
                let temp = childData.key;
                console.log(temp);
                var refTemp = firebase.database().ref('/users/' + temp);
                refTemp.once('value').then(function (snapshotTemp) {
                    var checkTrue = (snapshotTemp.val() && snapshotTemp.val().isAdmin);
                    if (checkTrue == false) {
                        alert('You are not admin! You cannot deploy tokens!');
                        $('input').prop('disabled', true);
                    }

                });
            }
        });
    });

    // truyen dtuid vao bien
    var dtuid = '2121116947';
    var refDBforAddr = await firebase.database().ref('/users/');
    refDBforAddr.on('value', function (snapshotAddr) {
        snapshotAddr.forEach(function (dataAddr) {
            var key = dataAddr.key;
            var dataval = dataAddr.val();
            if (dataval.dtuID == dtuid) {
                console.log(key);
            }
        });
    });


}
