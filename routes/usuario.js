const Router = require("express");

const { createUsuario, getAllUsuarios, getUsuarioByID, updateUsuarioByID, deleteUsuarioByID} = require("../controllers/usuarios");

const router = Router();

/*
Crear Usuario
 */
router.post("/create", createUsuario);

/*
Consultar todos los elementos de la coleccion Usuario
*/
router.get("/all", getAllUsuarios);

/*
Consultar un elemento de Usuario por su ID
*/
router.get("/:id", getUsuarioByID);

/*
Actualizar un elemento de Usuario por su ID
*/
router.put("/update/:id", updateUsuarioByID);

/*
Borrar un elemento de Usuario por su ID
*/
router.delete("/delete/:id", deleteUsuarioByID);

module.exports = router