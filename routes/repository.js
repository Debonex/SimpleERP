var express = require('express');
var router = express.Router();
var db = require('../modules/dbhandler');

router.get('/', function(req, res, next) {
    res.render('repository', { title: '仓储管理' });
});

router.get('/getall', function(req, res) {
    db.getRepositorys(function(list) {
        res.send(list);
    });

});

module.exports = router;