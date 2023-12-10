const express=require("express");

const bodyParser=require("body-parser");

const mongoose=require("mongoose");

const blogpostArray=require("./data")

const app=express();

app.set('view engine','ejs');

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended: true}))

const Mongo_URL="mongodb+srv://bawabhausaheb956:Bawa2003@rcpit.ojjcdef.mongodb.net/";


mongoose.connect(Mongo_URL)
.then(()=>{
    console.log("Database Connected Successfully")
})
.catch((err)=>{
    console.log("ERROR OCCURED AT DB CONNECTION",err);
});

const blogSchema=new mongoose.Schema({
    title: String,
    imageURL: String,
    description:String
});

const Blog=new mongoose.model("blog",blogSchema);

app.get("/",(req,res)=>{
    Blog.find({})
    .then((arr)=>{
        res.render("index",{blogpostArray:arr});
        })
        .catch((err)=>{
            console.log("Cannot Find Blog");
            res.render("404");
        });
        
    res.render("index",{blogpostArray: blogpostArray})
    // blogpostArray.forEach((post)=>{
    //     res.render("index",{imageURL: post.imageURL, 
    //         title:post.title, 
    //         description:post.description})
    // })
});

app.get("/contact",(req,res)=>{
    res.render("contact")
});

app.get("/about",(req,res)=>{
    res.render("about")
});

app.get("/compose",(req,res)=>{
    res.render("compose")
});

app.post("/compose",(req,res)=>{

    const title=req.body.title;
    const image=req.body.imageURL;
    const description=req.body.description;

    const newBlog=new Blog({
        imageURL: image,
        title: title,
        description:description
    })

    newBlog.save()
    .then(()=>{
        console.log("Blog Posted Successfully")
    })
    .catch((err)=>{
        console.log("ERROR POSTED NEW BLOG");
    });
    

    res.redirect("/");
})

app.get("/post/:id",(req,res)=>{
    console.log(req.params.id);

    const id=req.params.id;
    let title="";
    let imageURL="";
    let description="";
    blogpostArray.forEach(post =>{
        if(post._id==id){
            title=post.title;
            imageURL=post.imageURL;
            description=post.description;
        }
    });

    const post={
        title:title,
        imageURL:imageURL,
        description:description
    }

    res.render("post",{post: post})
});

app.listen(3002, ()=>{
    console.log("Port runnig on 3000")
});


