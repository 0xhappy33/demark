import _ from 'lodash';
import React from 'react';
import {injectIntl, FormattedMessage} from 'react-intl';
import {Button, Input} from 'react-bootstrap';
import bigRat from 'big-rational';

import ConfirmModal from '../ConfirmModal';

let fixtures = require("../../js/fixtures");


import contractService from '../../clients/contractService';

// const contractAddress = "0x9541ee8a0d873055b1951037db437374c1999323";

// let ICO = new contractService.ICOContract(contractAddress);

var now = new Date();

let SubBuyToken = injectIntl(React.createClass({
  getInitialState: function() {
    return {
      amount: null,
      rating: null,
      symbol: null,
      value: null,
      newSend: false,
      showModal: false,
      confirmMessage: null,
      now: null,
      startPreOrder: this.props.startPreOrder,
      endPreOrder: this.props.endPreOrder,
      startOrder: this.props.startOrder,
      endOrder: this.props.endOrder,
      addressICO: this.props.addressICO,
      preOrderPrice: this.props.preOrderPrice,
      orderPrice: this.props.orderPrice,
      minimumQuantity: this.props.minimumQuantity
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

    // var address = this.refs.address.getValue().trim();
    var amount = this.refs.amount.getValue().trim();

    this.setState({
      amount: amount
    });

    // if (!address || !amount) {
    //   this.props.setAlert('warning', this.props.intl.formatMessage({id: 'form.empty'}));
    // }
    if (!amount) {
      this.props.setAlert('warning', this.props.intl.formatMessage({id: 'form.cheap'}));
    }
    else if (parseFloat(amount / this.props.rating) > this.props.walletBalance) {
      this.props.setAlert('warning', this.props.intl.formatMessage({id: 'sub.not_enough'}, {
          currency: "ETH",
          balance: this.props.walletBalance
        })
      );
    }
    else {
      this.setState({
        newSend: true,
        confirmMessage:
          <FormattedMessage 
            id='sub.buy' 
            values={{
              amount: this.state.amount,
              symbol: this.props.symbol,
              rating: this.state.rating,
              currency: "ETH",
              value: this.state.amount/this.props.rating
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

  onSubmitForm: function(e, el) {
    e.preventDefault();

    if (!this.validate(e, el))
      return false;

    var payload = {
        recipient: this.state.recipient,
        amount: bigRat(this.state.amount).multiply(fixtures.ether).ceil().toDecimal()
    };

    this.props.flux.actions.user.sendEther(payload);

    this.setState({
        // recipient: null,
        amount: null
        // newSend: false
    });
  },

  async onSubmitBuyToken(e) {
    e.preventDefault();
    var nowInt = Date.parse(now);
    var startPreOrder = Date.parse(this.props.startPreOrder);
    var endPreOrder = Date.parse(this.props.endPreOrder);

    var startOrder = Date.parse(this.props.startOrder);
    var endOrder = Date.parse(this.props.endOrder);
    if(nowInt < startPreOrder || nowInt > endOrder || (nowInt>endPreOrder&&nowInt<startOrder)){
      alert('yyyyyyy')
    } else  {
      try {
        let accounts = await this.props.icoInstance.getAccount();
        var value;
        if((nowInt>=startPreOrder&&nowInt<=endPreOrder)){
          value = this.props.preOrderPrice*this.state.amount;
          await this.props.icoInstance.buyTokenForICO(accounts,this.state.amount,value);
        }
        else{
          value = this.props.orderPrice*this.state.amount;
          await this.props.icoInstance.buyTokenForICO(accounts,this.state.amount,value);
        }
        
      } catch (err) {
          this.setState({ errorMessage: "Oops! " + err.message.split("\n")[0] });
      }
    }
    
    this.setState({
      amount: null
    });

  },


  render: function() {
    return (
      <form className="form-horizontal" role="form" onSubmit={this.onSubmitBuyToken} >
        <Input type="number" ref="amount"
          label={<FormattedMessage id='form.amount' />} labelClassName="sr-only"
          placeholder="10.0000"
          min={1 / _.parseInt(fixtures.ether)} 
          step={1 / _.parseInt(fixtures.ether)}
          onChange={this.handleChange}
          value={this.state.amount || ""} />

        <div className="form-group">
          <Button className={"btn-block" + (this.state.newSend ? " btn-primary" : "")} type="submit" key="send">
            <FormattedMessage id='send.fund' />
          </Button>
        </div>

        <ConfirmModal
          show={this.state.showModal}
          onHide={this.closeModal}
          message={this.state.confirmMessage}
          flux={this.props.flux}
          onSubmit={this.onSubmitBuyToken}
        />
      </form>
    );
  }
}));

module.exports = SubBuyToken;
