import React from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';
import { Button, Input } from 'react-bootstrap';

import 'babel-polyfill';

import ConfirmModal from './ConfirmModal';

// import web3 from '../clients/web3';

import DTUContract from '../clients/contractService';

// const DTUAbi = [{ "constant": true, "inputs": [], "name": "creator", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "name", "outputs": [{ "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_spender", "type": "address" }, { "name": "_value", "type": "uint256" }], "name": "approve", "outputs": [{ "name": "success", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "totalSupply", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "getState", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [], "name": "reward", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "address" }], "name": "isRegister", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_from", "type": "address" }, { "name": "_to", "type": "address" }, { "name": "_value", "type": "uint256" }], "name": "transferFrom", "outputs": [{ "name": "success", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "uint256" }], "name": "bonus", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_amount", "type": "uint256" }], "name": "buyToken", "outputs": [{ "name": "", "type": "bool" }], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": true, "inputs": [], "name": "decimals", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_amount", "type": "uint256" }], "name": "burn", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "_owner", "type": "address" }], "name": "balanceOf", "outputs": [{ "name": "balance", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "rating", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "symbol", "outputs": [{ "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_to", "type": "address" }, { "name": "_value", "type": "uint256" }], "name": "transfer", "outputs": [{ "name": "success", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "address" }], "name": "totalBonus", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "address" }], "name": "timeRegister", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [], "name": "deposit", "outputs": [{ "name": "", "type": "bool" }], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": true, "inputs": [{ "name": "_owner", "type": "address" }, { "name": "_spender", "type": "address" }], "name": "allowance", "outputs": [{ "name": "remaining", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "cashier", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "inputs": [{ "name": "_name", "type": "string" }, { "name": "_decimals", "type": "uint256" }, { "name": "_symbol", "type": "string" }, { "name": "_unitCan", "type": "uint256" }, { "name": "_cashier", "type": "address" }], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "_from", "type": "address" }, { "indexed": true, "name": "_valueSend", "type": "uint256" }, { "indexed": true, "name": "_exchange", "type": "uint256" }], "name": "BuyToken", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "_to", "type": "address" }, { "indexed": true, "name": "_valueSend", "type": "uint256" }], "name": "FundTransfer", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "_from", "type": "address" }, { "indexed": true, "name": "_valueSend", "type": "uint256" }], "name": "Deposit", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "", "type": "address" }, { "indexed": true, "name": "", "type": "address" }, { "indexed": true, "name": "", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "", "type": "address" }, { "indexed": true, "name": "", "type": "address" }, { "indexed": true, "name": "", "type": "uint256" }], "name": "Approval", "type": "event" }];

// const DTUInstance = web3.eth.contract(DTUAbi).at("0xF92bbac6a4e9bD4a9B4b53015ED6A0bc1ca6b1E6");


const contractAddress = "0xF92bbac6a4e9bD4a9B4b53015ED6A0bc1ca6b1E6";

let DTU = new DTUContract(contractAddress);

let SubSend = injectIntl(React.createClass({

  getInitialState() {
    return {
      amount: null,
      recipient: null,
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
    else if (parseFloat(amount) > this.props.user.balanceSub) {
      this.props.setAlert('warning',
        this.props.intl.formatMessage({ id: 'sub.not_enough' }, {
          currency: this.props.market.name,
          balance: this.props.user.balanceSub
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
            currency: this.props.market.name,
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
      const accounts = await DTU.getAccount();

      console.log("my acc ", accounts);
      // console.log("re",this.state.recipient,"am", this.state.amount);

      await DTU.sendToken(accounts, this.state.recipient, this.state.amount);

      this.setState({
        loading: false,
        successMessage: "Success! Your transcation has been sent."
      });
      // setTimeout(() => {
      //   window.location.reload();
      // }, 1500);
    } catch (err) {
        this.setState({ errorMessage: "Oops! " + err.message.split("\n")[0] });
        // console.log("Oops **** ", err);
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
          value={this.state.recipient || ""} />

        <Input type="number" ref="amount"
          label={<FormattedMessage id='form.amount' />} labelClassName="sr-only"
          min={this.props.market.amountPrecision}
          step={this.props.market.amountPrecision}
          placeholder="10.0000"
          onChange={this.handleChange}
          value={this.state.amount || ""} />

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


// export default SubSend;
module.exports = SubSend;
