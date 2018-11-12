import DTU from './contractService';
import SHA3 from './sha3';
let dtuInstance;
const myAPI = 'NQNPZCN9E9X3BX5WEGISP84158T55AMW21';
let _topic;

//click to view a specific token from market
async function viewTokenFromMarket() {
    // let _tokenAddress = value of some textbox;
    dtuInstance = new DTU(_tokenAddress);
}
//click to view a specific token from comboBox
async function viewTokenFromComboBox(_tokenAddress) {
    dtuInstance = new DTU(_tokenAddress);
}

//click button deposit to this token
async function deposit() {
    //let _amount = amount in some textbox
    await dtuInstance.deposit(_amount);
    // do something after deposit
}
//click button buyToken
async function buyToken() {
    //let _amount = amount in some textbox
    await dtuInstance.buyToken(_amount);
    //lable balance increase after buyToken,
    let _balance = await parseInt(dtuInstance.getBalance(web3.eth.accounts[0]));
    //lable totalSupply increase after buyToken,
    let _totalSupply = await parseInt(dtuInstance.getTotalSuppy());
    // do something after buyToken
}
//click button sendToken
async function sendToken(){
    //let _to = address in some textbox
    //let _amount = amount in some textbox
    await dtuInstance.sendToken(_to,_amount);
    //lable balance decrease after sendToken,
    let _balance = await parseInt(dtuInstance.getBalance(web3.eth.accounts[0]));
    
    // do something after sendToken
}
//click button burnToken
async function burn() {
    //let _amount = amount in some textbox
    await dtuInstance.burn(_amount);
    //lable balance decrease after burn,
    let _balance = await parseInt(dtuInstance.getBalance(web3.eth.accounts[0]));
    //lable totalSupply decrease after burn,
    let _totalSupply = await parseInt(dtuInstance.getTotalSuppy());
    // do something after burnToken
}

//click button reward
async function reward() {
    await dtuInstance.reward();
    //lable balance increase after burn,
    let _balance = await parseInt(dtuInstance.getBalance(web3.eth.accounts[0]));
    //lable totalSupply increase after burn,
    let _totalSupply = await parseInt(dtuInstance.getTotalSuppy());
    // do something after get reward
}

function selectBuyToken(){
    return SHA3.topicBuyToken();
}
function selectDeposit(){
    return SHA3.topicDeposit();
}
function selectFundTransfer(){
    return SHA3.topicFundTransfer();
}
function selectTransfer(){
    return SHA3.topicTransfer();
}