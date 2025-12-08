const multer = require("multer");
const path = require("path");

module.exports = {
	storage: multer.diskStorage({
		destination: (req, file, callback) => {
			callback(null, path.resolve(__dirname, "..", "..", "uploads"));
		},
		filename: (req, file, callback) => {
			const time = new Date().getTime();
			const formattedFileName = file.originalname.trim().replace(/\s+/g, "_");

			callback(null, `${time}_${formattedFileName}`);
		},
	}),
};
