//Metodos GET PUT/PATCH DELETE POST
//Manejo de funciones y métodos
const models = require("../models");
const tipoDeActivoModel = models.TipoDeActivo;

//GET // Obtener todos los elementos existentes
const getAll = async function (req, res) {
    try {
        let p = await tipoDeActivoModel.findAll(); //Busca todos los elementos

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
const getByActivo = async function (req, res) {
    try {
        let p = await tipoDeActivoModel.findAll({
            where: { activo: req.params.activo },
        });

        if (p.length === 0) {
            await res
                .status(500)
                .json({ error: "Error al obtener el activo " + req.params.activo });
        } else {
            await res.json(p);
        }
    } catch (err) {
        await res.status(500).json({
            error: "Error al obtener el activo " + req.params.activo + ": " + err,
        });
    }
};

//GET // Obtener un elemento según el id
const getByEtiqueta = async function (req, res) {
    try {
        let p = await tipoDeActivoModel.findAll({
            where: { etiqueta: req.params.etiqueta },
        });

        if (p.length === 0) {
            await res
                .status(500)
                .json({ error: "Error al obtener la etiqueta " + req.params.etiqueta });
        } else {
            await res.json(p);
        }
    } catch (err) {
        await res.status(500).json({
            error: "Error al obtener la etiqueta " + req.params.etiqueta + ": " + err,
        });
    }
};

//GET // Obtener un elemento según el id
const getByActivoEtiqueta = async function (req, res) {
    try {
        let p = await tipoDeActivoModel.findAll({
            where: { activo: req.params.activo,
                etiqueta: req.params.etiqueta },
        });

        if (p.length === 0) {
            await res
                .status(500)
                .json({ error: "Error al obtener activo " + req.params.activo +
                               "y etiqueta " + req.params.etiqueta });
        } else {
            await res.json(p);
        }
    } catch (err) {
        await res.status(500).json({
            error: "Error al obtener activo " + req.params.activo +
                   "y etiqueta " + req.params.etiqueta + err,
        });
    }
};

//POST // Añadir un elemento a la base de datos
const saveElement = async function (req, res) {
    delete req.body.id; //Elimina el atributo id si existe
    req.body.createdAt = new Date(); //Se almacena la fecha de creación
    req.body.updatedAt = new Date(); //Se almacena la fecha de actualización

    try {
        let p = await tipoDeActivoModel.create(req.body); //Crea un elemento Activo nuevo

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
const replaceByActivo = async function (req, res) {
    try {
        delete req.body.id; //Elimina el atributo id si existe
        req.body.updatedAt = new Date(); //Se almacena la fecha de actualización

        await tipoDeActivoModel.update(req.body, {
            where: { activo: req.params.activo },
        }); //Actualiza completamente un elemento Activo por id
        
        
        let activoId;
        if(req.body.activo === undefined)
            activoId = req.params.activo;
        else
            activoId = req.body.activo;

        let etiquetaID;
        if(req.body.etiqueta === undefined)
            etiquetaID = req.params.etiqueta;
        else
            etiquetaID = req.body.etiqueta;

        let p = await tipoDeActivoModel.findOne({
            where: { activo: activoId,
                     etiqueta: etiquetaID },
        });

        if (p.length === 0) {
            await res
                .status(500)
                .json({ error: "Error al reemplazar el activo " + req.params.activo });
        } else {
            await res.json(p);
        }
    } catch (err) {
        await res.status(500).json({
            error: "Error al reemplazar el activo " + req.params.activo + err,
        });
    }
};

//PUT // Reemplazar completamente un elemento según el id
const replaceByEtiqueta = async function (req, res) {
    try {
        delete req.body.id; //Elimina el atributo id si existe
        req.body.updatedAt = new Date(); //Se almacena la fecha de actualización

        await tipoDeActivoModel.update(req.body, {
            where: { etiqueta: req.params.etiqueta },
        }); //Actualiza completamente un elemento Activo por id

        let activoId;
        if(req.body.activo === undefined)
            activoId = req.params.activo;
        else
            activoId = req.body.activo;

        let etiquetaID;
        if(req.body.etiqueta === undefined)
            etiquetaID = req.params.etiqueta;
        else
            etiquetaID = req.body.etiqueta;

        let p = await tipoDeActivoModel.findOne({
            where: { activo: activoId,
                     etiqueta: etiquetaID },
        });

        if (p.length === 0) {
            await res
                .status(500)
                .json({ error: "Error al reemplazar la etiqueta " + req.params.etiqueta });
        } else {
            await res.json(p);
        }
    } catch (err) {
        await res.status(500).json({
            error: "Error al reemplazar la etiqueta " + req.params.etiqueta + err,
        });
    }
};

//PUT // Reemplazar completamente un elemento según el id
const replaceByActivoEtiqueta = async function (req, res) {
    try {
        delete req.body.id; //Elimina el atributo id si existe
        req.body.updatedAt = new Date(); //Se almacena la fecha de actualización

        await tipoDeActivoModel.update(req.body, {
            where: { activo: req.params.activo,
                     etiqueta: req.params.etiqueta },
        }); //Actualiza completamente un elemento Activo por id

        let activoId;
        if(req.body.activo === undefined)
            activoId = req.params.activo;
        else
            activoId = req.body.activo;

        let etiquetaID;
        if(req.body.etiqueta === undefined)
            etiquetaID = req.params.etiqueta;
        else
            etiquetaID = req.body.etiqueta;

        let p = await tipoDeActivoModel.findOne({
            where: { activo: activoId,
                     etiqueta: etiquetaID },
        });

        if (p.length === 0) {
            await res
                .status(500)
                .json({ error: "Error al reemplazar activo " + req.params.activo +
                                "y etiqueta " + req.params.etiqueta });
        } else {
            await res.json(p);
        }
    } catch (err) {
        await res.status(500).json({
            error: "Error al reemplazar activo " + req.params.activo +
                   "y etiqueta " + req.params.etiqueta + err,
        });
    }
};

//PATCH // Reemplazar parcialmente un elemento según el id
const updateByActivo = async function (req, res) {
    try {
        delete req.body.id; //Elimina el atributo id si existe
        req.body.updatedAt = new Date(); //Se almacena la fecha de actualización

        await tipoDeActivoModel.update(req.body, {
            where: { activo: req.params.activo },
        }); //Actualiza completamente un elemento Activo por id

        let p = await tipoDeActivoModel.findOne({
            where: { activo: req.params.activo },
        });

        if (p.length === 0) {
            await res
                .status(500)
                .json({ error: "Error al actualizar el activo " + req.params.activo });
        } else {
            await res.json(p);
        }
    } catch (err) {
        await res.status(500).json({
            error: "Error al actualizar el activo " + req.params.activo + err,
        });
    }
};

//PATCH // Reemplazar parcialmente un elemento según el id
const updateByEtiqueta = async function (req, res) {
    try {
        delete req.body.id; //Elimina el atributo id si existe
        req.body.updatedAt = new Date(); //Se almacena la fecha de actualización

        await tipoDeActivoModel.update(req.body, {
            where: { etiqueta: req.params.etiqueta },
        }); //Actualiza completamente un elemento Activo por id

        let p = await tipoDeActivoModel.findOne({
            where: { etiqueta: req.params.etiqueta },
        });

        if (p.length === 0) {
            await res
                .status(500)
                .json({ error: "Error al actualizar la etiqueta " + req.params.etiqueta });
        } else {
            await res.json(p);
        }
    } catch (err) {
        await res.status(500).json({
            error: "Error al actualizar la etiqueta " + req.params.etiqueta + err,
        });
    }
};

//PATCH // Reemplazar parcialmente un elemento según el id
const updateByActivoEtiqueta = async function (req, res) {
    try {
        delete req.body.id; //Elimina el atributo id si existe
        req.body.updatedAt = new Date(); //Se almacena la fecha de actualización

        await tipoDeActivoModel.update(req.body, {
            where: { activo: req.params.activo,
                     etiqueta: req.params.etiqueta },
        }); //Actualiza completamente un elemento Activo por id

        let activoId;
        if(req.body.activo === undefined)
            activoId = req.params.activo;
        else
            activoId = req.body.activo;

        let etiquetaID;
        if(req.body.etiqueta === undefined)
            etiquetaID = req.params.etiqueta;
        else
            etiquetaID = req.body.etiqueta;

        let p = await tipoDeActivoModel.findOne({
            where: { activo: activoId,
                     etiqueta: etiquetaID },
        });

        if (p.length === 0) {
            await res
                .status(500)
                .json({ error: "Error al actualizar activo " + req.params.activo +
                               "y etiqueta " + req.params.etiqueta });
        } else {
            await res.json(p);
        }
    } catch (err) {
        await res.status(500).json({
            error: "Error al actualizar activo " + req.params.activo +
                   "y etiqueta " + req.params.etiqueta,
        });
    }
};

//DELETE // Elimina un elemento según el id
const deleteActivo = async function (req, res) {
    try {
        let p = await tipoDeActivoModel.findAll({
            where: { activo: req.params.activo },
        });

        if (p.length === 0) {
            await res
                .status(500)
                .json({ error: "Error al eliminar el activo " + req.params.activo });
        } else {
            await tipoDeActivoModel.destroy({ where: { activo: req.params.activo } }); //Elimina un Activo por su id
            await res.json(p);
        }
    } catch (err) {
        await res
            .status(500)
            .json({ error: "Error al eliminar el activo " + req.params.activo + err });
    }
};

//DELETE // Elimina un elemento según el id
const deleteEtiqueta = async function (req, res) {
    try {
        let p = await tipoDeActivoModel.findAll({
            where: { etiqueta: req.params.etiqueta },
        });

        if (p.length === 0) {
            await res
                .status(500)
                .json({ error: "Error al eliminar la etiqueta " + req.params.etiqueta });
        } else {
            await tipoDeActivoModel.destroy({ where: { etiqueta: req.params.etiqueta } }); //Elimina un Activo por su id
            await res.json(p);
        }
    } catch (err) {
        await res
            .status(500)
            .json({ error: "Error al eliminar la etiqueta " + req.params.etiqueta + err });
    }
};

//DELETE // Elimina un elemento según el id
const deleteByActivoEtiqueta = async function (req, res) {
    try {
        let p = await tipoDeActivoModel.findAll({
            where: { activo: req.params.activo,
                     etiqueta: req.params.etiqueta },
        });

        if (p.length === 0) {
            await res
                .status(500)
                .json({ error: "Error al eliminar activo " + req.params.activo +
                               "y etiqueta " + req.params.etiqueta });
        } else {
            await tipoDeActivoModel.destroy({ where: { activo: req.params.activo,
                                              etiqueta: req.params.etiqueta }, }); //Elimina un Activo por su id
            await res.json(p);
        }
    } catch (err) {
        await res
            .status(500)
            .json({ error: "Error al eliminar activo " + req.params.activo +
                            "y etiqueta " + req.params.etiqueta + err });
    }
};

//Métodos GET
exports.getAll = getAll;
exports.getByActivo = getByActivo;
exports.getByEtiqueta = getByEtiqueta;
exports.getByActivoEtiqueta = getByActivoEtiqueta;

//Métodos POST
exports.saveElement = saveElement;

//Métodos PUT
exports.replaceByActivo = replaceByActivo;
exports.replaceByEtiqueta = replaceByEtiqueta;
exports.replaceByActivoEtiqueta = replaceByActivoEtiqueta;

//Métodos PATCH
exports.updateByActivo = updateByActivo;
exports.updateByEtiqueta = updateByEtiqueta;
exports.updateByActivoEtiqueta = updateByActivoEtiqueta;

//Métodos DELETE
exports.deleteByActivo = deleteActivo;
exports.deleteByEtiqueta = deleteEtiqueta;
exports.deleteByActivoEtiqueta = deleteByActivoEtiqueta;
