const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema({
    content:{type:String,required:true},
    username:{type:mongoose.Schema.Types.ObjectId,required:true,ref:"User"},
    email:{type:String,required:true},
    image:{
        public_url:String,
        url:String
    }

})

export const Blog = mongoose.model("Blog",BlogSchema);