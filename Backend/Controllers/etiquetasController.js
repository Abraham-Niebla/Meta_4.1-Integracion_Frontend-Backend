//Metodos GET PUT/PATCH DELETE POST
//Manejo de funciones y métodos
const models = require("../models");
const etiquetaModel = models.Etiqueta;

//GET // Obtener todos los elementos existentes
const getAll = async function (req, res) {
    try {
        let p = await etiquetaModel.findAll(); //Busca todos los elementos

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
        let p = await etiquetaModel.findByPk(req.params.id); //Busca por llave primaria (id)

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

//POST // Añadir un elemento a la base de datos
const saveElement = async function (req, res) {
    delete req.body.id; //Elimina el atributo id si existe
    req.body.createdAt = new Date(); //Se almacena la fecha de creación
    req.body.updatedAt = new Date(); //Se almacena la fecha de actualización

    try {
        let p = await etiquetaModel.create(req.body); //Crea un elemento Activo nuevo

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
        delete req.body.id; //Elimina el atributo id si existe
        req.body.updatedAt = new Date(); //Se almacena la fecha de actualización

        await etiquetaModel.update(req.body, { where: { id: req.params.id } }); //Actualiza completamente un elemento Activo por id
        let p = await etiquetaModel.findByPk(req.params.id); //Busca por llave primaria (id)

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

//PATCH // Reemplazar parcialmente un elemento según el id
const updateById = async function (req, res) {
    try {
        delete req.body.id; //Elimina el atributo id si existe
        req.body.updatedAt = new Date(); //Se almacena la fecha de actualización

        await etiquetaModel.update(req.body, { where: { id: req.params.id } }); //Actualiza completamente un elemento Activo por id
        let p = await etiquetaModel.findByPk(req.params.id); //Busca por llave primaria (id)

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

//DELETE // Elimina un elemento según el id
const deleteId = async function (req, res) {
    try {
        let p = await etiquetaModel.findByPk(req.params.id); //Busca por llave primaria (id)

        if (p.length === 0) {
            await res
                .status(500)
                .json({ error: "Error al eliminar el id " + req.params.id });
        } else {
            await etiquetaModel.destroy({ where: { id: req.params.id } }); //Elimina un Activo por su id
            await res.json(p);
        }
    } catch (err) {
        await res
            .status(500)
            .json({ error: "Error al eliminar el id " + req.params.id + err });
    }
};

//Métodos GET
exports.getAll = getAll;
exports.getById = getById;

//Métodos POST
exports.saveElement = saveElement;

//Métodos PUT
exports.replaceById = replaceById;

//Métodos PATCH
exports.updateById = updateById;

//Métodos DELETE
exports.deleteId = deleteId;
