const jwt = require("jsonwebtoken");
const jwtConfig = require("../config/jwt");
const db = require("../models/connection");

const User = db.user;

verifyToken = (req, res, next) => {
  let token = req.headers?.["x-access-token"];

  if (!token)
    return res.status(403).send({
      message: "No hay token",
    });

  jwt.verify(token, jwtConfig.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "No authorizado",
      });
    }
    req.userId = decoded.id;
    next();
  });
};

module.exports = verifyToken;
