const express = require('express')
const router = express.Router()
const api = require('../api/blogapi')
const upload = require('../utils/multer')

router.get('/',(req,res)=>{
    // console.log(req.session.userid);
    res.render('index.html')
}
)


router.get('/release',(req,res)=>{
    // console.log(req.session.userid);
    try {
         if(req.session && req.session.user){
    res.render('release.html')}
    else{
        res.redirect('/login')
    }
    } catch (error) {
        res.redirect('/login')
    }
   
})

router.post('/blogsubmit',upload.array('imgs'),(req,res)=>{
    console.log(req.body);
    console.log(req.files);
    if(req.session && req.session.user){
    //    api.blogsubmit(req.body,results=>{
    //        res.send('提交成功')
    //        res.redirect('/?tab = all')
    //    })
    }
        else{
            res.redirect('/login')
        }
        
    }
   
    )

    module.exports = router