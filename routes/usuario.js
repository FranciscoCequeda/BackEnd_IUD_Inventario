const Router = require("express");

const { createUsuario, getAllUsuarios, getUsuarioByID, updateUsuarioByID, deleteUsuarioByID} = require("../controllers/usuarios");

const router = Router();

router.post("/create", createUsuario);
router.get("/all", getAllUsuarios);
router.get("/:id", getUsuarioByID);
router.put("/update/:id", updateUsuarioByID);
router.delete("/delete/:id", deleteUsuarioByID);

module.exports = router