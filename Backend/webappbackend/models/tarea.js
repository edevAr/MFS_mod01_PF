'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tarea extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    Tarea = sequelize.define("Tarea", 
      { 
        titulo: DataTypes.STRING,
        descripcion: DataTypes.STRING,
        estado: DataTypes.STRING,
        fechalimite: DataTypes.DATE
      }
    );
    static associate(models) {
      // define association here
    }
  }
  Tarea.associate = (models) => { 
    Tarea.belongsTo(models.Usuario, 
      { 
        foreignKey: "usuarioId" 
      });
  };
  Tarea.init({
    titulo: DataTypes.STRING,
    descripcion: DataTypes.STRING,
    estado: DataTypes.STRING,
    fechalimite: DataTypes.DATE,
    usuarioId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Tarea',
  });
  return Tarea;
};