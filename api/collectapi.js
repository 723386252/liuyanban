const pool = require('../utils/mysql');

const api = {
addcollect:function (blogid,userid,collect,success) {
    let sql = `insert into collect(blogid,userid) values (${blogid},'${userid}');update blog set collect = ${collect+1} where blogid = ${blogid}`
    // console.log(sql);
    pool.query(sql,(error,results)=>{
        success(error,results)
        if(error){
            console.log(error);
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