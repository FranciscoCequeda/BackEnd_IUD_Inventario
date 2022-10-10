const Router = require("express");

const { createEstado, getAllEstados, getEstadoByID, updateEstadobyID, deleteEstadobyID } = require("../controllers/estados");

const router = Router();

/*
Crear Estado
 */
router.post("/create", createEstado);

/*
Consultar todos los elementos de la coleccion Estado
*/
router.get("/all", getAllEstados);

/*
Consultar un elemento de Estado por su ID
*/
router.get("/:id", getEstadoByID);

/*
Actualizar un elemento de Estado por su ID
*/
router.put("/update/:id", updateEstadobyID);

/*
Borrar un elemento de Estado por su ID
*/
router.delete("/delete/:id", deleteEstadobyID);

module.exports = router;