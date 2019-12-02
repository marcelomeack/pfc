const mongoose = require("mongoose");
const PessoaSchema = require("./Pessoa");

const GerenteSchema = PessoaSchema.discriminator(
  "GerenteSchema",
  new mongoose.Schema({
    senha: String
  })
);

module.exports = mongoose.model("GerenteSchema");
// module.exports = ClienteSchema;
