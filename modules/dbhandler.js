/**
 * @author Debonex
 * @date 2020年1月27日
 */
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
    getAgents(callback) {
        var sql = "select id,username from users where priority=0 order by id";
        connection.query(sql, function(err, result) {
            if (err) console.error(err.stack);
            else callback(result);
        })
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
        var sql2 = "update repository set num=num+'" + repository.num +
            "',costsum=costsum+'" + repository.costsum +
            "' where repositoryid='" + repository.repositoryid + "'";
        connection.query(sql);
        connection.query(sql2);
    },
    outRepository(repository) {
        var sql = "insert into repository_out (repositoryid,brand,fullname,type,level,width,height,num_pre,num,num_after,remark) values('" +
            repository.repositoryid + "','" +
            repository.brand + "','" +
            repository.fullname + "','" +
            repository.type + "','" +
            repository.level + "','" +
            repository.width + "','" +
            repository.height + "','" +
            repository.numpre + "','" +
            repository.num + "','" +
            repository.numafter + "','" +
            repository.remark + "')";
        var sql2 = "update repository set costsum=(costsum-costsum*('" + repository.num + "'/num)),num=num-'" + repository.num +
            "' where repositoryid='" +
            repository.repositoryid + "'";
        connection.query(sql);
        connection.query(sql2);
    },
    inRepositoryList(list) {
        for (let repo of list) {
            this.getRepositoryById(repo.repositoryid, function(detail) {
                if (detail.length != 0) {
                    var repository = detail[0];
                    repository.num = repo.num;
                    repository.costsum = repo.costsum;
                    repository.remark = repo.remark;
                    methods.inRepository(repository);
                }
            });
        }
    },
    outRepositoryList(list) {
        for (let repo of list) {
            methods.getRepositoryById(repo.repositoryid, function(detail) {
                if (detail.length != 0) {
                    var repository = detail[0];
                    if (repository.num >= repo.num) {
                        repository.numpre = repository.num;
                        repository.numafter = repository.num - repo.num;
                        repository.num = repo.num;
                        repository.remark = repo.remark;
                        methods.outRepository(repository);
                    }
                }
            });
        }
    },
    addCommodity(commodity) {
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
    },
    //repository_in
    getRepositoryin(callback) {
        var sql = 'select * from repository_in order by intime desc';
        connection.query(sql, function(err, result) {
            if (err) console.error(err.stack);
            else callback(result);
        })
    },
    //repository_out
    getRepositoryout(callback) {
        var sql = "select * from repository_out order by outtime desc";
        connection.query(sql, function(err, result) {
            if (err) console.error(err.stack);
            else callback(result);
        });
    },
    //sale
    getSales(callback) {
        var sql = "select * from sale";
        connection.query(sql, function(err, result) {
            if (err) console.error(err.stack);
            else callback(result);
        });
    },
    getSalesTable(callback) {
        var sql = "select s.saleid as saleId,u.username as agent,c.client_name as clientName,s.department as department,s.sale_time as saleTime,s.remark as remark " +
            "from sale as s,users as u,client as c " +
            "where s.agent_id=u.id and s.client_id=c.client_id";
        connection.query(sql, function(err, result) {
            if (err) console.error(err.stack);
            else callback(result);
        });
    },
    addSale(sale, callback) {
        var sql = "insert into sale (agent_id,client_id,department,remark) values('" +
            sale.info.agent + "','" +
            sale.info.clientId + "','" +
            sale.info.department + "','" +
            sale.info.remark + "')";
        connection.query(sql, function(err, res) {
            if (err) console.error(err.stack);
            else {
                for (let item of sale.list) {
                    methods.getRepositoryById(item.repositoryid, function(detail) {
                        if (detail.length != 0) {
                            var repo = detail[0];
                            let sql2 = "insert into sale_item (saleid,repositoryid,brand,fullname,type,level,width,height,sale_num,unitprice,remark) values('" +
                                res.insertId + "','" +
                                repo.repositoryid + "','" +
                                repo.brand + "','" +
                                repo.fullname + "','" +
                                repo.type + "','" +
                                repo.level + "','" +
                                repo.width + "','" +
                                repo.height + "','" +
                                item.num + "','" +
                                item.unitprice + "','" +
                                item.remark + "')";
                            connection.query(sql2);
                        }
                    });
                }
            }
        });
        callback();
    },
    //client
    getClientByNameAndPhone(name, phone, callback) {
        var sql = "select * from client where client_name='" + name + "' and client_phone='" + phone + "'";
        connection.query(sql, function(err, result) {
            if (err) console.error(err.stack);
            else callback(result);
        });
    },
    getClientById(id, callback) {
        var sql = "select * from client where client_id='" + id + "'";
        connection.query(sql, function(err, result) {
            if (err) console.error(err.stack);
            else callback(result);
        })
    },
    addClient(clientName, clientPhone, callback) {
        var sql = "insert into client (client_name,client_phone) values('" +
            clientName + "','" +
            clientPhone + "')";
        connection.query(sql);
        callback();
    }
};

module.exports = methods;