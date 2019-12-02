const mongoose = require("mongoose");

const baseOptions = {
  discriminatorKey: "itemtype",
  collection: "items"
};

const PessoaSchema = mongoose.model(
  "PessoaSchema",
  new mongoose.Schema(
    {
      nome: String,
      cpf: String,
      telefone: String,
      sexo: String,
      endereco: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Endereco"
      },
      email: String,
      dataNascimento: Date
    },
    baseOptions
  )
);

module.exports = mongoose.model("PessoaSchema");
