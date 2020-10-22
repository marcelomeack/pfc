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
const PedidoController = require("./controllers/PedidoController");

routes.post("/endereco", EnderecoController.store);
routes.get("/endereco", EnderecoController.getAll);
routes.put("/endereco/:_id", EnderecoController.update);
routes.delete("/enderecoId/:_id", EnderecoController.deleteById);

routes.post("/produto", upload.single("thumbnail"), ProdutoController.store);
routes.get("/produto", Token, ProdutoController.getAll);
routes.put("/produto/:_id", ProdutoController.update);
routes.put("/produtoQt", ProdutoController.updateQt);
routes.delete("/produtoId/:_id", ProdutoController.deleteById);
routes.get("/produtoLoja", ProdutoController.getStore);

routes.get("/loja", ProdutoController.getAll);

routes.post("/cliente", ClienteController.store);
routes.get("/cliente", ClienteController.getAll);
routes.put("/cliente/:_id/:endereco", ClienteController.update);
routes.delete("/clienteId/:_id", ClienteController.deleteById);

routes.post("/relatorioEstoque", RelatorioController.estoquePdf);
routes.get("/getRelatorioEstoque", RelatorioController.getEstoquePdf);
routes.post("/pdfEmail", RelatorioController.sendEmail);
routes.post("/relatorioFaturamento", RelatorioController.faturamentoPdf);
routes.get("/getRelatorioFaturamento", RelatorioController.getFaturamentoPdf);
routes.post("/relatorioRank", RelatorioController.rankPdf);
routes.get("/getRelatorioRank", RelatorioController.getRankPdf);

routes.post("/pedido", PedidoController.store);
routes.get("/pedido", Token, PedidoController.getAll);
routes.delete("/pedidoId/:_id", PedidoController.deleteById);
routes.put("/pedidoStatus", PedidoController.updateStatus);
routes.get("/pedidoCliente", PedidoController.getAllId);

routes.post("/Administrador", AdministradorController.store);

routes.post("/sessao", SessaoController.login);
routes.post("/sessaoADM", SessaoController.loginADM);

module.exports = routes;
