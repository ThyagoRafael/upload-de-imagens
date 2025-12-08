const { Sequelize } = require("sequelize");
const sequelizeConfig = require("../config/database");

const Image = require("../app/models/Image");

const models = [Image];

class Database {
	constructor() {
		this.connection = new Sequelize(sequelizeConfig);
		this.init();
	}

	init() {
		models.forEach((model) => model.init(this.connection));
	}
}

module.exports = new Database();
