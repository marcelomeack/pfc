const express = require("express");
const multer = require("multer");
const uploadConfig = require("./config/upload");

const SessionController = require("./controllers/SessionController");
const SpotController = require("./controllers/SpotController");
const DashBoardController = require("./controllers/DashBoardController");
const BookingController = require("./controllers/BookingController");

const routes = express.Router();
const upload = multer(uploadConfig);

routes.post("/sessions", SessionController.store);
routes.delete("/sessions", SessionController.delete);
routes.post("/spots", upload.single("thumbnail"), SpotController.store);
routes.delete("/spots", SpotController.delete);
routes.get("/spots", SpotController.index);
routes.get("/dashboard", DashBoardController.show);
routes.post("/spots/:spot_id/bookings", BookingController.store);

module.exports = routes;
