'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    Usuario = sequelize.define("Usuario", 
    { 
      nombre: DataTypes.STRING,
      correo: DataTypes.STRING,
      contrasenia: DataTypes.STRING
    });
    static associate(models) {
      // define association here
    }
  }
  
  Usuario.associate = (models) => 
  { 
    Usuario.hasMany(models.Tarea, 
    { 
      foreignKey: "usuarioId" 
    });
  };

  Usuario.init({
    nombre: DataTypes.STRING,
    correo: DataTypes.STRING,
    contrasenia: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Usuario',
  });
  return Usuario;
};