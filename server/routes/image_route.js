import express from "express";
import ExpressFormidable from "express-formidable";
import multer from "multer";
import cloudinary from "cloudinary";
import "dotenv/config";

cloudinary.config({
  cloud_name: process.env.CLOUDNAME,
  api_key: process.env.APIKEY,
  api_secret: process.env.APISECRET,
});

const router = express.Router();

router.post("", ExpressFormidable({maxFieldSize: 5 * 2024 * 2024}), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.files.image.path);

    res.json({
      url: result.secure_url,
      public_id: result.public_id,
    });
  } catch (error) {
    return res.status(500).json({message: "Error while uploading image"});
  }
});

export default router;
