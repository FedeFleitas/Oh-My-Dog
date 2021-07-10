const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
  // defino el modelo
  return sequelize.define('temperament', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};