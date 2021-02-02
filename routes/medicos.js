/*
api/medicos

*/
//EXPORTACIONES
const { Router } = require("express");
const { check } = require("express-validator");
const { validarJWT } = require("../middlewares/validar-jwt");
const { validarCampos } = require("../middlewares/validar-campos");

const {
  getMedicos,
  crearMedico,
  actualizarMedico,
  borrarMedico,
} = require("../controllers/medicos");

const router = Router();

//OBTENCION
router.get("/", getMedicos);

router.post(
  "/",
  [
    validarJWT,
    check("nombre", "El nombre del Medico es necesario").not().isEmpty(),
    check("hospital", "El Id del Hospital no es correcto").isMongoId(),
    validarCampos,
  ],
  crearMedico
);

//ACTUALIZACION
router.put("/:id", [], actualizarMedico);

//ELIMINACION
router.delete("/:id", borrarMedico);

module.exports = router;
