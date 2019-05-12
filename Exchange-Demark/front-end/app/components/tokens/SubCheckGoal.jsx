import React from 'react';
import {injectIntl, FormattedMessage} from 'react-intl';
import {Button, Input} from 'react-bootstrap';

import ConfirmModal from '../ConfirmModal';

import contractService from '../../clients/contractService';

// const contractAddress = "0x9541ee8a0d873055b1951037db437374c1999323";
var now = new Date();
let ICO;

let SubCheckGoal = injectIntl(React.createClass({
  getInitialState: function() {
    return {
      // amount: null,
      recipient: null,
      newWithdrawal: false,
      showModal: false,
      confirmMessage: null
    //   contractAddress: this.props.contractAddress
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
      this.props.setAlert('warning', this.props.intl.formatMessage({id: 'withdraw.empty'}));
    }
    else if (parseFloat(amount) > this.props.user.balanceSubAvailable) {
      this.props.setAlert('warning',
        this.props.intl.formatMessage({id: 'withdraw.not_enough'}, {
          currency: this.props.constractName,
          balance: this.props.balance,
          amount: amount
        })
      );
    }
    else {
      this.setState({
        newWithdrawal: true,
        confirmMessage:
          <FormattedMessage id='withdraw.confirm' values={{
              amount: amount,
              currency: this.props.contractName
            }}
          />
      });

      this.props.showAlert(false);

      return true;
    }

    this.setState({
      newWithdrawal: false
    });

    if (showAlerts)
      this.props.showAlert(true);

    return false;
  },

  async onCheckGoal(e) {
    e.preventDefault();
    var nowInt = Date.parse(now);
    var endOrder = Date.parse(this.props.endOrder);
    if(nowInt<=endOrder){
      alert('This ICO have not finished yet')
    }
    else{
    //   ICO = new contractService.ICOContract(this.state.contractAddress);
      try {
        let accounts = await this.props.icoInstance.getAccount();
        await this.props.icoInstance.checkGoalReached(accounts);
      } catch (err) {
          this.setState({ errorMessage: "Oops! " + err.message.split("\n")[0] });
      }
    }
  },

  render() {
    return (
      <form className="form-horizontal" role="form" onSubmit={this.onCheckGoal} >

        <div className="form-group">
          <Button className={"btn-block" + (this.state.newWithdrawal ? " btn-primary" : "")} type="submit" key="withdraw">
            <FormattedMessage id='form.checkgoal' />
          </Button>
        </div>

        <ConfirmModal
          show={this.state.showModal}
          onHide={this.closeModal}
          message={this.state.confirmMessage}
          flux={this.props.flux}
          onSubmit={this.onCheckGoal}
        />
      </form>
    );
  }
}));

module.exports = SubCheckGoal;