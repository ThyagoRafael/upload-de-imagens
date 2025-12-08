const { Model, DataTypes } = require("sequelize");

class Image extends Model {
	static init(sequelize) {
		super.init(
			{
				id: {
					primaryKey: true,
					type: DataTypes.INTEGER,
					autoIncrement: true,
				},
				nome: {
					type: DataTypes.STRING,
					allowNull: false,
				},
				url: {
					type: DataTypes.STRING,
					allowNull: false,
					unique: true,
				},
				nome_original: {
					type: DataTypes.STRING,
					allowNull: false,
				},
			},
			{
				sequelize,
				tableName: "image",
				createdAt: false,
				updatedAt: false,
			}
		);
	}
}

module.exports = Image;
