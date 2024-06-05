//Metodos GET PUT/PATCH DELETE POST
//Manejo de funciones y métodos
const models = require("../models");
const responsableModel = models.Responsable;

//GET // Obtener todos los elementos existentes
const getAll = async function (req, res) {
    try {
        let p = await responsableModel.findAll(); //Busca todos los elementos

        if (p.length === 0) {
            await res
                .status(500)
                .json({ error: "Error al obtener los elementos" });
        } else {
            await res.json(p);
        }
    } catch (err) {
        await res
            .status(500)
            .json({ error: "Error al obtener los elementos: " + err });
    }
};

//GET // Obtener un elemento según el id
const getById = async function (req, res) {
    try {
        let p = await responsableModel.findByPk(req.params.id); //Busca por llave primaria (id)

        if (p.length === 0) {
            await res
                .status(500)
                .json({ error: "Error al obtener el id " + req.params.id });
        } else {
            await res.json(p);
        }
    } catch (err) {
        await res.status(500).json({
            error: "Error al obtener el id " + req.params.id + ": " + err,
        });
    }
};

//GET // Obtener un elemento según el número de serie
const getByNoEmp = async function (req, res) {
    try {
        let p = await responsableModel.findOne({
            where: { noEmp: req.params.noEmp },
        }); //Busca todos donde noEmp sea noEmp

        if (p.length === 0) {
            await res.status(500).json({
                error: "Error al obtener el noEmp " + req.params.noEmp,
            });
        } else {
            await res.json(p);
        }
    } catch (err) {
        await res.status(500).json({
            error:
                "Error al obtener el noEmp " + req.params.noEmp + ": " + err,
        });
    }
};

//POST // Añadir un elemento a la base de datos
const saveElement = async function (req, res) {
    delete req.body.id; //Elimina el atributo id si existe
    req.body.createdAt = new Date(); //Se almacena la fecha de creación
    req.body.updatedAt = new Date(); //Se almacena la fecha de actualización

    try {
        let p = await responsableModel.create(req.body); //Crea un elemento Activo nuevo

        if (p.length === 0) {
            await res
                .status(500)
                .json({ error: "Error al guardar el elemento" });
        } else {
            await res.json(p);
        }
    } catch (err) {
        await res
            .status(500)
            .json({ error: "Error al guardar el elemento: " + err });
    }
};

//PUT // Reemplazar completamente un elemento según el id
const replaceById = async function (req, res) {
    try {
        console.log("PUT por id: ", req.params.id);
        console.log("Cuerpo antes: ", req.body);

        delete req.body.id; //Elimina el atributo id si existe
        req.body.updatedAt = new Date(); //Se almacena la fecha de actualización

        console.log("Cuerpo despues: ", req.body);

        await responsableModel.update(req.body, { where: { id: req.params.id } }); //Actualiza completamente un elemento Activo por id
        let p = await responsableModel.findByPk(req.params.id); //Busca por llave primaria (id)

        if (p.length === 0) {
            await res
                .status(500)
                .json({ error: "Error al reemplazar el id " + req.params.id });
        } else {
            await res.json(p);
        }
    } catch (err) {
        await res.status(500).json({
            error: "Error al reemplazar el id " + req.params.id + err,
        });
    }
};

//PUT  // Reemplazar completamente un elemento según el número de serie
const replaceByNoEmp = async function (req, res) {
    try {
        delete req.body.id; //Elimina el atributo id si existe
        req.body.updatedAt = new Date(); //Se almacena la fecha de actualización

        await responsableModel.update(req.body, {
            where: { noEmp: req.params.noEmp },
        }); //Actualiza completamente un elemento Activo por noEmp

        let p = await responsableModel.findOne({
            where: { noEmp: req.body.noEmp },
        }); //Busca uno donde noEmp sea noEmp

        if (p.length === 0) {
            await res.status(500).json({
                error: "Error al reemplazar el noEmp " + req.params.noEmp,
            });
        } else {
            await res.json(p);
        }
    } catch (err) {
        await res.status(500).json({
            error: "Error al reemplazar el noEmp " + req.params.noEmp + err,
        });
    }
};

//PATCH // Reemplazar parcialmente un elemento según el id
const updateById = async function (req, res) {
    try {
        delete req.body.id; //Elimina el atributo id si existe
        req.body.updatedAt = new Date(); //Se almacena la fecha de actualización

        await responsableModel.update(req.body, { where: { id: req.params.id } }); //Actualiza completamente un elemento Activo por id
        let p = await responsableModel.findByPk(req.params.id); //Busca por llave primaria (id)

        if (p.length === 0) {
            await res
                .status(500)
                .json({ error: "Error al actualizar el id " + req.params.id });
        } else {
            await res.json(p);
        }
    } catch (err) {
        await res.status(500).json({
            error: "Error al actualizar el id " + req.params.id + err,
        });
    }
};

//PATCH // Reemplazar parcialmente un elemento según el número de serie
const updateByNoEmp = async function (req, res) {
    try {
        delete req.body.id; //Elimina el atributo id si existe
        req.body.updatedAt = new Date(); //Se almacena la fecha de actualización

        await responsableModel.update(req.body, {
            where: { noEmp: req.params.noEmp },
        }); //Actualiza completamente un elemento Activo por noEmp

        let p = await responsableModel.findOne({
            where: { noEmp: req.body.noEmp },
        }); //Busca uno donde noEmp sea noEmp

        if (p.length === 0) {
            await res.status(500).json({
                error: "Error al actualizar el noEmp " + req.params.noEmp,
            });
        } else {
            await res.json(p);
        }
    } catch (err) {
        await res.status(500).json({
            error: "Error al actualizar el noEmp " + req.params.noEmp + err,
        });
    }
};

//DELETE // Elimina un elemento según el id
const deleteById = async function (req, res) {
    try {
        let p = await responsableModel.findByPk(req.params.id); //Busca por llave primaria (id)

        if (p.length === 0) {
            await res
                .status(500)
                .json({ error: "Error al eliminar el id " + req.params.id });
        } else {
            await responsableModel.destroy({ where: { id: req.params.id } }); //Elimina un Activo por su id
            await res.json(p);
        }
    } catch (err) {
        await res
            .status(500)
            .json({ error: "Error al eliminar el id " + req.params.id + err });
    }
};

//DELETE // Elimina un elemento según el número de serie
const deleteByNoEmp = async function (req, res) {
    try {
        let p = await responsableModel.findOne({
            where: { noEmp: req.params.noEmp },
        }); //Busca uno donde noEmp sea noEmp

        if (p.length === 0) {
            await res.status(500).json({
                error: "Error al eliminar el noEmp " + req.params.noEmp,
            });
        } else {
            await responsableModel.destroy({
                where: { noEmp: req.params.noEmp },
            }); //Elimina un Activo por su noEmp
            await res.json(p);
        }
    } catch (err) {
        await res.status(500).json({
            error: "Error al eliminar el noEmp " + req.params.noEmp + err,
        });
    }
};

//Métodos GET
exports.getAll = getAll;
exports.getById = getById;
exports.getByNoEmp = getByNoEmp;

//Métodos POST
exports.saveElement = saveElement;

//Métodos PUT
exports.replaceById = replaceById;
exports.replaceByNoEmp = replaceByNoEmp;

//Métodos PATCH
exports.updateById = updateById;
exports.updateByNoEmp = updateByNoEmp;

//Métodos DELETE
exports.deleteById = deleteById;
exports.deleteByNoEmp = deleteByNoEmp;
