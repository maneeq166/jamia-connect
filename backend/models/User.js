const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique:true
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String
  },
  state:{ type: String, default: "" },
  department: { type: String, default: "" },
  year: { type: Number, default: "" },
  bio: { type: String, default: "" },
  avatar: { 
    url:{ type: String },
    public_id:String
  },
  links :{
    type:[String]
  },
isOAuth: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  googleId: {  
    type: String,
    unique: true,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
