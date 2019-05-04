import React from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';
import { Tabs, Tab, Button } from 'react-bootstrap';

import Progress from "react-progress-2";

import AlertDismissable from '../AlertDismissable';
import SubBuyToken from './SubBuyToken';
import SubWithDrawToken from './SubWithDrawToken';


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
            contractDescription: '',
            balance: '',
            cashier: '',
            creator: '',
            currentBonus: '',
            totalSupply: '',
            currentState: '',
            walletBalance: ''
        };
    },

    componentWillMount() {
        require("../../css/loader.less");
    },

    async componentDidMount() {
        this.props.flux.actions.config.updateAlertCount(null);
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
        if(this.state.currentState < 0) {
            return(
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
                            balance={this.state.balance}
                            contractName={this.state.contractName}
                            accounts={this.state.accounts}
                            user={this.props.user.user}
                            setAlert={this.setAlert} showAlert={this.showAlert} />
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
                        <FormattedMessage id='send.currency' values={{ currency: this.state.symbol }} />
                    </h3>
                </div>
                <div className="panel-body">
                    <div className="container-fluid">
                        <Button className={"btn-block" + (this.state.newWithdrawal ? " btn-primary" : "")} type="submit" key="Check goal">
                            <FormattedMessage id='form.withdraw' />
                        </Button>
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
                            balance={this.state.balance}
                            contractName={this.state.contractName}
                            accounts={this.state.accounts} 
                            amount={this.state.amount}
                            rating={this.state.rating}
                            symbol={this.state.symbol}
                            walletBalance={this.state.walletBalance}
                            user={this.props.user.user}
                            setAlert={this.setAlert} 
                            showAlert={this.showAlert} />
                    </div>
                </div>
            </div>
        );
    },

    notification(currState) {
        if(currState < 0) {
            return(
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
                            <div className="col-md-8">
                                <h1>CONTRACT ICO</h1> 
                                {/* <p>Tokens for tuition fees at Duy Tan university</p> */}
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="panel panel-default">
                                            <div className="panel-heading">
                                                <h3 className="panel-title">Address Of Token</h3>
                                            </div>
                                            <div className="panel-body">
                                                <div className="container-fluid">
                                                    <span style={{color: 'blue'}}>...</span>    
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-3">
                                        <div className="panel panel-default">
                                                <div className="panel-heading">
                                                    <h3 className="panel-title" style={{fontSize: '12px', textAlign: 'center'}}>Amounts</h3>
                                                </div>
                                                <div className="panel-body">
                                                    <div className="container-fluid">
                                                        <span style={{color: 'blue'}}>...</span> <br></br>
                                                        <span style={{color: 'blue'}}>...</span>
                                                    </div>
                                                </div>
                                            </div>
                                    </div>
                                    <div className="col-md-3">
                                            <div className="panel panel-default">
                                                <div className="panel-heading">
                                                    <h3 className="panel-title" style={{fontSize: '12px', textAlign: 'center'}}>Time line</h3>
                                                </div>
                                                <div className="panel-body">
                                                    <div className="container-fluid">
                                                        <span style={{color: 'blue'}}>...</span><br></br>
                                                        <span style={{color: 'blue'}}>...</span><br></br>
                                                        <span style={{color: 'blue'}}>...</span><br></br>
                                                        <span style={{color: 'blue'}}>...</span><br></br>
                                                    </div>
                                                </div>
                                            </div>
                                    </div>
                                    <div className="col-md-3">
                                            <div className="panel panel-default">
                                                <div className="panel-heading">
                                                    <h3 className="panel-title" style={{fontSize: '12px', textAlign: 'center'}}>Price</h3>
                                                </div>
                                                <div className="panel-body">
                                                    <div className="container-fluid">
                                                        <span style={{color: 'blue'}}>...</span><br></br>
                                                        <span style={{color: 'blue'}}>...</span><br></br>
                                                    </div>
                                                </div>
                                            </div>
                                    </div>
                                    <div className="col-md-3">
                                            <div className="panel panel-default">
                                                <div className="panel-heading">
                                                    <h3 className="panel-title" style={{fontSize: '12px', textAlign: 'center'}}>Limited</h3>
                                                </div>
                                                <div className="panel-body">
                                                    <div className="container-fluid">
                                                        <span style={{color: 'blue'}}>...</span>
                                                    </div>
                                                </div>
                                            </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <h2>Description</h2>
                                <span style={{color: 'blue'}}>{this.state.creator}</span>
                                <br/>
                                <small>This contract is used for ICO
                                </small>
                                {this.notification(this.state.currentState)}
                            </div>
                        </div>
                        <hr />
                        <div className="row">
                            <AlertDismissable ref="alerts" level={this.state.alertLevel} message={this.state.alertMessage} />

                            <div className="hidden-xs hidden-sm">
                                <Tabs defaultActiveKey={1} position='left' tabWidth={3}>
                                    <Tab eventKey={1} title='With draw token'>
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