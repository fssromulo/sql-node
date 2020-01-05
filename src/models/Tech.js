const { Model, DataTypes } = require('sequelize');
class Tech extends Model {
	static init(sequelize) {
		super.init({
			name: DataTypes.STRING
		}, {
			sequelize,
			tableName: 'techs'
		})
	}

	static associate(models) {
		// N - N > Relacionamento do Mysql
		this.belongsToMany(
			models.User,
			{
				foreignKey: 'techs_id', through: 'user_techs',
				as: 'users'
			}

		);
	}
}

module.exports = Tech;