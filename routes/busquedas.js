/*

ruta: api/todo/:busqueda
*/
const { Router } = require("express");
const {
  getTodos,
  getDocumentosColeccion,
} = require("../controllers/busquedas");
const { validarJWT } = require("../middlewares/validar-jwt");

const router = Router();

router.get("/:busqueda", validarJWT, getTodos);
router.get("/coleccion/:tabla/:busqueda", validarJWT, getTodos);

module.exports = router;
