"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert("TiposDeActivos", [
            {
                id: 1,
                activo: 1,
                etiqueta: 2,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 2,
                activo: 2,
                etiqueta: 3,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 3,
                activo: 3,
                etiqueta: 4,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 4,
                activo: 4,
                etiqueta: 1,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 5,
                activo: 4,
                etiqueta: 2,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 6,
                activo: 5,
                etiqueta: 5,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete("TiposDeActivos", null, {});
    },
};
