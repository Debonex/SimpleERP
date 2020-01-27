$(document).ready(function() {
    $('#a-repository-in').addClass('active');

    getRepositoryin();
});

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
        table += '<td>' + (item.num == 0 ? '0' : (item.costsum / item.num).toFixed(2)) + '</td>';
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

function getRepositoryin() {
    $.get('/repository-in/getall', {}, function(res) {
        renderTable(res);
    });
}