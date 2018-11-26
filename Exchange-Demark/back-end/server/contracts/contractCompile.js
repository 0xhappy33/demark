const fs = require('fs');
const solc = require('solc');
let inputs = {
    //change this
    'DTUToken.sol' : fs.readFileSync('/home/datngo/DeMark/demark/Exchange-Demark/back-end/server/contracts/DTUToken.sol', 'utf8').toString()
};

let output = solc.compile({sources : inputs},1);
module.exports = {
    interface : output.contracts['DTUToken.sol:DTUToken'].interface,
    bytecode : output.contracts['DTUToken.sol:DTUToken'].bytecode
}