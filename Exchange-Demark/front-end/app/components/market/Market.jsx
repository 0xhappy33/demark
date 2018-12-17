import React from 'react';
import { Table } from 'react-bootstrap';
import firebase from 'firebase';

class Market extends React.Component{
    
    constructor(props)
    {
        super(props);
        this.readFromDtbsToTable = this.readFromDtbsToTable.bind(this);
        
    }

    componentWillMount() {
        // Load custom in main and overrides
        require("../../css/main.less");
     
        //this.readFromDtbsToTable = this.readFromDtbsToTable.bind(this);
        // this.readFromDtbsToTable;
         window.addEventListener('load',this.readFromDtbsToTable);

    }

    // componentDidMount()
    // {
    //     window.addEventListener('load',this.readFromDtbsToTable);
    // }

    readFromDtbsToTable() {
        console.log("wtf???");
        var index = 1;
        var tblTokensList = document.getElementById("tbl_tokens_list");
        var databaseRef = firebase.database().ref("/tokens");
        databaseRef.once('value', function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                var childKey = childSnapshot.key;
                var childData = childSnapshot.val();
                if (childData.approve == true) {
                    var row = tblTokensList.insertRow(index);
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
                }

            });
        });
    }


    render() {
        return (
            <div className="market-table panel panel-default" onSubmit={this.readFromDtbsToTable}>
                <div className="container-fluid">
                    <div className="row panel-heading">
                        <h1 className="panel-title">Token and ICO database</h1>
                        {/* {!this.props.market.error && ( */}
                        <hr />
                        <Table id="tbl_tokens_list">
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
                                <tr>
                                    <td className="style-row">1</td>
                                    <td className="style-row color-token-name">DTU Token</td>
                                    <td className="style-row">DTUK</td>
                                    <td className="style-row">0xE41d2489571d322189246DaFA5ebDe1F4699F498</td>
                                    <td className="style-row">Tokens for tuition fees at Duy Tan universtiy</td>
                                </tr>

                                <tr>
                                    <td className="style-row">2</td>
                                    <td className="style-row color-token-name">BKD Token</td>
                                    <td className="style-row">BKDT</td>
                                    <td className="style-row">0xE41d2489571d322189246DaFA5ebDe1F4699F498</td>
                                    <td className="style-row">Tokens for tuition fees at Technology DN universtiy</td>
                                </tr>
                            </tbody>

                        </Table>
                        {/* )} */}
                    </div>
                </div>
                <div>
                    <button type="submit" onClick={this.readFromDtbsToTable}>test </button>
                </div>
            </div>

        );
    }
}


module.exports = Market;