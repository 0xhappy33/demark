import React from 'react';
import firebase from 'firebase';

let TokenRequest = React.createClass({

    componentWillMount() {
        // Load custom in main and overrides
        require("../../css/main.less");
    },

    requestToken() {
        var id = firebase.database().ref().child('token').push().key;
        //let fb = new connectFB();

        var name = document.getElementById('name').value;
        var symbol = document.getElementById('symbol').value;
        var rating = document.getElementById('rating').value;
        var decimals = document.getElementById('decimals').value;
        var cashier = document.getElementById('cashier').value;
        var description = document.getElementById('description').value;

        if (name == '' || symbol == '' || rating == '' || decimals == '' || cashier == '' || description == '') {
            alert('NULL');
        }
        else {
            var data = {
                name: name,
                symbol: symbol,
                rating: rating,
                decimals: decimals,
                cashier: cashier,
                description: description,
                address: '0x0',
                approve: false
            }

            var updates = {};
            updates['/tokens/' + id] = data;
            firebase.database().ref().update(updates);
            // let dbcon = this.db.database().ref('/test');
            // dbcon.push({
            //     name:name
            // })
            alert('Token is requested');
            // console.log(data);
            this.refs.name.value = "";
            this.refs.symbol.value = "";
            this.refs.rating.value = "";
            this.refs.decimals.value = "";
            this.refs.cashier.value = "";
            this.refs.description.value = "";
        }
        

    },

    render() {
        return (
            <div className="form-request panel panel-default">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-8">
                            <div className="row header-form-request panel panel-heading">
                                <div className="col-sm-12">
                                    <h4 className="panel-title">Demark : Request submit your token</h4>
                                </div>
                            </div>
                            <div className="panel-body">
                                <div className="row">
                                    <div className="col-sm-2">
                                        <label><b>Name</b></label>
                                    </div>
                                    <div className="col-sm-4">
                                        <input type="text" placeholder="Name" name="name" className="form-request-input" id="name" ref="name" /> <br /> <br />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-2">
                                        <label><b>Symbol</b></label>
                                    </div>
                                    <div className="col-sm-4">
                                        <input type="text" placeholder="Symbol" name="symbol" className="form-request-input" id="symbol" ref="symbol" /> <br /> <br />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-2">
                                        <label><b>Rating</b></label>
                                    </div>
                                    <div className="col-sm-4">
                                        <input type="text" placeholder="Rating" name="rating" className="form-request-input" id="rating" ref="rating" /> <br /> <br />
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
                                        <label><b>Cashier</b></label>
                                    </div>
                                    <div className="col-sm-4">
                                        <input type="text" placeholder="Cashier" name="cashier" className="form-request-input" id="cashier" ref="cashier" /> <br /> <br />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-2">
                                        <label><b>Description</b></label>
                                    </div>
                                    <div className="col-sm-4">
                                        <textarea type="text" placeholder="Description" className="form-request-input" id="description" ref="description" /> <br /> <br />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-2">
                                    </div>
                                    <div className="col-sm-4">
                                        <button type="submit" className="button-request" onClick={this.requestToken}>Request submit token</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-sm-4">
                            <div className="panel panel-heading">
                                <h4 className="panel-title">How it works?</h4>
                            </div>
                            <div className="panel-body">
                                <b>Step 1: Submit your information</b>
                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
                                    , when an unknown printer took
                                    a galley of type and scrambled it to make a type specimen book.</p>
                                <b>Step 2: We will submit it for you</b>
                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }

});

module.exports = TokenRequest;