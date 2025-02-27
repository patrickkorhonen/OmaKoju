import prisma from "../prismaClient.js";
import { uploadLogo, uploadBanner } from "./uploadController.js";

export const createShop = async (req, res) => {
  const { shopName, description, croppedLogo, croppedBanner } = req.body;
  const UID = req.userId;
  console.log("lopuksi täällä", shopName, description, UID);
  try {
    const existingShop = await prisma.shop.findUnique({
      where: {
        shopName: shopName,
      },
    });

    if (existingShop) {
      return res
        .status(409)
        .send({ message: "Shop with this name already exists" });
    }
    const result = await prisma.$transaction(async (tx) => {
      const logoUpload = await uploadLogo(croppedLogo, shopName);
      let bannerUpload = null;

      if (croppedBanner) {
        bannerUpload = await uploadBanner(croppedBanner, shopName);
      }

      const shop = await tx.shop.create({
        data: {
          userId: UID,
          shopName,
          description,
          logoPicture: logoUpload,
          bannerPicture: bannerUpload,
        },
      });
      return shop;
    });

    const user = await prisma.user.findUnique({
      where: {
        id: UID,
      },
    });
    if (user.role == "BUYER") {
      await prisma.user.update({
        where: {
          id: UID,
        },
        data: {
          role: "SELLER",
        },
      });
    }

    res.json({
      result,
    });
  } catch (err) {
    console.log(err);
    res.sendStatus(503);
  }
};

export const updateShop = async (req, res) => {
  const { id, shopName, description, isActive } = req.body;
  try {
    const existingShop = await prisma.shop.findUnique({
      where: {
        shopName: shopName,
        NOT: {
          id,
        },
      },
    });

    if (existingShop) {
      return res
        .status(409)
        .send({ message: "Shop with this name already exists" });
    }

    const shop = await prisma.shop.update({
      where: {
        id,
      },
      data: {
        shopName,
        description,
        isActive,
      },
    });

    res.json({
      shop,
    });
  } catch (err) {
    console.log(err);
    res.sendStatus(503);
  }
};

export const getAllShops = async (req, res) => {
  try {
    const allShops = await prisma.shop.findMany({
      where: {
        isActive: true,
      },
      select: {
        id: true,
        shopName: true,
        description: true,
        logoPicture: true,
        bannerPicture: true,
      },
    });

    res.json(allShops);
  } catch (err) {
    console.log(err);
    res.sendStatus(503);
  }
};

export const getUsersShops = async (req, res) => {
  const UID = req.userId;
  try {
    const userShops = await prisma.shop.findMany({
      where: {
        userId: UID,
      },
    });

    res.json(userShops);
  } catch (err) {
    console.log(err);
    res.sendStatus(503);
  }
};

export const getShop = async (req, res) => {
  try {
    const slug = req.params.id;
    const shop = await prisma.shop.findUnique({
      where: {
        id: slug,
      },
      select: {
        userId: true,
        shopName: true,
        description: true,
        products: true,
        logoPicture: true,
        bannerPicture: true,
      },
    });

    res.json(shop);
  } catch (err) {
    console.log(err);
    res.sendStatus(503);
  }
};
