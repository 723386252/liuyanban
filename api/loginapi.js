const connection = require('./mysql')

let api = {
    loginsubmit: function (userid , password , success){
connection.query(`select username from users where exists (select * from users where userid='${userid}' and password = '${password}')`,(error,results)=>{
if(error){
    console.log(error);

}
else{
    success(results)
}
}
)
},

registersubmit: function (userid , username ,password ,portrait,success){
connection.query(`INSERT INTO users(userid,username,password ,portrait) VALUES ('${userid}','${username}','${password}','${portrait}')`,(error,results)=>{
if(error){
    console.log(error);
}
else{
    success(results)
}
})}
}
module.exports = api