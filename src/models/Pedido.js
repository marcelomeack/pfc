const mongoose = require("mongoose");

const PedidoSchema = new mongoose.Schema({
  dataPedido: {
    type: Date,
    default: Date.now
  },
  valorTotal: Number,
  itemPedidos: [
    {
      type: mongoose.Schema.Types.Array,
      ref: "Produto",
      required: true
    }
  ],
  cliente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cliente"
  }
});

module.exports = mongoose.model("Pedido", PedidoSchema);
