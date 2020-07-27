const express = require('express')

const router = express.Router()

router.get('/register',(req,res)=>{
    // console.log(req.session.login);
    // console.log('66');
    res.render('register.html')
})

router.get('/login',(req,res)=>{
    
    res.render('login.html')
})
module.exports = router