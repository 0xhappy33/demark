import _ from 'lodash';
import React from 'react';
import {FormattedNumber} from 'react-intl';
import {Glyphicon, Popover, OverlayTrigger} from 'react-bootstrap';

import utils from '../js/utils';

let TradeRow = React.createClass({
  getInitialState: function() {
    return {
      payload: {},
      showModal: false
    };
  },

  openModal: function(e) {
    e.preventDefault();
    e.stopPropagation();
    this.props.openModal(this.props.trade);
  },

  handleHover: function(e) {
    e.preventDefault();
    if (this.props.review)
        return;

    if (!this.props.trade.price || !this.props.trade.amount || !this.props.trade.total)
        return;

    // Select previous trades
    var trades = _.filter(this.props.tradeList, function(trade, i) {
      return (
        this.props.user.id != trade.owner &&
        // trade.status != "filling" &&
        trade.status != "pending" &&
        trade.status != "new" &&
        ((trade.type == "buys" && this.props.trade.price <= trade.price) ||
         (trade.type == "sells" && this.props.trade.price >= trade.price)) &&
        i <= this.props.count
      );
    }.bind(this));

    if (!trades.length)
      return;

    var totalAmount = 0;
    var totalValue = 0;

    totalAmount = _.reduce(_.map(trades, 'amount'), function(sum, num) {
      return parseFloat(sum) + parseFloat(num);
    });
    if (!totalAmount)
      return;

    totalValue = _.reduce(_.map(trades, 'total'), function(sum, num) {
      return parseFloat(sum) + parseFloat(num);
    });
    if (!totalValue)
      return;

    _.forEach(this.props.tradeList, function(trade) {
      // if (trade.status == "filling" && _.find(trades, {'id': trade.id}))
      //     trade.status = "mined";
      if (trade.status == "mined" && _.find(trades, {'id': trade.id}))
          trade.status = "filling";
    });

    this.setState({
      payload: {
        type: (this.props.trade.type == "buys" ? 1 : 2),
        fills: trades.length,
        price: this.props.trade.price,
        amount: totalAmount,
        total: totalValue,
        market: this.props.trade.market,
        user: this.props.user
      }
    });
  },

  handleHoverOut: function(e) {
    e.preventDefault();
    if (!this.props.trades)
      return;

    this.props.flux.actions.trade.highlightFilling({
      type: this.props.trade.type == "buys" ? 2 : 1,
      price: this.props.trades.price,
      amount: this.props.trades.amount,
      total: this.props.trades.total,
      market: this.props.market,
      user: this.props.user
    });
  },

  handleClick: function(e) {
    e.preventDefault();
    if (this.props.review)
        return;

    if (this.state.payload)
      this.props.flux.actions.trade.clickFill(this.state.payload);
  },

  render: function() {
    return (
      <tr className={"trade-" + (!this.props.review ? this.props.trade.status : "review") +
                                ((this.props.isOwn && !this.props.listOwn) ? " disabled" : "")}
          onMouseEnter={this.handleHover} onMouseLeave={this.handleHoverOut}
          onClick={this.handleClick} onFocus={this.handleClick}>
        <td>
          <div className="text-right">
            {utils.numeral(this.props.trade.amount, this.props.market.decimals)}
          </div>
        </td>
        <td>
          <div className="text-center">
            {this.props.trade.market.name}
          </div>
        </td>
        <td>
          <div className="text-right">
            {utils.numeral(this.props.trade.price, this.props.market.priceDecimals)}
          </div>
        </td>
        <td>
          <div className="text-right text-overflow">
            <FormattedNumber value={this.props.trade.total} /> ETH
          </div>
        </td>
        <td className="trade-op">
          {!this.props.review &&
            <OverlayTrigger trigger={['hover', 'focus']} placement='right' overlay={
              <Popover id={"trade-id-" + this.props.trade.id}>
                <div className="text-overflow">
                  <b>ID:</b> {this.props.trade.id}
                </div>
                <div className="text-overflow">
                  <b>By:</b> {this.props.trade.owner}
                </div>
              </Popover>}>
              <div className="pull-right">
                <a className="btn-xs btn-block text-light" onClick={this.openModal}>
                  <Glyphicon glyph={this.props.isOwn ? "remove" : "screenshot"} />
                </a>
              </div>
            </OverlayTrigger>
          }
        </td>
      </tr>
    );
  }
});
module.exports = TradeRow;
