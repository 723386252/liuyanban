const connection = require('./mysql')

let api = {
blogsubmit : function(req,success){

    connection.query(`insert into message(msgcontent,msguserid,msgtime) values ('${req.query.content}','${req.session.userid}',now())`,(error,results)=>{
        if(error){
            console.log(error);
        }
        else{
            success(results)
        }
})},
imgsubmit :function (req,success) {
    let bloguserid = req.session.user.userid
    let {blogtitle,blogcontent,blogtype} = req.body
    connection.query(`insert into blog(bloguserid,blogtitle,blogcontent,blogtype,pushtime) values (${bloguserid},${blogtitle},${blogcontent},${blogtype},now())`,(error,results)=>{
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