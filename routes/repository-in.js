var express = require('express');
var router = express.Router();
var db = require('../modules/dbhandler');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('repository-in', { title: '入库明细' });
});

router.get('/getall', function(req, response) {
    db.getRepositoryin(function(list) {
        response.send(list);
    });
});

module.exports = router;