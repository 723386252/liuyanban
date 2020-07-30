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
})}
}

module.exports = api