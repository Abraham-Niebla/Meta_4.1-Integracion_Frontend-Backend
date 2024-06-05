const express = require('express');
const router = express.Router();

// Importando funciones para aplicar los métodos HTTP
const etiquetasController = require("../Controllers/etiquetasController");

// Métodos HTTP GET POST PUT PATCH y DELETE a partir de la ruta '/activos'
/*          MÉTODOS GET          */
router.get("/", etiquetasController.getAll);
router.get("/id/:id", etiquetasController.getById);

/*          MÉTODOS POST          */
router.post("/", etiquetasController.saveElement);

/*          MÉTODOS PUT          */
router.put("/id/:id", etiquetasController.replaceById);

/*          MÉTODOS PATCH          */
router.patch("/id/:id", etiquetasController.updateById);

/*          MÉTODOS DELETE          */
router.delete("/id/:id", etiquetasController.deleteId);

module.exports = router;