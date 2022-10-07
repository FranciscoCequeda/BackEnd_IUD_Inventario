const TipoEquipo = require("../models/tipoEquipo");

const { request, response } = require("express");

/*
Crear un tipo de equipo
 */
const createTipoEquipo = async (req = request, res = response) => {
    try {

        if (!req.body.nombre == true || req.body == `{}`) {
            res.status(401).json({ msg: 'No está autorizadoooo!!' })
        }
        const nombre = (req.body.nombre.toUpperCase());
        const tipoEquipoBD = await TipoEquipo.findOne({ nombre })

        if (tipoEquipoBD) {
            return res.status(400).json({ msg: 'Ya existe nombre' })
        }

        const datos = {
            nombre
        }

        const tipoEquipo = new TipoEquipo(datos)
        console.log(tipoEquipo)
        await tipoEquipo.save()
        res.status(201).json(tipoEquipo)
    } catch (e) {
        console.log(e)
        return res.status(500).json({
            msg: e
        })
    }
}

/*
Consultar todos los tipos de equipo 
*/
const getTiposEquipo = async (req = request,
    res = response) => {
    try {
        console.log(req.query)
        const estado = req.query.estado
        const query = { estado: estado }
        const tipoequiposBD = await TipoEquipo.find(query)
        return res.json(tipoequiposBD)
    } catch (e) {
        return res.status(500).json({ msj: e })
    }
}

/*
Consultar tipo de equipo por su ID
*/
const getTipoEquipoById = async (req = request, res = response) => {
    try {
        const id = req.params.id
        const estado = req.query.estado
        const query = { estado: estado, _id: id }

        const tipoEquipoDB = await TipoEquipo.findOne(filter)

        return res.json(TipoEquipo)
    } catch (error) {
        return res.status(500).json({ msj: error })
    }
}


/*
Actualizar un tipo de equipo por su ID
*/
const updateTipoEquipoById = async (req = request, res = response) => {
    try {
        const id = req.params.id

        const data = req.body

        data.fechaActualizacion = new Date()

        const tipoEquipo = await TipoEquipo.findByIdAndUpdate(id, data, { new: true })
        return res.json({ tipoEquipo })
    } catch (error) {
        return res.status(500).json({ msj: error })
    }
}

/*
Borrar un tipo de equipo por su ID
*/
const deleteTipoEquipoById = async (req = request, res = response) => {
    try {
        const id = req.params.id
        const TipoEquipoBD = await TipoEquipo.findById(id)

        if (!TipoEquipo) {
            return res.status(404).json({ msj: "No existe" })
        }

        await TipoEquipo.findByIdAndDelete(id)
        return res.status(204).json({ msj: "Borrado", id })
    } catch (error) {
        return res.status(500).json({ msj: error })
    }

}

module.exports = {  createTipoEquipo, getTiposEquipo, 
                    getTipoEquipoById, updateTipoEquipoById, 
                    deleteTipoEquipoById
                }