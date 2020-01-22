var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('repository-in', { title: '入库清单' });
});

module.exports = router;