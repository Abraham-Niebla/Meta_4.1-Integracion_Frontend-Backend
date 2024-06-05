'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Activo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Activo.belongsToMany(models.Etiqueta, {through: models.TipoDeActivo, foreignKey: 'activo'}); //Un activo puede tener muchas etiquetas
      models.Activo.belongsTo(models.Responsable, {foreignKey: 'responsableID', as:'responsable'}); //Un activo tiene un solo responsable
      models.Activo.belongsTo(models.Ubicacion, {foreignKey: 'ubicacionID', as:'ubicacion'}); //Un activo tiene una sola ubicación
    }
  }
  Activo.init({
    noSerie: {
      type: DataTypes.INTEGER, //Tipo de dato
      allowNull: false, //Poder dejarlo vacio
      unique: false //No se podrán repetir valores
    },
    noInv: {
      type: DataTypes.INTEGER, //Tipo de dato
      allowNull: true, //Poder dejarlo vacio
      unique: true //No se podrán repetir valores
    },
    desc: {
      type: DataTypes.STRING, //Tipo de dato
      allowNull: true, //Poder dejarlo vacio
      unique: false //No se podrán repetir valores
    },
    responsableID: { //Llave foranea
      type: DataTypes.INTEGER,
      references: {
        model: 'Responsables',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    ubicacionID: {//Llave foranea
      type: DataTypes.INTEGER,
      references: {
        model: 'Ubicaciones',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    imagen: {
      type: DataTypes.BLOB, //Tipo de dato
      allowNull: true, //Poder dejarlo vacio
      unique: false //No se podrán repetir valores
    }
  }, {
    sequelize,
    modelName: 'Activo',
    tableName: 'Activos',
    name: {
      singular: 'Activo',
      plural: 'Activos'
    }
  });
  return Activo;
};