const Router = require("express");

const { createMarcas, getAllMarcas, getMarcaByID, updateMarcaByID, deleteMarcaByID } = require("../controllers/marcas");

const validarJWT = require('../middleware/verificarJWT');
const verificarRol = require('../middleware/verificarRol');

const router = Router();

/*
Crear Marca
 */
router.post("/create", [validarJWT, verificarRol], createMarcas);

/*
Consultar todos los elementos de la coleccion Marca
*/
router.get("/all", [validarJWT, verificarRol], getAllMarcas);

/*
Consultar un elemento de Marca por su ID
*/
router.get("/:id", [validarJWT, verificarRol], getMarcaByID);

/*
Actualizar un elemento de Marca por su ID
*/
router.put("/update/:id", [validarJWT, verificarRol], updateMarcaByID);

/*
Borrar un elemento de Marca por su ID
*/
router.delete("/delete/:id", [validarJWT, verificarRol], deleteMarcaByID);

module.exports = router