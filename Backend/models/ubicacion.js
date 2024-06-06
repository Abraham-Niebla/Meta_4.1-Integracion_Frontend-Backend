'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ubicacion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Ubicacion.hasMany(models.Activo, {foreignKey: 'ubicacionID', as: 'activos'}); //Una ubicación puede tener muchos activos

    }
  }
  Ubicacion.init({
    ubicacion: {
      type: DataTypes.STRING, //Tipo de dato
      allowNull: true, //Poder dejarlo vacio
      unique: false //No se podrán repetir valores
    },
    imagen: {
      type: DataTypes.BLOB, //Tipo de dato
      allowNull: true, //Poder dejarlo vacio
      unique: false //No se podrán repetir valores
    }
  }, {
    sequelize,
    modelName: 'Ubicacion',
    tableName: 'Ubicaciones',
    name: {
      singular: 'Ubicacion',
      plural: 'Ubicaciones'
    }
  });
  return Ubicacion;
};