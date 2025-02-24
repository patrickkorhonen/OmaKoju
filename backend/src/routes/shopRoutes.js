import express from "express";
import prisma from "../prismaClient.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/create", authMiddleware, async (req, res) => {
  const { shopName, description } = req.body;
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

    const shop = await prisma.shop.create({
      data: {
        userId: UID,
        shopName,
        description,
      },
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
      shop,
    });
  } catch (err) {
    console.log(err);
    res.sendStatus(503);
  }
});

router.post("/update", authMiddleware, async (req, res) => {
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
});

router.get("/all", async (req, res) => {
  try {
    const allShops = await prisma.shop.findMany({
      where: {
        isActive: true,
      },
      select: {
        id: true,
        shopName: true,
        description: true,
      },
    });

    res.json(allShops);
  } catch (err) {
    console.log(err);
    res.sendStatus(503);
  }
});

router.get("/user", authMiddleware, async (req, res) => {
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
});

router.get("/:id", async (req, res) => {
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
      },
    });

    res.json(shop);
  } catch (err) {
    console.log(err);
    res.sendStatus(503);
  }
});

export default router;
