$(document).ready(function() {
    $('#a-repository-out').addClass('a-current');

    getRepositoryout();
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
        table += '<td>' + item.num_pre + '</td>';
        table += '<td>' + item.num + '</td>';
        table += '<td>' + item.num_after + '</td>';
        table += '<td>' + formatDate(item.outtime) + '</td>';
        table += '<td>' + item.remark + '</td>';
        table += '</tr>';
    }
    for (i = count; i < maxcount; i++) {
        table += '<tr>';
        for (j = 0; j < 11; j++) table += '<td></td>';
        table += '</tr>';
    }
    $('#table-body').html(table);
}

function getRepositoryout() {
    $.get('/repository-out/getall', {}, function(res) {
        renderTable(res);
    });
}