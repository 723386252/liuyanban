const express = require('express')
const router = express.Router()
const collectapi =require('../api/collectapi')

router.get('/iscollect',(req,res)=>{
    // console.log(req.session);
    if(typeof(req.session.user) !== "undefined" && req.session.user !== null){
    collectapi.iscollect(req.query.blogid,req.session.user.userid,(error,results)=>{
        if(error){
            res.send({
                success:0,
                error_code:103
            })
        }
        else{
            if(results.length === 0){
                res.send({
                    success:1,
                    error_code:0,
                    iscollect:false
                })
            }
            else{
                res.send({
                    success:1,
                    error_code:0,
                    iscollect:true
                })
            }
        }
    })
    }
    else{
        res.send({
            success:0,
            error_code:104
        })
    }
})
router.get('/addcollect',(req,res)=>{
    if(typeof(req.session.user) !== "undefined" && req.session.user !== null){
        collectapi.addcollect(req.query.blogid,req.session.user.userid,(error,results)=>{
            if(error){
                res.send({
                    success:0,
                    error_code:103
                })
            }
            else{
                if(results.length === 0){
                    res.send({
                        success:0,
                        error_code:105
                    })
                }
                else{
                    res.send({
                        success:1,
                        error_code:0
                    })
                }
            }
        })
    }
    else{
        res.send({
            success:0,
            error_code:104
        })
    }
})

module.exports = router