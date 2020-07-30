const multer =require('multer')


let storage = multer.diskStorage({
    destination:(req,file,cb)=>{
      if(req.url='/reqgisterapi'){
        cb(null,'./assets/imgs/potrait')
      }
    },
    filename:(req,file,cb)=>{
      let time = new Date().getTime()
      filename = time + file.originalname
      cb(null,filename)
    }
  
  })
  let upload = multer({
    storage:storage
  })

  module.exports=upload