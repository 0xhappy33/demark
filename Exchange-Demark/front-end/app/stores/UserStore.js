var _ = require("lodash");
var Fluxxor = require("fluxxor");

var constants = require("../js/constants");
var fixtures = require("../js/fixtures");
import utils from '../js/utils';
import bigRat from 'big-rational';

var UserStore = Fluxxor.createStore({

  initialize: function(options) {
    this.user = options.user || {
      loading: true,
      id: 'loading...',
      balance: 0,
      balanceFormatted: {value: 0, unit: 'ether'},
      balanceWei: 0,
      balancePending: 0,
      balanceSub: 0,
      balanceSubAvailable: 0,
      balanceSubTrading: 0,
      balanceSubPending: 0,
      addresses: []
    };
    this.defaultAccount = null;
    this.loading = true;
    this.error = null;

    this.bindActions(
      constants.user.LOAD_USER, this.onLoadUser,
      constants.user.LOAD_USER_FAIL, this.onUserFail,
      constants.user.LOAD_USER_SUCCESS, this.onLoadUserSuccess,
      constants.user.LOAD_ADDRESSES, this.onLoadAddresses,
      constants.user.LOAD_ADDRESSES_FAIL, this.onUserFail,
      constants.user.LOAD_ADDRESSES_SUCCESS, this.onLoadAddressesSuccess,
      constants.user.LOAD_DEFAULT_ACCOUNT, this.onLoadDefaultAccount,
      constants.user.UPDATE_USER, this.onUpdateUser,
      constants.user.UPDATE_BALANCE, this.onUpdateBalance,
      constants.user.UPDATE_BALANCE_FAIL, this.onUserFail,
      constants.user.UPDATE_BALANCE_SUB, this.onUpdateBalanceSub,
      constants.user.UPDATE_BALANCE_SUB_FAIL, this.onUserFail,
      constants.user.DEPOSIT, this.onDeposit,
      constants.user.DEPOSIT_FAIL, this.onUserFail,
      constants.user.WITHDRAW, this.onWithdraw,
      constants.user.WITHDRAW_FAIL, this.onUserFail,
      constants.user.SEND_ETHER, this.onSendEther,
      constants.user.SEND_ETHER_FAIL, this.onUserFail,
      constants.user.SEND_SUB, this.onSendSub,
      constants.user.SEND_SUB_FAIL, this.onUserFail,
      constants.user.SWITCH_ADDRESS, this.onSwitchAddress
    );

    this.setMaxListeners(1024); // prevent "possible EventEmitter memory leak detected"
  },

  onLoadUser: function() {
    this.loading = true;
    this.error = null;
    this.emit(constants.CHANGE_EVENT);
  },

  onLoadUserSuccess: function(payload) {
    this.user = payload;
    this.loading = false;
    this.error = null;
    this.emit(constants.CHANGE_EVENT);
  },

  onLoadDefaultAccount: function(payload) {
    this.defaultAccount = payload;
    this.emit(constants.CHANGE_EVENT);
  },

  onLoadAddresses: function() {
    this.user.id = 'loading...';
    this.loading = true;
    this.error = null;
    this.emit(constants.CHANGE_EVENT);
  },

  onLoadAddressesSuccess: function(payload) {
    this.user.id = payload.primary;
    this.user.addresses = payload.addresses;
    this.loading = false;
    this.error = null;
    this.emit(constants.CHANGE_EVENT);
  },

  onUpdateUser: function(payload) {
    _.merge(this, payload);
    this.emit(constants.CHANGE_EVENT);
  },

  onSwitchAddress: function(payload) {
    this.user.id = payload.address;
    this.emit(constants.CHANGE_EVENT);
  },

  onDeposit: function(payload) {
    if (this.flux.stores.config.debug)
      utils.log("DEPOSIT", payload.amount);
    this.emit(constants.CHANGE_EVENT);
  },

  onWithdraw: function(payload) {
    if (this.flux.stores.config.debug)
      utils.log("WITHDRAW", payload.amount);
    this.emit(constants.CHANGE_EVENT);
  },

  onUpdateBalance: function(payload) {
    // console.log("BALANCE", payload.balance);
    this.user.balance = bigRat(payload.balance).divide(bigRat(fixtures.ether)).valueOf();
    this.user.balanceFormatted = utils.formatEther(payload.balance);
    this.user.balanceWei = payload.balance;
    this.user.balancePending = bigRat(payload.balancePending).divide(bigRat(fixtures.ether)).valueOf();
    this.emit(constants.CHANGE_EVENT);
  },

  onUpdateBalanceSub: function(payload) {
    // console.log("BALANCE_SUB", payload);
    this.user.balanceSubAvailable = payload.available;
    this.user.balanceSubTrading = payload.trading;
    this.user.balanceSub = payload.balance;
    this.emit(constants.CHANGE_EVENT);
  },

  onSendEther: function(payload) {
    if (this.flux.stores.config.debug)
      utils.log("SEND_ETHER", payload);
    this.emit(constants.SEND_ETHER);
  },

  onSendSub: function(payload) {
    if (this.flux.stores.config.debug)
      utils.log("SEND_SUB", payload);
    this.emit(constants.SEND_SUB);
  },

  onUserFail: function(payload) {
    utils.error("ERROR: ", payload.error);
    this.loading = false;
    this.error = payload.error;
    this.emit(constants.CHANGE_EVENT);
  },

  getState: function() {
    return {
      user: this.user,
      defaultAccount: this.defaultAccount,
      loading: this.loading,
      error: this.error
    };
  }
});

module.exports = UserStore;
