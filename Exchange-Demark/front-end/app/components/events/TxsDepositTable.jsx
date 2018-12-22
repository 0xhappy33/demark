import _ from 'lodash';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Table } from 'react-bootstrap';

import TransitionGroup from '../TransitionGroup';
import TxsRowDeposit from '../txs/TxsRowDeposit';

import axios from 'axios';

let TxsDepositTable = React.createClass({

  getInitialState: function () {
    var index = _.findIndex(this.props.market.markets, { 'id': this.props.market.market.id });

    var market = this.props.market.markets[index];
    return {
      market: market,
      addressContract: this.props.addressContract,
      apiDeposit: this.props.apiDeposit,
      result: []
    };
  },

  componentDidMount: function () {
    this.componentWillReceiveProps(this.props);
  },

  componentWillReceiveProps: function (nextProps) {
    var index = _.findIndex(nextProps.market.markets, { 'id': nextProps.market.market.id });
    var market = nextProps.market.markets[index];

    axios.get(this.state.apiDeposit)
    .then(res => {
      this.setState({
        result: res.data.result
      })
    });

    this.setState({
      market: market
    });
  },

  render: function () {
    var txsRowDeposit = _.sortBy(this.state.result, 'blockNumber').map(function (result) {
      return (
        <TxsRowDeposit result={result} user={this.props.user} />
      );
    }.bind(this));
    txsRowDeposit.reverse();

    return (
      <div>
        <h4>{this.props.title}</h4>
        <Table condensed hover responsive striped>
          <thead>
            <tr>
              <th className="text-center"><FormattedMessage id='txs_events.block' /></th>
              <th className="text-center"><FormattedMessage id='txs_events.from' /></th>
              <th className="text-right"><FormattedMessage id='txs_events.amount' /></th>
              <th className="text-right"><FormattedMessage id='txs_events.datetime' /></th>
            </tr>
          </thead>
          <TransitionGroup transitionName="trades" component="tbody" enterTimeout={1000} leaveTimeout={1000}>
            {txsRowDeposit}
          </TransitionGroup>
        </Table>
      </div>
    );
  }
});

module.exports = TxsDepositTable;
