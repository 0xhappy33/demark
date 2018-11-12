import React from 'react';
import {injectIntl, FormattedMessage, FormattedNumber} from 'react-intl';
// import {Popover, OverlayTrigger} from 'react-bootstrap';
import bigRat from 'big-rational';

let TxsRowWithdraw = injectIntl(React.createClass({
  render: function() {
    var amount = bigRat(this.props.tx.amount).divide(Math.pow(10, this.props.market.decimals)).valueOf();
    return (
      <tr>
        <td>
          <div className="text-center">
            <FormattedNumber value={this.props.tx.block} />
          </div>
        </td>
        <td>
          <div className="text-center">
              { this.props.tx.from }
          </div>
        </td>
        <td>
          <div className="text-right">
            <FormattedMessage id='ether' values={{
                value: amount,
                unit: this.props.market.name
              }}
            />
          </div>
        </td>
        {/* <td>
          <OverlayTrigger trigger={['click']} placement='left' rootClose={true} overlay={
              <Popover id={this.props.tx.hash + "-details"} bsSize="large">
                <div className="help-block">
                  { this.props.intl.formatMessage({id: 'txs.hash'}) }
                  <div className="text-overflow">
                    <code>{ this.props.tx.hash }</code>
                  </div>
                </div>
                { this.props.tx.id &&
                  <div className="help-block">
                    { this.props.intl.formatMessage({id: 'txs.id'}) }
                    <div className="text-overflow">
                      <code>{ this.props.tx.id }</code>
                    </div>
                  </div> }
              </Popover>}>
          </OverlayTrigger>
        </td> */}
      </tr>
    );
  }
}));

module.exports = TxsRowWithdraw;
