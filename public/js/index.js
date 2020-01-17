$(document).ready(function() {
    $('#button-login').bind('click', function() {
        var flag = true;
        var alertUsername = $('#alert-username');
        var alertPassword = $('#alert-password');
        alertUsername.addClass('none');
        alertPassword.addClass('none');
        var username = $('#input-username').val();
        var password = $('#input-password').val();
        if (username.length == 0) {
            flag = false;
            alertUsername.html('用户名不能为空！');
            alertUsername.removeClass('none');
        }
        if (password.length == 0) {
            flag = false;
            alertPassword.html('密码不能为空！');
            alertPassword.removeClass('none');
        }
        if (flag) {

        }

    })
})