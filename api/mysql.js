const mysql = require('mysql')

const connection = mysql.createConnection({
    host:'rm-uf6t3nbwg493gx54eqo.mysql.rds.aliyuncs.com',
    user:'sheweijie',
    password:'753951ShE82',
    database:'tables'
})
connection.connect()
module.exports = connection