const cloudinary1 = require("cloudinary").v2
  
    cloudinary1.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET
    });
    
module.exports= cloudinary1 