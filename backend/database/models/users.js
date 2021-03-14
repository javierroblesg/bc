const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  class User extends Sequelize.Model {}
  User.init({
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    },
    firstname: {
      type: Sequelize.STRING,
      allowNull: false
    },
    lastname: {
      type: Sequelize.STRING,
      allowNull: false
    },
    last_connection: {
      type: Sequelize.DATE
    },
    modules: {
      type: Sequelize.STRING,
      allowNull: false
    },
    can_services: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    }
  }, { 
    tableName: 'users',
    paranoid: true,
    sequelize
  });
  User.associate = (models) => {
    User.belongsTo(models.UserType, {
      foreignKey: {
        fieldName: 'user_type',
        allowNull: false
      }
    }),
    User.hasMany(models.UserCategories, {
      foreignKey: {
        fieldName: 'id_user',
        allowNull: false
      }
    })
  }
  return User;
}
