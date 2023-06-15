const express=require("express")
require('dotenv').config()
const cors =require("cors")
const {connection}=require("./db")
// const {auth}=require("./Middlewar/auth")
const {userRouter}=require("./Routes/user.route")
 const {blogrouter}=require("./Routes/blogs.route")




const app=express()


app.use(express.json()) // inbuild middleware
app.use(cors())   //community Middelware


app.use("/api",userRouter)

app.get("/",(req,res)=>{
    res.send("HOME ROUTE")
})

app.use("/api/blogs",blogrouter)



app.listen(process.env.PORT,async()=>{
    try{
await connection
console.log("Connected to DB")
    }catch(er){
console.log(er)
    }
console.log(`server is running at ${process.env.PORT}`)
})