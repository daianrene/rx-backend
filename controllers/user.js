const db = require("../models/connection");
const { getDate } = require("../utils/getDate");

const User = db.user;
const Recibo = db.recibo;

const getRecibos = async (req, res) => {
  try {
    const recibos = await Recibo.findAll({
      where: { userId: req.userId },
      order: [["id", "DESC"]],
    });
    res.send(recibos);
  } catch (err) {
    res.status(500).send({ message: "Error en la base de datos" });
  }
};

const postRecibo = async (req, res) => {
  console.log(req.body);

  try {
    const newRecibo = await Recibo.create({
      razonsocial: req.body.form.razonsocial,
      domicilio: req.body.form.domicilio,
      localidad: req.body.form.localidad,
      telefono: req.body.form.telefono,
      iva: req.body.form.iva,
      cuit: req.body.form.cuit,
      total: req.body.form.total,
      concepto: req.body.form.concepto,
      lugaryfecha: "Parana, Entre Rios " + getDate(),
      userId: req.userId,
    });
    console.log("ACA");
    res.send();
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// const getReportes = async (req, res) => {
//   try {
//     let reportes = await Reporte.findAll({
//       include: [
//         {
//           model: User,
//           required: true,
//           attributes: ["username"],
//         },
//       ],
//       attributes: ["turno", "fecha", "detalle", "userId"],
//       order: [
//         ["fecha", "DESC"],
//         ["turno", "DESC"],
//         ["updatedAt", "DESC"],
//       ],
//     });
//     res.send(reportes);
//   } catch (err) {
//     res.status(500).send({ message: "Error en la base de datos" });
//   }
// };

const user = {
  getRecibos,
  postRecibo,
};

module.exports = user;
