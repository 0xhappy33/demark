import React from 'react';
import {injectIntl, FormattedMessage} from 'react-intl';
import {Button} from 'react-bootstrap';

import DTUContract from '../clients/contractService';

const contractAddress = "0xEC63f28b7b7a3fC5B8E2d831C171C083408E6586";

let DTU = new DTUContract(contractAddress);

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
      let currentAcc = await DTU.getAccount();
      // console.log("Current account: " + currentAcc);
      // console.log("Current account: " + this.props.symbol);
      await DTU.reward(currentAcc);

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
