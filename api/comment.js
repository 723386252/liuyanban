const pool = require('../utils/mysql');

const api = {
    commentsubmit:function (content,userid,blogid,success) { 
        let sql = `insert into comments(comment_content,comment_userid,comment_time,comment_blogid) values ('${content}','${userid}',now(),'${blogid}')`
        pool.query(sql,(error,results)=>{
            success(error,results)
            if(error){
                console.log(error);
            }
    
        })
     },
     getcomment:function (blogid,page,success) {
         let sql = `select t1.*,t2.portrait,t2.username,t2.userid from comments t1,users t2 where t1.comment_userid = t2.userid and t1.comment_blogid = ${blogid} limit ${(parseInt(page) - 1) * 6},6;
                    select count(*) as total from comments where comment_blogid = '${blogid}';`
         pool.query(sql,(error,results)=>{
            success(error,results)
             if(error){
                 console.log(error);
             }
         })
       },
deletecomment:function (commentid,req,success){
    let sql = `delete from comments where commentid = '${commentid}' and comment_userid = '${req.session.user.userid}'`
    pool.query(sql,(error,results)=>{
        success(error,results)
        if(error){
            console.log(error);
        }
    })
}
}
module.exports = api