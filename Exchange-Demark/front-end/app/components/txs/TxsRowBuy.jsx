import React from 'react';
import {injectIntl} from 'react-intl';
import handle from './handleAdress';

let TxsRowBuy = injectIntl(React.createClass({

  render: function() {
    
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
          { handle.parseAmount(this.props.result.topics[2]) }
          </div>
        </td>
        <td>
          <div className="text-right">
          { handle.parseAmount(this.props.result.topics[3]) }
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
