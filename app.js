const express = require("express");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require("dotenv").config();

const cors = require("cors");
app.use(
  cors({
    origin: "*",
  })
);

//RUTAS
require("./routes/auth")(app);
require("./routes/user")(app);

//DB
const db = require("./models/connection");
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and Resync DB");
// });
db.sequelize.sync();

const PORT = process.env.PORT || 8080;

app.listen(PORT, (error) => {
  if (!error) console.log(`Server is Successfully Running on ${PORT} port`);
  else console.log("Error occurred, server can't start", error);
});
