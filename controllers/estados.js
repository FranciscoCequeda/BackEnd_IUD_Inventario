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
        return res.status(201).json({ msg: "Estado creado correctamente!", estadoSchema})

    } catch (e) {
        return res.status(500).json({ Error: 'No se puede realizar la solicitud!!', e });
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
        return res.status(500).json({ Error: 'No se puede realizar la solicitud!!', e });
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
            return res.status(404).json({ Error: "Error, Estado no encontrado!!" });
        }

        return res.status(200).json(estado)

    } catch (e) {
        return res.status(500).json({ Error: 'No se puede realizar la solicitud!!', e });
    }
}


/*
Actualizar un documento de Estado por su ID
*/

const updateEstadobyID = async (req = request, res = response) => {

    try {

        if (req.body.nombre) {
            req.body.nombre = req.body.nombre.toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")
        }

        const id = req.params.id;
        const data = req.body;
        data.fecha_actualizacion = new Date();
        
        const val = await Estado.findById(id);

        if (!val) {
            return res.status(404).json({ Error: "Error, Estado no encontrado!!" });
        }

        const estadoDB = await Estado.findByIdAndUpdate(id, data, { new: true })
        return res.status(201).json({ msg: "Actualizacion realizada correctamente!!", estadoDB })

    } catch (e) {
        return res.status(500).json({ Error: 'No se puede realizar la solicitud!!', e });
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
            return res.status(404).json({ Error: "Error, Estado no encontrado!!" });
        }

        await Estado.findByIdAndDelete(id);
        return res.status(200).json({ msg: "Operacion realizada con exito!!, se borró Estado:", estadoDB })
        
    } catch (e) {
        return res.status(500).json({ Error: 'No se puede realizar la solicitud!!', e });
    }
}

module.exports = { createEstado, getAllEstados, getEstadoByID, updateEstadobyID, deleteEstadobyID}