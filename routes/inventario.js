const Router = require("express");

const { getAllInventario, createInventario, getInventarioByID, updateInventarioByID } = require("../controllers/inventario");

const router = Router();

router.post("/create", createInventario);
router.get("/all", getAllInventario);
router.get("/inventario/:id", getInventarioByID);
router.put("/update/:id", updateInventarioByID);

module.exports = router