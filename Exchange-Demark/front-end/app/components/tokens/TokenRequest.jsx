import React from 'react';

let TokenRequest = React.createClass({

    componentWillMount() {
        // Load custom in main and overrides
        require("../../css/main.less");
    },

    render() {
        return (
            <div className="form-request">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-8">
                            <div className="row header-form-request">
                                <div className="col-sm-12">
                                    <h4>Demark : Request submit your token</h4>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-2">
                                    <label><b>Name</b></label>
                                </div>
                                <div className="col-sm-4">
                                    <input type="text" placeholder="Name" name="name" className="form-request-input" /> <br /> <br />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-2">
                                    <label><b>Symbol</b></label>
                                </div>
                                <div className="col-sm-4">
                                    <input type="text" placeholder="Symbol" name="symbol" className="form-request-input" /> <br /> <br />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-2">
                                    <label><b>Rating</b></label>
                                </div>
                                <div className="col-sm-4">
                                    <input type="text" placeholder="Rating" name="rating" className="form-request-input" /> <br /> <br />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-2">
                                    <label><b>Decimals</b></label>
                                </div>
                                <div className="col-sm-4">
                                    <input type="text" placeholder="Decimals" name="decimals" className="form-request-input" /> <br /> <br />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-2">
                                    <label><b>Cashier</b></label>
                                </div>
                                <div className="col-sm-4">
                                    <input type="text" placeholder="Cashier" name="cashier" className="form-request-input" /> <br /> <br />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-2">
                                    <label><b>Description</b></label>
                                </div>
                                <div className="col-sm-4">
                                    <textarea type="text" placeholder="" className="form-request-input" /> <br /> <br />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-2">
                                </div>
                                <div className="col-sm-4">
                                    <button type="submit" className="button-request">Request submit token</button>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-4">
                            <h4>How it works?</h4> <br/>
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

        );
    }
});

module.exports = TokenRequest;