let abi;
let byteCode;
let currentAccount;
let myContract;

import web3 from '../../clients/web3';

import firebase from 'firebase';

const getAccounts = async () => {
    return new Promise((resolve, reject) => {
        web3.eth.getAccounts((err, res) => {
            resolve(res[0]);
        });
    })
}

window.onload = async function () {
    
    currentAccount = await getAccounts();
    console.log(currentAccount)

    myContract = web3.eth.contract(abi);

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

}

module.exports = {

    async getAccounts () {
        return new Promise((resolve, reject) => {
            web3.eth.getAccounts((err, res) => {
                resolve(res[0]);
            });
        })
    },

    clickSubmitTokenICO(amountForSell, _timeLine, _price, addressOfTokenUsed, limitedToken) {
        let contractICO = web3.eth.contract(JSON.parse(ICOAbi));
            // console.log(tokenId);
            console.log(currentAccount);
            contractICO.new(
                amountForSell,
                _timeLine,
                _price,
                addressOfTokenUsed,
                limitedToken,
                {
                    data: `0x${ICOByteCode}`,
                    from: currentAccount,
                    gas: 4800000
                }, async (err, res) => {
    
                    if (res.address) {
                        console.log(res.address);
                        var data = {
                            address: res.address,
                            approve: true
                        }
                    }
                });
    
    }
}


