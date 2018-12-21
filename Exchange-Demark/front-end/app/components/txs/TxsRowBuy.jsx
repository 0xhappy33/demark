import React from 'react';
import {injectIntl} from 'react-intl';
// import {Popover, OverlayTrigger} from 'react-bootstrap';
import bigRat from 'big-rational';
import handle from './handleAdress';

let TxsRowBuy = injectIntl(React.createClass({

  render: function() {
    // var amount = bigRat(this.props.result.topics[2]).divide(Math.pow(10, 0)).valueOf();
    
    return (
      <tr>
        <td>
          <div className="text-center">
            {handle.parseBlock(this.props.result.blockNumber)}
          </div>
        </td>
        <td>
          <div className="text-center">
              { handle.handleAddr(this.props.result.topics[1]) }
          </div>
        </td>
        <td>
          <div className="text-right">
          { handle.parseToken(this.props.result.topics[2]) }
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

module.exports = TxsRowBuy;
