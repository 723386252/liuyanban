const mysql = require('mysql')

const pool  = mysql.createPool({
    connectionLimit : 10,
    host            : 'rm-uf6t3nbwg493gx54eqo.mysql.rds.aliyuncs.com',
    user            : 'sheweijie',
    password        : '753951ShE82',
    database        : 'tables',
    multipleStatements:true
  });


module.exports = pool