import React from 'react';
import {Link} from 'react-router';
// import Web3 from 'web3';

let UserLink = React.createClass({
  // propTypes: {
  //   address: React.PropTypes.string.isRequired
  // },

  getDefaultProps: function() {
    return {
      address: ''
    };
 },

  render() {
    return (
      <Link to="/user">
        { this.props.showIcon &&
          <span className="glyphicon glyphicon-user"></span> } 
          { this.props.address.substring(0, 8) + '\u2026' }
      </Link>
    );
  }
});

module.exports = UserLink;
