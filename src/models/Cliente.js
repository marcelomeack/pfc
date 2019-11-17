const mongoose = require("mongoose");
const Pessoa = require("./Pessoa");

const ClienteSchema = Pessoa.discriminator(
  "ClienteSchema",
  new mongoose.Schema()
)({
  codCliente: {
    type: Schema.ObjectId,
    auto: true
  }
});

module.exports = ClienteSchema;
