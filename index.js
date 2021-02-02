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
app.use("/api/hospitales", require("./routes/hospitales"));
app.use("/api/medicos", require("./routes/medicos"));
app.use("/api/login", require("./routes/auth"));
app.use("/api/todo", require("./routes/busquedas"));
app.use("/api/upload", require("./routes/uploads"));
app.listen(process.env.PORT, () => {
  console.log("Servidor Çorriendo en " + process.env.PORT);
});
