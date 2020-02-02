var express = require('express');
var router = express.Router();
var db = require('../modules/dbhandler');
const levels = ['优', '良'];
const reNaturalNum = /^\d+$/;　　 //非负整数（正整数 + 0）
const rePositiveNum = /^[0-9]*[1-9][0-9]*$/ //正整数

router.get('/', function(req, res, next) {
    res.render('repository', { title: '仓储管理' });
});

router.get('/getall', function(req, res) {
    db.getRepositorys(function(list) {
        res.send(list);
    });
});



router.post('/getRepositoryById', function(req, response) {
    db.getRepositoryById(req.body.repositoryid, function(detail) {
        response.send(detail);
    });
});

router.post('/inRepository', function(req, response) {
    //0:入库成功，1：未知错误
    var code = 0;
    var list = JSON.parse(req.body.list);

    if (!list || list.length == 0) code = 1;
    if (code == 0) {
        db.inRepositoryList(list);
    }
    response.send({ code: code });
});

router.post('/outRepository', function(req, response) {
    //0:入库成功,1:未知错误,2:商品数量不足
    var code = 0;
    var list = JSON.parse(req.body.list);
    if (!list || list.length == 0) code = 1;
    if (code == 0) db.outRepositoryList(list);
    response.send({ code: code });
})

router.post('/addCommodity', function(req, response) {
    //0:无错误,1:未知错误,2:规格不是正整数,3:商品编号已存在
    var code = 0;
    var iserr = false;
    var commodity = req.body;
    //根据brandid获取brand名称，如果不存在则返回错误
    db.getBrandById(commodity.brand, function(res) {
        if (res.length) {
            commodity.brand = res[0].brand;
        } else {
            iserr = true;
        }
        //获取等级名称
        var levelnum = parseInt(commodity.level);
        if (levelnum >= 0 && levelnum <= 1) commodity.level = levels[levelnum];
        else iserr = true;
        //检查宽度高度
        if ((!rePositiveNum.test(commodity.width)) || (!rePositiveNum.test(commodity.height))) code = 2;
        //检查内容是否为空
        if (!(commodity.repositoryid.length && commodity.brand.length && commodity.fullname.length && commodity.type.length)) iserr = true;
        //检查内容是否过长
        if (commodity.repositoryid.length > 12 || commodity.fullname.length > 24 || commodity.type > 24 || commodity.remark > 45 || commodity.width.length > 11 || commodity.height.length > 11) iserr = true;
        //检查商品编号是否已存在
        db.getRepositoryNumById(commodity.repositoryid, function(num) {
            if (num == 1) {
                code = 3;
            }
            if (iserr) code = 1;
            else if (code == 0) {
                db.addCommodity(commodity);
            }
            response.send({ code });
        });
    });

});

router.post('/addBrand', function(req, response) {
    var code = 0; //0:succ,1:err,2:品牌名已存在
    var brand = req.body.brand;
    if (!brand || brand.length == 0 || brand.length > 45) code = 1;
    if (code == 0) {
        db.getBrandByName(brand, function(res) {
            if (res.length > 0) {
                code = 2;
            } else {
                db.addBrand(brand);
            }
            response.send({ code: code });
        });
    }
});

module.exports = router;