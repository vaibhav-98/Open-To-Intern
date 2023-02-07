const express= require("express");
const {default:mongosee}=require("mongoose");
const app= express();
const route=require("./routes/route")

app.use(express.json());

mongosee.connect("mongodb+srv://shivanshsharma:76Xjx6fMmlcP51HZ@shivansh-p7.zwfahec.mongodb.net/group16Database",{useNewUrlParser: true})

.then( ()=>console.log("MongoDB is connected"))
.catch((err)=> console.log(err))


app.use("/",route)

// app.get("/",(req,res)=>{
// return res.send("hi, i'm here")

// })



app.listen(3000 ,()=>{

console.log(`server is running on port ${3000}`)

})