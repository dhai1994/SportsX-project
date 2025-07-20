import multer from "multer"

const storage =multer.diskStorage({
destination:function(req,res,cb){
  cb(null,path.join(process.cwd(),"/public/temp"));

},
filename:function(req,res,cb){
  cb(null,this.filename.orginalname)
}
})


export const uploadvideo =multer 