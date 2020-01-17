var express = require('express');
var router = express.Router();
var db = require('../modules/dbhandler');

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.post('login', function(req, res) {
    var user = {
        username: req.body.username,
        password: req.body.password
    }
    db.isUsernameExits(req.body.username, function(num) {
        if (num != 1) {
            res.send({ state: 1, message: '用户名或密码错误' });
        } else {
            db.getUserByUsername(req.body.username, function(result) {
                if (user.password !== result.password) {
                    res.send({ state: 1, message: '用户名或密码错误' });
                } else {
                    // req.session.username = result.username;
                    // res.cookie('user', result);
                    res.send({ state: 0, message: '登陆成功' });
                }
            })
        }
    });
});

module.exports = router;