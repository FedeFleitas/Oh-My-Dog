const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
  // defino el modelo
  return sequelize.define('temperament', {
    id: {
      /* type: DataTypes.UUID,
      primaryKey: true,
      allowNull: true, */
      type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
    }, 
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });
};