const noteAddMessages = ['',
    '未知错误', '请输入商品编号', '请选择经手人',
    '请输入销售数量', '请输入单价', '请输入销售单位',
    '请输入客户姓名', '请输入客户联系方式', '销售单位长度不能超过45位',
    '客户姓名不能超过45位', '客户联系方式不能超过45位', '备注不能超过45位',
    '销售数量必须为正整数', '单价必须为非负数', '商品编号不存在',
    '商品库存不足', '摘要不能超过45位', '销售商品不能为空'
];

$(document).ready(function() {
    var noteAddList = [];
    $('#a-sale').addClass('active');

    //获取经手人信息
    getAgents();


    //销售单添加新商品
    $('#btn-note-add-add').bind('click', function() {
        $('#alert-note-add').addClass('none');
        var isExists = false;
        var saleItem = {
            repositoryid: $('#input-note-add-repositoryid').val(),
            agent: $('#select-note-add-agent').val(),
            num: $('#input-note-add-salenum').val(),
            unitprice: $('#input-note-add-unitprice').val(),
            remark: $('#input-note-add-remark').val()
        };
        for (let i = 0; i < noteAddList.length; i++) {
            if (saleItem.repositoryid == noteAddList[i].repositoryid) {
                isExists = true;
                $('#alert-note-add').removeClass('none').html("该商品已在销售单中!");
            }
        }
        if (!isExists)
            $.post("/sale/addCommodity", saleItem, function(res) {
                if (res.code == 0) {
                    noteAddList.push(saleItem);
                    $('#alert-note-add').addClass('none');
                    var line = '<tr id="tr-note-add-' + saleItem.repositoryid + '">';
                    line += '<td>' + saleItem.repositoryid + '</td>';
                    line += '<td>' + res.item.fullname + '/' + res.item.type + '/' + res.item.width + '*' + res.item.height + '</td>';
                    line += '<td>' + saleItem.unitprice + '</td>';
                    line += '<td>' + saleItem.num + '</td>';
                    line += '<td>' + saleItem.num * saleItem.unitprice + '</td>';
                    line += '<td> <button type="button"class="btn btn-danger btn-sm btn-note-add-remove" data-id="' + saleItem.repositoryid + '">移除</button></td>';
                    line += '</tr>';
                    $('#table-note-add-body').append(line);
                    noteAddTotal(noteAddList);
                    noteAddCommodityClear();
                } else {
                    $('#alert-note-add').removeClass('none').html(noteAddMessages[res.code]);
                }
            });
    });


    //移除商品项
    $(document).on('click', '.btn-note-add-remove', function(e) {
        for (let i = 0; i < noteAddList.length; i++) {
            if (noteAddList[i].repositoryid == e.target.dataset.id) {
                noteAddList.splice(i, 1);
                break;
            }
        }
        $('#tr-note-add-' + e.target.dataset.id).remove();
        noteAddTotal(noteAddList);
    });

    //清空销售单商品输入信息
    $('#btn-note-add-clear').bind('click', noteAddCommodityClear);

    //清空销售单
    $('#btn-note-add-realclear').bind('click', function() {
        noteAddCommodityClear();
        noteAddInformationClear();
        noteAddList = [];
        noteAddTotal(noteAddList);
        $('#table-note-add-body').html("");
    });

    //确认销售单
    $('#btn-note-add-confirm').bind('click', function() {
        var info = {
            agent: $('#select-note-add-agent').val(),
            department: $('#input-note-add-department').val(),
            clientName: $('#input-note-add-clientName').val(),
            clientPhone: $('#input-note-add-clientPhone').val(),
            remark: $('#input-note-add-remark-total').val()
        }
        $.post('/sale/addSale', { list: JSON.stringify(noteAddList), info: JSON.stringify(info) }, function(res) {
            if (res.code == 0) {
                $('#alert-note-add-2').addClass('none');
                $('#modal-note-add').modal('hide');
                noteAddCommodityClear();
                noteAddInformationClear();
                $('#table-note-add-body').html("");
                noteAddList = [];
                noteAddTotal(noteAddList);
                $('#alert-main').html('销售单添加成功!').removeClass('invisible');
                setTimeout(() => {
                    $('#alert-main').addClass('invisible');
                }, 2000);
            } else {
                $('#alert-note-add-2').html(noteAddMessages[res.code]).removeClass('none');
            }
        });
    });
});

function getAgents() {
    $.get('/users/getAgents', function(res) {
        $('#select-note-add-agent').html("");
        for (let agent of res) {
            $('#select-note-add-agent').append('<option value="' + agent.id + '">' + agent.username + '</option>');
        }
    });
}

function noteAddTotal(list) {
    var totalNum = 0;
    var totalPrice = 0;
    for (let item of list) {
        totalNum += item.num * 1;
        totalPrice += item.unitprice * item.num;
    }
    $('#total-note-add-salenum').html(totalNum);
    $('#total-note-add-price').html(totalPrice);
}

function noteAddCommodityClear() {
    $('#input-note-add-repositoryid').val("");
    $('#input-note-add-salenum').val("");
    $('#input-note-add-unitprice').val("");
    $('#input-note-add-remark').val("");
}

function noteAddInformationClear() {
    $('#input-note-add-clientName').val("");
    $('#input-note-add-clientPhone').val("");
    $('#input-note-add-department').val("");
    $("#select-note-add-agent").get(0).selectedIndex = 0;
    $('#input-note-add-remark-total').val("");
}