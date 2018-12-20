import React from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';
import { Tabs, Tab } from 'react-bootstrap';

import Progress from "react-progress-2";

import AlertDismissable from '../AlertDismissable';
import SubBuyToken from '../SubBuyToken';
import SubReward from '../SubReward';
import SubSend from '../SubSend';
import SubDeposit from '../SubDeposit';
import SubWithdraw from '../SubWithdraw';
import TxsList from '../TxsList';
// import Wallet from '../Wallet';

import DTUContract from '../../clients/contractService';

const contractAddress = "0xEC63f28b7b7a3fC5B8E2d831C171C083408E6586";

let DTU = new DTUContract(contractAddress);

let contract ='';
let topic ='';


let TokenDetail = injectIntl(React.createClass({

    getInitialState() {
        return {
            contract: null,
            alertLevel: 'info',
            alertMessage: '',
            accounts: '',
            contractName: '',
            addressContract: contractAddress,
            amount: '',
            rating: '',
            symbol: '',
            contractDescription: '',
            balance: ''
        };
    },

    componentWillMount() {
        require("../../css/loader.less");
    },

    async componentDidMount() {
        this.props.flux.actions.config.updateAlertCount(null);

        try {
            let accounts = await DTU.getAccount();
            let name = await DTU.getName();
            let symbol = await DTU.getSymbol();
            let rating = await DTU.getRating();
            let balance = await DTU.getBalance(accounts);

            this.setState({
                accounts: accounts,
                contractName: name,
                symbol: symbol,
                balance: balance,
                rating: rating
            });

        } catch (err) {
            this.setState({ errorMessage: "Oops! " + err.message.split("\n")[0] });
        }
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

    deposit() {
        return (
            <div className="panel panel-default">
                <div className="panel-heading">
                    <h3 className="panel-title">
                        <FormattedMessage id='deposit.currency' values={{ currency: this.state.symbol }} />
                    </h3>
                </div>
                <div className="panel-body">
                    <div className="container-fluid">
                        <SubDeposit 
                            balance={this.state.balance}
                            contractName={this.state.contractName}
                            accounts={this.state.accounts}
                            user={this.props.user.user}
                            setAlert={this.setAlert} 
                            showAlert={this.showAlert} />
                    </div>
                </div>
            </div>
        );
    },
    withdraw() {
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
                        <SubWithdraw 
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
    transfer() {
        return (
            <div className="panel panel-default">
                <div className="panel-heading">
                    <h3 className="panel-title">
                        <FormattedMessage id='send.currency' values={{ currency: this.state.symbol }} />
                    </h3>
                </div>
                <div className="panel-body">
                    <div className="container-fluid">
                        <SubSend 
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
    send() {
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
                            user={this.props.user.user}
                            setAlert={this.setAlert} 
                            showAlert={this.showAlert} />
                    </div>
                </div>
            </div>
        );
    },
    reward() {
        return (
            <div className="panel panel-default">
                <div className="panel-heading">
                    <h3 className="panel-title">
                        <FormattedMessage id='send.reward' values={{ currency: "ETH" }} />
                    </h3>
                </div>
                <div className="panel-body">
                    <div className="container-fluid">
                        <SubReward symbol={this.state.symbol} accounts={this.state.accounts} user={this.props.user.user}
                            setAlert={this.setAlert} showAlert={this.showAlert} />
                    </div>
                </div>
            </div>
        );
    },

    render() {
        return (
            <div>
                <Progress.Component
                />
                <div className="token-wrapper panel panel-default">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6">
                                <h1>{this.state.contractName}</h1>
                                {/* <p>Tokens for tuition fees at Duy Tan university</p> */}

                                <div className="row">
                                    <div className="col-md-4">
                                        <h5>Balance</h5>
                                        <small>{this.state.balance}</small>
                                    </div>
                                    {/* <div className="col-md-4">
                                        <h5>Last sold for</h5>
                                        <a href="#">--</a>
                                    </div> */}
                                </div>
                            </div>
                            <div className="col-md-6">
                                <h2>About {this.state.symbol}</h2>
                                <small>Tokens for tuition fees at Back Khoa university
                                </small>
                            </div>
                        </div>
                        <hr />
                        <div className="row">
                            <AlertDismissable ref="alerts" level={this.state.alertLevel} message={this.state.alertMessage} />

                            <div className="hidden-xs hidden-sm">
                                <Tabs defaultActiveKey={1} position='left' tabWidth={3}>
                                    <Tab eventKey={1} title={this.props.intl.formatMessage({ id: 'deposit.currency' }, { currency: this.state.symbol })}>
                                        {this.deposit()}
                                    </Tab>
                                    <Tab eventKey={2} title={this.props.intl.formatMessage({ id: 'withdraw.currency' }, { currency: this.state.symbol })}>
                                        {this.withdraw()}
                                    </Tab>
                                    <Tab eventKey={3} title={this.props.intl.formatMessage({ id: 'send.currency' }, { currency: this.state.symbol })}>
                                        {this.transfer()}
                                    </Tab>
                                    <Tab eventKey={4} title={this.props.intl.formatMessage({ id: 'send.fund' }, { currency: "ETH" })}>
                                        {this.send()}
                                    </Tab>
                                    <Tab eventKey={5} title={this.props.intl.formatMessage({ id: 'send.reward' }, { currency: "ETH" })}>
                                        {this.reward()}
                                    </Tab>
                                </Tabs>
                            </div>
                            <div className="visible-xs visible-sm">
                                {this.deposit()}
                                {this.withdraw()}
                                {this.transfer()}
                                {this.send()}
                                {this.reward()}
                            </div>
                        </div>
                        <hr />
                        <div className="row">
                            {/* {(!this.props.market.market.txs.error) && */}
                                <TxsList 
                                    title="Transactions history" 
                                    flux={this.props.flux} 
                                    market={this.props.market}
                                    addressContract={this.state.addressContract}
                                    txs={this.props.market.market.txs} 
                                    user={this.props.user} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}));

module.exports = TokenDetail;