import express from "express";
import authMiddleware from './middlewares/authMiddleware.js'
import authRoutes from './routes/authRoutes.js'


const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

app.get("/", (req, res) => {
    return res.send("Hi Everyone.");
});

app.use('/auth', authRoutes)


app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));