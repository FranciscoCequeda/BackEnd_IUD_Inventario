const { model, Schema } = require("mongoose");

const UsuariosSchema = Schema(
    {
        nombre: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        estado: {
            type: Boolean,
            required: true,
            default: true
        },
        fecha_creacion: {
            type: Date,
            default: new Date()
        },
        fecha_actualizacion: {
            type: Date,
            default: new Date()
        }
    });

module.exports = model("Usuarios", UsuariosSchema)