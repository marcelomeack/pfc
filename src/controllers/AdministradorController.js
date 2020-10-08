const Administrador = require("../models/Administrador");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
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

    const administradorCadastrado = await Administrador.findOne({
      email: req.body.email
    });
    if (administradorCadastrado)
      return res.status(400).send("Email já Cadastrado");

    const administrador = await Administrador.create({
      nome,
      cpf,
      telefone,
      sexo,
      endereco: endereco_id,
      email,
      dataNascimento,
      senha: senhaCriptografada
    });
    return res.json(administrador);
  },

  async getAll(res) {
    const administrador = await Administrador.find({
      administrador: administrador
    });

    return res.json(administrador);
  },

  async getById(req, res) {
    const { _id } = req.headers;

    let administrador = await Administrador.findOne({ _id: _id });

    return res.json(administrador);
  },

  async deleteById(req, res) {
    const { _id } = req.params;

    administrador = await Administrador.findByIdAndDelete(_id);

    return res.json(administrador);
  },

  async update(req, res) {
    const { _id } = req.params;
    const { nome, cpf, telefone, sexo, endereco } = req.body;

    const administrador = await Administrador.findByIdAndUpdate(
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

    if (!administrador) {
      return res.status(400).json({ error: "Administrador inexistente" });
    } else {
      return res.json(administrador);
    }
  }
};
