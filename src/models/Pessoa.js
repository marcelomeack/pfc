const mongoose = require("mongoose");

const pessoa = {
  discriminatorKey: "pessoa",
  collection: "pessoas"
};

const PessoaSchema = new mongoose.Schema({
  nome: String,
  cpf: String,
  telefone: String,
  sexo: String,
  endereco: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Endereco"
  },
  email: String,
  dataNascimento: Date,
  pessoa
});

module.exports = mogoose.model("Pessoa", PessoaSchema);
