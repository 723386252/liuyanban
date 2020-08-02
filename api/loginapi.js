const pool = require('../utils/mysql')

let api = {
    loginsubmit: function (userid, password, success) {
        pool.query(`select username from users where exists (select * from users where userid='${userid}' and password = '${password}')`, (error, results) => {
            success(error,results)
            if (error) {
                console.log(error);
            }
        })
    },

    registersubmit: function (userid, username, password, sex, portrait, success) {
        pool.query(`INSERT INTO users(userid,username,password ,sex,portrait) VALUES ('${userid}','${username}','${password}','${sex}','${portrait}')`, (error, results) => {
            success(error,results)
            if (error) {
                console.log(error);
            } 
        })
    },
    getuserinfo:function (userid,success) {
        let sql = `select * from users where userid = '${userid}'`
        pool.query(sql , (error,results)=>{
            success(error,results)
            if(error){
                console.log(error);
            }
        })
    }
}
module.exports = api