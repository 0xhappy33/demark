var express = require('express');
var app = express();

app.use(express.static('public'));
app.set('view engine', 'ejs');

/* GET home page. */
app.get('/', function(req, res) {
  res.render('index');
});


module.exports = router;
