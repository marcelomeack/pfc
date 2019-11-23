const Endereco = require("../DAO/EnderecoDAO");
const mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);

module.exports = {
  async store(req, res) {
    const { rua, numero, complemento, cep, bairro } = req.body;

    const endereco = await Endereco.create({
      rua,
      numero,
      complemento,
      cep,
      bairro
    });
    return res.json(endereco);
  },

  async getAll(req, res) {
    const produto = await Produto.find({ produto: Produto });

    return res.json(produto);
  },

  async getById(req, res) {
    const { _id } = req.headers;

    let endereco = await Produto.findOne({ _id: _id });

    return res.json(Endereco);
  },

  async deleteById(req, res) {
    const { _id } = req.params;

    endereco = await Endereco.findByIdAndDelete(_id, {});

    return res.json(endereco);
  },

  async update(req, res) {
    const { rua, numero, complemento, cep, bairro } = req.body;
    const { _id } = req.headers;

    const endereco = await Endereco.findByIdAndUpdate(
      _id,
      {
        rua,
        numero,
        complemento,
        cep,
        bairro
      },
      { new: true }
    );

    if (!endereco) {
      return res.status(400).json({ error: "Endereço inexistente" });
    } else {
      return res.json(endereco);
    }
  }
};
