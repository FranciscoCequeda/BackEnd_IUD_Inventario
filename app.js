const express = require("express");

const app = express();

const cors = require("cors")
const fileUpload = require("express-fileupload")

/*
* Importacion rutas de Router (Para mapear los metodos y sus endpoints)
*/

const tipoEquipos = require("./routes/tipoEquipo");
const Estados = require("./routes/estado");
const Marcas = require("./routes/marca")
const Usuarios = require("./routes/usuario")
const Inventarios = require("./routes/inventario")


/*
* middleware 
*/

app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(fileUpload({ useTempFiles: true, tempFileDir: '/tmp/' }))
app.use(cors({ origin: "*" }));


app.use("/api/tipoequipos", tipoEquipos);
app.use("/api/estados", Estados);
app.use("/api/marcas", Marcas);
app.use("/api/usuarios", Usuarios);
app.use("/api/inventarios", Inventarios);

module.exports = app;