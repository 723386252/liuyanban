const pool = require('../utils/mysql');

let api = {
blogsubmit :function (bloguserid,blogtitle,blogcontent,blogtype,imgurl,success) {

    pool.query(`insert into blog(bloguserid,blogtitle,blogcontent,blogtype,pushtime) values ('${bloguserid}','${blogtitle}','${blogcontent}','${blogtype}',now());`,(error_0,results_0)=>{
        if(error_0){
            console.log(error_0);
            success(error_0)
        }
        else{
            if(imgurl.length !== 0){
            pool.query(`select MAX(blogid) blogid from blog where bloguserid = '${bloguserid}'`,(error_1,results_1)=>{
                if(error_1){
                    console.log(error_1);
                    success(error_1)
                }
                else{
                    let sql = ''
                    imgurl.forEach(item=>{
                        sql+=`insert into blogimgs(blogid,imgurl) values(${results_1[0].blogid},'${item}');`
                    })
                    pool.query(sql,(error_2,results_2)=>{
                        success(error_2,results_2)
                        if(error_2){
                            console.log(error_2);
                        }
                    })
                }
            })
        }
            else{
            success(error_0,results_0)
        }
    }})
},
getblog:function(blogtype,page,success){
    if(blogtype !== 'all'){
    let sql = `select * from blog t1,users t2 where t1.blogtype = '${blogtype}' and t1.bloguserid = t2.userid limit ${(page-1) * 10},10;
               select count(*) as total from blog;`
    pool.query(sql,(error,results)=>{
        success(error,results)
        if(error){
            console.log(error);
        }
    })}
    else{
    let sql = `select * from blog t1,users t2 where t1.bloguserid = t2.userid limit ${(page-1) * 10},10;
               select count(*) as total from blog;`
    pool.query(sql,(error,results)=>{
        success(error,results)
        if(error){
            console.log(error);
        }
        
    })
    }
},
getblogdetail:function (blogid,success){ 
    let sql1 = `select * from blog t1,users t2 where t1.blogid = ${blogid} and t1.bloguserid = t2.userid`
    let sql2 = `select * from blogimgs where blogid = ${blogid}`
    pool.query(sql1,(error_0,blogdetail)=>{
        if(error_0){
            console.log(error_0);
            success(error_0)
        }
        else{
            pool.query(sql2,(error_1,imgs)=>{
                success(error_1,blogdetail,imgs)
                if(error_1){
                    console.log(error_1);
                }
            })
        }
    }
    )},
addblogview:function (blogid,view,success) {
    let sql = `update blog set view = ${view} where blogid = ${blogid}`
    pool.query(sql,(error,results)=>{
        success(error,results)
        if(error){
            console.log(error);
        }
    })
}

}

module.exports = api