const Cliente = require("../DAO/ClienteDAO");
const mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);

module.exports = {
  async store(req, res){
    const { nome, cpf, telefone, sexo, endereco}
  }
};