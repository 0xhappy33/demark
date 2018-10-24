import React from 'react';
import {FormattedMessage} from 'react-intl';

import TradeTable from './TradeTable';

let TradeBuys = React.createClass({
  render: function() {
    return (
      <div className="col-md-6">
        <div className="trade-list">
          <TradeTable openModal={this.props.openModal} flux={this.props.flux}
            title={<FormattedMessage id='trade.bids' />}
            type={1} trades={this.props.trades} tradeList={this.props.trades.tradeBuys}
            market={this.props.market} user={this.props.user.user} listOwn={this.props.listOwn} />
        </div>
      </div>
    );
  }
});

module.exports = TradeBuys;
