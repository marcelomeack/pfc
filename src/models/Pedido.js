const mongoose = require("mongoose");
const Produto = require("./Produto");

const pedidoSchema = new mongoose.Schema({
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
  statusPedido: String,
  enderecoEntrega: String,
  CEP: String
});

module.exports = pedidoSchema;
