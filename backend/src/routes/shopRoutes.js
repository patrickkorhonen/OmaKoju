import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import { createShop, updateShop, getAllShops, getUsersShops, getShop, deleteShop } from "../controllers/shopControllers.js";

const router = express.Router();

router.post("/create", authMiddleware, createShop)

router.post("/update", authMiddleware, updateShop)

router.get("/all", getAllShops)

router.get("/user", authMiddleware, getUsersShops)

router.get("/:id", getShop)

router.delete("/delete", authMiddleware, deleteShop)

export default router;
