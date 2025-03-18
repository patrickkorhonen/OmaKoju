import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import { addProduct } from "../controllers/productControllers.js";

const router = express.Router();

router.post("/add", authMiddleware, addProduct)

export default router;