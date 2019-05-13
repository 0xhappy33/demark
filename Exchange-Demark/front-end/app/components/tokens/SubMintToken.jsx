import React from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';
import { Button, Input } from 'react-bootstrap';

import 'babel-polyfill';

import ConfirmModal from '../ConfirmModal';

import contractService from '../../clients/contractService';

let SubMintToken = injectIntl(React.createClass({

  getInitialState() {
    return {
      amount: null,
      recipient: null,
      newSend: false,
      showModal: false,
      confirmMessage: null,
      errorMessage: "",
      successMessage: "",
      loading: false,
      tokenAmount: null,
      tokenAddress: null
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

    var tokenAddress = this.refs.tokenAddress.getValue().trim();
    var tokenAmount = this.refs.tokenAmount.getValue().trim();

    this.setState({
      tokenAddress: tokenAddress,
      tokenAmount: tokenAmount
    });


    if (!tokenAddress) {
      this.props.setAlert('warning', this.props.intl.formatMessage({ id: 'form.empty' }));
    }
    else if (!tokenAmount) {
      this.props.setAlert('warning', this.props.intl.formatMessage({ id: 'form.cheap' }));
    }

    else if (tokenAddress.length != 42) {
      this.props.setAlert('warning',
        this.props.intl.formatMessage({ id: 'address.size' }, {
          size: (tokenAddress.length < 42 ? "short" : "long")
        })
      );
    }
    else {
      this.setState({
        newSend: true,
        confirmMessage:
          <FormattedMessage id='form.mint' values={{
            tokenAmount: this.state.tokenAmount,
            tokenAddress: this.state.tokenAddress
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

  async onMintToken(e) {
    e.preventDefault();
    this.setState({ loading: true, errorMessage: "" });

    try {
      let account = await this.props.tokenIcoInstance.getAccount();
      await this.props.tokenIcoInstance.mint(account, this.state.tokenAddress, this.state.tokenAmount);
      this.setState({
        loading: false,
        successMessage: "Success! Your transcation has been sent."
      });
    } catch (err) {
      console.log("in hereeee");

      this.setState({ errorMessage: "Oops! " + err.message.split("\n")[0] });
    }
    this.setState({
      tokenAmount: null,
      tokenAddress: null
    });
  },

  render() {
    return (
      <form className="form-horizontal" role="form" onSubmit={this.handleValidation} >
        <Input type="text" ref="tokenAddress"
          placeholder="0x"
          label={<FormattedMessage id='form.recipient' />} labelClassName="sr-only"
          maxLength="42" pattern="0x[a-fA-F\d]+"
          onChange={this.handleChange}
          value={this.state.tokenAddress} />

        <Input type="number" ref="tokenAmount"
          label={<FormattedMessage id='form.amount' />} labelClassName="sr-only"
          placeholder="10.0000"
          onChange={this.handleChange}
          value={this.state.tokenAmount} />

        <div className="form-group">
          <Button className={"btn-block" + (this.state.newSend ? " btn-primary" : "")} type="submit" key="send">
            <FormattedMessage id='form.mint' />
          </Button>
        </div>

        <ConfirmModal
          show={this.state.showModal}
          onHide={this.closeModal}
          message={this.state.confirmMessage}
          flux={this.props.flux}
          onSubmit={this.onMintToken}
        />
      </form>
    );
  }
}));

module.exports = SubMintToken;
