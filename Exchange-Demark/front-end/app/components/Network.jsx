import React from 'react';
import {StoreWatchMixin} from 'fluxxor';
import {injectIntl, FormattedDate, FormattedNumber, FormattedMessage, FormattedRelative} from 'react-intl';

import utils from '../js/utils';

let Network = injectIntl(React.createClass({
  mixins: [StoreWatchMixin('config', 'network', 'UserStore')],

  getInitialState() {
    return {
      gasPrice: '-'
    };
  },

  componentDidMount() {
    this.startCounting();
  },

  componentWillReceiveProps() {
    var formattedGasPrice = '-';
    if (this.state.network.gasPrice) {
      var gasPrice = utils.formatEther(this.state.network.gasPrice);
      formattedGasPrice = <span>{ this.props.intl.formatNumber(gasPrice.value) } { gasPrice.unit }</span>;
      this.setState({
        gasPrice: formattedGasPrice
      });
    }
  },

  componentWillUnmount() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  },

  getStateFromFlux() {
    var networkState = this.props.flux.stores.network.getState();
    return {
      user: this.props.flux.stores.UserStore.getState().user,
      config: this.props.flux.stores.config.getState(),
      network: networkState,
      host: this.props.flux.stores.config.getState().host,
      blockTimestamp: networkState.blockTimestamp,
      blockTime: parseInt(networkState.blockTime),
      networkLag: networkState.networkLag
    };
  },

  startCounting() {
    this.timer = setInterval(this.count, 1000);
  },

  count() {
    var lastBlock = this.state.network.blockTimestamp ? new Date().getTime() / 1000 - this.state.network.blockTimestamp : null;
    var lastState = '';
    if (lastBlock) {
      if (lastBlock > 90)
        lastState = 'danger';
      else if (lastBlock > 30)
        lastState = 'warning';
      else if (lastBlock > 20)
        lastState = 'success';
    }
    this.setState({
      lastBlock: parseInt(lastBlock),
      lastState: lastState
    });
  },

  render() {
    return (
      <div className="panel panel-default network">
        <div className="panel-heading clearfix">
          <h4>
            <FormattedMessage id='network' />
          </h4>
        </div>
        <div className="panel-body">
          <p className="host">
            <span className="network-label">Host</span>
            <span className="pull-right">
              { this.state.host }
            </span>
          </p>
          <p className="peers">
            <span className="network-label">Peers</span>
            <span className="pull-right">{
              this.state.network.peerCount ?
                <FormattedNumber value={this.state.network.peerCount} /> : 0 }
            </span>
          </p>
          <p className="blocks">
            <span className="network-label">Blocks</span>
            <span className="pull-right">{
              this.state.network.blockNumber ?
                <FormattedNumber value={this.state.network.blockNumber} /> : '-' }
            </span>
          </p>
          <p className="miner">
            <span className="network-label">Miner</span>
            <span className="pull-right">
              { this.state.network.mining ?
                  <FormattedMessage
                    id='hashrate' values={{
                      hashrate: this.state.network.hashrate
                    }}
                  /> : 'off' }
            </span>
          </p>
          <p className="ether">
            <span className="network-label">Ether</span>
            <span className="pull-right">
              { this.state.user.balance ?
                <span>
                  <FormattedMessage id='ether' values={{
                      value: this.state.user.balanceFormatted.value,
                      unit: this.state.user.balanceFormatted.unit
                    }}
                  />
                </span> : '-' }
            </span>
          </p>
          <p className="gas-price">
            <span className="network-label">Gas price</span>
            <span className="pull-right">
              { this.state.gasPrice }
            </span>
          </p>
          <p className="block-time">
            <span className="network-label">Block time</span>
            <span className="pull-right">
              { this.state.blockTime ?
                  <FormattedMessage id='blocktime' values={{time: this.state.blockTime}} /> : '-' } /{' '}
              <span className={'text-' + this.state.lastState}>
                { this.state.lastBlock ?
                  ( this.state.lastBlock < this.state.config.timeout ?
                    <FormattedMessage id='blocktime' values={{time: this.state.lastBlock}} /> :
                    <FormattedRelative value={this.state.blockTimestamp * 1000} /> ) : '-' }
              </span>
            </span>
          </p>
          <p className="net-lag">
            <span className="network-label">Network lag</span>
            <span className="pull-right">
              { this.state.networkLag ?
                <FormattedMessage id='blocktime' values={{time: this.state.networkLag}} /> : '-' }
            </span>
          </p>
          <p className="last-block">
            <span className="network-label">Last block</span>
            <span className="pull-right">
              <FormattedDate
                value={this.state.blockTimestamp * 1000}
                format="long" />
            </span>
          </p>
          <p className="client">
            <span className="network-label">Client</span>
            <span className="pull-right">{ this.state.network.client }</span>
          </p>
        </div>
      </div>
    );
  }
}));

module.exports = Network;
