import prisma from "../prismaClient.js";

export const addProduct = async (req, res) => {
    const { shopId, name, price, stock, imageUrl } = req.body;
    const UID = req.userId;

    try {
        const ownShop = await prisma.shop.findUnique({
            where: {
              id: shopId,
              userId: UID
            },
          });
      
          if (!ownShop) {
            return res
              .status(409)
              .send({ message: "Unauthorized action" });
          }

        const product = await prisma.product.create({
            data: {
                shopId,
                name,
                price,
                stock,
                imageUrl,
            }
        })

        res.json({
            product
        })
    } catch (err) {
        console.log("error", err)
        res.status(503).json({ message: "Adding product failed" });
    }
}