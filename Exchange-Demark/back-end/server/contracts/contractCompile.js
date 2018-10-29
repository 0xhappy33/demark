const fs = require('fs');
const solc = require('solc');
let inputs = {
    'DTUToken.sol' : fs.readFileSync('/home/zohar/DTU/CAP1/server/contracts/DTUToken.sol', 'utf8').toString()
};

let output = solc.compile({sources : inputs},1);
module.exports = {
    interface : output.contracts['DTUToken.sol:DTUToken'].interface,
    bytecode : output.contracts['DTUToken.sol:DTUToken'].bytecode
}