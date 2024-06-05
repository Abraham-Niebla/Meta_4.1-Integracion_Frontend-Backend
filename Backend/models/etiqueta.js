'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Etiqueta extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Etiqueta.belongsToMany(models.Activo, {through: models.TipoDeActivo, foreignKey: 'etiqueta'}); //Una etiqueta puede estar en muchos activos
    }
  }
  Etiqueta.init({
    etiqueta: {
      type: DataTypes.STRING, //Tipo de dato
      allowNull: false, //Poder dejarlo vacio
      unique: true //No se podrán repetir valores
    }
  }, {
    sequelize,
    modelName: 'Etiqueta',
    tableName: 'Etiquetas',
    name: {
      singular: 'Etiqueta',
      plural: 'Etiquetas'
    }
  });
  return Etiqueta;
};