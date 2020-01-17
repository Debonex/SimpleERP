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
            $.post('/users/login', { username, password }, function(data) {
                if (data.state == 0) {
                    $('#alert-success').html('登陆成功，即将跳转').removeClass('none');
                    setTimeout(() => {
                        window.location.href = '/repository';
                    }, 800);
                } else if (data.state == 1 || data.state == 3) {
                    alertPassword.html(data.message);
                    alertPassword.removeClass('none');
                } else if (data.state == 2) {
                    alertUsername.html(data.message);
                    alertUsername.removeClass('none');
                }
            }, 'json');
        }

    })
})