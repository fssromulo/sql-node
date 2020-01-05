const express = require("express");

const UserController = require("./controllers/UserController");
const AddressController = require("./controllers/AddressController");
const TechsController = require("./controllers/TechController");
const ReportController = require("./controllers/ReportController");

const routes = express.Router();

// Users
routes.get('/users', UserController.listAll);
routes.post('/users', UserController.insert);


// Address
routes.get('/users/:user_id/address', AddressController.listAll);
routes.post('/users/:user_id/address', AddressController.insert);

// Tech
routes.get('/users/:user_id/Techs', TechsController.listAll);
routes.post('/users/:user_id/Techs', TechsController.insert);
routes.delete('/users/:user_id/Techs', TechsController.delete);

// Report
routes.get('/report', ReportController.show);

module.exports = routes;