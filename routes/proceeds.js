var express = require('express');
var router = express.Router();
var db = require('../modules/dbhandler');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('proceeds', { title: '收款' });
});


module.exports = router;