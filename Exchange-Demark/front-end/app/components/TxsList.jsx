import React from 'react';
import {FormattedMessage} from 'react-intl';

import {FormGroup, FormControl} from 'react-bootstrap';

import AlertDismissable from './AlertDismissable';
import TxsDepositTable from './events/TxsDepositTable';
import TxsWithdrawTable from './events/TxsWithdrawTable';
import TxsBuyTable from './events/TxsBuyTable';
import TxsTransferTable from './events/TxsTransferTable';

import {Tabs, Tab} from 'react-bootstrap';
import sha3 from '../clients/sha3';

let TxsList = React.createClass({

  getInitialState() {
    return {
        addressContract: this.props.addressContract,
        apiDeposit : `https://api-rinkeby.etherscan.io/api?module=logs&action=getLogs&fromBlock=0&toBlock=latest&address=${this.props.addressContract}&topic0=${sha3.topicDeposit()}&apikey=NQNPZCN9E9X3BX5WEGISP84158T55AMW21`,
        apiWithDraw : `https://api-rinkeby.etherscan.io/api?module=logs&action=getLogs&fromBlock=0&toBlock=latest&address=${this.props.addressContract}&topic0=${sha3.topicFundTransfer()}&apikey=NQNPZCN9E9X3BX5WEGISP84158T55AMW21`,
        apiTransfer : `https://api-rinkeby.etherscan.io/api?module=logs&action=getLogs&fromBlock=0&toBlock=latest&address=${this.props.addressContract}&topic0=${sha3.topicTransfer()}&apikey=NQNPZCN9E9X3BX5WEGISP84158T55AMW21`,
        apiBuyToken : `https://api-rinkeby.etherscan.io/api?module=logs&action=getLogs&fromBlock=0&toBlock=latest&address=${this.props.addressContract}&topic0=${sha3.topicBuyToken()}&apikey=NQNPZCN9E9X3BX5WEGISP84158T55AMW21`
    };
  },

  render: function() {
    // console.log("API", this.state.apiDeposit);
    return (
      <div>
        <div className="container-fluid row">
          <div className="col-md-6 col-sm-6">
            <h3>{ this.props.title } {
                this.props.market.loading &&
                  <span><FormattedMessage id='loading' />...</span> }
            </h3>
          </div>
          <div className="col-md-6 col-sm-6">
            
          </div>
        </div>
        {this.props.market.market.error &&
          <AlertDismissable ref="alerts" level={"warning"} message={this.props.market.market.error} show={true} />}
        <div className="container-fluid">
          <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
            <Tab eventKey={1} title="Deposit">
              <TxsDepositTable 
                addressContract={this.state.addressContract} 
                apiDeposit={this.state.apiDeposit}
                market={this.props.market}
                user={this.props.user.user} />
            </Tab>
            <Tab eventKey={2} title="Withdraw">
              <TxsWithdrawTable 
                addressContract={this.state.addressContract} 
                apiWithDraw={this.state.apiWithDraw}
                market={this.props.market}
                user={this.props.user.user} />
            </Tab>
            <Tab eventKey={3} title="Transfer">
              <TxsTransferTable 
                addressContract={this.state.addressContract} 
                apiTransfer={this.state.apiTransfer} 
                market={this.props.market} 
                user={this.props.user.user} />
            </Tab>
            <Tab eventKey={4} title="Buy">
              <TxsBuyTable 
                addressContract={this.state.addressContract} 
                apiBuyToken={this.state.apiBuyToken} 
                market={this.props.market} 
                user={this.props.user.user} />
            </Tab>
          </Tabs>
        </div>
      </div>
    );
  }
});

module.exports = TxsList;
