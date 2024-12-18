const mongoose = require("mongoose");
const db = {};
db.roles = require('./roles.model');
db.users = require('./user.model');
db.refreshToken = require('./refreshToken.model');
module.exports = db;
