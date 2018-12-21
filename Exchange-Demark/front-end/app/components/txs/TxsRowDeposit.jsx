import React from 'react';
import {injectIntl, FormattedMessage, FormattedNumber} from 'react-intl';
// import {Popover, OverlayTrigger} from 'react-bootstrap';
import bigRat from 'big-rational';
import axios from 'axios';
import sha3 from '../../clients/sha3';

let contract = '';
let topic = sha3.topicDeposit();
// console.log(topic)
let API = `https://api-rinkeby.etherscan.io/api?module=logs&action=getLogs&fromBlock=0&toBlock=latest&address=${contract}&topic0=${topic}&apikey=NQNPZCN9E9X3BX5WEGISP84158T55AMW21`;


let TxsRowDeposit = injectIntl(React.createClass({

  getInitialState() {
    return {
        addressContract: this.props.addressContract,
        topic1: this.props.topic1,
        result: []
    };
  },

  componentDidMount() {
    axios.get(API)
      .then(res => {
        const result = res.result;
        this.setState({
          result: result
        })
      })

    console.log(this.state.result);
  },
  
  render() {
    contract = this.state.addressContract;
    topic = this.state.topic1;
    console.log("Test API :  " + API);
    // console.log("Txxxxxxxxxxxxx ", this.props.tx);

    var amount = bigRat(this.props.tx.amount).divide(Math.pow(10, this.props.market.decimals)).valueOf();
    return (
      <tr>
        <td>
          <div className="text-center">
            <FormattedNumber value={this.props.tx.block} />
          </div>
        </td>
        <td>
          <div className="text-center">
              { this.props.tx.from }
          </div>
        </td>
        <td>
          <div className="text-right">
            <FormattedMessage id='ether' values={{
                value: amount,
                unit: this.props.market.name
              }}
            />
          </div>
        </td>
        <td>
          <div className="text-right">
            <FormattedMessage id='ether' values={{
                value: amount,
                unit: this.props.market.name
              }}
            />
          </div>
        </td>
      </tr>
    );
  }
}));

module.exports = TxsRowDeposit;
