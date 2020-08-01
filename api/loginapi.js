const connection = require('../utils/mysql')

let api = {
    loginsubmit: function (userid, password, success) {
        connection.query(`select username from users where exists (select * from users where userid='${userid}' and password = '${password}')`, (error, results) => {
            if (error) {
                console.log(error);

            } else {
                success(results)
            }
        })
    },

    registersubmit: function (userid, username, password, sex, portrait, success) {
        connection.query(`INSERT INTO users(userid,username,password ,sex,portrait) VALUES ('${userid}','${username}','${password}','${sex}','${portrait}')`, (error, results) => {
            if (error) {
                console.log(error);
            } else {
                success(results)
            }
        })
    },
    getuserinfo:function (userid,success) {
        let sql = `select * from users where userid = '${userid}'`
        connection.query(sql , (error,results)=>{
            if(error){
                console.log(error);
            }
            else{
                success(results)
            }
        })
    }
}
module.exports = api