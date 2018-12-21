import React from 'react';
import {injectIntl, FormattedMessage, FormattedNumber} from 'react-intl';
// import {Popover, OverlayTrigger} from 'react-bootstrap';
import bigRat from 'big-rational';
import handle from './handleAdress';

let TxsRowDeposit = injectIntl(React.createClass({
  
  
  getInitialState: function () {
    return {
      iBlockNumber: this.props.result.blockNumber,
      iTimeStamp: this.props.result.timeStamp
    };
  },



  render() {
    return (
      <tr>
        <td>
          <div className="text-center">
            {handle.parseBlock(this.state.iBlockNumber)}
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
            { handle.parseDate(this.state.iTimeStamp) }
          </div>
        </td>
      </tr>
    );
  }
}));

module.exports = TxsRowDeposit;
