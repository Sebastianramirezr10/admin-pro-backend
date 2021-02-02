const { response } = require("express");
const { v4: uuidv4 } = require("uuid");
const { actualizarImagen } = require("../helpers/actualizar-imagen");
const path = require("path");
const fs = require("fs");
//********* */

const fileUpload = (req, res = response) => {
  const tipo = req.params.tipo;
  const id = req.params.id;

  //validar tipo
  const tiposValidos = ["hospitales", "medicos", "usuarios"];
  if (!tiposValidos.includes(tipo)) {
    return res.status(400).json({
      ok: false,
      msg: "no es un medico, usuario u hospital (tipo)",
    });
  }

  ///VALIDAR QUE EXISTA UN ARCHIVO
  if (!req.files || Object.keys(req.files).length === 0) {
    return res
      .status(400)
      .json({ ok: false, msg: "No existe ninguna archivo... " });
  }

  //PROCESAR LA IMAGEN
  const file = req.files.imagen;

  const nombreCortado = file.name.split(".");
  const extensionArchivo = nombreCortado[nombreCortado.length - 1];

  //validar extenson
  const extensionesValidas = ["png", "jpg", "jpeg", "gif"];

  if (!extensionesValidas.includes(extensionArchivo)) {
    return res.status(400).json({
      ok: false,
      msg: "No es una extension permitida",
    });
  }

  //generar el nombre del archivo
  const nombreArchivo = `${uuidv4()}.${extensionArchivo}`;

  //path: PARA GUARDAR LA IMAGEN
  const path = `./uploads/${tipo}/${nombreArchivo}`;

  // Mover la Imagen
  file.mv(path, (err) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        ok: false,
        msg: "Error al mover la imagen",
      });
    }

    //ACTUALIZAR BASE DE DATOS
    actualizarImagen(tipo, id, nombreArchivo);

    res.json({
      ok: true,
      msg: "Archivo subido ",
      nombreArchivo,
    });
  });
};

const retornarImagen = (req, res) => {
  const tipo = req.params.tipo;
  const foto = req.params.foto;

  const pathImg = path.join(__dirname, `../uploads/${tipo}/${foto}`);
  //imagen por defecto

  if (fs.existsSync(pathImg)) {
    res.sendFile(pathImg);
  } else {
    const pathImg = path.join(__dirname, `../uploads/noavaible.jpg`);
    res.sendFile(pathImg);
  }
};

module.exports = { fileUpload, retornarImagen };