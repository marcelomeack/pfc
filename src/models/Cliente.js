const mongoose = require("mongoose");
const PessoaSchema = require("./Pessoa");

const clienteSchema = PessoaSchema.discriminator(
  "ClienteSchema",
  new mongoose.Schema({
    senha: String
  })
);

module.exports = clienteSchema;
