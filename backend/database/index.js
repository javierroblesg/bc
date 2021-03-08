const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
require('dotenv').config();

const sequelize = new Sequelize(process.env.DATABASE, process.env.USERNAME, process.env.PASSWORD, {
  host: process.env.HOST,
  dialect: 'mssql',
  timezone: '-06:00',
  //logging: false,
  dialectOptions: {
    // Observe the need for this nested `options` field for MSSQL
    options: {
      // Your tedious options here
      useUTC: false,
      dateFirst: 1
    }
  },
  define: {
    paranoid: false,
  }
});

const db = {
  sequelize,
  Sequelize,
  models: {},
};

//import models
fs
  .readdirSync(path.join(__dirname, 'models'))
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, 'models', file))(sequelize, Sequelize.DataTypes);
    db.models[model.name] = model;
  });

//associate models
Object.keys(db.models).forEach((modelName) => {
  if (db.models[modelName].associate) {
    db.models[modelName].associate(db.models);
  }
});

module.exports = db;