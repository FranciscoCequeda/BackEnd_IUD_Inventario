const mongoose = require("mongoose");

const mongoConnect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Conexión realizada correctamente!!");
    } catch (e) {
        console.log("Error de Conexión con la Base de Datos!!", e);
        throw new Error("Error de Conexión con la Base de Datos!!!!");
    }
}

module.exports = { mongoConnect };