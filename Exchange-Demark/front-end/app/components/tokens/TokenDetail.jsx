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

const contractAddress = "0x9541ee8a0d873055b1951037db437374c1999323";

let DTU = new DTUContract(contractAddress);


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

        try {
            let accounts = await DTU.getAccount();
            let name = await DTU.getName();
            let symbol = await DTU.getSymbol();
            let rating = await DTU.getRating();
            let balance = await DTU.getBalance(accounts);
            let cashier = await DTU.getCashier();
            let totalSupply = await DTU.getTotalSupply();
            let creator = await DTU.getCreator();
            let currentBonus = await DTU.getYourBonus(accounts);
            let currentState = await DTU.getState();
            let walletBalance = await DTU.getWalletBalance(accounts);

            this.setState({
                accounts: accounts,
                contractName: name,
                symbol: symbol,
                balance: balance,
                rating: rating,
                cashier: cashier,
                totalSupply: totalSupply,
                creator: creator,
                currentBonus: currentBonus,
                currentState: currentState,
                walletBalance: walletBalance
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
                            walletBalance={this.state.walletBalance}
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
                            <div className="col-md-6">
                                <h1>{this.state.contractName}</h1>
                                {/* <p>Tokens for tuition fees at Duy Tan university</p> */}
                                <div className="row">
                                    <div className="col-md-12">
                                        <h5>Cashier</h5>
                                        <span style={{color: 'blue', textDecoration: 'underline'}}>{this.state.cashier}</span>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-3">
                                        <h5>Balance</h5>
                                        <span style={{color: 'blue'}}>{this.state.balance}</span>
                                    </div>
                                    <div className="col-md-3">
                                        <h5>Total supply</h5>
                                        <span style={{color: 'blue'}}>{this.state.totalSupply}</span>
                                    </div>
                                    <div className="col-md-3">
                                        <h5>Rating</h5>
                                        <span style={{color: 'blue'}}>{this.state.rating}</span>
                                    </div>
                                    <div className="col-md-3">
                                        <h5>Award</h5>
                                        <span style={{color: 'blue'}}>{this.state.currentBonus}</span>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-4">
                                        <h5>Creator</h5>
                                        <span style={{color: 'blue'}}>{this.state.creator}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <h2>About {this.state.symbol}</h2>
                                <small>Tokens for tuition fees at Duy Tan university
                                </small>
                                
                                {this.notification(this.state.currentState)}
                                
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
                                                {this.withdraw()
                                                }
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
                                    // flux={this.props.flux} 
                                    market={this.props.market}
                                    addressContract={this.state.addressContract}
                                    // txs={this.props.market.market.txs} 
                                    user={this.props.user} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}));

module.exports = TokenDetail;