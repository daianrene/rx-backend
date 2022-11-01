const verifyToken = require("../middleware/authJwt");
const controller = require("../controllers/user");
const router = require("express").Router();

module.exports = (app) => {
  router.get("/recibos", controller.getRecibos);
  router.post("/addrecibo", controller.postRecibo);

  app.use("/api/user", verifyToken, router);
};
