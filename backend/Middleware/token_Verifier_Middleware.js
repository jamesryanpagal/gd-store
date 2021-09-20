const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  const { key } = req.headers;

  try {
    const userToken = await jwt.verify(key, process.env.JWT_SECRET);
    req.user = { id: userToken.id };
    next();
  } catch (error) {
    switch (error.message) {
      case "jwt malformed":
        res.json({ error: true, message: "Invalid token" });
        break;

      default:
        res.json({ error: true, message: error.message });
    }
  }
};

module.exports = { verifyToken };
