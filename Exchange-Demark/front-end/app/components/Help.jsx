import React from 'react';

let Help = React.createClass({
  render: function() {
    return (
      <div className="container-fluid">
        <h1>{this.props.title}</h1>
        <section className="text-center">
          <h3> Contact us through <a href="https://demark-app.herokuapp.com/" target="_blank"> Demark </a> 
          </h3>
          <h4>Or the <a href="https://demark-app.herokuapp.com/" target="_blank">FAQ</a> on the <a href="https://etherex.org" target="_blank">website</a></h4>
        </section>
      </div>
    );
  }
});

module.exports = Help;
