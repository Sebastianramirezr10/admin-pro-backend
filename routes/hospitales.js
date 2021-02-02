/*
api/hospitales

*/
//EXPORTACIONES
const { Router } = require("express");
const { check } = require("express-validator");
const { validarJWT } = require("../middlewares/validar-jwt");
const { validarCampos } = require("../middlewares/validar-campos");

const {
  getHospitales,
  crearHospital,
  actualizarHospital,
  borrarHospital,
} = require("../controllers/hospitales");

const router = Router();

//OBTENCION
router.get("/", getHospitales);

router.post(
  "/",
  [
    validarJWT,
    check("nombre", "El nombre del Hospital es necesario").not().isEmpty(),
    validarCampos,
  ],
  crearHospital
);

//ACTUALIZACION
router.put("/:id", [], actualizarHospital);

//ELIMINACION
router.delete("/:id", borrarHospital);

module.exports = router;
