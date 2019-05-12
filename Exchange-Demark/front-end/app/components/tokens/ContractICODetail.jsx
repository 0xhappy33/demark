import React from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';
import { Tabs, Tab, Button } from 'react-bootstrap';

import Progress from "react-progress-2";

import AlertDismissable from '../AlertDismissable';
import SubBuyToken from './SubBuyToken';
import SubWithDrawToken from './SubWithDrawToken';
import SubCheckGoal from './SubCheckGoal';

import firebase from 'firebase';

let contractAddress;


import contractService from '../../clients/contractService';
import { log } from 'util';

let icoAddress;

let ContractICODetail = injectIntl(React.createClass({

    getInitialState() {
        return {
            contract: null,
            alertLevel: 'info',
            alertMessage: '',
            accounts: '',
            contractName: '',
            amount: '',
            rating: '',
            symbol: '',
            totalSupply: '',
            currentState: '',
            walletBalance: '',
            contractIco: null,
            startPreOrder: '',
            endPreOrder: '',
            startOrder: '',
            endOrder: '',
            preOrderPrice: '',
            orderPrice: '',
            minimumQuantity: '',
            tokenAddressLink: '',
            icoAddress: icoAddress,
            icoInstance: '',
            amountSoldInPre: '',
            amountSoldInOrder: '',
            isClosed: '',
            isSuccess: '',
            userBalance: ''
        };
    },

    componentWillMount() {
        require("../../css/loader.less");
    },

    async componentDidMount() {
        await this.readFromDtbsToTable();
        this.props.flux.actions.config.updateAlertCount(null);


    },

    async readFromDtbsToTable() {
        // console.log("71 cIDetail ",this.props.params.contracticoId);

        var databaseRef = firebase.database().ref("/contract_ico/" + this.props.params.contracticoId);
        var item;
        await databaseRef.once('value', function (snapshot) {
            item = snapshot.val();
        });
        icoAddress = await item.address;
        let icoInstance = new contractService.ICOContract(icoAddress);

        let currentAccount = await icoInstance.getAccount();
        let amountSoldInPre = await icoInstance.getTokenSoldInPre();
        let amountSoldInOrder = await icoInstance.getTokenSoldInOrder();

        // console.log(isClosed,isSuccess,userBalance);

        let isClosed = (await icoInstance.getClosed()).toString();
        let isSuccess = (await icoInstance.getSuccessStatus()).toString();
        let userBalance = await icoInstance.getUserBalance(currentAccount);

        console.log(isClosed, isSuccess, userBalance);

        this.setState({
            contractIco: item
        });

        // try {
        this.setState({
            startPreOrder: this.state.contractIco.startPreOrderTime,
            endPreOrder: this.state.contractIco.endPreOrderTime,
            startOrder: this.state.contractIco.startOrderTime,
            endOrder: this.state.contractIco.endOrderTime,
            addressICO: this.state.contractIco.addressICO,
            preOrderPrice: this.state.contractIco.preOrderPrice,
            orderPrice: this.state.contractIco.orderPrice,
            minimumQuantity: this.state.contractIco.minimumQuantity,
            contractAddress: this.state.contractIco.contractAddress,
            contractIco: item,
            icoAddress: icoAddress,
            icoInstance: icoInstance,
            amountSoldInPre: item.preOrderAmount - amountSoldInPre,
            amountSoldInOrder: item.orderAmount - amountSoldInOrder,
            isClosed: isClosed,
            userBalance: userBalance,
            isSuccess: isSuccess

        })
        // } catch (err) {
        //     this.setState({ errorMessage: "Oops! " + err.message.split("\n")[0] });
        // }

        console.log(this.state.isClosed);
        

    },

    setAlert(alertLevel, alertMessage) {
        this.setState({
            alertLevel: alertLevel,
            alertMessage: alertMessage
        });
    },

    showAlert(show) {
        this.refs.alerts.setState({ alertVisible: show });
    },

    withdraw() {
        if (this.state.currentState < 0) {
            return (
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h3 className="panel-title">
                            Not able to withdraw at this moment!
                    </h3>
                    </div>
                </div>)
        }
        return (
            <div className="panel panel-default">
                <div className="panel-heading">
                    <h3 className="panel-title">
                        {/* Withdraw {this.state.Deposit } */}
                        <FormattedMessage id='withdraw.currency' values={{ currency: this.state.symbol }} />
                    </h3>
                </div>
                <div className="panel-body">
                    <div className="container-fluid">
                        <SubWithDrawToken
                            icoInstance={this.state.icoInstance}
                            // contractAddress={this.state.contractAddress}
                            endOrder={this.state.endOrder}
                            setAlert={this.setAlert}
                            showAlert={this.showAlert} />
                    </div>
                </div>
            </div>
        );
    },

    checkGoal() {
        return (
            <div className="panel panel-default">
                <div className="panel-heading">
                    <h3 className="panel-title">
                        <FormattedMessage id='form.checkgoal' />
                    </h3>
                </div>
                <div className="panel-body">
                    <div className="container-fluid">
                        <SubCheckGoal
                            icoInstance={this.state.icoInstance}
                            endOrder={this.state.endOrder}
                            setAlert={this.setAlert}
                            showAlert={this.showAlert} />
                    </div>
                </div>
            </div>
        );
    },

    buy() {
        return (
            <div className="panel panel-default">
                <div className="panel-heading">
                    <h3 className="panel-title">
                        <FormattedMessage id='send.fund' values={{ currency: "ETH" }} />
                    </h3>
                </div>
                <div className="panel-body">
                    <div className="container-fluid">
                        <SubBuyToken
                            startPreOrder={this.state.startPreOrder}
                            endPreOrder={this.state.endPreOrder}
                            startOrder={this.state.startOrder}
                            endOrder={this.state.endOrder}
                            addressICO={this.state.addressICO}
                            preOrderPrice={this.state.preOrderPrice}
                            orderPrice={this.state.orderPrice}
                            minimumQuantity={this.state.minimumQuantity}
                            contractAddress={this.state.contractAddress}
                            setAlert={this.setAlert}
                            icoInstance={this.state.icoInstance}
                            showAlert={this.showAlert} />
                    </div>
                </div>
            </div>
        );
    },

    notification(currState) {
        if (currState < 0) {
            return (
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <p className="panel-title">Contract out of money</p>
                    </div>

                </div>
            )
        }
    },

    render() {
        return (
            <div>
                <Progress.Component
                />
                <div className="token-wrapper panel panel-default">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <h1>CONTRACT ICO</h1>
                                {/* <p>Tokens for tuition fees at Duy Tan university</p> */}
                                {/* {this.state.contractIco.map(item => {
                                    return (
                                        <div key={item.key} value={item}> */}
                                <div className="row">
                                    <div className="col-md-8">
                                        <div className="panel panel-default">
                                            <div className="panel-heading">
                                                <h3 className="panel-title" style={{ textAlign: 'center' }}>Address Of Token</h3>
                                            </div>
                                            <div className="panel-body" style={{ textAlign: 'center' }}>
                                                <div className="container-fluid">
                                                    <span style={{ color: 'blue' }}>{this.state.contractIco && this.state.contractIco.addressOfTokenUsed}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="panel panel-default">
                                            <div className="panel-heading">
                                                <h3 className="panel-title" style={{ textAlign: 'center' }}>Time line</h3>
                                            </div>
                                            <div className="panel-body" style={{ textAlign: 'center' }}>
                                                <div className="container-fluid">
                                                    <span style={{ color: 'blue' }}>Stage 1: {this.state.contractIco && this.state.contractIco.startPreOrderTime}</span><br></br>
                                                    <span style={{ color: 'blue' }}>Stage 2: {this.state.contractIco && this.state.contractIco.endPreOrderTime}</span><br></br>
                                                    <span style={{ color: 'blue' }}>Stage 3: {this.state.contractIco && this.state.contractIco.startOrderTime}</span><br></br>
                                                    <span style={{ color: 'blue' }}>Stage 4: {this.state.contractIco && this.state.contractIco.endOrderTime}</span><br></br>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-2">
                                        <div className="panel panel-default">
                                            <div className="panel-heading">
                                                <h3 className="panel-title" style={{ textAlign: 'center' }}>Amounts</h3>
                                            </div>
                                            <div className="panel-body" style={{ textAlign: 'center' }}>
                                                <div className="container-fluid">
                                                    <span style={{ color: 'blue' }}>S1: {this.state.amountSoldInPre}</span> <br></br>
                                                    <span style={{ color: 'blue' }}>S2: {this.state.amountSoldInOrder}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-2">
                                        <div className="panel panel-default">
                                            <div className="panel-heading">
                                                <h3 className="panel-title" style={{ textAlign: 'center' }}>Price</h3>
                                            </div>
                                            <div className="panel-body" style={{ textAlign: 'center' }}>
                                                <div className="container-fluid">
                                                    <span style={{ textAlign: 'center', color: 'blue' }}>S1: {this.state.contractIco && this.state.contractIco.preOrderPrice}</span><br></br>
                                                    <span style={{ textAlign: 'center', color: 'blue' }}>S2: {this.state.contractIco && this.state.contractIco.orderPrice}</span><br></br>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-2">
                                        <div className="panel panel-default">
                                            <div className="panel-heading">
                                                <h3 className="panel-title" style={{ textAlign: 'center' }}>Minimum</h3>
                                            </div>
                                            <div className="panel-body" style={{ textAlign: 'center' }}>
                                                <div className="container-fluid">
                                                    <span style={{ textAlign: 'center', color: 'blue' }}>{this.state.contractIco && this.state.contractIco.minimumQuantity}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-2">
                                        <div className="panel panel-default">
                                            <div className="panel-heading">
                                                <h3 className="panel-title" style={{ textAlign: 'center' }}>ICO status</h3>
                                            </div>
                                            <div className="panel-body" style={{ textAlign: 'center' }}>
                                                <div className="container-fluid">
                                                    <span style={{ textAlign: 'center', color: 'blue' }}>{this.state.isSuccess}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-2">
                                        <div className="panel panel-default">
                                            <div className="panel-heading">
                                                <h3 className="panel-title" style={{ textAlign: 'center' }}>Balance</h3>
                                            </div>
                                            <div className="panel-body" style={{ textAlign: 'center' }}>
                                                <div className="container-fluid">
                                                    <span style={{ textAlign: 'center', color: 'blue' }}>{this.state.userBalance}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-2">
                                        <div className="panel panel-default">
                                            <div className="panel-heading">
                                                <h3 className="panel-title" style={{ textAlign: 'center' }}>Is close?</h3>
                                            </div>
                                            <div className="panel-body" style={{ textAlign: 'center' }}>
                                                <div className="container-fluid">
                                                    <span style={{ textAlign: 'center', color: 'blue' }}>{this.state.isClosed}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                {/* <div className="col-sm-4">
                                    <button
                                        type="submit"
                                        className="button-request"
                                        onClick={this.readFromDtbsToTable}>
                                        Deploy contract ICO
                                    </button>
                                </div> */}
                                {/* </div>
                                    )
                                })} */}
                            </div>

                        </div>
                        <hr />
                        <div className="row">
                            <AlertDismissable ref="alerts" level={this.state.alertLevel} message={this.state.alertMessage} />

                            <div className="hidden-xs hidden-sm">
                                <Tabs defaultActiveKey={1} position='left' tabWidth={3}>
                                    <Tab eventKey={1} title='With draw'>
                                        {this.withdraw()}
                                    </Tab>
                                    <Tab eventKey={2} title='Buy token'>
                                        {this.buy()}
                                    </Tab>
                                    <Tab eventKey={3} title='Check goal'>
                                        {this.checkGoal()}
                                    </Tab>
                                </Tabs>
                            </div>
                            <div className="visible-xs visible-sm">
                                {this.withdraw()}
                                {this.buy()}
                                {this.checkGoal()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}));

module.exports = ContractICODetail;