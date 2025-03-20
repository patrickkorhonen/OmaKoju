import prisma from "../prismaClient.js";

export const addProduct = async (req, res) => {
  const { shopId, name, price, stock, imageUrl } = req.body;
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

    const product = await prisma.product.create({
      data: {
        shopId,
        name,
        price,
        stock,
        imageUrl,
      },
    });

    res.json({
      product,
    });
  } catch (err) {
    console.log("error", err);
    res.status(503).json({ message: "Adding product failed" });
  }
};

export const getShopProducts = async (req, res) => {
    const { shopId } = req.body;
    try {
        const products = await prisma.product.findMany({
            where: {
                shopId
            }
        })
        res.json(products)
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
