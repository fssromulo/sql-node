const Address = require('../models/Address');
const User = require('../models/User');

module.exports = {
	async listAll(req, res) {
		const { user_id } = req.params;

		const user = await User.findByPk(
			user_id,
			{
				include: { association: 'addresses' }
			}
		);

		return res.json(user);
	},

	async insert(req, res) {
		const { user_id } = req.params;
		const {
			zipcode,
			street,
			number
		} = req.body;

		// Validando se o usuário existe
		const user = await User.findByPk(user_id);

		if (!user) {
			return res.status(400).json({ error: 'User not found!' });
		}

		const address = await Address.create({
			zipcode,
			street,
			number,
			user_id
		});

		return res.json(address);
	}
}