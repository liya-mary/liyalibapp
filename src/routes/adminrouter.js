const express=require('express');
const adminrouter=express.Router();
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

const bookdata=require('../model/bookdata');
const authordata=require('../model/authordata');

function router(nav){
    adminrouter.get('/',function(req,res,role){
        res.render("addbook",{
            nav,
            title:'Library',
            role:req.session.role
        });
    });
    //addbook
    adminrouter.post('/add',upload.single('file'),function(req,res,role){
        //res.send("hey... i am added post");
        var imagefile=req.file.filename;
        console.log(imagefile);

        var item={
            Title:req.body.Title,
            Author:req.body.Author,
            Genre:req.body.Genre,
            Image:imagefile,
        }
        console.log(item);
        var book=bookdata(item);
        book.save();
        res.redirect('/books')
        .then(()=>{
            role:req.session.role
        })
       
    });
   
    
   
    return adminrouter;   
}
module.exports=router;

