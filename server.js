const express=require("express");
const app=express();
const fs=require("fs");
app.use(express.urlencoded());
app.use(express.static("public"));
const path=require("path");

const cookieparser=require("cookie-parser");
const session=require("express-session");
app.use(cookieparser());
const oneday=1000*60*60*24;
app.use(session({

    saveUninitialized:true,
    resave:false,
    secret:'as#$@&dfd$$',
    cookie:{maxAge:oneday}
}));
const userroutes=require("./routing/userroutes");
app.use("/users",test,userroutes);
app.set("view engine","ejs");
//app.set("views","")
const adminroutes=require("./routing/adminroutes");
app.use("/admin",testadmin,adminroutes);
const dbinstance=require("./src/connect");

function test(req,res,next)
{
    if(req.session.username)
    next();
    else
    res.redirect("/");
}
const productRoutes=require("./routing/productroutes");
app.use("/products",productRoutes);

function testadmin(req,res,next)
{
    if(req.session.username && req.session.role=="admin")
    next();
    else
    res.redirect("/");
}
// app.get("/dashboard",(req,res)=>{
//     if(req.session.username)
//     res.sendFile(path.join(__dirname,"./public/dashboard.html"));
//     else
//     res.redirect("/");


// })
// app.get("/profile",(req,res)=>{
//     if(req.session.username)
//     res.send("Profile");
//     else
//     res.redirect("/");


// })

// app.get("/mypage",(req,res)=>{
//     if(req.session.username)
//     res.send("My PAge");
//     else
//     res.redirect("/");


// })
// app.get("/logout",(req,res)=>{
//     req.session.destroy();
//     res.redirect("/");

// })
app.post("/login",(req,res)=>{
    dbinstance.collection("users").find({$and:[{'username':req.body.username},{'password':req.body.password}]}).toArray().then((data)=>{

        if(data.length==0)
        res.render("login",{msg:"Invalid user/pasword"});
    else
    {
        req.session.username=req.body.username;
            req.session.role=results[0].role;
            req.session.name=results[0].Name;
        
          res.redirect("/users/dashboard");
    }
    })
});


//     // console.log(req.body);
//     fs.readFile("users.txt","utf-8",(err,data)=>{
//      let records=JSON.parse(data);
 
//     let results= records.filter((item)=>{
//      if(item.username==req.body.username && item.password==req.body.password)
//      return true;
 
//      });
 
//      if(results.length==0)
//      //res.send("Invalid user/password");
//     {
//         //req.session.message="Invalid user/password"
//         //res.redirect("/login")
//         res.render("login",{msg:"Invalid user/pasword"});

    
//     }
//  else
//  {
//     req.session.username=req.body.username;
//     req.session.role=results[0].role;
//     req.session.name=results[0].Name;

//  res.redirect("/users/dashboard");
//  }
//  //res.send("Welcome "+req.body.username);
 
 
 
    

 app.get("/login",(req,res)=>{
    //res.render("login",{msg:req.session.message});
    res.render("login",{msg:""});

 })

 app.get("/",(req,res)=>{

    dbinstance.collection("products").find({}).toArray().then((data)=>{
        res.render("index",{products:data});
    })
    // fs.readFile("products.json","utf-8",(err,data)=>{
        
    //     res.render("index",{products:JSON.parse(data)});

    // });
    

 })
 app.get("/productdetails/:data",(req,res)=>{

    dbinstance.collection("products").find({id:req.params.data}).toArray().then((data)=>{
        res.render("productdetails",{products:data});
    })
    //console.log(req.params.data);
    //res.end();
    // fs.readFile("products.json","utf-8",(err,data)=>{

    //     let products=JSON.parse(data);
    //     let results=products.filter((item)=>{
    //         if(item.id==req.params.data)
    //         return true;
    //     })
    //     res.render("productdetails",{products:results});

    // })



 })
app.listen(3000,(e)=>{
console.log("Server Started");

});