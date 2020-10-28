const Pedido = require("../DAO/PedidoDAO");
const mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);

module.exports = {
  async store(req, res) {
    const { _id } = req.headers;
    const {
      dataPedido,
      valorTotal,
      itemPedidos,
      statusPedido,
      enderecoEntrega,
      CEP
    } = req.body;

    const pedido = await Pedido.create({
      dataPedido,
      valorTotal,
      itemPedidos,
      cliente: _id,
      statusPedido,
      enderecoEntrega,
      CEP
    });
    return res.json(pedido);
  },

  async getAll(req, res) {
    const pedido = await Pedido.find({ pedido: Pedido }).populate("cliente");

    return res.json(pedido);
  },

  async getAllId(req, res) {
    const { _id } = req.headers;
    const pedido = await Pedido.find({ cliente: _id });

    return res.json(pedido);
  },

  async deleteById(req, res) {
    const { _id } = req.params;

    const pedido = await Pedido.findByIdAndDelete(_id, {});

    return res.json(pedido);
  },

  async updateStatus(req, res) {
    const { _id, statusPedido } = req.body;

    const pedido = await Pedido.findByIdAndUpdate(_id, {
      statusPedido
    });

    if (!pedido) {
      return res.status(400).json({ error: "Pedido inexistente" });
    } else {
      return res.json(pedido);
    }
  },

  async updateCliente(req, res) {
    const { _id } = req.body;

    const pedido = await Pedido.updateMany(
      { cliente: _id },
      {
        cliente: "5f99e7c68d90ff17409744bb"
      }
    );

    if (!pedido) {
      return res.status(400).json({ error: "Pedido inexistente" });
    } else {
      return res.json(pedido);
    }
  }
};
