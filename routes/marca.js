const Router = require("express");

const {createMarcas, getAllMarcas, getMarcaByID, updateMarcaByID, deleteMarcaByID} = require("../controllers/marcas");

const router = Router();

router.post("/create", createMarcas);
router.get("/all", getAllMarcas);
router.get("/:id", getMarcaByID);
router.put("/update/:id", updateMarcaByID);
router.delete("/delete/:id", deleteMarcaByID);

module.exports = router