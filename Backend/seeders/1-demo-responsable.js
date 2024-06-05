"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert("Responsables", [
            {
                id: 1,
                noEmp: 10,
                nombre: "María Luisa González Ramírez",
                imagen: "",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 2,
                noEmp: 11,
                nombre: "Adolfo Heriberto Ruelas Puente",
                imagen: "",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 3,
                noEmp: 12,
                nombre: "José Martín Olguín Espinoza",
                imagen: "",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 4,
                noEmp: 13,
                nombre: "Linda Eugenia Arredondo Acosta",
                imagen: "",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 5,
                noEmp: 14,
                nombre: "Jorge Isaac Flores Martínez",
                imagen: "",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete("Responsables", null, {});
    },
};
