"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert("Ubicaciones", [
            {
                id: 1,
                ubicacion: "Laboratorio A de Computación",
                imagen: "",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 2,
                ubicacion: "Laboratorio B de Computación",
                imagen: "",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 3,
                ubicacion: "Laboratorio C de Computación",
                imagen: "",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 4,
                ubicacion: "Laboratorio D de Computación",
                imagen: "",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 5,
                ubicacion: "Laboratorio E de Computación",
                imagen: "",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 6,
                ubicacion: "Laboratorio F de Computación",
                imagen: "",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 7,
                ubicacion: "Laboratorio G de Computación",
                imagen: "",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 8,
                ubicacion: "Laboratorio H de Computación",
                imagen: "",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 9,
                ubicacion: "Laboratorio I de Computación",
                imagen: "",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 10,
                ubicacion: "Almacén de Computación",
                imagen: "",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete("Ubicaciones", null, {});
    },
};
