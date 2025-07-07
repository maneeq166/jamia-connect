import mongoose from "mongoose";

const pyq = new mongoose.Schema({
    department:{
        type:String,
        required:true,
    },
    subject:{
        type:String,
        required:true
    },
    year:{
        type:Number,
        required:true
    },
    username: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    content:String
},{timestamps:true})

const Pyq = mongoose.model("pyq",pyq);

module.exports = {
    Pyq
}