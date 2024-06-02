const jwt = require("jsonwebtoken");
require("dotenv").config();

const Protect = async (req, res, next) => {
  try {
    let { authorization } = req.headers;
    let Bearer = authorization.split(" ");
    let decode = jwt.decode(Bearer[1], process.env.JWT_TOKEN);
    req.payload = decode;
    console.log("Decode");
    console.log(decode);
    next();
  } catch (err) {
    return res.status(404).json({ status: 404, message: "Token incorrect" });
  }
};

module.exports = { Protect };
