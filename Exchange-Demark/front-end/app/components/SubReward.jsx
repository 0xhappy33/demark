import React from 'react';
import {injectIntl, FormattedMessage} from 'react-intl';
import {Button} from 'react-bootstrap';

import contractService from '../clients/contractService';

let SubReward = injectIntl(React.createClass({

  getInitialState: function() {
    return {
      showModal: false,
      confirmMessage: null
    };
  },

  openModal: function() {
    this.setState({ showModal: true });
  },

  closeModal: function() {
    this.setState({ showModal: false });
  },

  async onSubmitReward(e) {
    e.preventDefault();

    try {
      let accounts = await this.props.dtuInstance.getAccount();

      await this.props.dtuInstance.reward(accounts);

    } catch (err) {
        this.setState({ errorMessage: "Oops! " + err.message.split("\n")[0] });
    }

  },

  render: function() {
    return (
      <form className="form-horizontal" role="form" onSubmit={this.onSubmitReward}>
        <div className="form-group">
          <Button className={"btn-block" + (this.state.newSend ? " btn-primary" : "")} type="submit" key="send">
            <FormattedMessage id='send.reward' />
          </Button>
        </div>
      </form>
    );
  }
}));

module.exports = SubReward;
