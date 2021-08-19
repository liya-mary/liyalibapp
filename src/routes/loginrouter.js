const express =require('express');
const signupdata = require('../model/signupdata');
const loginrouter=express.Router();
//const bookdata=require('../model/bookdata');
function router(nav){
  
    loginrouter.get('/',function(req,res,role){
        res.render("login",{
            nav,
            title:'Library',
            role
        });
    });
    
    loginrouter.post('/success',function(req,res,next){
        var query = {email: req.body.loginemail, password: req.body.password}
        var output=signupdata.findOne(query,function(err, user){
            if(err) throw new Error(err);
                if(!user){ 
                    //res.send('Invalid login credentials')
                    console.log('Not found');
                    res.redirect('/login')
                }
                else {
                    console.log('Found!');
                    req.session.role="user";
                    res.render("index",{
                        nav,
                        title:'Library',
                        role:req.session.role
                    
                    });

                }
        });

           if(req.body.loginemail === 'admin@gmail.com' && req.body.password==='12345'){
            
            req.session.role='admin'
             return res.redirect('/');
            /*res.render("index",{
                nav,
                title:'Library',
                role:req.session.role
            });*/
        }
        
           // var sess=req.session;
            //res.send("hello guys");
            
    });
  

  return loginrouter;  
}

module.exports=router;