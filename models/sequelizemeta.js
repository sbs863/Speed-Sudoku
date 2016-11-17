/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('sequelizemeta', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    }
  }, {
    tableName: 'sequelizemeta'
  });
};
