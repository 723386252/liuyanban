const express = require('express')
const router = express.Router()
const upload = require('../utils/multer')
const blogapi = require('../api/blogapi')
const commentapi = require('../api/comment')

router.get('/blogdetail',(req,res)=>{
    // console.log(req.query.blogid);
    Promise.all([
        new Promise((resolve,reject)=>{
            blogapi.getblogdetail(req.query.blogid,(error,blogdetail,imgs)=>{
                // console.log(blogdetail);
                // console.log(imgs);
                if(error){
                    res.redirect('/blogdetail?blogid='+req.query.blogid)
                }
                resolve({blogdetail,imgs})
                
            })
        }),
        new Promise((resolve,reject)=>{
            commentapi.getcomment(req.query.blogid,(error,results)=>{
                // console.log(results);
                if(error){
                    // res.redirect('/blogdetail?blogid='+req.query.blogid)
                }
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
            comment:results[1][0],
            total_comment:results[1][1][0],
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
        blogapi.blogsubmit(userid,title,content,type,imgurl,(error,results)=>{
            if(error){
                res.redirect('/?tab = all')
            }else{
           res.redirect('/?tab = all')
            }
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
            commentapi.commentsubmit(req.body.commentcontent,req.session.user.userid,req.body.blogid,(error,results)=>{
                if(error){
                    res.redirect('/blogdetail?blogid='+req.body.blogid)
                }
                else{
                res.redirect('/blogdetail?blogid='+req.body.blogid)
                }
            })
        }
        else{
            res.redirect('/login')
        }
    })

module.exports = router