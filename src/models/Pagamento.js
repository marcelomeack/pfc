const mongoose = require("mongoose");

const PagamentoSchema = new mongoose.Schema({
  metodo: String
});

module.exports = mongoose.model("Pagamento", PagamentoSchema);
