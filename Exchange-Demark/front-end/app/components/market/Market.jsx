import React from 'react';
import { Table } from 'react-bootstrap';
import firebase from 'firebase';

import axios from 'axios';

const tokenAPI = `http://api.ethplorer.io/getAddressInfo/0x32Be343B94f860124dC4fEe278FDCBD38C102D88?apiKey=freekey`;

class Market extends React.Component{

    constructor(props) {
        super(props);

        // this.handleClick = this.handleClickRow.bind(this);

        this.state = {
            tokens: [],
            toTokenDetail: false
        };
    }
    
    componentWillMount() {
        // Load custom in main and overrides
        require("../../css/main.less"); 
        
        axios.get(tokenAPI)
        .then(res => {
            // const persons = res.data;
            const tokens = res.data.tokens;
            this.setState({
                // persons: persons,
                tokens
            });
            // console.log(this.state.tokens);
        })
    }

    readFromDtbsToTable(){
        var index =1;
        var databaseRef = firebase.database().ref("/tokens");
        databaseRef.once('value', function(snapshot){
            snapshot.forEach(function (childSnapshot){
                var childKey = childSnapshot.key;
                var childData = childSnapshot.val();

                var row = document.getElementById('tbl_tokens_list');
                var cellId = row.insertCell(0);
                var cellName = row.insertCell(1);
                var cellSymbol = row.insertCell(2);
                var cellAddress = row.insertCell(3);
                var cellDescription = row.insertCell(4);

                cellId.appendChild(document.createTextNode(childKey));
                cellName.appendChild(document.createTextNode(childData.name));
                cellSymbol.appendChild(document.createTextNode(childData.symbol));
                cellAddress.appendChild(document.createTextNode(childData.address));
                cellDescription.appendChild(document.createTextNode(childData.description));
                
                index++;

            });
        });
    }

    render () {
        return (
            <div className="market-table panel panel-default">
                <div className="container-fluid">
                    <div className="row panel-heading">
                        <h1 className="panel-title">Token and ICO database</h1>
                        {/* {!this.props.market.error && ( */}
                        <hr />
                        <Table striped condensed hover>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Symbol</th>
                                    <th>Address</th>
                                    <th>Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.tokens.map((token, index) => {
                                    return (
                                        <tr style={{ cursor: 'pointer' }} >
                                            <td className="style-row">{index}</td>
                                            <td className="style-row color-token-name">{token.tokenInfo.name}</td>
                                            <td className="style-row">{token.tokenInfo.symbol}</td>
                                            <td className="style-row">{token.tokenInfo.address}</td>
                                            <td className="style-row">{token.tokenInfo.description}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </Table>
                        {/* )} */}
                    </div>
                </div>
            </div>
        );
    }
}


module.exports = Market;