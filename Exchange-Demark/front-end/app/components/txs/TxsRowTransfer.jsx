import React from 'react';
import {injectIntl, FormattedMessage, FormattedNumber} from 'react-intl';
// import {Popover, OverlayTrigger} from 'react-bootstrap';
import bigRat from 'big-rational';

let TxtRowTransfer = injectIntl(React.createClass({
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
          <div className="text-center">
              { this.props.tx.to }
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
        <td>
          <div className="text-right">
            27th, July 2018
          </div>
        </td>
      </tr>
    );
  }
}));

module.exports = TxtRowTransfer;
