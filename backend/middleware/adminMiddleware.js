const jwt = require("jsonwebtoken");

module.exports.authMiddleware = async (req, res, next) => {
  // const { adminToken } = req.cookies;
  const { authorization } = req.headers;
  const token = authorization?.split("Bearer ")[1];

  if (!token) {
    return res.status(409).json({ error: "Please Login First" });
  } else {
    try {
      const decodeToken = await jwt.verify(token, process.env.SECRET);

      req.role = decodeToken.role;
      req.id = decodeToken.id;
      next();
    } catch (error) {
      return res.status(409).json({ error: "Please Login" });
    }
  }
};
