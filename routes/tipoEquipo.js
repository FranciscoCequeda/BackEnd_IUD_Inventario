const { Router } = require("express");

const { createTipoEquipo, getTipoEquipos, getTipoEquipoById, updateTipoEquipoById, deleteTipoEquipoById } = require('../controllers/tipoEquipo')

const router = Router();

/*
Crear TipoEquipo
 */
router.post("/create", createTipoEquipo);

/*
Consultar todos los elementos de la coleccion TipoEquipo
*/
router.get("/all", getTipoEquipos);

/*
Consultar un elemento de TipoEquipo por su ID
*/
router.get("/:id", getTipoEquipoById);

/*
Actualizar un elemento de TipoEquipo por su ID
*/
router.put("/update/:id", updateTipoEquipoById);

/*
Borrar un elemento de TipoEquipo por su ID
*/
router.delete("/delete/:id", deleteTipoEquipoById);

module.exports = router;