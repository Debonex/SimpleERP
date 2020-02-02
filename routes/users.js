var express = require('express');
var router = express.Router();
var db = require('../modules/dbhandler');

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.get('/getAgents', function(req, response) {
    db.getAgents(function(res) {
        response.send(res);
    });
});

router.post('/login', function(req, res) {
    var user = {
        username: req.body.username,
        password: req.body.password
    }
    var reUsername = /^[a-z0-9]{4,16}$/i;
    var rePassword = /^[a-z0-9]{6,16}$/i;
    if (!reUsername.test(user.username)) {
        res.send({ state: 2, message: '用户名由4-16位字母和数字组成' });
    } else if (!rePassword.test(user.password)) {
        res.send({ state: 3, message: '密码由6-16位字母和数字组成' });
    } else {
        db.isUsernameExits(req.body.username, function(num) {
            if (num != 1) {
                res.send({ state: 1, message: '用户名或密码错误' });
            } else {
                db.getUserByUsername(req.body.username, function(result) {
                    if (user.password !== result.password) {
                        res.send({ state: 1, message: '用户名或密码错误' });
                    } else {
                        req.session.username = result.username;
                        res.cookie('user', result);
                        res.send({ state: 0, message: '登陆成功' });
                    }
                })
            }
        });
    }
});

module.exports = router;