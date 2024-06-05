"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Responsables", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true, //Este atributo se define como la llave primaria
                type: Sequelize.INTEGER,
            },
            noEmp: {
                type: Sequelize.INTEGER, //Tipo de dato
                allowNull: false, //Poder dejarlo vacio
                unique: true, //No se podrán repetir valores
            },
            nombre: {
                type: Sequelize.STRING, //Tipo de dato
                allowNull: false, //Poder dejarlo vacio
                unique: true, //No se podrán repetir valores
            },
            imagen: {
                type: Sequelize.BLOB, //Tipo de dato
                allowNull: true, //Poder dejarlo vacio
                unique: false, //No se podrán repetir valores
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("Responsables");
    },
};
