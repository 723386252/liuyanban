const express = require('express')
const router = express.Router()
const upload = require('../utils/multer')
const blogapi = require('../api/blogapi')
const commentapi = require('../api/comment')
const collectapi =require('../api/collectapi')

router.get('/blogdetail',(req,res)=>{
        new Promise((resolve,reject)=>{
            blogapi.getblogdetail(req.query.blogid,(error,blogdetail,imgs)=>{
                if(error){
                    reject(error)
                }
                resolve({blogdetail,imgs})
                
            })
        }).then(results=>{
            // console.log(results);
        blogapi.addblogview(results.blogdetail[0].blogid,results.blogdetail[0].view+1,(error,results)=>{
            return
        })
        let user = null
        if(typeof(req.session.user) !== "undefined" && req.session.user !== null){
        user = req.session.user
        collectapi.iscollect(results.blogdetail[0].blogid,req.session.user.userid,(error_1,results_1)=>{
            if(!error_1){
                let iscollect = false
                if(results_1.length !== 0 && results_1[0].iscollect === 1){
                   iscollect = true
                }
                    res.render('blogdetail.html',{
                        blogdetail:results.blogdetail[0],
                        imgs:results.imgs,
                        user,
                        iscollect
                })
            }
        })
        }
        else{
        res.render('blogdetail.html',{
            blogdetail:results.blogdetail[0],
            imgs:results.imgs[0],
            user,
            iscollect:false
            })
        }
    }
    ).catch(reject=>{
        console.log(reject);
        res.redirect('/?tab=all')
    })
})


router.post('/blogsubmit',upload.array('imgs'),(req,res)=>{
    if(typeof(req.session.user) !== "undefined" && req.session.user.userid){
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
        if(typeof(req.session.user) !== "undefined" && req.session.user.userid){
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
    }),
router.get('/commentdelete',(req,res)=>{
    if(typeof(req.session.user) !== "undefined" && req.session.user.userid){
        commentapi.deletecomment(req.query.commentid,req,(error,results)=>{
            if(error){
                res.send({success:0,error_code:101})
            }
            else{
                res.send({success:1,error_code:0})
            }
        })
    }else{
        res.send({success:0,error_code:100})
    }
        
})


module.exports = router