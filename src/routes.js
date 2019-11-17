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

const routes = express.Router();
const upload = multer(uploadConfig);

routes.post("/sessions", SessionController.store);
routes.delete("/sessions", SessionController.delete);
routes.post("/spots", upload.single("thumbnail"), SpotController.store);
routes.delete("/spots", SpotController.delete);
routes.get("/spots", SpotController.index);
routes.get("/dashboard", DashBoardController.show);
routes.post("/spots/:spot_id/bookings", BookingController.store);

//TCC
routes.post("/endereco", EnderecoController.store);
routes.get("/endereco", EnderecoController.get);
routes.delete("/endereco", EnderecoController.delete);
routes.put("/endereco", EnderecoController.update);

routes.post("/produto", upload.single("thumbnail"), ProdutoController.store);
routes.get("/produto", ProdutoController.get);
routes.delete("/produto", ProdutoController.delete);
routes.put("/produto", ProdutoController.update);

module.exports = routes;
