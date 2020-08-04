const commentapi = require('../api/comment')
const express = require('express')
const router = express.Router()

router.get('/getcomment',(req,res)=>{
    let user = null
    if(typeof(req.session.user) !== "undefined" && req.session.user !== null){
        user = req.session.user
    }

    commentapi.getcomment(req.query.blogid,req.query.page,(error,results)=>{
        if(error){
            res.send({
                success:0,
                error_code:103
            })
        }
        else{
            results[0].forEach(item=>{
                if(user !== null && item.userid == user.userid){
                    item.showdelete = true
                }
                else{
                    item.showdelete = false
                }
            })
            res.send({
                success:1,
                error_code:0,
                results
            })
        }
    })
})
module.exports = router