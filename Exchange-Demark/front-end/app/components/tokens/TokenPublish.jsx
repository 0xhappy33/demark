import React from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';
import firebase from 'firebase';
import web3 from '../../clients/web3';

let currentAccount;

import readTokenByteCode from './readbytecode.js';


let addressDemark = "0xA75B2d7b277919c224B198743C88EfE608BA8c1e";

let contractICOInstance = web3.eth.contract(readTokenByteCode.getAbiContractICO());
let tokenICOInstance = web3.eth.contract(readTokenByteCode.getAbiTokenICO());

let contractICOBytecode = readTokenByteCode.getBytecodeContractICO();
let tokenICOBytecode = readTokenByteCode.getBytecodeTokenICO();

let deployFee = 2000000000000000000;


let TokenPublish = injectIntl(React.createClass({

    getInitialState() {
        return {
            // contract ICO
            startPreOrderTime: null,
            endPreOrderTime: null,
            startOrderTime: null,
            endOrderTime: null,
            preOrderAmount: null,
            orderAmount: null,
            preOrderPrice: null,
            orderPrice: null,
            addressOfTokenUsed: null,
            limitedToken: null,

            // Token for doing ICO
            nameOfTokenICO: null,
            decimals: null,
            symbol: null,
            totalSupply: null,
            // currentAccount: null

            deployFee : 2000000000000000000
        };
    },

    componentWillMount() {
        // Load custom in main and overrides
        require("../../css/main.less");
    },

    componentDidMount() {
        if (window.web3 && window.web3.currentProvider.isMetaMask) {
            window.web3.eth.getAccounts((error, accounts) => {
                currentAccount = accounts[0];
                console.log(currentAccount);
                // Do whatever you need to.
                //this.setState({currentAccount: accounts[0]});
            });
        } else {
            console.log('MetaMask account not detected :(');
        }
        //------------------------------------   
        
    },

    returnDatesFromconvertTimeOrderToInt() {
        var startPreOrderTime = this.state.startPreOrderTime;
        var endPreOrderTime = this.state.endPreOrderTime;

        var startOrderTime = this.state.startOrderTime;
        var endOrderTime = this.state.endOrderTime;

        var myStartPreOrderTime = new Date(startPreOrderTime).getTime() / 1000.0;
        var myEndPreOrderTime = new Date(endPreOrderTime).getTime() / 1000.0;
        var myStartOrderTime = new Date(startOrderTime).getTime() / 1000.0;
        var myEndOrderTime = new Date(endOrderTime).getTime() / 1000.0;

        var start = [];
        start.push(myStartPreOrderTime, myEndPreOrderTime, myStartOrderTime, myEndOrderTime);

        return start;

    },

    openModal: function () {
        this.setState({ showModal: true });
    },

    closeModal: function () {
        this.setState({ showModal: false });
    },
    
    
    handleValidation: function(e) {
        e.preventDefault();
        if (this.validate(e, true))
            this.openModal();
    },

    handleChange(e) {
        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value
        })
    },

    //  validate for form 
    validate: function (e, showAlerts) {
        e.preventDefault();

        if (this.state.amount < 0) {
          this.props.setAlert('warning', this.props.intl.formatMessage({id: 'form.smaller'}));
        }
        else if (!this.state.amount) {
          this.props.setAlert('warning', this.props.intl.formatMessage({id: 'form.empty'}));
        }

        else if (parseFloat(this.state.amount) > this.props.balance) {
          this.props.setAlert('warning',
            this.props.intl.formatMessage({id: 'deposit.not_enough'}, {
              currency: this.props.symbol,
              balance: this.props.balance,
              amount: this.state.amount
            })
          );
        }
        else {
          this.setState({
            newDeposit: true,
            confirmMessage:
              <FormattedMessage id='deposit.confirm' values={{
                  amount: this.state.amount,
                  currency: this.props.contractName
                }}
              />
          });
    
          this.props.showAlert(false);
    
          return true;
        }

        this.setState({
            newDeposit: false
        });

        if (showAlerts)
            this.props.showAlert(true);

        e.stopPropagation();
    },

    onSubmitContractICODeploy(e) {
        e.preventDefault();
        this.deployContractICO();
        this.setState({
            startPreOrderTime: '',
            endPreOrderTime: '',
            startOrderTime: '',
            endOrderTime: '',
            preOrderAmount: '',
            orderAmount: '',
            preOrderPrice: '',
            orderPrice: '',
            address: '',
            limitedToken: ''
        })
    },

    deployTokenICO() {
        var name = this.state.nameOfTokenICO;
        var decimals = this.state.decimals;
        var symbol = this.state.symbol;
        var totalSupply = this.state.totalSupply;
        
        console.log('====================================')
        console.log(currentAccount)
        console.log('====================================')
        var id = firebase.database().ref().child('token').push().key;
        var data = {
            name: name,
            symbol: symbol,
            decimals: decimals,
            totalsupply: totalSupply,
            owner: currentAccount
        }

        var updates = {};
        updates['/tokens_ico/' + id] = data;
        firebase.database().ref().update(updates);

        // tokenICOInstance.new(
        //     name,
        //     decimals,
        //     symbol,
        //     totalSupply,
        web3.eth.getTransactionCount(currentAccount, (error, txCount) => {
            if (error) {
                console.log('====================================')
                console.log(error)
                console.log('====================================')
            }
            web3.eth.sendTransaction({
              nonce: txCount,
              from: currentAccount,
              to: addressDemark,
              value: this.state.deployFee
            }, (err, transactionId) => {
              if (err) {
                console.log('====================================')
                console.log(err)
                console.log('====================================')
              } else {
                    console.log();
                }
              }
            )});

        // tokenICOInstance.new(
        //     this.state.nameOfTokenICO, 
        //     this.state.decimals,
        //     this.state.symbol,
        //     this.state.totalSupply,
        //     {
        //         data: `0x${tokenICOBytecode}`,
        //         from: currentAccount,
        //         gas: 4800000
        //     }, async (err, res) => {
        //         if (res.address) {
        //             // Firebase things
        //             console.log('====================================')
        //             console.log(res.address)

        //             console.log('====================================')
        //         }
        //         else {
        //             console.log(err)
        //         }
        //     }
        //);
        alert('Token is requested');


        this.setState({
            nameOfTokenICO: '',
            symbol: '',
            decimals: '',
            totalSupply: ''
        });
    },

    deployContractICO() {
        web3.eth.getTransactionCount(currentAccount, (error, txCount) => {
            if (error) {
                console.log('====================================')
                console.log(error)
                console.log('====================================')
            }
            web3.eth.sendTransaction({
              nonce: txCount,
              from: currentAccount,
              to: addressDemark,
              value: this.state.deployFee
            }, (err, transactionId) => {
              if (err) {
                console.log('====================================')
                console.log(err)
                console.log('====================================')
              } else {
                    console.log();
                }
              }
            )});
            
        var amountForSell = [this.state.preOrderAmount, this.state.orderAmount];
        var _timeLine = this.returnDatesFromconvertTimeOrderToInt();
        var _price = [this.state.preOrderPrice, this.state.orderPrice];
        console.log('====================================')
        console.log(currentAccount, _price, _timeLine)
        console.log('====================================')
        //------------------FIREBASE-------------------
        var id = firebase.database().ref().child('token').push().key;
        var startPreOrderTime = this.state.startPreOrderTime;
        var endPreOrderTime = this.state.endPreOrderTime;
        var startOrderTime = this.state.startOrderTime;
        var endOrderTime = this.state.endOrderTime;
        var preOrderAmount= this.state.preOrderAmount;
        var orderAmount = this.state.orderAmount;
        var preOrderPrice = this.state.preOrderPrice;
        var orderPrice = this.state.orderPrice;
        var addressOfTokenUsed = this.state.addressOfTokenUsed;
        var limitedToken = this.state.limitedToken;

        var data = {
            startPreOrderTime : startPreOrderTime,
            endPreOrderTime: endPreOrderTime,
            startOrderTime: startOrderTime,
            endOrderTime: endOrderTime,
            preOrderAmount: preOrderAmount,
            orderAmount: orderAmount,
            preOrderPrice: preOrderPrice,
            orderPrice: orderPrice,
            addressOfTokenUsed: addressOfTokenUsed,
            limitedToken: limitedToken,
            owner: currentAccount
        }
        
        var updates ={};
        updates['/contract_ico/' + id] = data;
        firebase.database().ref().update(updates);
        //----------------------------------------
        contractICOInstance.new(
            amountForSell,
            _timeLine,
            _price,
            this.state.addressOfTokenUsed,
            this.state.limitedToken,
            {
                data: `0x${contractICOBytecode}`,
                // from: "0x17f9b86c150c3ad709bea111b5ba1168f424655a",
                from: currentAccount,
                gas: 48000
            }, async (err, res) => {
                if (res.address) {
                    // Firebase things
                    
                }
                else {
                    console.log(err)
                }
            });
    },

    render() {
        return (
            <div>
                {/* Part for publishing token for ICO  */}
                <div className="form-request panel panel-default">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-8">
                                <div className="row header-form-request panel panel-heading">
                                    <div className="col-sm-12">
                                        <h4 className="panel-title">Demark : Publish token that you want to ICO</h4>
                                    </div>
                                </div>
                                <div className="panel-body">
                                    <div className="row">
                                        <div className="col-sm-2">
                                            <label><b>Name of Token</b></label>
                                        </div>
                                        <div className="col-sm-4">
                                            <input
                                                type="text"
                                                placeholder="Name of token ICO"
                                                name="nameOfTokenICO"
                                                className="form-request-input"
                                                onChange={e => this.handleChange(e)}
                                                value={this.state.nameOfTokenICO} /> <br /> <br />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-2">
                                            <label><b>Symbol</b></label>
                                        </div>
                                        <div className="col-sm-4">
                                            <input
                                                type="text"
                                                placeholder="Symbol"
                                                name="symbol"
                                                className="form-request-input"
                                                onChange={e => this.handleChange(e)}
                                                value={this.state.symbol} /> <br /> <br />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-2">
                                            <label><b>Decimals</b></label>
                                        </div>
                                        <div className="col-sm-4">
                                            <input
                                                type="number"
                                                placeholder="Decimals"
                                                name="decimals"
                                                className="form-request-input"
                                                onChange={e => this.handleChange(e)}
                                                value={this.state.decimals} /> <br /> <br />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-2">
                                            <label><b>Total Supply</b></label>
                                        </div>
                                        <div className="col-sm-4">
                                            <input
                                                type="number"
                                                placeholder="Total supply"
                                                name="totalSupply"
                                                className="form-request-input"
                                                onChange={e => this.handleChange(e)}
                                                value={this.state.totalsupply} /> <br /> <br />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <p><b>Note: You have to pay fee for publishing your token 2ETH for each action</b></p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-2">
                                        </div>
                                        <div className="col-sm-4">
                                            <button type="submit" className="button-request" onClick={this.deployTokenICO}>Deploy token ICO</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-sm-4">
                                <div className="panel panel-heading">
                                    <h4 className="panel-title">How it works?</h4>
                                </div>
                                <div className="panel-body">
                                    <b>Step 1: Fill all information of your token</b>
                                        <p>Name of token - make it clearly</p>
                                        <p>Symbol - Choose unique one</p>
                                        <p>Decimals - number</p>
                                        <p>Total Supply - number</p>
                                    <b>Step 2: Publish it</b> <p></p>
                                    <b>Step 3: Waiting for verify</b>
                                    <p>We will let you know when it is deployed to Blockchain.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Part for publishing ICO  */}
                <div className="form-request panel panel-default">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="row header-form-request panel panel-heading">
                                    <div className="col-sm-12">
                                        <h4 className="panel-title">Demark : Deploy ICO</h4>
                                    </div>
                                </div>
                                <div className="panel-body">
                                    <div className="row">
                                        <div className="col-sm-2">
                                            <label><b>Start pre-order</b></label>
                                        </div>
                                        <div className="col-sm-4">
                                            <input
                                                type="datetime-local"
                                                placeholder="start pre-order"
                                                name="startPreOrderTime"
                                                onChange={e => this.handleChange(e)}
                                                className="form-request-input"
                                                value={this.state.startPreOrderTime} /> <br /> <br />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-2">
                                            <label><b>End pre-order</b></label>
                                        </div>
                                        <div className="col-sm-4">
                                            <input
                                                type="datetime-local"
                                                placeholder="end pre-order"
                                                className="form-request-input"
                                                value={this.state.endPreOrderTime}
                                                name="endPreOrderTime"
                                                onChange={e => this.handleChange(e)} /> <br /> <br />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-2">
                                            <label><b>Start order</b></label>
                                        </div>
                                        <div className="col-sm-4">
                                            <input
                                                type="datetime-local"
                                                placeholder="start order"
                                                className="form-request-input"
                                                value={this.state.startOrderTime}
                                                name="startOrderTime"
                                                onChange={e => this.handleChange(e)} /> <br /> <br />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-2">
                                            <label><b>End order</b></label>
                                        </div>
                                        <div className="col-sm-4">
                                            <input
                                                type="datetime-local"
                                                placeholder="end order"
                                                className="form-request-input"
                                                value={this.state.endOrderTime}
                                                name="endOrderTime"
                                                onChange={e => this.handleChange(e)} /> <br /> <br />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-2">
                                            <label><b>Pre-order amount</b></label>
                                        </div>
                                        <div className="col-sm-4">
                                            <input
                                                type="number"
                                                placeholder="Pre-order amount"
                                                value={this.state.preOrderAmount}
                                                className="form-request-input"
                                                name="preOrderAmount"
                                                onChange={e => this.handleChange(e)} /> <br /> <br />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-2">
                                            <label><b>Order amount</b></label>
                                        </div>
                                        <div className="col-sm-4">
                                            <input
                                                type="number"
                                                placeholder="Order amount"
                                                name="orderAmount"
                                                onChange={e => this.handleChange(e)}
                                                className="form-request-input"
                                                value={this.state.orderAmount} /> <br /> <br />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-2">
                                            <label><b>Pre-order price</b></label>
                                        </div>
                                        <div className="col-sm-4">
                                            <input
                                                type="number"
                                                placeholder="Pre order price"
                                                className="form-request-input"
                                                value={this.state.preOrderPrice}
                                                name="preOrderPrice"
                                                onChange={e => this.handleChange(e)} /> <br /> <br />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-2">
                                            <label><b>Order price</b></label>
                                        </div>
                                        <div className="col-sm-4">
                                            <input
                                                type="number"
                                                placeholder="Order price"
                                                className="form-request-input"
                                                value={this.state.orderPrice}
                                                name="orderPrice"
                                                onChange={e => this.handleChange(e)} /> <br /> <br />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-2">
                                            <label><b>Address</b></label>
                                        </div>
                                        <div className="col-sm-4">
                                            <input
                                                type="text"
                                                placeholder="Address"
                                                className="form-request-input"
                                                value={this.state.addressOfTokenUsed}
                                                name="addressOfTokenUsed"
                                                onChange={e => this.handleChange(e)} /> <br /> <br />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-2">
                                            <label><b>Limited</b></label>
                                        </div>
                                        <div className="col-sm-4">
                                            <input
                                                type="number"
                                                placeholder="Limited"
                                                className="form-request-input"
                                                value={this.state.limitedToken}
                                                name="limitedToken"
                                                onChange={e => this.handleChange(e)} /> <br /> <br />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <p><b>Note: You have to pay fee for publishing your token 2ETH at least for each action</b></p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-2">
                                        </div>
                                        <div className="col-sm-4">
                                            <button type="submit" className="button-request" onClick={this.onSubmitContractICODeploy} >Deploy contract ICO</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }

}));

module.exports = TokenPublish;