var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('repository', { title: '仓储管理' });
});

module.exports = router;