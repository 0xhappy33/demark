import React from 'react';


let TokenDetail = React.createClass({
    render () {
        return (
            <div className="main-token-detail">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-6">
                            <image src="https://tokenmarket.net/blockchain-static/fetch/assets/fetch/logo_big.png" 
                                style={{
                                    width: '25px',
                                    height: '25px'
                                }}
                            />
                            
                        </div>
                        <div className="col-sm-6"></div>
                    </div>
                </div>
            </div>
        );
    }
});


module.exports = TokenDetail;