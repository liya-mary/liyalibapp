const express=require('express');
const admin1router=express.Router();
const authordata=require('../model/authordata');
//multer
const multer=require('multer');
const path=require('path');
//define storage for images
const storage=multer.diskStorage({
    //destination for files
    destination:function(request,file,callback){
        callback(null,'./public/uploads');
    },
    //add back the extension
    filename:function(req,file,callback){
        callback(null,Date.now()+path.extname(file.originalname));
    }
});
//uploading parameters for multer
const upload=multer({
    storage:storage,
    limits:{
        fieldSize:1024*1024*3
    }
});

//const bookdata=require('../model/bookdata');


function router(nav){
    admin1router.get('/',function(req,res,role){
        res.render("addauthor",{
            nav,
            title:'Library',
            role:req.session.role
        });
    });
    //addbook
    admin1router.post('/add1',upload.single('file'),function(req,res,role){
        //res.send("hey... i am added post");
        var imagefile=req.file.filename;
        console.log(imagefile);

        var items1={
            authorname:req.body.authorname,
            period:req.body.period,
            awards:req.body.awards,
            works:req.body.works,
            about:req.body.about,
            authorimg:imagefile,
        }
        console.log(items1);
        var author=authordata(items1);
        author.save();
        res.redirect('/authors')
        .then(()=>{
            role:req.session.role
        });
    });
   
    return admin1router;   
}
module.exports=router;

