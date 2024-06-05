//Metodos GET PUT/PATCH DELETE POST
//Manejo de funciones y métodos
const models = require("../models");
const activoModel = models.Activo;

//GET // Obtener todos los elementos existentes
const getAll = async function (req, res) {
    try {
        let p = await activoModel.findAll(); //Busca todos los elementos

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
        let p = await activoModel.findByPk(req.params.id); //Busca por llave primaria (id)

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
const getBySerial = async function (req, res) {
    try {
        let p = await activoModel.findOne({
            where: { noSerie: req.params.serial },
        }); //Busca todos donde noSerie sea serial

        if (p.length === 0) {
            await res.status(500).json({
                error: "Error al obtener el serial " + req.params.serial,
            });
        } else {
            await res.json(p);
        }
    } catch (err) {
        await res.status(500).json({
            error:
                "Error al obtener el serial " + req.params.serial + ": " + err,
        });
    }
};

//POST // Añadir un elemento a la base de datos
const saveElement = async function (req, res) {
    delete req.body.id; //Elimina el atributo id si existe
    req.body.createdAt = new Date(); //Se almacena la fecha de creación
    req.body.updatedAt = new Date(); //Se almacena la fecha de actualización

    try {
        let p = await activoModel.create(req.body); //Crea un elemento Activo nuevo

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

        await activoModel.update(req.body, { where: { id: req.params.id } }); //Actualiza completamente un elemento Activo por id
        let p = await activoModel.findByPk(req.params.id); //Busca por llave primaria (id)

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
const replaceBySerial = async function (req, res) {
    try {
        delete req.body.id; //Elimina el atributo id si existe
        req.body.updatedAt = new Date(); //Se almacena la fecha de actualización

        await activoModel.update(req.body, {
            where: { noSerie: req.params.serial },
        }); //Actualiza completamente un elemento Activo por noSerie

        let p = await activoModel.findOne({
            where: { noSerie: req.body.noSerie },
        }); //Busca uno donde noSerie sea serial

        if (p.length === 0) {
            await res.status(500).json({
                error: "Error al reemplazar el serial " + req.params.serial,
            });
        } else {
            await res.json(p);
        }
    } catch (err) {
        await res.status(500).json({
            error: "Error al reemplazar el serial " + req.params.serial + err,
        });
    }
};

//PATCH // Reemplazar parcialmente un elemento según el id
const updateById = async function (req, res) {
    try {
        delete req.body.id; //Elimina el atributo id si existe
        req.body.updatedAt = new Date(); //Se almacena la fecha de actualización

        await activoModel.update(req.body, { where: { id: req.params.id } }); //Actualiza completamente un elemento Activo por id
        let p = await activoModel.findByPk(req.params.id); //Busca por llave primaria (id)

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
const updateBySerial = async function (req, res) {
    try {
        delete req.body.id; //Elimina el atributo id si existe
        req.body.updatedAt = new Date(); //Se almacena la fecha de actualización

        await activoModel.update(req.body, {
            where: { noSerie: req.params.serial },
        }); //Actualiza completamente un elemento Activo por noSerie

        let p = await activoModel.findOne({
            where: { noSerie: req.body.noSerie },
        }); //Busca uno donde noSerie sea serial

        if (p.length === 0) {
            await res.status(500).json({
                error: "Error al actualizar el serial " + req.params.serial,
            });
        } else {
            await res.json(p);
        }
    } catch (err) {
        await res.status(500).json({
            error: "Error al actualizar el serial " + req.params.serial + err,
        });
    }
};

//DELETE // Elimina un elemento según el id
const deleteId = async function (req, res) {
    try {
        let p = await activoModel.findByPk(req.params.id); //Busca por llave primaria (id)

        if (p.length === 0) {
            await res
                .status(500)
                .json({ error: "Error al eliminar el id " + req.params.id });
        } else {
            await activoModel.destroy({ where: { id: req.params.id } }); //Elimina un Activo por su id
            await res.json(p);
        }
    } catch (err) {
        await res
            .status(500)
            .json({ error: "Error al eliminar el id " + req.params.id + err });
    }
};

//DELETE // Elimina un elemento según el número de serie
const deleteSerial = async function (req, res) {
    try {
        let p = await activoModel.findOne({
            where: { noSerie: req.params.serial },
        }); //Busca uno donde noSerie sea serial

        if (p.length === 0) {
            await res.status(500).json({
                error: "Error al eliminar el serial " + req.params.serial,
            });
        } else {
            await activoModel.destroy({
                where: { noSerie: req.params.serial },
            }); //Elimina un Activo por su serial
            await res.json(p);
        }
    } catch (err) {
        await res.status(500).json({
            error: "Error al eliminar el serial " + req.params.serial + err,
        });
    }
};

//Métodos GET
exports.getAll = getAll;
exports.getById = getById;
exports.getBySerial = getBySerial;

//Métodos POST
exports.saveElement = saveElement;

//Métodos PUT
exports.replaceById = replaceById;
exports.replaceBySerial = replaceBySerial;

//Métodos PATCH
exports.updateById = updateById;
exports.updateBySerial = updateBySerial;

//Métodos DELETE
exports.deleteId = deleteId;
exports.deleteSerial = deleteSerial;
