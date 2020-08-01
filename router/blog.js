const express = require('express')
const router = express.Router()
const upload = require('../utils/multer')
const blogapi = require('../api/blogapi')

router.get('/blogdetail',(req,res)=>{
    // console.log(req.query.blogid);
    Promise.all([
        new Promise((resolve,reject)=>{
            blogapi.getblogdetail(req.query.blogid,(blogdetail,imgs)=>{
                // console.log(blogdetail);
                // console.log(imgs);
                resolve({blogdetail,imgs})
                
            })
        }),
        new Promise((resolve,reject)=>{
            blogapi.getcomment(req.query.blogid,results=>{
                resolve(results)
                
            })
        })
    ]).then(results=>{
        // console.log(results[1]);
        let user = null
        if(req.session && req.session.user){
        user = req.session.user.userid
        }
        else{
        user = ''
        }
        res.render('blogdetail.html',{
            blogdetail:results[0].blogdetail[0],
            imgs:results[0].imgs,
            comment:results[1],
            user
            })
    }
    )
})


router.post('/blogsubmit',upload.array('imgs'),(req,res)=>{
    if(req.session && req.session.user){
        let userid = req.session.user.userid
        let {title,content,type} = req.body
        let imgurl = []
        req.files.forEach(item=>{
            imgurl.push(`${item.destination.split('.')[1]}/${item.filename}`)
        })
        blogapi.blogsubmit(userid,title,content,type,imgurl,results=>{
           res.redirect('/?tab = all')
       })
    }
        else{
            res.redirect('/login')
        }
        
    }
   
    )
router.post('/commentsubmit',(req,res)=>{
    console.log(req.body.blogid);
        if(req.session && req.session.user){
            blogapi.commentsubmit(req.body.commentcontent,req.session.user.userid,req.body.blogid,results=>{
                res.redirect('/blogdetail?blogid='+req.body.blogid)
            })
        }
        else{
            res.redirect('/login')
        }
    })

module.exports = router