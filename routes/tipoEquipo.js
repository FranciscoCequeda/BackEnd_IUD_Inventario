const { Router } = require("express");

const { createTipoEquipo, getTiposEquipo, getTipoEquipoById, updateTipoEquipoById, deleteTipoEquipoById } = require('../controllers/tipoEquipo')

const router = Router();

/*
Crear un tipo de equipo
*/
router.post("/", createTipoEquipo);

/*
Consulta todos los tipos de equipo 
*/
router.get("/", getTiposEquipo);

/*
Consulta un tipo de equipo por su ID
*/
router.get("/:id", getTipoEquipoById);

/*
Actualiza un tipo de equipo por su ID
*/
router.put("/:id", updateTipoEquipoById);

/*
Borra un tipo de equipo por su ID
*/
router.delete("/:id", deleteTipoEquipoById);

module.exports = router;