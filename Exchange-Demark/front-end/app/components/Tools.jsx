import React from 'react';
import {FormattedMessage} from 'react-intl';
import Perf from 'react-addons-perf';

import AlertDismissable from './AlertDismissable';
import Network from './Network';
import ConfigPane from './ConfigPane';
import SubRegister from './SubRegister';

import utils from '../js/utils';

let TradeList = React.createClass({

  getInitialState: function() {
    return {
      alertLevel: 'info',
      alertMessage: ''
    };
  },

  componentDidMount: function() {
    if (this.props.flux.stores.config.debug && Perf) {
      var measurements = Perf.stop();
      Perf.printInclusive(measurements);
      utils.debug("Inclusive", "^");
      Perf.printExclusive(measurements);
      utils.debug("Exclusive", "^");
      Perf.printWasted(measurements);
      utils.debug("Wasted", "^");
    }
  },

  setAlert: function(alertLevel, alertMessage) {
    this.setState({
      alertLevel: alertLevel,
      alertMessage: alertMessage
    });
  },

  showAlert: function(show) {
    this.refs.alerts.setState({alertVisible: show});
  },

  render: function() {
    var address = this.props.flux.stores.config.getState().address;

    return (
      <div className="row">
        <AlertDismissable ref="alerts" level={this.state.alertLevel} message={this.state.alertMessage} />

        <div className="col-md-4">
          <div className="panel panel-default">
            <div className="panel-heading">
              <h3 className="panel-title"><FormattedMessage id="sub.register" /></h3>
            </div>
            <div className="panel-body">
              <div className="container-fluid">
                <SubRegister flux={this.props.flux} address={address} markets={this.props.market.markets} setAlert={this.setAlert} showAlert={this.showAlert} />
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-8">
          <ConfigPane flux={this.props.flux} address={address} setAlert={this.setAlert} showAlert={this.showAlert} />
        </div>

        <div className="container col-md-12 visible-md visible-sm visible-xs">
          <Network flux={this.props.flux} />
        </div>
      </div>
    );
  }
});

module.exports = TradeList;
