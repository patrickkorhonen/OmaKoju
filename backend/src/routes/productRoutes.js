import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import { addProduct, deleteProduct } from "../controllers/productControllers.js";

const router = express.Router();

router.post("/add", authMiddleware, addProduct)

router.delete("/delete", authMiddleware, deleteProduct)

export default router;