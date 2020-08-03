const pool = require('../utils/mysql');

const api = {
addcollect:function (blogid,userid,success) {
    let sql1 = `select collect from blog where blogid = ${blogid}`
    
    pool.query(sql1,(error_0,results_0)=>{
        if(error_0){
            success(error_0,results_0)
            console.log(error_0);
        }
        else{
            let sql2 = `insert into collect(blogid,userid) values (${blogid},'${userid}');update blog set collect = ${parseInt(results_0[0].collect)+1} where blogid = ${blogid}`
            pool.query(sql2,(error_1,results_1)=>{
                success(error_1,results_1)
                if(error_1){
                    console.log(error_1);
                }
            })
        }
    })
    
  },
iscollect :function(blogid,userid,success){
    let sql = `select iscollect from collect where blogid = ${blogid} and userid = '${userid}'`
    pool.query(sql,(error,results)=>{
        success(error,results)
        if(error){
            console.log(error);
        }
    })
}
}
module.exports = api