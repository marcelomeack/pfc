// const Cliente = require("../DAO/ClienteDAO");
const Pedido = require("../models/Pedido");
const mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);

module.exports = {
  async store(req, res) {
    const { _id } = req.headers;
    const {
      dataPedido,
      valorTotal,
      itemPedidos,
      nome,
      email,
      telefone,
      statusPedido
    } = req.body;

    const pedido = await Pedido.create({
      dataPedido,
      valorTotal,
      itemPedidos,
      cliente: _id,
      nome,
      email,
      telefone,
      statusPedido
    });
    return res.json(pedido);
  },

  async getAll(req, res) {
    const pedido = await Pedido.find({ pedido: Pedido });

    return res.json(pedido);
  },

  async getAllId(req, res) {
    const { _id } = req.headers;
    const pedido = await Pedido.find({ cliente: _id });

    return res.json(pedido);
  },

  async getById(req, res) {
    const { _id } = req.headers;

    let pedido = await Pedido.findOne({ _id: _id });

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

  async getRank(req, res) {
    const pedido = await Pedido.aggregate([
      { $unwind: "$itemPedidos" },
      {
        $group: {
          _id: "$itemPedidos.nome",
          total: {
            $sum: {
              $sum: ["$itemPedidos.quantidade"]
            }
          }
        }
      },
      { $sort: { total: -1, posts: 1 } }
    ]);

    return res.json(pedido);
  }
};
