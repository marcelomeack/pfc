const mongoose = require("mongoose");
const Pessoa = require("./Pessoa");

const FuncionarioSchema = Pessoa.discriminator(
  "FuncionaSchema",
  new mongoose.Schema()
)({
  codFuncionario: {
    type: Schema.ObjectId,
    auto: true
  },
  cargo: String,
  funcao: String
});

module.exports = mongoose.model("Funcionario", FuncionarioSchema);
