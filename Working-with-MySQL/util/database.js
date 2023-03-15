const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "node-learning",
  password: "Nhanphan3112",
});

module.exports = pool.promise();
