const Router = require("express");

const { createEstado, getAllEstados, getEstadoByID, updateEstadobyID, deleteEstadobyID } = require("../controllers/estados");

const router = Router();

router.post("/create", createEstado);

router.get("/all", getAllEstados);

router.get("/:id", getEstadoByID);

router.put("/update/:id", updateEstadobyID);

router.delete("/delete/:id", deleteEstadobyID);

module.exports = router;