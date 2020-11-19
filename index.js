const express = require("express");
const { dbConnection } = require("./DataBase/config");
const cors = require("cors");
require("dotenv").config();

//Crear Servidor Express
const app = express();
//base de datos
dbConnection();

//configurar CORS
app.use(cors());

//rutas
app.get("/", (req, res) => {
  res.json({
    ok: true,
    msg: "Hola Mundo",
  });
});

app.listen(process.env.PORT, () => {
  console.log("Servidor Çorriendo en " + process.env.PORT);
});
