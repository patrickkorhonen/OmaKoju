import express from "express";
import authMiddleware from "./middlewares/authMiddleware.js";
import authRoutes from "./routes/authRoutes.js";
import shopRoutes from "./routes/shopRoutes.js"
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.use(express.json({ limit: '5mb' }));
app.use(cookieParser());

app.use("/shop", shopRoutes)

app.use("/auth", authRoutes);

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
