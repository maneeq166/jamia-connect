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
    type: String,
    required: true,
  },
  state:{ type: String, default: "" },
  department: { type: String, default: "" },
  year: { type: Number, default: "" },
  bio: { type: String, default: "" },
  avatar: { 
    url:String,
    public_id:String
  },
  links :{
    type:[String]
  },

  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model("users", userSchema);

module.exports = User;
