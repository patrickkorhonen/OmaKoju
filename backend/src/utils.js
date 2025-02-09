import jwt from "jsonwebtoken";

const createAccessToken = (user) => {
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_ACCESS, {
    expiresIn: "1h",
  });
  return token;
};

const createRefreshToken = (user) => {
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_REFRESH, {
    expiresIn: "1d",
  });
  return token;
};

export { createAccessToken, createRefreshToken };
