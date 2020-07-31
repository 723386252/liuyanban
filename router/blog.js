const express = require('express')
const router = express.Router()

router.get('/blogdetail',(req,res)=>{
    res.render('blogdetail.html')
})


module.exports = router