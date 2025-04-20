import prisma from "../prismaClient.js";
import { uploadProductImages } from "./uploadController.js";

export const addProduct = async (req, res) => {
  const { shopId, name, price, stock, images } = req.body;
  const UID = req.userId;

  try {
    const ownShop = await prisma.shop.findUnique({
      where: {
        id: shopId,
        userId: UID,
      },
    });

    if (!ownShop) {
      return res.status(409).send({ message: "Unauthorized action" });
    }

    const result = await prisma.$transaction(async (tx) => {
      const imageUpload = await uploadProductImages(images, shopId, name)

      const product = await tx.product.create({
        data: {
          shopId,
          name,
          price,
          stock,
          imageUrl: imageUpload,
      },
    });
    return product
  })
    console.log('jooooooo', result);

    res.json({
      result,
    });
  } catch (err) {
    console.log("error", err);
    res.status(503).json({ message: "Adding product failed" });
  }
};

export const getShopProducts = async (req, res) => {
    try {
      const slug = req.params.id;
        const products = await prisma.product.findMany({
            where: {
                shopId: Number(slug)
            }
        })
        res.json(products)
    } catch (err) {
        console.log("error", err)
    }
}

export const getProduct = async (req, res) => {
  try {
    const slug = req.params.id
    const product = await prisma.product.findUnique({
      where: {
        id: Number(slug)
      },
      include: {
        shop: {
          select: {
            shopName: true
          },
        },
      },
    });
    res.json(product)
  } catch (err) {
    console.log("error", err)
  }
}

export const deleteProduct = async (req, res) => {
  const { shopId, id } = req.body;
  const UID = req.userId;
  try {
    const ownShop = await prisma.shop.findUnique({
      where: {
        id: shopId,
        userId: UID,
      },
    });

    if (!ownShop) {
      return res.status(409).send({ message: "Unauthorized action" });
    }

    const product = await prisma.product.delete({
      where: {
        id,
        shopId,
      },
    });
    res.status(204).json({ message: "Product deleted." });
  } catch (err) {
    console.log(err);
    res.status(503).json({ message: "Error while deleting the product." });
  }
};
