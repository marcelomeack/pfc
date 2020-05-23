const express = require("express");
const multer = require("multer");
const uploadConfig = require("./config/upload");
const routes = express.Router();
const upload = multer(uploadConfig);
const Token = require("./Token");

const EnderecoController = require("./controllers/EnderecoController");
const ProdutoController = require("./controllers/ProdutoController");
const ClienteController = require("./controllers/ClienteController");
const SessaoController = require("./controllers/SessaoController");
const AdministradorController = require("./controllers/AdministradorController");
const RelatorioController = require("./controllers/RelatorioController");

routes.post("/endereco", EnderecoController.store);
routes.get("/endereco", EnderecoController.getAll);
routes.put("/endereco/:_id", EnderecoController.update);
routes.get("/enderecoId", EnderecoController.getById);
routes.delete("/enderecoId/:_id", EnderecoController.deleteById);

routes.post("/produto", upload.single("thumbnail"), ProdutoController.store);
routes.get("/produto", Token, ProdutoController.getAll);
routes.put("/produto/:_id", ProdutoController.update);
routes.get("/produtoId", ProdutoController.getById);
routes.delete("/produtoId/:_id", ProdutoController.deleteById);
routes.get("/produtoLess", ProdutoController.getLess);

routes.post("/cliente", ClienteController.store);
routes.get("/cliente", ClienteController.getAll);
routes.put("/cliente/:_id", ClienteController.update);
routes.post("/clienteId", ClienteController.getById);
routes.delete("/clienteId/:_id", ClienteController.deleteById);

routes.post("/relatorioEstoque", RelatorioController.estoquePdf);
routes.get("/getRelatorioEstoque", RelatorioController.getEstoquePdf);
routes.post("/pdfEmail", RelatorioController.sendEmail);
routes.post("/relatorioFaturamento", RelatorioController.faturamentoPdf);
routes.get("/getRelatorioFaturamento", RelatorioController.getFaturamentoPdf);

routes.post("/Administrador", AdministradorController.store);

routes.post("/sessao", SessaoController.login);

routes.get("/sum", ProdutoController.sum);

module.exports = routes;
