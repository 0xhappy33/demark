import React from 'react';
import { Table, Card, Button } from 'react-bootstrap';
import firebase from 'firebase';

import { Link } from 'react-router';

class Market extends React.Component {

    constructor(props) {
        super(props);

        this.readFromDtbsToTable = this.readFromDtbsToTable.bind(this);

        this.state = {
            tokens: []
        }
    }

    componentWillMount() {
        // Load custom in main and overrides
        require("../../css/main.less");
    }


    componentDidMount() {
        this.readFromDtbsToTable();
    }

    readFromDtbsToTable() {
        var index = 1;
        var databaseRef = firebase.database().ref("/tokens");
        var tokenData = [];
        databaseRef.once('value', function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                var item = childSnapshot.val();
                item.key = childSnapshot.key;
                if (item.approve == true) {
                    tokenData.push(item);
                    index++;
                }
            });
        });

        this.setState({
            tokens: tokenData
        });
    }

    render() {
        return (
            <div>

                <div className="market-table panel panel-default">
                    <div className="container-fluid">
                        <div className="row panel-heading">
                            <h1 className="panel-title">LIST OF TOKEN</h1>
                            {/* {!this.props.market.error && ( */}
                            <hr />
                            <Table history id="tbl_tokens_list">
                                <thead>
                                    <tr>
                                        {/* <th>#</th> */}
                                        <th>Name</th>
                                        <th>Symbol</th>
                                        <th>Address</th>
                                        <th>Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.tokens.map(item => {
                                        return (
                                            <tr key={item.key} value={item}>
                                                {/* <td className="style-row">
                                                {item.key}
                                            </td> */}
                                                <td className="style-row color-token-name">
                                                    <Link to="/tokendetail">
                                                        {item.name}
                                                    </Link>
                                                </td>
                                                <td className="style-row">{item.symbol}</td>
                                                <td className="style-row">{item.address}</td>
                                                <td className="style-row">{item.description}</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </Table>
                            {/* )} */}
                        </div>
                    </div>
                </div>

                
                <div className="market-table panel panel-default">
                    <div className="container-fluid">
                        <div className="row panel-heading">
                            <h1 className="panel-title">LIST ICO</h1>
                            {/* {!this.props.market.error && ( */}
                            <hr />
                            <Table history id="tbl_tokens_list">
                                <thead>
                                    <tr>
                                        {/* <th>#</th> */}
                                        <th>Name</th>
                                        <th>Funding Goal</th>
                                        <th>Base price</th>
                                        <th>Deadline</th>
                                        <th>Address</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.tokens.map(item => {
                                        return (
                                            <tr key={item.key} value={item}>
                                                {/* <td className="style-row">
                                                {item.key}
                                            </td> */}
                                                <td className="style-row color-token-name">
                                                    <Link to="/tokendetail">
                                                        {item.name}
                                                    </Link>
                                                </td>
                                                <td className="style-row">23000 tokens</td>
                                                <td className="style-row">2 ETH</td>
                                                <td className="style-row">May 5th, 2019</td>
                                                <td className="style-row">{item.address}</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </Table>
                            {/* )} */}
                        </div>
                    </div>
                </div>

                <div className="market-table panel panel-default">
                    <div className="container-fluid">
                        <div className="row panel-heading">
                            <h1 className="panel-title">Trends of ICO Blockchain</h1>
                            <hr />
                            <div className="col-sm-3">
                                blog one
                            </div>
                            <div className="col-sm-3">
                                blog two
                            </div>
                            <div className="col-sm-3">
                                blog three
                            </div>
                            <div className="col-sm-3">
                                blog four
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        );
    }
}


module.exports = Market;