const User = require("../models/User");
const {z} = require('zod');
const bcrpyt = require("bcrypt");
const jwt = require("jsonwebtoken")

const userSignup =  async (req,res) =>{
    console.log("Request Body:", req.body);

    try {

        const requiredBody = z.object({
        username:z.string().min(3).max(15),
        email:z.string().email(),
        password:z.string()
    })

    const safeParse = requiredBody.safeParse(req.body);

  
    if (!safeParse.success) {
      return res.status(400).json({
        message: "incorrect format",
        error: safeParse.error.flatten(),
        success: false
      });
    }

    const {username,email,password} = req.body;

    if(!username||!email||!password){
        return res.status(400).json({message:"Input field cannot be empty",success: false})
    }

    const userExists = await User.findOne({email});
    const nameExists = await User.findOne({username});

    if(nameExists){
        return res.status(400).json({message:"Naam pehle hi leliya gya hai😔",success: false})
    }
    if(userExists){
        return res.status(400).json({message:"User already exists",success: false})
    }

    const hashedpassword = await bcrpyt.hash(password,10);

    if(!hashedpassword){
        return res.status(400).json({
            message:"Wrong password",success: false
        })
    }

    const user = await User.create({
        username,
        email,
        password:hashedpassword
    })

    res.json({message:`${username} Signed up `,success: true})

    } catch (error) {
        res.status(500).json({
            message:"Internal Server error",
            success: false
        })
        console.log(error);
        
    }

}

const userSignin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Input field cannot be empty" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    const userMatched = await bcrpyt.compare(password, user.password);
    if (!userMatched) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Sign JWT token
    const token = jwt.sign(
  { id: user._id, username: user.username },
  process.env.JWT_SECRET,
  { expiresIn: '7d' }
);


    // Send token in response body (client saves it in localStorage)
    res.json({ message: "Signed In!", token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
    userSignup,userSignin
}