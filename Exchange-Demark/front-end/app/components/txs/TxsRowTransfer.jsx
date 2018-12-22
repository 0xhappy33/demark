import React from 'react';
import {injectIntl, FormattedMessage, FormattedNumber} from 'react-intl';
// import {Popover, OverlayTrigger} from 'react-bootstrap';
import bigRat from 'big-rational';

import handle from './handleAdress';

let TxtRowTransfer = injectIntl(React.createClass({
  render: function() {
    // var amount = bigRat(this.props.tx.amount).divide(Math.pow(10, this.props.market.decimals)).valueOf();
    return (
      <tr>
        <td>
          <div className="text-center">
            { handle.parseBlock(this.props.result.blockNumber)}
          </div>
        </td>
        <td>
          <div className="text-center">
              <samp>
                  { handle.handleAddr(this.props.result.topics[1]) }
                </samp>
                  <br />
                <samp>
                  { handle.handleAddr(this.props.result.topics[2]) }
              </samp>
          </div>
        </td>
        <td>
          <div className="text-right">
          { handle.parseToken(this.props.result.topics[3]) }
          </div>
        </td>
        <td>
          <div className="text-right">
            { handle.parseDate(this.props.result.timeStamp) }
          </div>
        </td>
      </tr>
    );
  }
}));

module.exports = TxtRowTransfer;
