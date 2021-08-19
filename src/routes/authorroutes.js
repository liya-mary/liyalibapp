const express =require('express');
const authorRouter=express.Router();
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
function router(nav){
   /* var authors=[
        {
            name:'APJ Abdul Kalam',
            period:'October 15, 1931 - July 27, 2015' ,
            works:'The Wings of Fire, India 2020, Ignited Minds, Indomitable Spirit, Transcendence: My Spiritual Experiences with Pramukh Swamiji',
            awards:' Padma Bhushan, Padma Vibhushan  and the highest civilian honor Bharat Ratna.',
            about:'Indian scientist and politician who played a leading role in the development of India’s missile and nuclear weapons programs. He was president of India from 2002 to 2007.Kalam wrote several books, including an autobiography, Wings of Fire (1999). Among his numerous awards were two of the country’s highest honours, the Padma Vibhushan (1990) and the Bharat Ratna (1997).',
            img:"/images/abdulkalam.jpg"
        },
        {
            name:'J K Rowling',
            period:'July 31,1965 - present' ,
            works:"The Cuckoo's Calling (2013), The Silkworm (2014), Career of Evil (2015) Lethal White (2018)",
            awards:" Scottish Arts Council Grant, British Book Award and Gold Winner",
            about:'J.K. Rowling, in full Joanne Kathleen Rowling, pen name of Joanne Rowling, (born July 31, 1965, Yate, near Bristol, England), British author, creator of the popular and critically acclaimed Harry Potter series, about a young sorcerer in training.The Harry Potter series sparked great enthusiasm among children and was credited with generating a new interest in reading. Film versions of the books were released in 2001–11 and became some of the top-grossing movies in the world.',
            img:"/images/jk.jpg"
        },
        {
            name:'L J Smith',
            period:'September 4,1987 - present',
            works:' The Secret Circle (1992), The Forbidden Game (1994) and Dark Visions (1995)',
            awards:"Teen Choice Awards, 27 People's Choice Awards, and eight Saturn Awards.",
            about:"Lisa Jane Smith, known under the pen name L. J. Smith, is an American author currently living in California. Her books are young-adult literature and combine a myriad of genres including horror, science fiction, fantasy and romance. known professionally as L. J. Smith, is an American author of young-adult literature.",
            img:"/images/lj.jpg"
        },
        {
            name:'Enid Blyton',
            period:" August 11, 1897 - November 28, 1968,",
            works:'Malory Towers, The Famous Five, The Secret Seven and Noddy',
            awards:'Blue Peter Book Award.',
            about:"Enid Mary Blyton was an English children's writer whose books have been among the world's best-sellers since the 1930s, selling more than 600 million copies. Blyton's books are still enormously popular, and have been translated into 90 languages. As of June 2018, Blyton is in the 4th place for the most translated author. She wrote on a wide range of topics including education, natural history, fantasy, mystery, and biblical narratives.",
            img:"/images/enid.jpg"
        },
        {
            title:'The Queen Of Hearts',
            author:'Kimmery Martin',
            name:'Kimmery Martin',
            period:'April 13 1988 - present',
            works:"The Harvard Crimson, Southern Living, The Charlotte Observer and The New York Times.",
            awards:'Best Fiction for Young Adults.',
            about:"Kimmery Martin is an emergency medicine doctor-turned novelist whose works of medical fiction have been praised by The Harvard Crimson, Southern Living, The Charlotte Observer and The New York Times, among others. ",
            img:"/images/kim.jpg"
        },
        {
            name:'Paulo Coelho',
            period:'August 24 1974 - present',
            works:'Eleven Minutes (Onze Minutos, 2003), The Zahir (O Zahir, 2005), The Witch of Portobello (A Bruxa de Portobello, 2006) ',
            awards:'Honorary Award, Literature Award in 2010',
            about:'Paulo Coelho, Brazilian novelist known for employing rich symbolism in his depictions of the often spiritually motivated journeys taken by his characters.',
            img:"/images/pc.jpg"
        },
        {
            name:'Leo Tolstoy',
            period:'September 9, 1828 - November 20, 1910',
            works:" War and Peace (1865–69), Anna Karenina (1875–77) and The Death of Ivan Ilyich (1886) ",
            awards:'Received nominations for the Nobel Prize in Literature every year from 1902 to 1906 ',
            about:'Leo Tolstoy, Russian author, a master of realistic fiction and one of the world’s greatest novelists. Tolstoy is best known for his two longest works, War and Peace and Anna Karenina which are commonly regarded as among the finest novels ever written.',
            img:"/images/leo.jpg"
        },
        {
            name:'Mark Twain',
            period:'November 30, 1835 – April 21, 1910',
            works:'The Adventures of Tom Sawyer, Adventures of Huckleberry Finn.',
            awards:'honorary doctorate from Yale University in 1901 and Oxford University in 1907',
            about:'Mark Twain, pseudonym of Samuel Langhorne Clemens, American humorist, journalist, lecturer, and novelist who acquired international fame for his travel narratives, especially The Innocents Abroad, Roughing It, and Life on the Mississippi',
            img:"/images/mark.jpg"
        },
        {
            name:'Jane Austen',
            period:'December 16, 1775 - July 18, 1817',
            works:" Sense and Sensibility, Pride and Prejudice, Mansfield Park, Persuasion and Northanger Abbey ",
            awards:' USC Scripter Award [Winner]',
            about:'Jane Austen,English writer who first gave the novel its distinctly modern character through her treatment of ordinary people in everyday life. Her novels defined the era’s novel of manners, but they also became timeless classics that remained critical and popular successes for over two centuries after her death.',
            img:"/images/jane.jpg"
        },
        {
            name:'Joseph Barbera',
            period:'March 24, 1911 – December 18, 2006',
            works:'Yankee Doodle Mouse (1943), The Cat Concerto (1946), and Johann Mouse',
            awards:" Primetime Emmy [Nominee] (1994), Primetime Emmy [Nominee], Governor's Award. ",
            about:'Joseph Roland Barbera was an American animator, film director, and television producer. He was the co-founder of the company Hanna-Barbera, with his longtime partner William Hanna. Barbera was born in an Italian-American family.',
            img:"/images/jbarbera.jpg"
        } 
    ]
    */
    
    authorRouter.get('/',function(req,res,role){
        authordata.find()
        .then(function(authors){
            res.render("authors",{
                nav,
                title:'Library',
                authors,
                role:req.session.role
            });
        });
    });
    authorRouter.get('/:id',function(req,res,role){
        const id=req.params.id;
        authordata.findOne({_id:id})
        .then(function(author){
            res.render("author",{
                nav,
                title:'Library',
                author,
                role:req.session.role
            });
        });    
    });
    authorRouter.post('/delete',(req,res)=>{
        let id=req.body.id
        console.log(id);
        authordata.findOneAndRemove(id)
        .then(function(){
            console.log("author deleted");
            res.redirect('/authors');
        })
        .catch((err)=>{
            console.log("author deleted",err);
        })
    });
    authorRouter.post('/:id/update',(req,res,role)=>{
        const id=req.body.id
        authordata.findOne({id:id})
        .then((author)=>{
            console.log(author)
            res.render("updateauthor",{
                nav,
                title:'Library',
                role:req.session.role,
                author:author
            })
        })    
    })
    //updating author
    authorRouter.post('/:id/update/updateauthor',upload.single('file'),(req,res,role)=>{
        const id=req.body.id
        var imagefile=req.file.filename
            var item={
                authorname:req.body.authorname,
                period:req.body.period,
                works:req.body.works,
                awards:req.body.awards,
                about:req.body.about,
                authorimg:imagefile
            }
            let updateauthor={$set:item};
            //bookdata.save
            authordata.updateOne({id},updateauthor)
            
            .then(function(){
                console.log(updateauthor);
                 res.redirect('/authors');
            }) 
        })
  return authorRouter;  
}

module.exports=router;