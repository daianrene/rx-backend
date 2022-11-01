const { Sequelize } = require("sequelize");

const config = require("../config/database");

const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: "mysql",
  operatorsAliases: "false",
  loggin: "false",
});

const db = {};

db.sequelize = sequelize;
db.user = require("./user")(sequelize);
db.recibo = require("./recibo")(sequelize);

db.user.hasMany(db.recibo, {
  foreignKey: "userId",
});

db.recibo.belongsTo(db.user, { foreignKey: "userId" });

module.exports = db;
