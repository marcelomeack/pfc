const Produto = require("../DAO/ProdutoDAO");
const mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);

module.exports = {
  async store(req, res) {
    const { filename } = req.file;
    const { nome, valor, descricao } = req.body;

    const produto = await Produto.create({
      thumbnail: filename,
      nome,
      valor,
      descricao
    });
    return res.json(produto);
  },

  async getAll(req, res) {
    const produto = await Produto.find({ produto: Produto });

    return res.json(produto);
  },

  async getById(req, res) {
    const { _id } = req.headers;

    let produto = await Produto.findOne({ _id: _id });

    return res.json(produto);
  },

  async deleteById(req, res) {
    const { _id } = req.params;

    produto = await Produto.findByIdAndDelete(_id, {});

    return res.json(produto);
  },

  async update(req, res) {
    const { _id } = req.params;
    const { nome, valor, descricao } = req.body;

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
      return res.status(400).json({ error: "Produto inexistente" });
    } else {
      return res.json(produto);
    }
  }
};
