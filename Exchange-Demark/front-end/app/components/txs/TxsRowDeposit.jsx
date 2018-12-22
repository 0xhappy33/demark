import React from 'react';
import {injectIntl, FormattedMessage, FormattedNumber} from 'react-intl';
// import {Popover, OverlayTrigger} from 'react-bootstrap';
import bigRat from 'big-rational';

// import sha3 from '../../clients/sha3';

// let contract = '';
// let topic = sha3.topicDeposit();
// console.log(topic)
// let API = `https://api-rinkeby.etherscan.io/api?module=logs&action=getLogs&fromBlock=0&toBlock=latest&address=${contract}&topic0=${topic}&apikey=NQNPZCN9E9X3BX5WEGISP84158T55AMW21`;


let TxsRowDeposit = injectIntl(React.createClass({

  // componentDidMount() {
  //   axios.get(this.state.apiDeposit)
  //     .then(res => {
  //       const result = res.result;
  //       this.setState({
  //         result: result
  //       })
  //     })

  //   console.log(this.state.result);
  // },
  
  render() {
    // contract = this.state.addressContract;
    // topic = this.state.topic1;
    // console.log("Test API :  " + this.state.apiDeposit);

    // var amount = bigRat(this.props.tx.amount).divide(Math.pow(10, this.props.market.decimals)).valueOf();
    let block  = this.props.tx.blockNumber;
    let from  = this.props.tx.topics[1];
    let amount  = this.props.tx.topics[2];
    let datetime  = this.props.tx.timeStamp;
    return (
      <tr>
        <td>
          <div className="text-center">
            <FormattedNumber value={this.props.tx.block} />
            { this.props.tx.block }
          </div>
        </td>
        <td>
          <div className="text-center">
              {/* { this.props.tx.from } */}
              { this.props.tx.from } 
          </div>
        </td>
        <td>
          <div className="text-right">
              {/* { this.props.tx.amount } */}
              { this.props.tx.amount }
            />
          </div>
        </td>
        <td>
          <div className="text-right">
            {/* { this.props.tx.age } */}
            { this.props.tx.datetime }
            />
          </div>
        </td>
      </tr>
    );
  }
}));

module.exports = TxsRowDeposit;
