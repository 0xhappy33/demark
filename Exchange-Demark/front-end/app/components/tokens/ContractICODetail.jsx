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

let today = new Date().getTime()

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
            tokenUsedName: '',
            tokenUsedSymbol: '',
            isSuccess: '',
            userBalance: '',
            amountRemainInPre: '',
            amountRemain: ''
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
        console.log("now is ",today);

        icoAddress = await item.address;
        let icoInstance = new contractService.ICOContract(icoAddress);
        let TokenIcoInstance = new contractService.TokenICOContract(item.addressOfTokenUsed);

        let tokenUsedName = await TokenIcoInstance.getName();
        // console.log("used name ",tokenUsedName);

        let tokenUsedSymbol = await TokenIcoInstance.getSymbol();

        let currentAccount = await icoInstance.getAccount();

        let amountRemainInPre = await icoInstance.getTokenRemainInPre();
        let amountRemain = await icoInstance.getTokenRemain();

        // console.log("remain ",amountRemainInPre,amountRemain);
        let statusClose = await icoInstance.getClosed();
        let finalStatus;
        if (!statusClose) {
            finalStatus = "In Process"
        }
        else {
            finalStatus = await icoInstance.getSuccessStatus()
        }
        // let isClosed = statusClose.toString();
        let isSuccess = finalStatus.toString();
        let userBalance = await icoInstance.getUserBalance(currentAccount);

        // console.log(isClosed, isSuccess, userBalance);

        this.setState({
            contractIco: item
        });

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
            tokenUsedSymbol: tokenUsedSymbol,
            tokenUsedName: tokenUsedName,
            amountRemain: amountRemain,
            amountRemainInPre: amountRemainInPre,
            // isClosed: isClosed,
            userBalance: userBalance,
            isSuccess: isSuccess
        })
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
                                {/* ----------- Left side ----------- */}
                                <div className="col-md-6">

                                    <div className="row">
                                         {/* ----------- token link ----------- */}
                                        <div className="panel panel-default">
                                            <div className="panel-heading">
                                                <h3 className="panel-title" style={{ textAlign: 'center' }}>Token Linked</h3>
                                            </div>
                                            <div className="panel-body" style={{ textAlign: 'left' }}>
                                                <div className="container-fluid">
                                                    <span>Name&nbsp; :&nbsp;&nbsp;&nbsp;</span>
                                                    <span style={{ color: 'blue' }}>{this.state.tokenUsedName}</span><br></br>
                                                    <span>Symbol&nbsp; :&nbsp;&nbsp;&nbsp;</span>
                                                    <span style={{ color: 'blue' }}>{this.state.tokenUsedSymbol}</span><br></br>
                                                    <span>Address &nbsp; :&nbsp;&nbsp;</span>
                                                    <span style={{ color: 'blue' }}>{this.state.contractIco && this.state.contractIco.addressOfTokenUsed}</span>
                                                    <br></br><br></br>
                                                </div>
                                            </div>
                                        </div>
                                        {/* ----------- End token link ----------- */}
                                    </div>

                                    {/* ----------- Data change ----------- */}
                                    <div className="row">
                                        <div className="col-md-4">
                                            <div className="panel panel-default">
                                                <div className="panel-heading">
                                                    <h3 className="panel-title" style={{ textAlign: 'center' }}>Amounts</h3>
                                                </div>
                                                <div className="panel-body" style={{ textAlign: 'center' }}>
                                                    <div className="container-fluid">
                                                        <span>S1:&nbsp;&nbsp;&nbsp;</span>
                                                        <span style={{ color: 'blue' }}>{this.state.amountRemainInPre}</span>
                                                        <span>&nbsp;&nbsp;&nbsp;{this.state.tokenUsedSymbol}</span> <br></br>
                                                        <span>S2:&nbsp;&nbsp;&nbsp;</span>
                                                        <span style={{ color: 'blue' }}>{this.state.amountRemain}</span>
                                                        <span>&nbsp;&nbsp;&nbsp;{this.state.tokenUsedSymbol}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="panel panel-default">
                                                <div className="panel-heading">
                                                    <h3 className="panel-title" style={{ textAlign: 'center' }}>Balance</h3>
                                                </div>
                                                <div className="panel-body" style={{ textAlign: 'center' }}>
                                                    <div className="container-fluid">
                                                        <span style={{ textAlign: 'center', color: 'blue' }}>{this.state.userBalance} </span>
                                                        <span>&nbsp;{this.state.tokenUsedSymbol}</span><br></br><br></br>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="panel panel-default">
                                                <div className="panel-heading">
                                                    <h3 className="panel-title" style={{ textAlign: 'center' }}>ICO status</h3>
                                                </div>
                                                <div className="panel-body" style={{ textAlign: 'center' }}>
                                                    <div className="container-fluid">
                                                        <span style={{ textAlign: 'center', color: 'blue' }}>{this.state.isSuccess}</span><br></br><br></br>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* ----------- End Data change ----------- */}

                                   {/* ----------- Data static ----------- */}
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="panel panel-default">
                                                <div className="panel-heading">
                                                    <h3 className="panel-title" style={{ textAlign: 'center' }}>Price</h3>
                                                </div>
                                                <div className="panel-body" style={{ textAlign: 'center' }}>
                                                    <div className="container-fluid">
                                                        <span style={{ textAlign: 'center' }}>S1: {this.state.contractIco && this.state.contractIco.preOrderPrice} ETH</span><br></br>
                                                        <span style={{ textAlign: 'center' }}>S2: {this.state.contractIco && this.state.contractIco.orderPrice} ETH</span><br></br>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="panel panel-default">
                                                <div className="panel-heading">
                                                    <h3 className="panel-title" style={{ textAlign: 'center' }}>Minimum</h3>
                                                </div>
                                                <div className="panel-body" style={{ textAlign: 'center' }}>
                                                    <div className="container-fluid">
                                                        <span style={{ textAlign: 'center' }}>{this.state.contractIco && this.state.contractIco.minimumQuantity} {this.state.tokenUsedSymbol}</span><br></br><br></br>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div> 
                                    {/* ----------- End data static ----------- */}

                                </div>
                                {/* ----------- End Left side ----------- */}



                                {/* ----------- Right side ----------- */}

                                    {/* ----------- Time stage ----------- */}
                                    <div className="col-md-6">
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
                                    {/* ----------- end Time stage ----------- */}
                                
                                {/* ----------- End right side ----------- */}
                            
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