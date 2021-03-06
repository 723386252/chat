const multer = require('multer')

let storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        if(req.url == '/submitportrait'){
            cb(null,'./public/imgs/portrait')
        }
        else{
          cb(new Error('路径错误'))
        }
    },
    filename:function(req,file,cb) {
        let time = new Date().getTime()
      filename = time + file.originalname
      cb(null,filename)

    }
})

function fileFilter (req ,file ,cb ){
    if((file.mimetype.indexOf('image/') ==0)){
      cb(null,true)
    }
    else{
      cb(null,false)
      cb(new Error('文件类型错误'))
    }
  }

let upload = multer({
    storage,
    fileFilter
})

module.exports = upload