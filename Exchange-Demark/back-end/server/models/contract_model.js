var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ContractSchema = new Schema({
    name: String,
    decimal: Number,
    symbol: String,
    rating: Number,
    cashier: String,
    description : String,
    address: {type : String,default : '0x0'},
    approve: {type : Boolean,default : false}
});

// Compile model from schema
module.exports = mongoose.model('Contract', ContractSchema );