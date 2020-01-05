const User = require('../models/User');

module.exports = {
	async listAll(req, res) {
		const users = await User.findAll();
		return res.json(users);
	},

	async insert(req, res) {
		const { name, email } = req.body;

		const user = await User.create({ name, email });

		return res.json(user);
	}
}