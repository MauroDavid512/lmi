const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('game',{  
    name:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    description:{
      type: DataTypes.TEXT,
      allowNull: false,
    },
    image:{
      type: DataTypes.STRING,
      allowNull: false
    },
    type:{
        type: DataTypes.STRING,
        allowNull: false
    }
  })
};