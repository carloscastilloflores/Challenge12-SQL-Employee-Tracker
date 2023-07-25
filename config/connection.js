import sequelize from 'sequelize';
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: '127.0.0.1',
    dialect: 'mysql',
    port: 3306,
    dialectOptions: {
      decimalNumbers: true,
      // socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock'
    }
  }
);

module.exports = sequelize;
