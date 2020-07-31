const express = require('express')
const router = express.Router()
const api = require('../api/loginapi')
const upload = require('../utils/multer')

router.get('/register',(req,res)=>{
    // console.log(req.session.login);
    res.render('register.html')
})

router.get('/login',(req,res)=>{
    
    res.render('login.html')
})

router.post('/registersubmit',upload.single('portrait'),(req,res)=>{
    // console.log(req.file);
    // console.log(req.body);
    let {userid , username , password , sex } = req.body
    if(req.file){
    portrait = `${req.file.destination.split('.')[1]}/${req.file.filename}`
    }
    else if(sex = 'M'){
    portrait = '/assets/imgs/potrait/default_M.jpg'
    }
    else{
    portrait = '/assets/imgs/potrait/default_F.jpg'
    }
    api.registersubmit(userid , username ,password , sex , portrait , results=>{
        req.session.user = {username,userid}
        // res.redirect('/?tab = all')
    })

    
})

router.get('/loginsubmit',(req,res)=>{
    // console.log(req.query);
    let {userid,password} = req.query
    api.loginsubmit(userid , password, results =>{
        // console.log(results);
        if(results.length===0){
            res.redirect('/login')
        }
        else{
            req.session.user = {username:results[0].username,userid}
            res.redirect('/?tab=all')
        }
    })
    
})

module.exports = router