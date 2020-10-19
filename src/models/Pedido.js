const mongoose = require("mongoose");
const Produto = require("./Produto");

const PedidoSchema = new mongoose.Schema({
  dataPedido: {
    type: Date,
    default: Date.now
  },
  valorTotal: Number,
  itemPedidos: [Produto],
  cliente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ClienteSchema"
  },
  statusPedido: String
});

module.exports = mongoose.model("Pedido", PedidoSchema);
