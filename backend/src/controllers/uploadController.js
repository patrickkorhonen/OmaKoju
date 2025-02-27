import prisma from "../prismaClient.js";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadProfilePicture = async (imageBase64, shopName) => {
  try {
    const uploadResult = await cloudinary.uploader
      .upload(
        imageBase64,
        {
          public_id: shopName,
          folder: "shop_logos",
          transformation: [{ width: 400, height: 400, crop: "scale", quality: "auto", fetch_format: "auto" }],
        }
      )
      .catch((error) => {
        console.log(error);
      });

    console.log("eka", uploadResult);
    console.log("toka", uploadResult.secure_url);
    return uploadResult.secure_url

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to upload image" });
  }
};
