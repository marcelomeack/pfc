const Cliente = require("../DAO/ClienteDAO");
const mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);

module.exports = {
  async store(req, res) {
    const { nome, cpf, telefone, sexo, endereco } = req.body;

    const cliente = await Cliente.create({
      nome,
      cpf,
      telefone,
      sexo,
      endereco
    });
    return res.json(cliente);
  },

  async getAll(req, res) {
    const cliente = await Cliente.find({ usuario: usuario });

    return res.json(cliente);
  },

  async getById(req, res) {
    const { _id } = req.headers;

    let cliente = await Cliente.findOne({ _id: _id });

    return res.json(cliente);
  },

  async deleteById(req, res) {
    const { _id } = req.params;

    cliente = await Cliente.findByIdAndDelete(_id);

    return res.json(cliente);
  },

  async update(req, res) {
    const { _id } = req.params;
    const { nome, cpf, telefone, sexo, endereco } = req.body;

    const cliente = await Cliente.findByIdAndUpdate(
      _id,
      {
        nome,
        cpf,
        telefone,
        sexo,
        endereco
      },
      { new: true }
    );

    if (!cliente) {
      return res.status(400).json({ error: "Produto inexistente" });
    } else {
      return res.json(produto);
    }
  }
};
