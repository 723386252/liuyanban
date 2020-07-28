const express = require('express')
const connection = require('../api/mysql')
const router = express.Router()


router.get('/',(req,res)=>{
    // console.log(req.session.userid);
    res.render('border.html')
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

