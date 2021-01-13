/*

ruta: /api/usuarios



*/
//EXPORTACIONES
const { Router } = require("express");
const { check } = require("express-validator");
const { validarJWT } = require("../middlewares/validar-jwt");
const {
  getUsuarios,
  crearUsuarios,
  actualizarUsuario,
  borrarUsuario,
} = require("../controllers/usuarios");

const { validarCampos } = require("../middlewares/validar-campos");
const router = Router();

//OBTENCION
router.get("/", validarJWT, getUsuarios);

router.post(
  "/",
  [
    check("nombre", "El Nombre Es obligatorio...").not().isEmpty(),
    check("password", "El Password Es obligatorio...").not().isEmpty(),
    check("email", "El Email Es obligatorio...").isEmail(),
    validarCampos,
  ],
  crearUsuarios
);

//ACTUALIZACION
router.put(
  "/:id",
  [
    validarJWT,
    check("nombre", "El Nombre Es obligatorio...").not().isEmpty(),
    check("email", "El Email Es obligatorio...").isEmail(),
    check("role", "El Role Es obligatorio...").not().isEmpty(),
    validarCampos,
  ],
  actualizarUsuario
);

//ELIMINACION
router.delete("/:id", validarJWT, borrarUsuario);

module.exports = router;
