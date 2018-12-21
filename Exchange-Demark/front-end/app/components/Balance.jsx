import React from 'react';
import {FormattedMessage, FormattedNumber} from 'react-intl';
import {Popover, OverlayTrigger} from 'react-bootstrap';


let Balance = React.createClass({
  render: function() {
    return (
      <div className="text-overflow">
        <OverlayTrigger trigger={['hover', 'click']} placement='bottom' rootClose={true} overlay={
            <Popover id="popover-balance">
              <div className="text-overflow">
                <span className="text-orange">
                  <FormattedNumber value={ this.props.balance } />
                </span> { this.props.symbol }{' / '}
                <span className="text-light">{ this.props.walletBalance } ETH</span>
              </div>
            </Popover>} >
          <span>
            <b><FormattedMessage id='balance' />:</b> <span className="text-orange">
              <FormattedNumber value={ this.props.balance } />
            </span> { this.props.symbol }{' / '}
            <span className="text-light">
              { this.props.user.user.balanceFormatted &&
                <FormattedMessage
                  id='ether'
                  values={{
                    value: this.props.walletBalance,
                    unit: this.props.user.user.balanceFormatted.unit
                  }}
                /> }
            </span>
          </span>
        </OverlayTrigger>
      </div>
    );
  }
});

module.exports = Balance;
