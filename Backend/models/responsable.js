'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Responsable extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Responsable.hasMany(models.Activo, {foreignKey: 'responsableID', as: 'activos' }); //Un responsable puede tener muchos activos

    }
  }
  Responsable.init({
    noEmp: {
      type: DataTypes.INTEGER, //Tipo de dato
      allowNull: false, //Poder dejarlo vacio
      unique: true //No se podrán repetir valores
    },
    nombre: {
      type: DataTypes.STRING, //Tipo de dato
      allowNull: false, //Poder dejarlo vacio
      unique: true //No se podrán repetir valores
    },
    imagen: {
      type: DataTypes.BLOB, //Tipo de dato
      allowNull: true, //Poder dejarlo vacio
      unique: false //No se podrán repetir valores
    }
  }, {
    sequelize,
    modelName: 'Responsable',
    tableName: 'Responsables',
    name: {
      singular: 'Responsable',
      plural: 'Responsables'
    }
  });
  return Responsable;
};