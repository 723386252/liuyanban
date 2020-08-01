const connection = require('../utils/mysql');

let api = {
blogsubmit :function (bloguserid,blogtitle,blogcontent,blogtype,imgurl,success) {

    connection.query(`insert into blog(bloguserid,blogtitle,blogcontent,blogtype,pushtime) values ('${bloguserid}','${blogtitle}','${blogcontent}','${blogtype}',now());`,(error_0,results_0)=>{
        if(error_0){
            console.log(error_0);
        }
        else{
            if(imgurl.length !== 0){
            connection.query(`select MAX(blogid) blogid from blog where bloguserid = '${bloguserid}'`,(error_1,results_1)=>{
                if(error_1){
                    console.log(error_1);
                }
                else{
                    let sql = ''
                    imgurl.forEach(item=>{
                        sql+=`insert into blogimgs(blogid,imgurl) values(${results_1[0].blogid},'${item}');`
                    })
                    connection.query(sql,(error_2,results_2)=>{
                        if(error_2){
                            console.log(error_2);
                        }
                        else{
                            success(results_2)
                        }
                    })
                }
            })
        }
        else{
            success(results_0)
        }
    }})
},
getblog:function(blogtype,success){
    if(blogtype !== 'all'){
    let sql = `select * from blog t1,users t2 where t1.blogtype = '${blogtype}' and t1.bloguserid = t2.userid`
    connection.query(sql,(error,results)=>{
        if(error){
            console.log(error);
        }
        else{
            success(results)
        }
    })}
    else{
    let sql = `select * from blog t1,users t2 where t1.bloguserid = t2.userid`
    connection.query(sql,(error,results)=>{
        if(error){
            console.log(error);
        }
        else{
            success(results)
        }
        
    })
    }
},
getblogdetail:function (blogid,success){ 
    let sql1 = `select * from blog t1,users t2 where t1.blogid = ${blogid} and t1.bloguserid = t2.userid`
    let sql2 = `select * from blogimgs where blogid = ${blogid}`
    connection.query(sql1,(error_0,blogdetail)=>{
        if(error_0){
            console.log(error_0);
        }
        else{
            connection.query(sql2,(error_1,imgs)=>{
                if(error_1){
                    console.log(error_1);
                }
                else{
                    success(blogdetail,imgs)
                }
            })
        }
    }
    )},
commentsubmit:function (content,userid,blogid,success) { 
    let sql = `insert into comments(comment_content,comment_userid,comment_time,comment_blogid) values ('${content}','${userid}',now(),'${blogid}')`
    connection.query(sql,(error,results)=>{
        if(error){
            console.log(error);
        }
        else{
            success(results)
        }
    })
 },
 getcomment:function (blogid,success) {
     let sql = `select * from comments t1,users t2 where t1.comment_userid = t2.userid and t1.comment_blogid = ${blogid}`
     connection.query(sql,(error,results)=>{
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