import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import { addProduct, deleteProduct, getShopProducts, getProduct } from "../controllers/productControllers.js";

const router = express.Router();

router.post("/add", authMiddleware, addProduct)

router.get("/shop-products/:id", getShopProducts)

router.get("/:id", getProduct)

router.delete("/delete", authMiddleware, deleteProduct)

export default router;