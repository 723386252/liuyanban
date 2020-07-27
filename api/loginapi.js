const connection = require('./mysql')

const express = require('express')
const router = express.Router()



router.get('/registerapi',(req,res)=>{
    let {userid,username,password} = req.query
    connection.query(`INSERT INTO users(userid,username,password) VALUES ('${userid}','${username}','${password}')`,(error,results,fields)=>{
        if(error){
            res.send({success:false,msg:'error',err_code:1})
        }
        else{
            req.session.userid = userid
            res.redirect('/')
        }
    })
})

router.get('/loginapi',(req,res)=>{
    let {userid,username,password} = req.query
    connection.query(`select username from users where exists (select * from users where userid='${userid}' and password = '${password}')`,(error,results,fields)=>{
        // console.log(results.length);
        if(error){
            res.send({success:false,msg:'error',err_code:1})
        }
        else if(results.length===0){
            res.redirect('/login')
        }
        else{
            req.session.userid = userid
            console.log(req.session.userid);
            res.redirect('/')
        }
    })
})

module.exports = router