const mongoose = require("mongoose");

const produtoSchema = new mongoose.Schema({
  nome: String,
  valor: Number,
  descricao: String
});

module.exports = produtoSchema;
