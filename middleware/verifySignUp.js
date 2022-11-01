const db = require("../models/connection");

const User = db.user;
checkDuplicateUserOrEmail = async (req, res, next) => {
  try {
    //Chequeo de usuario
    let user = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (user) {
      return res.status(400).send({
        message: "El nombre usuario ya esta en uso",
      });
    }

    //Chequeo de email
    user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (user) {
      return res.status(400).send({
        message: "El email ya esta en uso",
      });
    }
    next();
  } catch (err) {
    return res.status(500).send({
      message: "Algo salio mal :(",
    });
  }
};

module.exports = checkDuplicateUserOrEmail;
