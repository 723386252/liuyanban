const express = require('express')
const router = express.Router()
const blogapi = require('../api/blogapi')
// const loginapi = require('../api/loginapi')


router.get('/',(req,res)=>{
    // console.log(req.session.userid);
    // console.log('首页');
    if(!req.query.tab || !req.query.page){
        req.query.tab = 'all'
        req.query.page= 1
    }
        blogapi.getblog(req.query.tab,req.query.page,(error,results)=>{
            // console.log(results[1][0].total);
            res.render('index.html',{
                bloginfo:results[0],
                tab:req.query.tab,
                total:results[1][0].total,
                page:req.query.page
            })
        })
    
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