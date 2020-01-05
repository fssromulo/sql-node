const Sequelize = require("sequelize");
dbConfig = require("../config/database");

const User = require("../models/User");
const Address = require("../models/Address");
const Techs = require("../models/Tech");

const connection = new Sequelize(dbConfig);

User.init(connection);
Address.init(connection);
Techs.init(connection);

User.associate(connection.models);
Address.associate(connection.models);
Techs.associate(connection.models);

module.exports = connection;