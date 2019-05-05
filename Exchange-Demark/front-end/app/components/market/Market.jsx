import React from 'react';
import { Table, Card, Button } from 'react-bootstrap';
import firebase from 'firebase';

import { Link } from 'react-router';

class Market extends React.Component {

    constructor(props) {
        super(props);

        this.readFromDtbsToTable = this.readFromDtbsToTable.bind(this);
        this.readIcoFromDtbs = this.readIcoFromDtbs.bind(this);

        this.state = {
            tokens: [],
            ico: []
        }
    }

    componentWillMount() {
        // Load custom in main and overrides
        require("../../css/main.less");
    }


    componentDidMount() {
        this.readFromDtbsToTable();
        this.readIcoFromDtbs();
    }

    readFromDtbsToTable() {
        //var index = 1;
        var databaseRef = firebase.database().ref("/tokens");
        var tokenData = [];
        databaseRef.once('value', function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                var item = childSnapshot.val();
                item.key = childSnapshot.key;
                if (item.approve == true) {
                    tokenData.push(item);
                    //index++;
                }
            });
        });

        this.setState({
            tokens: tokenData
        });
    }

    readIcoFromDtbs() {
        var index = 1;
        var databaseRef = firebase.database().ref("/contract_ico");
        var icoData = [];
        databaseRef.once('value', function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                var item = childSnapshot.val();
                item.key = childSnapshot.key;
                if (item.approve == false) {
                    icoData.push(item);
                    index++;
                }
            });
        });

        this.setState({
            ico: icoData
        });
    }

    render() {
        return (
            <div>
                {/* List of Token ICO */}
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
                                                <td className="style-row" hidden>
                                                    {item.key}
                                                </td>
                                                <td className="style-row color-token-name">
                                                    <Link to={`/tokendetail/${item.key}`}>
                                                    {/* <Link to={`/tokendetail/${item.key}`}> */}
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

                {/* List contract ICO */}
                <div className="market-table panel panel-default">
                    <div className="container-fluid">
                        <div className="row panel-heading">
                            <h1 className="panel-title">LIST ICO</h1>
                            {/* {!this.props.market.error && ( */}
                            <hr />
                            <Table history id="tbl_ico_list">
                                <thead>
                                    <tr>
                                        {/* <th>#</th> */}
                                        <th>Name</th>
                                        <th>Amount</th>
                                        <th>Deadline</th>
                                        {/* <th>Deadline</th> */}
                                        <th>Address</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.ico.map(item => {
                                        return (
                                            <tr key={item.key} value={item}>
                                                {/* <td className="style-row">
                                                {item.key}
                                            </td> */}
                                                <td className="style-row color-token-name">
                                                    <Link to={`/contractico/${item.key}`}>
                                                        {item.icoName}
                                                    </Link>
                                                </td>
                                                <td className="style-row">
                                                    {item.preOrderAmount} <br></br>
                                                    {item.orderAmount}
                                                </td>
                                                <td className="style-row">{item.endOrderTime}</td>
                                                <td className="style-row">{item.addressOfTokenUsed}</td>
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
                                <div className="card">
                                    <img clclassName="card-img-top" src="https://blog.blockchain.com/content/images/2019/04/xlmprimer_blog-2.png" style={{width: '150px'}} alt="Card image cap"/>
                                    <div className="card-body">
                                        <h5 className="card-title">What is Stellar?</h5>
                                        <p className="card-text">A Primer on Our Wallet’s Newest Cryptoasset</p>
                                        <a href="https://blog.blockchain.com/2019/04/29/what-is-stellar-a-primer-on-our-wallets-newest-crypto-asset/" className="btn btn-primary">More</a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-3">
                                <div className="card">
                                    <img clclassName="card-img-top" src="https://blog.blockchain.com/content/images/2019/02/givingweek_blog-1.png" style={{width: '150px'}} alt="Card image cap"/>
                                    <div className="card-body">
                                        <h5 className="card-title">Giving Crypto</h5>
                                        <p className="card-text">The Airdrop That Keeps On Giving</p>
                                        <a href="https://blog.blockchain.com/2019/02/26/givecrypto/" className="btn btn-primary">More</a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-3">
                                <div className="card">
                                    <img clclassName="card-img-top" src="https://fs.bitcoinmagazine.com/img/images/whatisETH.original.jpg" style={{width: '150px'}} alt="Card image cap"/>
                                    <div className="card-body">
                                        <h5 className="card-title">What Is Ether?</h5>
                                        <p className="card-text">Ether is the underlying token powering the Ethereum blockchain</p>
                                        <a href="https://www.coinschedule.com/blog/quantum-resistant-ilcoin-returns-to-bitker/" className="btn btn-primary">More</a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-3">
                                <div className="card">
                                    <img clclassName="card-img-top" src="https://fs.bitcoinmagazine.com/img/images/What_is_an_ICO.original.jpg" style={{width: '150px'}} alt="What Is an ICO?"/>
                                    <div className="card-body">
                                        <h5 className="card-title">What Is an ICO?</h5>
                                        <p className="card-text">An Initial Coin Offering, also commonly referred to as an ICO</p>
                                        <a href="https://blog.blockchain.com/2019/04/29/what-is-stellar-a-primer-on-our-wallets-newest-crypto-asset/" className="btn btn-primary">More</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        );
    }
}


module.exports = Market;