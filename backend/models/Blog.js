const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema({
    title:{type:String,required:true,unique:true},
    content:{type:String,required:true},
    username:{type:String,required:true,ref:"User"},
    email:{type:String,required:true},
    image:{
        public_url:String,
        url:String
    }

})

const Blog = mongoose.model("Blog",BlogSchema);

module.exports = {Blog}