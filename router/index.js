const express = require('express')
const router = express.Router()
const blogapi = require('../api/blogapi')
// const loginapi = require('../api/loginapi')


router.get('/',(req,res)=>{
            let user = null
            if(typeof(req.session.user) !== "undefined" && req.session.user !== null){
                user = req.session.user.username
            }
            res.render('index.html',{
                user
            })
        })

router.get('/getbloglist',(req,res)=>{
    blogapi.getblog(req.query.tab,req.query.page,(error,results)=>{
        if(error){
            res.send({
                success:0,
                error_code:103
            })
        }
        else{
            res.send({
                success:1,
                error_code:0,
                bloginfo:results[0],
                tab:req.query.tab,
                total:results[1][0].total,
                page:req.query.page
            })
        }
    })
})

router.get('/release',(req,res)=>{
    // console.log(req.session.userid);
    try {
         if(typeof(req.session.user) !== "undefined" && req.session.user !== null){
    res.render('release.html')}
    else{
        res.redirect('/login')
    }
    } catch (error) {
        res.redirect('/login')
    }
})



    module.exports = router