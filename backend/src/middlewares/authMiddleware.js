import jwt from "jsonwebtoken";

function authMiddleware(req, res, next) {
  // const header = req.headers['authorization']
  // const token = header && header.split(' ')[1]¨
  //const accessToken = req.cookies["accessToken"];
  const refreshToken = req.cookies["refreshToken"];

  if (!refreshToken) {
    return res.status(401).json({ message: "No token provided" });
  }

  jwt.verify(refreshToken, process.env.JWT_SECRET_REFRESH, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }

    req.userId = decoded.id;
    next();
  });
}

export default authMiddleware;
