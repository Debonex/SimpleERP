var express = require('express');
var router = express.Router();
var db = require('../modules/dbhandler');

router.get('/getall', function(req, res) {
    db.getBrands(function(list) {
        res.send(list);
    });
});

module.exports = router;