const jwt = require("jsonwebtoken");
require("dotenv").config();

const auth = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];

  if (token) {
    jwt.verify(token, process.env.PRIVATE_KEY, function (err, decoded) {
      if (err) {
        // console.log(err);
        res.send({ message: "Try Logging again" });
      } else {
        const userId = decoded.userId;
        req.userId = userId;
        next();
      }
    });
  }
};

module.exports = { auth };
