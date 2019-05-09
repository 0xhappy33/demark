import React from 'react';
import {injectIntl, FormattedMessage} from 'react-intl';
import {Button, Input} from 'react-bootstrap';

import ConfirmModal from './ConfirmModal';

import contractService from '../clients/contractService';

// const contractAddress = "0x9541ee8a0d873055b1951037db437374c1999323";


let SubDeposit = injectIntl(React.createClass({
  getInitialState: function() {
    return {
      amount: null,
      newDeposit: false,
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

  handleChange: function(e) {
    e.preventDefault();
    this.validate(e);
  },

  handleValidation: function(e) {
    e.preventDefault();
    if (this.validate(e, true))
      this.openModal();
  },

  validate: function(e, showAlerts) {
    e.preventDefault();

    var amount = this.refs.amount.getValue().trim();

    this.setState({
      amount: amount
    });
    if (amount < 0) {
      this.props.setAlert('warning', this.props.intl.formatMessage({id: 'form.smaller'}));
    }
    else if (!amount) {
      this.props.setAlert('warning', this.props.intl.formatMessage({id: 'form.empty'}));
    }
    else if (parseFloat(amount) > this.props.balance) {
      this.props.setAlert('warning',
        this.props.intl.formatMessage({id: 'deposit.not_enough'}, {
          currency: this.props.symbol,
          balance: this.props.balance,
          amount: amount
        })
      );
    }
    else {
      this.setState({
        newDeposit: true,
        confirmMessage:
          <FormattedMessage id='deposit.confirm' values={{
              amount: amount,
              currency: this.props.contractName
            }}
          />
      });

      this.props.showAlert(false);

      return true;
    }

    this.setState({
      newDeposit: false
    });

    if (showAlerts)
      this.props.showAlert(true);

    e.stopPropagation();
  },

  async onSubmitDeposit(e) {
    e.preventDefault();
    // let DTU = new contractService.DTUContract(this.props.contractAddress);

    try {
      let accounts = await this.props.dtuInstance.getAccount();

      await this.props.dtuInstance.deposit(accounts, this.state.amount);

    } catch (err) {
        this.setState({ errorMessage: "Oops! " + err.message.split("\n")[0] });
    }

    this.setState({
      amount: null
    });

  },

  render: function() {
    return (
      <form className="form-horizontal" role="form" onSubmit={this.handleValidation} >
        <Input type="number" className="form-control" ref="amount"
          label={<FormattedMessage id='form.amount' />} labelClassName="sr-only"
          // min={this.props.market.amountPrecision}
          // step={this.props.market.amountPrecision}
          placeholder="10.0000"
          onChange={this.handleChange}
          value={this.state.amount || ""} />
        <div className="form-group">
          <Button className={"btn-block" + (this.state.newDeposit ? " btn-primary" : "")} type="submit">
            <FormattedMessage id='form.deposit' />
          </Button>
        </div>
        <ConfirmModal
          show={this.state.showModal}
          onHide={this.closeModal}
          message={this.state.confirmMessage}
          flux={this.props.flux}
          onSubmit={this.onSubmitDeposit}
        />
      </form>
    );
  }
}));

module.exports = SubDeposit;
