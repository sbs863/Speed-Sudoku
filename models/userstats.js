/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('userstats', {
    userid: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    gamesPlayed: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    wins: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    losses: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    wLratio: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    fastestSolve: {
      type: DataTypes.TIME,
      allowNull: true
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    tableName: 'userstats'
  });
};
