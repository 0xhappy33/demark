import Fluxxor from 'fluxxor';
import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, useRouterHistory } from 'react-router';
import { createHashHistory } from 'history';

import DemarkApp from './components/DemarkApp';

import Markets from './components/Markets';
import Trades from './components/Trades';
import UserDetails from './components/UserDetails';
// import Wallet from './components/Wallet';
import TokenRequest from './components/tokens/TokenRequest';
import Tools from './components/Tools';
import Help from './components/Help';
import Placeholder from './components/Placeholder';
import TokenDetail from './components/tokens/TokenDetail';
import MarketTest from './components/market/MarketTest';

import ConfigStore from './stores/ConfigStore';
import NetworkStore from './stores/NetworkStore';
import UserStore from './stores/UserStore';
import TradeStore from './stores/TradeStore';
import MarketStore from './stores/MarketStore';
import TicketStore from './stores/btcswap/TicketStore';

import ConfigActions from './actions/ConfigActions';
import NetworkActions from './actions/NetworkActions';
import UserActions from './actions/UserActions';
import TradeActions from './actions/TradeActions';
import MarketActions from './actions/MarketActions';
import TicketActions from './actions/btcswap/TicketActions';

import firebase from 'firebase';

// Phuong's imports here
import TokenItem from './pages/admin-page/sections/token-management/token-item';
// End Phuong's imports

// Load fonts and icons
require("./css/fonts.css");
require("./css/icons.css");

const config = {
  apiKey: "AIzaSyDrssCstHJYF07bIF1DeIzYZN9SdCgA85U",
  authDomain: "demark-dtbs.firebaseapp.com",
  databaseURL: "https://demark-dtbs.firebaseio.com",
  projectId:   "demark-dtbs",
  storageBucket: "demark-dtbs.appspot.com",
  messagingSenderId: "518328352226"
};
firebase.initializeApp(config);

let stores = {
  config: new ConfigStore(),
  network: new NetworkStore(),
  UserStore: new UserStore(),
  MarketStore: new MarketStore(),
  TradeStore: new TradeStore(),
  TicketStore: new TicketStore()
};

let actions = {
  config: new ConfigActions(),
  network: new NetworkActions(),
  user: new UserActions(),
  market: new MarketActions(),
  trade: new TradeActions(),
  ticket: new TicketActions()
  //firebase: new FirebaseConn() // add firebase connect to actions
};

let flux = new Fluxxor.Flux(stores, actions);

let createFluxComponent = function (Component, props) {
  return <Component {...props} flux={flux} />;
};

flux.setDispatchInterceptor(function(action, dispatch) {
  ReactDOM.unstable_batchedUpdates(function() {
    dispatch(action);
  });
});

// Opt-out of fugly _k in query string
let appHistory = useRouterHistory(createHashHistory)({ queryKey: false })

let routes = (
  <Router history={appHistory} createElement={createFluxComponent}>
    <Route path="/" component={DemarkApp}>
      <IndexRoute component={Markets} />
      <Route path="token" component={TokenItem} />
      <Route path="markets" component={Markets} />
      <Route path="trades" component={Trades} />
      <Route path="markets/token" component={Markets} />
      <Route path="markets/subs" component={Markets} />
      <Route path="markets/xchain" component={Markets} />
      <Route path="markets/assets" component={Markets} />
      <Route path="markets/currencies" component={Markets} />
      <Route path="/tokendetail" component={TokenDetail}/>
      {/* <Route path="btc/buy" component={Tickets} />
      <Route path="btc/sell" component={CreateTicket} />
      <Route path="btc/reserve" component={ReserveTicket} />
      <Route path="btc/claim" component={ClaimTicket} />
      <Route path="btc/help" component={BtcHelp} />
      <Route path="btc/tickets/:ticketId" component={Tickets} /> */}
      {/* <Route path="wallet" component={Wallet} /> */}
      {/* test data from api ethereum */}
      <Route path="tokens" component={MarketTest} />
      {/* test data from api ethereum */}
      <Route path="request" component={TokenRequest} />
      <Route path="tools" component={Tools} />
      <Route path="help" component={Help} />
      <Route path="user" component={UserDetails} />
      <Route path="*" component={Placeholder} />
    </Route>
  </Router>
);

ReactDOM.render(routes, document.getElementById('app'));
