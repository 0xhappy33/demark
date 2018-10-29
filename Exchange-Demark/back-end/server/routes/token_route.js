const express = require('express');
let router = express.Router();
// const http = require();

const token = require('../controllers/token_controllers');

//default events = BuyToken
router.get('/', token.viewToken);


module.exports = router;