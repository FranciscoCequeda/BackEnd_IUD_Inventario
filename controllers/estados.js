const Estado = require("../models/estado");

const { request, response } = require("express");


// Creacion de CRUD Estado

/*
Crear Estado
 */

const createEstado = async (req = request, res = response) => {
    try {

        if (req.body.nombre.length < 3) {
            return res.status(400).json({ msg: 'Dato debe ser mayor a 3 caracteres!!' })
        }

        const data = { nombre: req.body.nombre.toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "") };
        const estadoDB = await Estado.findOne(data)

        if (estadoDB) {
            return res.status(400).json({ msg: 'Ya existe en la DB' })
        }

        const estadoSchema = new Estado(data);
        await estadoSchema.save();
        return res.status(201).json({ msg: "Elemento creado correctamente!" })
    } catch (e) {
        return res.status(400).json({ msj: "Error de petición!!!", e })
    }
}


/*
Consultar todos los documentos de la coleccion Estado
*/
const getAllEstados = async (req = request, res = response) => {
    try {

        const data = req.query

        if (!data.estado) {
            const estadosDB = await Estado.find();
            return res.json({ estadosDB })
        } else {
            const estadosDB = await Estado.find(data);
            return res.json({ estadosDB })
        }

    } catch (e) {
        return res.status(500).json({ msg: "Error al realizar la peticion" })
    }
}


/*
Consultar un documento de Estado por su ID
*/

const getEstadoByID = async (req = request, res = response) => {
    try {
        const id = req.params.id;
        const estado = await Estado.findById(id);

        if (!estado) {
            return res.status(404).json({ msg: "Estado No encontrado" })
        }

        return res.status(200).json(estado)

    } catch (e) {
        return res.status(500).json({ msg: "Error al realizar la peticion!!", e })
    }
}


/*
Actualizar un documento de Estado por su ID
*/

const updateEstadobyID = async (req = request, res = response) => {
    try {

        if (req.body.nombre.length < 3 || req.body.estado.length < 3) {
            return res.status(404).json({ error: "Valores incorrectos!!" });
        }

        const id = req.params.id;
        const nombre = req.body.nombre.toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");;
        const estado = req.body.estado;
        const data = { nombre, estado }
        data.fecha_actualizacion = new Date();

        const val = await Estado.findById(id);

        if (!val) {
            return res.status(404).json({ msg: "No existe el elemento!!" })
        }

        const estadoDB = await Estado.findByIdAndUpdate(id, data, { new: true })
        return res.status(201).json({ msg: "Actualizacion realizada correctamente!!", estadoDB })

    } catch (e) {
        return res.status(500).json({ error: "Error al realizar la peticion!!", e });
    }
}


/*
Borrar un documento de Estado por su ID
*/

const deleteEstadobyID = async (req = request, res = response) => {

    try {
        const id = req.params.id;
        const estadoDB = await Estado.findById(id);

        if (!estadoDB) {
            return res.status(404).json({ Error: "Error, Estado no encontrado" });
        }

        await Estado.findByIdAndDelete(id);

        return res.status(200).json({ msg: "Operacion realizada con exito!!, se borró coleccion:", estadoDB })
    } catch (e) {
        return res.status(500).json({ msg: "No se puede realizar la operacion!!", e })
    }
}

module.exports = {
    createEstado, getAllEstados, getEstadoByID, updateEstadobyID, deleteEstadobyID
}