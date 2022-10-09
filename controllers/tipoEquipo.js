const TipoEquipo = require("../models/tipoEquipo");

const { request, response } = require("express");

// Creacion de CRUD TipoEquipo
/*
Crear TipoEquipo
 */
const createTipoEquipo = async (req = request, res = response) => {
    try {

        if (req.body.nombre.length < 3) {
            return res.status(400).json({ msg: 'Dato debe ser mayor a 3 caracteres!!' })
        }

        const nombre = req.body.nombre.toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
        const tipoEquipoBD = await TipoEquipo.findOne({ nombre })

        if (tipoEquipoBD) {
            return res.status(400).json({ msg: 'Ya existe en la DB' })
        }

        const datos = { nombre }

        const tipoEquipo = new TipoEquipo(datos)

        await tipoEquipo.save()
        res.status(201).json(tipoEquipo)

    } catch (e) {
        return res.status(500).json({
            msg: "Por favor ingrese un dato valido!"
        })
    }
}

/*
Consultar todos los documentos de la coleccion TipoEquipo
*/
const getTipoEquipos = async (req = request, res = response) => {
    try {
        const estado = req.query
        if (!estado.estado) {
            const tipoequiposBD = await TipoEquipo.find()
            return res.json(tipoequiposBD)
        } else {
            const tipoequiposBD = await TipoEquipo.find(estado)
            return res.json(tipoequiposBD)
        }
    } catch (e) {
        return res.status(500).json({ msj: "Error al realizar la peticion!!", e })
    }
}

/*
Consultar un documento de TipoEquipo por su ID
*/
const getTipoEquipoById = async (req = request, res = response) => {
    try {
        const id = req.params.id
        const tipoEquipoDB = await TipoEquipo.findById(id)

        if (!tipoEquipoDB) {
            return res.status(404).json({ msg: "Tipo Equipo No encontrado" })
        }

        return res.json(tipoEquipoDB)
    } catch (e) {
        return res.status(500).json({ msj: "Error al realizar la Consulta, por favor verifique!!", e })
    }
}

/*
Actualizar un documento de TipoEquipo por su ID
*/
const updateTipoEquipoById = async (req = request, res = response) => {
    try {
        const id = req.params.id
        const nombre = req.body.nombre.toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");;
        const estado = req.body.estado;
        const data = { nombre, estado }
        
        data.fecha_actualizacion = new Date()

        const tipoEquipo = await TipoEquipo.findByIdAndUpdate(id, data, { new: true })
        return res.json({ tipoEquipo })
    } catch (e) {
        return res.status(500).json({ msj: e })
    }
}

/*
Borrar un documento de TipoEquipo por su ID
*/
const deleteTipoEquipoById = async (req = request, res = response) => {
    try {
        const id = req.params.id
        const TipoEquipoBD = await TipoEquipo.findById(id)

        if (!TipoEquipoBD) {
            return res.status(404).json({ msj: "No existe, Tipo de equipo no encontrado!!" })
        }

        await TipoEquipo.findByIdAndDelete(id)
        return res.status(200).json({ msj: "Borrado satisfactorio!!", id })
    } catch (e) {
        return res.status(500).json({ msj: "Error al realizar la operacion!!", e })
    }

}

module.exports = {
    createTipoEquipo, getTipoEquipos,
    getTipoEquipoById, updateTipoEquipoById,
    deleteTipoEquipoById
}