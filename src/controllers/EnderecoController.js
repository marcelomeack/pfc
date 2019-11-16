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

  async get(req, res) {
    const { rua } = req.query;

    const endereco = await Endereco.find({ rua: rua });

    return res.json(endereco);
  },

  async delete(req, res) {
    const { _id } = req.headers;

    let endereco = await Endereco.findOne({ endereco: _id });

    endereco = await Endereco.deleteOne({ endereco });

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
