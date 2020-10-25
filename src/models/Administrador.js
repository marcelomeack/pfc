const mongoose = require("mongoose");
const PessoaSchema = require("./Pessoa");

const administradorSchema = PessoaSchema.discriminator(
  "administradorSchema",
  new mongoose.Schema({
    senha: String
  })
);

module.exports = administradorSchema;
