import React from 'react';
import firebase from 'firebase';

let TokenPublish = React.createClass({

  componentWillMount() {
    // Load custom in main and overrides
    require("../../css/main.less");
  },

  publishToken() {
    var id = firebase.database().ref().child('token').push().key;
    //let fb = new connectFB();

    var name = document.getElementById('name').value;
    var symbol = document.getElementById('symbol').value;
    var decimals = document.getElementById('decimals').value;
    var totalsupply = document.getElementById('totalsupply').value;

    if (name == '' || symbol == '' || decimals == '' || totalsupply == '') {
      alert('NULL');
    }
    else {
      var data = {
        name: name,
        symbol: symbol,
        decimals: decimals,
        totalsupply: totalsupply,
        owner: '0x0',
        approve: false
      }

      var updates = {};
      updates['/tokens_ico/' + id] = data;
      firebase.database().ref().update(updates);
      alert('Token is requested');
      // console.log(data);
      this.refs.name.value = "";
      this.refs.symbol.value = "";
      this.refs.decimals.value = "";
      this.refs.totalsupply.value = "";
    }
  },

  render() {
    return (
      <div>
        {/* Part for publishing token for ICO  */}
        <div className="form-request panel panel-default">
          <div className="container">
            <div className="row">
              <div className="col-sm-8">
                <div className="row header-form-request panel panel-heading">
                  <div className="col-sm-12">
                    <h4 className="panel-title">Demark : Publish token that you want to ICO</h4>
                  </div>
                </div>
                <div className="panel-body">
                  <div className="row">
                    <div className="col-sm-2">
                      <label><b>Name of Token</b></label>
                    </div>
                    <div className="col-sm-4">
                      <input type="text" placeholder="DTU EDU" name="name" className="form-request-input" id="name" ref="name" /> <br /> <br />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-2">
                      <label><b>Symbol</b></label>
                    </div>
                    <div className="col-sm-4">
                      <input type="text" placeholder="DTUK" name="symbol" className="form-request-input" id="symbol" ref="symbol" /> <br /> <br />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-2">
                      <label><b>Decimals</b></label>
                    </div>
                    <div className="col-sm-4">
                      <input type="text" placeholder="Decimals" name="decimals" className="form-request-input" id="decimals" ref="decimals" /> <br /> <br />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-2">
                      <label><b>Total Supply</b></label>
                    </div>
                    <div className="col-sm-4">
                      <input type="text" placeholder="Total supply" name="totalsupply" className="form-request-input" id="totalsupply" ref="totalsupply" /> <br /> <br />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-12">
                      <p><b>Note: You have to pay fee for publishing your token 2ETH for each action</b></p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-2">
                    </div>
                    <div className="col-sm-4">
                      <button type="submit" className="button-request" onClick={this.publishToken}>Publish</button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-sm-4">
                <div className="panel panel-heading">
                  <h4 className="panel-title">How it works?</h4>
                </div>
                <div className="panel-body">
                  <b>Step 1: Fill all information of your token</b>
                  <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                      Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
                      , when an unknown printer took
                                    a galley of type and scrambled it to make a type specimen book.</p>
                  <b>Step 2: Publish it</b>
                  <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Part for publishing ICO  */}
        <div className="form-request panel panel-default">
          <div className="container">
            <div className="row">
              <div className="col-sm-8">
                <div className="row header-form-request panel panel-heading">
                  <div className="col-sm-12">
                    <h4 className="panel-title">Demark : Deploy ICO</h4>
                  </div>
                </div>
                <div className="panel-body">
                  <div className="row">
                    <div className="col-sm-2">
                      <label><b>Token sold</b></label>
                    </div>
                    <div className="col-sm-4">
                      <input type="text" placeholder="Token sold" name="name" className="form-request-input" id="name" ref="name" /> <br /> <br />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-2">
                      <label><b>Token remaining</b></label>
                    </div>
                    <div className="col-sm-4">
                      <input type="text" placeholder="Token remaining" name="symbol" className="form-request-input" id="symbol" ref="symbol" /> <br /> <br />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-2">
                      <label><b>Base price</b></label>
                    </div>
                    <div className="col-sm-4">
                      <input type="text" placeholder="Base price" name="baserating" className="form-request-input" id="rating" ref="rating" /> <br /> <br />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-2">
                      <label><b>Deadline</b></label>
                    </div>
                    <div className="col-sm-4">
                      <input type="text" placeholder="Deadline" name="decimals" className="form-request-input" id="decimals" ref="decimals" /> <br /> <br />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-2">
                      <label><b>Token connected</b></label>
                    </div>
                    <div className="col-sm-4">
                      <input type="text" placeholder="Token connected" name="decimals" className="form-request-input" id="decimals" ref="decimals" /> <br /> <br />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-12">
                      <p><b>Note: You have to pay fee for publishing your token 2ETH for each action</b></p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-2">
                    </div>
                    <div className="col-sm-4">
                      <button type="submit" className="button-request" onClick={this.publishToken}>Publish</button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-sm-4">
                <div className="panel panel-heading">
                  <h4 className="panel-title">How it works?</h4>
                </div>
                <div className="panel-body">
                  <b>Step 1: Fill all information of your ICO</b>
                  <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                      Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
                      , when an unknown printer took
                                    a galley of type and scrambled it to make a type specimen book.</p>
                  <b>Step 2: Publish it</b>
                  <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

});

module.exports = TokenPublish;