const express=require("express");
const router=express.Router();
router.get("/allProducts",(req,res)=>{
    res.send("Admin all Produicts");

})
module.exports=router;
