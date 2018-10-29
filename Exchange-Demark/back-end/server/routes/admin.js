var express = require('express');
var router = express.Router();

const adminController = require('../controllers/admin');
/* GET users listing. */
router.get('/', adminController.home);
router.get('/get/:id', adminController.getContract);
router.put('/submit/:id', adminController.submitContract);
router.delete('/delete/:id', adminController.deleteContract);
module.exports = router;
