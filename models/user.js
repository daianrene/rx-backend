const { DataTypes } = require("sequelize");

const User = (sequelize) =>
  sequelize.define("user", {
    username: {
      type: DataTypes.STRING,
    },
    email: { type: DataTypes.STRING },
    password: { type: DataTypes.STRING },
  });

module.exports = User;
