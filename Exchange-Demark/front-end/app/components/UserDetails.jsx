import _ from 'lodash';
import React from 'react';

// import Link from 'react-router';
import { FormattedMessage } from 'react-intl';
import UserBalances from './UserBalances';
// import UserAddress from './UserAddress';
import TradeList from './TradeList';

import BKContract from '../clients/contractService';

const contractAddress = "0x9541ee8a0d873055b1951037db437374c1999323";

let BK = new BKContract(contractAddress);

let UserDetails = React.createClass({
  getInitialState() {
    return {
      own: false,
      accounts: '',
      contractName: '',
      symbol: '',
      balance: '',
      rating: ''
    };
  },

  async componentDidMount() {
    this.componentWillReceiveProps(this.props);

    try {
      let accounts = await BK.getAccount();
      let name = await BK.getName();
      let symbol = await BK.getSymbol();
      let rating = await BK.getRating();
      let balance = await BK.getBalance(accounts);

      this.setState({
        accounts: accounts,
        contractName: name,
        symbol: symbol,
        balance: balance,
        rating: rating
      });

    } catch (err) {
      this.setState({ errorMessage: "Oops! " + err.message.split("\n")[0] });
    }
  },

  componentWillReceiveProps(nextProps) {
    if (nextProps.user.user.id) {
      var own = { tradeBuys: [], tradeSells: [] };
      if (this.isYours(nextProps)) {
        own.tradeBuys = _.filter(nextProps.trades.tradeBuys, { 'owner': nextProps.user.user.id });
        own.tradeSells = _.filter(nextProps.trades.tradeSells, { 'owner': nextProps.user.user.id });
        own.title = <FormattedMessage id='form.yours' />;
      }
      this.setState({
        own: own
      });
    }
    else
      this.setState({
        own: false
      });
  },

  isYours(nextProps) {
    return (
      nextProps.user &&
      nextProps.trades &&
      (nextProps.trades.tradeBuys.length > 0) ||
      (nextProps.trades.tradeSells.length > 0)
    );
  },

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-lg-10 col-lg-offset-1 col-md-12">
            <h4 className="page-title">
              <FormattedMessage id='user.account' />
            </h4>
            {this.state.own ?
              <div className="row">
                <div className="col-md-12">
                  <UserBalances
                    accounts={this.state.accounts}
                    balance={this.state.balance}
                    contractName={this.state.contractName}
                    symbol={this.state.symbol}
                    user={this.props.user.user}
                    market={this.props.market.market} />
                </div>

                {/* <div className="col-md-7">
                <UserAddress flux={this.props.flux} user={this.props.user.user} market={this.props.market.market} trades={this.state.own} />
              </div> */}
              </div> :
              <h5><FormattedMessage id='user.not_found' /></h5>}
          </div>

          {/* {this.state.own &&
            <TradeList flux={this.props.flux} market={this.props.market} trades={this.state.own} user={this.props.user} listOwn={true} />} */}
        </div>
      </div>

    );
  }
});

module.exports = UserDetails;
