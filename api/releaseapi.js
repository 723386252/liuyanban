const connection = require('./mysql')
const express = require('express')
const router = express.Router()



router.get('/releaseapi',(req,res)=>{
    // console.log(req.session.userid);
  try{
      if(req.session.userid){
        //   console.log(req.session.userid);
    connection.query(`insert into message(msgcontent,msguserid,msgtime) values ('${req.query.content}','${req.session.userid}',now())`,(error,results,fields)=>{
        console.log(error);
        res.redirect('/')
    })
}
    else{
        res.redirect('/login')
    }
  }catch{
      res.redirect('/login')
  }
})

module.exports = router