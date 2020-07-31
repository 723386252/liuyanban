const multer =require('multer')


let storage = multer.diskStorage({
    destination:(req,file,cb)=>{
      console.log(req.url);
      console.log('****');
      if(req.url ==='/registersubmit'){
        cb(null,'./assets/imgs/potrait')
      }
      else if(req.url === '/blogsubmit'){
        cb(null,'./assets/imgs/blogimgs')
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