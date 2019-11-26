const mongoose = require("mongoose");
const PessoaSchema = require("./Pessoa");

const ClienteSchema = PessoaSchema.discriminator(
  "ClienteSchema",
  new mongoose.Schema({
    senha: String
  })
);

module.exports = mongoose.model("ClienteSchema");
// module.exports = ClienteSchema;
