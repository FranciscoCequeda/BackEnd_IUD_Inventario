const Router = require("express");

const { getAllInventario, createInventario, getInventarioByID, updateInventarioByID, deleteInventarioByID, uploadImageByID, getImageByID } = require("../controllers/inventario");

const validarJWT = require('../middleware/verificarJWT');
const verificarRol = require('../middleware/verificarRol');

const router = Router();

router.post("/create", [validarJWT, verificarRol], createInventario);
router.get("/all", getAllInventario);
router.get("/inventario/:id", [validarJWT, verificarRol], getInventarioByID);
router.put("/update/:id", updateInventarioByID);
router.delete("/delete/:id", [validarJWT, verificarRol], deleteInventarioByID);

// Subida foto
router.post("/inventario/:id/image", uploadImageByID)
router.get("/inventario/:id/image", getImageByID)

module.exports = router