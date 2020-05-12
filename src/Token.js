const jwt = require("jsonwebtoken");

module.exports = function auto(req, res, next) {
  const token = req.header("tokenAut");
  if (!token) return res.status(401).send("Acesso Negado");

  try {
    const verificado = jwt.verify(token, process.env.TOKEN_SECRET);
    req.Cliente = verificado;
    next();
  } catch (error) {
    res.status(400).send("Token Inválido");
  }
};
