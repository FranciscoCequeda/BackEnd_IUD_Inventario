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
        return res.status(201).json({ msg: "Tipo de equipo creado correctamente!", tipoEquipo})

    } catch (e) {
        return res.status(500).json({ Error: 'No se puede realizar la solicitud!!', e });
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
        return res.status(500).json({ Error: 'No se puede realizar la solicitud!!', e });
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
            return res.status(404).json({ Error: "Error, Tipo de equipo no encontrado!!" })
        }

        return res.json(tipoEquipoDB)
    } catch (e) {
        return res.status(500).json({ Error: 'No se puede realizar la solicitud!!', e });
    }
}

/*
Actualizar un documento de TipoEquipo por su ID
*/
const updateTipoEquipoById = async (req = request, res = response) => {
    try {

        if (req.body.nombre.length < 3 || req.body.estado.length < 3) {
            return res.status(400).json({ error: "Valores incorrectos!!" });
        }

        const id = req.params.id
        const nombre = req.body.nombre.toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");;
        const estado = req.body.estado;
        const data = { nombre, estado }
        data.fecha_actualizacion = new Date()

        const val = await Estado.findById(id);

        if (!val) {
            return res.status(404).json({ Error: "Error, Tipo de equipo no encontrado!!" })
        }

        const tipoEquipo = await TipoEquipo.findByIdAndUpdate(id, data, { new: true })
        return res.json({ msg: "Actualizacion realizada correctamente!!", tipoEquipo })
    } catch (e) {
        return res.status(500).json({ Error: 'No se puede realizar la solicitud!!', e });
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
            return res.status(404).json({ Error: "Error, Tipo de equipo no encontrado!!" })
        }

        await TipoEquipo.findByIdAndDelete(id)
        return res.status(200).json({ msg: "Operacion realizada con exito!!, se borró Tipo Equipo:", TipoEquipoBD })
    } catch (e) {
        return res.status(500).json({ Error: 'No se puede realizar la solicitud!!', e });
    }

}

module.exports = {
    createTipoEquipo, getTipoEquipos,
    getTipoEquipoById, updateTipoEquipoById,
    deleteTipoEquipoById
}