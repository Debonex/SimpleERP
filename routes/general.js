var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('general', { title: '总览' });
});

module.exports = router;