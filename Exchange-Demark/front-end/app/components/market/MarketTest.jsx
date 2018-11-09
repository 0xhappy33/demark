import React from 'react';

// import axios from 'axios';
// const API = 'https://api-rinkeby.etherscan.io/api?module=logs&action=getLogs&fromBlock=0&toBlock=latest&address=${tokenAddress}&topic0=${_topic}&apikey=${myAPI}';
// const tokenAddress = '0x82Bc6014e248439e50B1a7b51737859AF1E92702';
// const _topic = '0xf6f342132c7de5e5a1e99c8efae544c94731f3ff093f5c3c97c6973d9415cdfb';
// const myAPI = 'NQNPZCN9E9X3BX5WEGISP84158T55AMW21';

const tokenAPI = `https://api.ethplorer.io/getTokenInfo/0xb5a5f22694352c15b00323844ad545abb2b11028?apiKey=freekey`;

export default class MarketTest extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tokens: [],
            error: null
        };
    }

    componentDidMount() {
        fetch(tokenAPI)
            .then(response => {
                //console.log(response.json());
                return response.json()
            })
            .then(data => {
                console.log(data);
                this.setState({ tokens: data });
            })
            .catch(error => this.setState({ error }));
    }

    render() {
        return (
            <div>
                <p>Hello data</p>
                <ul>
                    {this.state.tokens.map(token => <li>{token.address}</li>)}
                    {this.state.tokens.map(token => <li>{token.name}</li>)}
                </ul>
            </div>
        )
    }    

}

// let MarketTest = React.createClass({
//     constructor(props) {
//         super(props);

//         this.state = {
//             tokens: []
//         };
//     },

//     componentDidMount() {
//         fetch(tokenAPI)
//         .then(response => response.json())
//         .then(data => this.setState({ tokens: data }));
//     },

//     render() {
//         return (
//             <ul>
//                 {this.state.tokens.map(token => <li>{token.address}</li>)}
//                 {this.state.tokens.map(token => <li>{token.name}</li>)}
//             </ul>
//         )
//     }
// });

// module.exports = MarketTest;