import React from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';
import { Input, Button } from 'react-bootstrap';

import Progress from "react-progress-2";

import firebase from 'firebase'
import contractService from '../../clients/contractService';
import SubMintToken from './SubMintToken'
// const contractAddress = "0x9541ee8a0d873055b1951037db437374c1999323";

// let TokenICO = new contractService.TokenICOContract(contractAddress);
let tokenAddress;
// let tokenIcoInstance;

let ICODetail = injectIntl(React.createClass({

    getInitialState() {
        return {
            contract: null,
            alertLevel: 'info',
            alertMessage: '',
            accounts: '',
            contractName: '',
            tokenAmount: null,
            tokenAddress: tokenAddress,
            tokenIcoInstance: '',
            toICOAddress:null
        };
    },

    componentWillMount() {
        require("../../css/loader.less");
    },

    async componentDidMount() {
        await this.readTokenIcoFromDtbs();
        this.props.flux.actions.config.updateAlertCount(null);
        let tokenIcoInstance = new contractService.TokenICOContract(tokenAddress);
        console.log("38 ico details", tokenIcoInstance);

        try {
            this.setState({
                tokenIcoInstance: tokenIcoInstance
            });
        } catch (err) {
            this.setState({ errorMessage: "Oops! " + err.message.split("\n")[0] });
        }
    },

    openModal: function () {
        this.setState({ showModal: true });
    },

    closeModal: function () {
        this.setState({ showModal: false });
    },

    handleValidation: function (e) {
        e.preventDefault();
        if (this.validate(e, true))
            this.openModal();
    },

    // validate: function (e, showAlerts) {
    //     e.preventDefault();

    //     // var address = this.refs.address.getValue().trim();
    //     var amount = this.refs.amount.getValue().trim();

    //     this.setState({
    //         amount: amount
    //     });

    //     // if (!address || !amount) {
    //     //   this.props.setAlert('warning', this.props.intl.formatMessage({id: 'form.empty'}));
    //     // }
    //     if (!amount) {
    //         this.props.setAlert('warning', this.props.intl.formatMessage({ id: 'form.cheap' }));
    //     }
    //     else if (parseFloat(amount / this.props.rating) > this.props.walletBalance) {
    //         this.props.setAlert('warning', this.props.intl.formatMessage({ id: 'sub.not_enough' }, {
    //             currency: "ETH",
    //             balance: this.props.walletBalance
    //         })
    //         );
    //     }
    //     else {
    //         this.setState({
    //             newSend: true,
    //             confirmMessage:
    //                 <FormattedMessage
    //                     id='sub.buy'
    //                     values={{
    //                         amount: this.state.amount,
    //                         symbol: this.props.symbol,
    //                         rating: this.state.rating,
    //                         currency: "ETH",
    //                         value: this.state.amount / this.props.rating
    //                     }}
    //                 />
    //         });

    //         this.props.showAlert(false);

    //         return true;
    //     }

    //     this.setState({
    //         newSend: false
    //     });

    //     if (showAlerts)
    //         this.props.showAlert(true);

    //     return false;
    // },

    handleChange(e) {
        e.preventDefault();
        // this.validate(e);
        this.setState({
            [e.target.name]: e.target.value
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

    async readTokenIcoFromDtbs() {
        console.log(this.props.params.tokenicoId);
        var databaseRef = firebase.database().ref("/tokens_ico/" + this.props.params.tokenicoId);
        var item;
        await databaseRef.once('value', function (snapshot) {
            item = snapshot.val();
        });

        tokenAddress = await item.address;

        console.log("82 token ico ", tokenAddress);

        this.setState({
            tokenIco: item,
            tokenAddress: tokenAddress
        });
    },

    mint() {
        return (
            <div className="panel panel-default">
                <div className="panel-heading">
                    <h3 className="panel-title">
                        <FormattedMessage id='send.fund' values={{ currency: "ETH" }} />
                    </h3>
                </div>
                <div className="panel-body">
                    <div className="container-fluid">
                        <SubMintToken
                            tokenIcoInstance={this.state.tokenIcoInstance}
                            // accounts={this.state.accounts}
                            setAlert={this.setAlert}
                            showAlert={this.showAlert} />
                    </div>
                </div>
            </div>
        );
    },

    async onMintToken(e) {
        e.preventDefault();
        let toICO = this.state.toICOAddress;
        let toAmount = this.state.tokenAmount;
        try {
            let account = await this.state.tokenIcoInstance.getAccount();
            console.log("195,"+account, toICO, toAmount);
            await this.state.tokenIcoInstance.mint(account,toICO,toAmount);
        } catch (err) {
            this.setState({ errorMessage: "Oops! " + err.message.split("\n")[0] });
        }
        this.setState({
            tokenAmount: null,
            tokenAddress: null
        });
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
                                <h1>TOKEN ICO</h1>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="panel panel-default">
                                            <div className="panel-heading">
                                                <h3 className="panel-title">Address</h3>
                                            </div>
                                            <div className="panel-body">
                                                <div className="container-fluid">
                                                    <span style={{ color: 'blue' }}>{this.state.tokenIco && this.state.tokenIco.address}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-3">
                                        <div className="panel panel-default">
                                            <div className="panel-heading">
                                                <h3 className="panel-title" style={{ fontSize: '12px', textAlign: 'center' }}>Name</h3>
                                            </div>
                                            <div className="panel-body">
                                                <div className="container-fluid">
                                                    <span style={{ color: 'blue' }}>{this.state.tokenIco && this.state.tokenIco.name}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="panel panel-default">
                                            <div className="panel-heading">
                                                <h3 className="panel-title" style={{ fontSize: '12px', textAlign: 'center' }}>Decimals</h3>
                                            </div>
                                            <div className="panel-body">
                                                <div className="container-fluid">
                                                    <span style={{ color: 'blue' }}>{this.state.tokenIco && this.state.tokenIco.decimals}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-5">
                                        <div className="panel panel-default">
                                            <div className="panel-heading">
                                                <h3 className="panel-title" style={{ fontSize: '12px', textAlign: 'center' }}>Total Supply</h3>
                                            </div>
                                            <div className="panel-body">
                                                <div className="container-fluid">
                                                    <span style={{ color: 'blue' }}>{this.state.tokenIco && this.state.tokenIco.totalsupply}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* ----------- To mint token ----------- */}
                            <div className="col-md-6">
                                <form className="form-horizontal" role="form" onSubmit={this.onMintToken} >

                                    <h2>TO MINT TOKEN</h2>
                                    <Input type="number" ref="amount"
                                        placeholder="amount"
                                        label="Amount" labelClassName="sr-only"
                                        name="tokenAmount"
                                        onChange={e => this.handleChange(e)}
                                        value={this.state.tokenAmount}
                                    />

                                    <Input type="text" ref="address"
                                        placeholder="to address"
                                        label="To Address" labelClassName="sr-only"
                                        name="toICOAddress"
                                        onChange={e => this.handleChange(e)}
                                        value={this.state.toICOAddress || ""}
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