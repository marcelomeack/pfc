const Cliente = require("../DAO/ClienteDAO");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
mongoose.set("useFindAndModify", false);

module.exports = {
  async store(req, res) {
    const { endereco_id } = req.headers;
    const {
      nome,
      cpf,
      telefone,
      sexo,
      email,
      dataNascimento,
      senha
    } = req.body;

    const salt = await bcrypt.genSalt(10);
    const senhaCriptografada = await bcrypt.hash(senha, salt);

    const clienteCadastrado = await Cliente.findOne({ email: req.body.email });
    if (clienteCadastrado) return res.status(400).send("Email já Cadastrado");

    const cliente = await Cliente.create({
      nome,
      cpf,
      telefone,
      sexo,
      endereco: endereco_id,
      email,
      dataNascimento,
      senha: senhaCriptografada
    });
    return res.json(cliente);
  },

  async getById(req, res) {
    const { email } = req.headers;

    let cliente = await Cliente.findOne({ email: email });

    return res.json(cliente);
  },

  async getAll(req, res) {
    const cliente = await Cliente.find({ cliente: Cliente }).populate(
      "endereco"
    );

    return res.json(cliente);
  },

  async deleteById(req, res) {
    const { _id } = req.params;

    const cliente = await Cliente.findByIdAndDelete(_id, {});
    const endereco = await Endereco.findByIdAndDelete({
      _id: cliente.endereco
    });

    return res.json({
      CLIENTE: cliente,
      ENDERECO: endereco
    });
  },

  async update(req, res) {
    const { _id } = req.params;
    const {
      nome,
      cpf,
      telefone,
      sexo,
      email,
      dataNascimento,
      senha
    } = req.body;

    const salt = await bcrypt.genSalt(10);
    const senhaCriptografada = await bcrypt.hash(senha, salt);

    const cliente = await Cliente.findByIdAndUpdate(
      _id,
      {
        nome,
        cpf,
        telefone,
        sexo,
        email,
        dataNascimento,
        senha: senhaCriptografada
      },
      { new: true }
    );

    if (!cliente) {
      return res.status(400).json({ error: "Cliente inexistente" });
    } else {
      return res.json(cliente);
    }
  }
};
