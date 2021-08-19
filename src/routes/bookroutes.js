const express =require('express');
const booksRouter=express.Router();
const bookdata=require('../model/bookdata');
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

function router(nav){
   /* var books=[
        {
            title:'Wings of Fire',
            author:'APJ Abdul Kalam',
            genre:'Autobiography',
            about:'Wings of Fire is an autography of APJ Abdul Kalam covering his early life and his work in Indian space research and missile programs. It is the story of a boy from a humble background who went on to become a key player in Indian space research/Indian missile programs and later became the president of India. It was very engaging initially, but tended to drag a bit towards the end with lot of technical details and procedural information of his space research and missile projects.',
            img:"/images/fire.jpg"
        },
        {
            title:'Harry Potter',
            author:'J K Rowling',
            genre:'Fantasy',
            about:"Harry Potter, fictional character, a boy wizard created by British author J.K. Rowling. His coming-of-age exploits were the subject of seven enormously popular novels (1997–2007), which were adapted into eight films (2001–11); a play and a book of its script appeared in 2016.",
            img:"/images/hp.jpg"
        },
        {
            title:'The Vampire Diaries',
            author:'L. J. Smith',
            genre:'Fiction',
            about:"The Vampire Diaries is a young adult vampire fiction series of novels created by American author L. J. Smith. The story centers around Elena Gilbert, a young high school girl who finds her heart eventually torn between two vampire brothers, Stefan and Damon Salvatore.",
            img:"/images/tvd.jpg"
        },
        {
            title:'The Famous Five',
            author:'Enid Blyton',
            genre:'Adventure',
            about:"The Famous Five is a series of children's adventure novels and short stories written by English author Enid Blyton. The first book, Five on a Treasure Island, was published in 1942. The novels feature the adventures of a group of young children – Julian, Dick, Anne and Georgina ",
            img:"/images/ff.jpg"
        },
        {
            title:'The Queen Of Hearts',
            author:'Kimmery Martin',
            genre:'Novel',
            about:"Named a Most Anticipated Book of 2018 by Southern Living, Elite Daily, and Writer's Digest. A debut novel set against a background of hospital rounds and life-or-death decisions that pulses with humor and empathy and explores the heart's capacity for forgiveness.",
            img:"/images/queen.jpg"
        },
        {
            title:'The Alchemist',
            author:'Paulo Coelho',
            genre:'Quest',
            about:"The Alchemist, An allegorical novel, The Alchemist follows a young Andalusian shepherd in his journey to the pyramids of Egypt, after having a recurring dream of finding a treasure there.",
            img:"/images/alchemist.jpg"
        },
        {
            title:'Anna Karenina',
            author:'Leo Tolstoy',
            genre:'Realist Novel',
            about:'In Anna Karenina, Tolstoy subtly describes the stories of mirth and miseries in families in medieval Russia. With Anna Karenina, Tolstoy robustly portrays characters of Anna, Karenin, Vronsky, Oblonsky, Dolly, Kitty, Levin, Prince and Princess Scherbatsky',
            img:"/images/ak.jpg"
        },
        {
            title:'The Adventures of Huckleberry Finn',
            author:'Mark Twain',
            genre:'Adventure',
            about:"The Adventures of Huckleberry Finn (1885) called the first great American novel by some, is a story of a boy's adventures in the Mississippi Valley. a work of immeasurable richness and complexity, it remains an incomparable adventure story and a classic of American humor, more than a century after its publication.",
            img:"/images/huckle.jpg"
        },
        {
            title:'Pride and Prejudice',
            author:'Jane Austen',
            genre:'Novel',
            about:"Pride and Prejudice follows the turbulent relationship between Elizabeth Bennet, the daughter of a country gentleman, and Fitzwilliam Darcy, a rich aristocratic landowner. They must overcome the titular sins of pride and prejudice in order to fall in love and marry.",
            img:"/images/pp.jpg"
        },
        {
            title:'Tom And Jerry',
            author:'Joseph Barbera',
            genre:'Cartoon',
            about:"Tom and Jerry is an American cartoon series about a hapless cat's never-ending pursuit of a clever mouse. Tom is the scheming cat, and Jerry is the spunky mouse.",
            img:"/images/tj.jpg"
        } 
    ]*/
    
    booksRouter.get('/',function(req,res,role){
        //console.log(role);
        bookdata.find()
        .then(function(books){
            res.render("books",{
                nav,
                title:'Library',
                books,
                role:req.session.role
            });
       });
    });
    booksRouter.get('/:id',function(req,res,role){
        const id=req.params.id;
        bookdata.findOne({_id:id})
        .then(function(book){
            res.render("book",{
                nav,
                title:'Library',
                book,
                role:req.session.role
            });
        })
    });
    
    booksRouter.post('/delete',(req,res)=>{
        let id=req.body.id
        console.log(id);
        bookdata.findOneAndRemove(id)
        .then(function(){
            console.log("book deleted");
            res.redirect('/books');
        })
        .catch((err)=>{
            console.log("book deleted",err);
        })
    })
   /* booksRouter.post('/update', auth, async (req, res) => {
        try {
            const id = req.body.id;
            user.firstname = req.body.firstname; // this is just a sample, you may need to change it
      
            await user.save();
            res.redirect('/profile')
        } catch (err) {
            res.status(500).send(err)
        }
      })*/
    /*booksRouter.get('/update',(req,res)=>{
        const id=req.query.id
        bookdata.findById({_id:id})
        .then((books)=>{
            console.log(books);
            res.render("/books/updatebook/${_id}",{
                books:books
            })
        })  
    })*/
    booksRouter.post('/:id/update',(req,res,role)=>{
        const id=req.body.id
        bookdata.findOne({id:id})
        .then((book)=>{
            console.log(book)
            res.render("updatebook",{
                nav,
                title:'Library',
                role:req.session.role,
                book:book
            })
        })    
    })
    //updating book
    booksRouter.post('/:id/update/updatebook',upload.single('file'),(req,res,role)=>{
        const id=req.body.id
        var imagefile=req.file.filename
            var item={
                Title:req.body.Title,
                Author:req.body.Author,
                Genre:req.body.Genre,
                Image:imagefile,
            }
            let updatebook={$set:item};
            //bookdata.save
            bookdata.updateOne({id},updatebook)
            
            .then(function(){
                console.log(updatebook);
                 res.redirect('/books');
            }) 
        })
       
  return booksRouter;  
}

module.exports=router;