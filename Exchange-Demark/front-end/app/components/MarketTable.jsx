import _ from 'lodash';
import React from 'react';
import {injectIntl, FormattedMessage, FormattedHTMLMessage} from 'react-intl';
import {Table} from 'react-bootstrap';

import MarketRow from './MarketRow';

let fixtures = require("../js/fixtures");

let MarketTable = injectIntl(React.createClass({
  getInitialState: function() {
    return {
      markets: []
    };
  },

  componentDidMount: function() {
    this.componentWillReceiveProps(this.props);
  },

  componentWillReceiveProps: function(nextProps) {
    var markets = [];

    // Filter by category
    var category = _.filter(fixtures.categories, {key: nextProps.category})[0];
    if (nextProps.category != 'markets')
      markets = _.filter(nextProps.market.markets, {category: category.id});
    else
      markets = nextProps.market.markets;

    this.setState({
      markets: markets
    });
  },

  render: function() {
    // <tbody onDragOver={this.dragOver}>

    var marketRows = this.state.markets.map(function (market) {
      var price = this.props.intl.formatMessage({id: 'price'}, {
          price: market.lastPrice,
          currency: market.name
        }
      );
      var available = this.props.intl.formatMessage({id: 'wallet.sub'}, {
            currency: market.name,
            balance: market.available
          }
      );
      var trading = this.props.intl.formatMessage({id: 'wallet.sub'}, {
            currency: market.name,
            balance: market.trading
          }
      );
      var balance = this.props.intl.formatMessage({id: 'wallet.sub'}, {
            currency: market.name,
            balance: market.balance
          }
      );
      return (
        <MarketRow flux={this.props.flux} key={market.id}
          market={market}
          available={available}
          trading={trading}
          balance={balance}
          price={price} />
      );
    }.bind(this));

    return (
      <div>
        <h4>{this.props.title}</h4>
        <Table condensed hover responsive striped>
          <thead>
            <tr>
              <th className="text-center">
                <FormattedMessage id='market.favorite' />
              </th>
              <th className="text-right">
                <FormattedMessage id='market.pair' />
              </th>
              <th className="text-center">
                <FormattedHTMLMessage id='market.change' />
              </th>
              <th className="text-right">
                <FormattedMessage id='last' />
              </th>
              <th className="text-right">
                <FormattedMessage id='available' />
              </th>
              <th className="text-right">
                <FormattedMessage id='trading' />
              </th>
              <th className="text-right">
                <FormattedMessage id='balance' />
              </th>
            </tr>
          </thead>
          <tbody>
            {marketRows}
          </tbody>
        </Table>
      </div>
    );
  }

  // Future drag-n-drop...

  // getInitialState: function() {
  //     return {
  //         markets: this.props.market.markets
  //     };
  // },

  // getPlaceholder: function() {
  //     if (!this.placeholder) {
  //         var tr = document.createElement('tr');
  //         tr.className = "warning";
  //         tr.disabled = "disabled";
  //         var td = document.createElement('td');
  //         td.colSpan = 5;
  //         td.appendChild(document.createTextNode("Drop here"));
  //         tr.appendChild(td);
  //         this.placeholder = tr;
  //     }
  //     return this.placeholder;
  // },

  // getTableRow: function(element) {
  //     if (element.tagName !== 'tr' && element.className !== 'warning')
  //         return $(element).closest('tr')[0];
  //     else
  //         return element;
  // },

  // dragStart: function(e) {
  //     this.dragged = this.getTableRow(e.currentTarget);
  //     e.dataTransfer.effectAllowed = 'move';

  //     // Firefox requires calling dataTransfer.setData
  //     // for the drag to properly work
  //     e.dataTransfer.setData("text/html", e.currentTarget);
  // },

  // dragEnd: function(e) {
  //     this.dragged.style.display = "table-row";
  //     this.dragged.parentNode.removeChild(this.getPlaceholder());

  //     // Update data
  //     var markets = this.state.markets;
  //     var from = Number(this.dragged.dataset.id);
  //     var to = Number(this.over.dataset.id);
  //     if (from < to) to--;
  //     if (this.nodePlacement == "after") to++;
  //     markets.splice(to, 0, markets.splice(from, 1)[0]);

  //     this.setState({
  //         markets: markets
  //     });
  // },

  // dragOver: function(e) {
  //     e.preventDefault();
  //     var targetRow = this.getTableRow(e.target);

  //     // if (!this.dragged.style)
  //     //     return;
  //     if (this.dragged && this.dragged.style)
  //         this.dragged.style.display = "none";

  //     if (targetRow.className == "warning") return;
  //     this.over = targetRow;

  //     // Inside the dragOver method
  //     var relY = e.pageY - $(this.over).offset().top;
  //     var height = this.over.offsetHeight / 2;
  //     var parent = targetRow.parentNode;

  //     if (relY >= height) {
  //         this.nodePlacement = "after";
  //         parent.insertBefore(this.getPlaceholder(), targetRow.nextElementSibling);
  //     }
  //     else if (relY < height) {
  //         this.nodePlacement = "before"
  //         parent.insertBefore(this.getPlaceholder(), targetRow);
  //     }
  // },
}));

module.exports = MarketTable;
