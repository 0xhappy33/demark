var express = require('express');
var router = express.Router();

const requestSubmit = require('../controllers/requestSubmit_controller');
/* GET users listing. */
router.post('/', requestSubmit.requestSubmit);

module.exports = router;
