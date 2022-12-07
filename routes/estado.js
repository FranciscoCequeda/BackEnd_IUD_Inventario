const Router = require("express");

const { createEstado, getAllEstados, getEstadoByID, updateEstadobyID, deleteEstadobyID } = require("../controllers/estados");

const validarJWT = require('../middleware/verificarJWT');
const verificarRol = require('../middleware/verificarRol');

const router = Router();

/*
Crear Estado
 */
router.post("/create", [validarJWT, verificarRol], createEstado);

/*
Consultar todos los elementos de la coleccion Estado
*/
router.get("/all", [validarJWT, verificarRol], getAllEstados);

/*
Consultar un elemento de Estado por su ID
*/
router.get("/:id", [validarJWT, verificarRol], getEstadoByID);

/*
Actualizar un elemento de Estado por su ID
*/
router.put("/update/:id", [validarJWT, verificarRol], updateEstadobyID);

/*
Borrar un elemento de Estado por su ID
*/
router.delete("/delete/:id", [validarJWT, verificarRol], deleteEstadobyID);

module.exports = router;