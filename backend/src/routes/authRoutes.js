import express from "express";
import bcrypt from "bcryptjs";
import prisma from "../prismaClient.js";
import { createAccessToken, createRefreshToken } from "../utils.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { email, password, name } = req.body;

  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (existingUser) {
      return res.status(409).send({message: "Email is already in use"});
    }

  const hashedPassword = bcrypt.hashSync(password, 8);
    const user = await prisma.user.create({
      data: {
        email,
        passwordHash: hashedPassword,
        name,
      },
    });

    const accessToken = createAccessToken(user);
    const refreshToken = createRefreshToken(user);
    const userInfo = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      expires: new Date(Date.now() + 60 * 60 * 24 * 1000),
    });
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      expires: new Date(Date.now() + 60 * 60 * 1000),
    });
    res.json({
      userInfo,
    });
  } catch (err) {
    console.log(err.message);
    res.sendStatus(503);
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    const passwordIsValid = bcrypt.compareSync(password, user.passwordHash);
    if (!passwordIsValid) {
      return res.status(401).send({ message: "Invalid password" });
    }
    console.log(user);

    const userInfo = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
    const accessToken = createAccessToken(user);
    const refreshToken = createRefreshToken(user);
    console.log("tokenit", accessToken, refreshToken);
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      expires: new Date(Date.now() + 60 * 60 * 24 * 1000),
    });
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      expires: new Date(Date.now() + 60 * 60 * 1000),
    });
    res.json({
      userInfo,
    });
  } catch (err) {
    console.log(err.message);
    res.sendStatus(503);
  }
});

router.post("/logout", (req, res) => {
  res.clearCookie("refreshToken");
  res.clearCookie("accessToken");
  res.json({ message: "Logged out" });
});

export default router;
