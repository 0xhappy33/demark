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
    let fileContract = await getData('../../contracts/DTUToken.sol');
    let contractCompile = await dataInstance(fileContract);

    //==== token

    dtuTokenAbi = contractCompile.contracts[':DTUToken'].interface;
    dtuTokenByteCode = contractCompile.contracts[':DTUToken'].bytecode;
    dtuContract = web3.eth.contract(JSON.parse(DTUTokenAbi));

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
                // console.log(childData.key);
                // console.log(currentAccount);
                let temp = childData.key;
                //let temp = '0xe7d7eB5271352E0963fAFC4A5F1D22535AFD6e84';
                 console.log(temp);
                var refTemp = firebase.database().ref('/users/' + temp);
                refTemp.once('value').then(function (snapshotTemp) {
                    var checkTrue = (snapshotTemp.val() && snapshotTemp.val().isAdmin);
                    // console.log(username);
                    // console.log('user/' + temp);
                    if (checkTrue == false) {
                        alert('You are not admin! You cannot deploy tokens!');
                        $('input').prop('disabled',true);
                    }
                    
                });
            }
        });
    });
    // truyen dtuid vao bien
    var dtuid = '2121116947';
    var refDBforAddr = await firebase.database().ref('/users/');
    refDBforAddr.on('value', function (snapshotAddr){  
        snapshotAddr.forEach(function (dataAddr){
            var key = dataAddr.key;
            var dataval = dataAddr.val();
            if(dataval.dtuID == dtuid){
                console.log(key);
            }
            
        });
    }); 



    // var tokensRef = databaseRef.child('/tokens/{id}');
    // var temp;
    // tokensRef.on("child_added", snap => {
    //     temp = snap.val();
    // });
    // console.log(tokensRef.key);
    // console.log(firebase.database().ref().child('tokens').push().key);

    // databaseRef.once('value', function (snapshot) {
    //     snapshot.forEach(function(childSnapshot) {
    //         var childKey = childSnapshot.key;
    //         var childData = childSnapshot.val();
    //         console.log(childKey);
    //         console.log(childData);
    //     });
    //     var datatemp = snapshot.val();
    //     console.log(datatemp.name);

    // });
}
// test request token
// function save_tokens() {
//     var uid = '-LSId1KwOtg4jftMxKZE';
//     var data = {
//         name: "updates23456",
//         symbol: "asd",
//         rating: "_contractRating",
//         decimals: "_contractDecimals",
//         cashier: "_contractCashier",
//         description: "description",
//         //address: res.address,
//         approve: true
//     }
//     var updates = {};
//     updates['/tokens/'+uid] = data;
//     firebase.database().ref().update(updates);
//     alert('test');
// }

async function clickSubmit(tokenId) {
    let _contractName = $('#contractName').val();
    let _contractSymbol = $('#contractSymbol').val();
    let _contractDecimals = $('#contractDecimals').val();
    let _contractRating = $('#contractRating').val();
    let _contractCashier = $('#contractCashier').val();
    let _contractDescription = $('#contractDescription').val();

    // console.log({_contractName:_contractName,_contractSymbol:_contractSymbol,_contractDecimals:_contractDecimals,_contractRating:_contractRating,_contractCashier:_contractCashier,_contractDescription:_contractDescription});

    let contract = web3.eth.contract(JSON.parse(abi));
    console.log(tokenId);
    
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
                console.log(res.address);
                var uid = tokenId;
                // var uid = firebase.database().ref().child('tokens').push().key;
                var data = {
                    name: _contractName,
                    symbol: _contractSymbol,
                    rating: _contractRating,
                    decimals: _contractDecimals,
                    cashier: _contractCashier,
                    description: _contractDescription,
                    address: res.address,
                    approve: true
                }
                var updates = {};
                updates['/tokens/' + uid] = data;
                firebase.database().ref().update(updates);
                alert('test');

            }
        });
}
