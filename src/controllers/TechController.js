const Tech = require('../models/Tech');
const User = require('../models/User');

module.exports = {
	async listAll(req, res) {
		const { user_id } = req.params;

		const user = await User.findByPk(user_id, {
			include: {association: 'tech'}
		});

		// return res.json(user.techs);
		return res.json(user);
	},

	async insert(req, res) {
		const { user_id } = req.params;

		const { name } = req.body;
		// Validando se o usuário existe
		const user = await User.findByPk(user_id);
		if (!user) {
			return res.status(400).json({ error: 'User not found!' });
		}

		const [tech] = await Tech.findOrCreate({
			where: { name }
		});

		/**
		 * Quando usarmos a relação BelongToMany do SEQUELIZE
		 * O próprio SEQUELIZE cria alguns métodos auxiliares como é o
		 * caso do método addTech. Esse método foi criado pelo SEQUELIZE
		 * para fazer a inclusão do vinculo do usuário com o tecnologia na tabela
		 * users_techs.
		 */
		await user.addTech(tech);

		return res.json(tech);
	},

	async delete(req, res) {
		const { user_id } = req.params;

		const { name } = req.body;
		// Validando se o usuário existe
		const user = await User.findByPk(user_id);
		if (!user) {
			return res.status(400).json({ error: 'User not found!' });
		}

		const tech = await Tech.findOrCreate({
			where: { name }
		});

		/**
		 * Quando usarmos a relação BelongToMany do SEQUELIZE
		 * O próprio SEQUELIZE cria alguns métodos auxiliares como é o
		 * caso do método removeTech. Esse método foi criado pelo SEQUELIZE
		 * para fazer a remoção do vinculo do usuário com o tecnologia na tabela
		 * users_techs. Ou seja, tecnologia e o usuário continuam existindo mas
		 * sem vínculo um com o outro.
		 */
		await user.removeTech(tech);

		return res.json();
	}
}