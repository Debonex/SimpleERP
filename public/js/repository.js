$(document).ready(function() {
    $('#a-repository').addClass('a-current');

    function renderTable(list) {
        var table = '';
        for (let item of list) {
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
        }
        $('#table-body').html(table);
    }

    $.get('/repository/getall', {}, function(res) {
        renderTable(res);
    }, 'json');
});