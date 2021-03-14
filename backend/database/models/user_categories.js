const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  class UserCategories extends Sequelize.Model {}
  UserCategories.init({
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    }
  }, { 
    tableName: 'user_categories',
    timestamps: false,
    sequelize
  });

  UserCategories.associate = (models) => {
    UserCategories.belongsTo(models.User, {
      foreignKey: {
        fieldName: 'id',
        allowNull: false
      }
    }),
    UserCategories.belongsTo(models.ServicesCategory, {
      foreignKey: {
        fieldName: 'id',
        allowNull: false
      }
    })
  }

  return UserCategories;
}
