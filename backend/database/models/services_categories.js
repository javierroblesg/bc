const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  class ServicesCategory extends Sequelize.Model {}
  ServicesCategory.init({
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    }
  }, { 
    tableName: 'services_categories',
    timestamps: false,
    sequelize
  });

  ServicesCategory.associate = (models) => {
    ServicesCategory.hasMany(models.UserCategories, {
      foreignKey: {
        fieldName: 'id_category',
        allowNull: false
      }
    })
  }

  return ServicesCategory;
}
