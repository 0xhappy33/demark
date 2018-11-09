import React from 'react';
// import { Button } from 'react-bootstrap';
import { injectIntl, FormattedMessage } from 'react-intl';
import { Tabs, Tab } from 'react-bootstrap';

import Progress from "react-progress-2";

import AlertDismissable from '../AlertDismissable';
import SendEther from '../SendEther';
import Reward from '../events/Reward';
import SubSend from '../SubSend';
import SubDeposit from '../SubDeposit';
import SubWithdraw from '../SubWithdraw';
import TxsList from '../TxsList';
// import Wallet from '../Wallet';

let TokenDetail = injectIntl(React.createClass({

    getInitialState() {
        return {
            alertLevel: 'info',
            alertMessage: ''
        };
    },

    componentWillMount() {
        require("../../css/loader.less");
    },

    componentDidMount() {
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

    deposit() {
        return (
            <div className="panel panel-default">
                <div className="panel-heading">
                    <h3 className="panel-title">
                        <FormattedMessage id='deposit.currency' values={{ currency: this.props.market.market.name }} />
                    </h3>
                </div>
                <div className="panel-body">
                    <div className="container-fluid">
                        <SubDeposit flux={this.props.flux} market={this.props.market.market} user={this.props.user.user}
                            setAlert={this.setAlert} showAlert={this.showAlert} />
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
                        <FormattedMessage id='withdraw.currency' values={{ currency: this.props.market.market.name }} />
                    </h3>
                </div>
                <div className="panel-body">
                    <div className="container-fluid">
                        <SubWithdraw flux={this.props.flux} market={this.props.market.market} user={this.props.user.user}
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
                        <FormattedMessage id='send.currency' values={{ currency: this.props.market.market.name }} />
                    </h3>
                </div>
                <div className="panel-body">
                    <div className="container-fluid">
                        <SubSend flux={this.props.flux} market={this.props.market.market} user={this.props.user.user}
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
                        <SendEther flux={this.props.flux} user={this.props.user.user}
                            setAlert={this.setAlert} showAlert={this.showAlert} />
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
                        <Reward flux={this.props.flux} user={this.props.user.user}
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
                                <h1>DTUK</h1>
                                <p>Tokens for tuition fees at Duy Tan university</p>
                                <hr />
                                <div className="row">
                                    <div className="col-md-4">
                                        <h5>Current price</h5>
                                        <a href="#">= 0.002</a>
                                    </div>
                                    <div className="col-md-4">
                                        <h5>Last sold for</h5>
                                        <a href="#">--</a>
                                    </div>
                                    <div className="col-md-4">
                                        <h5>Price history</h5>
                                        <a href="#">--</a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <h2>About DTUK</h2>
                                <small>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                    Lorem Ipsum has been the industry's standard dummy text ever since
                                    the 1500s, when an unknown printer took a galley of type and
                                    scrambled it to make a type specimen book.
                            </small>
                            </div>
                        </div>
                        <hr />
                        <div className="row">
                            <AlertDismissable ref="alerts" level={this.state.alertLevel} message={this.state.alertMessage} />

                            <div className="hidden-xs hidden-sm">
                                <Tabs defaultActiveKey={1} position='left' tabWidth={3}>
                                    <Tab eventKey={1} title={this.props.intl.formatMessage({ id: 'deposit.currency' }, { currency: this.props.market.market.name })}>
                                        {this.deposit()}
                                    </Tab>
                                    <Tab eventKey={2} title={this.props.intl.formatMessage({ id: 'withdraw.currency' }, { currency: this.props.market.market.name })}>
                                        {this.withdraw()}
                                    </Tab>
                                    <Tab eventKey={3} title={this.props.intl.formatMessage({ id: 'send.currency' }, { currency: this.props.market.market.name })}>
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
                            {(!this.props.market.market.txs.error) &&
                                <TxsList title="Transactions history" flux={this.props.flux} market={this.props.market}
                                    txs={this.props.market.market.txs} user={this.props.user} />}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}));

module.exports = TokenDetail;