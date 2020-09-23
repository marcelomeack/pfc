// const Cliente = require("../DAO/ClienteDAO");
const Pedido = require("../models/Pedido");
const mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);

module.exports = {
  async store(req, res) {
    const { cliente_id } = req.headers;
    const { dataPedido, valorTotal, itemPedidos = [] } = req.body;

    const pedido = await Pedido.create({
      dataPedido,
      valorTotal,
      itemPedidos,
      cliente: cliente_id
    });
    return res.json(pedido);
  },

  async getAll(req, res) {
    const pedido = await Pedido.find({ pedido: Pedido });

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

  async update(req, res) {
    const { _id } = req.params;
    const { nome, valor, quantidade, descricao } = req.body;

    const produto = await Produto.findByIdAndUpdate(
      _id,
      {
        nome,
        valor,
        quantidade,
        descricao
      },
      { new: true }
    );

    if (!produto) {
      return res.status(400).json({ error: "Produto inexistente" });
    } else {
      return res.json(produto);
    }
  }
};
