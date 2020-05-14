const express = require("express");
const multer = require("multer");
const uploadConfig = require("./config/upload");

const SessionController = require("./controllers/SessionController");
const SpotController = require("./controllers/SpotController");
const DashBoardController = require("./controllers/DashBoardController");
const BookingController = require("./controllers/BookingController");
//TCC
const EnderecoController = require("./controllers/EnderecoController");
const ProdutoController = require("./controllers/ProdutoController");
const ClienteController = require("./controllers/ClienteController");
const SessaoController = require("./controllers/SessaoController");
const AdministradorController = require("./controllers/AdministradorController");
const PdfController = require("./controllers/PdfController");

const Token = require("./Token");

const routes = express.Router();
const upload = multer(uploadConfig);

// routes.post("/sessions", SessionController.store);
// routes.delete("/sessions", SessionController.delete);
// routes.post("/spots", upload.single("thumbnail"), SpotController.store);
// routes.delete("/spots", SpotController.delete);
// routes.get("/spots", SpotController.index);
// routes.get("/dashboard", DashBoardController.show);
// routes.post("/spots/:spot_id/bookings", BookingController.store);

//TCC
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

routes.post("/pdf", PdfController.store);
routes.get("/pdf", PdfController.get);
routes.post("/pdfEmail", PdfController.sendEmail);

routes.post("/Administrador", AdministradorController.store);

routes.post("/sessao", SessaoController.login);

module.exports = routes;
