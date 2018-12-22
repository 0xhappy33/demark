import React from 'react';

import axios from 'axios';
// const API = 'https://api-rinkeby.etherscan.io/api?module=logs&action=getLogs&fromBlock=0&toBlock=latest&address=${tokenAddress}&topic0=${_topic}&apikey=${myAPI}';
// const tokenAddress = '0x82Bc6014e248439e50B1a7b51737859AF1E92702';
// const _topic = '0xf6f342132c7de5e5a1e99c8efae544c94731f3ff093f5c3c97c6973d9415cdfb';
// const myAPI = 'NQNPZCN9E9X3BX5WEGISP84158T55AMW21';

const tokenAPI = `http://api.ethplorer.io/getAddressInfo/0x32Be343B94f860124dC4fEe278FDCBD38C102D88?apiKey=freekey`;

class MarketTest extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            // persons: [],
            tokens: []
        }
    }

    componentDidMount() {

        axios.get(tokenAPI)
            .then(res => {
                // const persons = res.data;
                const tokens = res.data.tokens;
                this.setState({ 
                    // persons: persons,
                    tokens
                });
                console.log(this.state.tokens);
            })
    }

    render() {
        return (
            <ul>
            { this.state.tokens.map((token,index) => {
                return (
                   <li key={index}>
                       <span>{token.tokenInfo.name}</span>
                    </li>
                 );
               })
             }
            </ul>
        );
    }

}

module.exports = MarketTest;