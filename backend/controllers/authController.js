const User = require("../models/User");
const {z} = require('zod');
const bcrpyt = require("bcrypt");
const jwt = require("jsonwebtoken")

const userSignup =  async (req,res) =>{
    
    try {
        const requiredBody = z.object({
        username:z.string().min(3).max(15),
        email:z.string().email(),
        password:z.string()
    })

    const safeParse = requiredBody.safeParse(req.body);

    if (!safeParse.success) {
      return res.json({
        message: "incorrect format",
        error: safeParse.error,
      });
    }

    const {username,email,password} = req.body;

    if(!username||!email||!password){
        return res.status(400).json({message:"Input field cannot be empty"})
    }

    const userExists = await User.findOne({email});

    if(userExists){
        return res.status(400).json({message:"User already exists"})
    }

    const hashedpassword = await bcrpyt.hash(password,10);

    if(!hashedpassword){
        return res.status(400).json({
            message:"Wrong password"
        })
    }

    const user = await User.create({
        username,
        email,
        password:hashedpassword
    })

    res.json({user})

    } catch (error) {
        res.status(500).json({
            message:"Internal Server error"
        })
        console.log(error);
        
    }

}

const userSignin = async (req,res) =>{
    try {
        
    const {email,password} = req.body;

    if(!email||!password){
        return res.status(400).json({message:"Input field cannot be empty"})
    }

    const user = await User.findOne({email});
    if(!user){
        return res.status(400).json({message:"User does not exists"})
    }

    const userMatched = await bcrpyt.compare(password,user.password);

    if(!userMatched){
       return res.status(400).json({message:"User does not exists"})
    }
        const token = jwt.sign({id:user._id},process.env.JWT_SECRET);
        res.cookie("token",token);
        res.json({message:"logged in",token})
    
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

module.exports = {
    userSignup,userSignin
}