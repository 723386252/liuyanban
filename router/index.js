const express = require('express')
const router = express.Router()
const api = require('../api/releaseapi')

router.get('/',(req,res)=>{
    // console.log(req.session.userid);
    res.render('index.html')
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

router.get('/releaseapi',(req,res)=>{
    // console.log(req.session.userid);
    api.blogsubmit(req,()=>{
        if(req.session && req.session.username){
            res.redirect('/')
        }
        else{
            res.redirect('/login')
    }})})

    module.exports = router