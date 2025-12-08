const Image = require("../models/Image");
const path = require("path");
const fs = require("fs");

class FilesController {
	async create(req, res) {
		try {
			const { filename, originalname } = req.file;

			const newFile = await Image.create({
				nome: filename,
				url: `files/${filename}`,
				nome_original: originalname,
			});

			res.status(201).json(newFile);
		} catch (error) {
			res.status(500).json({ message: "Erro ao salvar dados no banco.", error });
		}
	}

	async getAll(req, res) {
		try {
			const images = await Image.findAll();

			res.status(200).json(images);
		} catch (error) {
			res.status(500).json({ message: "Erro ao recuperar as imagens.", error });
		}
	}

	async delete(req, res) {
		try {
			const { id } = req.params;
			const image = await Image.findByPk(id);

			if (!image) {
				return res.status(404).json({ message: "A imagem não foi encontrada." });
			}

			const filePath = path.join(process.cwd(), "uploads", image.nome);
			fs.unlink(filePath, (err) => {
				if (err) return console.log("Erro na deleção do arquivo: ", err);

				console.log("Arquivo deletado com sucesso.");
			});

			await Image.destroy({ where: { id } });

			res.status(200).json({ message: "Deletado com sucesso." });
		} catch (error) {
			res.status(500).json({ message: "Erro ao deletar a imagem.", error });
		}
	}
}

module.exports = new FilesController();
