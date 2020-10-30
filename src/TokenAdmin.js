const jwt = require("jsonwebtoken");

module.exports = function auto(req, res, next) {
  const tokenAutAdmin = req.header("tokenAutAdmin");
  if (!tokenAutAdmin) return res.status(401).send("Acesso Negado ADMIN");

  try {
    const verificadoAdmin = jwt.verify(tokenAutAdmin, process.env.TOKEN_SECRET);
    req.Adiministrador = verificadoAdmin;
    next();
  } catch (error) {
    res.status(400).send("Token Inválido");
  }
};
