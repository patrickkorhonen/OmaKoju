import express from "express";
import authMiddleware from "./middlewares/authMiddleware.js";
import authRoutes from "./routes/authRoutes.js";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());

app.use(cors({ origin: "http://localhost:3000" }));

app.use(express.json());

app.get("/", (req, res) => {
  return res.send("Hi Everyone....");
});

app.get("/protected", authMiddleware, (req, res) => {
  return res.send("This is a protected route");
});

app.use("/auth", authRoutes);

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
