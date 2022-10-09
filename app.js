const express = require("express");

const app = express();

//TODO: Importar y Habilitar los cors

/*
* Importacion rutas de Router (Para mapear los metodos y sus endpoints)
*/

const tipoEquipos = require("./routes/tipoEquipo");
const Estados = require("./routes/estado");
const Marcas = require("./routes/marca")
const Usuarios = require("./routes/usuario")


/*
* middleware 
*/

//TODO: middleware para la url encoded
//TODO: middleware para subida de fotos
//TODO: middleware para los cors

app.use(express.json())

app.use("/api/tipoequipos", tipoEquipos);
app.use("/api/estados", Estados);
app.use("/api/marcas", Marcas);
app.use("/api/usuarios", Usuarios);

module.exports = app;