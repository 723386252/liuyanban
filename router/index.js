const express = require('express')
const router = express.Router()
const blogapi = require('../api/blogapi')
const loginapi = require('../api/loginapi')


router.get('/',(req,res)=>{
    // console.log(req.session.userid);
    if(!req.query.tab || req.query.tab=== 'all'){
        blogapi.getblog('all',results=>{
            // console.log(results);
            res.render('index.html',{
                bloginfo:results
            })
        })
        
    }
    
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



    module.exports = router