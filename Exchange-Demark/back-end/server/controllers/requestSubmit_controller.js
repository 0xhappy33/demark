const Contract = require('../models/contract_model');

//Simple version, without validation or sanitation
module.exports = {
    requestSubmit: function (req, res) {
        let contract = new Contract(
            {
                name: req.body.name,
                decimal: req.body.decimal,
                symbol: req.body.symbol,
                rating: req.body.rating,
                cashier: req.body.cashier,
                description : req.body.description
            }
        );
    
        contract.save(function (err) {
            if (err) {
                return next(err);
            }
            res.send('Done')
        })
    }
}
