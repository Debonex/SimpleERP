const mysql = require('mysql');
const config = require('./configure');
const cryption = require('./cryption');

const connection = mysql.createConnection(config.database);

connection.connect();

var methods = {
    addUser(user) {
        var password = cryption.aesEncrypt(user.password, config.aeskey);
        var sql = 'insert into users (username,password,priority) values (\'' + user.username + '\',\'' + password + '\',\'' + user.priority + '\')';
        connection.query(sql);
    },
    getUserByUsername(username, callback) {
        var sql = 'select * from users where username=\'' + username + '\'';
        connection.query(sql, function(err, result) {
            if (err) {
                console.error(err.stack);
            } else {
                result[0].password = cryption.aesDecrypt(result[0].password, config.aeskey);
                callback(result[0]);
            }
        });
    },
    isUsernameExits(username, callback) {
        var sql = 'select count(*) as num from users where username=\'' + username + '\'';
        connection.query(sql, function(err, result) {
            if (err) {
                console.error(err.stack);
            } else {
                callback(result[0].num);
            }
        });
    },
    getRepositorys(callback) {
        var sql = 'select * from repository';
        connection.query(sql, function(err, result) {
            if (err) {
                console.error(err.stack);
            } else {
                callback(result[0]);
            }
        })
    }
};

module.exports = methods;