const express = require("express");
const bodyParser = ("body-parser");
var app = express();
app.set("view engine","ejs");
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));

const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/todo",{useNewUrlParser:true});
const trySchema = new mongoose.Schema({
    name:String
});
const item = mongoose.model("task",trySchema);
const todo = new item({
    name: "Create some videos"
});
const todo2 = new item({
    name: "Learn DSA"
});
const todo3 = new item({
    name: "Learn React"
});
const todo4 = new item({
    name: "Take some rest"
});
// todo.save();
// todo2.save();
// todo3.save();
// todo4.save();

// app.get("/",function(req,res){                ****************
//     item.find({},function(err,foundItems){
//         if(err){
//             console.log(err);
//         }
//         else{
//             res.render("list",{dayej:foundItems});
//         }
//     });
// });  *******************

app.get("/",async(req,res)=>{
    const allItems = await item.find();
    res.render("list",{dayej:allItems});
});

app.post("/",function(req,res){
    const itemName = req.body.ele1;
    const todo5 = new item({
        name:itemName
    });
    todo5.save();
    res.redirect("/");
});

// app.post("/delete",function(req,res){        *******************
//     const checked = req.body.checkbox1;
//     item.findByIdAndRemove(checked,function(err){
//         if(!err){
//             console.log("deleted");
//             res.redirect("/");
//         }
//     });
// });                    *********************

app.post("/delete",async(req,res)=>{
    const checked = req.body.checkbox1;
    await item.findByIdAndRemove(checked,{
        _id: req.get("id")
    })
    console.log("deleted");
    res.redirect("/");
});

app.listen("3000",function(){
    console.log("server is running");
});


