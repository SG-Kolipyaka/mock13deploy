const mongoose =require("mongoose")


const BlogSchema=mongoose.Schema({
    title :{type:String,require:true},
    body :{type:String,require:true},
    content:{type:String,require:true},
    category :{type:String,require:true},
    date:{type:String,require:true},
    likes:{type:Number,require:true},
    comments: [{username:String, content:String}],
    userid:{type:String},
    username:{type:String}
},{
    versionKey:false
})





const BlogModel=mongoose.model("blog",BlogSchema)

module.exports={
   BlogModel
}



// {
//     "title" :"parag post 14",
// "body":"this is raw",
// "content":"srt",
// "category" :"enter",
// "date":"2022-5-4",
// "likes":20,
//    "comments" : [{"username" : "Jane", "content" : "Good One"}, {"username" : "Bob", "content" : "Loved It!"}]
// }