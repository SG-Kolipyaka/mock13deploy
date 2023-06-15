const {auth}=require("../Middlewar/auth")
const {Router}=require("express")
const {BlogModel}=require("../Models/blog.model")



const blogrouter=Router()

blogrouter.post("/add",auth,async(req,res)=>{
    const {userid,username}=req.body
    try{

    const post=new BlogModel(req.body)
    await post.save()
    res.status(200).send({"msg":"Post Made Successfully","post":req.body})

    }catch(er){
        res.status(400).send({"msg":er.message})
    }
})


blogrouter.get("/",auth,async(req,res)=>{
    let {page,limit,category,sort,order,title}=req.query

    let skip;
    let filter={}
    let sorted={}
    if(page && limit)
{
 skip=((page-1)*limit);
}else{
 page=1;
 limit=100;
 skip=0;
}

if(sort && order){
    if(order=="asc")
{
    sorted={[sort]:1}
}else{
    sorted={[sort]:-1}
}
}


if(category){
    filter={category:category}
}

    try{
        const blog=await BlogModel.find(filter).sort(sorted).skip(skip).limit(limit)
       if(title){
let searched=blog.filter((el,ind)=>{
    return (el.title.toLowerCase().includes(title.toLowerCase()))
})
res.send({"data":searched})
       }else{
        res.send({"data":blog})
       }

    }catch(er){
        res.status(400).send({"msg":er.message})
    }
})


blogrouter.patch("/update/:id",auth,async(req,res)=>{
    const {id}=req.params
    const {userid,username}=req.body
    const blog=await BlogModel.findOne({_id:id})
    try{
        if(userid!==blog.userid){
            res.send({"msg":"You are Not authorized to do IT"})
        }else{
            await BlogModel.findByIdAndUpdate({_id:id},req.body)
            res.status(200).send("Data Updated Successfully")
        }

    }catch(er){
        res.status(200).send("Something went wrong")
    }
})



blogrouter.delete("/delete/:id",auth,async(req,res)=>{
    const {id}=req.params
    const {userid,username}=req.body
    const blog=await BlogModel.findOne({_id:id})
    try{
        if(userid!==blog.userid){
            res.send({"msg":"You are Not authorized to do IT"})
        }else{
            await BlogModel.findByIdAndDelete({_id:id})
            res.status(200).send("Data Deleted Successfully")
        }

    }catch(er){
        res.status(200).send("Something went wrong")
    }
})




blogrouter.patch("/update/:id/like",auth,async(req,res)=>{
    const {id}=req.params
    // const {userid,username}=req.body
    // const blog=await BlogModel.findOne({_id:id})
    try{
      
            await BlogModel.findByIdAndUpdate({_id:id},{likes:req.body.likes})
            res.status(200).send("Liked The Post")
      

    }catch(er){
        res.status(200).send("Something went wrong")
    }
})




blogrouter.patch("/update/:id/comment",auth,async(req,res)=>{
    const {id}=req.params
    const {userid,username,content}=req.body
    const blog=await BlogModel.findOne({_id:id})
    try{
       
      let obj={
        username:username,
        content:content
      }
      
            await BlogModel.findByIdAndUpdate({_id:id},{comments:obj})
            res.status(200).send("Commented The Post")
   

    }catch(er){
        res.status(200).send("Something went wrong")
    }
})

module.exports={
    blogrouter
}
