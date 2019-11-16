const Produto = require("../DAO/ProdutoDAO");
const mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);

module.exports = {
  async store(req, res) {
    const { nome, valor, descricao } = req.body;

    const produto = await Produto.create({
      nome,
      valor,
      descricao
    });
    return res.json(produto);
  },

  async get(req, res) {
    const { nome } = req.query;

    const produto = await Produto.find({ nome: nome });

    return res.json(produto);
  },

  async delete(req, res) {
    const { _id } = req.headers;

    let produto = await Produto.findOne({ produto: _id });

    produto = await Produto.deleteOne({ produto });

    return res.json(produto);
  },

  async update(req, res) {
    const { nome, valor, descricao } = req.body;
    const { _id } = req.headers;

    const produto = await Produto.findByIdAndUpdate(
      _id,
      {
        nome,
        valor,
        descricao
      },
      { new: true }
    );

    if (!produto) {
      return res.status(400).json({ error: "Endereço inexistente" });
    } else {
      return res.json(produto);
    }
  }
};
