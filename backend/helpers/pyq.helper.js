const cloudinary1343 = require("../config/cloudinary");

const pyqHelper = async (localFilePath) => {
  try {
    if (!localFilePath) throw new Error("No file path provided");

    const result = await cloudinary1343.uploader.upload(localFilePath, {
      resource_type: "raw",
      type: "upload",
      invalidate: true,
    });

    
    console.log("Cloudinary PDF Upload Result:", result);

    return {
      url: result.secure_url,
      public_id: result.public_id,
    };
  } catch (error) {
    console.error("Cloudinary PDF upload error:", error);
    throw error;
  }
};

module.exports = { pyqHelper };
