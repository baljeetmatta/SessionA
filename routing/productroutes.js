const express = require("express");
const router = express.Router();
const client = require("mongodb").MongoClient;
const ObjectId=require("mongodb").ObjectId;
//const db=require("../src/connect")
let dbinstance;
client.connect("mongodb://127.0.0.1:27017").then((server) => {
    dbinstance = server.db("globe");
    console.log("Connected")

})

router.get("/", (req, res) => {
    dbinstance.collection("products").find({}).toArray().then((data) => {
        res.render("products/ShowAll", { data: data });

    })
})
router.get("/create", (req, res) => {

    res.render("products/Create");

})
router.post("/create", (req, res) => {
    let obj = {};
    //obj.name=req.body.name;
    //obj.price=req.body.price;
    //obj.description=req.body.description;
    obj = req.body;
    dbinstance.collection("products").insertOne(obj).then((data)=>{
        res.redirect("/products");

    })


})
router.get("/:id",(req,res)=>{
  //  console.log(req.params.id);
    //res.end();
    dbinstance.collection("products").find({'_id':new ObjectId(req.params.id)}).toArray().then((data)=>{
        res.render("products/Show",{data:data});

    })
})
module.exports = router;