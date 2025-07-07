const { Pyq } = require("../models/Pyq");
const User = require("../models/User")

export async function sendPyq(req,res){
    try {
        const {username,content,department,year,subject} = req.body;

    if(!username || year || !department || !subject){
        return res.status(400).json({
            message:"Input fields can't be empty",
            success:false
        })
    }

    const userExists = await User.findOne({id:username});

    if(userExists){
        const pyq = await Pyq.create({
            department,
            subject,
            year,
            username,
            content
        })

        if(pyq){
            return res.status(200).json({
                message:"Material posted",
                success:true
            })
        }else{
            return res.status(400).json({
                message:"Something went wrong",
                success:false
            })
        }
    }
    } catch (error) {
        res.status(500).json({
            message:"Internal Server error",
            success: false
        })
        console.log(error);
    }
}


