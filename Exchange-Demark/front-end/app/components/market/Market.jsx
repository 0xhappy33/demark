import React from 'react';
import { Table } from 'react-bootstrap';

let Market = React.createClass({

    componentWillMount() {
        // Load custom in main and overrides
        require("../../css/main.less");
    },

    render () {
        return (
            <div className="market-table">
                <div className="container-fluid">
                    <div className="row">
                        <h3>Token and ICO database</h3>
                        {/* {!this.props.market.error && ( */}
                            <hr/>
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
            </div>
        );
    }
});


module.exports = Market;