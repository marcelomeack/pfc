const mongoose = require("mongoose");
const Pessoa = require("./Pessoa");

const GerenteSchema = Pessoa.discriminator(
  "GerenteSchema",
  new mongoose.Schema()
)({
  codGerente: {
    type: Schema.ObjectId,
    auto: true
  }
});

module.exports = mongoose.model("Gerente", GerenteSchema);
