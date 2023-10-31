const express=require("express");
const router=express.Router();
const path=require("path");

router.get("/dashboard",(req,res)=>{
res.render("dashboard",{username:req.session.username,name:req.session.name});
   // res.sendFile(path.join(__dirname,"../public/dashboard.html"));
})
router.get("/profile",(req,res)=>{

    res.send("Profile page");
})
router.get("/mypage",(req,res)=>{
    res.send("My PAge");
})
router.get("/logout",(req,res)=>{
    req.session.destroy();
    res.redirect("/");

})
module.exports=router;
