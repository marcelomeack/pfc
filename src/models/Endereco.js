const mongoose = require("mongoose");

const EnderecoSchema = new mongoose.Schema({
  rua: String,
  numero: Number,
  complemento: String,
  cep: String,
  bairro: String
});

module.exports = mongoose.model("Endereco", EnderecoSchema);
