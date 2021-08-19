const express =require('express');
const app=new express();
//session
const session=require('express-session');
const bodyParser = require('body-parser');  
const signupdata = require('./src/model/signupdata');

const port=process.env.PORT || 3000;
const nav=[
    {link:'/books',name:'Books'},
    {link:'/authors',name:'Authors'},
    {link:'/admin',name:'Add Book'},
    {link:'/admin1',name:'Add Author'},
    {link:'/signup',name:'Sign Up'},
    {link:'/login',name:'LogIn'}
];//created before passing to any router
const booksRouter=require('./src/routes/bookroutes')(nav) //nav is passed
const authorRouter=require('./src/routes/authorroutes')(nav)
const adminrouter=require('./src/routes/adminrouter')(nav)
const admin1router=require('./src/routes/admin1router')(nav)
const signupdatas=require('./src/model/signupdata');
const loginrouter=require('./src/routes/loginrouter')(nav)
//session
app.use(session({secret: 'key',cookie:{maxAge:600000}, saveUninitialized: false,resave: false}));
//app.use(bodyParser.json());  

app.use(express.urlencoded({extended:true}));
app.use(express.static('./public'));
app.set('view engine','ejs');
app.set('views','./src/views');
app.use('/books',booksRouter);
app.use('/authors',authorRouter);
app.use('/admin',adminrouter);
app.use('/admin1',admin1router);
app.use('/login',loginrouter);


app.get('/',function(req,res,role){
    //let user=req.session.user;
    res.render("index",{
        nav,
        title:'Library',
        role:req.session.role
    });
});


/*app.get('/addauthor/',function(req,res,role){
    res.render("authors",{
        nav,
        title:'Library',
        role:req.session.role
    });
});*/

app.get('/signup',function(req,res,role){
    res.render("signup",{
        nav,
        title:'Library',
        role:req.session.role
    });
});
//session

app.post('/addata',function(req,res){
    var items={
        username:req.body.username,
        email:req.body.email,
        password:req.body.password,
        repeatpassword:req.body.repeatpassword
    }
    console.log(items);
    var signup=signupdatas(items);
    signup.save();
    res.redirect('/login');
})
//logout
app.get('/logout',(req, res) => {
    req.session.destroy(err => {
    if (err) {
    return console.log(err);
    }
    res.redirect('/');
    });
    });

app.listen(port,()=>{console.log("server ready at"+ port)});
