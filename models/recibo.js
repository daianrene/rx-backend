const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Recibo = sequelize.define("recibo", {
    razonsocial: DataTypes.STRING,
    domicilio: DataTypes.STRING,
    localidad: DataTypes.STRING,
    telefono: DataTypes.STRING,
    iva: DataTypes.STRING,
    cuit: DataTypes.STRING,
    total: DataTypes.STRING,
    concepto: DataTypes.STRING,
    lugaryfecha: DataTypes.STRING,
  });
  return Recibo;
};
