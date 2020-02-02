var express = require('express');
var router = express.Router();
var db = require('../modules/dbhandler');
const reNaturalNum = /^\d+$/;　　 //非负整数（正整数 + 0）
const rePositiveNum = /^[0-9]*[1-9][0-9]*$/ //正整数
const reNaturalFloat = /^\d+(\.\d+)?$/ //非负小数

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('sale', { title: '销售出库' });
});

router.get('/getSales', function(req, response) {
    db.getSales(function(res) {
        response.send(res);
    });
});

router.get('/getSalesTable', function(req, response) {
    db.getSalesTable(function(list) {
        response.send(list);
    });
});

// const noteAddMessages = ['',
//     '未知错误', '请输入商品编号', '请选择经手人',
//     '请输入销售数量', '请输入单价', '请输入销售单位',
//     '请输入客户姓名', '请输入客户联系方式', '销售单位长度不能超过45位',
//     '客户姓名不能超过45位', '客户联系方式不能超过45位', '备注不能超过45位',
//     '销售数量必须为正整数', '单价必须为非负数', '商品编号不存在',
//     '商品库存不足', '摘要不能超过45位', '销售商品不能为空'
// ];

router.post('/addSale', function(req, response) {
    var code = 0;
    var list = JSON.parse(req.body.list);
    var info = JSON.parse(req.body.info);
    if (!info) code = 1;
    else if (!info.agent || info.agent.length == 0) code = 3;
    else if (!info.department || info.department.length == 0) code = 6;
    else if (!info.clientName || info.clientName.length == 0) code = 7;
    else if (!info.clientPhone || info.clientPhone.length == 0) code = 8;
    else if (info.department.length > 45) code = 9;
    else if (info.clientName.length > 45) code = 10;
    else if (info.clientPhone.length > 45) code = 11;
    else if (info.remark.length > 45) code = 17;
    else if (!list || list.length == 0) code = 18;
    if (code != 0) response.send({ code: code });
    else {
        db.getClientByNameAndPhone(info.clientName, info.clientPhone, function(res) {
            if (res.length == 0) {
                db.addClient(info.clientName, info.clientPhone, function() {
                    db.getClientByNameAndPhone(info.clientName, info.clientPhone, function(res) {
                        info.clientId = res[0].client_id;
                        db.addSale({ list: list, info: info }, function() {
                            response.send({ code: 0 });
                        });
                        db.outRepositoryList(list);
                    });
                });
            } else {
                info.clientId = res[0].client_id;
                db.addSale({ list: list, info: info }, function() {
                    response.send({ code: 0 });
                });
                db.outRepositoryList(list);
            }
        });
    }

});

router.post('/addCommodity', function(req, response) {
    var code = 0;
    var item = req.body;
    if (!item) code = 1;
    else if (!item.repositoryid || item.repositoryid.length == 0) code = 2;
    else if (!item.num || item.num.length == 0) code = 4;
    else if (!item.unitprice || item.unitprice.length == 0) code = 5;
    else if (item.remark.length > 45) code = 12;
    else if (!rePositiveNum.test(item.num)) code = 13;
    else if (!reNaturalFloat.test(item.unitprice)) code = 14;
    if (code != 0) response.send({ code: code });
    else {
        db.getRepositoryNumById(item.repositoryid, function(num) {
            if (num != 1) response.send({ code: 15 });
            else {
                db.getRepositoryById(item.repositoryid, function(result) {
                    if (result[0].num < item.num) response.send({ code: 16 });
                    else response.send({ code: 0, item: result[0] });
                });
            }
        });
    }
});


module.exports = router;