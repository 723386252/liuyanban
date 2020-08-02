const multer =require('multer')
function fileFilter (req ,file ,cb ){
  if((req.url ==='/registersubmit' || req.url === '/blogsubmit') && file.mimetype.indexOf('image/')===0){
    cb(null,true)
  }
  else{
    cb(null,false)
    cb(new Error('文件类型错误'))
  }
}

let storage = multer.diskStorage({
    destination:(req,file,cb)=>{
      console.log(file);
      if(req.url ==='/registersubmit'){
        cb(null,'./assets/imgs/potrait')
      }
      else if(req.url === '/blogsubmit'){
        cb(null,'./assets/imgs/blogimgs')
      }
      else{
        cb(new Error('路径错误'))
      }
    },
    filename:(req,file,cb)=>{
      let time = new Date().getTime()
      filename = time + file.originalname
      cb(null,filename)
    }

  
  })
  let upload = multer({
    storage,
    fileFilter
  })

  module.exports=upload