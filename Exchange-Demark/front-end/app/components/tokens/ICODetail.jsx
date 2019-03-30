import React from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';
import { Input, Button } from 'react-bootstrap';

import Progress from "react-progress-2";

// import AlertDismissable from '../AlertDismissable';
import SubBuyToken from '../SubBuyToken';
import SubReward from '../SubReward';
import SubSend from '../SubSend';
import SubDeposit from '../SubDeposit';
import SubWithdraw from '../SubWithdraw';
// import TxsList from '../TxsList';
// import Wallet from '../Wallet';

import DTUContract from '../../clients/contractService';

const contractAddress = "0x9541ee8a0d873055b1951037db437374c1999323";

let DTU = new DTUContract(contractAddress);


let ICODetail = injectIntl(React.createClass({

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
                        {/* For mint token */}
                        <div className="row">
                            {/* ----------- ICO TOKEN DETAIL ----------- */}
                            <div className="col-md-6">
                                <h1>{this.state.contractName}</h1>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="panel panel-default">
                                            <div className="panel-heading">
                                                <h3 className="panel-title">Address</h3>
                                            </div>
                                            <div className="panel-body">
                                                <div className="container-fluid">
                                                    <span style={{ color: 'blue' }}>{this.state.cashier}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-3">
                                        <div className="panel panel-default">
                                            <div className="panel-heading">
                                                <h3 className="panel-title" style={{ fontSize: '12px', textAlign: 'center' }}>Funding Goal</h3>
                                            </div>
                                            <div className="panel-body">
                                                <div className="container-fluid">
                                                    <span style={{ color: 'blue' }}>{this.state.balance}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="panel panel-default">
                                            <div className="panel-heading">
                                                <h3 className="panel-title" style={{ fontSize: '12px', textAlign: 'center' }}>Base price</h3>
                                            </div>
                                            <div className="panel-body">
                                                <div className="container-fluid">
                                                    <span style={{ color: 'blue' }}>2 ETH</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-5">
                                        <div className="panel panel-default">
                                            <div className="panel-heading">
                                                <h3 className="panel-title" style={{ fontSize: '12px', textAlign: 'center' }}>Deadline</h3>
                                            </div>
                                            <div className="panel-body">
                                                <div className="container-fluid">
                                                    <span style={{ color: 'blue' }}>May 15th, 2019</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        
                            {/* ----------- To mint token ----------- */}
                            <div className="col-md-6">
                                <form className="form-horizontal" role="form" onSubmit={this.handleValidation} >

                                    <h2>TO MINT TOKEN</h2>
                                    <Input type="number" ref="amount"
                                        placeholder="10"
                                        label="Amount" labelClassName="sr-only"
                                        />
                                    
                                    <Input type="text" ref="address"
                                        placeholder="0xa75b2d7b277919c224b198743c88efe608ba8c1e"
                                        label="To Address" labelClassName="sr-only"
                                        />

                                    <div className="form-group">
                                        <Button className={"btn-block" + (this.state.newWithdrawal ? " btn-primary" : "")} type="submit" key="toaddress">
                                            <FormattedMessage id='form.mint' />
                                        </Button>
                                    </div>
                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}));

module.exports = ICODetail;