const Cliente = require("../DAO/ClienteDAO");
const Administrador = require("../DAO/AdministradorDAO");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
mongoose.set("useFindAndModify", false);

module.exports = {
  async login(req, res) {
    const { email, senha } = req.body;

    let validacao = await Cliente.findOne({ email: email });
    if (!validacao) return res.status(400).send("Email não cadastrado");

    let senhaValida = await bcrypt.compare(senha, validacao.senha);
    if (!senhaValida) return res.status(400).send("Senha Incorreta");

    const token = jwt.sign({ _id: Cliente._id }, process.env.TOKEN_SECRET);
    res.header("tokenAut", token).send(token);
  },

  async loginADM(req, res) {
    const { email, senha } = req.body;

    let validacao = await Administrador.findOne({ email: email });
    if (!validacao) return res.status(400).send("Administrador não cadastrado");

    let senhaValida = await bcrypt.compare(senha, validacao.senha);
    if (!senhaValida) return res.status(400).send("Senha Incorreta");

    const tokenAutAdmin = jwt.sign(
      { _id: Administrador._id },
      process.env.TOKEN_SECRET
    );
    res.header("tokenAutAdmin", tokenAutAdmin).send(tokenAutAdmin);
  }
};
