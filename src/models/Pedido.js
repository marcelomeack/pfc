const mongoose = require("mongoose");

const PedidoSchema = new mongoose.Schema({
  dataPedido: {
    type: Date,
    default: Date.now
  },
  valorTotal: Number,
  observacao: String,
  itemPedido: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "itemPedido"
    }
  ],
  pagamento: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Pagamento"
  },
  cliente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cliente"
  }
});

module.exports = mongoose.model("Pedido", PedidoSchema);
