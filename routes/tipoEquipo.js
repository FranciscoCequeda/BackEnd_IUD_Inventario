const { Router } = require("express");

const { createTipoEquipo, getTipoEquipos, getTipoEquipoById, updateTipoEquipoById, deleteTipoEquipoById } = require('../controllers/tipoEquipo');

const validarJWT = require('../middleware/verificarJWT');
const verificarRol = require('../middleware/verificarRol');

const router = Router();

/*
Crear TipoEquipo
 */
router.post("/create", [validarJWT, verificarRol], createTipoEquipo);

/*
Consultar todos los elementos de la coleccion TipoEquipo
*/
router.get("/all", [validarJWT, verificarRol], getTipoEquipos);

/*
Consultar un elemento de TipoEquipo por su ID
*/
router.get("/:id", [validarJWT, verificarRol], getTipoEquipoById);

/*
Actualizar un elemento de TipoEquipo por su ID
*/
router.put("/update/:id", [validarJWT, verificarRol], updateTipoEquipoById);

/*
Borrar un elemento de TipoEquipo por su ID
*/
router.delete("/delete/:id", [validarJWT, verificarRol], deleteTipoEquipoById);

module.exports = router;