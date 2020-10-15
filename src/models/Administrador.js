const mongoose = require("mongoose");
const PessoaSchema = require("./Pessoa");

const AdministradorSchema = PessoaSchema.discriminator(
  "AdministradorSchema",
  new mongoose.Schema({
    senha: String
  })
);

module.exports = mongoose.model("AdministradorSchema");
