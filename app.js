const express = require("express");

const app = express();

//TODO: Importar y Habilitar los cors


/*
* Importacion rutas
*/

const tipoEquipos = require("./routes/tipoEquipo");


/*
* middleware 
*/

//TODO: middleware para la url encoded
//TODO: middleware para subida de fotos
//TODO: middleware para los cors

app.use(express.json())

app.use("/api/tipoequipos", tipoEquipos);

module.exports = app;