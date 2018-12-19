import React from 'react';
import {FormattedMessage} from 'react-intl';
// import {ProgressBar} from 'react-bootstrap';

import AlertDismissable from './AlertDismissable';
// import RangeSelect from './RangeSelect';
// import TxsTable from './TxsTable';
import TxsDepositTable from './events/TxsDepositTable';
import TxsWithdrawTable from './events/TxsWithdrawTable';
import TxsBuyTable from './events/TxsBuyTable';
import TxsTransferTable from './events/TxsTransferTable';

import {Tabs, Tab} from 'react-bootstrap';

let TxsList = React.createClass({
  render: function() {
    return (
      <div>
        <div className="container-fluid row">
          <div className="col-md-6 col-sm-6">
            <h3>{ this.props.title } {
                this.props.market.loading &&
                  <span><FormattedMessage id='loading' />...</span> }
            </h3>
          </div>
        </div>
        {this.props.market.market.error &&
          <AlertDismissable ref="alerts" level={"warning"} message={this.props.market.market.error} show={true} />}
        <div className="container-fluid">
          <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
            <Tab eventKey={1} title="Deposit">
              <TxsDepositTable flux={this.props.flux} txs={this.props.txs} market={this.props.market} user={this.props.user.user} />
            </Tab>
            <Tab eventKey={2} title="Withdraw">
              <TxsWithdrawTable flux={this.props.flux} txs={this.props.txs} market={this.props.market} user={this.props.user.user} />
            </Tab>
            <Tab eventKey={3} title="Transfer">
              <TxsTransferTable flux={this.props.flux} txs={this.props.txs} market={this.props.market} user={this.props.user.user} />
            </Tab>
            <Tab eventKey={4} title="Buy">
              <TxsBuyTable flux={this.props.flux} txs={this.props.txs} market={this.props.market} user={this.props.user.user} />
            </Tab>
          </Tabs>
        </div>
      </div>
    );
  }
});

module.exports = TxsList;
