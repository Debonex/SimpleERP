var db = require('./modules/dbhandler');

var user = {
    username: 'admin',
    password: '750628',
    priority: 0
};

db.isUsernameExits(user.username, function(num) {
    if (num === 0) {
        db.addUser(user);
    } else {
        console.log('管理员初始化失败：管理员用户名已存在');
    }
});