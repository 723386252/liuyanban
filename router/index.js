const express = require('express')
const connection = require('../api/mysql')
const router = express.Router()


router.get('/',(req,res)=>{
    // console.log(req.session.userid);
    console.log('收到请求');
    connection.query(`select msgcontent,username,DATE_FORMAT(now(),'%Y-%m-%d %H-%i-%s') msgtime from message t1,users t2 where t1.msguserid=t2.userid`,(error,results,fields)=>{
        // console.log(results.length);
        // console.log(error);
    
        try{
            if(results.length !==0){
                let msg =[]
                results.forEach(item=>{
                    msg.push({
                        content:item.msgcontent,
                        time:item.msgtime,
                        user:item.username
                    })
                })
                // console.log(msg);
            res.render('border.html',{
                msg
            })}
            else{
            res.render('border.html')}
        }catch{
            let msg = []
            res.render('border.html',{
                msg
            })
        }
        
    })
    
}
)

router.get('/release',(req,res)=>{
    // console.log(req.session.userid);
    try {
         if(req.session.userid){
    res.render('release.html')}
    else{
        res.redirect('/login')
    }
    } catch (error) {
        res.redirect('/login')
    }
   
})

module.exports = router

