var express = require('express');
var router = express.Router();
var db = require('../modules/dbhandler');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('client', { title: '客户管理' });
});

module.exports = router;