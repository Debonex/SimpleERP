$(document).ready(function() {
    var commodityCount = 0;
    //指定导航栏的当前标签
    $('#a-repository').addClass('a-current');

    //获取所有的仓库信息
    $.get('/repository/getall', {}, function(res) {
        renderTable(res);
    }, 'json');


    $('.close-in').bind('click', function() {
        clearInform();
        commodityCount = 0;
    });

    $('#btn-add').bind('click', function() {
        var check = checkInform();
        if (check.flag) {
            commodityCount++;
            console.log(commodityCount);
            var line = '<tr>';
            line += '<td>' + check.commodity.repositoryid + '</td>';
            line += '<td>' + check.commodity.fullname + '</td>';
            line += '<td>' + check.commodity.num + '</td>';
            line += '<td>' + check.commodity.costsum + '</td>';
            line += '<td> <button type="button"class="btn btn-danger btn-sm">移除</button></td>';
            line += '</tr>';
        }
        $('#table-in-body').append(line);
    });

    $('#btn-clear').bind('click', function() {
        clearInputAndSelect();
    });
});

//简单检查入库单表
function checkInform() {
    var alert = $('#alert-in');
    var flag = true;
    alert.addClass('none');
    var commodity = {
        repositoryid: $('#input-id').val(),
        brand: $('#select-brand').val(),
        fullname: $('#input-fullname').val(),
        type: $('#input-type').val(),
        level: $('#select-level').val(),
        width: $('#input-width').val(),
        height: $('#input-height').val(),
        num: $('#input-num').val(),
        costsum: $('#input-costsum').val(),
        remark: $('#input-remark').val()
    };
    if (commodity.repositoryid.length == 0) {
        alert.html('请输入商品编号');
        alert.removeClass('none');
        flag = false;
    } else if (commodity.brand == '选择品牌') {
        alert.html('请选择品牌');
        alert.removeClass('none');
        flag = false;
    } else if (commodity.fullname.length == 0) {
        alert.html('请输入商品全名');
        alert.removeClass('none');
        flag = false;
    } else if (commodity.type.length == 0) {
        alert.html('请输入商品型号');
        alert.removeClass('none');
        flag = false;
    } else if (commodity.level == '选择等级') {
        alert.html('请选择商品等级');
        alert.removeClass('none');
        flag = false;
    } else if (commodity.width.length == 0) {
        alert.html('请输入宽度');
        alert.removeClass('none');
        flag = false;
    } else if (commodity.height.length == 0) {
        alert.html('请输入高度');
        alert.removeClass('none');
        flag = false;
    } else if (commodity.num.length == 0) {
        alert.html('请输入商品数量');
        alert.removeClass('none');
        flag = false;
    } else if (commodity.costsum.length == 0) {
        alert.html('请输入成本金额');
        alert.removeClass('none');
        flag = false;
    }
    return {
        flag: flag,
        commodity: commodity
    };
};

function clearInform() {
    clearInputAndSelect();
    $('#table-in-body').html("");
};

function clearInputAndSelect() {
    $('#alert-in').addClass('none');
    $('#input-id').val("");
    $('#input-fullname').val("");
    $('#input-type').val("");
    $('#input-width').val("");
    $('#input-height').val("");
    $('#input-num').val("");
    $('#input-costsum').val("");
    $('#input-remark').val("");
    $("#select-brand").get(0).selectedIndex = 0;
    $("#select-level").get(0).selectedIndex = 0;
}

function renderTable(list) {
    var i;
    var count = 0;
    const maxcount = 30;
    var table = '';
    for (let item of list) {
        count++;
        table += '<tr>';
        table += '<td>' + item.repositoryid + '</td>';
        table += '<td>' + item.brand + '</td>';
        table += '<td>' + item.fullname + '</td>';
        table += '<td>' + item.type + '</td>';
        table += '<td>' + item.level + '</td>';
        table += '<td>' + item.width + '*' + item.height + '</td>';
        table += '<td>' + item.num + '</td>';
        table += '<td>' + item.costsum / item.num + '</td>';
        table += '<td>' + item.costsum + '</td>';
        table += '<td>' + formatDate(item.intime) + '</td>';
        table += '<td>' + item.batchid + '</td>';
        table += '<td>' + item.remark + '</td>';
        table += '</tr>';
    }
    for (i = count; i < maxcount; i++) {
        table += '<tr>';
        for (j = 0; j < 12; j++) table += '<td></td>';
        table += '</tr>';
    }
    $('#table-body').html(table);
};