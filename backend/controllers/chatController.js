const Message = require("../models/Message");

exports.sendMessage = async (req,res) =>{
  const {from , to , content } = req.body;

  const data = await Message.create({
    sender:from,
    receiver:to,
    content:content
  })




 }

 exports.getMessages = async (req,res)=>{

  
 }