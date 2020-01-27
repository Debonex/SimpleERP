const mysql = require('mysql');
const config = require('./configure');
const cryption = require('./cryption');

const connection = mysql.createConnection(config.database);

connection.connect();

var methods = {
    //users
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
    //brands
    getBrands(callback) {
        var sql = 'select * from brands';
        connection.query(sql, function(err, result) {
            if (err) {
                console.error(err.stack);
            } else {
                callback(result);
            }
        })
    },
    getBrandById(id, callback) {
        var sql = "select brand from brands where id = '" + id + "'";
        connection.query(sql, function(err, result) {
            if (err) {
                console.error(err.stack);
            } else {
                callback(result);
            }
        })
    },
    getBrandByName(brand, callback) {
        var sql = "select * from brands where brand = '" + brand + "'";
        connection.query(sql, function(err, result) {
            if (err) {
                console.error(err.stack);
            } else {
                callback(result);
            }
        })
    },
    addBrand(brand) {
        var sql = "insert into brands (brand) values('" + brand + "')";
        connection.query(sql);
    },
    //repository
    getRepositorys(callback) {
        var sql = 'select * from repository';
        connection.query(sql, function(err, result) {
            if (err) {
                console.error(err.stack);
            } else {
                callback(result);
            }
        })
    },
    getRepositoryNumById(repositoryid, callback) {
        var sql = 'select count(*) as num from repository where repositoryid=\'' + repositoryid + '\'';
        connection.query(sql, function(err, result) {
            if (err) {
                console.error(err.stack);
            } else {
                callback(result[0].num);
            }
        });
    },
    getRepositoryById(repositoryid, callback) {
        var sql = "select * from repository where repositoryid='" + repositoryid + "'";
        connection.query(sql, function(err, result) {
            if (err) {
                console.error(err.stack);
            } else {
                callback(result);
            }
        })
    },
    inRepository(repository) {
        var sql = "insert into repository_in (repositoryid,brand,fullname,type,level,width,height,num,costsum,remark) values('" +
            repository.repositoryid + "','" +
            repository.brand + "','" +
            repository.fullname + "','" +
            repository.type + "','" +
            repository.level + "','" +
            repository.width + "','" +
            repository.height + "','" +
            repository.num + "','" +
            repository.costsum + "','" +
            repository.remark + "')";
        connection.query(sql);
    },
    inRepositoryList(list) {
        for (let repo of list) {
            this.getRepositoryById(repo.repositoryid, function(detail) {
                if (detail.length != 0) {
                    var repository = detail[0];
                    repository.num = repo.num;
                    repository.costsum = repo.costsum;
                    repository.remark = repo.remark;
                    var sql = "update repository set num=num+'" + repository.num +
                        "',costsum=costsum+'" + repository.costsum +
                        "' where repositoryid='" + repository.repositoryid + "'";
                    connection.query(sql);
                    methods.inRepository(repository);
                }
            });
        }
    },
    addCommodity(commodity) {
        //新增商品时，数量成本默认为0，时间为当前时间
        var sql = "insert into repository (repositoryid,brand,fullname,type,level,width,height,remark) values('" +
            commodity.repositoryid + "','" +
            commodity.brand + "','" +
            commodity.fullname + "','" +
            commodity.type + "','" +
            commodity.level + "','" +
            commodity.width + "','" +
            commodity.height + "','" +
            commodity.remark + "')";
        connection.query(sql);
    }
};

module.exports = methods;