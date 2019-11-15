const Endereco = require("../DAO/EnderecoDAO");

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
    const { rua } = req.query;

    let endereco = await Endereco.findOne({ rua: rua });

    endereco = await Endereco.deleteOne({ rua });

    return res.json(endereco);
  }
};
