const cloudinary = require("../utils/cloudinaryConfig");
const ImageSchema = require("../models/ImageSchema");
const fs = require("fs");

const uploadFile = async (req, res) => {
  try {
    // Check if any files are provided
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    console.log("Uploading to Cloudinary...");

    // Upload all files in parallel
    const uploadResults = await Promise.all(
      req.files.map(async (file) => {
        const cloudinaryUploadResponse = await cloudinary.uploader.upload(file.path, {
          resource_type: "auto",
        });

        // Save URL to MongoDB
        const imageDoc = new ImageSchema({ image: cloudinaryUploadResponse.secure_url });
        await imageDoc.save();

        // Delete local file
        fs.unlinkSync(file.path);

        return {
          url: cloudinaryUploadResponse.secure_url,
          public_id: cloudinaryUploadResponse.public_id,
        };
      })
    );

    console.log("All files uploaded to Cloudinary ✅");

    res.status(200).json({
      success: true,
      message: "Images uploaded successfully",
      files: uploadResults,
    });

  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to upload images",
      error: error.message,
    });
  }
};

const getImage = async(req,res) =>{
    try{
        const image = await ImageSchema.find();
        res.status(200).json({success:true, message:"Image fetched successfully", data:image});
    }
    catch(err){
        res.status(400).json({success:false, message:err.message0});
    }
}

module.exports = { uploadFile, getImage };
