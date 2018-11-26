import React from 'react';
import { Table } from 'react-bootstrap';

import axios from 'axios';

const tokenAPI = `http://api.ethplorer.io/getAddressInfo/0x32Be343B94f860124dC4fEe278FDCBD38C102D88?apiKey=freekey`;

class Market extends React.Component {

    constructor(props) {
        super(props);

        this.handleClick = this.handleClickRow.bind(this);

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

    trimString(s) {
        if (s.length < 50) {
            return s;
        }
        return s.substring(0, Math.min(s.length(), 50));
    }


    handleClickRow() {
        let path = `tokendetail`;
        this.props.history.push(path);
    }

    render() {

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