import Web3 from "web3";

let web3;

// We are in the browser and metamask is running
// if (typeof window !== "undefined" && typeof window.web3 !== "undefined") {
//   web3 = new Web3(window.web3.currentProvider);
if (typeof window.web3 !== "undefined") {
  web3 = new Web3(window.web3.currentProvider);

} else {
  // We are on the server or the user is not running metamask
  const provider = new Web3.providers.HttpProvider("https://rinkeby.infura.io/");
  window.web3 = new Web3(provider);
  web3.eth.defaultAccount = window.web3.eth.defaultAccount;
}

export default web3;