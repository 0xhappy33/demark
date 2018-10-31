import React from 'react';
import { Table } from 'react-bootstrap';


let Market = React.createClass({
    render () {
        return (
            <div>
                <div className="container-fluid">
                    <div className="row">
                        <h2>Token and ICO database</h2>
                        {/* {!this.props.market.error && ( */}
                            <hr/>
                            <Table striped bordered condensed hover>
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
                                        <td style={paddingTable}>1</td>
                                        <td style={paddingTable}>DTU Token</td>
                                        <td style={paddingTable}>DTUK</td>
                                        <td style={paddingTable}>0xE41d2489571d322189246DaFA5ebDe1F4699F498</td>
                                        <td style={paddingTable}>Tokens for tuition fees at Duy Tan universtiy</td>
                                    </tr>
                                    <tr style={paddingTable}>
                                        <td style={paddingTable}>2</td>
                                        <td style={paddingTable}>BKD Token</td>
                                        <td style={paddingTable}>BKDT</td>
                                        <td style={paddingTable}>0xE41d2489571d322189246DaFA5ebDe1F4699F498</td>
                                        <td style={paddingTable}>Tokens for tuition fees at Technology DN universtiy</td>
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

const paddingTable = {
    paddingTop: '20',
    paddingBottom: '20'
};

module.exports = Market;