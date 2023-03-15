const Sequelize = require("sequelize");

const sequelize = new Sequelize("node-learning", "root", "Nhanphan3112", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
