"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert("Activos", [
            {
                id: 1,
                noSerie: 123,
                noInv: 321,
                desc: "Computadora Marca Dell",
                responsableID: 3,
                ubicacionID: 1,
                imagen: "",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 2,
                noSerie: 456,
                noInv: 654,
                desc: "Proyector Marca Epson",
                responsableID: 1,
                ubicacionID: 2,
                imagen: "",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 3,
                noSerie: 789,
                noInv: 987,
                desc: "Fuente de poder DC variable",
                responsableID: 2,
                ubicacionID: 4,
                imagen: "",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 4,
                noSerie: 159,
                noInv: 951,
                desc: "Laptop marca Lenovo para préstamo",
                responsableID: 4,
                ubicacionID: 10,
                imagen: "",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 5,
                noSerie: 357,
                noInv: 753,
                desc: "Multímetro marca Fluke",
                responsableID: 2,
                ubicacionID: 5,
                imagen: "",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete("Activos", null, {});
    },
};
