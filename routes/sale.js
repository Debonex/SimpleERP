var express = require('express');
var router = express.Router();
var db = require('../modules/dbhandler');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('sale', { title: '销售出库' });
});


module.exports = router;