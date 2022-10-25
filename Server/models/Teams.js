const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    sequelize.define('team', {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      img: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description:{
        type: DataTypes.TEXT,
        allowNull: false,
      }
    });
  };