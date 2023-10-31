const client=require("mongodb").MongoClient;
let dbinstance;

client.connect("mongodb://127.0.0.1:27017").then((server)=>{
    dbinstance=server.db("globe");
    console.log("Connected")

})
module.exports=dbinstance;
