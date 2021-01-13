const jwt = require("jsonwebtoken");

const validarJWT = (req, res, next) => {
  //LEER EL TOKEN
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({
      ok: true,
      msg: "No hay token de peticion",
    });
  }
  try {
    const { uid } = jwt.verify(token, process.env.JWT_SECRET);
    req.uid = uid;
    next();
  } catch (error) {
    return res.status(404).json({
      ok: false,
      msg: "token no Valido",
    });
  }
};

module.exports = {
  validarJWT,
};
