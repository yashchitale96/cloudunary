const cloudinary = require("../utils/cloudinaryConfig");
const ImageSchema = require('../models/ImageSchema')
const fs = require('fs');

const uploadFile = async(req,res,err) => {
    try{
        // check if the file was provided
        if(!req.file){
            return res.status(400).json({message: "No file uploaded"});
        }

        console.log('Uploading to Cloudinary');

        // Upload file to cloudinary
        const cloudinaryUploadResponse = await cloudinary.uploader.upload(req.file.path, {
            resource_type: "auto"
        })

        const imageURL = new ImageSchema({
            image: cloudinaryUploadResponse.url
        })

        await imageURL.save();

        console.log("Your file is uploaded on Cloudinary ", imageURL);
    }
    catch(err){
        console.error(err);
        fs.unlinkSync(req.file.path);
        return null;
    }
    console.log(uploadFile, "uploadFule");
}
module.exports = { uploadFile };