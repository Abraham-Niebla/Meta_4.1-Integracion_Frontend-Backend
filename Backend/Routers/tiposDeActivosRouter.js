const express = require('express');
const router = express.Router();

// Importando funciones para aplicar los métodos HTTP
const tiposDeActivosController = require("../Controllers/tiposDeActivosController");

// Métodos HTTP GET POST PUT PATCH y DELETE a partir de la ruta '/activos'
/*          MÉTODOS GET          */
router.get("/", tiposDeActivosController.getAll);
router.get("/activo/:activo", tiposDeActivosController.getByActivo);
router.get("/etiqueta/:etiqueta", tiposDeActivosController.getByEtiqueta);
router.get("/activo/:activo/etiqueta/:etiqueta", tiposDeActivosController.getByActivoEtiqueta);

/*          MÉTODOS POST          */
router.post("/", tiposDeActivosController.saveElement);

/*          MÉTODOS PUT          */
router.put("/activo/:activo", tiposDeActivosController.replaceByActivo);
router.put("/etiqueta/:etiqueta", tiposDeActivosController.replaceByEtiqueta);
router.put("/activo/:activo/etiqueta/:etiqueta", tiposDeActivosController.replaceByActivoEtiqueta);

/*          MÉTODOS PATCH          */
router.patch("/activo/:activo", tiposDeActivosController.updateByActivo);
router.patch("/etiqueta/:etiqueta", tiposDeActivosController.updateByEtiqueta);
router.patch("/activo/:activo/etiqueta/:etiqueta", tiposDeActivosController.updateByActivoEtiqueta);

/*          MÉTODOS DELETE          */
router.delete("/activo/:activo", tiposDeActivosController.deleteByActivo);
router.delete("/etiqueta/:etiqueta", tiposDeActivosController.deleteByEtiqueta);
router.delete("/activo/:activo/etiqueta/:etiqueta", tiposDeActivosController.deleteByActivoEtiqueta);

module.exports = router;