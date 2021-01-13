const { response } = require("express");
const Usuario = require("../models/usuario");
const { generarJWT } = require("../helpers/jwt");
const bcrypt = require("bcryptjs");

const login = async (req, res = response) => {
  const { email, password } = req.body;
  try {
    //verificar Email
    const usuarioDB = await Usuario.findOne({ email });
    if (!usuarioDB) {
      return res.json({
        ok: false,
        msg: "Email y Contraseña no Validos",
      });
    }

    //verificar Contraseña
    const validPassword = bcrypt.compareSync(password, usuarioDB.password);
    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: "contraseña no valida",
      });
    }

    //GENERAR EL TOKEN
    const token = await generarJWT(usuarioDB.id);

    res.json({
      ok: true,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      ms: "Hable con el Administrador",
    });
  }
};

module.exports = {
  login,
};
