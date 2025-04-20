import prisma from "../prismaClient.js";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadLogo = async (imageBase64) => {
  try {
    const uploadResult = await cloudinary.uploader
      .upload(
        imageBase64,
        {
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

export const uploadBanner = async (imageBase64) => {
    try {
      const uploadResult = await cloudinary.uploader
        .upload(
          imageBase64,
          {
            folder: "shop_banners",
            transformation: [{ width: 1500, height: 300, crop: "fill", quality: "auto", fetch_format: "auto" }],
          }
        )
        .catch((error) => {
          console.log(error);
        });
  
      console.log("eka b", uploadResult);
      console.log("toka b", uploadResult.secure_url);
      return uploadResult.secure_url
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to upload image" });
    }
  };

  export const uploadProductImages = async (images, shopId, name) => {
    try {
      console.log('tääällä on kuvia', images);
      let returnedImages = []
      for (let i = 0; i < images.length; i++) {
      const uploadImage = await cloudinary.uploader
        .upload(
          images[i],
          {
            folder: `${shopId}/products/${name}`
          }
        )
        .catch((error) => {
          console.log(error);
        });
        returnedImages.push(uploadImage.secure_url)
      }
      return returnedImages
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to upload images" });
    }
  }