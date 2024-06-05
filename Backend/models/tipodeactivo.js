"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class TipoDeActivo extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    TipoDeActivo.init(
        {
            activo: {
                type: DataTypes.INTEGER, //Tipo de dato
                allowNull: false, //Poder dejarlo vacio
                unique: false, //No se podrán repetir valores
                references: {
                    model: "Activos",
                    key: "id",
                },
                onUpdate: "CASCADE",
                onDelete: "CASCADE",
            },
            etiqueta: {
                type: DataTypes.INTEGER, //Tipo de dato
                allowNull: false, //Poder dejarlo vacio
                unique: false, //No se podrán repetir valores
                references: {
                    model: "Etiquetas",
                    key: "id",
                },
                onUpdate: "CASCADE",
                onDelete: "CASCADE",
            },
        },
        {
            sequelize,
            modelName: "TipoDeActivo",
            tableName: "TiposDeActivos",
            name: {
                singular: "TipoDeActivo",
                plural: "TiposDeActivos",
            },
        }
    );
    return TipoDeActivo;
};
