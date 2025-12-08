const { Router } = require("express");
const multer = require("multer");
const multerConfig = require("./config/multer");

const imagesController = require("./app/controllers/ImagesController");

const routes = new Router();
const upload = multer(multerConfig);

routes.post("/upload", upload.single("image"), imagesController.create);
routes.get("/images", imagesController.getAll);
routes.delete("/images/:id", imagesController.delete);

module.exports = routes;
