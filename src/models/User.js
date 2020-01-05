const { Model, DataTypes } = require('sequelize');
class User extends Model {
	static init(sequelize) {
		super.init({
			name: DataTypes.STRING,
			email: DataTypes.STRING
		}, {
			sequelize
		})
	}

	static associate(models) {
		this.hasMany(
			models.Address,
			{ foreignKey: 'user_id', as: 'addresses' }
		);
		// N - N > Relacionamento do Mysql
		this.belongsToMany(
			models.Tech,
			{
				foreignKey: 'user_id', through: 'user_techs',
				as: 'tech'
			}

		);
	}
}

module.exports = User;
// module.exports = (sequelize, DataTypes) => {
// 	const User = sequelize.define(
// 	  'User',
// 	  {
// 		name: DataTypes.STRING,
// 		email: DataTypes.STRING,
// 	  },
// 	  {
// 		freezeTableName: true
// 	  }
// 	);
// 	return User;
//  };