const { uploadImageToCloudinary } = require("../utils/imageUploader");
const uploadImage = async(req, res) => {
  try {
    const image = req.files?.image;
    let uploadResponse = null;

    if (image) {
      uploadResponse = await uploadImageToCloudinary(
        image,
        "Image"
      )
    }

    res.status(200).json({
      success: true,
      message: "Image uploaded successfully",
      cloudinary: uploadResponse,
    })
  } catch (err) {
    console.error(err);
    res.status(400).json({ success: false, message: err.message });
  }
};

module.exports = uploadImage;
