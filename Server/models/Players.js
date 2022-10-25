const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    sequelize.define('player', {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      img: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      age: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description:{
        type: DataTypes.TEXT,
        allowNull: false,
      }
    });
  };