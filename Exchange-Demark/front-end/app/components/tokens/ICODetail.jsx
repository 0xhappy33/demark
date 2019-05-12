import React from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';
import { Input, Button } from 'react-bootstrap';
import { Tabs, Tab } from 'react-bootstrap';
import Progress from "react-progress-2";

import firebase from 'firebase'
import contractService from '../../clients/contractService';
import SubMintToken from './SubMintToken';
// const contractAddress = "0x9541ee8a0d873055b1951037db437374c1999323";
import AlertDismissable from '../AlertDismissable';

let ICODetail = injectIntl(React.createClass({

    getInitialState() {
        return {
            contract: null,
            alertLevel: 'info',
            alertMessage: '',
            accounts: '',
            contractName: '',
            tokenAmount: null,
            addressTokenICO: null,
            tokenIcoInstance: null,
            toICOAddress:null
        };
    },

    componentWillMount() {
        require("../../css/loader.less");
    },

    async componentDidMount() {
        await this.readTokenIcoFromDtbs();
        this.props.flux.actions.config.updateAlertCount(null);
        let tokenIcoInstance = new contractService.TokenICOContract(this.state.addressTokenICO);
        try {
            this.setState({
                tokenIcoInstance: tokenIcoInstance
            });
        } catch (err) {
            this.setState({ errorMessage: "Oops! " + err.message.split("\n")[0] });
        }
    },

    async readTokenIcoFromDtbs() {
        console.log(this.props.params.tokenicoId);
        var databaseRef = firebase.database().ref("/tokens_ico/" + this.props.params.tokenicoId);
        var item;
        await databaseRef.once('value', function (snapshot) {
            item = snapshot.val();
        });

        let addressFromDB = await item.address;

        this.setState({
            tokenIco: item,
            addressTokenICO: addressFromDB
        });
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

    mint() {
        return (
            <div className="panel panel-default">
                <div className="panel-heading">
                    <h3 className="panel-title">
                        <FormattedMessage id='form.mint' values={{ currency: "ETH" }} />
                    </h3>
                </div>
                <div className="panel-body">
                    <div className="container-fluid">
                        <SubMintToken
                            tokenIcoInstance={this.state.tokenIcoInstance}
                            // accounts={this.state.accounts}
                            setAlert={this.setAlert}
                            showAlert={this.showAlert} 
                            />
                    </div>
                </div>
            </div>
        );
    },

    // async onMintToken(e) {
    //     e.preventDefault();
    //     let toICO = this.state.toICOAddress;
    //     let toAmount = this.state.tokenAmount;
    //     try {
    //         let account = await this.state.tokenIcoInstance.getAccount();
    //         console.log(account, toICO, toAmount);
    //         await this.state.tokenIcoInstance.mint(account, toICO, toAmount);
    //     } catch (err) {
    //         this.setState({ errorMessage: "Oops! " + err.message.split("\n")[0] });
    //     }
    //     this.setState({
    //         tokenAmount: null,
    //         tokenAddress: null
    //     });
    // },

    render() {
        return (
            <div>
                <Progress.Component
                />
                <div className="token-wrapper panel panel-default">
                    <div className="container">
                        {/* For mint token */}
                        <div className="row">
                        <AlertDismissable ref="alerts" level={this.state.alertLevel} message={this.state.alertMessage} />
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
                                
                                {this.mint()}
                            </div>
                            {/* ----------- end mint token ----------- */}

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}));

module.exports = ICODetail;