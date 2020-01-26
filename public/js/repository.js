const rePositiveInt = /^[0-9]*[1-9][0-9]*$/;
const renonNegativeFloat = /^\d+(\.\d+)?$/;
$(document).ready(function() {
    var repositoryInList = [];
    //指定导航栏的当前标签
    $('#a-repository').addClass('a-current');

    //获取所有的仓库信息
    getRepositories();

    //获取所有的品牌信息
    $.get('/brands/getall', {}, function(res) {
        for (let brand of res) {
            $('#select-commodity-brand').append('<option value="' + brand.id + '">' + brand.brand + '</option>');
        }
    }, 'json');

    //关闭modal
    $('.close-commodity-add').bind('click', function() {
        addClearForm();
    });



    //清空modal
    $('#btn-in-clear').bind('click', function() {
        inClearInputAndSelect();
    });
    $('#btn-in-realclear').bind('click', function() {
        inClearForm();
        repositoryInList = [];
    })
    $('#btn-commodity-clear').bind('click', function() {
        addClearForm();
    });

    //添加入库项
    $('#btn-in-add').bind('click', function() {
        var check = inCheckForm();
        if (check.flag) {
            $.post('/repository/getRepositoryById', { repositoryid: check.repository.repositoryid }, function(res) {
                if (res.length == 0) {
                    $('#alert-in').html('商品编号不存在.');
                    $('#alert-in').removeClass('none');
                } else {
                    for (let item of repositoryInList) {
                        if (item.repositoryid == check.repository.repositoryid) {
                            check.flag = false;
                            $('#alert-in').html('商品编号已在入库单中.');
                            $('#alert-in').removeClass('none');
                        }
                    }
                    if (check.flag) {
                        repositoryInList.push(check.repository);
                        var line = '<tr id="tr-' + check.repository.repositoryid + '">';
                        line += '<td>' + check.repository.repositoryid + '</td>';
                        line += '<td>' + check.repository.num + '</td>';
                        line += '<td>' + check.repository.costsum + '</td>';
                        line += '<td> <button type="button"class="btn btn-danger btn-sm btn-in-remove" data-id="' + check.repository.repositoryid + '">移除</button></td>';
                        line += '</tr>';
                    }
                    $('#table-in-body').append(line);
                }
            });
        }
    });

    //移除入库项
    $(document).on('click', '.btn-in-remove', function(e) {
        for (i = 0; i < repositoryInList.length; i++) {
            if (repositoryInList[i].repositoryid == e.target.dataset.id) {
                repositoryInList.splice(i, 1);
                break;
            }
        }
        $('#tr-' + e.target.dataset.id).remove();
    });

    //确认入库
    $('#btn-in-confirm').bind('click', function() {
        var flag = true;
        if (repositoryInList.length == 0) {
            $('#alert-in').html('入库单不能为空.').removeClass('none');
            flag = false;
        }
        if (flag) {
            console.log(repositoryInList);
            $.post('/repository/inRepository', { list: JSON.stringify(repositoryInList) }, function(res) {
                console.log(res);
            });
        }
    });

    //确认添加商品
    $('#btn-commodity-confirm').bind('click', function() {
        var check = addCheckForm();
        if (check.flag) {
            var alert = $('#alert-commodity-add');
            $.post('/repository/addCommodity', check.commodity, function(res) {
                console.log(res);
                if (res.code == 0) {
                    $('#modal-commodity-add').modal('hide');
                    addClearForm();
                    getRepositories();
                    $('#alert-main').removeClass('invisible').html('添加商品成功!');
                    setTimeout(() => {
                        $('#alert-main').addClass('invisible');
                    }, 2000);
                } else if (res.code == 1) {
                    alert.html('未知错误!');
                    alert.removeClass('none');
                } else if (res.code == 2) {
                    alert.html('宽度和高度必须为正整数!');
                    alert.removeClass('none');
                } else if (res.code == 3) {
                    alert.html('商品编号已存在!');
                    alert.removeClass('none');
                }
            });
        }
    });
});

