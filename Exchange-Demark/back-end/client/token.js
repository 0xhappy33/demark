import DTU from './contractService';
import SHA3 from './sha3';
let dtuInstance;
const myAPI = 'NQNPZCN9E9X3BX5WEGISP84158T55AMW21';
let _topic;

//click to view a specific token
async function viewToken() {
    // let _tokenAddress = value of some textbox;
    dtuInstance = new DTU(_tokenAddress);
    let _name = await dtuInstance.getName();
    let _symbol = await dtuInstance.getSymbol();
    let _decimals = parseInt(await dtuInstance.getDecimals());
    let _rating = parseInt(await dtuInstance.getRating());
    let _cashier = await dtuInstance.getCashier();
    let _totalSupply = await parseInt(dtuInstance.getTotalSuppy());
    let _description = await dtuInstance.getDescription();
    let _bonus = await parseInt(dtuInstance.getBonus());
    let _balance = await parseInt(dtuInstance.getBalance(web3.eth.accounts[0]));
    //set value to some lable 
        //lable name .val() =  _name;
        //lable _symbol .val() _symbol;
        //...
    //

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

async function viewEvents(){
    //this topic depend on which events user choose to view, default topicBuyToken
    // _topic = sha3.topicBuyToken();

    //send request to etherscan api and get corresponding response 
}