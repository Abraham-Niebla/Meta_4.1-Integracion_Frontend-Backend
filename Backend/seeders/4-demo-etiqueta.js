"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert("Etiquetas", [
            {
                id: 1,
                etiqueta: "Dispositivo Móvil",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 2,
                etiqueta: "Computadora",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 3,
                etiqueta: "Proyector",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 4,
                etiqueta: "Fuente",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 5,
                etiqueta: "Multímetro",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete("Etiquetas", null, {});
    },
};
