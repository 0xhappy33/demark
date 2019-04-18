import React from 'react';
import firebase from 'firebase';

let TokenPublish = React.createClass({

    // getInitialState() {
    //     return {
    //         startPreOrderTime: '',
    //         endPreOrderTime: '',
    //         startOrderTime: '',
    //         endOrderTime: '',
    //         preOrderAmount: '',
    //         orderAmount: '',
    //         preOrderPrice: '',
    //         orderPrice: '',
    //         address: '',
    //         limitedToken: ''
    //     };
    // },

    componentWillMount() {
        // Load custom in main and overrides
        require("../../css/main.less");
    },

    returnDatesFromconvertTimeOrderToInt() {
        var startPreOrderTime = document.getElementById('startPreOrderTime').value;
        var endPreOrderTime = document.getElementById('endPreOrderTime').value;
        var startOrderTime = document.getElementById('startOrderTime').value;
        var endOrderTime = document.getElementById('endOrderTime').value;
        // var preOrderAmount = document.getElementById('preOrderAmount').value;
        // var orderAmount = document.getElementById('orderAmount').value;
        // var preOrderPrice = document.getElementById('preOrderPrice').value;
        // var orderPrice = document.getElementById('orderPrice').value;
        // var address = document.getElementById('address').value;
        // var limitedToken = document.getElementById('limitedToken').value;
        // var date_as_int = [startPreOrderTime, endPreOrderTime, startOrderTime, endOrderTime];
        // var dates = startPreOrderTime.map(function(dateStr) {
        //     return new Date(dateStr).getTime();
        // });
        var start = [];
        start.push(startPreOrderTime, endPreOrderTime, startOrderTime, endOrderTime);
        console.log(start);
        console.log("........................" + start.map(date => new Date(date).getTime()));
        // return dates;
        // alert(startPreOrderTime);
    },

    publishToken() {
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
                                            <input type="text" placeholder="Decimals" name="rating" className="form-request-input" id="rating" ref="rating" /> <br /> <br />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-2">
                                            <label><b>Total Supply</b></label>
                                        </div>
                                        <div className="col-sm-4">
                                            <input type="text" placeholder="Total supply" name="decimals" className="form-request-input" id="decimals" ref="decimals" /> <br /> <br />
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
                            <div className="col-sm-12">
                                <div className="row header-form-request panel panel-heading">
                                    <div className="col-sm-12">
                                        <h4 className="panel-title">Demark : Deploy ICO</h4>
                                    </div>
                                </div>
                                <div className="panel-body">
                                    <div className="row">
                                        <div className="col-sm-2">
                                            <label><b>Start pre-order</b></label>
                                        </div>
                                        <div className="col-sm-4">
                                            <input type="datetime-local" placeholder="start pre-order" name="start-pre-order" className="form-request-input" id="startPreOrderTime" ref="start-pre-order" /> <br /> <br />                                            
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-2">
                                            <label><b>End pre-order</b></label>
                                        </div>
                                        <div className="col-sm-4">
                                            <input type="datetime-local" placeholder="end pre-order" name="end-pre-order" className="form-request-input" id="endPreOrderTime" ref="end-pre-order" /> <br /> <br />                                            
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-2">
                                            <label><b>Start order</b></label>
                                        </div>
                                        <div className="col-sm-4">
                                            <input type="datetime-local" placeholder="start order" name="start-order" className="form-request-input" id="startOrderTime" ref="start-order" /> <br /> <br />                                            
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-2">
                                            <label><b>End order</b></label>
                                        </div>
                                        <div className="col-sm-4">
                                            <input type="datetime-local" placeholder="end order" name="end-order" className="form-request-input" id="endOrderTime" ref="end-order" /> <br /> <br />                                            
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-2">
                                            <label><b>Pre-order amount</b></label>
                                        </div>
                                        <div className="col-sm-4">
                                            <input type="text" placeholder="Pre-order amount" name="pre-order-amount" className="form-request-input" id="preOrderAmount" ref="pre-order-amount" /> <br /> <br />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-2">
                                            <label><b>Order amount</b></label>
                                        </div>
                                        <div className="col-sm-4">
                                            <input type="text" placeholder="Order amount" name="order-amount" className="form-request-input" id="orderAmount" ref="order-amount" /> <br /> <br />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-2">
                                            <label><b>Pre-order price</b></label>
                                        </div>
                                        <div className="col-sm-4">
                                            <input type="text" placeholder="Base price" name="pre-order-price" className="form-request-input" id="preOrderPrice" ref="pre-order-price" /> <br /> <br />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-2">
                                            <label><b>Address</b></label>
                                        </div>
                                        <div className="col-sm-4">
                                            <input type="text" placeholder="Address" name="Address" className="form-request-input" id="address" ref="Address" /> <br /> <br />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-2">
                                            <label><b>Limited</b></label>
                                        </div>
                                        <div className="col-sm-4">
                                            <input type="number" placeholder="Limited" name="Limited" className="form-request-input" id="limitedToken" ref="Limited" /> <br /> <br />
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
                                            <button type="submit" className="button-request" onClick={this.returnDatesFromconvertTimeOrderToInt}>Publish</button>
                                        </div>
                                    </div>
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