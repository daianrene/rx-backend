const verifySignup = require("../middleware/verifySignUp");

const controller = require("../controllers/auth");

module.exports = (app) => {
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });
  app.post("/api/signup", [verifySignup], controller.signup);
  app.post("/api/signin", controller.signin);
  app.post("/api/signout", controller.signout);
};
