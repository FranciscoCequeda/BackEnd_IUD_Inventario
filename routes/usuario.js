const Router = require("express");

const { createUsuario, getAllUsuarios, getUsuarioByID, updateUsuarioByID, deleteUsuarioByID } = require("../controllers/usuarios");

const validarJWT = require('../middleware/verificarJWT');
const verificarRol = require('../middleware/verificarRol');

const router = Router();

/*
Crear Usuario
 */
router.post("/create", [validarJWT, verificarRol], createUsuario);

/*
Consultar todos los elementos de la coleccion Usuario
*/
router.get("/all", [validarJWT, verificarRol], getAllUsuarios);

/*
Consultar un elemento de Usuario por su ID
*/
router.get("/:id", [validarJWT, verificarRol], getUsuarioByID);

/*
Actualizar un elemento de Usuario por su ID
*/
router.put("/update/:id", [validarJWT, verificarRol], updateUsuarioByID);

/*
Borrar un elemento de Usuario por su ID
*/
router.delete("/delete/:id", [validarJWT, verificarRol], deleteUsuarioByID);

module.exports = router