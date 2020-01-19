$(document).ready(function() {
    $.get('/repository/getall', {}, function(res) {
        console.log(res);
    }, 'json');
});