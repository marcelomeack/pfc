const mongoose = require("mongoose");

const ItemPedidoSchema = new mongoose.Schema({
  pedido: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Pedido"
  },
  produto: [
    {
      type: mongoose.Schema.Types.ObjesctId,
      ref: "Produto"
    }
  ],
  quantidade: Number,
  subTotal: Number
});

module.exports = mongoose.model("ItemPedido", ItemPedidoSchema);
