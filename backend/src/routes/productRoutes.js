import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import { addProduct, deleteProduct, getShopProducts } from "../controllers/productControllers.js";

const router = express.Router();

router.post("/add", authMiddleware, addProduct)

router.get("/shop-products/:id", getShopProducts)

router.delete("/delete", authMiddleware, deleteProduct)

export default router;