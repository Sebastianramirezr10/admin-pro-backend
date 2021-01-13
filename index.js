const express = require("express");
const { dbConnection } = require("./dataBase/config");
const cors = require("cors");
require("dotenv").config();

//Crear Servidor Express
const app = express();
//base de datos
dbConnection();

//configurar CORS
app.use(cors());

//Lectura y paseo del body
app.use(express.json());

//rutas
app.use("/api/usuarios", require("./routes/usuarios"));
app.use("/api/login", require("./routes/auth"));

app.listen(process.env.PORT, () => {
  console.log("Servidor Çorriendo en " + process.env.PORT);
});
