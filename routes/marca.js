const Router = require("express");

const {createMarcas, getAllMarcas, getMarcaByID, updateMarcaByID, deleteMarcaByID} = require("../controllers/marcas");

const router = Router();


/*
Crear Marca
 */
router.post("/create", createMarcas);

/*
Consultar todos los elementos de la coleccion Marca
*/
router.get("/all", getAllMarcas);

/*
Consultar un elemento de Marca por su ID
*/
router.get("/:id", getMarcaByID);

/*
Actualizar un elemento de Marca por su ID
*/
router.put("/update/:id", updateMarcaByID);

/*
Borrar un elemento de Marca por su ID
*/
router.delete("/delete/:id", deleteMarcaByID);

module.exports = router