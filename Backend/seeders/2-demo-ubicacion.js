"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert("Ubicaciones", [
            {
                id: 1,
                desc: "Laboratorio A de Computación",
                imagen: "",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 2,
                desc: "Laboratorio B de Computación",
                imagen: "",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 3,
                desc: "Laboratorio C de Computación",
                imagen: "",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 4,
                desc: "Laboratorio D de Computación",
                imagen: "",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 5,
                desc: "Laboratorio E de Computación",
                imagen: "",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 6,
                desc: "Laboratorio F de Computación",
                imagen: "",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 7,
                desc: "Laboratorio G de Computación",
                imagen: "",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 8,
                desc: "Laboratorio H de Computación",
                imagen: "",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 9,
                desc: "Laboratorio I de Computación",
                imagen: "",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 10,
                desc: "Almacén de Computación",
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
