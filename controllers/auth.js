const { Sequelize } = require("sequelize");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const db = require("../models/connection");
const config = require("../config/jwt");

const User = db.user;

const signup = async (req, res) => {
  //Guardar usuario
  try {
    const user = await User.create({
      username: req.body.username,
      email: req.body.email,
      // password: bcrypt.hashSync(req.body.password, 8),
      password: req.body.password,
    });

    res.send({ meesage: "Usuario registrado correctamente" });
  } catch (err) {
    res.status(500).send({ meesage: error.meesage });
  }
};

const signin = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (!user) {
      return res.status(404).send({ message: "Usuario no encontrado." });
    }

    // const passwordIsValid = bcrypt.compareSync(
    //   req.body.password,
    //   user.password
    // );

    // if (!passwordIsValid)
    //   return res.status(401).send({ message: "Contraseña incorrecta" });

    if (user.password != req.body.password)
      return res
        .status(401)
        .send({ accesToken: null, message: "Contraseña incorrecta" });

    const token = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: config.duration,
    });

    return res.status(200).send({
      id: user.id,
      username: user.username,
      email: user.email,
      accessToken: token,
    });
  } catch (err) {
    return res.status(500).send({ meesage: err.meesage });
  }
};

const signout = async (req, res) => {
  try {
    req.session = null;
    return res.send({ message: "Se ha deslogueado correctamente" });
  } catch (err) {
    this.next(err);
  }
};

const auth = { signin, signup, signout };

module.exports = auth;
