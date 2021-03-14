const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  class UserType extends Sequelize.Model {}
  UserType.init({
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
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
    tableName: 'user_types',
    timestamps: false,
    sequelize
  });

  UserType.associate = (models) => {
    UserType.hasMany(models.User, {
      foreignKey: {
        fieldName: 'id',
        allowNull: false
      }
    })
  }

  return UserType;
}
