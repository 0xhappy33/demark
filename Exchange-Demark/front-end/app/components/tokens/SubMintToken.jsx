import React from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';
import { Button, Input } from 'react-bootstrap';

import 'babel-polyfill';

import ConfirmModal from './ConfirmModal';

import contractService from '../../clients/contractService';

let SubMintToken = injectIntl(React.createClass({

  getInitialState() {
    return {
      toAmount: null,
      toIcoAddress: null,
      newSend: false,
      showModal: false,
      confirmMessage: null,
      errorMessage: "",
      successMessage: "",
      loading: false
    };
  },

  openModal() {
    this.setState({ showModal: true });
  },

  closeModal() {
    this.setState({ showModal: false });
  },

  handleChange(e) {
    e.preventDefault();
    this.validate(e);
  },

  handleValidation(e) {
    e.preventDefault();
    if (this.validate(e, true))
      this.openModal();
  },

  validate(e, showAlerts) {
    e.preventDefault();

    var address = this.refs.address.getValue().trim();
    var amount = this.refs.amount.getValue().trim();

    this.setState({
      recipient: address,
      amount: amount
    });

    if (!address) {
      this.props.setAlert('warning', this.props.intl.formatMessage({ id: 'form.empty' }));
    }
    else if (!amount) {
      this.props.setAlert('warning', this.props.intl.formatMessage({ id: 'form.cheap' }));
    }
    else if (parseFloat(amount) > this.props.balance) {
      this.props.setAlert('warning',
        this.props.intl.formatMessage({ id: 'sub.not_enough' }, {
          currency: this.props.contractName,
          balance: this.props.balance
        })
      );
    }
    else if (address.length != 42) {
      this.props.setAlert('warning',
        this.props.intl.formatMessage({ id: 'address.size' }, {
          size: (address.length < 42 ? "short" : "long")
        })
      );
    }
    else {
      this.setState({
        newSend: true,
        confirmMessage:
          <FormattedMessage id='sub.send' values={{
            amount: this.state.amount,
            currency: this.props.contractName,
            recipient: this.state.recipient
          }}
          />
      });

      this.props.showAlert(false);

      return true;
    }

    this.setState({
      newSend: false
    });

    if (showAlerts)
      this.props.showAlert(true);

    return false;
  },

  async onSubmitTransfer(e) {
    e.preventDefault();
    
    // if (!this.validate(e, el))
    //   return false;

    this.setState({ loading: true, errorMessage: "" });

    try {
      let accounts = await this.props.tokenIcoInstance.getAccount();

      await this.props.tokenIcoInstance.mint(accounts, this.state.toIcoAddress, this.state.toAmount);

      this.setState({
        loading: false,
        successMessage: "Success! Your transcation has been sent."
      });
      // setTimeout(() => {
      //   window.location.reload();
      // }, 1500);
    } catch (err) {
        this.setState({ errorMessage: "Oops! " + err.message.split("\n")[0] });
    }

    this.setState({
      recipient: null,
      amount: null
    });

  },
  
  render() {
    return (
      <form className="form-horizontal" role="form" onSubmit={this.handleValidation} >
        <Input type="text" ref="address"
          placeholder="0x"
          label={<FormattedMessage id='form.recipient' />} labelClassName="sr-only"
          maxLength="42" pattern="0x[a-fA-F\d]+"
          onChange={this.handleChange}
          value={this.state.toIcoAddress || ""} />

        <Input type="number" ref="amount"
          label={<FormattedMessage id='form.amount' />} labelClassName="sr-only"
          placeholder="10.0000"
          onChange={this.handleChange}
          value={this.state.toAmount || ""} />

        <div className="form-group">
          <Button className={"btn-block" + (this.state.newSend ? " btn-primary" : "")} type="submit" key="send">
            <FormattedMessage id='send.send' />
          </Button>
        </div>

        <ConfirmModal
          show={this.state.showModal}
          onHide={this.closeModal}
          message={this.state.confirmMessage}
          flux={this.props.flux}
          onSubmit={this.onSubmitTransfer}
        />
      </form>
    );
  }
}));

module.exports = SubMintToken;
