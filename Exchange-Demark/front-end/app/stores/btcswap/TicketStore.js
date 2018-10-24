import _ from 'lodash';
import Fluxxor from 'fluxxor';

var constants = require("../../js/constants");

var TicketStore = Fluxxor.createStore({

  initialize: function(options) {
    this.title = "Tickets";
    this.tickets = options.tickets || [];
    this.ticket = {
      id: null,
      amount: null,
      formattedAmount: {value: null, unit: null},
      total: null,
      price: null,
      address: null,
      owner: null,
      feePercentage: null,
      btcPayment: null,
      paymentAddr: null,
      etherAddr: null,
      txHash: null,
      nonce: null,
      feeAmount: null,
      formattedFee: {value: null, unit: null},
      blockFee: null,
      formattedBlockFee: {value: null, unit: null},
      expiry: null,
      claimer: null,
      merkleProof: null,
      merkleProofStr: null,
      claimable: false,
      reservable: false
    };
    this.wallet = {address: null, key: null, tx: null};
    this.loading = true;
    this.updating = false;
    this.error = null;
    this.ticketIDs = [];
    this.btcHead = null;
    this.btcRealHead = null;
    this.btcHeight = 0;
    this.btcRealHeight = 0;
    this.btcBehind = false;
    this.btcUpdating = false;
    this.blockFee = null;
    this.formattedBlockFee = { value: null, unit: null };
    this.percent = 0;
    this.progress = 0;
    this.estimate = 0;
    this.message = null;
    this.note = null;

    this.bindActions(
      constants.ticket.LOAD_TICKETS, this.onLoadTickets,
      constants.ticket.LOAD_TICKETS_PROGRESS, this.onLoadTicketsProgress,
      constants.ticket.LOAD_TICKETS_SUCCESS, this.onLoadTicketsSuccess,
      constants.ticket.LOAD_TICKET_IDS, this.onUpdateTicketIDs,
      constants.ticket.LOAD_TICKET_IDS_FAIL, this.onTicketsFail,
      constants.ticket.LOAD_TICKET, this.onLoadTicket,
      constants.ticket.LOAD_TICKET_FAIL, this.onTicketsFail,
      constants.ticket.LOAD_DEMO_DATA, this.onLoadDemoData,
      constants.ticket.LOOKUP_TICKET, this.onLookupTicket,
      constants.ticket.LOOKUP_TICKET_FAIL, this.onTicketsFail,
      constants.ticket.UPDATE_TICKET, this.onUpdateTicket,
      constants.ticket.UPDATE_TICKETS, this.onUpdateTickets,
      constants.ticket.UPDATE_TICKETS_MESSAGE, this.onUpdateMessage,
      constants.ticket.UPDATE_TICKETS_SUCCESS, this.onLoadTicketsSuccess,
      constants.ticket.UPDATE_TICKETS_FAIL, this.onTicketsFail,
      constants.ticket.UPDATE_WALLET, this.onUpdateWallet,
      constants.ticket.UPDATE_WALLET_FAIL, this.onTicketsFail,
      constants.ticket.UPDATE_TX, this.onUpdateTx,
      constants.ticket.UPDATE_TX_FAIL, this.onTicketsFail,
      constants.ticket.UPDATE_BTC_HEAD, this.onUpdateBtcHead,
      constants.ticket.UPDATE_BTC_HEAD_FAIL, this.onTicketsFail,
      constants.ticket.UPDATE_BTC_HEIGHT, this.onUpdateBtcHeight,
      constants.ticket.UPDATE_BTC_HEIGHT_FAIL, this.onTicketsFail,
      constants.ticket.UPDATE_BTC_HEADER, this.onUpdateBtcHeader,
      constants.ticket.UPDATE_BLOCK_FEE, this.onUpdateBlockFee,
      constants.ticket.PROPAGATE_TX, this.onPropagateTransaction,
      constants.ticket.CREATE_TICKET, this.onCreateTicket,
      constants.ticket.CREATE_TICKET_SUCCESS, this.onCreateTicketSuccess,
      constants.ticket.CREATE_TICKET_FAIL, this.onTicketsFail,
      constants.ticket.RESERVE_TICKET, this.onReserveTicket,
      constants.ticket.RESERVE_TICKET_SUCCESS, this.onReserveTicketSuccess,
      constants.ticket.RESERVE_TICKET_FAIL, this.onTicketsFail,
      constants.ticket.CLAIM_TICKET, this.onClaimTicket,
      constants.ticket.CLAIM_TICKET_SUCCESS, this.onClaimTicketSuccess,
      constants.ticket.CLAIM_TICKET_FAIL, this.onTicketsFail,
      constants.ticket.CANCEL_TICKET, this.onCancelTicket,
      constants.ticket.CANCEL_TICKET_SUCCESS, this.onCancelTicketSuccess,
      constants.ticket.CANCEL_TICKET_FAIL, this.onTicketsFail,
      constants.ticket.VERIFY_POW, this.onVerifyPow,
      constants.ticket.VERIFY_POW_FAIL, this.onTicketsFail,
      constants.ticket.UPDATE_POW, this.onUpdatePoW,
      constants.ticket.COMPUTE_POW_FAIL, this.onTicketsFail,
      constants.ticket.ESTIMATE_GAS, this.onEstimate,
      constants.ticket.ESTIMATE_GAS_ACTION, this.onEstimateGas,
      constants.ticket.CLOSE_ALERT, this.onCloseAlert
    );
  },

  onLookupTicket: function(payload) {
    this.ticket = payload;
    this.emit(constants.CHANGE_EVENT);
  },

  onUpdateTicketIDs: function(payload) {
    this.ticketIDs = payload;
    this.emit(constants.CHANGE_EVENT);
  },

  onLoadTickets: function() {
    this.tickets = [];
    this.loading = true;
    this.error = null;
    this.percent = 0;
    this.progress = 0;

    this.emit(constants.CHANGE_EVENT);
  },

  onLoadDemoData: function(payload) {
    _.merge(this, payload);
    this.emit(constants.CHANGE_EVENT);
  },

  onUpdateTickets: function() {
    this.loading = true;
    this.updating = true;
    this.error = null;
    this.percent = 0;
    this.progress = 0;
    this.emit(constants.CHANGE_EVENT);
  },

  onLoadTicketsProgress: function (payload) {
    this.progress = payload.progress;
    this.percent = payload.percent;
    this.emit(constants.CHANGE_EVENT);
  },

  refreshTickets: function() {
    // Sort and update state
    this.tickets = _.sortBy(this.tickets, 'price');
    this.emit(constants.CHANGE_EVENT);
  },

  onLoadTicket: function(payload) {
    this.tickets.push(payload);
    this.refreshTickets();
  },

  onUpdateTicket: function(payload) {
    var index = -1;

    // Replace current ticket with updated one, add new one or
    // delete canceled or claimed one
    if (payload.amount !== 0) {
      index = _.findIndex(this.tickets, { 'id': payload.id });
      if (index != -1) {
        // console.log("TICKET UPDATED", payload.id);
        this.tickets[index] = payload;
        if (this.ticket.id == payload.id)
          this.message = "The current ticket has changed."; // TODO reset current ticket?
      }
      else {
        // console.log("NEW TICKET", payload.id);
        this.ticketIDs.push(payload.id);
        this.tickets.push(payload);
      }
    }
    else {
      //   console.log("TICKET REMOVED", payload.id);
      index = _.findIndex(this.tickets, { 'id': payload.id });
      if (index != -1)
        this.tickets.splice(index, 1);
    }

    this.refreshTickets();
  },

  onLoadTicketsSuccess: function() {
    this.loading = false;
    this.updating = false;
    this.percent = 100;

    // Remove tickets that are no longer in our ticketIDs
    this.tickets = _.filter(this.tickets, function(ticket) {
      return _.includes(this.ticketIDs, ticket.id);
    }.bind(this));

    this.emit(constants.CHANGE_EVENT);
  },

  onUpdateMessage: function(payload) {
    this.message = payload.message;
    this.note = payload.note;

    this.emit(constants.CHANGE_EVENT);
  },

  onCreateTicket: function (payload) {
    // Add and re-sort
    this.tickets.push(payload);

    this.tickets = _.sortBy(this.tickets, 'price');

    this.emit(constants.CHANGE_EVENT);
  },

  onCreateTicketSuccess: function(payload) {
    var index = -1;

    // Remove pending ticket, let global watch add mined one
    index = _.findIndex(this.tickets, { 'pendingHash': payload.pendingHash });
    if (index != -1)
      this.tickets.splice(index, 1);

    this.refreshTickets();
  },

  onClaimTicket: function (payload) {
    var index = _.findIndex(this.tickets, {'id': payload});
    this.tickets[index].status = "success";
    this.message = "Claiming ticket #" + payload + ", please wait for the Ethereum transaction to be confirmed.";
    this.ticket.claimable = false;
    this.emit(constants.CHANGE_EVENT);
  },

  // TODO Should now be obsolete w/ global watch and updateTicket...
  onClaimTicketSuccess: function (payload) {
    // var index = _.findIndex(this.tickets, {'id': payload});
    // this.tickets.splice(index, 1);
    this.message = "Ticket #" + payload + " successfully claimed.";
    this.emit(constants.CHANGE_EVENT);
  },

  onReserveTicket: function (payload) {
    var index = _.findIndex(this.tickets, {'id': payload});
    this.tickets[index].status = "pending";
    this.emit(constants.CHANGE_EVENT);
  },

  // TODO Should now be obsolete w/ global watch and updateTicket...
  onReserveTicketSuccess: function (payload) {
    var index = _.findIndex(this.tickets, {'id': payload.id});
    this.ticket.reservable = false;
    this.tickets[index].reservable = false;
    // this.tickets[index] = payload;
    this.emit(constants.CHANGE_EVENT);
  },

  onCancelTicket: function (payload) {
    var index = _.findIndex(this.tickets, {'id': payload});
    this.tickets[index].status = "new";
    this.emit(constants.CHANGE_EVENT);
  },

  // TODO Should now be called onRemoveTicket...
  onCancelTicketSuccess: function (payload) {
    var index = _.findIndex(this.tickets, {'id': payload});
    this.tickets.splice(index, 1);
    this.emit(constants.CHANGE_EVENT);
  },

  onUpdateWallet: function(payload) {
    this.wallet = payload;
    if (payload.address) {
      this.message = "Intermediate wallet created.";
      if (this.ticket.total)
        this.note = "Send " + this.ticket.totalWithFee + " BTC (includes 0.0003 BTC miner fee)";
      else
        this.note = "Send BTC";
      this.note += " to " + payload.address;
    }
    this.emit(constants.CHANGE_EVENT);
  },

  onUpdateTx: function(payload) {
    this.wallet.tx = payload;
    this.ticket.txHash = payload.hash;
    this.emit(constants.CHANGE_EVENT);
  },

  onPropagateTransaction: function(payload) {
    this.wallet.tx = null;
    this.message = "Transaction broadcast, wait for 6 confirmations then claim the ticket.";
    this.note = "BTC transaction hash: " + payload;
    this.emit(constants.CHANGE_EVENT);
  },

  onEstimate: function () {
    this.estimate = "...";
    this.emit(constants.CHANGE_EVENT);
  },

  onEstimateGas: function (payload) {
    this.estimate = payload.estimate;
    this.emit(constants.CHANGE_EVENT);
  },

  onUpdatePoW: function(payload) {
    this.ticket.nonce = payload;
    this.emit(constants.CHANGE_EVENT);
  },

  onVerifyPow: function(payload) {
    this.message = payload;
    this.emit(constants.CHANGE_EVENT);
  },

  onUpdateBtcHead: function(payload) {
    if (payload.btcHead)
      this.btcHead = payload.btcHead;
    else if (payload.btcRealHead)
      this.btcRealHead = payload.btcRealHead;
    this.emit(constants.CHANGE_EVENT);
  },

  onUpdateBtcHeight: function(payload) {
    if (payload.btcHeight)
      this.btcHeight = payload.btcHeight;
    else if (payload.btcRealHeight)
      this.btcRealHeight = payload.btcRealHeight;

    if (this.btcRealHeight > this.btcHeight)
      this.btcBehind = this.btcRealHeight - this.btcHeight;
    else
      this.btcBehind = false;

    this.emit(constants.CHANGE_EVENT);
  },

  onUpdateBtcHeader: function(payload) {
    this.btcUpdating = payload;
    this.emit(constants.CHANGE_EVENT);
  },

  onUpdateBlockFee: function(payload) {
    this.blockFee = payload.blockFee;
    this.formattedBlockFee = payload.formattedBlockFee;
    this.emit(constants.CHANGE_EVENT);
  },

  onCloseAlert: function() {
    this.error = null;
    this.message = null;
    this.note = null;
    this.emit(constants.CHANGE_EVENT);
  },

  onTicketsFail: function (payload) {
    // this.tickets = [];
    // this.loading = false;
    // this.percent = 100;
    this.btcUpdating = false;
    this.error = payload.error;
    this.emit(constants.CHANGE_EVENT);
  },

  getState: function() {
    return {
      loading: this.loading,
      updating: this.updating,
      error: this.error,
      title: this.title,
      percent: this.percent,
      progress: this.progress,
      ticketIDs: this.ticketIDs,
      tickets: this.tickets,
      ticket: this.ticket,
      wallet: this.wallet,
      btcHead: this.btcHead,
      btcRealHead: this.btcRealHead,
      btcHeight: this.btcHeight,
      btcRealHeight: this.btcRealHeight,
      btcBehind: this.btcBehind,
      btcUpdating: this.btcUpdating,
      blockFee: this.blockFee,
      formattedBlockFee: this.formattedBlockFee,
      estimate: this.estimate,
      message: this.message,
      note: this.note
    };
  }
});

module.exports = TicketStore;
