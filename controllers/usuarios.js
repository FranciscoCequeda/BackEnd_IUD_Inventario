const Usuarios = require("../models/usuario");

const { request, response } = require("express");


// Creacion de CRUD Usuario

/*
Crear Usuario
 */

const createUsuario = async (req = request, res = response) => {

    try {

        if (req.body.nombre.length < 3) {
            return res.status(400).json({ msg: 'Dato debe ser mayor a 3 caracteres!!' })
        }

        const data = { nombre: req.body.nombre.toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ""), email: req.body.email.toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "") };
        const usuarioDB = await Usuarios.findOne({ email: data.email })

        if (usuarioDB) {
            return res.status(400).json({ msg: 'Ya existe en la DB' })
        }

        const usuarioSchema = new Usuarios(data);
        await usuarioSchema.save();
        return res.status(201).json({ msg: "Usuario creado correctamente!", usuarioSchema })

    } catch (e) {
        return res.status(500).json({ Error: 'No se puede realizar la solicitud!!', e });
    }
}


/*
Consultar todos los documentos de la coleccion Usuario
*/
const getAllUsuarios = async (req = request, res = response) => {
    try {

        const data = req.query

        if (!data.estado) {
            const usuarioDB = await Usuarios.find();
            return res.json({ usuarioDB })
        } else {
            const usuarioDB = await Usuarios.find(data);
            return res.json({ usuarioDB })
        }

    } catch (e) {
        return res.status(500).json({ Error: 'No se puede realizar la solicitud!!', e });
    }
}


/*
Consultar un documento de Usuario por su ID
*/

const getUsuarioByID = async (req = request, res = response) => {
    try {
        const id = req.params.id;
        const usuario = await Usuarios.findById(id);

        if (!usuario) {
            return res.status(404).json({ Error: "Error, Usuario no encontrado!!" });
        }

        return res.status(200).json(usuario)

    } catch (e) {
        return res.status(500).json({ Error: 'No se puede realizar la solicitud!!', e });
    }
}


/*
Actualizar un documento de Usuario por su ID
*/

const updateUsuarioByID = async (req = request, res = response) => {

    try {

        if (req.body.nombre) {
            req.body.nombre = req.body.nombre.toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")
        }

        if (req.body.email) {
            req.body.email = req.body.email.toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")
        }

        const id = req.params.id;
        const data = req.body;
        data.fecha_actualizacion = new Date();

        const val = await Usuarios.findById(id);

        if (!val) {
            return res.status(404).json({ Error: "Error, Usuario no encontrado!!" });
        }

        const usuarioDB = await Usuarios.findByIdAndUpdate(id, data, { new: true })
        return res.status(201).json({ msg: "Actualizacion realizada correctamente!!", usuarioDB })

    } catch (e) {
        return res.status(500).json({ Error: 'No se puede realizar la solicitud!!', e });
    }
}


/*
Borrar un documento de Usuario por su ID
*/

const deleteUsuarioByID = async (req = request, res = response) => {

    try {
        const id = req.params.id;
        const usuarioDB = await Usuarios.findById(id);

        if (!usuarioDB) {
            return res.status(404).json({ Error: "Error, Usuario no encontrado!!" });
        }

        await Usuarios.findByIdAndDelete(id);
        return res.status(200).json({ msg: "Operacion realizada con exito!!, se borró Usuario:", usuarioDB })

    } catch (e) {
        return res.status(500).json({ Error: 'No se puede realizar la solicitud!!', e });
    }
}

module.exports = { createUsuario, getAllUsuarios, getUsuarioByID, updateUsuarioByID, deleteUsuarioByID }