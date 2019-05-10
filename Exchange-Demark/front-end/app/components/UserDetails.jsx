import _ from 'lodash';
import React from 'react';

// import Link from 'react-router';
// import {Link} from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import UserBalances from './UserBalances';
// import UserAddress from './UserAddress';
// import TradeList from './TradeList';
import { Table } from 'react-bootstrap';

import { Link } from 'react-router';

import firebase from 'firebase';

import contractService from '../clients/contractService';

const contractAddress = "0x9541ee8a0d873055b1951037db437374c1999323";

let BK = new contractService.DTUContract(contractAddress);

let UserDetails = React.createClass({
  getInitialState() {
    return {
      own: false,
      accounts: '',
      contractName: '',
      symbol: '',
      balance: '',
      rating: '',
      icoToken: []
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
      await this.readFromDtbsIcoToken();
      
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

  handleClickToDetail(e) {
    e.preventDefault();
    // navigate to new one
  },

  async readFromDtbsIcoToken() {
    var databaseRef = firebase.database().ref("/tokens_ico/");
    var icoTokenData = [];
    let getAccount = this.state.accounts;
    
    await databaseRef.once('value', function (snapshot) {
      snapshot.forEach(function (childSnapshot) {
        var item = childSnapshot.val();
        item.key = childSnapshot.key;
        if (item.approve == true && item.owner == getAccount) {
         icoTokenData.push(item);
        //  console.log("item owner",item.owner);
        }
        // console.log("item owner",item);

      });
    });
    // console.log(this.state.accounts);
    this.setState({
      icoToken: icoTokenData
    });
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
        <div className="row">
          <div className="col-lg-10 col-lg-offset-1 col-md-12">
            <div className="panel panel-default trade-form">
              <div className="panel-heading">
                <h3 className="panel-title">
                  Token for ICO
                </h3>
              </div>
              <div className="panel-body">
                <Table history id="tbl_tokens_list">
                  <thead>
                    <tr>
                      {/* <th>#</th> */}
                      <th>Name</th>
                      <th>Decimal</th>
                      <th>Symbol</th>
                      <th>Total Supply</th>
                      <th>Address</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.icoToken.map(item => {
                      return (
                        <tr className="clickable" onClick={this.handleClickToDetail} key={item.key} value={item}
                          data-toggle="collapse" data-target="#group-of-rows-1" aria-expanded="false" aria-controls="group-of-rows-1">
                      <td className="style-row">
                            <Link to={`/tokenicodetail/${item.key}`}>
                              {item.name}
                        </Link>
                          </td>
                          <td className="style-row">{item.decimals}</td>
                          <td className="style-row">{item.symbol}</td>
                          <td className="style-row">{item.totalsupply}</td>
                          <td className="style-row">{item.address}</td>
                        </tr>
                      )
                    })
                    }
                  </tbody>
                  <tbody id="group-of-rows-1" className="collapse">
                    <tr>
                      <td className="style-row">DTU</td>
                      <td className="style-row">2 ETH</td>
                      <td className="style-row">May 5th, 2019</td>
                      <td className="style-row">as</td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </div>
          </div>

        </div>
      </div>

    );
  }
});

module.exports = UserDetails;