//简单检查入库modal
function inCheckForm() {
    var alert = $('#alert-in');
    var flag = true;
    alert.addClass('none');
    var repository = {
        repositoryid: $('#input-id').val(),
        num: $('#input-num').val(),
        costsum: $('#input-costsum').val(),
        remark: $('#input-remark').val()
    };
    if (repository.repositoryid.length == 0) {
        alert.html('请输入商品编号');
        alert.removeClass('none');
        flag = false;
    } else if (repository.num.length == 0) {
        alert.html('请输入商品数量');
        alert.removeClass('none');
        flag = false;
    } else if (repository.costsum.length == 0) {
        alert.html('请输入成本金额');
        alert.removeClass('none');
        flag = false;
    } else if (!rePositiveInt.test(repository.num)) {
        alert.html('商品数量需为正整数');
        alert.removeClass('none');
        flag = false;
    } else if (!renonNegativeFloat.test(repository.costsum)) {
        alert.html('成本价格需为非负数');
        alert.removeClass('none');
        flag = false;
    }
    return {
        flag: flag,
        repository: repository
    };
};

//简单检查添加商品modal
function addCheckForm() {
    var alert = $('#alert-commodity-add');
    var flag = true;
    alert.addClass('none');
    var commodity = {
        repositoryid: $('#input-commodity-id').val(),
        brand: $('#select-commodity-brand').val(),
        fullname: $('#input-commodity-fullname').val(),
        type: $('#input-commodity-type').val(),
        level: $('#select-commodity-level').val(),
        width: $('#input-commodity-width').val(),
        height: $('#input-commodity-height').val(),
        remark: $('#input-commodity-remark').val()
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
    } else if (commodity.repositoryid.length > 12) {
        alert.html('商品编号不能超过12位!');
        alert.removeClass('none');
        flag = false;
    } else if (commodity.fullname.length > 24) {
        alert.html('商品全名不能超过24位');
        alert.removeClass('none');
        flag = false;
    } else if (commodity.type.length > 24) {
        alert.html('商品型号不能超过24位');
        alert.removeClass('none');
        flag = false;
    } else if (commodity.remark.length > 45) {
        alert.html('商品备注不能超过45位');
        alert.removeClass('none');
        flag = false;
    }
    return {
        flag: flag,
        commodity: commodity
    };
}

//清空入库modal
function inClearForm() {
    inClearInputAndSelect();
    $('#table-in-body').html("");
};

//清空新增商品modal
function addClearForm() {
    $('#alert-commodity-add').addClass('none');
    $('#input-commodity-id').val("");
    $('#input-commodity-fullname').val("");
    $('#input-commodity-type').val("");
    $('#input-commodity-width').val("");
    $('#input-commodity-height').val("");
    $('#input-commodity-remark').val("");
    $("#select-commodity-brand").get(0).selectedIndex = 0;
    $("#select-commodity-level").get(0).selectedIndex = 0;
}

//清空入库modal中的input和select
function inClearInputAndSelect() {
    $('#alert-in').addClass('none');
    $('#input-id').val("");
    $('#input-num').val("");
    $('#input-costsum').val("");
    $('#input-remark').val("");
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
        table += '<td>' + (item.num == 0 ? '0' : item.costsum / item.num) + '</td>';
        table += '<td>' + item.costsum + '</td>';
        table += '<td>' + formatDate(item.intime) + '</td>';
        table += '<td>' + item.remark + '</td>';
        table += '</tr>';
    }
    for (i = count; i < maxcount; i++) {
        table += '<tr>';
        for (j = 0; j < 11; j++) table += '<td></td>';
        table += '</tr>';
    }
    $('#table-body').html(table);
};

function getRepositories() {
    $.get('/repository/getall', {}, function(res) {
        renderTable(res);
    }, 'json');
}