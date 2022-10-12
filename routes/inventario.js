const Router = require("express");

const { getAllInventario, createInventario, getInventarioByID, updateInventarioByID, deleteInventarioByID, uploadImageByID, getImageByID } = require("../controllers/inventario");

const router = Router();

router.post("/create", createInventario);
router.get("/all", getAllInventario);
router.get("/inventario/:id", getInventarioByID);
router.put("/update/:id", updateInventarioByID);
router.delete("/delete/:id", deleteInventarioByID);

// Subida foto
router.post("/inventario/:id/image", uploadImageByID)
router.get("/inventario/:id/image", getImageByID)

module.exports = router